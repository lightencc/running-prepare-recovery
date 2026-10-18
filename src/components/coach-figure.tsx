import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import type { Layout, MoveId, Phase, Side } from "@/content/library";

type Kind = "rotate" | "translate" | "scale";

type Pose = {
  dur: string;
  bob?: string;
  torso?: string;
  breath?: string;
  thighF?: string;
  thighB?: string;
  shinF?: string;
  shinB?: string;
  footF?: string;
  footB?: string;
  upperF?: string;
  upperB?: string;
  foreF?: string;
  foreB?: string;
  linear?: boolean;
};

const POSES: Record<MoveId, Pose> = {
  jog: {
    dur: "0.55s",
    bob: "0,0; 0,-8; 0,0; 0,-8; 0,0",
    torso: "3; -3; 3",
    thighF: "-34; 26; -34",
    thighB: "26; -34; 26",
    shinF: "14; 64; 14",
    shinB: "64; 14; 64",
    upperF: "32; -34; 32",
    upperB: "-34; 32; -34",
  },
  walk: {
    dur: "1.15s",
    bob: "0,0; 0,-4; 0,0; 0,-4; 0,0",
    torso: "2; -2; 2",
    thighF: "-22; 16; -22",
    thighB: "16; -22; 16",
    shinF: "8; 30; 8",
    shinB: "30; 8; 30",
    upperF: "18; -16; 18",
    upperB: "-16; 18; -16",
  },
  stride: {
    dur: "0.46s",
    bob: "0,0; 0,-12; 0,0; 0,-12; 0,0",
    torso: "5; -4; 5",
    thighF: "-48; 34; -48",
    thighB: "34; -48; 34",
    shinF: "12; 72; 12",
    shinB: "72; 12; 72",
    upperF: "40; -42; 40",
    upperB: "-42; 40; -42",
  },
  "high-knees": {
    dur: "0.5s",
    bob: "0,0; 0,-11; 0,0; 0,-11; 0,0",
    torso: "2; -2; 2",
    thighF: "-78; 8; -78",
    thighB: "8; -78; 8",
    shinF: "74; 12; 74",
    shinB: "12; 74; 12",
    upperF: "36; -34; 36",
    upperB: "-34; 36; -34",
  },
  "butt-kicks": {
    dur: "0.46s",
    bob: "0,0; 0,-6; 0,0; 0,-6; 0,0",
    thighF: "10; 16; 10",
    thighB: "16; 10; 16",
    shinF: "10; 124; 10",
    shinB: "124; 10; 124",
    upperF: "28; -26; 28",
    upperB: "-26; 28; -26",
  },
  "a-skip": {
    dur: "0.9s",
    bob: "0,0; 0,-14; 0,-2; 0,-14; 0,0",
    thighF: "-72; -72; 8; -72",
    thighB: "8; -72; -72; 8",
    shinF: "68; 68; 12; 68",
    shinB: "12; 68; 68; 12",
    upperF: "30; 30; -28; 30",
    upperB: "-28; 30; 30; -28",
  },
  ankle: {
    dur: "1.8s",
    thighF: "-20; -20; -20",
    shinF: "26; 26; 26",
    footF: "0; 120; 240; 360",
    thighB: "4; 4; 4",
    upperF: "-36; -36; -36",
    upperB: "12; 12; 12",
    linear: true,
  },
  "arm-circles": {
    dur: "2.6s",
    upperF: "0; -180; -360",
    upperB: "0; 180; 360",
    foreF: "0; 0; 0",
    foreB: "0; 0; 0",
    linear: true,
  },
  "hip-circles": {
    dur: "2.6s",
    bob: "0,0; 18,5; 0,14; -18,5; 0,0",
    upperF: "-66; -66; -66",
    upperB: "66; 66; 66",
    thighF: "-8; -8; -8",
    thighB: "8; 8; 8",
  },
  "torso-twist": {
    dur: "1.7s",
    torso: "-18; 18; -18",
    upperF: "-42; -42; -42",
    upperB: "42; 42; 42",
  },
  "leg-swing": {
    dur: "1.5s",
    torso: "-4; 5; -4",
    thighF: "38; -64; 38",
    shinF: "6; 8; 6",
    thighB: "4; 4; 4",
    upperF: "-18; -40; -18",
    upperB: "8; 20; 8",
  },
  "leg-swing-side": {
    dur: "1.5s",
    thighF: "-34; 38; -34",
    shinF: "4; 6; 4",
    thighB: "4; 4; 4",
    upperF: "-24; -24; -24",
    upperB: "18; 18; 18",
  },
  lunge: {
    dur: "2.6s",
    bob: "0,0; 16,18; 16,18; 0,0; 16,18; 16,18; 0,0",
    torso: "0; -8; -8; 0; -8; -8; 0",
    thighF: "0; -56; -56; 0; 10; 10; 0",
    shinF: "4; 62; 62; 4; 6; 6; 4",
    thighB: "0; 32; 32; 0; -56; -56; 0",
    shinB: "4; -12; -12; 4; 62; 62; 4",
    upperF: "-12; -48; -48; -12; 16; 16; -12",
    upperB: "14; 18; 18; 14; -48; -48; 14",
  },
  "side-lunge": {
    dur: "2.4s",
    bob: "0,0; -30,18; -30,18; 0,0",
    thighF: "0; -16; -16; 0",
    shinF: "0; 46; 46; 0",
    thighB: "0; 24; 24; 0",
    shinB: "0; 4; 4; 0",
    upperF: "-8; -36; -36; -8",
    upperB: "8; 20; 20; 8",
  },
  "knee-hug": {
    dur: "2.4s",
    torso: "0; 14; 14; 14; 0",
    thighF: "0; -76; -76; -76; 0",
    shinF: "4; 84; 84; 84; 4",
    thighB: "0; 4; 4; 4; 0",
    upperF: "-12; -102; -102; -102; -12",
    foreF: "18; -24; -24; -24; 18",
    upperB: "12; 8; 8; 8; 12",
  },
  worlds: {
    dur: "3.4s",
    bob: "0,0; 16,18; 16,18; 18,22; 18,22; 0,0",
    torso: "0; -8; -8; -20; -20; 0",
    thighF: "0; -56; -56; -60; -60; 0",
    shinF: "4; 60; 60; 66; 66; 4",
    thighB: "0; 30; 30; 34; 34; 0",
    shinB: "4; -8; -8; -4; -4; 4",
    upperF: "-14; -42; -42; -158; -158; -14",
    foreF: "18; 12; 12; 6; 6; 18",
    upperB: "12; 20; 20; 24; 24; 12",
  },
  "calf-raise": {
    dur: "1.45s",
    bob: "0,0; 0,-18; 0,-18; 0,0",
    footF: "0; -20; -20; 0",
    footB: "0; -20; -20; 0",
    upperF: "-8; -12; -12; -8",
    upperB: "10; 14; 14; 10",
  },
  calf: {
    dur: "2.2s",
    bob: "14,6; 22,8; 14,6",
    torso: "-14; -18; -14",
    thighF: "-28; -36; -28",
    shinF: "34; 42; 34",
    thighB: "18; 20; 18",
    shinB: "0; 2; 0",
    upperF: "-74; -82; -74",
    upperB: "-68; -76; -68",
  },
  quad: {
    dur: "2.3s",
    torso: "-2; 3; -2",
    thighB: "8; 12; 8",
    shinB: "104; 126; 104",
    upperB: "28; 50; 28",
    foreB: "14; 40; 14",
    thighF: "2; 4; 2",
    shinF: "4; 6; 4",
    upperF: "-16; -20; -16",
  },
  hamstring: {
    dur: "2.8s",
    bob: "0,0; -8,12; -8,16; -8,12",
    torso: "6; 56; 68; 56",
    thighF: "-6; -18; -22; -18",
    shinF: "2; 6; 8; 6",
    thighB: "2; 8; 8; 8",
    upperF: "-16; -42; -50; -42",
    upperB: "10; 16; 18; 16",
  },
  "hip-flexor": {
    dur: "3s",
    bob: "0,0; 10,36; 18,40; 10,36; 0,0",
    torso: "0; -4; -8; -4; 0",
    thighB: "0; 84; 90; 84; 0",
    shinB: "0; -90; -96; -90; 0",
    thighF: "0; -46; -52; -46; 0",
    shinF: "0; 50; 56; 50; 0",
    upperF: "-10; -28; -32; -28; -10",
    upperB: "8; 14; 16; 14; 8",
  },
  figure4: {
    dur: "2.8s",
    bob: "0,0; 0,12; 0,18; 0,12; 0,0",
    thighF: "0; -44; -52; -44; 0",
    shinF: "0; 72; 84; 72; 0",
    thighB: "0; -6; -10; -6; 0",
    shinB: "0; 16; 22; 16; 0",
    upperF: "-8; -32; -40; -32; -8",
    upperB: "8; 18; 22; 18; 8",
  },
  chest: {
    dur: "3.2s",
    breath: "1,1; 1.04,1.06; 1,1",
    upperF: "-6; -80; -92; -80; -6",
    upperB: "6; 80; 92; 80; 6",
    foreF: "14; 30; 36; 30; 14",
    foreB: "14; 30; 36; 30; 14",
  },
  breathe: {
    dur: "4.2s",
    breath: "1,1; 1.05,1.08; 1,1",
    bob: "0,0; 0,-3; 0,0",
    upperF: "6; 4; 6",
    upperB: "-4; -2; -4",
  },
  child: { dur: "3s" },
  "cat-cow": { dur: "2.6s" },
  twist: {
    dur: "3.2s",
    torso: "90; 90; 90; 90",
    thighF: "90; 30; 18; 90",
    shinF: "0; 64; 74; 0",
    thighB: "92; 92; 92; 92",
    shinB: "0; 0; 0; 0",
    upperF: "70; 70; 70; 70",
    upperB: "20; 20; 20; 20",
  },
  bridge: {
    dur: "2.6s",
    bob: "0,0; 0,-44; 0,-44; 0,0",
    torso: "90; 78; 74; 90",
    thighF: "92; 40; 36; 92",
    thighB: "92; 40; 36; 92",
    shinF: "0; 50; 56; 0",
    shinB: "0; 50; 56; 0",
    upperF: "40; 20; 16; 40",
    upperB: "20; 8; 6; 20",
  },
  "ankle-pump": {
    dur: "1.15s",
    torso: "90; 90; 90",
    thighF: "90; 90; 90",
    thighB: "90; 90; 90",
    footF: "-18; 26; -18",
    footB: "-18; 26; -18",
    upperF: "30; 30; 30",
    upperB: "12; 12; 12",
  },
};

const SWAP = new Set<MoveId>([
  "ankle",
  "leg-swing",
  "leg-swing-side",
  "side-lunge",
  "knee-hug",
  "worlds",
  "calf",
  "quad",
  "hamstring",
  "hip-flexor",
  "figure4",
  "twist",
]);

function negateBob(values?: string) {
  if (!values) return values;
  return values
    .split(";")
    .map((part) => {
      const [x, y] = part.split(",").map((item) => item.trim());
      if (y === undefined) return part.trim();
      return `${-Number(x)},${y}`;
    })
    .join("; ");
}

function poseFor(move: MoveId, side?: Side): Pose {
  const pose = POSES[move];
  if (side !== "right" || !SWAP.has(move)) return pose;
  return {
    ...pose,
    bob: negateBob(pose.bob),
    thighF: pose.thighB,
    thighB: pose.thighF,
    shinF: pose.shinB,
    shinB: pose.shinF,
    footF: pose.footB,
    footB: pose.footF,
    upperF: pose.upperB,
    upperB: pose.upperF,
    foreF: pose.foreB,
    foreB: pose.foreF,
  };
}

function useSvgPause(ref: RefObject<SVGSVGElement | null>, paused: boolean) {
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (paused) svg.pauseAnimations();
    else svg.unpauseAnimations();
  }, [paused, ref]);
}

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

function Spin({
  kind,
  values,
  dur,
  linear,
  fallback,
  reduced,
  children,
}: {
  kind: Kind;
  values?: string;
  dur: string;
  linear?: boolean;
  fallback?: string;
  reduced: boolean;
  children: ReactNode;
}) {
  if (!values) return <g transform={fallback}>{children}</g>;
  if (reduced) {
    const parts = values.split(";").map((item) => item.trim());
    const mid = parts[Math.min(parts.length - 1, Math.floor(parts.length / 2))] ?? parts[0];
    const transform = kind === "rotate" ? `rotate(${mid})` : kind === "translate" ? `translate(${mid})` : `scale(${mid})`;
    return <g transform={transform}>{children}</g>;
  }
  const count = values.split(";").length;
  const keyTimes = Array.from({ length: count }, (_, index) => (index / (count - 1)).toFixed(4)).join(";");
  const keySplines = Array.from({ length: Math.max(0, count - 1) }, () => "0.45 0 0.55 1").join(";");
  return (
    <g>
      <animateTransform
        attributeName="transform"
        type={kind}
        values={values}
        dur={dur}
        repeatCount="indefinite"
        begin="0s"
        keyTimes={keyTimes}
        calcMode={linear ? "linear" : "spline"}
        {...(linear ? {} : { keySplines })}
      />
      {children}
    </g>
  );
}

function Head({ front }: { front?: boolean }) {
  return (
    <g className="head" transform={front ? "translate(0,-132)" : "translate(10,-128)"}>
      <ellipse className="hair" cx={0} cy={-8} rx={32} ry={26} />
      <circle className="skin" cx={0} cy={2} r={28} />
      <ellipse className="hair" cx={front ? 0 : -2} cy={-18} rx={28} ry={14} />
      {front ? (
        <>
          <circle className="eye" cx={-7} cy={2} r={2.2} />
          <circle className="eye" cx={7} cy={2} r={2.2} />
        </>
      ) : (
        <circle className="eye" cx={12} cy={1} r={2.2} />
      )}
    </g>
  );
}

function Limb({
  pose,
  part,
  dur,
  linear,
  reduced,
  foreFallback,
  upperFallback,
}: {
  pose: Pose;
  part: "f" | "b";
  dur: string;
  linear?: boolean;
  reduced: boolean;
  foreFallback: string;
  upperFallback: string;
}) {
  const thigh = part === "f" ? pose.thighF : pose.thighB;
  const shin = part === "f" ? pose.shinF : pose.shinB;
  const foot = part === "f" ? pose.footF : pose.footB;
  const upper = part === "f" ? pose.upperF : pose.upperB;
  const fore = part === "f" ? pose.foreF : pose.foreB;
  return { thigh, shin, foot, upper, fore, dur, linear, reduced, foreFallback, upperFallback };
}

function Leg({
  part,
  pose,
  reduced,
}: {
  part: "f" | "b";
  pose: Pose;
  reduced: boolean;
}) {
  const bits = Limb({
    pose,
    part,
    dur: pose.dur,
    linear: pose.linear,
    reduced,
    foreFallback: "rotate(18)",
    upperFallback: part === "f" ? "rotate(-12)" : "rotate(14)",
  });
  return (
    <g className={`leg leg-${part}`}>
      <Spin kind="rotate" values={bits.thigh} dur={pose.dur} reduced={reduced}>
        <rect className="skin" x={-15} y={0} width={30} height={74} rx={15} />
        <g transform="translate(0,66)">
          <Spin kind="rotate" values={bits.shin} dur={pose.dur} reduced={reduced}>
            <rect className="skin" x={-12} y={0} width={24} height={66} rx={12} />
            <g transform="translate(0,58)">
              <Spin kind="rotate" values={bits.foot} dur={pose.dur} linear={pose.linear} reduced={reduced}>
                <ellipse className="shoe" cx={18} cy={8} rx={28} ry={10} />
              </Spin>
            </g>
          </Spin>
        </g>
      </Spin>
    </g>
  );
}

function Arm({
  part,
  pose,
  reduced,
  x,
}: {
  part: "f" | "b";
  pose: Pose;
  reduced: boolean;
  x: number;
}) {
  const upper = part === "f" ? pose.upperF : pose.upperB;
  const fore = part === "f" ? pose.foreF : pose.foreB;
  return (
    <g className={`arm arm-${part}`} transform={`translate(${x},-90)`}>
      <Spin
        kind="rotate"
        values={upper}
        dur={pose.dur}
        linear={pose.linear}
        fallback={part === "f" ? "rotate(-12)" : "rotate(16)"}
        reduced={reduced}
      >
        <rect className="skin" x={-8} y={0} width={16} height={48} rx={8} />
        <g transform="translate(0,42)">
          <Spin kind="rotate" values={fore} dur={pose.dur} fallback="rotate(18)" reduced={reduced}>
            <rect className="skin" x={-7} y={0} width={14} height={42} rx={7} />
          </Spin>
        </g>
      </Spin>
    </g>
  );
}

function Torso({ pose, front, reduced }: { pose: Pose; front?: boolean; reduced: boolean }) {
  return (
    <g className="torso">
      <Spin kind="rotate" values={pose.torso} dur={pose.dur} reduced={reduced}>
        <Spin kind="scale" values={pose.breath} dur={pose.dur} reduced={reduced}>
          <rect className="shirt" x={front ? -40 : -34} y={-112} width={front ? 80 : 68} height={116} rx={28} />
          <Head front={front} />
          <rect className="shorts" x={front ? -42 : -36} y={-16} width={front ? 84 : 72} height={44} rx={16} />
        </Spin>
      </Spin>
    </g>
  );
}

function Human({
  move,
  layout,
  side,
  phase,
  paused,
  label,
}: {
  move: MoveId;
  layout: Layout;
  side?: Side;
  phase: Phase;
  paused: boolean;
  label: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  useSvgPause(ref, paused);
  const reduced = useReducedMotion();
  const pose = poseFor(move, side);
  const anchor = layout === "floor" ? "translate(168,214)" : "translate(160,176)";
  const viewBox = layout === "floor" ? "10 70 340 270" : "50 8 220 330";
  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      className="coach-svg"
      data-phase={phase}
      data-move={move}
      role="img"
      aria-label={label}
    >
      <ellipse className="ground" cx={160} cy={324} rx={86} ry={10} />
      <rect className="prop-wall" x={236} y={120} width={18} height={200} rx={6} />
      <g className="anchor" transform={anchor}>
        <Spin kind="translate" values={pose.bob} dur={pose.dur} reduced={reduced}>
          <Arm part="b" pose={pose} reduced={reduced} x={layout === "front" ? 42 : -8} />
          <g transform={layout === "front" ? "translate(22,0)" : undefined}>
            <Leg part="b" pose={pose} reduced={reduced} />
          </g>
          <Torso pose={pose} front={layout === "front"} reduced={reduced} />
          <g transform={layout === "front" ? "translate(-22,0)" : undefined}>
            <Leg part="f" pose={pose} reduced={reduced} />
          </g>
          <Arm part="f" pose={pose} reduced={reduced} x={layout === "front" ? -42 : 16} />
        </Spin>
      </g>
    </svg>
  );
}

function QuadBody({
  head,
  arm,
  thigh,
  dur,
  reduced,
}: {
  head: string;
  arm: string;
  thigh: string;
  dur: string;
  reduced: boolean;
}) {
  return (
    <>
      <g transform="translate(36,10)">
        <Spin kind="rotate" values={thigh} dur={dur} reduced={reduced}>
          <rect className="skin" x={-9} y={0} width={18} height={64} rx={9} />
        </Spin>
      </g>
      <rect className="shirt" x={-92} y={-22} width={124} height={44} rx={18} />
      <rect className="shorts" x={-4} y={-18} width={52} height={32} rx={12} />
      <g transform="translate(-108,0)">
        <Spin kind="rotate" values={head} dur={dur} reduced={reduced}>
          <ellipse className="hair" cx={-4} cy={-6} rx={24} ry={20} />
          <circle className="skin" r={20} />
          <ellipse className="hair" cx={-2} cy={-12} rx={20} ry={11} />
          <circle className="eye" cx={10} cy={0} r={2.1} />
        </Spin>
      </g>
      <g transform="translate(-46,14)">
        <Spin kind="rotate" values={arm} dur={dur} reduced={reduced}>
          <rect className="skin" x={-6} y={0} width={12} height={66} rx={6} />
        </Spin>
      </g>
    </>
  );
}

function Quad({
  move,
  phase,
  paused,
  label,
}: {
  move: MoveId;
  phase: Phase;
  paused: boolean;
  label: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  useSvgPause(ref, paused);
  const reduced = useReducedMotion();
  const child = move === "child";
  return (
    <svg ref={ref} viewBox="0 0 360 420" className="coach-svg" data-phase={phase} role="img" aria-label={label}>
      <ellipse className="ground" cx={180} cy={348} rx={116} ry={12} />
      <g transform="translate(196,246)">
        {child ? (
          <Spin kind="translate" values="-8,30; -8,36; -8,30" dur="3.2s" reduced={reduced}>
            <g transform="rotate(16)">
              <QuadBody head="18; 22; 18" arm="-84; -84; -84" thigh="20; 20; 20" dur="3.2s" reduced={reduced} />
            </g>
          </Spin>
        ) : (
          <Spin kind="translate" values="0,12; 0,-14; 0,12" dur="2.6s" reduced={reduced}>
            <Spin kind="rotate" values="12; -12; 12" dur="2.6s" reduced={reduced}>
              <QuadBody head="-14; 18; -14" arm="2; 2; 2" thigh="0; 0; 0" dur="2.6s" reduced={reduced} />
            </Spin>
          </Spin>
        )}
      </g>
    </svg>
  );
}

export function CoachFigure({
  move,
  layout,
  side,
  phase,
  paused,
  label,
}: {
  move: MoveId;
  layout: Layout;
  side?: Side;
  phase: Phase;
  paused: boolean;
  label: string;
}) {
  if (layout === "quad") {
    return <Quad key={move} move={move} phase={phase} paused={paused} label={label} />;
  }
  return (
    <Human
      key={`${move}-${side ?? "na"}-${layout}`}
      move={move}
      layout={layout}
      side={side}
      phase={phase}
      paused={paused}
      label={label}
    />
  );
}
