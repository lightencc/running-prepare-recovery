import { Box3, Vector3, type Object3D } from "three";
import {
  CENTER_POINTS,
  GROUND_POINTS,
  LIMITS,
  SIDED_POINTS,
  type JointKey,
  type MoveAnim,
  type PointName,
  type Pose,
} from "./rig";

const D = Math.PI / 180;

export type JointName =
  | "root"
  | "pelvis"
  | "spine"
  | "chest"
  | "neck"
  | `${"shoulder" | "elbow" | "wrist" | "hip" | "knee" | "ankle"}${"L" | "R"}`;

/** Live handles into the mannequin's scene graph, filled in by ref callbacks. */
export type Rig = {
  joints: Partial<Record<JointName, Object3D>>;
  points: Partial<Record<PointName, Object3D>>;
  ribs?: Object3D;
};

export const ALL_POINTS: readonly PointName[] = [
  ...SIDED_POINTS.flatMap((name) => [`${name}L`, `${name}R`] as const),
  ...CENTER_POINTS,
];

export function rigReady(rig: Rig) {
  return Boolean(rig.joints.root && rig.joints.ankleR && rig.points.headTop && rig.points.handR);
}

export function applyPose(rig: Rig, p: Pose) {
  const j = rig.joints as Record<JointName, Object3D>;
  j.root.rotation.set(p.rootPitch * D, p.rootYaw * D, p.rootRoll * D, "YXZ");
  j.pelvis.rotation.set(0, p.pelvisTwist * D, 0);
  j.spine.rotation.set(p.lean * 0.55 * D, (p.twist * 0.4 - p.pelvisTwist) * D, -p.side * 0.5 * D);
  j.chest.rotation.set((p.lean * 0.45 + p.chestLean) * D, p.twist * 0.6 * D, -p.side * 0.5 * D);
  j.neck.rotation.set((p.headNod - p.lean * 0.6 - p.chestLean * 0.5) * D, (p.headTurn - p.twist * 0.4) * D, 0);
  for (const s of ["L", "R"] as const) {
    const sg = s === "L" ? 1 : -1;
    j[`hip${s}` as const].rotation.set(
      -p[`hip${s}` as const] * D,
      p[`hipRot${s}` as const] * sg * D,
      p[`hipAbd${s}` as const] * sg * D,
      "XZY",
    );
    j[`knee${s}` as const].rotation.set(p[`knee${s}` as const] * D, 0, 0);
    j[`ankle${s}` as const].rotation.set(p[`ankle${s}` as const] * D, 0, p[`ankleRoll${s}` as const] * sg * D, "XZY");
    j[`shoulder${s}` as const].rotation.set(
      -p[`sh${s}` as const] * D,
      -p[`shRot${s}` as const] * sg * D,
      (p[`shAbd${s}` as const] + 6) * sg * D,
      "XZY",
    );
    j[`elbow${s}` as const].rotation.set(-p[`elbow${s}` as const] * D, 0, 0);
    j[`wrist${s}` as const].rotation.set(-p[`wristDev${s}` as const] * D, 0, -p[`wrist${s}` as const] * sg * D, "ZXY");
  }
  if (rig.ribs) {
    const b = p.breath;
    rig.ribs.scale.set(1 + 0.025 * b, 1 + 0.01 * b, 1 + 0.07 * b);
  }
}

const a = new Vector3();
const b = new Vector3();

function at(rig: Rig, name: PointName, out: Vector3) {
  const obj = rig.points[name];
  if (!obj) return out.set(0, 0, 0);
  return out.setFromMatrixPosition(obj.matrixWorld);
}

function refresh(rig: Rig, p: Pose) {
  applyPose(rig, p);
  rig.joints.root?.updateMatrixWorld(true);
}

function clamp(key: JointKey, value: number) {
  const lim = LIMITS[key];
  return lim ? Math.min(lim[1], Math.max(lim[0], value)) : value;
}

/**
 * Hands, feet and knees that must touch something (a shin, the wall, the floor) are found by a
 * small search: nudge each listed joint angle up or down and keep the change when the point gets
 * closer to its target. `memo` carries the answer to the next frame so each frame only refines.
 */
export function solve(rig: Rig, anim: MoveAnim, t: number, p: Pose, memo: Map<JointKey, number>) {
  const reaches = anim.reach;
  if (!reaches?.length) return p;
  const free = { ...p };
  const params = [...new Set(reaches.flatMap((reach) => reach.params))];
  const warm = params.every((key) => memo.has(key));
  for (const key of params) if (memo.has(key)) p[key] = memo.get(key) as number;

  const error = () => {
    refresh(rig, p);
    let sum = 0;
    for (const reach of reaches) {
      at(rig, reach.from, a);
      at(rig, reach.to, b);
      const off = reach.offset;
      if (off) b.set(b.x + off[0], b.y + off[1], b.z + off[2]);
      const k = reach.importance ?? 1;
      if (reach.axes === "y") sum += k * (a.y - b.y) ** 2;
      else sum += k * a.distanceToSquared(b);
    }
    return sum;
  };

  let best = error();
  const search = (steps: readonly number[], passes: number) => {
    for (const step of steps) {
      for (let pass = 0; pass < passes; pass++) {
        for (const key of params) {
          for (const dir of [1, -1]) {
            const old = p[key];
            const next = clamp(key, old + step * dir);
            if (next === old) continue;
            p[key] = next;
            const e = error();
            if (e < best) best = e;
            else p[key] = old;
          }
        }
      }
    }
  };
  // Last frame's answer is usually a few degrees off; refine it, and only search wide when it is not.
  if (warm) search([4, 2, 1, 0.5], 1);
  if (!warm || best > 1e-4) search([12, 6, 3, 1.5, 0.75, 0.3], 3);
  for (const key of params) memo.set(key, p[key]);

  // Constraints that fade (hands letting go) blend between the free pose and the solved one.
  for (const reach of reaches) {
    if (!reach.weight) continue;
    const w = reach.weight(t);
    for (const key of reach.params) p[key] = free[key] + (p[key] - free[key]) * w;
  }
  return p;
}

/** Stand the posed figure on the floor and keep a planted foot where it was. */
export function place(rig: Rig, anim: MoveAnim, t: number, p: Pose) {
  const root = rig.joints.root;
  if (!root) return;
  root.position.set(0, 1, 0);
  refresh(rig, p);
  let min = Infinity;
  for (const name of GROUND_POINTS) min = Math.min(min, at(rig, name, a).y);
  root.position.y += -min + p.lift + 0.004;
  const pin = anim.pin?.(t);
  if (pin) {
    root.updateMatrixWorld(true);
    at(rig, pin.point, a);
    if (pin.x !== undefined) root.position.x += pin.x - a.x;
    if (pin.z !== undefined) root.position.z += pin.z - a.z;
  }
  root.updateMatrixWorld(true);
}

export function frame(rig: Rig, anim: MoveAnim, t: number, memo: Map<JointKey, number>, override?: Partial<Pose>) {
  const p = anim.pose(t);
  if (override) for (const [key, value] of Object.entries(override)) p[key as JointKey] += value ?? 0;
  solve(rig, anim, t, p, memo);
  place(rig, anim, t, p);
  return p;
}

/** Space the whole move sweeps through, sampled over one loop. */
export function measure(rig: Rig, anim: MoveAnim, memo: Map<JointKey, number>) {
  const box = new Box3();
  for (let i = 0; i < 12; i++) {
    frame(rig, anim, i / 12, memo);
    for (const name of ALL_POINTS) box.expandByPoint(at(rig, name, a));
  }
  box.min.y = Math.min(box.min.y, 0);
  return box;
}

const up = new Vector3(0, 1, 0);

/** Camera position that fits `box` from the given angle, with some room around it. */
export function fit(box: Box3, view: { az: number; el: number }, fov: number, aspect: number) {
  const center = box.getCenter(new Vector3());
  const dir = new Vector3(
    Math.sin(view.az * D) * Math.cos(view.el * D),
    Math.sin(view.el * D),
    Math.cos(view.az * D) * Math.cos(view.el * D),
  );
  const forward = dir.clone().negate();
  const right = forward.clone().cross(up).normalize();
  const upv = right.clone().cross(forward).normalize();
  let mx = 0;
  let my = 0;
  let mz = 0;
  const corner = new Vector3();
  for (let i = 0; i < 8; i++) {
    corner.set(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z);
    corner.sub(center);
    mx = Math.max(mx, Math.abs(corner.dot(right)));
    my = Math.max(my, Math.abs(corner.dot(upv)));
    mz = Math.max(mz, corner.dot(dir));
  }
  const tan = Math.tan((fov * D) / 2);
  const dist = Math.max((my + 0.12) / tan, (mx + 0.12) / (tan * aspect)) + mz;
  return { target: center, position: center.clone().addScaledVector(dir, dist) };
}
