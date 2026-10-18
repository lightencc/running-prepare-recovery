import { lazy, Suspense, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MOVES, type MoveId, type Side } from "@/content/library";
import { JOINT_KEYS, type JointKey, type Pose } from "@/components/coach3d/rig";

// Dev-only pose lab: scrub any move, drag joint sliders on top of it, and let QA scripts
// jump to exact frames through window.__lab. Renders nothing in production builds.

const CoachStage = lazy(() => import("@/components/coach3d/coach-stage"));

export const Route = createFileRoute("/lab")({ component: Lab });

type LabState = { move: MoveId; side?: Side; at?: number; muscles: boolean; view?: { az: number; el: number } };

declare global {
  interface Window {
    __lab?: { set: (next: Partial<LabState>) => void };
  }
}

function Lab() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<LabState>({ move: "jog", muscles: true });
  const [override, setOverride] = useState<Partial<Pose>>({});

  useEffect(() => {
    setMounted(true);
    window.__lab = { set: (next) => setState((prev) => ({ ...prev, ...next })) };
  }, []);

  if (!import.meta.env.DEV) return null;
  if (!mounted) return null;

  const setJoint = (key: JointKey, value: number) => setOverride((prev) => ({ ...prev, [key]: value }));

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-4 p-4 md:flex-row">
      <div className="w-full md:w-[420px]">
        <div className="h-72 overflow-hidden rounded-card bg-stage" data-testid="stage">
          <Suspense fallback={null}>
            <CoachStage
              move={state.move}
              side={state.side}
              paused={false}
              muscles={state.muscles}
              at={state.at}
              override={override}
              view={state.view}
              label={MOVES[state.move].name}
            />
          </Suspense>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <select
            id="lab-move"
            className="rounded bg-surface px-2 py-1"
            value={state.move}
            onChange={(event) => setState((prev) => ({ ...prev, move: event.target.value as MoveId }))}
          >
            {Object.values(MOVES).map((move) => (
              <option key={move.id} value={move.id}>
                {move.name} ({move.id})
              </option>
            ))}
          </select>
          {(["left", "right"] as const).map((side) => (
            <button
              key={side}
              type="button"
              className={`rounded px-2 py-1 ${state.side === side ? "bg-red" : "bg-surface"}`}
              onClick={() => setState((prev) => ({ ...prev, side: prev.side === side ? undefined : side }))}
            >
              {side}
            </button>
          ))}
          <button
            type="button"
            className="rounded bg-surface px-2 py-1"
            onClick={() => setState((prev) => ({ ...prev, muscles: !prev.muscles }))}
          >
            muscles {state.muscles ? "on" : "off"}
          </button>
          <button type="button" className="rounded bg-surface px-2 py-1" onClick={() => setOverride({})}>
            reset joints
          </button>
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input
            id="lab-play"
            type="checkbox"
            checked={state.at === undefined}
            onChange={(event) => setState((prev) => ({ ...prev, at: event.target.checked ? undefined : 0 }))}
          />
          play
          <input
            id="lab-t"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={state.at ?? 0}
            disabled={state.at === undefined}
            onChange={(event) => setState((prev) => ({ ...prev, at: Number(event.target.value) }))}
            className="flex-1"
          />
          <span className="w-10 tabular-nums">{state.at?.toFixed(2) ?? "–"}</span>
        </label>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-1 text-xs">
        {JOINT_KEYS.map((key) => (
          <label key={key} className="flex items-center gap-2">
            <span className="w-20 shrink-0 text-muted">{key}</span>
            <input
              id={`lab-${key}`}
              type="range"
              min={key === "lift" || key === "breath" ? -1 : -180}
              max={key === "lift" || key === "breath" ? 1 : 180}
              step={key === "lift" || key === "breath" ? 0.01 : 1}
              value={override[key] ?? 0}
              onChange={(event) => setJoint(key, Number(event.target.value))}
              className="flex-1"
            />
            <span className="w-8 text-right tabular-nums">{override[key] ?? 0}</span>
          </label>
        ))}
      </div>
    </main>
  );
}
