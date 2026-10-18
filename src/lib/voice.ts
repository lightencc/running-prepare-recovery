export type Clip = { src: string; text: string };

let audio: HTMLAudioElement | null = null;
let token = 0;
let onPlaying: (playing: boolean) => void = () => {};

export function bindPlaying(listener: (playing: boolean) => void) {
  onPlaying = listener;
}

function element() {
  if (!audio) {
    audio = new Audio();
    audio.preload = "auto";
    audio.setAttribute("playsinline", "true");
  }
  return audio;
}

export function primeVoice() {
  const nav = navigator as Navigator & { audioSession?: { type: string } };
  if (nav.audioSession) nav.audioSession.type = "playback";
  const player = element();
  player.src = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";
  return player
    .play()
    .then(() => {
      player.pause();
    })
    .catch(() => {});
}

export function stopVoice() {
  token += 1;
  audio?.pause();
  onPlaying(false);
  if (typeof window !== "undefined") window.speechSynthesis?.cancel();
}

function speakThen(text: string, done: () => void) {
  if (!text || typeof window === "undefined" || !window.speechSynthesis) {
    done();
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 1;
  const voices = window.speechSynthesis.getVoices().filter((voice) => voice.lang.toLowerCase().startsWith("zh"));
  const preferred = voices.find((voice) => /xiaoxiao|xiaoyi|yunxi|yunyang/i.test(voice.name));
  if (preferred) utterance.voice = preferred;
  else if (voices[0]) utterance.voice = voices[0];
  utterance.onend = () => done();
  utterance.onerror = () => done();
  window.speechSynthesis.speak(utterance);
}

export function playVoice(clips: Clip[]) {
  token += 1;
  const mine = token;
  const player = element();
  player.pause();
  window.speechSynthesis?.cancel();
  let index = 0;

  const step = () => {
    if (mine !== token) return;
    const clip = clips[index];
    if (!clip) {
      onPlaying(false);
      return;
    }
    index += 1;
    let handed = false;
    const fallback = () => {
      if (handed || mine !== token) return;
      handed = true;
      speakThen(clip.text, step);
    };
    player.onended = () => {
      if (mine !== token || handed) return;
      step();
    };
    player.onerror = fallback;
    player.src = clip.src;
    onPlaying(true);
    player.play().catch(fallback);
  };

  step();
}
