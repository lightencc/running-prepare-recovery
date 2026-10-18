import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import type { Layout, MoveId, Phase, Side } from "@/content/library";
import { MUSCLE_NAMES, legendFor, type MuscleId } from "@/content/muscles";
import { CoachFigure } from "@/components/coach-figure";

// The 3D coach loads on demand (it brings in the 3D engine). The flat figure shows while it
// loads, and stays when the device has no WebGL or the 3D scene fails.
const CoachStage = lazy(() => import("@/components/coach3d/coach-stage"));

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

class StageBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function CoachView({
  move,
  layout,
  side,
  phase,
  paused,
  label,
  muscles,
  focus,
}: {
  move: MoveId;
  layout: Layout;
  side?: Side;
  phase: Phase;
  paused: boolean;
  label: string;
  muscles: boolean;
  focus: MuscleId | null;
}) {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  useEffect(() => setWebgl(hasWebGL()), []);

  const flat = <CoachFigure move={move} layout={layout} side={side} phase={phase} paused={paused} label={label} />;
  if (!webgl) return flat;
  return (
    <StageBoundary fallback={flat}>
      <Suspense fallback={flat}>
        <CoachStage move={move} side={side} paused={paused} muscles={muscles} focus={focus} label={label} />
      </Suspense>
    </StageBoundary>
  );
}

export function MuscleLegend({
  move,
  focus,
  onFocus,
}: {
  move: MoveId;
  focus: MuscleId | null;
  onFocus: (id: MuscleId | null) => void;
}) {
  const { primary, secondary } = legendFor(move);
  const chip = (id: MuscleId, level: "primary" | "secondary") => {
    const active = focus === id;
    return (
      <button
        key={id}
        type="button"
        aria-pressed={active}
        onClick={() => onFocus(active ? null : id)}
        className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-xs transition-colors duration-150 ${
          active ? "bg-ink text-canvas" : "bg-surface text-ink"
        } ${focus && !active ? "opacity-50" : ""}`}
      >
        <span className={`h-2 w-2 rounded-full ${level === "primary" ? "bg-muscle" : "bg-muscle-soft"}`} aria-hidden="true" />
        {MUSCLE_NAMES[id]}
      </button>
    );
  };
  return (
    <div className="flex flex-col gap-2" aria-label="训练肌群">
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-8 text-xs text-muted">主要</span>
        {primary.map((id) => chip(id, "primary"))}
      </div>
      {secondary.length ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-8 text-xs text-muted">次要</span>
          {secondary.map((id) => chip(id, "secondary"))}
        </div>
      ) : null}
    </div>
  );
}
