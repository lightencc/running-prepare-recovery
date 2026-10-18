import { i as __toESM } from "../_runtime.mjs";
import { n as MUSCLE_NAMES, r as legendFor } from "./muscles-aV4ljYv5.mjs";
import { l as require_jsx_runtime, u as require_react } from "../_libs/@react-three/drei+[...].mjs";
import { a as SkipBack, c as Clock, i as SkipForward, l as ChevronLeft, n as Volume2, o as Play, s as Pause, t as VolumeX, u as ChevronDown } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-eOM53Wwj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Narration scripts. Audio is synthesized with Microsoft Edge neural voices. */
var voiceLines = {
	jog: "原地慢跑。前脚掌轻轻落地，步子小而轻快，肩膀放松。用鼻子吸气，嘴巴慢慢吐气。",
	walk: "轻松走步。手臂自然摆动，步子比平时稍大。先把呼吸和心跳稳住，再进入后面的拉伸。",
	stride: "轻松跨步。把步幅稍稍打开，落地依然轻盈。只找跑的感觉，不要加速冲刺。",
	"high-knees": "高抬腿。身体立住，核心轻轻收住。膝盖向前抬到髋的高度，前脚掌轻落，手臂配合摆动。",
	"butt-kicks": "后踢腿。脚跟向臀部轻快踢起，膝盖朝下，不要甩到腰。上身保持稳定。",
	"a-skip": "A字跳。摆动腿膝盖抬起，脚尖勾住，支撑脚轻轻点地。节奏是跳、抬、换。",
	ankle: "踝关节绕环。单腿站稳，可以扶墙。抬起的脚用脚踝慢慢画圆，顺时针和逆时针都画满。",
	"arm-circles": "肩臂绕环。手臂伸直，由前向后画大圆，再换方向。肩膀下沉，脖子保持长。",
	"hip-circles": "髋部绕环。双脚与肩同宽，膝盖微屈，双手扶在髋上。骨盆慢慢画圆，上身尽量别跟着晃。",
	"torso-twist": "躯干转体。双脚踩稳，用腹部带动胸口左右转动。髋留在正面，手臂只是跟着走。",
	"leg-swing": "前后摆腿。单腿站稳，另一条腿像钟摆一样前后放松摆动，幅度渐渐加大。骨盆保持朝前。",
	"leg-swing-side": "侧向摆腿。支撑腿站稳，摆动腿在身前左右摆过中线。以不弯腰为前提，脚趾朝前。",
	lunge: "行进弓步。向前迈一大步，后膝朝向地面，前膝大约在脚踝上方。推起来站直，再换另一条腿。",
	"side-lunge": "侧弓步。向一侧迈出并坐下，另一条腿伸直，两侧脚尖都朝前。推回中间，再换边。",
	"knee-hug": "行进抱膝。把一侧膝盖抱向胸口，支撑腿站直，停一秒，感受臀部和髋的后侧。",
	worlds: "最伟大拉伸。迈成弓步，同侧手撑在前脚内侧，另一只手向上打开，眼睛看向手指，胸口跟着转开。",
	"calf-raise": "提踵。慢慢抬到前脚掌，在最高点停住，再有控制地落下。不要用惯性往上蹦。",
	calf: "小腿拉伸。后腿伸直，脚跟踩实，身体成一条斜线推向墙面。感觉腿肚子被轻轻拉住，不要弹震。",
	quad: "股四头肌拉伸。单腿站稳，拉住同侧脚背，脚跟靠近臀部。膝盖朝下并拢，髋部轻轻向前推。",
	hamstring: "腘绳肌拉伸。脚跟点地，脚尖勾起，髋向后坐，从髋折叠上身。背要保持长，不要用头去够脚。",
	"hip-flexor": "髋屈肌拉伸。后膝点地，骨盆微微后倾，再把髋轻轻向前送。收紧臀部，不要把腰压塌。",
	figure4: "梨状肌拉伸。把脚踝搁到对侧大腿上，髋向后坐，像要坐下。感觉臀部深层被慢慢拉开。",
	chest: "开肩扩胸。双手向身体两侧打开，肩膀下沉，胸口向前轻抬。把跑步时向前卷的肩拉回来。",
	breathe: "腹式呼吸。吸气时腹部鼓起，心里数四拍。再用嘴巴慢慢吐气，数六拍。肩膀不要跟着抬起来。",
	child: "婴儿式。臀部坐向脚跟，身体向前折叠，额头放松。随着呼吸，让后背一点点变宽。",
	"cat-cow": "猫牛式。吸气时肚子下沉，胸口向前。吐气时拱起后背，低头看向肚脐。动作跟着呼吸慢慢走。",
	twist: "仰卧扭转。双膝并拢倒向一侧，对侧肩膀尽量留在地面。每一口吐气，都再放松一点。",
	bridge: "臀桥。双脚踩实，呼气时收紧臀部，把髋抬起，直到膝盖、髋和肩膀接近一条直线。不要用腰硬顶。",
	"ankle-pump": "踝泵。脚尖用力回勾，再向前踩，像轻轻踩油门。帮助跑完的小腿把血液送回去。",
	"side-left": "现在做左侧。",
	"side-right": "换到右侧。",
	"intro-5k-warmup": "五公里热身开始。先把脚踝、髋和体温轻轻打开。动作轻快，把力气留给跑步。",
	"intro-5k-recover": "五公里跑完了。先走一走，再把小腿、大腿和髋慢慢拉开。不要弹震。",
	"intro-10k-warmup": "十公里热身。我们多做髋和动态弓步，跑出一点微汗就可以出发。",
	"intro-10k-recover": "十公里恢复。先走路把心率降下来，再按小腿、大腿和臀部的顺序拉开。",
	"intro-marathon-warmup": "马拉松热身。时间长一些，强度更克制。做完你该觉得醒了，而不是累了。",
	"intro-marathon-recover": "马拉松恢复。把紧的地方慢慢还回去。停留长一点，呼吸放长，不追求碰到脚尖。",
	"outro-5k-warmup": "热身完成。脚踝和髋都醒了，去跑你的五公里。",
	"outro-5k-recover": "恢复完成。补一口水，今天可以好好休息。",
	"outro-10k-warmup": "热身完成。保持这份轻松的感觉出发。",
	"outro-10k-recover": "恢复完成。肌肉还在降温，今晚早点睡。",
	"outro-marathon-warmup": "热身完成。前两公里继续放松，不要一出门就追配速。",
	"outro-marathon-recover": "恢复完成。你已经把身体安顿好了。"
};
var MOVES = {
	jog: {
		id: "jog",
		name: "原地慢跑",
		cue: "小步轻落，把呼吸跑顺",
		points: [
			"前脚掌着地，声音要轻",
			"手肘约九十度，前后摆",
			"这是热身，不追求速度"
		],
		layout: "side"
	},
	walk: {
		id: "walk",
		name: "轻松走步",
		cue: "先把心率和呼吸降下来",
		points: [
			"不要立刻坐下拉伸",
			"肩颈放松，下巴微收",
			"头晕就再多走一会儿"
		],
		layout: "side"
	},
	stride: {
		id: "stride",
		name: "轻松跨步",
		cue: "步幅打开一点，落地仍然轻",
		points: [
			"从脚踝弹性出发",
			"不要耸肩，不要憋气",
			"只激活，不把腿跑累"
		],
		layout: "side"
	},
	"high-knees": {
		id: "high-knees",
		name: "高抬腿",
		cue: "膝盖抬向髋部，落地要轻",
		points: [
			"躯干不要向后仰",
			"支撑腿微屈，有弹性",
			"频率均匀，呼吸别停"
		],
		layout: "side"
	},
	"butt-kicks": {
		id: "butt-kicks",
		name: "后踢腿",
		cue: "脚跟去找臀部，膝盖朝下",
		points: [
			"用小腿发力，大腿少甩",
			"骨盆保持水平",
			"和摆臂节奏合上"
		],
		layout: "side"
	},
	"a-skip": {
		id: "a-skip",
		name: "A 字跳",
		cue: "勾脚抬膝，轻巧地换腿",
		points: [
			"脚尖向上勾",
			"落地用前脚掌",
			"整齐比速度重要"
		],
		layout: "side"
	},
	ankle: {
		id: "ankle",
		name: "踝关节绕环",
		cue: "脚尖画圆，膝盖尽量少动",
		points: [
			"圆画满，速度放慢",
			"脚尖、外侧、脚跟都经过",
			"站不稳就扶墙"
		],
		layout: "side"
	},
	"arm-circles": {
		id: "arm-circles",
		name: "肩臂绕环",
		cue: "手臂画大圆，肩膀别耸",
		points: [
			"胳膊伸直，不要只转手肘",
			"胸口打开，肋骨别外翻",
			"前后两个方向都做"
		],
		layout: "front"
	},
	"hip-circles": {
		id: "hip-circles",
		name: "髋部绕环",
		cue: "骨盆画圆，上身保持安静",
		points: [
			"画到身体两侧和正后方",
			"膝盖始终对准脚尖",
			"像给髋关节上油"
		],
		layout: "front"
	},
	"torso-twist": {
		id: "torso-twist",
		name: "躯干转体",
		cue: "用胸口转，髋留在正面",
		points: [
			"眼睛跟着转动方向",
			"不要靠甩手臂借力",
			"呼吸保持连续"
		],
		layout: "front"
	},
	"leg-swing": {
		id: "leg-swing",
		name: "前后摆腿",
		cue: "腿像钟摆，幅度慢慢加大",
		points: [
			"支撑腿微屈，不要锁死",
			"摆动的脚尖放松",
			"上身保持直立"
		],
		layout: "side"
	},
	"leg-swing-side": {
		id: "leg-swing-side",
		name: "侧向摆腿",
		cue: "腿横着摆过中线，身体别晃",
		points: [
			"摆动腿膝盖可以微屈",
			"支撑侧的髋不要塌",
			"够用即可，不必踢很高"
		],
		layout: "front"
	},
	lunge: {
		id: "lunge",
		name: "行进弓步",
		cue: "迈大步下沉，前膝对齐脚尖",
		points: [
			"后膝向下，不要砸地",
			"前脚全脚掌踩实",
			"左右步幅尽量接近"
		],
		layout: "side"
	},
	"side-lunge": {
		id: "side-lunge",
		name: "侧弓步",
		cue: "坐向一侧，另一条腿伸直",
		points: [
			"膝盖与脚尖同一方向",
			"下坐时胸口仍抬着",
			"手可以扶在弯曲的腿上"
		],
		layout: "front"
	},
	"knee-hug": {
		id: "knee-hug",
		name: "行进抱膝",
		cue: "膝盖靠近胸口，停一秒",
		points: [
			"抱住的是小腿",
			"支撑腿的髋向前",
			"上身不要缩成一团"
		],
		layout: "side"
	},
	worlds: {
		id: "worlds",
		name: "最伟大拉伸",
		cue: "弓步撑地，转体看向上手",
		points: [
			"后膝可以轻轻点地",
			"旋转来自胸口，不是甩头",
			"髋前侧和胸都要打开"
		],
		layout: "side"
	},
	"calf-raise": {
		id: "calf-raise",
		name: "提踵",
		cue: "抬起停住，再慢慢放下",
		points: [
			"最高点停一秒",
			"脚踝不要向外翻",
			"可以扶墙保持平衡"
		],
		layout: "side"
	},
	calf: {
		id: "calf",
		name: "小腿拉伸",
		cue: "后脚跟踩实，身体成一条斜线",
		points: [
			"脚尖朝前，不要外八",
			"后膝伸直，拉腿肚子",
			"酸胀即可，不要刺痛"
		],
		layout: "side"
	},
	quad: {
		id: "quad",
		name: "股四头肌拉伸",
		cue: "脚跟贴向臀部，膝盖朝下",
		points: [
			"两侧膝盖并拢",
			"髋向前送，腰不要塌",
			"只拉到紧，不拉到痛"
		],
		layout: "side"
	},
	hamstring: {
		id: "hamstring",
		name: "腘绳肌拉伸",
		cue: "髋往后坐，背挺直着折下去",
		points: [
			"脚尖回勾",
			"手可以扶在支撑腿上",
			"感觉在大腿后侧"
		],
		layout: "side"
	},
	"hip-flexor": {
		id: "hip-flexor",
		name: "髋屈肌拉伸",
		cue: "骨盆后倾，再把髋向前送",
		points: [
			"后膝轻轻点地",
			"肋骨收住，避免塌腰",
			"前膝仍在脚踝上方"
		],
		layout: "side"
	},
	figure4: {
		id: "figure4",
		name: "梨状肌拉伸",
		cue: "脚踝搁上，髋向后坐",
		points: [
			"搁上去的脚尖勾起",
			"支撑膝对准脚尖",
			"可以扶墙，上身微微前倾"
		],
		layout: "front"
	},
	chest: {
		id: "chest",
		name: "开肩扩胸",
		cue: "胸口轻轻抬起，肩膀远离耳朵",
		points: [
			"下巴微收，不要仰头",
			"呼吸时胸口向两侧展开",
			"感到肩前侧变松"
		],
		layout: "front"
	},
	breathe: {
		id: "breathe",
		name: "腹式呼吸",
		cue: "吸气时腹部鼓起，吐气放长",
		points: [
			"吸四拍，吐六拍",
			"肩和胸口保持安静",
			"眼睛可以轻轻闭上"
		],
		layout: "front"
	},
	child: {
		id: "child",
		name: "婴儿式",
		cue: "臀坐向脚跟，额头向下",
		points: [
			"膝盖不适就稍微分开",
			"不要用力压迫腹部",
			"每一口气都让背更宽"
		],
		layout: "quad"
	},
	"cat-cow": {
		id: "cat-cow",
		name: "猫牛式",
		cue: "吸气沉腹，吐气拱背",
		points: [
			"动作绑在呼吸上",
			"不要把肩耸到耳朵",
			"幅度舒适就够了"
		],
		layout: "quad"
	},
	twist: {
		id: "twist",
		name: "仰卧扭转",
		cue: "双膝倒向一侧，对侧肩留在地面",
		points: [
			"两膝一起走",
			"肩离开地面就减小幅度",
			"配合长长的吐气"
		],
		layout: "floor"
	},
	bridge: {
		id: "bridge",
		name: "臀桥",
		cue: "髋抬到膝与肩接近一条线",
		points: [
			"脚掌踩实",
			"顶端收的是臀，不是腰",
			"落下时一节节放下"
		],
		layout: "floor"
	},
	"ankle-pump": {
		id: "ankle-pump",
		name: "踝泵",
		cue: "勾脚，再向前踩，慢慢做",
		points: [
			"幅度做满比速度重要",
			"小腿不要抬离地面",
			"可以跟着呼吸数"
		],
		layout: "floor"
	}
};
var DOSES = {
	jog: { kind: "steady" },
	walk: { kind: "steady" },
	stride: { kind: "steady" },
	breathe: { kind: "steady" },
	"high-knees": { kind: "drill" },
	"butt-kicks": { kind: "drill" },
	"a-skip": { kind: "drill" },
	ankle: {
		kind: "reps",
		pace: 2.2,
		unit: "圈"
	},
	"arm-circles": {
		kind: "reps",
		pace: 2.6,
		unit: "圈"
	},
	"hip-circles": {
		kind: "reps",
		pace: 2.8,
		unit: "圈"
	},
	"torso-twist": {
		kind: "reps",
		pace: 1.9,
		unit: "次"
	},
	"leg-swing": {
		kind: "reps",
		pace: 1.6,
		unit: "次"
	},
	"leg-swing-side": {
		kind: "reps",
		pace: 1.6,
		unit: "次"
	},
	lunge: {
		kind: "reps",
		pace: 2.2,
		unit: "步"
	},
	"side-lunge": {
		kind: "reps",
		pace: 3.2,
		unit: "次"
	},
	"knee-hug": {
		kind: "reps",
		pace: 3,
		unit: "次"
	},
	worlds: {
		kind: "reps",
		pace: 4.4,
		unit: "次"
	},
	"calf-raise": {
		kind: "reps",
		pace: 1.93,
		unit: "次"
	},
	chest: {
		kind: "reps",
		pace: 3.6,
		unit: "次"
	},
	"cat-cow": {
		kind: "reps",
		pace: 4,
		unit: "次"
	},
	bridge: {
		kind: "reps",
		pace: 3,
		unit: "次"
	},
	"ankle-pump": {
		kind: "reps",
		pace: 2,
		unit: "次"
	},
	calf: { kind: "hold" },
	quad: { kind: "hold" },
	hamstring: { kind: "hold" },
	"hip-flexor": { kind: "hold" },
	figure4: { kind: "hold" },
	child: { kind: "hold" },
	twist: { kind: "hold" }
};
/** Sets and amount per set for one step. Steps of 30 s or more split into two sets. */
function prescription(step) {
	const dose = DOSES[step.move];
	const sets = (dose.kind === "drill" || dose.kind === "reps") && step.seconds >= 30 ? 2 : 1;
	if (dose.kind === "reps") return {
		kind: dose.kind,
		sets,
		each: Math.max(3, Math.round(step.seconds / sets / dose.pace)),
		unit: dose.unit
	};
	return {
		kind: dose.kind,
		sets,
		each: Math.round(step.seconds / sets),
		unit: "秒"
	};
}
function doseLabel(p) {
	if (p.kind === "steady") return `持续 ${p.each} 秒`;
	if (p.kind === "hold") return `保持 ${p.each} 秒`;
	return `${p.sets} 组 × ${p.each} ${p.unit}`;
}
var DIGITS = [
	"零",
	"一",
	"二",
	"三",
	"四",
	"五",
	"六",
	"七",
	"八",
	"九"
];
/** Spoken Chinese number for 0–99 ("两" for a lone 2, as in 两组). */
function spokenNumber(n, counting = false) {
	if (n === 2 && counting) return "两";
	if (n < 10) return DIGITS[n];
	const tens = Math.floor(n / 10);
	const ones = n % 10;
	return `${tens === 1 ? "" : DIGITS[tens]}十${ones ? DIGITS[ones] : ""}`;
}
/** Voice clip for a step's dose: id doubles as the audio file name. */
function doseLine(p) {
	const unitCode = {
		秒: "s",
		次: "r",
		圈: "c",
		步: "b"
	}[p.unit];
	return {
		id: `dose-${p.kind}-${p.sets}x${p.each}${unitCode}`,
		text: p.kind === "steady" ? `持续${spokenNumber(p.each)}秒。` : p.kind === "hold" ? `保持${spokenNumber(p.each)}秒。` : `做${spokenNumber(p.sets, true)}组，${p.sets > 1 ? "每组" : ""}${spokenNumber(p.each)}${p.kind === "drill" ? "秒" : p.unit}。`
	};
}
/** Spoken cue at the start of set n (n ≥ 2). */
function setLine(n) {
	return {
		id: `set-${n}`,
		text: `第${spokenNumber(n)}组，开始。`
	};
}
var DISTANCES = [
	{
		id: "5k",
		title: "5 公里",
		note: "关节热开，把腿速留到路上"
	},
	{
		id: "10k",
		title: "10 公里",
		note: "髋和步幅多给一点时间"
	},
	{
		id: "marathon",
		title: "马拉松",
		note: "流程更长，强度更克制"
	}
];
var PHASES = {
	warmup: {
		label: "热身",
		verb: "开始热身"
	},
	recover: {
		label: "恢复",
		verb: "开始恢复"
	}
};
var s = (move, seconds, side) => ({
	move,
	seconds,
	side
});
var L = "left";
var R = "right";
var ROUTINES = [
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
			s("jog", 40)
		]
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
			s("breathe", 50)
		]
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
			s("jog", 50)
		]
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
			s("breathe", 60)
		]
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
			s("jog", 85)
		]
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
			s("breathe", 90)
		]
	}
];
for (const move of Object.keys(MOVES)) if (!voiceLines[move]) throw new Error(`缺少讲解：${move}`);
for (const routine of ROUTINES) if (!voiceLines[`intro-${routine.id}`] || !voiceLines[`outro-${routine.id}`]) throw new Error(`缺少开场或结束语：${routine.id}`);
function routineFor(distance, phase) {
	const found = ROUTINES.find((item) => item.distance === distance && item.phase === phase);
	if (!found) throw new Error("missing routine");
	return found;
}
function routineSeconds(routine) {
	return routine.steps.reduce((sum, step) => sum + step.seconds, 0);
}
function formatClock(totalSeconds) {
	const safe = Math.max(0, Math.round(totalSeconds));
	return `${Math.floor(safe / 60)}:${(safe % 60).toString().padStart(2, "0")}`;
}
function distanceTitle(id) {
	return DISTANCES.find((item) => item.id === id)?.title ?? id;
}
function sideLabel(side) {
	if (side === "left") return "左侧";
	if (side === "right") return "右侧";
	return "";
}
var audio = null;
var token = 0;
var onPlaying = () => {};
function bindPlaying(listener) {
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
function primeVoice() {
	const nav = navigator;
	if (nav.audioSession) nav.audioSession.type = "playback";
	const player = element();
	player.src = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";
	return player.play().then(() => {
		player.pause();
	}).catch(() => {});
}
function stopVoice() {
	token += 1;
	audio?.pause();
	onPlaying(false);
	if (typeof window !== "undefined") window.speechSynthesis?.cancel();
}
function speakThen(text, done) {
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
function playVoice(clips) {
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
var VOICES = [{
	id: "xiaoxiao",
	name: "晓晓",
	hint: "女声"
}, {
	id: "yunxi",
	name: "云希",
	hint: "男声"
}];
function HomeScreen({ prefs, onPrefs, onStart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 pb-14 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base font-medium",
					children: "暖程"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-8 text-3xl font-semibold tracking-tight",
				children: "热身与恢复"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: "5 公里、10 公里、马拉松。出发前把关节和髋打开，跑完再把紧的地方收回来。"
			}),
			prefs.last ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: [
					"上次完成 · ",
					distanceTitle(prefs.last.distance),
					PHASES[prefs.last.phase].label
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-col gap-3",
				children: DISTANCES.map((distance) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DistanceCard, {
					distance: distance.id,
					note: distance.note,
					title: distance.title,
					onStart
				}, distance.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-3 rounded-card border border-line p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "讲解语音"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "微软神经网络 · 已内置，可离线播放"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-2 gap-2",
						role: "group",
						"aria-label": "选择讲解声音",
						children: VOICES.map((item) => {
							const selected = prefs.voice === item.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-pressed": selected,
								onClick: () => onPrefs({
									...prefs,
									voice: item.id
								}),
								className: `h-12 rounded-xl border-2 bg-surface text-sm font-medium transition-transform duration-150 active:scale-95 ${selected ? "border-red text-ink" : "border-line text-ink"}`,
								children: [item.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [" · ", item.hint]
								})]
							}, item.id);
						})
					})
				]
			})
		]
	});
}
function DistanceCard({ distance, title, note, onStart }) {
	const warmup = routineFor(distance, "warmup");
	const recover = routineFor(distance, "recover");
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-card border border-line p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-2 pb-1 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-semibold tracking-tight",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: note
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseRow, {
				label: PHASES.warmup.label,
				seconds: routineSeconds(warmup),
				count: warmup.steps.length,
				onClick: () => onStart(distance, "warmup")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseRow, {
				label: PHASES.recover.label,
				seconds: routineSeconds(recover),
				count: recover.steps.length,
				onClick: () => onStart(distance, "recover")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "mt-1 flex h-11 w-full items-center justify-between px-2 text-sm text-muted",
				"aria-expanded": open,
				onClick: () => setOpen((value) => !value),
				children: ["动作顺序", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}` })]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4 border-t border-line px-2 pb-2 pt-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoveList, {
					phase: "warmup",
					steps: warmup.steps
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoveList, {
					phase: "recover",
					steps: recover.steps
				})]
			}) : null
		]
	});
}
function PhaseRow({ label, seconds, count, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "mt-2 flex w-full items-stretch gap-3 rounded-xl bg-surface p-4 text-left transition-transform duration-150 active:scale-95",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1 self-stretch rounded-full bg-rail" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-base font-semibold",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-1 flex items-center gap-1.5 text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
						className: "h-3.5 w-3.5",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: [
							formatClock(seconds),
							" · ",
							count,
							" 个动作"
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "self-center text-sm font-medium text-red",
				children: "开始"
			})
		]
	});
}
function MoveList({ phase, steps }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-2 text-sm text-muted",
		children: PHASES[phase].label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "flex flex-col gap-1.5",
		children: steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "leading-snug",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted tabular-nums",
					children: [index + 1, " "]
				}),
				MOVES[step.move].name,
				step.side ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted",
					children: [" · ", sideLabel(step.side)]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-xs text-muted tabular-nums",
					children: doseLabel(prescription(step))
				})
			]
		}, `${step.move}-${index}`))
	})] });
}
function Mark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "grid h-10 w-10 place-items-center rounded-full bg-surface",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 24 24",
			className: "h-6 w-6",
			fill: "none",
			strokeLinecap: "round",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M4.5 14.5a7.5 7.5 0 0 1 15 0",
					className: "stroke-red",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M8.25 14.5a3.75 3.75 0 0 1 7.5 0",
					className: "stroke-red",
					strokeWidth: "2",
					opacity: "0.55"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M3 18h18",
					className: "stroke-ink",
					strokeWidth: "1.8"
				})
			]
		})
	});
}
var CoachStage = (0, import_react.lazy)(() => import("./coach-stage-BUkOs7ve.mjs"));
function hasWebGL() {
	try {
		const canvas = document.createElement("canvas");
		return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
	} catch {
		return false;
	}
}
var StageBoundary = class extends import_react.Component {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	render() {
		return this.state.failed ? this.props.fallback : this.props.children;
	}
};
function CoachView({ move, side, paused, label, muscles, focus }) {
	const [webgl, setWebgl] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => setWebgl(hasWebGL()), []);
	if (webgl === null) return null;
	const unsupported = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "flex h-full items-center justify-center px-6 text-center text-sm text-black/50",
		children: "这台设备暂不支持 3D 动作演示"
	});
	if (!webgl) return unsupported;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageBoundary, {
		fallback: unsupported,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoachStage, {
				move,
				side,
				paused,
				muscles,
				focus,
				label
			})
		})
	});
}
function MuscleLegend({ move, focus, onFocus }) {
	const { primary, secondary } = legendFor(move);
	const chip = (id, level) => {
		const active = focus === id;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-pressed": active,
			onClick: () => onFocus(active ? null : id),
			className: `flex h-8 items-center gap-1.5 rounded-full px-3 text-xs transition-colors duration-150 ${active ? "bg-ink text-canvas" : "bg-surface text-ink"} ${focus && !active ? "opacity-50" : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `h-2 w-2 rounded-full ${level === "primary" ? "bg-muscle" : "bg-muscle-soft"}`,
				"aria-hidden": "true"
			}), MUSCLE_NAMES[id]]
		}, id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		"aria-label": "训练肌群",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-8 text-xs text-muted",
				children: "主要"
			}), primary.map((id) => chip(id, "primary"))]
		}), secondary.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-8 text-xs text-muted",
				children: "次要"
			}), secondary.map((id) => chip(id, "secondary"))]
		}) : null]
	});
}
function SessionScreen({ distance, phase, prefs, onPrefs, onExit, onDone }) {
	const routine = routineFor(distance, phase);
	const steps = routine.steps;
	const [index, setIndex] = (0, import_react.useState)(0);
	const [nonce, setNonce] = (0, import_react.useState)(0);
	const [leftMs, setLeftMs] = (0, import_react.useState)(steps[0]?.seconds ? steps[0].seconds * 1e3 : 0);
	const [running, setRunning] = (0, import_react.useState)(true);
	const [confirming, setConfirming] = (0, import_react.useState)(false);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [muscles, setMuscles] = (0, import_react.useState)(true);
	const [focus, setFocus] = (0, import_react.useState)(null);
	const indexRef = (0, import_react.useRef)(0);
	const leftRef = (0, import_react.useRef)(leftMs);
	const endAt = (0, import_react.useRef)(0);
	const runningRef = (0, import_react.useRef)(true);
	const accum = (0, import_react.useRef)(0);
	const stamp = (0, import_react.useRef)(0);
	const painted = (0, import_react.useRef)(0);
	const prefsRef = (0, import_react.useRef)(prefs);
	prefsRef.current = prefs;
	const onDoneRef = (0, import_react.useRef)(onDone);
	onDoneRef.current = onDone;
	const step = steps[index] ?? steps[0];
	const move = MOVES[step.move];
	(0, import_react.useEffect)(() => {
		bindPlaying(setPlaying);
		return () => {
			stopVoice();
			bindPlaying(() => {});
		};
	}, []);
	(0, import_react.useEffect)(() => setFocus(null), [index]);
	(0, import_react.useEffect)(() => {
		const total = (steps[index]?.seconds ?? 0) * 1e3;
		leftRef.current = total;
		setLeftMs(total);
		indexRef.current = index;
		if (!prefsRef.current.muted) playVoice(clipsFor(routine.id, steps[index] ?? steps[0], index, nonce, prefsRef.current.voice));
		else stopVoice();
		if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(12);
	}, [
		index,
		nonce,
		routine.id,
		step.move,
		steps
	]);
	(0, import_react.useEffect)(() => {
		runningRef.current = running;
		if (!running) return;
		stamp.current = performance.now();
		endAt.current = performance.now() + leftRef.current;
		let frame = 0;
		const loop = (now) => {
			const left = endAt.current - now;
			if (left <= 0) {
				leftRef.current = 0;
				setLeftMs(0);
				const current = indexRef.current;
				if (current >= steps.length - 1) {
					accum.current += now - stamp.current;
					runningRef.current = false;
					onDoneRef.current(accum.current / 1e3);
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
	}, [
		running,
		index,
		nonce,
		steps.length
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key === " " || event.code === "Space") {
				event.preventDefault();
				toggle();
			} else if (event.key === "ArrowRight") forward();
			else if (event.key === "ArrowLeft") back();
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
			onDoneRef.current(accum.current / 1e3);
			return;
		}
		indexRef.current += 1;
		setIndex(indexRef.current);
	}
	function back() {
		if ((steps[indexRef.current]?.seconds ?? 0) * 1e3 - leftRef.current > 2e3 || indexRef.current === 0) {
			setNonce((value) => value + 1);
			return;
		}
		indexRef.current -= 1;
		setIndex(indexRef.current);
	}
	function replay() {
		if (prefs.muted) onPrefs({
			...prefs,
			muted: false
		});
		playVoice(clipsFor(routine.id, step, index, nonce, prefs.voice).filter((clip) => !clip.src.includes("/intro-")));
	}
	const doneSeconds = steps.slice(0, index).reduce((sum, item) => sum + item.seconds, 0);
	const into = step.seconds - leftMs / 1e3;
	const progress = Math.min(100, (doneSeconds + into) / routineSeconds(routine) * 100);
	const display = Math.max(0, Math.ceil(leftMs / 1e3));
	const side = sideLabel(step.side);
	const urgent = display <= 3 && display > 0 && running;
	const dose = prescription(step);
	const currentSet = Math.min(dose.sets, Math.floor(into / (step.seconds / dose.sets)) + 1);
	const announced = (0, import_react.useRef)({
		index: -1,
		set: 1
	});
	(0, import_react.useEffect)(() => {
		if (announced.current.index !== index) {
			announced.current = {
				index,
				set: 1
			};
			return;
		}
		if (currentSet <= announced.current.set) return;
		announced.current.set = currentSet;
		if (prefsRef.current.muted) return;
		const cue = setLine(currentSet);
		playVoice([{
			src: `/voice/${prefsRef.current.voice}/${cue.id}.mp3`,
			text: cue.text
		}]);
	}, [currentSet, index]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-h-dvh flex-col",
		"data-phase": phase,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-2 px-2 pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "退出",
						onClick: () => setConfirming(true),
						className: "flex h-11 w-11 items-center justify-center transition-transform duration-150 active:scale-95",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "min-w-0 flex-1 truncate text-center text-sm text-muted",
						children: [
							distanceTitle(distance),
							" · ",
							PHASES[phase].label
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": prefs.muted ? "打开讲解" : "关闭讲解",
						"aria-pressed": !prefs.muted,
						onClick: () => {
							const muted = !prefs.muted;
							onPrefs({
								...prefs,
								muted
							});
							if (muted) stopVoice();
						},
						className: "flex h-11 w-11 items-center justify-center text-ink transition-transform duration-150 active:scale-95",
						children: prefs.muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-5 w-5 text-muted" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-5 w-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-4 h-0.5 overflow-hidden rounded-full bg-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-red",
					style: { width: `${progress}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-4 mt-3 h-72 overflow-hidden rounded-card bg-stage",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoachView, {
						move: step.move,
						side: step.side,
						paused: !running,
						label: move.name,
						muscles,
						focus
					}),
					side ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute left-4 top-4 text-sm font-medium text-red",
						children: side
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": muscles,
						onClick: () => {
							setMuscles((value) => !value);
							setFocus(null);
						},
						className: `absolute right-3 top-3 h-8 rounded-full px-3 text-xs font-medium transition-colors duration-150 ${muscles ? "bg-canvas text-ink" : "bg-black/10 text-black/60"}`,
						children: "肌群"
					}),
					!running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute bottom-3 right-3 rounded-full bg-canvas px-3 py-1 text-xs text-ink",
						children: "已暂停"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col px-4 pb-8 pt-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-semibold tracking-tight",
							children: move.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `eq text-red ${playing && !prefs.muted ? "is-on" : ""}`,
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted tabular-nums",
						children: [
							index + 1,
							" / ",
							steps.length,
							side ? ` · ${side}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 flex items-baseline gap-3 tabular-nums",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-semibold",
							children: doseLabel(dose)
						}), dose.sets > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-red",
							children: [
								"第 ",
								currentSet,
								"/",
								dose.sets,
								" 组"
							]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MuscleLegend, {
							move: step.move,
							focus: muscles ? focus : null,
							onFocus: (id) => {
								setMuscles(true);
								setFocus(id);
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "剩余"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `mt-1 font-timer text-6xl font-semibold leading-none tabular-nums ${urgent ? "text-red" : "text-ink"} ${urgent ? "scale-105" : ""} transition-transform duration-150`,
							children: formatClock(display)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative h-16 w-16 text-red",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, {
								ms: leftMs,
								total: step.seconds
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex items-center justify-between",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Control, {
								label: "上一个",
								onClick: back,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipBack, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: toggle,
								"aria-label": running ? "暂停" : "继续",
								className: "flex h-14 w-14 items-center justify-center rounded-full bg-red text-ink transition-transform duration-150 active:scale-95",
								children: running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-6 w-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Control, {
								label: "下一个",
								onClick: forward,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "h-5 w-5" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: replay,
						className: "mt-4 h-11 self-start text-sm font-medium text-red",
						children: "再听一遍"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "提示"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-base leading-relaxed",
							children: move.cue
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "要点"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-1 flex flex-col gap-1 text-base leading-relaxed",
							children: move.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: point }, point))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "讲解"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-base leading-relaxed text-ink",
							children: voiceLines[step.move]
						})]
					})
				]
			}),
			confirming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-20 flex items-end justify-center bg-canvas/70 px-4 pb-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-card bg-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "先离开这次训练？"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: "进度不会保存，下次从第一个动作开始。"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setConfirming(false),
							className: "mt-5 h-12 w-full rounded-full bg-red text-sm font-medium text-ink transition-transform duration-150 active:scale-95",
							children: "继续练"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								stopVoice();
								onExit();
							},
							className: "mt-2 h-12 w-full rounded-full text-sm font-medium text-muted transition-transform duration-150 active:scale-95",
							children: "离开"
						})
					]
				})
			}) : null
		]
	});
}
function Control({ label, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		onClick,
		className: "flex h-12 w-12 items-center justify-center rounded-full bg-surface text-ink transition-transform duration-150 active:scale-95",
		children
	});
}
function Ring({ ms, total }) {
	const radius = 42;
	const circ = 2 * Math.PI * radius;
	const progress = total <= 0 ? 0 : Math.min(1, Math.max(0, ms / 1e3 / total));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 100 100",
		className: "h-full w-full",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			className: "ring-track",
			cx: "50",
			cy: "50",
			r: radius
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			transform: "rotate(-90 50 50)",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: "ring-value",
				cx: "50",
				cy: "50",
				r: radius,
				strokeDasharray: circ,
				strokeDashoffset: circ * (1 - progress)
			})
		})]
	});
}
function clipsFor(routineId, step, index, nonce, voice) {
	const base = `/voice/${voice}`;
	const clips = [];
	if (index === 0 && nonce === 0) {
		const id = `intro-${routineId}`;
		clips.push({
			src: `${base}/${id}.mp3`,
			text: voiceLines[id] ?? ""
		});
	}
	if (step.side) {
		const id = step.side === "left" ? "side-left" : "side-right";
		clips.push({
			src: `${base}/${id}.mp3`,
			text: voiceLines[id] ?? ""
		});
	}
	const dose = doseLine(prescription(step));
	clips.push({
		src: `${base}/${dose.id}.mp3`,
		text: dose.text
	});
	clips.push({
		src: `${base}/${step.move}.mp3`,
		text: voiceLines[step.move] ?? ""
	});
	return clips;
}
var STORAGE_KEY = "nuancheng-v1";
var DEFAULT_PREFS = {
	voice: "xiaoxiao",
	muted: false
};
function readPrefs() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return DEFAULT_PREFS;
		const parsed = JSON.parse(raw);
		return {
			voice: parsed.voice === "yunxi" ? "yunxi" : "xiaoxiao",
			muted: Boolean(parsed.muted),
			last: parsed.last
		};
	} catch {
		return DEFAULT_PREFS;
	}
}
function App() {
	const [prefs, setPrefs] = (0, import_react.useState)(DEFAULT_PREFS);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [view, setView] = (0, import_react.useState)({ name: "home" });
	(0, import_react.useEffect)(() => {
		setPrefs(readPrefs());
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
	}, [prefs, ready]);
	const start = (distance, phase) => {
		primeVoice();
		setView({
			name: "session",
			distance,
			phase
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh w-full max-w-md bg-canvas text-ink",
		children: [
			view.name === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeScreen, {
				prefs,
				onPrefs: setPrefs,
				onStart: start
			}) : null,
			view.name === "session" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionScreen, {
				distance: view.distance,
				phase: view.phase,
				prefs,
				onPrefs: setPrefs,
				onExit: () => setView({ name: "home" }),
				onDone: (elapsed) => {
					setPrefs((current) => ({
						...current,
						last: {
							distance: view.distance,
							phase: view.phase,
							at: Date.now()
						}
					}));
					setView({
						name: "done",
						distance: view.distance,
						phase: view.phase,
						elapsed
					});
				}
			}) : null,
			view.name === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoneScreen, {
				distance: view.distance,
				phase: view.phase,
				elapsed: view.elapsed,
				voice: prefs.voice,
				muted: prefs.muted,
				onHome: () => setView({ name: "home" })
			}) : null
		]
	});
}
function DoneScreen({ distance, phase, elapsed, voice, muted, onHome }) {
	const routine = routineFor(distance, phase);
	const lineId = `outro-${routine.id}`;
	(0, import_react.useEffect)(() => {
		if (muted) return;
		playVoice([{
			src: `/voice/${voice}/${lineId}.mp3`,
			text: voiceLines[lineId] ?? ""
		}]);
		return () => stopVoice();
	}, [
		lineId,
		muted,
		voice
	]);
	const headline = phase === "warmup" ? "热身完成" : "恢复完成";
	const detail = phase === "warmup" ? "身体醒了，按今天的距离出发。" : "紧的地方已经松开一些，可以好好休息。";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-h-dvh flex-col px-4 pb-10 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-10 w-10 place-items-center rounded-full bg-surface text-red",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 24 24",
						className: "h-6 w-6",
						fill: "none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "12",
							cy: "12",
							r: "8.25",
							stroke: "currentColor",
							strokeWidth: "1.7"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M8.2 14.2 12 8.4l3.8 5.8",
							stroke: "currentColor",
							strokeWidth: "1.7",
							strokeLinejoin: "round",
							strokeLinecap: "round"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base font-medium",
					children: "暖程"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-sm text-muted",
				children: [
					distanceTitle(distance),
					" · ",
					PHASES[phase].label
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl font-semibold tracking-tight",
				children: headline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-base leading-relaxed text-muted",
				children: detail
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 font-timer text-6xl font-semibold tabular-nums leading-none",
				children: formatClock(elapsed)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: ["实际用时 · 计划 ", formatClock(routineSeconds(routine))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto pt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onHome,
					className: "h-12 w-full rounded-full bg-red text-base font-medium text-ink transition-transform duration-150 active:scale-95",
					children: "回到首页"
				})
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {});
}
//#endregion
export { Home as component };
