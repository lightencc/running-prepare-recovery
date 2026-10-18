//#region node_modules/.nitro/vite/services/ssr/assets/muscles-aV4ljYv5.js
var MUSCLE_NAMES = {
	quads: "股四头肌",
	hamstrings: "腘绳肌",
	glutes: "臀肌",
	hipFlexors: "髋屈肌",
	adductors: "大腿内收肌",
	abductors: "髋外展肌",
	calves: "小腿后侧",
	tibialis: "胫骨前肌",
	abs: "腹直肌",
	obliques: "腹斜肌",
	lowerBack: "下背部",
	upperBack: "上背部",
	chest: "胸肌",
	shoulders: "三角肌"
};
var MOVE_MUSCLES = {
	jog: {
		primary: ["quads", "calves"],
		secondary: [
			"glutes",
			"hamstrings",
			"hipFlexors"
		]
	},
	walk: {
		primary: ["calves", "glutes"],
		secondary: ["quads", "hamstrings"]
	},
	stride: {
		primary: [
			"quads",
			"hamstrings",
			"glutes"
		],
		secondary: ["calves", "hipFlexors"]
	},
	"high-knees": {
		primary: ["hipFlexors", "quads"],
		secondary: ["calves", "abs"]
	},
	"butt-kicks": {
		primary: ["hamstrings"],
		secondary: ["quads", "calves"]
	},
	"a-skip": {
		primary: ["hipFlexors", "calves"],
		secondary: ["tibialis", "abs"]
	},
	ankle: {
		primary: ["calves", "tibialis"],
		secondary: []
	},
	"arm-circles": {
		primary: ["shoulders"],
		secondary: ["chest", "upperBack"]
	},
	"hip-circles": {
		primary: ["glutes", "hipFlexors"],
		secondary: [
			"adductors",
			"abductors",
			"lowerBack"
		]
	},
	"torso-twist": {
		primary: ["obliques"],
		secondary: ["lowerBack", "abs"]
	},
	"leg-swing": {
		primary: ["hamstrings", "hipFlexors"],
		secondary: ["glutes"]
	},
	"leg-swing-side": {
		primary: ["adductors", "abductors"],
		secondary: ["glutes@other"]
	},
	lunge: {
		primary: ["quads", "glutes"],
		secondary: [
			"hamstrings",
			"hipFlexors",
			"calves"
		]
	},
	"side-lunge": {
		primary: ["adductors@other", "quads"],
		secondary: ["glutes"]
	},
	"knee-hug": {
		primary: ["glutes"],
		secondary: ["hamstrings", "calves@other"]
	},
	worlds: {
		primary: ["hipFlexors@other", "upperBack"],
		secondary: [
			"hamstrings",
			"adductors",
			"chest"
		]
	},
	"calf-raise": {
		primary: ["calves"],
		secondary: ["tibialis"]
	},
	calf: {
		primary: ["calves"],
		secondary: ["hamstrings"]
	},
	quad: {
		primary: ["quads"],
		secondary: ["hipFlexors"]
	},
	hamstring: {
		primary: ["hamstrings"],
		secondary: ["calves", "lowerBack"]
	},
	"hip-flexor": {
		primary: ["hipFlexors"],
		secondary: ["quads", "abs"]
	},
	figure4: {
		primary: ["glutes"],
		secondary: ["abductors", "lowerBack"]
	},
	chest: {
		primary: ["chest", "shoulders"],
		secondary: ["upperBack"]
	},
	breathe: {
		primary: ["abs"],
		secondary: ["chest"]
	},
	child: {
		primary: ["lowerBack", "upperBack"],
		secondary: ["glutes", "shoulders"]
	},
	"cat-cow": {
		primary: ["lowerBack", "upperBack"],
		secondary: ["abs"]
	},
	twist: {
		primary: ["obliques", "lowerBack"],
		secondary: ["glutes", "chest"]
	},
	bridge: {
		primary: ["glutes"],
		secondary: ["hamstrings", "lowerBack"]
	},
	"ankle-pump": {
		primary: ["calves", "tibialis"],
		secondary: []
	}
};
function parseMuscle(ref) {
	const [id, side] = ref.split("@");
	return {
		id,
		side: side ?? "work"
	};
}
/** Unique muscle ids for the legend, primary first. */
function legendFor(move) {
	const { primary, secondary } = MOVE_MUSCLES[move];
	const p = [...new Set(primary.map((ref) => parseMuscle(ref).id))];
	return {
		primary: p,
		secondary: [...new Set(secondary.map((ref) => parseMuscle(ref).id))].filter((id) => !p.includes(id))
	};
}
//#endregion
export { parseMuscle as i, MUSCLE_NAMES as n, legendFor as r, MOVE_MUSCLES as t };
