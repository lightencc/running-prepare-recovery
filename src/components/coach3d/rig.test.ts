import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { blend, hold, mirrorAnim, mirrorPose, pose, swapSide, type MoveAnim } from "./rig.ts";
import { legendFor, MOVE_MUSCLES, parseMuscle } from "../../content/muscles.ts";

describe("mirrorPose", () => {
  it("swaps left and right channels and flips turning directions", () => {
    const p = pose({ hipL: 40, kneeR: 90, twist: 20, side: -5, lean: 10 });
    const m = mirrorPose(p);
    assert.equal(m.hipR, 40);
    assert.equal(m.hipL, 0);
    assert.equal(m.kneeL, 90);
    assert.equal(m.twist, -20);
    assert.equal(m.side, 5);
    assert.equal(m.lean, 10);
  });

  it("returns the original pose when applied twice", () => {
    const p = pose({ hipL: 12, shAbdR: 30, pelvisTwist: 44, headTurn: -9, ankleRollL: 7 });
    assert.deepEqual(mirrorPose(mirrorPose(p)), p);
  });
});

describe("mirrorAnim", () => {
  it("mirrors reach targets, pins and the camera side", () => {
    const anim: MoveAnim = {
      dur: 1,
      pose: () => pose({ hipL: 30 }),
      reach: [{ from: "handL", to: "ballR", offset: [0.3, 1, 0.5], params: ["shL", "elbowL"] }],
      pin: () => ({ point: "ballR", x: -0.4, z: 0.2 }),
      view: { az: 40, el: 8 },
    };
    const m = mirrorAnim(anim);
    assert.equal(m.pose(0).hipR, 30);
    assert.deepEqual(m.reach?.[0], {
      from: "handR",
      to: "ballL",
      offset: [-0.3, 1, 0.5],
      params: ["shR", "elbowR"],
    });
    assert.deepEqual(m.pin?.(0), { point: "ballL", x: 0.4, z: 0.2 });
    assert.deepEqual(m.view, { az: -40, el: 8 });
  });

  it("leaves names without a side alone", () => {
    assert.equal(swapSide("headTop"), "headTop");
    assert.equal(swapSide("chestBack"), "chestBack");
  });
});

describe("blend", () => {
  const keys = [
    [0, { hipL: 0 }],
    [0.25, { hipL: 40 }],
    [0.5, { hipL: 0 }],
    [0.75, { hipL: -40 }],
  ] as const;

  it("passes through every key", () => {
    for (const [t, part] of keys) assert.ok(Math.abs(blend(keys, t).hipL - part.hipL) < 1e-9);
  });

  it("loops: the end of the cycle meets the start", () => {
    assert.ok(Math.abs(blend(keys, 0.9999).hipL - blend(keys, 0).hipL) < 0.05);
    assert.ok(Math.abs(blend(keys, 1.25).hipL - 40) < 1e-9);
  });
});

describe("hold", () => {
  it("rises, holds at 1, and returns to 0", () => {
    assert.equal(hold(0, 0.25), 0);
    assert.equal(hold(0.5, 0.25), 1);
    assert.ok(hold(0.99, 0.25) < 0.01);
  });
});

describe("muscle map", () => {
  it("reads side markers", () => {
    assert.deepEqual(parseMuscle("hipFlexors@other"), { id: "hipFlexors", side: "other" });
    assert.deepEqual(parseMuscle("quads"), { id: "quads", side: "work" });
  });

  it("gives every move at least one primary muscle and no muscle in both lists", () => {
    for (const move of Object.keys(MOVE_MUSCLES) as (keyof typeof MOVE_MUSCLES)[]) {
      const legend = legendFor(move);
      assert.ok(legend.primary.length > 0, move);
      for (const id of legend.secondary) assert.ok(!legend.primary.includes(id), `${move}: ${id}`);
    }
  });
});
