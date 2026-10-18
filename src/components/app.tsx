import { useEffect, useState } from "react";
import {
  PHASES,
  distanceTitle,
  formatClock,
  routineFor,
  routineSeconds,
  type DistanceId,
  type Phase,
} from "@/content/library";
import { voiceLines } from "@/content/voice-lines";
import { playVoice, primeVoice, stopVoice } from "@/lib/voice";
import { HomeScreen } from "@/components/home-screen";
import { SessionScreen } from "@/components/session-screen";

export type VoiceId = "xiaoxiao" | "yunxi";

export type Prefs = {
  voice: VoiceId;
  muted: boolean;
  last?: { distance: DistanceId; phase: Phase; at: number };
};

const STORAGE_KEY = "nuancheng-v1";
const DEFAULT_PREFS: Prefs = { voice: "xiaoxiao", muted: false };

type View =
  | { name: "home" }
  | { name: "session"; distance: DistanceId; phase: Phase }
  | { name: "done"; distance: DistanceId; phase: Phase; elapsed: number };

function readPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    return {
      voice: parsed.voice === "yunxi" ? "yunxi" : "xiaoxiao",
      muted: Boolean(parsed.muted),
      last: parsed.last,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function App() {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<View>({ name: "home" });

  useEffect(() => {
    setPrefs(readPrefs());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs, ready]);

  const start = (distance: DistanceId, phase: Phase) => {
    void primeVoice();
    setView({ name: "session", distance, phase });
  };

  return (
    <main className="mx-auto min-h-dvh w-full max-w-md bg-canvas text-ink">
      {view.name === "home" ? (
        <HomeScreen prefs={prefs} onPrefs={setPrefs} onStart={start} />
      ) : null}
      {view.name === "session" ? (
        <SessionScreen
          distance={view.distance}
          phase={view.phase}
          prefs={prefs}
          onPrefs={setPrefs}
          onExit={() => setView({ name: "home" })}
          onDone={(elapsed) => {
            setPrefs((current) => ({
              ...current,
              last: { distance: view.distance, phase: view.phase, at: Date.now() },
            }));
            setView({ name: "done", distance: view.distance, phase: view.phase, elapsed });
          }}
        />
      ) : null}
      {view.name === "done" ? (
        <DoneScreen
          distance={view.distance}
          phase={view.phase}
          elapsed={view.elapsed}
          voice={prefs.voice}
          muted={prefs.muted}
          onHome={() => setView({ name: "home" })}
        />
      ) : null}
    </main>
  );
}

function DoneScreen({
  distance,
  phase,
  elapsed,
  voice,
  muted,
  onHome,
}: {
  distance: DistanceId;
  phase: Phase;
  elapsed: number;
  voice: VoiceId;
  muted: boolean;
  onHome: () => void;
}) {
  const routine = routineFor(distance, phase);
  const lineId = `outro-${routine.id}`;

  useEffect(() => {
    if (muted) return;
    playVoice([{ src: `/voice/${voice}/${lineId}.mp3`, text: voiceLines[lineId] ?? "" }]);
    return () => stopVoice();
  }, [lineId, muted, voice]);

  const headline = phase === "warmup" ? "热身完成" : "恢复完成";
  const detail =
    phase === "warmup" ? "身体醒了，按今天的距离出发。" : "紧的地方已经松开一些，可以好好休息。";

  return (
    <section className="flex min-h-dvh flex-col px-4 pb-10 pt-6">
      <header className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-surface text-red" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.7" />
            <path d="M8.2 14.2 12 8.4l3.8 5.8" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </span>
        <p className="text-base font-medium">暖程</p>
      </header>
      <p className="mt-8 text-sm text-muted">
        {distanceTitle(distance)} · {PHASES[phase].label}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{headline}</h1>
      <p className="mt-3 text-base leading-relaxed text-muted">{detail}</p>
      <p className="mt-8 font-timer text-6xl font-semibold tabular-nums leading-none">{formatClock(elapsed)}</p>
      <p className="mt-3 text-sm text-muted">实际用时 · 计划 {formatClock(routineSeconds(routine))}</p>
      <div className="mt-auto pt-10">
        <button
          type="button"
          onClick={onHome}
          className="h-12 w-full rounded-full bg-red text-base font-medium text-ink transition-transform duration-150 active:scale-95"
        >
          回到首页
        </button>
      </div>
    </section>
  );
}
