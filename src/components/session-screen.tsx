import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import {
  MOVES,
  PHASES,
  distanceTitle,
  formatClock,
  routineFor,
  routineSeconds,
  sideLabel,
  type DistanceId,
  type Phase,
} from "@/content/library";
import { voiceLines } from "@/content/voice-lines";
import { bindPlaying, playVoice, stopVoice, type Clip } from "@/lib/voice";
import type { Prefs } from "@/components/app";
import { CoachFigure } from "@/components/coach-figure";

export function SessionScreen({
  distance,
  phase,
  prefs,
  onPrefs,
  onExit,
  onDone,
}: {
  distance: DistanceId;
  phase: Phase;
  prefs: Prefs;
  onPrefs: (next: Prefs) => void;
  onExit: () => void;
  onDone: (elapsedSeconds: number) => void;
}) {
  const routine = routineFor(distance, phase);
  const steps = routine.steps;
  const [index, setIndex] = useState(0);
  const [nonce, setNonce] = useState(0);
  const [leftMs, setLeftMs] = useState(steps[0]?.seconds ? steps[0].seconds * 1000 : 0);
  const [running, setRunning] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [playing, setPlaying] = useState(false);

  const indexRef = useRef(0);
  const leftRef = useRef(leftMs);
  const endAt = useRef(0);
  const runningRef = useRef(true);
  const accum = useRef(0);
  const stamp = useRef(0);
  const painted = useRef(0);
  const prefsRef = useRef(prefs);
  prefsRef.current = prefs;
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const step = steps[index] ?? steps[0];
  const move = MOVES[step.move];

  useEffect(() => {
    bindPlaying(setPlaying);
    return () => {
      stopVoice();
      bindPlaying(() => {});
    };
  }, []);

  useEffect(() => {
    const total = (steps[index]?.seconds ?? 0) * 1000;
    leftRef.current = total;
    setLeftMs(total);
    indexRef.current = index;
    if (!prefsRef.current.muted) {
      playVoice(clipsFor(routine.id, steps[index]?.move ?? step.move, steps[index]?.side, index, nonce, prefsRef.current.voice));
    } else {
      stopVoice();
    }
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(12);
  }, [index, nonce, routine.id, step.move, steps]);

  useEffect(() => {
    runningRef.current = running;
    if (!running) return;
    stamp.current = performance.now();
    endAt.current = performance.now() + leftRef.current;
    let frame = 0;
    const loop = (now: number) => {
      const left = endAt.current - now;
      if (left <= 0) {
        leftRef.current = 0;
        setLeftMs(0);
        const current = indexRef.current;
        if (current >= steps.length - 1) {
          accum.current += now - stamp.current;
          runningRef.current = false;
          onDoneRef.current(accum.current / 1000);
          return;
        }
        indexRef.current = current + 1;
        setIndex(current + 1);
        return;
      }
      leftRef.current = left;
      if (now - painted.current > 80) {
        painted.current = now;
        setLeftMs(left);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      if (runningRef.current) accum.current += performance.now() - stamp.current;
    };
  }, [running, index, nonce, steps.length]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === " " || event.code === "Space") {
        event.preventDefault();
        toggle();
      } else if (event.key === "ArrowRight") {
        forward();
      } else if (event.key === "ArrowLeft") {
        back();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function toggle() {
    setRunning((value) => !value);
  }

  function forward() {
    if (indexRef.current >= steps.length - 1) {
      if (runningRef.current) accum.current += performance.now() - stamp.current;
      runningRef.current = false;
      onDoneRef.current(accum.current / 1000);
      return;
    }
    indexRef.current += 1;
    setIndex(indexRef.current);
  }

  function back() {
    const total = (steps[indexRef.current]?.seconds ?? 0) * 1000;
    if (total - leftRef.current > 2000 || indexRef.current === 0) {
      setNonce((value) => value + 1);
      return;
    }
    indexRef.current -= 1;
    setIndex(indexRef.current);
  }

  function replay() {
    if (prefs.muted) onPrefs({ ...prefs, muted: false });
    const clips = clipsFor(routine.id, step.move, step.side, index, nonce, prefs.voice).filter(
      (clip) => !clip.src.includes("/intro-"),
    );
    playVoice(clips);
  }

  const doneSeconds = steps.slice(0, index).reduce((sum, item) => sum + item.seconds, 0);
  const into = step.seconds - leftMs / 1000;
  const progress = Math.min(100, ((doneSeconds + into) / routineSeconds(routine)) * 100);
  const display = Math.max(0, Math.ceil(leftMs / 1000));
  const side = sideLabel(step.side);
  const urgent = display <= 3 && display > 0 && running;

  return (
    <section className="flex min-h-dvh flex-col" data-phase={phase}>
      <header className="flex items-center gap-2 px-2 pt-2">
        <button
          type="button"
          aria-label="退出"
          onClick={() => setConfirming(true)}
          className="flex h-11 w-11 items-center justify-center transition-transform duration-150 active:scale-95"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <p className="min-w-0 flex-1 truncate text-center text-sm text-muted">
          {distanceTitle(distance)} · {PHASES[phase].label}
        </p>
        <button
          type="button"
          aria-label={prefs.muted ? "打开讲解" : "关闭讲解"}
          aria-pressed={!prefs.muted}
          onClick={() => {
            const muted = !prefs.muted;
            onPrefs({ ...prefs, muted });
            if (muted) stopVoice();
          }}
          className="flex h-11 w-11 items-center justify-center text-ink transition-transform duration-150 active:scale-95"
        >
          {prefs.muted ? <VolumeX className="h-5 w-5 text-muted" /> : <Volume2 className="h-5 w-5" />}
        </button>
      </header>

      <div className="mx-4 h-0.5 overflow-hidden rounded-full bg-line">
        <div className="h-full bg-red" style={{ width: `${progress}%` }} />
      </div>

      <div className="relative mx-4 mt-3 h-64 overflow-hidden rounded-card bg-stage">
        <CoachFigure
          move={step.move}
          layout={move.layout}
          side={step.side}
          phase={phase}
          paused={!running}
          label={move.name}
        />
        {side ? <span className="absolute left-4 top-4 text-sm font-medium text-red">{side}</span> : null}
        {!running ? (
          <span className="absolute bottom-3 right-3 rounded-full bg-canvas px-3 py-1 text-xs text-ink">已暂停</span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-4 pb-8 pt-5">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{move.name}</h1>
          <span className={`eq text-red ${playing && !prefs.muted ? "is-on" : ""}`} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
        <p className="mt-1 text-sm text-muted tabular-nums">
          {index + 1} / {steps.length}
          {side ? ` · ${side}` : ""}
        </p>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted">剩余</p>
            <p
              className={`mt-1 font-timer text-6xl font-semibold leading-none tabular-nums ${urgent ? "text-red" : "text-ink"} ${urgent ? "scale-105" : ""} transition-transform duration-150`}
            >
              {formatClock(display)}
            </p>
          </div>
          <div className="relative h-16 w-16 text-red">
            <Ring ms={leftMs} total={step.seconds} />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <Control label="上一个" onClick={back}>
            <SkipBack className="h-5 w-5" />
          </Control>
          <button
            type="button"
            onClick={toggle}
            aria-label={running ? "暂停" : "继续"}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-red text-ink transition-transform duration-150 active:scale-95"
          >
            {running ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </button>
          <Control label="下一个" onClick={forward}>
            <SkipForward className="h-5 w-5" />
          </Control>
        </div>

        <button type="button" onClick={replay} className="mt-4 h-11 self-start text-sm font-medium text-red">
          再听一遍
        </button>

        <div className="mt-2">
          <p className="text-sm text-muted">提示</p>
          <p className="mt-1 text-base leading-relaxed">{move.cue}</p>
        </div>
        <div className="mt-5">
          <p className="text-sm text-muted">要点</p>
          <ul className="mt-1 flex flex-col gap-1 text-base leading-relaxed">
            {move.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="mt-5">
          <p className="text-sm text-muted">讲解</p>
          <p className="mt-1 text-base leading-relaxed text-ink">{voiceLines[step.move]}</p>
        </div>
      </div>

      {confirming ? (
        <div className="fixed inset-0 z-20 flex items-end justify-center bg-canvas/70 px-4 pb-8">
          <div className="w-full max-w-md rounded-card bg-surface p-5">
            <h2 className="text-lg font-semibold">先离开这次训练？</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">进度不会保存，下次从第一个动作开始。</p>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="mt-5 h-12 w-full rounded-full bg-red text-sm font-medium text-ink transition-transform duration-150 active:scale-95"
            >
              继续练
            </button>
            <button
              type="button"
              onClick={() => {
                stopVoice();
                onExit();
              }}
              className="mt-2 h-12 w-full rounded-full text-sm font-medium text-muted transition-transform duration-150 active:scale-95"
            >
              离开
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function Control({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-ink transition-transform duration-150 active:scale-95"
    >
      {children}
    </button>
  );
}

function Ring({ ms, total }: { ms: number; total: number }) {
  const radius = 42;
  const circ = 2 * Math.PI * radius;
  const progress = total <= 0 ? 0 : Math.min(1, Math.max(0, ms / 1000 / total));
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <circle className="ring-track" cx="50" cy="50" r={radius} />
      <g transform="rotate(-90 50 50)">
        <circle
          className="ring-value"
          cx="50"
          cy="50"
          r={radius}
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - progress)}
        />
      </g>
    </svg>
  );
}

function clipsFor(
  routineId: string,
  move: string,
  side: "left" | "right" | undefined,
  index: number,
  nonce: number,
  voice: Prefs["voice"],
): Clip[] {
  const base = `/voice/${voice}`;
  const clips: Clip[] = [];
  if (index === 0 && nonce === 0) {
    const id = `intro-${routineId}`;
    clips.push({ src: `${base}/${id}.mp3`, text: voiceLines[id] ?? "" });
  }
  if (side) {
    const id = side === "left" ? "side-left" : "side-right";
    clips.push({ src: `${base}/${id}.mp3`, text: voiceLines[id] ?? "" });
  }
  clips.push({ src: `${base}/${move}.mp3`, text: voiceLines[move] ?? "" });
  return clips;
}
