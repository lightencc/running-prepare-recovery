import type { MoveId, Side } from "@/content/library";
import { MOVE_MUSCLES, parseMuscle, type MuscleId, type MuscleRef } from "@/content/muscles";
import type { Highlights, Level } from "./materials";
import { MOVE_ANIMS } from "./moves";
import { mirrorAnim, type MoveAnim } from "./rig";

export function animFor(move: MoveId, side?: Side): MoveAnim {
  const anim = MOVE_ANIMS[move];
  return side === "right" ? mirrorAnim(anim) : anim;
}

export function highlightsFor(move: MoveId, side: Side | undefined, focus?: MuscleId | null): Highlights {
  const out = new Map<string, Level>();
  const { primary, secondary } = MOVE_MUSCLES[move];
  const work = side === "right" ? "R" : "L";
  const other = side === "right" ? "L" : "R";
  const mark = (refs: readonly MuscleRef[], level: Level) => {
    for (const ref of refs) {
      const { id, side: which } = parseMuscle(ref);
      if (focus && id !== focus) continue;
      const sides = !side || which === "both" ? ["L", "R"] : which === "other" ? [other] : [work];
      for (const s of [...sides, "C"]) {
        const key = `${id}:${s}`;
        if (out.get(key) !== "primary") out.set(key, focus ? "primary" : level);
      }
    }
  };
  mark(primary, "primary");
  mark(secondary, "secondary");
  return out;
}
