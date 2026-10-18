import { useState } from "react";
import { ChevronDown, Clock } from "lucide-react";
import {
  DISTANCES,
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
import type { Prefs, VoiceId } from "@/components/app";

const VOICES: { id: VoiceId; name: string; hint: string }[] = [
  { id: "xiaoxiao", name: "晓晓", hint: "女声" },
  { id: "yunxi", name: "云希", hint: "男声" },
];

export function HomeScreen({
  prefs,
  onPrefs,
  onStart,
}: {
  prefs: Prefs;
  onPrefs: (next: Prefs) => void;
  onStart: (distance: DistanceId, phase: Phase) => void;
}) {
  return (
    <div className="px-4 pb-14 pt-5">
      <header className="flex items-center gap-3">
        <Mark />
        <p className="text-base font-medium">暖程</p>
      </header>

      <h1 className="mt-8 text-3xl font-semibold tracking-tight">热身与恢复</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        5 公里、10 公里、马拉松。出发前把关节和髋打开，跑完再把紧的地方收回来。
      </p>
      {prefs.last ? (
        <p className="mt-3 text-sm text-muted">
          上次完成 · {distanceTitle(prefs.last.distance)}
          {PHASES[prefs.last.phase].label}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3">
        {DISTANCES.map((distance) => (
          <DistanceCard key={distance.id} distance={distance.id} note={distance.note} title={distance.title} onStart={onStart} />
        ))}
      </div>

      <section className="mt-3 rounded-card border border-line p-4">
        <h2 className="text-base font-semibold">讲解语音</h2>
        <p className="mt-1 text-sm text-muted">微软神经网络 · 已内置，可离线播放</p>
        <div className="mt-3 grid grid-cols-2 gap-2" role="group" aria-label="选择讲解声音">
          {VOICES.map((item) => {
            const selected = prefs.voice === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onPrefs({ ...prefs, voice: item.id })}
                className={`h-12 rounded-xl border-2 bg-surface text-sm font-medium transition-transform duration-150 active:scale-95 ${
                  selected ? "border-red text-ink" : "border-line text-ink"
                }`}
              >
                {item.name}
                <span className="text-muted"> · {item.hint}</span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function DistanceCard({
  distance,
  title,
  note,
  onStart,
}: {
  distance: DistanceId;
  title: string;
  note: string;
  onStart: (distance: DistanceId, phase: Phase) => void;
}) {
  const warmup = routineFor(distance, "warmup");
  const recover = routineFor(distance, "recover");
  const [open, setOpen] = useState(false);

  return (
    <article className="rounded-card border border-line p-3">
      <div className="px-2 pb-1 pt-2">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted">{note}</p>
      </div>
      <PhaseRow
        label={PHASES.warmup.label}
        seconds={routineSeconds(warmup)}
        count={warmup.steps.length}
        onClick={() => onStart(distance, "warmup")}
      />
      <PhaseRow
        label={PHASES.recover.label}
        seconds={routineSeconds(recover)}
        count={recover.steps.length}
        onClick={() => onStart(distance, "recover")}
      />
      <button
        type="button"
        className="mt-1 flex h-11 w-full items-center justify-between px-2 text-sm text-muted"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        动作顺序
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="grid grid-cols-2 gap-4 border-t border-line px-2 pb-2 pt-3 text-sm">
          <MoveList phase="warmup" steps={warmup.steps} />
          <MoveList phase="recover" steps={recover.steps} />
        </div>
      ) : null}
    </article>
  );
}

function PhaseRow({
  label,
  seconds,
  count,
  onClick,
}: {
  label: string;
  seconds: number;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-2 flex w-full items-stretch gap-3 rounded-xl bg-surface p-4 text-left transition-transform duration-150 active:scale-95"
    >
      <span className="w-1 self-stretch rounded-full bg-rail" />
      <span className="min-w-0 flex-1">
        <span className="block text-base font-semibold">{label}</span>
        <span className="mt-1 flex items-center gap-1.5 text-sm text-muted">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="tabular-nums">
            {formatClock(seconds)} · {count} 个动作
          </span>
        </span>
      </span>
      <span className="self-center text-sm font-medium text-red">开始</span>
    </button>
  );
}

function MoveList({
  phase,
  steps,
}: {
  phase: Phase;
  steps: ReturnType<typeof routineFor>["steps"];
}) {
  return (
    <div>
      <p className="mb-2 text-sm text-muted">{PHASES[phase].label}</p>
      <ol className="flex flex-col gap-1.5">
        {steps.map((step, index) => (
          <li key={`${step.move}-${index}`} className="leading-snug">
            <span className="text-muted tabular-nums">{index + 1} </span>
            {MOVES[step.move].name}
            {step.side ? <span className="text-muted"> · {sideLabel(step.side)}</span> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Mark() {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-full bg-surface text-red" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8.2 14.2 12 8.4l3.8 5.8" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </span>
  );
}
