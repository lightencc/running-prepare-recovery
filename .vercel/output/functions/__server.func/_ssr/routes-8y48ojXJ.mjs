import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SkipBack, c as Clock, i as SkipForward, l as ChevronLeft, n as Volume2, o as Play, s as Pause, t as VolumeX, u as ChevronDown } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-8y48ojXJ.js
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
				}) : null
			]
		}, `${step.move}-${index}`))
	})] });
}
function Mark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
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
	});
}
var POSES = {
	jog: {
		dur: "0.55s",
		bob: "0,0; 0,-8; 0,0; 0,-8; 0,0",
		torso: "3; -3; 3",
		thighF: "-34; 26; -34",
		thighB: "26; -34; 26",
		shinF: "14; 64; 14",
		shinB: "64; 14; 64",
		upperF: "32; -34; 32",
		upperB: "-34; 32; -34"
	},
	walk: {
		dur: "1.15s",
		bob: "0,0; 0,-4; 0,0; 0,-4; 0,0",
		torso: "2; -2; 2",
		thighF: "-22; 16; -22",
		thighB: "16; -22; 16",
		shinF: "8; 30; 8",
		shinB: "30; 8; 30",
		upperF: "18; -16; 18",
		upperB: "-16; 18; -16"
	},
	stride: {
		dur: "0.46s",
		bob: "0,0; 0,-12; 0,0; 0,-12; 0,0",
		torso: "5; -4; 5",
		thighF: "-48; 34; -48",
		thighB: "34; -48; 34",
		shinF: "12; 72; 12",
		shinB: "72; 12; 72",
		upperF: "40; -42; 40",
		upperB: "-42; 40; -42"
	},
	"high-knees": {
		dur: "0.5s",
		bob: "0,0; 0,-11; 0,0; 0,-11; 0,0",
		torso: "2; -2; 2",
		thighF: "-78; 8; -78",
		thighB: "8; -78; 8",
		shinF: "74; 12; 74",
		shinB: "12; 74; 12",
		upperF: "36; -34; 36",
		upperB: "-34; 36; -34"
	},
	"butt-kicks": {
		dur: "0.46s",
		bob: "0,0; 0,-6; 0,0; 0,-6; 0,0",
		thighF: "10; 16; 10",
		thighB: "16; 10; 16",
		shinF: "10; 124; 10",
		shinB: "124; 10; 124",
		upperF: "28; -26; 28",
		upperB: "-26; 28; -26"
	},
	"a-skip": {
		dur: "0.9s",
		bob: "0,0; 0,-14; 0,-2; 0,-14; 0,0",
		thighF: "-72; -72; 8; -72",
		thighB: "8; -72; -72; 8",
		shinF: "68; 68; 12; 68",
		shinB: "12; 68; 68; 12",
		upperF: "30; 30; -28; 30",
		upperB: "-28; 30; 30; -28"
	},
	ankle: {
		dur: "1.8s",
		thighF: "-20; -20; -20",
		shinF: "26; 26; 26",
		footF: "0; 120; 240; 360",
		thighB: "4; 4; 4",
		upperF: "-36; -36; -36",
		upperB: "12; 12; 12",
		linear: true
	},
	"arm-circles": {
		dur: "2.6s",
		upperF: "0; -180; -360",
		upperB: "0; 180; 360",
		foreF: "0; 0; 0",
		foreB: "0; 0; 0",
		linear: true
	},
	"hip-circles": {
		dur: "2.6s",
		bob: "0,0; 18,5; 0,14; -18,5; 0,0",
		upperF: "-66; -66; -66",
		upperB: "66; 66; 66",
		thighF: "-8; -8; -8",
		thighB: "8; 8; 8"
	},
	"torso-twist": {
		dur: "1.7s",
		torso: "-18; 18; -18",
		upperF: "-42; -42; -42",
		upperB: "42; 42; 42"
	},
	"leg-swing": {
		dur: "1.5s",
		torso: "-4; 5; -4",
		thighF: "38; -64; 38",
		shinF: "6; 8; 6",
		thighB: "4; 4; 4",
		upperF: "-18; -40; -18",
		upperB: "8; 20; 8"
	},
	"leg-swing-side": {
		dur: "1.5s",
		thighF: "-34; 38; -34",
		shinF: "4; 6; 4",
		thighB: "4; 4; 4",
		upperF: "-24; -24; -24",
		upperB: "18; 18; 18"
	},
	lunge: {
		dur: "2.6s",
		bob: "0,0; 16,18; 16,18; 0,0; 16,18; 16,18; 0,0",
		torso: "0; -8; -8; 0; -8; -8; 0",
		thighF: "0; -56; -56; 0; 10; 10; 0",
		shinF: "4; 62; 62; 4; 6; 6; 4",
		thighB: "0; 32; 32; 0; -56; -56; 0",
		shinB: "4; -12; -12; 4; 62; 62; 4",
		upperF: "-12; -48; -48; -12; 16; 16; -12",
		upperB: "14; 18; 18; 14; -48; -48; 14"
	},
	"side-lunge": {
		dur: "2.4s",
		bob: "0,0; -30,18; -30,18; 0,0",
		thighF: "0; -16; -16; 0",
		shinF: "0; 46; 46; 0",
		thighB: "0; 24; 24; 0",
		shinB: "0; 4; 4; 0",
		upperF: "-8; -36; -36; -8",
		upperB: "8; 20; 20; 8"
	},
	"knee-hug": {
		dur: "2.4s",
		torso: "0; 14; 14; 14; 0",
		thighF: "0; -76; -76; -76; 0",
		shinF: "4; 84; 84; 84; 4",
		thighB: "0; 4; 4; 4; 0",
		upperF: "-12; -102; -102; -102; -12",
		foreF: "18; -24; -24; -24; 18",
		upperB: "12; 8; 8; 8; 12"
	},
	worlds: {
		dur: "3.4s",
		bob: "0,0; 16,18; 16,18; 18,22; 18,22; 0,0",
		torso: "0; -8; -8; -20; -20; 0",
		thighF: "0; -56; -56; -60; -60; 0",
		shinF: "4; 60; 60; 66; 66; 4",
		thighB: "0; 30; 30; 34; 34; 0",
		shinB: "4; -8; -8; -4; -4; 4",
		upperF: "-14; -42; -42; -158; -158; -14",
		foreF: "18; 12; 12; 6; 6; 18",
		upperB: "12; 20; 20; 24; 24; 12"
	},
	"calf-raise": {
		dur: "1.45s",
		bob: "0,0; 0,-18; 0,-18; 0,0",
		footF: "0; -20; -20; 0",
		footB: "0; -20; -20; 0",
		upperF: "-8; -12; -12; -8",
		upperB: "10; 14; 14; 10"
	},
	calf: {
		dur: "2.2s",
		bob: "14,6; 22,8; 14,6",
		torso: "-14; -18; -14",
		thighF: "-28; -36; -28",
		shinF: "34; 42; 34",
		thighB: "18; 20; 18",
		shinB: "0; 2; 0",
		upperF: "-74; -82; -74",
		upperB: "-68; -76; -68"
	},
	quad: {
		dur: "2.3s",
		torso: "-2; 3; -2",
		thighB: "8; 12; 8",
		shinB: "104; 126; 104",
		upperB: "28; 50; 28",
		foreB: "14; 40; 14",
		thighF: "2; 4; 2",
		shinF: "4; 6; 4",
		upperF: "-16; -20; -16"
	},
	hamstring: {
		dur: "2.8s",
		bob: "0,0; -8,12; -8,16; -8,12",
		torso: "6; 56; 68; 56",
		thighF: "-6; -18; -22; -18",
		shinF: "2; 6; 8; 6",
		thighB: "2; 8; 8; 8",
		upperF: "-16; -42; -50; -42",
		upperB: "10; 16; 18; 16"
	},
	"hip-flexor": {
		dur: "3s",
		bob: "0,0; 10,36; 18,40; 10,36; 0,0",
		torso: "0; -4; -8; -4; 0",
		thighB: "0; 84; 90; 84; 0",
		shinB: "0; -90; -96; -90; 0",
		thighF: "0; -46; -52; -46; 0",
		shinF: "0; 50; 56; 50; 0",
		upperF: "-10; -28; -32; -28; -10",
		upperB: "8; 14; 16; 14; 8"
	},
	figure4: {
		dur: "2.8s",
		bob: "0,0; 0,12; 0,18; 0,12; 0,0",
		thighF: "0; -44; -52; -44; 0",
		shinF: "0; 72; 84; 72; 0",
		thighB: "0; -6; -10; -6; 0",
		shinB: "0; 16; 22; 16; 0",
		upperF: "-8; -32; -40; -32; -8",
		upperB: "8; 18; 22; 18; 8"
	},
	chest: {
		dur: "3.2s",
		breath: "1,1; 1.04,1.06; 1,1",
		upperF: "-6; -80; -92; -80; -6",
		upperB: "6; 80; 92; 80; 6",
		foreF: "14; 30; 36; 30; 14",
		foreB: "14; 30; 36; 30; 14"
	},
	breathe: {
		dur: "4.2s",
		breath: "1,1; 1.05,1.08; 1,1",
		bob: "0,0; 0,-3; 0,0",
		upperF: "6; 4; 6",
		upperB: "-4; -2; -4"
	},
	child: { dur: "3s" },
	"cat-cow": { dur: "2.6s" },
	twist: {
		dur: "3.2s",
		torso: "90; 90; 90; 90",
		thighF: "90; 30; 18; 90",
		shinF: "0; 64; 74; 0",
		thighB: "92; 92; 92; 92",
		shinB: "0; 0; 0; 0",
		upperF: "70; 70; 70; 70",
		upperB: "20; 20; 20; 20"
	},
	bridge: {
		dur: "2.6s",
		bob: "0,0; 0,-44; 0,-44; 0,0",
		torso: "90; 78; 74; 90",
		thighF: "92; 40; 36; 92",
		thighB: "92; 40; 36; 92",
		shinF: "0; 50; 56; 0",
		shinB: "0; 50; 56; 0",
		upperF: "40; 20; 16; 40",
		upperB: "20; 8; 6; 20"
	},
	"ankle-pump": {
		dur: "1.15s",
		torso: "90; 90; 90",
		thighF: "90; 90; 90",
		thighB: "90; 90; 90",
		footF: "-18; 26; -18",
		footB: "-18; 26; -18",
		upperF: "30; 30; 30",
		upperB: "12; 12; 12"
	}
};
var SWAP = /* @__PURE__ */ new Set([
	"ankle",
	"leg-swing",
	"leg-swing-side",
	"side-lunge",
	"knee-hug",
	"worlds",
	"calf",
	"quad",
	"hamstring",
	"hip-flexor",
	"figure4",
	"twist"
]);
function negateBob(values) {
	if (!values) return values;
	return values.split(";").map((part) => {
		const [x, y] = part.split(",").map((item) => item.trim());
		if (y === void 0) return part.trim();
		return `${-Number(x)},${y}`;
	}).join("; ");
}
function poseFor(move, side) {
	const pose = POSES[move];
	if (side !== "right" || !SWAP.has(move)) return pose;
	return {
		...pose,
		bob: negateBob(pose.bob),
		thighF: pose.thighB,
		thighB: pose.thighF,
		shinF: pose.shinB,
		shinB: pose.shinF,
		footF: pose.footB,
		footB: pose.footF,
		upperF: pose.upperB,
		upperB: pose.upperF,
		foreF: pose.foreB,
		foreB: pose.foreF
	};
}
function useSvgPause(ref, paused) {
	(0, import_react.useEffect)(() => {
		const svg = ref.current;
		if (!svg) return;
		if (paused) svg.pauseAnimations();
		else svg.unpauseAnimations();
	}, [paused, ref]);
}
function useReducedMotion() {
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => setReduced(media.matches);
		apply();
		media.addEventListener("change", apply);
		return () => media.removeEventListener("change", apply);
	}, []);
	return reduced;
}
function Spin({ kind, values, dur, linear, fallback, reduced, children }) {
	if (!values) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: fallback,
		children
	});
	if (reduced) {
		const parts = values.split(";").map((item) => item.trim());
		const mid = parts[Math.min(parts.length - 1, Math.floor(parts.length / 2))] ?? parts[0];
		const transform = kind === "rotate" ? `rotate(${mid})` : kind === "translate" ? `translate(${mid})` : `scale(${mid})`;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			transform,
			children
		});
	}
	const count = values.split(";").length;
	const keyTimes = Array.from({ length: count }, (_, index) => (index / (count - 1)).toFixed(4)).join(";");
	const keySplines = Array.from({ length: Math.max(0, count - 1) }, () => "0.45 0 0.55 1").join(";");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateTransform", {
		attributeName: "transform",
		type: kind,
		values,
		dur,
		repeatCount: "indefinite",
		begin: "0s",
		keyTimes,
		calcMode: linear ? "linear" : "spline",
		...linear ? {} : { keySplines }
	}), children] });
}
function Head({ front }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		className: "head",
		transform: front ? "translate(0,-132)" : "translate(10,-128)",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				className: "hair",
				cx: 0,
				cy: -8,
				rx: 32,
				ry: 26
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: "skin",
				cx: 0,
				cy: 2,
				r: 28
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				className: "hair",
				cx: front ? 0 : -2,
				cy: -18,
				rx: 28,
				ry: 14
			}),
			front ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: "eye",
				cx: -7,
				cy: 2,
				r: 2.2
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: "eye",
				cx: 7,
				cy: 2,
				r: 2.2
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: "eye",
				cx: 12,
				cy: 1,
				r: 2.2
			})
		]
	});
}
function Limb({ pose, part, dur, linear, reduced, foreFallback, upperFallback }) {
	return {
		thigh: part === "f" ? pose.thighF : pose.thighB,
		shin: part === "f" ? pose.shinF : pose.shinB,
		foot: part === "f" ? pose.footF : pose.footB,
		upper: part === "f" ? pose.upperF : pose.upperB,
		fore: part === "f" ? pose.foreF : pose.foreB,
		dur,
		linear,
		reduced,
		foreFallback,
		upperFallback
	};
}
function Leg({ part, pose, reduced }) {
	const bits = Limb({
		pose,
		part,
		dur: pose.dur,
		linear: pose.linear,
		reduced,
		foreFallback: "rotate(18)",
		upperFallback: part === "f" ? "rotate(-12)" : "rotate(14)"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		className: `leg leg-${part}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Spin, {
			kind: "rotate",
			values: bits.thigh,
			dur: pose.dur,
			reduced,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				className: "skin",
				x: -15,
				y: 0,
				width: 30,
				height: 74,
				rx: 15
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				transform: "translate(0,66)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Spin, {
					kind: "rotate",
					values: bits.shin,
					dur: pose.dur,
					reduced,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						className: "skin",
						x: -12,
						y: 0,
						width: 24,
						height: 66,
						rx: 12
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
						transform: "translate(0,58)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spin, {
							kind: "rotate",
							values: bits.foot,
							dur: pose.dur,
							linear: pose.linear,
							reduced,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
								className: "shoe",
								cx: 18,
								cy: 8,
								rx: 28,
								ry: 10
							})
						})
					})]
				})
			})]
		})
	});
}
function Arm({ part, pose, reduced, x }) {
	const upper = part === "f" ? pose.upperF : pose.upperB;
	const fore = part === "f" ? pose.foreF : pose.foreB;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		className: `arm arm-${part}`,
		transform: `translate(${x},-90)`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Spin, {
			kind: "rotate",
			values: upper,
			dur: pose.dur,
			linear: pose.linear,
			fallback: part === "f" ? "rotate(-12)" : "rotate(16)",
			reduced,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				className: "skin",
				x: -8,
				y: 0,
				width: 16,
				height: 48,
				rx: 8
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				transform: "translate(0,42)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spin, {
					kind: "rotate",
					values: fore,
					dur: pose.dur,
					fallback: "rotate(18)",
					reduced,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						className: "skin",
						x: -7,
						y: 0,
						width: 14,
						height: 42,
						rx: 7
					})
				})
			})]
		})
	});
}
function Torso({ pose, front, reduced }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		className: "torso",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spin, {
			kind: "rotate",
			values: pose.torso,
			dur: pose.dur,
			reduced,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Spin, {
				kind: "scale",
				values: pose.breath,
				dur: pose.dur,
				reduced,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						className: "shirt",
						x: front ? -40 : -34,
						y: -112,
						width: front ? 80 : 68,
						height: 116,
						rx: 28
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head, { front }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						className: "shorts",
						x: front ? -42 : -36,
						y: -16,
						width: front ? 84 : 72,
						height: 44,
						rx: 16
					})
				]
			})
		})
	});
}
function Human({ move, layout, side, phase, paused, label }) {
	const ref = (0, import_react.useRef)(null);
	useSvgPause(ref, paused);
	const reduced = useReducedMotion();
	const pose = poseFor(move, side);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		ref,
		viewBox: layout === "floor" ? "10 70 340 270" : "50 8 220 330",
		className: "coach-svg",
		"data-phase": phase,
		"data-move": move,
		role: "img",
		"aria-label": label,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				className: "ground",
				cx: 160,
				cy: 324,
				rx: 86,
				ry: 10
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				className: "prop-wall",
				x: 236,
				y: 120,
				width: 18,
				height: 200,
				rx: 6
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: "anchor",
				transform: layout === "floor" ? "translate(168,214)" : "translate(160,176)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Spin, {
					kind: "translate",
					values: pose.bob,
					dur: pose.dur,
					reduced,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arm, {
							part: "b",
							pose,
							reduced,
							x: layout === "front" ? 42 : -8
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							transform: layout === "front" ? "translate(22,0)" : void 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leg, {
								part: "b",
								pose,
								reduced
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Torso, {
							pose,
							front: layout === "front",
							reduced
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							transform: layout === "front" ? "translate(-22,0)" : void 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leg, {
								part: "f",
								pose,
								reduced
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arm, {
							part: "f",
							pose,
							reduced,
							x: layout === "front" ? -42 : 16
						})
					]
				})
			})
		]
	});
}
function QuadBody({ head, arm, thigh, dur, reduced }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			transform: "translate(36,10)",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spin, {
				kind: "rotate",
				values: thigh,
				dur,
				reduced,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					className: "skin",
					x: -9,
					y: 0,
					width: 18,
					height: 64,
					rx: 9
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			className: "shirt",
			x: -92,
			y: -22,
			width: 124,
			height: 44,
			rx: 18
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			className: "shorts",
			x: -4,
			y: -18,
			width: 52,
			height: 32,
			rx: 12
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			transform: "translate(-108,0)",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Spin, {
				kind: "rotate",
				values: head,
				dur,
				reduced,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						className: "hair",
						cx: -4,
						cy: -6,
						rx: 24,
						ry: 20
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						className: "skin",
						r: 20
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						className: "hair",
						cx: -2,
						cy: -12,
						rx: 20,
						ry: 11
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						className: "eye",
						cx: 10,
						cy: 0,
						r: 2.1
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			transform: "translate(-46,14)",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spin, {
				kind: "rotate",
				values: arm,
				dur,
				reduced,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					className: "skin",
					x: -6,
					y: 0,
					width: 12,
					height: 66,
					rx: 6
				})
			})
		})
	] });
}
function Quad({ move, phase, paused, label }) {
	const ref = (0, import_react.useRef)(null);
	useSvgPause(ref, paused);
	const reduced = useReducedMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		ref,
		viewBox: "0 0 360 420",
		className: "coach-svg",
		"data-phase": phase,
		role: "img",
		"aria-label": label,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			className: "ground",
			cx: 180,
			cy: 348,
			rx: 116,
			ry: 12
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			transform: "translate(196,246)",
			children: move === "child" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spin, {
				kind: "translate",
				values: "-8,30; -8,36; -8,30",
				dur: "3.2s",
				reduced,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "rotate(16)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuadBody, {
						head: "18; 22; 18",
						arm: "-84; -84; -84",
						thigh: "20; 20; 20",
						dur: "3.2s",
						reduced
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spin, {
				kind: "translate",
				values: "0,12; 0,-14; 0,12",
				dur: "2.6s",
				reduced,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spin, {
					kind: "rotate",
					values: "12; -12; 12",
					dur: "2.6s",
					reduced,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuadBody, {
						head: "-14; 18; -14",
						arm: "2; 2; 2",
						thigh: "0; 0; 0",
						dur: "2.6s",
						reduced
					})
				})
			})
		})]
	});
}
function CoachFigure({ move, layout, side, phase, paused, label }) {
	if (layout === "quad") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quad, {
		move,
		phase,
		paused,
		label
	}, move);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Human, {
		move,
		layout,
		side,
		phase,
		paused,
		label
	}, `${move}-${side ?? "na"}-${layout}`);
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
	(0, import_react.useEffect)(() => {
		const total = (steps[index]?.seconds ?? 0) * 1e3;
		leftRef.current = total;
		setLeftMs(total);
		indexRef.current = index;
		if (!prefsRef.current.muted) playVoice(clipsFor(routine.id, steps[index]?.move ?? step.move, steps[index]?.side, index, nonce, prefsRef.current.voice));
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
		playVoice(clipsFor(routine.id, step.move, step.side, index, nonce, prefs.voice).filter((clip) => !clip.src.includes("/intro-")));
	}
	const doneSeconds = steps.slice(0, index).reduce((sum, item) => sum + item.seconds, 0);
	const into = step.seconds - leftMs / 1e3;
	const progress = Math.min(100, (doneSeconds + into) / routineSeconds(routine) * 100);
	const display = Math.max(0, Math.ceil(leftMs / 1e3));
	const side = sideLabel(step.side);
	const urgent = display <= 3 && display > 0 && running;
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
				className: "relative mx-4 mt-3 h-64 overflow-hidden rounded-card bg-stage",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoachFigure, {
						move: step.move,
						layout: move.layout,
						side: step.side,
						phase,
						paused: !running,
						label: move.name
					}),
					side ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute left-4 top-4 text-sm font-medium text-red",
						children: side
					}) : null,
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
function clipsFor(routineId, move, side, index, nonce, voice) {
	const base = `/voice/${voice}`;
	const clips = [];
	if (index === 0 && nonce === 0) {
		const id = `intro-${routineId}`;
		clips.push({
			src: `${base}/${id}.mp3`,
			text: voiceLines[id] ?? ""
		});
	}
	if (side) {
		const id = side === "left" ? "side-left" : "side-right";
		clips.push({
			src: `${base}/${id}.mp3`,
			text: voiceLines[id] ?? ""
		});
	}
	clips.push({
		src: `${base}/${move}.mp3`,
		text: voiceLines[move] ?? ""
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
