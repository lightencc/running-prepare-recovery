import { voiceLines } from "./voice-lines";

export type DistanceId = "5k" | "10k" | "marathon";
export type Phase = "warmup" | "recover";
export type Side = "left" | "right";
export type Layout = "side" | "front" | "quad" | "floor";

export type MoveId =
  | "jog"
  | "walk"
  | "stride"
  | "high-knees"
  | "butt-kicks"
  | "a-skip"
  | "ankle"
  | "arm-circles"
  | "hip-circles"
  | "torso-twist"
  | "leg-swing"
  | "leg-swing-side"
  | "lunge"
  | "side-lunge"
  | "knee-hug"
  | "worlds"
  | "calf-raise"
  | "calf"
  | "quad"
  | "hamstring"
  | "hip-flexor"
  | "figure4"
  | "chest"
  | "breathe"
  | "child"
  | "cat-cow"
  | "twist"
  | "bridge"
  | "ankle-pump";

export type Move = {
  id: MoveId;
  name: string;
  cue: string;
  points: readonly [string, string, string];
  layout: Layout;
};

export type Step = {
  move: MoveId;
  seconds: number;
  side?: Side;
};

export type Routine = {
  id: string;
  distance: DistanceId;
  phase: Phase;
  steps: readonly Step[];
};

export const MOVES: Record<MoveId, Move> = {
  jog: {
    id: "jog",
    name: "原地慢跑",
    cue: "小步轻落，把呼吸跑顺",
    points: ["前脚掌着地，声音要轻", "手肘约九十度，前后摆", "这是热身，不追求速度"],
    layout: "side",
  },
  walk: {
    id: "walk",
    name: "轻松走步",
    cue: "先把心率和呼吸降下来",
    points: ["不要立刻坐下拉伸", "肩颈放松，下巴微收", "头晕就再多走一会儿"],
    layout: "side",
  },
  stride: {
    id: "stride",
    name: "轻松跨步",
    cue: "步幅打开一点，落地仍然轻",
    points: ["从脚踝弹性出发", "不要耸肩，不要憋气", "只激活，不把腿跑累"],
    layout: "side",
  },
  "high-knees": {
    id: "high-knees",
    name: "高抬腿",
    cue: "膝盖抬向髋部，落地要轻",
    points: ["躯干不要向后仰", "支撑腿微屈，有弹性", "频率均匀，呼吸别停"],
    layout: "side",
  },
  "butt-kicks": {
    id: "butt-kicks",
    name: "后踢腿",
    cue: "脚跟去找臀部，膝盖朝下",
    points: ["用小腿发力，大腿少甩", "骨盆保持水平", "和摆臂节奏合上"],
    layout: "side",
  },
  "a-skip": {
    id: "a-skip",
    name: "A 字跳",
    cue: "勾脚抬膝，轻巧地换腿",
    points: ["脚尖向上勾", "落地用前脚掌", "整齐比速度重要"],
    layout: "side",
  },
  ankle: {
    id: "ankle",
    name: "踝关节绕环",
    cue: "脚尖画圆，膝盖尽量少动",
    points: ["圆画满，速度放慢", "脚尖、外侧、脚跟都经过", "站不稳就扶墙"],
    layout: "side",
  },
  "arm-circles": {
    id: "arm-circles",
    name: "肩臂绕环",
    cue: "手臂画大圆，肩膀别耸",
    points: ["胳膊伸直，不要只转手肘", "胸口打开，肋骨别外翻", "前后两个方向都做"],
    layout: "front",
  },
  "hip-circles": {
    id: "hip-circles",
    name: "髋部绕环",
    cue: "骨盆画圆，上身保持安静",
    points: ["画到身体两侧和正后方", "膝盖始终对准脚尖", "像给髋关节上油"],
    layout: "front",
  },
  "torso-twist": {
    id: "torso-twist",
    name: "躯干转体",
    cue: "用胸口转，髋留在正面",
    points: ["眼睛跟着转动方向", "不要靠甩手臂借力", "呼吸保持连续"],
    layout: "front",
  },
  "leg-swing": {
    id: "leg-swing",
    name: "前后摆腿",
    cue: "腿像钟摆，幅度慢慢加大",
    points: ["支撑腿微屈，不要锁死", "摆动的脚尖放松", "上身保持直立"],
    layout: "side",
  },
  "leg-swing-side": {
    id: "leg-swing-side",
    name: "侧向摆腿",
    cue: "腿横着摆过中线，身体别晃",
    points: ["摆动腿膝盖可以微屈", "支撑侧的髋不要塌", "够用即可，不必踢很高"],
    layout: "front",
  },
  lunge: {
    id: "lunge",
    name: "行进弓步",
    cue: "迈大步下沉，前膝对齐脚尖",
    points: ["后膝向下，不要砸地", "前脚全脚掌踩实", "左右步幅尽量接近"],
    layout: "side",
  },
  "side-lunge": {
    id: "side-lunge",
    name: "侧弓步",
    cue: "坐向一侧，另一条腿伸直",
    points: ["膝盖与脚尖同一方向", "下坐时胸口仍抬着", "手可以扶在弯曲的腿上"],
    layout: "front",
  },
  "knee-hug": {
    id: "knee-hug",
    name: "行进抱膝",
    cue: "膝盖靠近胸口，停一秒",
    points: ["抱住的是小腿", "支撑腿的髋向前", "上身不要缩成一团"],
    layout: "side",
  },
  worlds: {
    id: "worlds",
    name: "最伟大拉伸",
    cue: "弓步撑地，转体看向上手",
    points: ["后膝可以轻轻点地", "旋转来自胸口，不是甩头", "髋前侧和胸都要打开"],
    layout: "side",
  },
  "calf-raise": {
    id: "calf-raise",
    name: "提踵",
    cue: "抬起停住，再慢慢放下",
    points: ["最高点停一秒", "脚踝不要向外翻", "可以扶墙保持平衡"],
    layout: "side",
  },
  calf: {
    id: "calf",
    name: "小腿拉伸",
    cue: "后脚跟踩实，身体成一条斜线",
    points: ["脚尖朝前，不要外八", "后膝伸直，拉腿肚子", "酸胀即可，不要刺痛"],
    layout: "side",
  },
  quad: {
    id: "quad",
    name: "股四头肌拉伸",
    cue: "脚跟贴向臀部，膝盖朝下",
    points: ["两侧膝盖并拢", "髋向前送，腰不要塌", "只拉到紧，不拉到痛"],
    layout: "side",
  },
  hamstring: {
    id: "hamstring",
    name: "腘绳肌拉伸",
    cue: "髋往后坐，背挺直着折下去",
    points: ["脚尖回勾", "手可以扶在支撑腿上", "感觉在大腿后侧"],
    layout: "side",
  },
  "hip-flexor": {
    id: "hip-flexor",
    name: "髋屈肌拉伸",
    cue: "骨盆后倾，再把髋向前送",
    points: ["后膝轻轻点地", "肋骨收住，避免塌腰", "前膝仍在脚踝上方"],
    layout: "side",
  },
  figure4: {
    id: "figure4",
    name: "梨状肌拉伸",
    cue: "脚踝搁上，髋向后坐",
    points: ["搁上去的脚尖勾起", "支撑膝对准脚尖", "可以扶墙，上身微微前倾"],
    layout: "front",
  },
  chest: {
    id: "chest",
    name: "开肩扩胸",
    cue: "胸口轻轻抬起，肩膀远离耳朵",
    points: ["下巴微收，不要仰头", "呼吸时胸口向两侧展开", "感到肩前侧变松"],
    layout: "front",
  },
  breathe: {
    id: "breathe",
    name: "腹式呼吸",
    cue: "吸气时腹部鼓起，吐气放长",
    points: ["吸四拍，吐六拍", "肩和胸口保持安静", "眼睛可以轻轻闭上"],
    layout: "front",
  },
  child: {
    id: "child",
    name: "婴儿式",
    cue: "臀坐向脚跟，额头向下",
    points: ["膝盖不适就稍微分开", "不要用力压迫腹部", "每一口气都让背更宽"],
    layout: "quad",
  },
  "cat-cow": {
    id: "cat-cow",
    name: "猫牛式",
    cue: "吸气沉腹，吐气拱背",
    points: ["动作绑在呼吸上", "不要把肩耸到耳朵", "幅度舒适就够了"],
    layout: "quad",
  },
  twist: {
    id: "twist",
    name: "仰卧扭转",
    cue: "双膝倒向一侧，对侧肩留在地面",
    points: ["两膝一起走", "肩离开地面就减小幅度", "配合长长的吐气"],
    layout: "floor",
  },
  bridge: {
    id: "bridge",
    name: "臀桥",
    cue: "髋抬到膝与肩接近一条线",
    points: ["脚掌踩实", "顶端收的是臀，不是腰", "落下时一节节放下"],
    layout: "floor",
  },
  "ankle-pump": {
    id: "ankle-pump",
    name: "踝泵",
    cue: "勾脚，再向前踩，慢慢做",
    points: ["幅度做满比速度重要", "小腿不要抬离地面", "可以跟着呼吸数"],
    layout: "floor",
  },
};

export const DISTANCES: readonly {
  id: DistanceId;
  title: string;
  note: string;
}[] = [
  { id: "5k", title: "5 公里", note: "关节热开，把腿速留到路上" },
  { id: "10k", title: "10 公里", note: "髋和步幅多给一点时间" },
  { id: "marathon", title: "马拉松", note: "流程更长，强度更克制" },
];

export const PHASES: Record<Phase, { label: string; verb: string }> = {
  warmup: { label: "热身", verb: "开始热身" },
  recover: { label: "恢复", verb: "开始恢复" },
};

const s = (move: MoveId, seconds: number, side?: Side): Step => ({ move, seconds, side });

const L = "left" as const;
const R = "right" as const;

export const ROUTINES: readonly Routine[] = [
  {
    id: "5k-warmup",
    distance: "5k",
    phase: "warmup",
    steps: [
      s("jog", 40),
      s("ankle", 20, L),
      s("ankle", 20, R),
      s("arm-circles", 30),
      s("leg-swing", 20, L),
      s("leg-swing", 20, R),
      s("leg-swing-side", 20, L),
      s("leg-swing-side", 20, R),
      s("lunge", 40),
      s("high-knees", 30),
      s("butt-kicks", 30),
      s("torso-twist", 30),
      s("calf-raise", 30),
      s("jog", 40),
    ],
  },
  {
    id: "5k-recover",
    distance: "5k",
    phase: "recover",
    steps: [
      s("walk", 45),
      s("calf", 30, L),
      s("calf", 30, R),
      s("quad", 30, L),
      s("quad", 30, R),
      s("hamstring", 30, L),
      s("hamstring", 30, R),
      s("hip-flexor", 30, L),
      s("hip-flexor", 30, R),
      s("figure4", 30, L),
      s("figure4", 30, R),
      s("chest", 30),
      s("breathe", 50),
    ],
  },
  {
    id: "10k-warmup",
    distance: "10k",
    phase: "warmup",
    steps: [
      s("walk", 30),
      s("ankle", 20, L),
      s("ankle", 20, R),
      s("hip-circles", 35),
      s("arm-circles", 30),
      s("torso-twist", 30),
      s("knee-hug", 25, L),
      s("knee-hug", 25, R),
      s("leg-swing", 20, L),
      s("leg-swing", 20, R),
      s("leg-swing-side", 20, L),
      s("leg-swing-side", 20, R),
      s("side-lunge", 20, L),
      s("side-lunge", 20, R),
      s("worlds", 30, L),
      s("worlds", 30, R),
      s("lunge", 40),
      s("a-skip", 35),
      s("high-knees", 30),
      s("butt-kicks", 30),
      s("calf-raise", 25),
      s("jog", 50),
    ],
  },
  {
    id: "10k-recover",
    distance: "10k",
    phase: "recover",
    steps: [
      s("walk", 50),
      s("calf", 35, L),
      s("calf", 35, R),
      s("quad", 35, L),
      s("quad", 35, R),
      s("hamstring", 40, L),
      s("hamstring", 40, R),
      s("hip-flexor", 40, L),
      s("hip-flexor", 40, R),
      s("figure4", 35, L),
      s("figure4", 35, R),
      s("chest", 35),
      s("cat-cow", 45),
      s("twist", 35, L),
      s("twist", 35, R),
      s("child", 45),
      s("breathe", 60),
    ],
  },
  {
    id: "marathon-warmup",
    distance: "marathon",
    phase: "warmup",
    steps: [
      s("walk", 45),
      s("ankle", 25, L),
      s("ankle", 25, R),
      s("hip-circles", 40),
      s("arm-circles", 35),
      s("torso-twist", 35),
      s("knee-hug", 25, L),
      s("knee-hug", 25, R),
      s("leg-swing", 25, L),
      s("leg-swing", 25, R),
      s("leg-swing-side", 25, L),
      s("leg-swing-side", 25, R),
      s("side-lunge", 25, L),
      s("side-lunge", 25, R),
      s("worlds", 35, L),
      s("worlds", 35, R),
      s("lunge", 45),
      s("calf-raise", 30),
      s("bridge", 35),
      s("a-skip", 30),
      s("high-knees", 25),
      s("butt-kicks", 25),
      s("cat-cow", 40),
      s("stride", 25),
      s("jog", 60),
      s("stride", 25),
      s("jog", 85),
    ],
  },
  {
    id: "marathon-recover",
    distance: "marathon",
    phase: "recover",
    steps: [
      s("walk", 90),
      s("calf", 40, L),
      s("calf", 40, R),
      s("quad", 40, L),
      s("quad", 40, R),
      s("hamstring", 45, L),
      s("hamstring", 45, R),
      s("hip-flexor", 45, L),
      s("hip-flexor", 45, R),
      s("figure4", 40, L),
      s("figure4", 40, R),
      s("bridge", 40),
      s("chest", 40),
      s("cat-cow", 45),
      s("twist", 40, L),
      s("twist", 40, R),
      s("child", 55),
      s("ankle-pump", 35),
      s("breathe", 90),
    ],
  },
];

for (const move of Object.keys(MOVES) as MoveId[]) {
  if (!voiceLines[move]) throw new Error(`缺少讲解：${move}`);
}
for (const routine of ROUTINES) {
  if (!voiceLines[`intro-${routine.id}`] || !voiceLines[`outro-${routine.id}`]) {
    throw new Error(`缺少开场或结束语：${routine.id}`);
  }
}

export function routineFor(distance: DistanceId, phase: Phase) {
  const found = ROUTINES.find((item) => item.distance === distance && item.phase === phase);
  if (!found) throw new Error("missing routine");
  return found;
}

export function routineSeconds(routine: Routine) {
  return routine.steps.reduce((sum, step) => sum + step.seconds, 0);
}

export function formatClock(totalSeconds: number) {
  const safe = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function distanceTitle(id: DistanceId) {
  return DISTANCES.find((item) => item.id === id)?.title ?? id;
}

export function sideLabel(side?: Side) {
  if (side === "left") return "左侧";
  if (side === "right") return "右侧";
  return "";
}
