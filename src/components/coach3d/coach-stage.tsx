import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";
import type { MoveId, Side } from "@/content/library";
import type { MuscleId } from "@/content/muscles";
import { fit, frame, measure, rigReady, type Rig } from "./driver";
import { animFor, highlightsFor } from "./highlights";
import { Mannequin } from "./mannequin";
import { useMaterials, type Level } from "./materials";
import type { JointKey, Pose } from "./rig";

const FOV = 30;
const DEFAULT_VIEW = { az: 36, el: 8 };

export type CoachStageProps = {
  move: MoveId;
  side?: Side;
  paused: boolean;
  /** Show muscle highlights. */
  muscles?: boolean;
  /** Show only this muscle (legend tap). */
  focus?: MuscleId | null;
  label: string;
  /** Dev tools: fixed loop position (0..1) and joint offsets added on top of the move. */
  at?: number;
  override?: Partial<Pose>;
  view?: { az: number; el: number };
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  return reduced;
}

function Scene({ move, side, paused, muscles = true, focus, at, override, view: forcedView }: CoachStageProps) {
  const rigRef = useRef<Rig | null>(null);
  const onRig = useCallback((next: Rig) => {
    rigRef.current = next;
  }, []);
  const mats = useMaterials();
  const anim = useMemo(() => animFor(move, side), [move, side]);
  const highlights = useMemo(
    () => (muscles ? highlightsFor(move, side, focus) : new Map<string, Level>()),
    [move, side, muscles, focus],
  );
  const reduced = useReducedMotion();
  const memo = useRef(new Map<JointKey, number>());
  const clock = useRef(0);
  const tween = useRef<{ from: Vector3; to: Vector3; fromT: Vector3; toT: Vector3; k: number } | null>(null);
  const framed = useRef("");
  const { camera, size, invalidate, gl } = useThree();
  const controls = useThree((state) => state.controls) as unknown as { target: Vector3; update: () => void } | null;

  useEffect(() => {
    memo.current = new Map();
    clock.current = (anim.still ?? 0.25) * anim.dur;
    invalidate();
  }, [anim, invalidate]);

  useEffect(() => invalidate(), [highlights, paused, at, override, invalidate]);

  useFrame((state, delta) => {
    const rig = rigRef.current;
    if (!rig || !rigReady(rig)) return;
    const aspect = size.width / Math.max(1, size.height);
    const key = `${move}:${side ?? ""}:${aspect.toFixed(2)}:${forcedView?.az ?? ""}:${forcedView?.el ?? ""}`;
    if (framed.current !== key) {
      // Frame the whole move once, from its preferred angle, then glide the camera there.
      const box = measure(rig, anim, memo.current);
      const view =
        forcedView ?? anim.view ?? (side === "right" ? { az: -DEFAULT_VIEW.az, el: DEFAULT_VIEW.el } : DEFAULT_VIEW);
      const target = fit(box, view, FOV, aspect);
      const first = framed.current === "";
      framed.current = key;
      if (first) {
        gl.domElement.style.opacity = "1";
        camera.position.copy(target.position);
        controls?.target.copy(target.target);
        camera.lookAt(target.target);
      } else {
        tween.current = {
          from: camera.position.clone(),
          to: target.position,
          fromT: controls ? controls.target.clone() : target.target.clone(),
          toT: target.target,
          k: 0,
        };
      }
    }

    if (!paused && !reduced && at === undefined) clock.current += Math.min(delta, 0.05);
    const t = at ?? (reduced ? (anim.still ?? 0.25) : (clock.current / anim.dur) % 1);
    const posed = frame(rig, anim, t, memo.current, override);
    if (import.meta.env.DEV) (window as unknown as { __coach?: unknown }).__coach = { rig, pose: posed, memo: memo.current };

    const pulse = 0.5 + 0.5 * Math.sin(state.clock.elapsedTime * 3.2);
    mats.uniforms.uGlow.value = reduced ? 0.45 : 0.25 + 0.4 * pulse;

    const tw = tween.current;
    if (tw) {
      tw.k = Math.min(1, tw.k + delta * 1.8);
      const e = tw.k < 0.5 ? 2 * tw.k * tw.k : 1 - (-2 * tw.k + 2) ** 2 / 2;
      camera.position.lerpVectors(tw.from, tw.to, e);
      controls?.target.lerpVectors(tw.fromT, tw.toT, e);
      if (tw.k >= 1) tween.current = null;
      invalidate();
    }
    controls?.update();
  });

  return (
    <>
      <Mannequin onRig={onRig} highlights={highlights} mats={mats} />
      {anim.wall !== undefined ? (
        <mesh position={[0, 1.1, anim.wall + 0.02]} receiveShadow>
          <boxGeometry args={[1.6, 2.2, 0.04]} />
          <meshStandardMaterial color="#eceef1" roughness={0.9} />
        </mesh>
      ) : null}
    </>
  );
}

export default function CoachStage(props: CoachStageProps) {
  const live = !props.paused || props.at !== undefined;
  return (
    <Canvas
      className="coach-canvas"
      dpr={[1, 2]}
      frameloop={live ? "always" : "demand"}
      camera={{ fov: FOV, near: 0.05, far: 40, position: [2.4, 1.4, 3.6] }}
      gl={{ antialias: true, preserveDrawingBuffer: props.at !== undefined }}
      aria-label={props.label}
      role="img"
    >
      <color attach="background" args={["#ffffff"]} />
      <hemisphereLight args={["#ffffff", "#dfe1e6", 0.7]} />
      <directionalLight position={[1.6, 5, 2.6]} intensity={1.5} />
      <directionalLight position={[-3, 2.5, -2]} intensity={0.45} />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2.2} position={[0, 4, 2]} rotation-x={Math.PI / 2} scale={[6, 4, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[-4, 1.5, 1]} rotation-y={Math.PI / 2} scale={[4, 3, 1]} />
        <Lightformer form="rect" intensity={0.8} position={[4, 1, -2]} rotation-y={-Math.PI / 2} scale={[4, 3, 1]} />
      </Environment>
      <Scene {...props} />
      <ContactShadows position={[0, 0.001, 0]} scale={6} far={1.4} blur={2.4} opacity={0.42} resolution={512} color="#1d2026" />
      <OrbitControls makeDefault enablePan={false} minDistance={1.5} maxDistance={9} minPolarAngle={0.08} maxPolarAngle={1.62} />
    </Canvas>
  );
}
