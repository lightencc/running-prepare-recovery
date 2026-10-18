import type { MoveId } from "@/content/library";
import { blend, bump, hold, pose, pos, wave, type Key, type MoveAnim, type PosePart, type Reach } from "./rig";

// Every one-sided move is authored for the LEFT side (left leg / left arm does the work).
// The right side is built by mirrorAnim().

// Hands on hips: the hand lands on the hip and, less strictly, the elbow opens out to the side
// and a little back, so the arm forms the wide triangle seen in the reference demos.
const handsOnHips: readonly Reach[] = [
  { from: "handL", to: "hipSideL", params: ["shL", "shAbdL", "shRotL", "elbowL"] },
  { from: "handR", to: "hipSideR", params: ["shR", "shAbdR", "shRotR", "elbowR"] },
  { from: "elbowTipL", to: "hipSideL", offset: [0.15, 0.17, -0.1], params: ["shL", "shAbdL", "shRotL", "elbowL"], importance: 0.25 },
  { from: "elbowTipR", to: "hipSideR", offset: [-0.15, 0.17, -0.1], params: ["shR", "shAbdR", "shRotR", "elbowR"], importance: 0.25 },
];
// hands on hips: elbows out and back, fingers pointing forward and down
const hipArms: PosePart = {
  shL: -18, shR: -18, shAbdL: 40, shAbdR: 40, shRotL: 70, shRotR: 70, elbowL: 100, elbowR: 100,
  wristL: -12, wristR: -12, wristDevL: 18, wristDevR: 18,
};

// One leg through a running stride; the other leg runs half a loop behind.
const RUN_LEG: readonly Key[] = [
  [0.0, { hipL: 6, kneeL: 22, ankleL: 2 }],
  [0.2, { hipL: -12, kneeL: 28, ankleL: 22 }],
  [0.42, { hipL: 4, kneeL: 92, ankleL: 18 }],
  [0.7, { hipL: 40, kneeL: 78, ankleL: -6 }],
  [0.88, { hipL: 24, kneeL: 34, ankleL: -4 }],
];
const WALK_LEG: readonly Key[] = [
  [0.0, { hipL: 20, kneeL: 4, ankleL: -4 }],
  [0.15, { hipL: 12, kneeL: 14, ankleL: 6 }],
  [0.4, { hipL: -12, kneeL: 6, ankleL: 0 }],
  [0.56, { hipL: -16, kneeL: 32, ankleL: 22 }],
  [0.76, { hipL: 14, kneeL: 58, ankleL: 0 }],
  [0.9, { hipL: 26, kneeL: 18, ankleL: -8 }],
];

function legs(keys: readonly Key[], t: number, hipScale = 1, kneeScale = 1): PosePart {
  const l = blend(keys, t);
  const r = blend(keys, t + 0.5);
  return {
    hipL: l.hipL * hipScale,
    kneeL: l.kneeL * kneeScale,
    ankleL: l.ankleL,
    hipR: r.hipL * hipScale,
    kneeR: r.kneeL * kneeScale,
    ankleR: r.ankleL,
  };
}

function runner(t: number, opts: { hip: number; knee: number; arm: number; lean: number; lift: number; twist: number }) {
  const swing = wave(t, -0.08);
  return pose({
    ...legs(RUN_LEG, t, opts.hip, opts.knee),
    shL: -swing * opts.arm + 4,
    shR: swing * opts.arm + 4,
    elbowL: 88 + swing * 8,
    elbowR: 88 - swing * 8,
    shAbdL: 4,
    shAbdR: 4,
    lean: opts.lean,
    twist: swing * opts.twist,
    headNod: 4,
    lift: opts.lift * pos(Math.sin(2 * Math.PI * (2 * t - 0.12))),
  });
}

/** Mirror a key's left/right channels (used for alternating moves inside one loop). */
function flip(part: PosePart): PosePart {
  const out: PosePart = {};
  for (const [key, value] of Object.entries(part)) {
    const k = key.endsWith("L") ? key.slice(0, -1) + "R" : key.endsWith("R") ? key.slice(0, -1) + "L" : key;
    out[k as keyof PosePart] = value;
  }
  return out;
}

const LUNGE_KEYS: readonly Key[] = (() => {
  const stand: PosePart = { kneeL: 3, kneeR: 3, shL: 4, shR: 4, elbowL: 14, elbowR: 14, shAbdL: 3, shAbdR: 3 };
  // right leg steps forward, left foot stays planted and its knee drops
  const step: PosePart = {
    hipR: 52, kneeR: 58, ankleR: -8, hipL: -6, kneeL: 30, ankleL: 4,
    shL: 16, shR: -8, elbowL: 24, elbowR: 16, shAbdL: 4, shAbdR: 4, lean: 2,
  };
  const down: PosePart = {
    hipR: 84, kneeR: 90, ankleR: 2, hipL: -12, kneeL: 100, ankleL: -38,
    shL: 20, shR: -14, elbowL: 32, elbowR: 20, shAbdL: 5, shAbdR: 5, lean: 2, headNod: 2,
  };
  return [
    [0.0, stand], [0.1, step], [0.2, down], [0.3, down], [0.4, step],
    [0.5, stand], [0.6, flip(step)], [0.7, flip(down)], [0.8, flip(down)], [0.9, flip(step)],
  ];
})();

/** 0 before `a`, 1 after `b`, smooth in between (within one loop). */
function ease(t: number, a: number, b: number) {
  const u = Math.min(1, Math.max(0, ((((t % 1) + 1) % 1) - a) / (b - a)));
  return u * u * (3 - 2 * u);
}

export const MOVE_ANIMS: Record<MoveId, MoveAnim> = {
  jog: {
    dur: 0.72,
    pose: (t) => runner(t, { hip: 0.85, knee: 1, arm: 32, lean: 7, lift: 0.035, twist: 7 }),
  },
  walk: {
    dur: 1.15,
    pose: (t) => {
      const swing = wave(t, -0.05);
      return pose({
        ...legs(WALK_LEG, t),
        shL: -swing * 18 + 2,
        shR: swing * 18 + 2,
        elbowL: 18,
        elbowR: 18,
        shAbdL: 3,
        shAbdR: 3,
        lean: 2,
        twist: swing * 4,
      });
    },
  },
  stride: {
    dur: 0.5,
    pose: (t) => runner(t, { hip: 1.25, knee: 1.05, arm: 42, lean: 9, lift: 0.06, twist: 9 }),
  },
  // Timed to the reference demo: both legs in 0.63 s. The knee drives up until the thigh is
  // level with the foot hanging flat under it; the legs swap with a short hop; each landing gives
  // a little at the knee. Arms pump opposite the legs, front hand to shoulder height.
  "high-knees": {
    dur: 0.633,
    still: 0,
    pose: (t) => {
      const raise = (u: number) => pos(Math.cos(2 * Math.PI * u)) ** 0.55;
      const land = (u: number) => bump(u, 0.32, 0.1);
      const l = raise(t);
      const r = raise(t + 0.5);
      const s = Math.cos(2 * Math.PI * t);
      return pose({
        hipL: 6 + 82 * l, kneeL: 12 + 84 * l + 14 * land(t), ankleL: 22 - 30 * l,
        hipR: 6 + 82 * r, kneeR: 12 + 84 * r + 14 * land(t + 0.5), ankleR: 22 - 30 * r,
        shR: 12 + 43 * s, shL: 12 - 43 * s,
        elbowR: 82 + 18 * s, elbowL: 82 - 18 * s,
        shAbdR: 6 - 8 * pos(s), shAbdL: 6 - 8 * pos(-s),
        wristL: -10, wristR: -10,
        lean: 1, twist: -5 * s,
        lift: 0.045 * pos(-Math.cos(4 * Math.PI * t)) ** 1.5,
      });
    },
  },
  "butt-kicks": {
    dur: 0.5,
    pose: (t) => {
      const l = pos(wave(t)) ** 0.8;
      const r = pos(wave(t, 0.5)) ** 0.8;
      return pose({
        hipL: 4 + 6 * l, kneeL: 18 + 112 * l, ankleL: 14 + 30 * l,
        hipR: 4 + 6 * r, kneeR: 18 + 112 * r, ankleR: 14 + 30 * r,
        shL: 6 + 30 * r - 24 * l, shR: 6 + 30 * l - 24 * r,
        elbowL: 90, elbowR: 90, shAbdL: 4, shAbdR: 4,
        lean: 5, headNod: 3,
        lift: 0.025 * Math.abs(wave(2 * t, 0.25)),
      });
    },
  },
  "a-skip": {
    dur: 0.9,
    pose: (t) => {
      const l = pos(wave(t)) ** 0.7;
      const r = pos(wave(t, 0.5)) ** 0.7;
      return pose({
        hipL: 8 + 70 * l, kneeL: 14 + 74 * l, ankleL: 16 - 34 * l,
        hipR: 8 + 70 * r, kneeR: 14 + 74 * r, ankleR: 16 - 34 * r,
        shL: 8 + 46 * r - 26 * l, shR: 8 + 46 * l - 26 * r,
        elbowL: 90, elbowR: 90, shAbdL: 4, shAbdR: 4,
        lean: 1, headNod: 2,
        lift: 0.06 * pos(wave(2 * t, -0.1)),
      });
    },
  },
  ankle: {
    dur: 2.2,
    still: 0.2,
    view: { az: 64, el: 10 },
    reach: handsOnHips,
    pin: () => ({ point: "ballR", z: 0.05 }),
    pose: (t) => {
      const a = 2 * Math.PI * t;
      return pose({
        ...hipArms,
        hipL: 60, kneeL: 76, hipAbdL: 10,
        ankleL: 18 + 24 * Math.sin(a), ankleRollL: 24 * Math.cos(a),
        kneeR: 4, lean: 2,
      });
    },
  },
  "arm-circles": {
    dur: 2.6,
    still: 0.3,
    view: { az: 24, el: 8 },
    pose: (t) => pose({ shL: 360 * t, shR: 360 * t, shAbdL: 14, shAbdR: 14, elbowL: 4, elbowR: 4, kneeL: 4, kneeR: 4 }),
  },
  "hip-circles": {
    dur: 2.8,
    view: { az: 28, el: 10 },
    reach: handsOnHips,
    pin: () => ({ point: "ballL", x: 0.088, z: 0.12 }),
    pose: (t) => {
      const a = 2 * Math.PI * t;
      return pose({
        ...hipArms,
        hipAbdL: 7 * Math.sin(a), hipAbdR: -7 * Math.sin(a),
        hipL: 7 * Math.cos(a), hipR: 7 * Math.cos(a),
        kneeL: 10, kneeR: 10, ankleL: -7 * Math.cos(a) - 10, ankleR: -7 * Math.cos(a) - 10,
        side: 4 * Math.sin(a), lean: -4 * Math.cos(a),
      });
    },
  },
  "torso-twist": {
    dur: 1.9,
    view: { az: 16, el: 16 },
    // arms folded across the chest so the turn comes from the trunk, not a swing of the arms
    reach: [
      { from: "handL", to: "chestFront", offset: [-0.1, 0.05, 0.05], params: ["shL", "shAbdL", "elbowL"] },
      { from: "handR", to: "chestFront", offset: [0.1, 0.0, 0.09], params: ["shR", "shAbdR", "elbowR"] },
    ],
    pose: (t) => {
      const s = wave(t);
      return pose({
        twist: 42 * s, headTurn: 18 * s,
        shL: 60, shR: 70, shAbdL: -10, shAbdR: -10, elbowL: 120, elbowR: 110,
        kneeL: 8, kneeR: 8, ankleL: -8, ankleR: -8,
      });
    },
  },
  "leg-swing": {
    dur: 1.6,
    view: { az: 78, el: 6 },
    pin: () => ({ point: "ballR", z: 0 }),
    pose: (t) => {
      const s = wave(t);
      return pose({
        hipL: 16 + 46 * s, kneeL: 12 - 6 * s, ankleL: 14 - 18 * s,
        kneeR: 3, lean: -5 * s,
        shAbdL: 26, shAbdR: 40, elbowL: 15, elbowR: 15, shL: -15 * s, shR: 15 * s,
      });
    },
  },
  "leg-swing-side": {
    dur: 1.6,
    view: { az: 8, el: 6 },
    pin: () => ({ point: "ballR", x: -0.088, z: 0 }),
    pose: (t) => {
      const s = wave(t);
      return pose({
        hipAbdL: 12 + 30 * s, hipL: 12 + 10 * pos(-s), kneeL: 10, ankleL: 10,
        kneeR: 4, side: -6 * s,
        shAbdL: 55, shAbdR: 55, elbowL: 12, elbowR: 12,
      });
    },
  },
  lunge: {
    dur: 4.4,
    still: 0.25,
    view: { az: 62, el: 8 },
    pose: (t) => blend(LUNGE_KEYS, t),
    pin: (t) => ({ point: ((t % 1) + 1) % 1 < 0.5 ? "ballL" : "ballR", z: -0.22 }),
  },
  "side-lunge": {
    dur: 3.2,
    still: 0.5,
    view: { az: 6, el: 8 },
    pin: () => ({ point: "ballR", x: -0.48, z: 0 }),
    reach: [
      { from: "ballL", to: "ballR", offset: [1.0, 0, 0], params: ["hipL", "hipAbdL", "kneeL"] },
      { from: "heelL", to: "heelR", axes: "y", params: ["ankleL"] },
    ],
    pose: (t) => {
      const u = hold(t, 0.3);
      return pose({
        // trailing leg stays straight and slides out; the lead leg is solved to keep its foot planted
        hipAbdR: 20 + 32 * u, hipR: 6, kneeR: 2, ankleR: -6, ankleRollR: -(20 + 32 * u),
        hipAbdL: 22, hipL: 10 + 50 * u, kneeL: 4 + 80 * u, ankleRollL: -16,
        lean: 10 + 25 * u, headNod: 4,
        shL: 50 + 20 * u, shR: 50 + 20 * u, shAbdL: -14, shAbdR: -14, elbowL: 70, elbowR: 70,
      });
    },
  },
  "knee-hug": {
    dur: 3.0,
    still: 0.5,
    view: { az: 66, el: 8 },
    pin: () => ({ point: "ballR", z: 0 }),
    reach: [
      { from: "handL", to: "shinL", offset: [0.065, 0, 0.01], params: ["shL", "shAbdL", "elbowL"], weight: (t) => hold(t, 0.28) },
      { from: "handR", to: "shinL", offset: [-0.065, 0, 0.01], params: ["shR", "shAbdR", "elbowR"], weight: (t) => hold(t, 0.28) },
    ],
    pose: (t) => {
      const u = hold(t, 0.28);
      return pose({
        hipL: 122 * u, kneeL: 5 + 125 * u, ankleL: 22 * u,
        kneeR: 4, ankleR: 14 * u, lean: -2 + 4 * u, headNod: 3,
        shL: 8 + 50 * u, shR: 8 + 50 * u, shAbdL: 6, shAbdR: 6, elbowL: 15 + 70 * u, elbowR: 15 + 70 * u,
      });
    },
  },
  worlds: {
    dur: 4.4,
    still: 0.5,
    view: { az: 34, el: 14 },
    pin: () => ({ point: "ballL", z: 0.42 }),
    reach: [
      { from: "ballR", to: "ballL", axes: "y", params: ["kneeR"] },
      { from: "handR", to: "ballL", offset: [-0.2, 0.03, 0.02], params: ["shR", "shAbdR", "elbowR"] },
    ],
    pose: (t) => {
      const u = hold(t, 0.3);
      return pose({
        hipL: 88, kneeL: 92, ankleL: -4,
        hipR: -22, kneeR: 40, ankleR: -32,
        lean: 50, twist: 10 + 50 * u, headTurn: 25 * u, headNod: -10 * u,
        shR: 80, shAbdR: -10, elbowR: 10,
        shL: 70 * (1 - u), shAbdL: 95 * u, elbowL: 60 * (1 - u) + 5 * u,
      });
    },
  },
  // Timed to the reference demo: one rep in 1.93 s — pause, rise, short hold at the top, lower.
  // The body tips slightly forward over the balls of the feet; the gaze stays on the floor ahead.
  "calf-raise": {
    dur: 1.93,
    still: 0.48,
    view: { az: 32, el: 6 },
    reach: handsOnHips,
    pose: (t) => {
      const u = ease(t, 0.14, 0.42) * (1 - ease(t, 0.56, 0.82));
      return pose({
        ...hipArms,
        ankleL: 30 * u, ankleR: 30 * u, rootPitch: 3 * u,
        kneeL: 3, kneeR: 3, hipRotL: 7, hipRotR: 7, hipAbdL: 2, hipAbdR: 2,
        lean: 2, chestLean: 5, headNod: 24,
      });
    },
  },
  calf: {
    dur: 3.6,
    view: { az: 72, el: 8 },
    wall: 0.66,
    pin: () => ({ point: "ballR", z: 0.15 }),
    reach: [
      { from: "handL", to: "ballR", offset: [0.29, 1.26, 0.48], params: ["shL", "shAbdL", "elbowL"] },
      { from: "handR", to: "ballR", offset: [-0.11, 1.26, 0.48], params: ["shR", "shAbdR", "elbowR"] },
    ],
    pose: (t) => {
      const b = bump(t);
      return pose({
        hipR: 30, kneeR: 38, ankleR: -8,
        hipL: -22 - 2 * b, kneeL: 0, ankleL: -22 - 2 * b,
        lean: 22 + 2 * b, headNod: 4,
        shL: 80, shR: 80, shAbdL: 10, shAbdR: 10, elbowL: 30, elbowR: 30,
      });
    },
  },
  quad: {
    dur: 4.2,
    view: { az: 66, el: 6 },
    pin: () => ({ point: "ballR", z: 0 }),
    reach: [{ from: "handL", to: "ankleTopL", params: ["shL", "shAbdL", "elbowL"] }],
    pose: (t) => {
      const b = bump(t);
      return pose({
        hipR: 2, kneeR: 4,
        hipL: -8 - 3 * b, kneeL: 150 + 3 * b, ankleL: 40,
        shL: -30, elbowL: 10, shAbdL: -10,
        shR: 8, shAbdR: 30 + 3 * b, elbowR: 12,
        side: -2, headNod: 2 - 2 * b, chestLean: -2 * b,
      });
    },
  },
  hamstring: {
    dur: 3.6,
    view: { az: 80, el: 8 },
    pin: () => ({ point: "ballR", z: -0.15 }),
    reach: [
      { from: "heelL", to: "heelR", axes: "y", params: ["hipL"] },
      { from: "handL", to: "kneeTopR", offset: [0.07, 0.03, 0.02], params: ["shL", "shAbdL", "elbowL"] },
      { from: "handR", to: "kneeTopR", offset: [-0.07, 0.03, 0.02], params: ["shR", "shAbdR", "elbowR"] },
    ],
    pose: (t) => {
      const b = bump(t);
      return pose({
        hipR: 45, kneeR: 40, ankleR: 5,
        hipL: 32, kneeL: 2, ankleL: -25,
        lean: 40 + 6 * b, headNod: 22,
        shL: 60, shR: 60, elbowL: 20, elbowR: 20,
      });
    },
  },
  "hip-flexor": {
    dur: 3.4,
    view: { az: 82, el: 8 },
    pin: () => ({ point: "ballR", z: 0.35 }),
    reach: [
      { from: "ballR", to: "kneeFrontL", axes: "y", params: ["kneeR"] },
      { from: "heelR", to: "kneeFrontL", axes: "y", params: ["ankleR"] },
      ...handsOnHips,
    ],
    pose: (t) => {
      const u = bump(t);
      return pose({
        ...hipArms,
        hipL: -12 - 14 * u, kneeL: 96, ankleL: 48,
        hipR: 84 - 10 * u, kneeR: 88, ankleR: -4,
        lean: -4 * u, headNod: 2,
      });
    },
  },
  figure4: {
    dur: 3.4,
    still: 0.5,
    view: { az: 26, el: 10 },
    pin: () => ({ point: "ballR", z: 0 }),
    reach: [{ from: "ankleOutL", to: "kneeTopR", offset: [0, 0.07, 0], params: ["hipL", "hipAbdL", "hipRotL"] }],
    pose: (t) => {
      const u = hold(t, 0.3);
      return pose({
        hipR: 20 + 40 * u, kneeR: 25 + 45 * u, ankleR: -5 - 5 * u,
        hipL: 70, hipAbdL: 20, hipRotL: 50, kneeL: 95, ankleL: -12,
        lean: 10 + 25 * u, headNod: 6,
        shL: 60, shR: 60, shAbdL: -12, shAbdR: -12, elbowL: 50, elbowR: 50,
      });
    },
  },
  chest: {
    dur: 3.6,
    still: 0.5,
    view: { az: 22, el: 10 },
    pose: (t) => {
      const u = hold(t, 0.3);
      return pose({
        shL: 4 - 29 * u, shR: 4 - 29 * u, shAbdL: 8 + 77 * u, shAbdR: 8 + 77 * u,
        elbowL: 12 + 13 * u, elbowR: 12 + 13 * u,
        chestLean: -10 * u, breath: u, kneeL: 3, kneeR: 3,
      });
    },
  },
  breathe: {
    dur: 4.4,
    view: { az: 20, el: 6 },
    reach: [
      { from: "handL", to: "bellyFront", offset: [0.03, 0, 0.035], params: ["shL", "shAbdL", "elbowL"] },
      { from: "handR", to: "chestFront", offset: [-0.03, 0, 0.035], params: ["shR", "shAbdR", "elbowR"] },
    ],
    pose: (t) => {
      const b = 0.5 - 0.5 * Math.cos(2 * Math.PI * t);
      return pose({
        breath: b, headNod: 4 - 2 * b, kneeL: 3, kneeR: 3,
        shL: 30, shR: 40, shAbdL: -10, shAbdR: -10, elbowL: 100, elbowR: 110,
      });
    },
  },
  child: {
    dur: 3.6,
    view: { az: 78, el: 14 },
    reach: [
      { from: "handL", to: "kneeFrontL", axes: "y", params: ["shL"] },
      { from: "handR", to: "kneeFrontR", axes: "y", params: ["shR"] },
    ],
    pose: (t) => {
      const b = bump(t);
      return pose({
        rootPitch: 96, hipL: 150, hipR: 150, kneeL: 158, kneeR: 158, ankleL: 45, ankleR: 45,
        hipAbdL: 6, hipAbdR: 6,
        shL: 168, shR: 168, shAbdL: 12, shAbdR: 12, elbowL: 6, elbowR: 6,
        lean: 6 + 4 * b, headNod: 10, breath: b,
      });
    },
  },
  "cat-cow": {
    dur: 4.0,
    view: { az: 80, el: 10 },
    // hands stay planted a torso-length ahead of the knees; trunk tilt and arm angle absorb the spine motion
    reach: [
      { from: "handL", to: "kneeFrontL", offset: [0.2, 0, 0.6], params: ["rootPitch", "shL", "shAbdL"] },
      { from: "handR", to: "kneeFrontR", offset: [-0.2, 0, 0.6], params: ["rootPitch", "shR", "shAbdR"] },
    ],
    pose: (t) => {
      const c = wave(t);
      return pose({
        rootPitch: 90, hipL: 90, hipR: 90, kneeL: 90, kneeR: 90, ankleL: 45, ankleR: 45,
        shL: 90, shR: 90, shAbdL: 4, shAbdR: 4,
        lean: 16 * c, chestLean: 10 * c, headNod: 22 * c,
      });
    },
  },
  twist: {
    dur: 4.2,
    still: 0.5,
    view: { az: 50, el: 34 },
    pose: (t) => {
      const u = hold(t, 0.3);
      return pose({
        rootPitch: -90, hipL: 60, hipR: 60, kneeL: 100, kneeR: 100, ankleL: -40, ankleR: -40,
        shAbdL: 88, shAbdR: 88, elbowL: 6, elbowR: 6,
        pelvisTwist: 82 * u, headTurn: -35 * u,
      });
    },
  },
  bridge: {
    dur: 3.0,
    still: 0.5,
    view: { az: 78, el: 14 },
    // shoulders, head and both feet stay on the floor while the hips rise
    reach: [
      { from: "heelL", to: "chestBack", axes: "y", params: ["rootPitch"] },
      { from: "headBack", to: "chestBack", axes: "y", params: ["headNod"] },
      { from: "ballL", to: "heelL", axes: "y", params: ["ankleL"] },
      { from: "ballR", to: "heelR", axes: "y", params: ["ankleR"] },
      { from: "handL", to: "chestBack", axes: "y", params: ["shL"] },
      { from: "handR", to: "chestBack", axes: "y", params: ["shR"] },
    ],
    pose: (t) => {
      const u = hold(t, 0.3);
      return pose({
        rootPitch: -90, hipL: 60 - 62 * u, hipR: 60 - 62 * u, kneeL: 100 - 8 * u, kneeR: 100 - 8 * u,
        ankleL: -40, ankleR: -40, shAbdL: 12, shAbdR: 12,
      });
    },
  },
  "ankle-pump": {
    dur: 2.0,
    view: { az: 72, el: 24 },
    pose: (t) => {
      const s = wave(t);
      return pose({
        rootPitch: -90, kneeL: 2, kneeR: 2, ankleL: 5 + 30 * s, ankleR: 5 + 30 * s, shAbdL: 10, shAbdR: 10,
      });
    },
  },
};
