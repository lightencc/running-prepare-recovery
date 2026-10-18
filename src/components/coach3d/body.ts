import {
  Bone,
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  Object3D,
  Skeleton,
  SkinnedMesh,
  Uint16BufferAttribute,
  Vector3,
  type Material,
} from "three";
import type { MuscleId } from "@/content/muscles";
import type { JointName, Rig } from "./driver";
import type { PointName } from "./rig";

// The mannequin is one continuous skin per material (skin, shirt, shorts, shoes) bound to
// a skeleton. Each body part is a tube of oval cross-sections ("rings") whose side, front and
// back widths change along its length; small bumps on top of that add landmarks a plain oval
// cannot (nose ridge, kneecap, the two heads of the calf). Around each joint the skin is shared
// between the two bones, so knees and elbows bend smoothly instead of showing a seam.
//
// Model space: hip joints at y≈0, up +Y, the figure faces +Z, its left side is +X.
// Everything is authored for the left side; the right side is a mirror copy.

export const MUSCLE_ORDER: readonly MuscleId[] = [
  "quads",
  "hamstrings",
  "glutes",
  "hipFlexors",
  "adductors",
  "abductors",
  "calves",
  "tibialis",
  "abs",
  "obliques",
  "lowerBack",
  "upperBack",
  "chest",
  "shoulders",
];
export const MUSCLE_SLOTS = MUSCLE_ORDER.length * 2;

/** Uniform slot for a muscle on one side; centre-line muscles use the left slot. */
export function muscleSlot(id: MuscleId, side: "L" | "R" | "C") {
  return MUSCLE_ORDER.indexOf(id) * 2 + (side === "R" ? 1 : 0);
}

type Side = "L" | "R";
type BoneName = JointName | "ribs" | "head";
type V3 = readonly [number, number, number];
type Ring = readonly [d: number, rx: number, rf: number, rb: number, cz?: number];
type Weights = { names: readonly BoneName[]; cuts: readonly (readonly [number, number])[] };
type MuscleFn = (d: number, theta: number) => readonly [MuscleId, Side | "C", number] | null;
/** Extra outward offset (metres) at a point on the tube: landmarks on top of the oval. */
type BumpFn = (d: number, theta: number) => number;
export type PartKey = "skin" | "shirt" | "shorts" | "shoe" | "sole";

// ---- skeleton (model-space rest positions, same frames as the pose driver expects) ----
const BONES: readonly (readonly [BoneName, BoneName | null, V3])[] = [
  ["root", null, [0, 0, 0]],
  ["pelvis", "root", [0, 0, 0]],
  ["spine", "pelvis", [0, 0.02, 0]],
  ["chest", "spine", [0, 0.2, 0]],
  ["ribs", "chest", [0, 0, 0]],
  ["neck", "chest", [0, 0.31, 0]],
  ["head", "neck", [0, 0.175, 0.014]],
  ["shoulderL", "chest", [0.185, 0.25, -0.005]],
  ["elbowL", "shoulderL", [0, -0.29, 0]],
  ["wristL", "elbowL", [0, -0.26, 0]],
  ["shoulderR", "chest", [-0.185, 0.25, -0.005]],
  ["elbowR", "shoulderR", [0, -0.29, 0]],
  ["wristR", "elbowR", [0, -0.26, 0]],
  ["hipL", "pelvis", [0.088, -0.02, 0]],
  ["kneeL", "hipL", [0, -0.44, 0]],
  ["ankleL", "kneeL", [0, -0.43, 0]],
  ["hipR", "pelvis", [-0.088, -0.02, 0]],
  ["kneeR", "hipR", [0, -0.44, 0]],
  ["ankleR", "kneeR", [0, -0.43, 0]],
];

// Points used to ground the figure and aim hands/feet, in their bone's local frame.
const POINTS: readonly (readonly [PointName, BoneName, V3])[] = [
  ["butt", "pelvis", [0, -0.03, -0.112]],
  // front-side of the hip bone, where a hand rests with fingers forward
  ["hipSideL", "pelvis", [0.172, 0.07, 0.045]],
  ["hipSideR", "pelvis", [-0.172, 0.07, 0.045]],
  ["bellyFront", "spine", [0, 0.12, 0.1]],
  ["chestBack", "chest", [0, 0.15, -0.105]],
  ["chestFront", "chest", [0, 0.17, 0.12]],
  ["headTop", "head", [0, 0.135, -0.01]],
  ["headBack", "head", [0, 0.02, -0.1]],
  ["forehead", "head", [0, 0.045, 0.088]],
  ...(["L", "R"] as const).flatMap((s) => {
    const sg = s === "L" ? 1 : -1;
    return [
      [`elbowTip${s}`, `shoulder${s}`, [0, -0.29, -0.038]],
      [`hand${s}`, `wrist${s}`, [-0.012 * sg, -0.065, 0.006]],
      [`kneeTop${s}`, `hip${s}`, [0, -0.36, 0.064]],
      [`kneeFront${s}`, `knee${s}`, [0, -0.01, 0.06]],
      [`shin${s}`, `knee${s}`, [0, -0.2, 0.045]],
      [`heel${s}`, `ankle${s}`, [0, -0.095, -0.07]],
      [`ball${s}`, `ankle${s}`, [0, -0.095, 0.12]],
      [`toe${s}`, `ankle${s}`, [0, -0.085, 0.205]],
      [`ankleTop${s}`, `ankle${s}`, [0, -0.025, 0.09]],
      [`ankleOut${s}`, `ankle${s}`, [0.044 * sg, 0, -0.01]],
    ] as const;
  }),
];

// ---- shapes: [distance along the part, half width, front depth, back depth, forward shift] ----
const LEG: readonly Ring[] = [
  [-0.03, 0.06, 0.06, 0.07],
  [0.02, 0.074, 0.074, 0.082],
  [0.1, 0.077, 0.08, 0.08],
  [0.2, 0.071, 0.078, 0.071],
  [0.3, 0.063, 0.069, 0.061],
  [0.38, 0.053, 0.056, 0.05],
  [0.43, 0.049, 0.053, 0.046, 0.004],
  [0.47, 0.047, 0.046, 0.049],
  [0.54, 0.049, 0.042, 0.063, -0.006],
  [0.61, 0.046, 0.038, 0.061, -0.008],
  [0.7, 0.036, 0.033, 0.043, -0.004],
  [0.78, 0.027, 0.029, 0.03],
  [0.86, 0.026, 0.029, 0.03],
  [0.885, 0.012, 0.012, 0.012],
];
// tight, mid-thigh compression shorts
const SHORTS_LEG: readonly Ring[] = [
  [-0.04, 0.083, 0.081, 0.094],
  [0.04, 0.087, 0.086, 0.092],
  [0.13, 0.083, 0.086, 0.084],
  [0.22, 0.077, 0.083, 0.077],
  [0.228, 0.073, 0.079, 0.073],
  [0.232, 0.066, 0.072, 0.066],
];
const PELVIS: readonly Ring[] = [
  [-0.13, 0.03, 0.03, 0.03],
  [-0.115, 0.1, 0.065, 0.075],
  [-0.07, 0.15, 0.085, 0.106],
  [-0.01, 0.162, 0.091, 0.112],
  [0.05, 0.158, 0.088, 0.1],
  [0.1, 0.151, 0.088, 0.09],
  [0.12, 0.147, 0.086, 0.086],
  [0.13, 0.13, 0.07, 0.07],
];
// V-shaped trunk: narrow waist, broad chest, shoulders sloping down from the collar
const SHIRT: readonly Ring[] = [
  [0.035, 0.15, 0.09, 0.094],
  [0.045, 0.156, 0.097, 0.099],
  [0.12, 0.148, 0.096, 0.095],
  [0.21, 0.143, 0.099, 0.091],
  [0.3, 0.163, 0.112, 0.095],
  [0.38, 0.182, 0.12, 0.1],
  [0.43, 0.198, 0.114, 0.103],
  [0.465, 0.205, 0.1, 0.1],
  [0.495, 0.193, 0.088, 0.092],
  [0.52, 0.158, 0.076, 0.081],
  [0.54, 0.11, 0.067, 0.071],
  [0.553, 0.076, 0.064, 0.064],
  [0.561, 0.066, 0.062, 0.062],
  [0.567, 0.02, 0.02, 0.02],
];
// ribbed crew-neck band sitting on the shoulders around the neck
const COLLAR: readonly Ring[] = [
  [0, 0.086, 0.077, 0.081],
  [0.012, 0.078, 0.073, 0.075],
  [0.024, 0.069, 0.067, 0.068],
  [0.03, 0.064, 0.063, 0.063],
  [0.033, 0.059, 0.059, 0.059],
];
const NECK: readonly Ring[] = [
  [0, 0.064, 0.06, 0.064],
  [0.08, 0.061, 0.059, 0.059],
  [0.16, 0.055, 0.056, 0.054, 0.006],
  [0.22, 0.056, 0.057, 0.057, 0.01],
  [0.25, 0.03, 0.03, 0.03, 0.012],
];
// egg-shaped mannequin head: chin forward, rounded back of the skull
const HEAD: readonly Ring[] = [
  [-0.108, 0.012, 0.012, 0.012, 0.05],
  [-0.1, 0.04, 0.036, 0.03, 0.045],
  [-0.08, 0.055, 0.052, 0.045, 0.036],
  [-0.045, 0.07, 0.071, 0.067, 0.02],
  [0.0, 0.079, 0.083, 0.09, 0.004],
  [0.05, 0.082, 0.083, 0.099, -0.004],
  [0.095, 0.072, 0.071, 0.087, -0.008],
  [0.125, 0.05, 0.047, 0.06, -0.01],
  [0.14, 0.012, 0.012, 0.014, -0.01],
];
// arm skin from the shoulder to the wrist; the hand is built separately
const ARM: readonly Ring[] = [
  [0.0, 0.026, 0.03, 0.03],
  [0.03, 0.046, 0.049, 0.049],
  [0.1, 0.045, 0.047, 0.049],
  [0.19, 0.04, 0.043, 0.044],
  [0.27, 0.033, 0.035, 0.036],
  [0.3, 0.032, 0.034, 0.036],
  [0.35, 0.037, 0.039, 0.035],
  [0.43, 0.03, 0.031, 0.029],
  [0.52, 0.022, 0.022, 0.02],
  [0.555, 0.019, 0.022, 0.02],
  [0.575, 0.01, 0.012, 0.011],
];
const SLEEVE: readonly Ring[] = [
  [-0.03, 0.02, 0.028, 0.028],
  [-0.012, 0.046, 0.054, 0.056],
  [0.02, 0.059, 0.061, 0.061],
  [0.07, 0.058, 0.059, 0.059],
  [0.128, 0.06, 0.06, 0.06],
  [0.134, 0.05, 0.05, 0.05],
];
// hand (left, arm hanging): palm faces the thigh (-X), thumb forward (+Z), fingers down
const PALM: readonly Ring[] = [
  [-0.01, 0.018, 0.021, 0.02],
  [0.015, 0.017, 0.032, 0.029],
  [0.05, 0.016, 0.04, 0.033],
  [0.085, 0.015, 0.04, 0.032],
  [0.099, 0.01, 0.028, 0.024],
  [0.105, 0.003, 0.008, 0.008],
];
// knuckle offset along the palm width, length, thickness, and how far each finger fans out
const FINGERS: readonly { z: number; len: number; r: number; fan: number }[] = [
  { z: 0.025, len: 0.078, r: 0.0092, fan: 0.16 },
  { z: 0.009, len: 0.088, r: 0.0095, fan: 0.05 },
  { z: -0.007, len: 0.083, r: 0.0091, fan: -0.05 },
  { z: -0.022, len: 0.066, r: 0.0082, fan: -0.17 },
];
// shoe (ankle frame): [z, half width, top y, bottom y]. A runner with a heel counter that rises
// to the ankle, an instep that climbs steeply to the opening, and a rounded toe box.
const UPPER: readonly (readonly [number, number, number, number])[] = [
  [-0.098, 0.016, -0.02, -0.072],
  [-0.092, 0.039, 0.026, -0.075],
  [-0.062, 0.047, 0.03, -0.075],
  [-0.03, 0.05, 0.022, -0.075],
  [0.0, 0.052, 0.014, -0.075],
  [0.035, 0.054, 0.002, -0.075],
  [0.085, 0.057, -0.016, -0.075],
  [0.14, 0.058, -0.032, -0.075],
  [0.185, 0.053, -0.037, -0.073],
  [0.215, 0.038, -0.044, -0.07],
  [0.232, 0.013, -0.05, -0.07],
];
// midsole flares a little past the upper so it reads as a band of its own
const MIDSOLE: readonly (readonly [number, number, number, number])[] = [
  [-0.106, 0.02, -0.062, -0.088],
  [-0.1, 0.047, -0.058, -0.097],
  [-0.055, 0.057, -0.058, -0.098],
  [0.03, 0.061, -0.063, -0.097],
  [0.115, 0.065, -0.065, -0.096],
  [0.172, 0.061, -0.065, -0.093],
  [0.212, 0.045, -0.063, -0.086],
  [0.238, 0.016, -0.062, -0.079],
];

// ---- muscle regions (degrees around the part: 0 = front, 90 = the figure's left) ----
type Region = { id: MuscleId; d: readonly [number, number]; th: readonly [number, number] };
const LEG_REGIONS: readonly Region[] = [
  { id: "hipFlexors", d: [-0.04, 0.1], th: [-8, 46] },
  { id: "abductors", d: [-0.04, 0.17], th: [90, 38] },
  { id: "quads", d: [0.1, 0.4], th: [0, 72] },
  { id: "hamstrings", d: [0.08, 0.41], th: [180, 64] },
  { id: "adductors", d: [0.03, 0.3], th: [-90, 34] },
  { id: "calves", d: [0.47, 0.74], th: [180, 72] },
  { id: "tibialis", d: [0.47, 0.8], th: [14, 30] },
];
const SHIRT_REGIONS: readonly (Region & { side: "L" | "R" | "C" })[] = [
  { id: "abs", d: [0.06, 0.32], th: [0, 22], side: "C" },
  { id: "obliques", d: [0.06, 0.31], th: [76, 24], side: "L" },
  { id: "obliques", d: [0.06, 0.31], th: [-76, 24], side: "R" },
  { id: "lowerBack", d: [0.05, 0.3], th: [180, 46], side: "C" },
  { id: "upperBack", d: [0.3, 0.53], th: [180, 74], side: "C" },
  { id: "chest", d: [0.35, 0.5], th: [0, 64], side: "C" },
];

function window(x: number, a: number, b: number, feather: number) {
  const s = (v: number) => (v <= 0 ? 0 : v >= 1 ? 1 : v * v * (3 - 2 * v));
  return s((x - a) / feather + 0.5) * s((b - x) / feather + 0.5);
}
function angleGap(a: number, b: number) {
  return Math.abs(((((a - b) % 360) + 540) % 360) - 180);
}
/**
 * Strength of each muscle at a point: an oval over the region that is full in the middle and
 * fades out toward its rim, so highlights read as muscle shapes rather than painted boxes.
 */
function best(regions: readonly (Region & { side?: "L" | "R" | "C" })[], d: number, theta: number, side: Side | "C") {
  let found: readonly [MuscleId, Side | "C", number] | null = null;
  for (const region of regions) {
    const dc = (region.d[0] + region.d[1]) / 2;
    const dh = (region.d[1] - region.d[0]) / 2 + 0.015;
    const th = region.th[1] + 8;
    const e = ((d - dc) / dh) ** 2 + (angleGap(theta, region.th[0]) / th) ** 2;
    const v = Math.min(1, Math.max(0, (1 - e) / 0.55));
    const w = v * v * (3 - 2 * v);
    if (w > 0.01 && (!found || w > found[2])) found = [region.id, region.side ?? side, w];
  }
  return found;
}

// ---- landmarks (bumps) ----
const g = (x: number, s: number) => Math.exp(-((x / s) ** 2));
const at = (theta: number, center: number, s: number) => g(angleGap(theta, center), s);

const HEAD_BUMPS: BumpFn = (d, th) =>
  // a mannequin face: only a faint nose ridge, brow line and chin, no eyes
  0.0025 * at(th, 0, 11) * g(d + 0.004, 0.028) + // nose ridge
  0.003 * at(th, 0, 20) * g(d + 0.085, 0.015); // chin

const LEG_BUMPS: BumpFn = (d, th) =>
  0.008 * at(th, 0, 26) * g(d - 0.425, 0.022) + // kneecap
  0.006 * at(th, -40, 22) * g(d - 0.36, 0.035) + // inner quad above the knee
  0.007 * at(th, -150, 28) * g(d - 0.58, 0.05) + // inner calf head
  0.004 * at(th, 150, 25) * g(d - 0.55, 0.045) - // outer calf head
  0.004 * at(th, 180, 30) * g(d - 0.77, 0.03) + // narrowing into the heel tendon
  0.002 * at(th, -10, 15) * g(d - 0.62, 0.12); // shin bone

const ARM_BUMPS: BumpFn = (d, th) =>
  0.004 * at(th, 0, 35) * g(d - 0.13, 0.05) + // biceps
  0.003 * at(th, 180, 35) * g(d - 0.12, 0.05) + // triceps
  0.004 * at(th, 180, 25) * g(d - 0.29, 0.02) + // elbow point
  0.003 * at(th, 50, 30) * g(d - 0.36, 0.04); // forearm muscle

const SHIRT_BUMPS: BumpFn = (d, th) =>
  0.004 * (at(th, 32, 26) + at(th, -32, 26)) * g(d - 0.4, 0.04) + // chest
  0.003 * (at(th, 150, 20) + at(th, -150, 20)) * g(d - 0.42, 0.045); // shoulder blades

const SHORTS_BUMPS: BumpFn = (d, th) => 0.006 * (at(th, 150, 30) + at(th, -150, 30)) * g(d + 0.05, 0.05); // glutes

// knit upper: a raised tongue with lace ridges across it
const UPPER_BUMPS: BumpFn = (z, th) =>
  at(th, 0, 22) * window(z, 0.0, 0.11, 0.02) * (0.0025 + 0.0025 * Math.max(0, Math.cos((z * 2 * Math.PI) / 0.022)));

// ---- tube building ----
function cardinal(rings: readonly Ring[], d: number, field: number) {
  const n = rings.length;
  let i = 0;
  while (i < n - 2 && rings[i + 1][0] < d) i++;
  const v = (k: number) => (rings[Math.max(0, Math.min(n - 1, k))][field] ?? 0) as number;
  const x = (k: number) => rings[Math.max(0, Math.min(n - 1, k))][0];
  const x0 = x(i);
  const x1 = x(i + 1);
  const h = x1 - x0;
  const u = h > 0 ? Math.min(1, Math.max(0, (d - x0) / h)) : 0;
  const m0 = ((v(i + 1) - v(i - 1)) / Math.max(1e-6, x(i + 1) - x(i - 1))) * h * 0.8;
  const m1 = ((v(i + 2) - v(i)) / Math.max(1e-6, x(i + 2) - x(i))) * h * 0.8;
  const u2 = u * u;
  const u3 = u2 * u;
  return (2 * u3 - 3 * u2 + 1) * v(i) + (u3 - 2 * u2 + u) * m0 + (-2 * u3 + 3 * u2) * v(i + 1) + (u3 - u2) * m1;
}

const spow = (v: number, p: number) => Math.sign(v) * Math.abs(v) ** p;

class Part {
  uv: number[] = [];
  pos: number[] = [];
  idx: number[] = [];
  si: number[] = [];
  sw: number[] = [];
  mus: number[] = [];
}

type BoneIndex = Record<BoneName, number>;

function weightsAt(w: Weights, d: number) {
  const out: [BoneName, number][] = [];
  const ts = w.cuts.map(([cut, width]) => {
    const v = (d - (cut - width)) / (2 * width);
    const c = Math.min(1, Math.max(0, v));
    return c * c * (3 - 2 * c);
  });
  for (let k = 0; k < w.names.length; k++) {
    const enter = k === 0 ? 1 : ts[k - 1];
    const leave = k < ts.length ? ts[k] : 0;
    const weight = enter - leave;
    if (weight > 1e-4) out.push([w.names[k], weight]);
  }
  return out;
}

function pushVertex(
  part: Part,
  bones: BoneIndex,
  pos: Vector3,
  ws: [BoneName, number][],
  muscle: readonly [MuscleId, Side | "C", number] | null,
) {
  part.pos.push(pos.x, pos.y, pos.z);
  const top = ws.sort((a, b) => b[1] - a[1]).slice(0, 4);
  const sum = top.reduce((acc, [, w]) => acc + w, 0) || 1;
  for (let k = 0; k < 4; k++) {
    part.si.push(top[k] ? bones[top[k][0]] : 0);
    part.sw.push(top[k] ? top[k][1] / sum : 0);
  }
  if (muscle) part.mus.push(muscleSlot(muscle[0], muscle[1]), muscle[2]);
  else part.mus.push(-1, 0);
}

const DOWN: V3 = [0, -1, 0];
const UP: V3 = [0, 1, 0];

/**
 * Sweep oval rings along `axis` from `origin`. Ring angle 0 points along `front`, 90° along
 * `side` (the figure's left for limbs). Built for the left side; `mirror` reflects it to the right.
 */
function tube(
  part: Part,
  bones: BoneIndex,
  opts: {
    rings: readonly Ring[];
    origin: V3;
    axis?: V3;
    front?: V3;
    mirror?: boolean;
    weights: Weights;
    muscle?: MuscleFn;
    bump?: BumpFn;
    segs?: number;
    step?: number;
    shape?: number;
    /** Texture repeats around the tube and per metre along it. */
    uvScale?: readonly [number, number];
  },
) {
  const { rings, origin, mirror = false, weights, muscle, bump, segs = 40, step = 0.007, shape = 2.3 } = opts;
  const [uRep, vRep] = opts.uvScale ?? [4, 40];
  const axis = new Vector3(...(opts.axis ?? DOWN)).normalize();
  const front = new Vector3(...(opts.front ?? [0, 0, 1]));
  front.addScaledVector(axis, -front.dot(axis)).normalize();
  const side = new Vector3(1, 0, 0);
  side.addScaledVector(axis, -side.dot(axis)).addScaledVector(front, -side.dot(front));
  if (side.lengthSq() < 1e-6) side.crossVectors(front, axis);
  side.normalize();
  const o = new Vector3(...origin);
  const start = rings[0][0];
  const end = rings[rings.length - 1][0];
  const count = Math.max(2, Math.ceil((end - start) / step) + 1);
  const base = part.pos.length / 3;
  const p = 2 / shape;
  const pos = new Vector3();
  for (let k = 0; k < count; k++) {
    const d = start + ((end - start) * k) / (count - 1);
    const rx = Math.max(0.001, cardinal(rings, d, 1));
    const rf = Math.max(0.001, cardinal(rings, d, 2));
    const rb = Math.max(0.001, cardinal(rings, d, 3));
    const cz = cardinal(rings, d, 4);
    const ws = weightsAt(weights, d);
    for (let j = 0; j < segs; j++) {
      const th = (2 * Math.PI * j) / segs;
      const deg = th > Math.PI ? (th * 180) / Math.PI - 360 : (th * 180) / Math.PI;
      let lx = rx * spow(Math.sin(th), p);
      let lz = (Math.cos(th) >= 0 ? rf : rb) * spow(Math.cos(th), p);
      if (bump) {
        const len = Math.hypot(lx, lz) || 1;
        const b = bump(d, deg);
        lx += (lx / len) * b;
        lz += (lz / len) * b;
      }
      pos.copy(o).addScaledVector(axis, d).addScaledVector(side, lx).addScaledVector(front, lz + cz);
      if (mirror) pos.x = -pos.x;
      pushVertex(part, bones, pos, [...ws], muscle?.(d, deg) ?? null);
      part.uv.push((j / segs) * uRep, (d - start) * vRep);
    }
  }
  const handed = new Vector3().crossVectors(side, front).dot(axis) < 0;
  const outward = handed !== mirror;
  for (let k = 0; k < count - 1; k++) {
    for (let j = 0; j < segs; j++) {
      const a = base + k * segs + j;
      const b = base + k * segs + ((j + 1) % segs);
      const c = base + (k + 1) * segs + ((j + 1) % segs);
      const e = base + (k + 1) * segs + j;
      if (outward) part.idx.push(a, b, c, a, c, e);
      else part.idx.push(a, c, b, a, e, c);
    }
  }
}

/** Shoe rings [z, half width, top y, bottom y] → oval rings around a forward axis. */
function shoeRings(rows: readonly (readonly [number, number, number, number])[]): Ring[] {
  return rows.map(([z, hw, top, bottom]) => {
    const cy = (top + bottom) / 2;
    return [z, hw, Math.max(0.002, top - cy), Math.max(0.002, cy - bottom), cy];
  });
}

function hand(part: Part, bones: BoneIndex, side: Side) {
  const wrist: V3 = [0.185, -0.08, -0.005];
  const weights: Weights = { names: [`wrist${side}`], cuts: [] };
  const mirror = side === "R";
  tube(part, bones, { rings: PALM, origin: wrist, mirror, weights, segs: 24, step: 0.005, shape: 2.6 });
  for (const finger of FINGERS) {
    // relaxed hand: each finger fans out a little and its outer half curls toward the palm
    const r = finger.r;
    const base = new Vector3(wrist[0] - 0.004, wrist[1] - 0.093, wrist[2] + finger.z);
    const near = new Vector3(-0.18, -1, finger.fan).normalize();
    const far = new Vector3(-0.75, -1, finger.fan * 1.2).normalize();
    const nearLen = finger.len * 0.48;
    const knuckle = base.clone().addScaledVector(near, nearLen);
    tube(part, bones, {
      rings: [
        [-0.004, r * 1.02, r * 1.02, r * 1.02],
        [nearLen * 0.5, r * 0.97, r * 0.97, r * 0.97],
        [nearLen, r * 0.92, r * 0.92, r * 0.92],
        [nearLen + 0.004, r * 0.6, r * 0.6, r * 0.6],
      ],
      origin: [base.x, base.y, base.z],
      axis: [near.x, near.y, near.z],
      mirror,
      weights,
      segs: 12,
      step: 0.004,
      shape: 2,
    });
    const farLen = finger.len - nearLen;
    tube(part, bones, {
      rings: [
        [-0.004, r * 0.6, r * 0.6, r * 0.6],
        [0, r * 0.9, r * 0.9, r * 0.9],
        [farLen * 0.6, r * 0.82, r * 0.82, r * 0.82],
        [farLen - 0.005, r * 0.74, r * 0.74, r * 0.74],
        [farLen, r * 0.25, r * 0.25, r * 0.25],
      ],
      origin: [knuckle.x, knuckle.y, knuckle.z],
      axis: [far.x, far.y, far.z],
      mirror,
      weights,
      segs: 12,
      step: 0.004,
      shape: 2,
    });
  }
  tube(part, bones, {
    rings: [
      [0, 0.012, 0.012, 0.012],
      [0.03, 0.01, 0.01, 0.01],
      [0.055, 0.008, 0.008, 0.008],
      [0.062, 0.003, 0.003, 0.003],
    ],
    origin: [wrist[0] - 0.006, wrist[1] - 0.02, wrist[2] + 0.024],
    axis: [-0.35, -0.6, 0.72],
    front: [0, 1, 0],
    mirror,
    weights,
    segs: 12,
    step: 0.005,
    shape: 2,
  });
}

function shoe(parts: Record<PartKey, Part>, bones: BoneIndex, side: Side) {
  const ankle: V3 = [0.088, -0.89, 0];
  const weights: Weights = { names: [`ankle${side}`], cuts: [] };
  const mirror = side === "R";
  const common = { origin: ankle, axis: [0, 0, 1] as V3, front: [0, 1, 0] as V3, mirror, weights, segs: 40, step: 0.005 };
  tube(parts.shoe, bones, { ...common, rings: shoeRings(UPPER), shape: 2.8, bump: UPPER_BUMPS, uvScale: [6, 70] });
  tube(parts.sole, bones, { ...common, rings: shoeRings(MIDSOLE), shape: 2.7 });
  // laces cross the tongue in alternating diagonals, resting on the upper
  const upper = shoeRings(UPPER);
  for (let k = 0; k < 6; k++) {
    const z = 0.006 + k * 0.019;
    const top = cardinal(upper, z, 4) + cardinal(upper, z, 2);
    const dir = new Vector3(1, 0.0, k % 2 ? 0.45 : -0.45).normalize();
    const half = 0.022;
    tube(parts.sole, bones, {
      rings: [
        [0, 0.0012, 0.0012, 0.0012],
        [0.003, 0.0024, 0.0024, 0.0024],
        [half * 2 - 0.003, 0.0024, 0.0024, 0.0024],
        [half * 2, 0.0012, 0.0012, 0.0012],
      ],
      origin: [ankle[0] - dir.x * half, ankle[1] + top + 0.0035, ankle[2] + z - dir.z * half],
      axis: [dir.x, dir.y, dir.z],
      front: [0, 1, 0],
      mirror,
      weights,
      segs: 8,
      step: 0.004,
      shape: 2,
    });
  }
}

export function buildBody(materials: Record<PartKey, Material>) {
  const container = new Group();
  const bones = {} as Record<BoneName, Bone>;
  const index = {} as BoneIndex;
  const list: Bone[] = [];
  for (const [name, parent, pos] of BONES) {
    const bone = new Bone();
    bone.name = name;
    bone.position.set(...pos);
    if (parent) bones[parent].add(bone);
    bones[name] = bone;
    index[name] = list.length;
    list.push(bone);
  }
  container.add(bones.root);
  container.updateMatrixWorld(true);

  const parts: Record<PartKey, Part> = {
    skin: new Part(),
    shirt: new Part(),
    shorts: new Part(),
    shoe: new Part(),
    sole: new Part(),
  };

  for (const side of ["L", "R"] as const) {
    const mirror = side === "R";
    const hip: V3 = [0.088, -0.02, 0];
    const shoulder: V3 = [0.185, 0.47, -0.005];
    const legWeights: Weights = {
      names: ["pelvis", `hip${side}`, `knee${side}`, `ankle${side}`],
      cuts: [[0.02, 0.06], [0.44, 0.05], [0.86, 0.025]],
    };
    const armWeights: Weights = {
      names: ["chest", `shoulder${side}`, `elbow${side}`, `wrist${side}`],
      cuts: [[-0.015, 0.05], [0.29, 0.04], [0.55, 0.03]],
    };
    const legMuscle: MuscleFn = (d, th) => best(LEG_REGIONS, d, th, side);
    tube(parts.skin, index, { rings: LEG, origin: hip, mirror, weights: legWeights, muscle: legMuscle, bump: LEG_BUMPS });
    tube(parts.shorts, index, { rings: SHORTS_LEG, origin: hip, mirror, weights: legWeights, muscle: legMuscle });
    tube(parts.skin, index, { rings: ARM, origin: shoulder, mirror, weights: armWeights, segs: 32, bump: ARM_BUMPS });
    tube(parts.shirt, index, {
      rings: SLEEVE,
      origin: shoulder,
      mirror,
      weights: armWeights,
      segs: 36,
      muscle: (d) => (d < 0.14 ? ["shoulders", side, window(d, -0.08, 0.14, 0.03)] : null),
    });
    hand(parts.skin, index, side);
    shoe(parts, index, side);
  }

  tube(parts.shorts, index, {
    rings: PELVIS,
    origin: [0, 0, 0],
    axis: UP,
    weights: { names: ["pelvis", "spine"], cuts: [[0.1, 0.04]] },
    segs: 56,
    bump: (d, th) => SHORTS_BUMPS(d, th),
    muscle: (d, th) =>
      best(
        [
          { id: "glutes", d: [-0.12, 0.07], th: [140, 36], side: "L" },
          { id: "glutes", d: [-0.12, 0.07], th: [-140, 36], side: "R" },
        ],
        d,
        th,
        "C",
      ),
  });
  const shirtWeights: Weights = {
    names: ["pelvis", "spine", "ribs", "neck"],
    cuts: [[0.06, 0.05], [0.24, 0.06], [0.545, 0.015]],
  };
  tube(parts.shirt, index, {
    rings: SHIRT,
    origin: [0, 0, 0],
    axis: UP,
    weights: shirtWeights,
    segs: 64,
    bump: SHIRT_BUMPS,
    muscle: (d, th) => best(SHIRT_REGIONS, d, th, "C"),
  });
  tube(parts.shirt, index, {
    rings: COLLAR,
    origin: [0, 0.522, 0.004],
    axis: UP,
    weights: { names: ["ribs", "neck"], cuts: [[0.03, 0.02]] },
    segs: 48,
    step: 0.003,
    shape: 2,
  });
  tube(parts.skin, index, {
    rings: NECK,
    origin: [0, 0.45, 0],
    axis: UP,
    weights: { names: ["ribs", "neck"], cuts: [[0.07, 0.03]] },
    segs: 32,
  });
  tube(parts.skin, index, {
    rings: HEAD,
    origin: [0, 0.705, 0.014],
    axis: UP,
    weights: { names: ["head"], cuts: [] },
    segs: 64,
    step: 0.004,
    bump: HEAD_BUMPS,
  });

  const skeleton = new Skeleton(list);
  const meshes: SkinnedMesh[] = [];
  for (const key of Object.keys(parts) as PartKey[]) {
    const part = parts[key];
    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(part.pos, 3));
    geo.setAttribute("skinIndex", new Uint16BufferAttribute(part.si, 4));
    geo.setAttribute("skinWeight", new Float32BufferAttribute(part.sw, 4));
    geo.setAttribute("aMuscle", new Float32BufferAttribute(part.mus, 2));
    geo.setAttribute("uv", new Float32BufferAttribute(part.uv, 2));
    geo.setIndex(part.idx);
    geo.computeVertexNormals();
    const mesh = new SkinnedMesh(geo, materials[key]);
    mesh.castShadow = true;
    mesh.frustumCulled = false;
    container.add(mesh);
    mesh.bind(skeleton);
    meshes.push(mesh);
  }

  const rig: Rig = { joints: {}, points: {} };
  for (const name of Object.keys(bones) as BoneName[]) {
    if (name !== "ribs" && name !== "head") rig.joints[name] = bones[name];
  }
  rig.ribs = bones.ribs;
  for (const [name, bone, pos] of POINTS) {
    const obj = new Object3D();
    obj.position.set(...pos);
    bones[bone].add(obj);
    rig.points[name] = obj;
  }
  return {
    container,
    rig,
    vertexCount: meshes.reduce((sum, mesh) => sum + mesh.geometry.getAttribute("position").count, 0),
    dispose() {
      for (const mesh of meshes) mesh.geometry.dispose();
      skeleton.dispose();
    },
  };
}
