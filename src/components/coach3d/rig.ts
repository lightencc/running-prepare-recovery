// Pose data model for the 3D coach. Pure data + math, no three.js, so it can be unit tested.
//
// Angles are degrees. The figure faces +Z and its left side is +X.
//   hip / sh       > 0  limb swings forward (flexion)
//   knee / elbow   > 0  bend
//   wrist          > 0  fingers curl toward the palm; wristDev > 0 tips the hand toward the thumb
//   ankle          > 0  toes point down (plantar flexion)
//   hipAbd / shAbd > 0  limb moves out to the side
//   hipRot         > 0  thigh turns outward (external rotation)
//   shRot          > 0  upper arm turns inward, so a bent elbow folds the forearm across the body
//   lean           > 0  trunk folds forward; chestLean adds upper-back rounding
//   side           > 0  trunk bends to its left
//   twist          > 0  chest turns to its left; pelvisTwist turns pelvis + legs the same way
//   rootPitch      > 0  whole body tips face-down (90 = on all fours), < 0 tips onto the back
//   lift (metres)  extra height after the feet are grounded (flight in running)
//   breath (0..1)  rib cage expansion

export const JOINT_KEYS = [
  "rootPitch",
  "rootRoll",
  "rootYaw",
  "lean",
  "chestLean",
  "side",
  "twist",
  "pelvisTwist",
  "headNod",
  "headTurn",
  "hipL",
  "hipR",
  "hipAbdL",
  "hipAbdR",
  "hipRotL",
  "hipRotR",
  "kneeL",
  "kneeR",
  "ankleL",
  "ankleR",
  "ankleRollL",
  "ankleRollR",
  "shL",
  "shR",
  "shAbdL",
  "shAbdR",
  "shRotL",
  "shRotR",
  "elbowL",
  "elbowR",
  "wristL",
  "wristR",
  "wristDevL",
  "wristDevR",
  "lift",
  "breath",
] as const;

export type JointKey = (typeof JOINT_KEYS)[number];
export type Pose = Record<JointKey, number>;
export type PosePart = Partial<Pose>;

export const REST: Pose = Object.fromEntries(JOINT_KEYS.map((key) => [key, 0])) as Pose;

export function pose(part: PosePart): Pose {
  return { ...REST, ...part };
}

/** Joint limits the reach solver must respect. */
export const LIMITS: Partial<Record<JointKey, [number, number]>> = {
  kneeL: [0, 165],
  kneeR: [0, 165],
  elbowL: [0, 160],
  elbowR: [0, 160],
};

// Named points on the body. Used to ground the figure, pin a foot, and aim hands/feet.
export const SIDED_POINTS = [
  "heel",
  "ball",
  "toe",
  "ankleTop",
  "kneeFront",
  "kneeTop",
  "shin",
  "hand",
  "elbowTip",
  "hipSide",
  "ankleOut",
] as const;
export const CENTER_POINTS = ["headTop", "headBack", "forehead", "butt", "chestBack", "bellyFront", "chestFront"] as const;

type Sided = (typeof SIDED_POINTS)[number];
export type PointName = `${Sided}L` | `${Sided}R` | (typeof CENTER_POINTS)[number];

/** Points that can touch the floor. */
export const GROUND_POINTS: readonly PointName[] = [
  ...(["heel", "ball", "toe", "ankleTop", "kneeFront", "shin", "hand", "elbowTip"] as const).flatMap(
    (name) => [`${name}L`, `${name}R`] as const,
  ),
  "headTop",
  "headBack",
  "forehead",
  "butt",
  "chestBack",
];

export type Vec3 = readonly [number, number, number];

/**
 * Move `from` onto `to + offset` (world axes) by adjusting `params`.
 * axes "y" only matches height, used for "this foot is also on the floor".
 * weight(t) fades the constraint in and out, e.g. hands letting go of a knee.
 */
export type Reach = {
  from: PointName;
  to: PointName;
  offset?: Vec3;
  params: readonly JointKey[];
  axes?: "xyz" | "y";
  weight?: (t: number) => number;
  /** How much this target counts against the others when they cannot all be met (default 1). */
  importance?: number;
};

/** Keep one point fixed on the floor plan (x/z), so a planted foot does not slide. */
export type Pin = { point: PointName; x?: number; z?: number };

export type MoveAnim = {
  /** Seconds per loop. */
  dur: number;
  pose: (t: number) => Pose;
  reach?: readonly Reach[];
  pin?: (t: number) => Pin | null;
  /** A wall to lean on, at this world z. */
  wall?: number;
  /** Loop position shown when motion is reduced or paused before the first frame. */
  still?: number;
  /** Default camera: azimuth from the front toward the figure's left, and elevation (degrees). */
  view?: { az: number; el: number };
};

export function swapSide<T extends string>(name: T): T {
  if (name.endsWith("L")) return (name.slice(0, -1) + "R") as T;
  if (name.endsWith("R")) return (name.slice(0, -1) + "L") as T;
  return name;
}

const NEGATE = new Set<JointKey>(["rootRoll", "rootYaw", "side", "twist", "pelvisTwist", "headTurn"]);

export function mirrorPose(p: Pose): Pose {
  const out = { ...REST };
  for (const key of JOINT_KEYS) {
    out[swapSide(key)] = NEGATE.has(key) ? -p[key] : p[key];
  }
  return out;
}

/** Moves are authored for the left side; this builds the right-side version. */
export function mirrorAnim(anim: MoveAnim): MoveAnim {
  return {
    ...anim,
    pose: (t) => mirrorPose(anim.pose(t)),
    reach: anim.reach?.map((reach) => ({
      ...reach,
      from: swapSide(reach.from),
      to: swapSide(reach.to),
      offset: reach.offset ? ([-reach.offset[0], reach.offset[1], reach.offset[2]] as const) : undefined,
      params: reach.params.map(swapSide),
    })),
    pin: anim.pin
      ? (t) => {
          const pin = anim.pin?.(t);
          if (!pin) return null;
          return { point: swapSide(pin.point), x: pin.x === undefined ? undefined : -pin.x, z: pin.z };
        }
      : undefined,
    view: anim.view ? { az: -anim.view.az, el: anim.view.el } : undefined,
  };
}

export type Key = readonly [number, PosePart];

/**
 * Cyclic Catmull-Rom through keyframes: motion keeps its speed through each key instead of
 * stopping on it. Repeat a key to make a hold.
 */
export function blend(keys: readonly Key[], t: number): Pose {
  const n = keys.length;
  const u0 = ((t % 1) + 1) % 1;
  let i = 0;
  while (i < n - 1 && keys[i + 1][0] <= u0) i++;
  const t0 = keys[i][0];
  const t1 = i + 1 < n ? keys[i + 1][0] : 1 + keys[0][0];
  const u = u0 < t0 ? (u0 + 1 - t0) / (t1 - t0) : (u0 - t0) / (t1 - t0);
  const a = keys[(i - 1 + n) % n][1];
  const b = keys[i][1];
  const c = keys[(i + 1) % n][1];
  const d = keys[(i + 2) % n][1];
  const out = { ...REST };
  for (const key of JOINT_KEYS) {
    const p0 = a[key] ?? 0;
    const p1 = b[key] ?? 0;
    const p2 = c[key] ?? 0;
    const p3 = d[key] ?? 0;
    out[key] =
      0.5 *
      (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u * u + (-p0 + 3 * p1 - 3 * p2 + p3) * u * u * u);
  }
  return out;
}

/** Smooth 0→1→0 bump over the loop, peaking at `at`. */
export function bump(t: number, at = 0.5, width = 0.5) {
  let d = Math.abs((((t - at) % 1) + 1.5) % 1 - 0.5);
  d = Math.min(1, d / width);
  return 0.5 + 0.5 * Math.cos(Math.PI * d);
}

/** Hold-shaped curve: ease up, hold, ease down. `rise` is the share of the loop spent moving each way. */
export function hold(t: number, rise = 0.25) {
  const u = ((t % 1) + 1) % 1;
  if (u < rise) return 0.5 - 0.5 * Math.cos((Math.PI * u) / rise);
  if (u > 1 - rise) return 0.5 - 0.5 * Math.cos((Math.PI * (1 - u)) / rise);
  return 1;
}

export const wave = (t: number, phase = 0) => Math.sin(2 * Math.PI * (t + phase));
export const pos = (x: number) => Math.max(0, x);
