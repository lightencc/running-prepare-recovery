import { spawn } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { voiceLines } from "../src/content/voice-lines.ts";

const voices: Record<string, string> = {
  xiaoxiao: "zh-CN-XiaoxiaoNeural",
  yunxi: "zh-CN-YunxiNeural",
};

type Job = { voice: string; out: string; text: string };

const jobs: Job[] = [];
for (const [folder, voice] of Object.entries(voices)) {
  for (const [id, text] of Object.entries(voiceLines)) {
    jobs.push({
      voice,
      text,
      out: path.join("public/voice", folder, `${id}.mp3`),
    });
  }
}

async function existsBig(file: string) {
  try {
    const info = await stat(file);
    return info.size > 800;
  } catch {
    return false;
  }
}

function synth(job: Job) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(
      "edge-tts",
      ["--voice", job.voice, "--rate=-4%", "--text", job.text, "--write-media", job.out, "--no-progress"],
      { stdio: ["ignore", "ignore", "pipe"] },
    );
    let err = "";
    child.stderr.on("data", (chunk: Buffer) => {
      err += chunk.toString();
    });
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${job.out} failed (${code}) ${err}`));
    });
  });
}

let cursor = 0;
let failed = 0;

async function worker() {
  for (;;) {
    const index = cursor;
    cursor += 1;
    if (index >= jobs.length) return;
    const job = jobs[index];
    if (!job) return;
    await mkdir(path.dirname(job.out), { recursive: true });
    if (await existsBig(job.out)) continue;
    try {
      await synth(job);
      console.log("ok", job.out);
    } catch (error) {
      failed += 1;
      console.error(error);
    }
  }
}

await Promise.all(Array.from({ length: 5 }, () => worker()));
if (failed > 0) {
  console.error(`${failed} clips failed`);
  process.exit(1);
}
console.log(`voice ready: ${jobs.length} clips`);
