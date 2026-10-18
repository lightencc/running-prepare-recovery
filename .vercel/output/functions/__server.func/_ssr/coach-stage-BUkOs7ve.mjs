import { i as __toESM } from "../_runtime.mjs";
import { i as parseMuscle, t as MOVE_MUSCLES } from "./muscles-aV4ljYv5.mjs";
import { a as Canvas, i as OrbitControls, l as require_jsx_runtime, n as ContactShadows, o as useFrame, r as Environment, s as useThree, t as Lightformer, u as require_react } from "../_libs/@react-three/drei+[...].mjs";
import { D as MeshPhysicalMaterial, O as MeshStandardMaterial, U as Skeleton, W as SkinnedMesh, X as Vector3, c as BufferGeometry, d as Color, g as Float32BufferAttribute, k as Object3D, l as CanvasTexture, o as Bone, q as Uint16BufferAttribute, s as Box3, v as Group, z as RepeatWrapping } from "../_libs/monogrid__gainmap-js+three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coach-stage-BUkOs7ve.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var JOINT_KEYS = [
	"rootPitch",
	"rootRoll",
	"rootYaw",
	"lean",
	"chestLean",
	"side",
	"twist",
	"pelvisTwist",
	"headNod",
	"headTurn",
	"hipL",
	"hipR",
	"hipAbdL",
	"hipAbdR",
	"hipRotL",
	"hipRotR",
	"kneeL",
	"kneeR",
	"ankleL",
	"ankleR",
	"ankleRollL",
	"ankleRollR",
	"shL",
	"shR",
	"shAbdL",
	"shAbdR",
	"shRotL",
	"shRotR",
	"elbowL",
	"elbowR",
	"wristL",
	"wristR",
	"wristDevL",
	"wristDevR",
	"lift",
	"breath"
];
var REST = Object.fromEntries(JOINT_KEYS.map((key) => [key, 0]));
function pose(part) {
	return {
		...REST,
		...part
	};
}
/** Joint limits the reach solver must respect. */
var LIMITS = {
	kneeL: [0, 165],
	kneeR: [0, 165],
	elbowL: [0, 160],
	elbowR: [0, 160]
};
var SIDED_POINTS = [
	"heel",
	"ball",
	"toe",
	"ankleTop",
	"kneeFront",
	"kneeTop",
	"shin",
	"hand",
	"elbowTip",
	"hipSide",
	"ankleOut"
];
var CENTER_POINTS = [
	"headTop",
	"headBack",
	"forehead",
	"butt",
	"chestBack",
	"bellyFront",
	"chestFront"
];
/** Points that can touch the floor. */
var GROUND_POINTS = [
	...[
		"heel",
		"ball",
		"toe",
		"ankleTop",
		"kneeFront",
		"shin",
		"hand",
		"elbowTip"
	].flatMap((name) => [`${name}L`, `${name}R`]),
	"headTop",
	"headBack",
	"forehead",
	"butt",
	"chestBack"
];
function swapSide(name) {
	if (name.endsWith("L")) return name.slice(0, -1) + "R";
	if (name.endsWith("R")) return name.slice(0, -1) + "L";
	return name;
}
var NEGATE = /* @__PURE__ */ new Set([
	"rootRoll",
	"rootYaw",
	"side",
	"twist",
	"pelvisTwist",
	"headTurn"
]);
function mirrorPose(p) {
	const out = { ...REST };
	for (const key of JOINT_KEYS) out[swapSide(key)] = NEGATE.has(key) ? -p[key] : p[key];
	return out;
}
/** Moves are authored for the left side; this builds the right-side version. */
function mirrorAnim(anim) {
	return {
		...anim,
		pose: (t) => mirrorPose(anim.pose(t)),
		reach: anim.reach?.map((reach) => ({
			...reach,
			from: swapSide(reach.from),
			to: swapSide(reach.to),
			offset: reach.offset ? [
				-reach.offset[0],
				reach.offset[1],
				reach.offset[2]
			] : void 0,
			params: reach.params.map(swapSide)
		})),
		pin: anim.pin ? (t) => {
			const pin = anim.pin?.(t);
			if (!pin) return null;
			return {
				point: swapSide(pin.point),
				x: pin.x === void 0 ? void 0 : -pin.x,
				z: pin.z
			};
		} : void 0,
		view: anim.view ? {
			az: -anim.view.az,
			el: anim.view.el
		} : void 0
	};
}
/**
* Cyclic Catmull-Rom through keyframes: motion keeps its speed through each key instead of
* stopping on it. Repeat a key to make a hold.
*/
function blend(keys, t) {
	const n = keys.length;
	const u0 = (t % 1 + 1) % 1;
	let i = 0;
	while (i < n - 1 && keys[i + 1][0] <= u0) i++;
	const t0 = keys[i][0];
	const t1 = i + 1 < n ? keys[i + 1][0] : 1 + keys[0][0];
	const u = u0 < t0 ? (u0 + 1 - t0) / (t1 - t0) : (u0 - t0) / (t1 - t0);
	const a = keys[(i - 1 + n) % n][1];
	const b = keys[i][1];
	const c = keys[(i + 1) % n][1];
	const d = keys[(i + 2) % n][1];
	const out = { ...REST };
	for (const key of JOINT_KEYS) {
		const p0 = a[key] ?? 0;
		const p1 = b[key] ?? 0;
		const p2 = c[key] ?? 0;
		const p3 = d[key] ?? 0;
		out[key] = .5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u * u + (-p0 + 3 * p1 - 3 * p2 + p3) * u * u * u);
	}
	return out;
}
/** Smooth 0→1→0 bump over the loop, peaking at `at`. */
function bump(t, at = .5, width = .5) {
	let d = Math.abs(((t - at) % 1 + 1.5) % 1 - .5);
	d = Math.min(1, d / width);
	return .5 + .5 * Math.cos(Math.PI * d);
}
/** Hold-shaped curve: ease up, hold, ease down. `rise` is the share of the loop spent moving each way. */
function hold(t, rise = .25) {
	const u = (t % 1 + 1) % 1;
	if (u < rise) return .5 - .5 * Math.cos(Math.PI * u / rise);
	if (u > 1 - rise) return .5 - .5 * Math.cos(Math.PI * (1 - u) / rise);
	return 1;
}
var wave = (t, phase = 0) => Math.sin(2 * Math.PI * (t + phase));
var pos = (x) => Math.max(0, x);
var D = Math.PI / 180;
var ALL_POINTS = [...SIDED_POINTS.flatMap((name) => [`${name}L`, `${name}R`]), ...CENTER_POINTS];
function rigReady(rig) {
	return Boolean(rig.joints.root && rig.joints.ankleR && rig.points.headTop && rig.points.handR);
}
function applyPose(rig, p) {
	const j = rig.joints;
	j.root.rotation.set(p.rootPitch * D, p.rootYaw * D, p.rootRoll * D, "YXZ");
	j.pelvis.rotation.set(0, p.pelvisTwist * D, 0);
	j.spine.rotation.set(p.lean * .55 * D, (p.twist * .4 - p.pelvisTwist) * D, -p.side * .5 * D);
	j.chest.rotation.set((p.lean * .45 + p.chestLean) * D, p.twist * .6 * D, -p.side * .5 * D);
	j.neck.rotation.set((p.headNod - p.lean * .6 - p.chestLean * .5) * D, (p.headTurn - p.twist * .4) * D, 0);
	for (const s of ["L", "R"]) {
		const sg = s === "L" ? 1 : -1;
		j[`hip${s}`].rotation.set(-p[`hip${s}`] * D, p[`hipRot${s}`] * sg * D, p[`hipAbd${s}`] * sg * D, "XZY");
		j[`knee${s}`].rotation.set(p[`knee${s}`] * D, 0, 0);
		j[`ankle${s}`].rotation.set(p[`ankle${s}`] * D, 0, p[`ankleRoll${s}`] * sg * D, "XZY");
		j[`shoulder${s}`].rotation.set(-p[`sh${s}`] * D, -p[`shRot${s}`] * sg * D, (p[`shAbd${s}`] + 6) * sg * D, "XZY");
		j[`elbow${s}`].rotation.set(-p[`elbow${s}`] * D, 0, 0);
		j[`wrist${s}`].rotation.set(-p[`wristDev${s}`] * D, 0, -p[`wrist${s}`] * sg * D, "ZXY");
	}
	if (rig.ribs) {
		const b = p.breath;
		rig.ribs.scale.set(1 + .025 * b, 1 + .01 * b, 1 + .07 * b);
	}
}
var a = new Vector3();
var b = new Vector3();
function at$1(rig, name, out) {
	const obj = rig.points[name];
	if (!obj) return out.set(0, 0, 0);
	return out.setFromMatrixPosition(obj.matrixWorld);
}
function refresh(rig, p) {
	applyPose(rig, p);
	rig.joints.root?.updateMatrixWorld(true);
}
function clamp(key, value) {
	const lim = LIMITS[key];
	return lim ? Math.min(lim[1], Math.max(lim[0], value)) : value;
}
/**
* Hands, feet and knees that must touch something (a shin, the wall, the floor) are found by a
* small search: nudge each listed joint angle up or down and keep the change when the point gets
* closer to its target. `memo` carries the answer to the next frame so each frame only refines.
*/
function solve(rig, anim, t, p, memo) {
	const reaches = anim.reach;
	if (!reaches?.length) return p;
	const free = { ...p };
	const params = [...new Set(reaches.flatMap((reach) => reach.params))];
	const warm = params.every((key) => memo.has(key));
	for (const key of params) if (memo.has(key)) p[key] = memo.get(key);
	const error = () => {
		refresh(rig, p);
		let sum = 0;
		for (const reach of reaches) {
			at$1(rig, reach.from, a);
			at$1(rig, reach.to, b);
			const off = reach.offset;
			if (off) b.set(b.x + off[0], b.y + off[1], b.z + off[2]);
			const k = reach.importance ?? 1;
			if (reach.axes === "y") sum += k * (a.y - b.y) ** 2;
			else sum += k * a.distanceToSquared(b);
		}
		return sum;
	};
	let best = error();
	const search = (steps, passes) => {
		for (const step of steps) for (let pass = 0; pass < passes; pass++) for (const key of params) for (const dir of [1, -1]) {
			const old = p[key];
			const next = clamp(key, old + step * dir);
			if (next === old) continue;
			p[key] = next;
			const e = error();
			if (e < best) best = e;
			else p[key] = old;
		}
	};
	if (warm) search([
		4,
		2,
		1,
		.5
	], 1);
	if (!warm || best > 1e-4) search([
		12,
		6,
		3,
		1.5,
		.75,
		.3
	], 3);
	for (const key of params) memo.set(key, p[key]);
	for (const reach of reaches) {
		if (!reach.weight) continue;
		const w = reach.weight(t);
		for (const key of reach.params) p[key] = free[key] + (p[key] - free[key]) * w;
	}
	return p;
}
/** Stand the posed figure on the floor and keep a planted foot where it was. */
function place(rig, anim, t, p) {
	const root = rig.joints.root;
	if (!root) return;
	root.position.set(0, 1, 0);
	refresh(rig, p);
	let min = Infinity;
	for (const name of GROUND_POINTS) min = Math.min(min, at$1(rig, name, a).y);
	root.position.y += -min + p.lift + .004;
	const pin = anim.pin?.(t);
	if (pin) {
		root.updateMatrixWorld(true);
		at$1(rig, pin.point, a);
		if (pin.x !== void 0) root.position.x += pin.x - a.x;
		if (pin.z !== void 0) root.position.z += pin.z - a.z;
	}
	root.updateMatrixWorld(true);
}
function frame(rig, anim, t, memo, override) {
	const p = anim.pose(t);
	if (override) for (const [key, value] of Object.entries(override)) p[key] += value ?? 0;
	solve(rig, anim, t, p, memo);
	place(rig, anim, t, p);
	return p;
}
/** Space the whole move sweeps through, sampled over one loop. */
function measure(rig, anim, memo) {
	const box = new Box3();
	for (let i = 0; i < 12; i++) {
		frame(rig, anim, i / 12, memo);
		for (const name of ALL_POINTS) box.expandByPoint(at$1(rig, name, a));
	}
	box.min.y = Math.min(box.min.y, 0);
	return box;
}
var up = new Vector3(0, 1, 0);
/** Camera position that fits `box` from the given angle, with some room around it. */
function fit(box, view, fov, aspect) {
	const center = box.getCenter(new Vector3());
	const dir = new Vector3(Math.sin(view.az * D) * Math.cos(view.el * D), Math.sin(view.el * D), Math.cos(view.az * D) * Math.cos(view.el * D));
	const forward = dir.clone().negate();
	const right = forward.clone().cross(up).normalize();
	const upv = right.clone().cross(forward).normalize();
	let mx = 0;
	let my = 0;
	let mz = 0;
	const corner = new Vector3();
	for (let i = 0; i < 8; i++) {
		corner.set(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z);
		corner.sub(center);
		mx = Math.max(mx, Math.abs(corner.dot(right)));
		my = Math.max(my, Math.abs(corner.dot(upv)));
		mz = Math.max(mz, corner.dot(dir));
	}
	const tan = Math.tan(fov * D / 2);
	const dist = Math.max((my + .12) / tan, (mx + .12) / (tan * aspect)) + mz;
	return {
		target: center,
		position: center.clone().addScaledVector(dir, dist)
	};
}
var handsOnHips = [
	{
		from: "handL",
		to: "hipSideL",
		params: [
			"shL",
			"shAbdL",
			"shRotL",
			"elbowL"
		]
	},
	{
		from: "handR",
		to: "hipSideR",
		params: [
			"shR",
			"shAbdR",
			"shRotR",
			"elbowR"
		]
	},
	{
		from: "elbowTipL",
		to: "hipSideL",
		offset: [
			.15,
			.17,
			-.1
		],
		params: [
			"shL",
			"shAbdL",
			"shRotL",
			"elbowL"
		],
		importance: .25
	},
	{
		from: "elbowTipR",
		to: "hipSideR",
		offset: [
			-.15,
			.17,
			-.1
		],
		params: [
			"shR",
			"shAbdR",
			"shRotR",
			"elbowR"
		],
		importance: .25
	}
];
var hipArms = {
	shL: -18,
	shR: -18,
	shAbdL: 40,
	shAbdR: 40,
	shRotL: 70,
	shRotR: 70,
	elbowL: 100,
	elbowR: 100,
	wristL: -12,
	wristR: -12,
	wristDevL: 18,
	wristDevR: 18
};
var RUN_LEG = [
	[0, {
		hipL: 6,
		kneeL: 22,
		ankleL: 2
	}],
	[.2, {
		hipL: -12,
		kneeL: 28,
		ankleL: 22
	}],
	[.42, {
		hipL: 4,
		kneeL: 92,
		ankleL: 18
	}],
	[.7, {
		hipL: 40,
		kneeL: 78,
		ankleL: -6
	}],
	[.88, {
		hipL: 24,
		kneeL: 34,
		ankleL: -4
	}]
];
var WALK_LEG = [
	[0, {
		hipL: 20,
		kneeL: 4,
		ankleL: -4
	}],
	[.15, {
		hipL: 12,
		kneeL: 14,
		ankleL: 6
	}],
	[.4, {
		hipL: -12,
		kneeL: 6,
		ankleL: 0
	}],
	[.56, {
		hipL: -16,
		kneeL: 32,
		ankleL: 22
	}],
	[.76, {
		hipL: 14,
		kneeL: 58,
		ankleL: 0
	}],
	[.9, {
		hipL: 26,
		kneeL: 18,
		ankleL: -8
	}]
];
function legs(keys, t, hipScale = 1, kneeScale = 1) {
	const l = blend(keys, t);
	const r = blend(keys, t + .5);
	return {
		hipL: l.hipL * hipScale,
		kneeL: l.kneeL * kneeScale,
		ankleL: l.ankleL,
		hipR: r.hipL * hipScale,
		kneeR: r.kneeL * kneeScale,
		ankleR: r.ankleL
	};
}
function runner(t, opts) {
	const swing = wave(t, -.08);
	return pose({
		...legs(RUN_LEG, t, opts.hip, opts.knee),
		shL: -swing * opts.arm + 4,
		shR: swing * opts.arm + 4,
		elbowL: 88 + swing * 8,
		elbowR: 88 - swing * 8,
		shAbdL: 4,
		shAbdR: 4,
		lean: opts.lean,
		twist: swing * opts.twist,
		headNod: 4,
		lift: opts.lift * pos(Math.sin(2 * Math.PI * (2 * t - .12)))
	});
}
/** Mirror a key's left/right channels (used for alternating moves inside one loop). */
function flip(part) {
	const out = {};
	for (const [key, value] of Object.entries(part)) {
		const k = key.endsWith("L") ? key.slice(0, -1) + "R" : key.endsWith("R") ? key.slice(0, -1) + "L" : key;
		out[k] = value;
	}
	return out;
}
var LUNGE_KEYS = (() => {
	const stand = {
		kneeL: 3,
		kneeR: 3,
		shL: 4,
		shR: 4,
		elbowL: 14,
		elbowR: 14,
		shAbdL: 3,
		shAbdR: 3
	};
	const step = {
		hipR: 52,
		kneeR: 58,
		ankleR: -8,
		hipL: -6,
		kneeL: 30,
		ankleL: 4,
		shL: 16,
		shR: -8,
		elbowL: 24,
		elbowR: 16,
		shAbdL: 4,
		shAbdR: 4,
		lean: 2
	};
	const down = {
		hipR: 84,
		kneeR: 90,
		ankleR: 2,
		hipL: -12,
		kneeL: 100,
		ankleL: -38,
		shL: 20,
		shR: -14,
		elbowL: 32,
		elbowR: 20,
		shAbdL: 5,
		shAbdR: 5,
		lean: 2,
		headNod: 2
	};
	return [
		[0, stand],
		[.1, step],
		[.2, down],
		[.3, down],
		[.4, step],
		[.5, stand],
		[.6, flip(step)],
		[.7, flip(down)],
		[.8, flip(down)],
		[.9, flip(step)]
	];
})();
/** 0 before `a`, 1 after `b`, smooth in between (within one loop). */
function ease(t, a, b) {
	const u = Math.min(1, Math.max(0, ((t % 1 + 1) % 1 - a) / (b - a)));
	return u * u * (3 - 2 * u);
}
var MOVE_ANIMS = {
	jog: {
		dur: .72,
		pose: (t) => runner(t, {
			hip: .85,
			knee: 1,
			arm: 32,
			lean: 7,
			lift: .035,
			twist: 7
		})
	},
	walk: {
		dur: 1.15,
		pose: (t) => {
			const swing = wave(t, -.05);
			return pose({
				...legs(WALK_LEG, t),
				shL: -swing * 18 + 2,
				shR: swing * 18 + 2,
				elbowL: 18,
				elbowR: 18,
				shAbdL: 3,
				shAbdR: 3,
				lean: 2,
				twist: swing * 4
			});
		}
	},
	stride: {
		dur: .5,
		pose: (t) => runner(t, {
			hip: 1.25,
			knee: 1.05,
			arm: 42,
			lean: 9,
			lift: .06,
			twist: 9
		})
	},
	"high-knees": {
		dur: .633,
		still: 0,
		pose: (t) => {
			const raise = (u) => pos(Math.cos(2 * Math.PI * u)) ** .55;
			const land = (u) => bump(u, .32, .1);
			const l = raise(t);
			const r = raise(t + .5);
			const s = Math.cos(2 * Math.PI * t);
			return pose({
				hipL: 6 + 82 * l,
				kneeL: 12 + 84 * l + 14 * land(t),
				ankleL: 22 - 30 * l,
				hipR: 6 + 82 * r,
				kneeR: 12 + 84 * r + 14 * land(t + .5),
				ankleR: 22 - 30 * r,
				shR: 12 + 43 * s,
				shL: 12 - 43 * s,
				elbowR: 82 + 18 * s,
				elbowL: 82 - 18 * s,
				shAbdR: 6 - 8 * pos(s),
				shAbdL: 6 - 8 * pos(-s),
				wristL: -10,
				wristR: -10,
				lean: 1,
				twist: -5 * s,
				lift: .045 * pos(-Math.cos(4 * Math.PI * t)) ** 1.5
			});
		}
	},
	"butt-kicks": {
		dur: .5,
		pose: (t) => {
			const l = pos(wave(t)) ** .8;
			const r = pos(wave(t, .5)) ** .8;
			return pose({
				hipL: 4 + 6 * l,
				kneeL: 18 + 112 * l,
				ankleL: 14 + 30 * l,
				hipR: 4 + 6 * r,
				kneeR: 18 + 112 * r,
				ankleR: 14 + 30 * r,
				shL: 6 + 30 * r - 24 * l,
				shR: 6 + 30 * l - 24 * r,
				elbowL: 90,
				elbowR: 90,
				shAbdL: 4,
				shAbdR: 4,
				lean: 5,
				headNod: 3,
				lift: .025 * Math.abs(wave(2 * t, .25))
			});
		}
	},
	"a-skip": {
		dur: .9,
		pose: (t) => {
			const l = pos(wave(t)) ** .7;
			const r = pos(wave(t, .5)) ** .7;
			return pose({
				hipL: 8 + 70 * l,
				kneeL: 14 + 74 * l,
				ankleL: 16 - 34 * l,
				hipR: 8 + 70 * r,
				kneeR: 14 + 74 * r,
				ankleR: 16 - 34 * r,
				shL: 8 + 46 * r - 26 * l,
				shR: 8 + 46 * l - 26 * r,
				elbowL: 90,
				elbowR: 90,
				shAbdL: 4,
				shAbdR: 4,
				lean: 1,
				headNod: 2,
				lift: .06 * pos(wave(2 * t, -.1))
			});
		}
	},
	ankle: {
		dur: 2.2,
		still: .2,
		view: {
			az: 64,
			el: 10
		},
		reach: handsOnHips,
		pin: () => ({
			point: "ballR",
			z: .05
		}),
		pose: (t) => {
			const a = 2 * Math.PI * t;
			return pose({
				...hipArms,
				hipL: 60,
				kneeL: 76,
				hipAbdL: 10,
				ankleL: 18 + 24 * Math.sin(a),
				ankleRollL: 24 * Math.cos(a),
				kneeR: 4,
				lean: 2
			});
		}
	},
	"arm-circles": {
		dur: 2.6,
		still: .3,
		view: {
			az: 24,
			el: 8
		},
		pose: (t) => pose({
			shL: 360 * t,
			shR: 360 * t,
			shAbdL: 14,
			shAbdR: 14,
			elbowL: 4,
			elbowR: 4,
			kneeL: 4,
			kneeR: 4
		})
	},
	"hip-circles": {
		dur: 2.8,
		view: {
			az: 28,
			el: 10
		},
		reach: handsOnHips,
		pin: () => ({
			point: "ballL",
			x: .088,
			z: .12
		}),
		pose: (t) => {
			const a = 2 * Math.PI * t;
			return pose({
				...hipArms,
				hipAbdL: 7 * Math.sin(a),
				hipAbdR: -7 * Math.sin(a),
				hipL: 7 * Math.cos(a),
				hipR: 7 * Math.cos(a),
				kneeL: 10,
				kneeR: 10,
				ankleL: -7 * Math.cos(a) - 10,
				ankleR: -7 * Math.cos(a) - 10,
				side: 4 * Math.sin(a),
				lean: -4 * Math.cos(a)
			});
		}
	},
	"torso-twist": {
		dur: 1.9,
		view: {
			az: 16,
			el: 16
		},
		reach: [{
			from: "handL",
			to: "chestFront",
			offset: [
				-.1,
				.05,
				.05
			],
			params: [
				"shL",
				"shAbdL",
				"elbowL"
			]
		}, {
			from: "handR",
			to: "chestFront",
			offset: [
				.1,
				0,
				.09
			],
			params: [
				"shR",
				"shAbdR",
				"elbowR"
			]
		}],
		pose: (t) => {
			const s = wave(t);
			return pose({
				twist: 42 * s,
				headTurn: 18 * s,
				shL: 60,
				shR: 70,
				shAbdL: -10,
				shAbdR: -10,
				elbowL: 120,
				elbowR: 110,
				kneeL: 8,
				kneeR: 8,
				ankleL: -8,
				ankleR: -8
			});
		}
	},
	"leg-swing": {
		dur: 1.6,
		view: {
			az: 78,
			el: 6
		},
		pin: () => ({
			point: "ballR",
			z: 0
		}),
		pose: (t) => {
			const s = wave(t);
			return pose({
				hipL: 16 + 46 * s,
				kneeL: 12 - 6 * s,
				ankleL: 14 - 18 * s,
				kneeR: 3,
				lean: -5 * s,
				shAbdL: 26,
				shAbdR: 40,
				elbowL: 15,
				elbowR: 15,
				shL: -15 * s,
				shR: 15 * s
			});
		}
	},
	"leg-swing-side": {
		dur: 1.6,
		view: {
			az: 8,
			el: 6
		},
		pin: () => ({
			point: "ballR",
			x: -.088,
			z: 0
		}),
		pose: (t) => {
			const s = wave(t);
			return pose({
				hipAbdL: 12 + 30 * s,
				hipL: 12 + 10 * pos(-s),
				kneeL: 10,
				ankleL: 10,
				kneeR: 4,
				side: -6 * s,
				shAbdL: 55,
				shAbdR: 55,
				elbowL: 12,
				elbowR: 12
			});
		}
	},
	lunge: {
		dur: 4.4,
		still: .25,
		view: {
			az: 62,
			el: 8
		},
		pose: (t) => blend(LUNGE_KEYS, t),
		pin: (t) => ({
			point: (t % 1 + 1) % 1 < .5 ? "ballL" : "ballR",
			z: -.22
		})
	},
	"side-lunge": {
		dur: 3.2,
		still: .5,
		view: {
			az: 6,
			el: 8
		},
		pin: () => ({
			point: "ballR",
			x: -.48,
			z: 0
		}),
		reach: [{
			from: "ballL",
			to: "ballR",
			offset: [
				1,
				0,
				0
			],
			params: [
				"hipL",
				"hipAbdL",
				"kneeL"
			]
		}, {
			from: "heelL",
			to: "heelR",
			axes: "y",
			params: ["ankleL"]
		}],
		pose: (t) => {
			const u = hold(t, .3);
			return pose({
				hipAbdR: 20 + 32 * u,
				hipR: 6,
				kneeR: 2,
				ankleR: -6,
				ankleRollR: -(20 + 32 * u),
				hipAbdL: 22,
				hipL: 10 + 50 * u,
				kneeL: 4 + 80 * u,
				ankleRollL: -16,
				lean: 10 + 25 * u,
				headNod: 4,
				shL: 50 + 20 * u,
				shR: 50 + 20 * u,
				shAbdL: -14,
				shAbdR: -14,
				elbowL: 70,
				elbowR: 70
			});
		}
	},
	"knee-hug": {
		dur: 3,
		still: .5,
		view: {
			az: 66,
			el: 8
		},
		pin: () => ({
			point: "ballR",
			z: 0
		}),
		reach: [{
			from: "handL",
			to: "shinL",
			offset: [
				.065,
				0,
				.01
			],
			params: [
				"shL",
				"shAbdL",
				"elbowL"
			],
			weight: (t) => hold(t, .28)
		}, {
			from: "handR",
			to: "shinL",
			offset: [
				-.065,
				0,
				.01
			],
			params: [
				"shR",
				"shAbdR",
				"elbowR"
			],
			weight: (t) => hold(t, .28)
		}],
		pose: (t) => {
			const u = hold(t, .28);
			return pose({
				hipL: 122 * u,
				kneeL: 5 + 125 * u,
				ankleL: 22 * u,
				kneeR: 4,
				ankleR: 14 * u,
				lean: -2 + 4 * u,
				headNod: 3,
				shL: 8 + 50 * u,
				shR: 8 + 50 * u,
				shAbdL: 6,
				shAbdR: 6,
				elbowL: 15 + 70 * u,
				elbowR: 15 + 70 * u
			});
		}
	},
	worlds: {
		dur: 4.4,
		still: .5,
		view: {
			az: 34,
			el: 14
		},
		pin: () => ({
			point: "ballL",
			z: .42
		}),
		reach: [{
			from: "ballR",
			to: "ballL",
			axes: "y",
			params: ["kneeR"]
		}, {
			from: "handR",
			to: "ballL",
			offset: [
				-.2,
				.03,
				.02
			],
			params: [
				"shR",
				"shAbdR",
				"elbowR"
			]
		}],
		pose: (t) => {
			const u = hold(t, .3);
			return pose({
				hipL: 88,
				kneeL: 92,
				ankleL: -4,
				hipR: -22,
				kneeR: 40,
				ankleR: -32,
				lean: 50,
				twist: 10 + 50 * u,
				headTurn: 25 * u,
				headNod: -10 * u,
				shR: 80,
				shAbdR: -10,
				elbowR: 10,
				shL: 70 * (1 - u),
				shAbdL: 95 * u,
				elbowL: 60 * (1 - u) + 5 * u
			});
		}
	},
	"calf-raise": {
		dur: 1.93,
		still: .48,
		view: {
			az: 32,
			el: 6
		},
		reach: handsOnHips,
		pose: (t) => {
			const u = ease(t, .14, .42) * (1 - ease(t, .56, .82));
			return pose({
				...hipArms,
				ankleL: 30 * u,
				ankleR: 30 * u,
				rootPitch: 3 * u,
				kneeL: 3,
				kneeR: 3,
				hipRotL: 7,
				hipRotR: 7,
				hipAbdL: 2,
				hipAbdR: 2,
				lean: 2,
				chestLean: 5,
				headNod: 24
			});
		}
	},
	calf: {
		dur: 3.6,
		view: {
			az: 72,
			el: 8
		},
		wall: .66,
		pin: () => ({
			point: "ballR",
			z: .15
		}),
		reach: [{
			from: "handL",
			to: "ballR",
			offset: [
				.29,
				1.26,
				.48
			],
			params: [
				"shL",
				"shAbdL",
				"elbowL"
			]
		}, {
			from: "handR",
			to: "ballR",
			offset: [
				-.11,
				1.26,
				.48
			],
			params: [
				"shR",
				"shAbdR",
				"elbowR"
			]
		}],
		pose: (t) => {
			const b = bump(t);
			return pose({
				hipR: 30,
				kneeR: 38,
				ankleR: -8,
				hipL: -22 - 2 * b,
				kneeL: 0,
				ankleL: -22 - 2 * b,
				lean: 22 + 2 * b,
				headNod: 4,
				shL: 80,
				shR: 80,
				shAbdL: 10,
				shAbdR: 10,
				elbowL: 30,
				elbowR: 30
			});
		}
	},
	quad: {
		dur: 4.2,
		view: {
			az: 66,
			el: 6
		},
		pin: () => ({
			point: "ballR",
			z: 0
		}),
		reach: [{
			from: "handL",
			to: "ankleTopL",
			params: [
				"shL",
				"shAbdL",
				"elbowL"
			]
		}],
		pose: (t) => {
			const b = bump(t);
			return pose({
				hipR: 2,
				kneeR: 4,
				hipL: -8 - 3 * b,
				kneeL: 150 + 3 * b,
				ankleL: 40,
				shL: -30,
				elbowL: 10,
				shAbdL: -10,
				shR: 8,
				shAbdR: 30 + 3 * b,
				elbowR: 12,
				side: -2,
				headNod: 2 - 2 * b,
				chestLean: -2 * b
			});
		}
	},
	hamstring: {
		dur: 3.6,
		view: {
			az: 80,
			el: 8
		},
		pin: () => ({
			point: "ballR",
			z: -.15
		}),
		reach: [
			{
				from: "heelL",
				to: "heelR",
				axes: "y",
				params: ["hipL"]
			},
			{
				from: "handL",
				to: "kneeTopR",
				offset: [
					.07,
					.03,
					.02
				],
				params: [
					"shL",
					"shAbdL",
					"elbowL"
				]
			},
			{
				from: "handR",
				to: "kneeTopR",
				offset: [
					-.07,
					.03,
					.02
				],
				params: [
					"shR",
					"shAbdR",
					"elbowR"
				]
			}
		],
		pose: (t) => {
			return pose({
				hipR: 45,
				kneeR: 40,
				ankleR: 5,
				hipL: 32,
				kneeL: 2,
				ankleL: -25,
				lean: 40 + 6 * bump(t),
				headNod: 22,
				shL: 60,
				shR: 60,
				elbowL: 20,
				elbowR: 20
			});
		}
	},
	"hip-flexor": {
		dur: 3.4,
		view: {
			az: 82,
			el: 8
		},
		pin: () => ({
			point: "ballR",
			z: .35
		}),
		reach: [
			{
				from: "ballR",
				to: "kneeFrontL",
				axes: "y",
				params: ["kneeR"]
			},
			{
				from: "heelR",
				to: "kneeFrontL",
				axes: "y",
				params: ["ankleR"]
			},
			...handsOnHips
		],
		pose: (t) => {
			const u = bump(t);
			return pose({
				...hipArms,
				hipL: -12 - 14 * u,
				kneeL: 96,
				ankleL: 48,
				hipR: 84 - 10 * u,
				kneeR: 88,
				ankleR: -4,
				lean: -4 * u,
				headNod: 2
			});
		}
	},
	figure4: {
		dur: 3.4,
		still: .5,
		view: {
			az: 26,
			el: 10
		},
		pin: () => ({
			point: "ballR",
			z: 0
		}),
		reach: [{
			from: "ankleOutL",
			to: "kneeTopR",
			offset: [
				0,
				.07,
				0
			],
			params: [
				"hipL",
				"hipAbdL",
				"hipRotL"
			]
		}],
		pose: (t) => {
			const u = hold(t, .3);
			return pose({
				hipR: 20 + 40 * u,
				kneeR: 25 + 45 * u,
				ankleR: -5 - 5 * u,
				hipL: 70,
				hipAbdL: 20,
				hipRotL: 50,
				kneeL: 95,
				ankleL: -12,
				lean: 10 + 25 * u,
				headNod: 6,
				shL: 60,
				shR: 60,
				shAbdL: -12,
				shAbdR: -12,
				elbowL: 50,
				elbowR: 50
			});
		}
	},
	chest: {
		dur: 3.6,
		still: .5,
		view: {
			az: 22,
			el: 10
		},
		pose: (t) => {
			const u = hold(t, .3);
			return pose({
				shL: 4 - 29 * u,
				shR: 4 - 29 * u,
				shAbdL: 8 + 77 * u,
				shAbdR: 8 + 77 * u,
				elbowL: 12 + 13 * u,
				elbowR: 12 + 13 * u,
				chestLean: -10 * u,
				breath: u,
				kneeL: 3,
				kneeR: 3
			});
		}
	},
	breathe: {
		dur: 4.4,
		view: {
			az: 20,
			el: 6
		},
		reach: [{
			from: "handL",
			to: "bellyFront",
			offset: [
				.03,
				0,
				.035
			],
			params: [
				"shL",
				"shAbdL",
				"elbowL"
			]
		}, {
			from: "handR",
			to: "chestFront",
			offset: [
				-.03,
				0,
				.035
			],
			params: [
				"shR",
				"shAbdR",
				"elbowR"
			]
		}],
		pose: (t) => {
			const b = .5 - .5 * Math.cos(2 * Math.PI * t);
			return pose({
				breath: b,
				headNod: 4 - 2 * b,
				kneeL: 3,
				kneeR: 3,
				shL: 30,
				shR: 40,
				shAbdL: -10,
				shAbdR: -10,
				elbowL: 100,
				elbowR: 110
			});
		}
	},
	child: {
		dur: 3.6,
		view: {
			az: 78,
			el: 14
		},
		reach: [{
			from: "handL",
			to: "kneeFrontL",
			axes: "y",
			params: ["shL"]
		}, {
			from: "handR",
			to: "kneeFrontR",
			axes: "y",
			params: ["shR"]
		}],
		pose: (t) => {
			const b = bump(t);
			return pose({
				rootPitch: 96,
				hipL: 150,
				hipR: 150,
				kneeL: 158,
				kneeR: 158,
				ankleL: 45,
				ankleR: 45,
				hipAbdL: 6,
				hipAbdR: 6,
				shL: 168,
				shR: 168,
				shAbdL: 12,
				shAbdR: 12,
				elbowL: 6,
				elbowR: 6,
				lean: 6 + 4 * b,
				headNod: 10,
				breath: b
			});
		}
	},
	"cat-cow": {
		dur: 4,
		view: {
			az: 80,
			el: 10
		},
		reach: [{
			from: "handL",
			to: "kneeFrontL",
			offset: [
				.2,
				0,
				.6
			],
			params: [
				"rootPitch",
				"shL",
				"shAbdL"
			]
		}, {
			from: "handR",
			to: "kneeFrontR",
			offset: [
				-.2,
				0,
				.6
			],
			params: [
				"rootPitch",
				"shR",
				"shAbdR"
			]
		}],
		pose: (t) => {
			const c = wave(t);
			return pose({
				rootPitch: 90,
				hipL: 90,
				hipR: 90,
				kneeL: 90,
				kneeR: 90,
				ankleL: 45,
				ankleR: 45,
				shL: 90,
				shR: 90,
				shAbdL: 4,
				shAbdR: 4,
				lean: 16 * c,
				chestLean: 10 * c,
				headNod: 22 * c
			});
		}
	},
	twist: {
		dur: 4.2,
		still: .5,
		view: {
			az: 50,
			el: 34
		},
		pose: (t) => {
			const u = hold(t, .3);
			return pose({
				rootPitch: -90,
				hipL: 60,
				hipR: 60,
				kneeL: 100,
				kneeR: 100,
				ankleL: -40,
				ankleR: -40,
				shAbdL: 88,
				shAbdR: 88,
				elbowL: 6,
				elbowR: 6,
				pelvisTwist: 82 * u,
				headTurn: -35 * u
			});
		}
	},
	bridge: {
		dur: 3,
		still: .5,
		view: {
			az: 78,
			el: 14
		},
		reach: [
			{
				from: "heelL",
				to: "chestBack",
				axes: "y",
				params: ["rootPitch"]
			},
			{
				from: "headBack",
				to: "chestBack",
				axes: "y",
				params: ["headNod"]
			},
			{
				from: "ballL",
				to: "heelL",
				axes: "y",
				params: ["ankleL"]
			},
			{
				from: "ballR",
				to: "heelR",
				axes: "y",
				params: ["ankleR"]
			},
			{
				from: "handL",
				to: "chestBack",
				axes: "y",
				params: ["shL"]
			},
			{
				from: "handR",
				to: "chestBack",
				axes: "y",
				params: ["shR"]
			}
		],
		pose: (t) => {
			const u = hold(t, .3);
			return pose({
				rootPitch: -90,
				hipL: 60 - 62 * u,
				hipR: 60 - 62 * u,
				kneeL: 100 - 8 * u,
				kneeR: 100 - 8 * u,
				ankleL: -40,
				ankleR: -40,
				shAbdL: 12,
				shAbdR: 12
			});
		}
	},
	"ankle-pump": {
		dur: 2,
		view: {
			az: 72,
			el: 24
		},
		pose: (t) => {
			const s = wave(t);
			return pose({
				rootPitch: -90,
				kneeL: 2,
				kneeR: 2,
				ankleL: 5 + 30 * s,
				ankleR: 5 + 30 * s,
				shAbdL: 10,
				shAbdR: 10
			});
		}
	}
};
function animFor(move, side) {
	const anim = MOVE_ANIMS[move];
	return side === "right" ? mirrorAnim(anim) : anim;
}
function highlightsFor(move, side, focus) {
	const out = /* @__PURE__ */ new Map();
	const { primary, secondary } = MOVE_MUSCLES[move];
	const work = side === "right" ? "R" : "L";
	const other = side === "right" ? "L" : "R";
	const mark = (refs, level) => {
		for (const ref of refs) {
			const { id, side: which } = parseMuscle(ref);
			if (focus && id !== focus) continue;
			const sides = !side || which === "both" ? ["L", "R"] : which === "other" ? [other] : [work];
			for (const s of [...sides, "C"]) {
				const key = `${id}:${s}`;
				if (out.get(key) !== "primary") out.set(key, focus ? "primary" : level);
			}
		}
	};
	mark(primary, "primary");
	mark(secondary, "secondary");
	return out;
}
var MUSCLE_ORDER = [
	"quads",
	"hamstrings",
	"glutes",
	"hipFlexors",
	"adductors",
	"abductors",
	"calves",
	"tibialis",
	"abs",
	"obliques",
	"lowerBack",
	"upperBack",
	"chest",
	"shoulders"
];
var MUSCLE_SLOTS = MUSCLE_ORDER.length * 2;
/** Uniform slot for a muscle on one side; centre-line muscles use the left slot. */
function muscleSlot(id, side) {
	return MUSCLE_ORDER.indexOf(id) * 2 + (side === "R" ? 1 : 0);
}
var BONES = [
	[
		"root",
		null,
		[
			0,
			0,
			0
		]
	],
	[
		"pelvis",
		"root",
		[
			0,
			0,
			0
		]
	],
	[
		"spine",
		"pelvis",
		[
			0,
			.02,
			0
		]
	],
	[
		"chest",
		"spine",
		[
			0,
			.2,
			0
		]
	],
	[
		"ribs",
		"chest",
		[
			0,
			0,
			0
		]
	],
	[
		"neck",
		"chest",
		[
			0,
			.31,
			0
		]
	],
	[
		"head",
		"neck",
		[
			0,
			.175,
			.014
		]
	],
	[
		"shoulderL",
		"chest",
		[
			.185,
			.25,
			-.005
		]
	],
	[
		"elbowL",
		"shoulderL",
		[
			0,
			-.29,
			0
		]
	],
	[
		"wristL",
		"elbowL",
		[
			0,
			-.26,
			0
		]
	],
	[
		"shoulderR",
		"chest",
		[
			-.185,
			.25,
			-.005
		]
	],
	[
		"elbowR",
		"shoulderR",
		[
			0,
			-.29,
			0
		]
	],
	[
		"wristR",
		"elbowR",
		[
			0,
			-.26,
			0
		]
	],
	[
		"hipL",
		"pelvis",
		[
			.088,
			-.02,
			0
		]
	],
	[
		"kneeL",
		"hipL",
		[
			0,
			-.44,
			0
		]
	],
	[
		"ankleL",
		"kneeL",
		[
			0,
			-.43,
			0
		]
	],
	[
		"hipR",
		"pelvis",
		[
			-.088,
			-.02,
			0
		]
	],
	[
		"kneeR",
		"hipR",
		[
			0,
			-.44,
			0
		]
	],
	[
		"ankleR",
		"kneeR",
		[
			0,
			-.43,
			0
		]
	]
];
var POINTS = [
	[
		"butt",
		"pelvis",
		[
			0,
			-.03,
			-.112
		]
	],
	[
		"hipSideL",
		"pelvis",
		[
			.172,
			.07,
			.045
		]
	],
	[
		"hipSideR",
		"pelvis",
		[
			-.172,
			.07,
			.045
		]
	],
	[
		"bellyFront",
		"spine",
		[
			0,
			.12,
			.1
		]
	],
	[
		"chestBack",
		"chest",
		[
			0,
			.15,
			-.105
		]
	],
	[
		"chestFront",
		"chest",
		[
			0,
			.17,
			.12
		]
	],
	[
		"headTop",
		"head",
		[
			0,
			.135,
			-.01
		]
	],
	[
		"headBack",
		"head",
		[
			0,
			.02,
			-.1
		]
	],
	[
		"forehead",
		"head",
		[
			0,
			.045,
			.088
		]
	],
	...["L", "R"].flatMap((s) => {
		const sg = s === "L" ? 1 : -1;
		return [
			[
				`elbowTip${s}`,
				`shoulder${s}`,
				[
					0,
					-.29,
					-.038
				]
			],
			[
				`hand${s}`,
				`wrist${s}`,
				[
					-.012 * sg,
					-.065,
					.006
				]
			],
			[
				`kneeTop${s}`,
				`hip${s}`,
				[
					0,
					-.36,
					.064
				]
			],
			[
				`kneeFront${s}`,
				`knee${s}`,
				[
					0,
					-.01,
					.06
				]
			],
			[
				`shin${s}`,
				`knee${s}`,
				[
					0,
					-.2,
					.045
				]
			],
			[
				`heel${s}`,
				`ankle${s}`,
				[
					0,
					-.095,
					-.07
				]
			],
			[
				`ball${s}`,
				`ankle${s}`,
				[
					0,
					-.095,
					.12
				]
			],
			[
				`toe${s}`,
				`ankle${s}`,
				[
					0,
					-.085,
					.205
				]
			],
			[
				`ankleTop${s}`,
				`ankle${s}`,
				[
					0,
					-.025,
					.09
				]
			],
			[
				`ankleOut${s}`,
				`ankle${s}`,
				[
					.044 * sg,
					0,
					-.01
				]
			]
		];
	})
];
var LEG = [
	[
		-.03,
		.06,
		.06,
		.07
	],
	[
		.02,
		.074,
		.074,
		.082
	],
	[
		.1,
		.077,
		.08,
		.08
	],
	[
		.2,
		.071,
		.078,
		.071
	],
	[
		.3,
		.063,
		.069,
		.061
	],
	[
		.38,
		.053,
		.056,
		.05
	],
	[
		.43,
		.049,
		.053,
		.046,
		.004
	],
	[
		.47,
		.047,
		.046,
		.049
	],
	[
		.54,
		.049,
		.042,
		.063,
		-.006
	],
	[
		.61,
		.046,
		.038,
		.061,
		-.008
	],
	[
		.7,
		.036,
		.033,
		.043,
		-.004
	],
	[
		.78,
		.027,
		.029,
		.03
	],
	[
		.86,
		.026,
		.029,
		.03
	],
	[
		.885,
		.012,
		.012,
		.012
	]
];
var SHORTS_LEG = [
	[
		-.04,
		.083,
		.081,
		.094
	],
	[
		.04,
		.087,
		.086,
		.092
	],
	[
		.13,
		.083,
		.086,
		.084
	],
	[
		.22,
		.077,
		.083,
		.077
	],
	[
		.228,
		.073,
		.079,
		.073
	],
	[
		.232,
		.066,
		.072,
		.066
	]
];
var PELVIS = [
	[
		-.13,
		.03,
		.03,
		.03
	],
	[
		-.115,
		.1,
		.065,
		.075
	],
	[
		-.07,
		.15,
		.085,
		.106
	],
	[
		-.01,
		.162,
		.091,
		.112
	],
	[
		.05,
		.158,
		.088,
		.1
	],
	[
		.1,
		.151,
		.088,
		.09
	],
	[
		.12,
		.147,
		.086,
		.086
	],
	[
		.13,
		.13,
		.07,
		.07
	]
];
var SHIRT = [
	[
		.035,
		.15,
		.09,
		.094
	],
	[
		.045,
		.156,
		.097,
		.099
	],
	[
		.12,
		.148,
		.096,
		.095
	],
	[
		.21,
		.143,
		.099,
		.091
	],
	[
		.3,
		.163,
		.112,
		.095
	],
	[
		.38,
		.182,
		.12,
		.1
	],
	[
		.43,
		.198,
		.114,
		.103
	],
	[
		.465,
		.205,
		.1,
		.1
	],
	[
		.495,
		.193,
		.088,
		.092
	],
	[
		.52,
		.158,
		.076,
		.081
	],
	[
		.54,
		.11,
		.067,
		.071
	],
	[
		.553,
		.076,
		.064,
		.064
	],
	[
		.561,
		.066,
		.062,
		.062
	],
	[
		.567,
		.02,
		.02,
		.02
	]
];
var COLLAR = [
	[
		0,
		.086,
		.077,
		.081
	],
	[
		.012,
		.078,
		.073,
		.075
	],
	[
		.024,
		.069,
		.067,
		.068
	],
	[
		.03,
		.064,
		.063,
		.063
	],
	[
		.033,
		.059,
		.059,
		.059
	]
];
var NECK = [
	[
		0,
		.064,
		.06,
		.064
	],
	[
		.08,
		.061,
		.059,
		.059
	],
	[
		.16,
		.055,
		.056,
		.054,
		.006
	],
	[
		.22,
		.056,
		.057,
		.057,
		.01
	],
	[
		.25,
		.03,
		.03,
		.03,
		.012
	]
];
var HEAD = [
	[
		-.108,
		.012,
		.012,
		.012,
		.05
	],
	[
		-.1,
		.04,
		.036,
		.03,
		.045
	],
	[
		-.08,
		.055,
		.052,
		.045,
		.036
	],
	[
		-.045,
		.07,
		.071,
		.067,
		.02
	],
	[
		0,
		.079,
		.083,
		.09,
		.004
	],
	[
		.05,
		.082,
		.083,
		.099,
		-.004
	],
	[
		.095,
		.072,
		.071,
		.087,
		-.008
	],
	[
		.125,
		.05,
		.047,
		.06,
		-.01
	],
	[
		.14,
		.012,
		.012,
		.014,
		-.01
	]
];
var ARM = [
	[
		0,
		.026,
		.03,
		.03
	],
	[
		.03,
		.046,
		.049,
		.049
	],
	[
		.1,
		.045,
		.047,
		.049
	],
	[
		.19,
		.04,
		.043,
		.044
	],
	[
		.27,
		.033,
		.035,
		.036
	],
	[
		.3,
		.032,
		.034,
		.036
	],
	[
		.35,
		.037,
		.039,
		.035
	],
	[
		.43,
		.03,
		.031,
		.029
	],
	[
		.52,
		.022,
		.022,
		.02
	],
	[
		.555,
		.019,
		.022,
		.02
	],
	[
		.575,
		.01,
		.012,
		.011
	]
];
var SLEEVE = [
	[
		-.03,
		.02,
		.028,
		.028
	],
	[
		-.012,
		.046,
		.054,
		.056
	],
	[
		.02,
		.059,
		.061,
		.061
	],
	[
		.07,
		.058,
		.059,
		.059
	],
	[
		.128,
		.06,
		.06,
		.06
	],
	[
		.134,
		.05,
		.05,
		.05
	]
];
var PALM = [
	[
		-.01,
		.018,
		.021,
		.02
	],
	[
		.015,
		.017,
		.032,
		.029
	],
	[
		.05,
		.016,
		.04,
		.033
	],
	[
		.085,
		.015,
		.04,
		.032
	],
	[
		.099,
		.01,
		.028,
		.024
	],
	[
		.105,
		.003,
		.008,
		.008
	]
];
var FINGERS = [
	{
		z: .025,
		len: .078,
		r: .0092,
		fan: .16
	},
	{
		z: .009,
		len: .088,
		r: .0095,
		fan: .05
	},
	{
		z: -.007,
		len: .083,
		r: .0091,
		fan: -.05
	},
	{
		z: -.022,
		len: .066,
		r: .0082,
		fan: -.17
	}
];
var UPPER = [
	[
		-.098,
		.016,
		-.02,
		-.072
	],
	[
		-.092,
		.039,
		.026,
		-.075
	],
	[
		-.062,
		.047,
		.03,
		-.075
	],
	[
		-.03,
		.05,
		.022,
		-.075
	],
	[
		0,
		.052,
		.014,
		-.075
	],
	[
		.035,
		.054,
		.002,
		-.075
	],
	[
		.085,
		.057,
		-.016,
		-.075
	],
	[
		.14,
		.058,
		-.032,
		-.075
	],
	[
		.185,
		.053,
		-.037,
		-.073
	],
	[
		.215,
		.038,
		-.044,
		-.07
	],
	[
		.232,
		.013,
		-.05,
		-.07
	]
];
var MIDSOLE = [
	[
		-.106,
		.02,
		-.062,
		-.088
	],
	[
		-.1,
		.047,
		-.058,
		-.097
	],
	[
		-.055,
		.057,
		-.058,
		-.098
	],
	[
		.03,
		.061,
		-.063,
		-.097
	],
	[
		.115,
		.065,
		-.065,
		-.096
	],
	[
		.172,
		.061,
		-.065,
		-.093
	],
	[
		.212,
		.045,
		-.063,
		-.086
	],
	[
		.238,
		.016,
		-.062,
		-.079
	]
];
var LEG_REGIONS = [
	{
		id: "hipFlexors",
		d: [-.04, .1],
		th: [-8, 46]
	},
	{
		id: "abductors",
		d: [-.04, .17],
		th: [90, 38]
	},
	{
		id: "quads",
		d: [.1, .4],
		th: [0, 72]
	},
	{
		id: "hamstrings",
		d: [.08, .41],
		th: [180, 64]
	},
	{
		id: "adductors",
		d: [.03, .3],
		th: [-90, 34]
	},
	{
		id: "calves",
		d: [.47, .74],
		th: [180, 72]
	},
	{
		id: "tibialis",
		d: [.47, .8],
		th: [14, 30]
	}
];
var SHIRT_REGIONS = [
	{
		id: "abs",
		d: [.06, .32],
		th: [0, 22],
		side: "C"
	},
	{
		id: "obliques",
		d: [.06, .31],
		th: [76, 24],
		side: "L"
	},
	{
		id: "obliques",
		d: [.06, .31],
		th: [-76, 24],
		side: "R"
	},
	{
		id: "lowerBack",
		d: [.05, .3],
		th: [180, 46],
		side: "C"
	},
	{
		id: "upperBack",
		d: [.3, .53],
		th: [180, 74],
		side: "C"
	},
	{
		id: "chest",
		d: [.35, .5],
		th: [0, 64],
		side: "C"
	}
];
function window$1(x, a, b, feather) {
	const s = (v) => v <= 0 ? 0 : v >= 1 ? 1 : v * v * (3 - 2 * v);
	return s((x - a) / feather + .5) * s((b - x) / feather + .5);
}
function angleGap(a, b) {
	return Math.abs(((a - b) % 360 + 540) % 360 - 180);
}
/**
* Strength of each muscle at a point: an oval over the region that is full in the middle and
* fades out toward its rim, so highlights read as muscle shapes rather than painted boxes.
*/
function best(regions, d, theta, side) {
	let found = null;
	for (const region of regions) {
		const dc = (region.d[0] + region.d[1]) / 2;
		const dh = (region.d[1] - region.d[0]) / 2 + .015;
		const th = region.th[1] + 8;
		const e = ((d - dc) / dh) ** 2 + (angleGap(theta, region.th[0]) / th) ** 2;
		const v = Math.min(1, Math.max(0, (1 - e) / .55));
		const w = v * v * (3 - 2 * v);
		if (w > .01 && (!found || w > found[2])) found = [
			region.id,
			region.side ?? side,
			w
		];
	}
	return found;
}
var g = (x, s) => Math.exp(-((x / s) ** 2));
var at = (theta, center, s) => g(angleGap(theta, center), s);
var HEAD_BUMPS = (d, th) => .0025 * at(th, 0, 11) * g(d + .004, .028) + .003 * at(th, 0, 20) * g(d + .085, .015);
var LEG_BUMPS = (d, th) => .008 * at(th, 0, 26) * g(d - .425, .022) + .006 * at(th, -40, 22) * g(d - .36, .035) + .007 * at(th, -150, 28) * g(d - .58, .05) + .004 * at(th, 150, 25) * g(d - .55, .045) - .004 * at(th, 180, 30) * g(d - .77, .03) + .002 * at(th, -10, 15) * g(d - .62, .12);
var ARM_BUMPS = (d, th) => .004 * at(th, 0, 35) * g(d - .13, .05) + .003 * at(th, 180, 35) * g(d - .12, .05) + .004 * at(th, 180, 25) * g(d - .29, .02) + .003 * at(th, 50, 30) * g(d - .36, .04);
var SHIRT_BUMPS = (d, th) => .004 * (at(th, 32, 26) + at(th, -32, 26)) * g(d - .4, .04) + .003 * (at(th, 150, 20) + at(th, -150, 20)) * g(d - .42, .045);
var SHORTS_BUMPS = (d, th) => .006 * (at(th, 150, 30) + at(th, -150, 30)) * g(d + .05, .05);
var UPPER_BUMPS = (z, th) => at(th, 0, 22) * window$1(z, 0, .11, .02) * (.0025 + .0025 * Math.max(0, Math.cos(z * 2 * Math.PI / .022)));
function cardinal(rings, d, field) {
	const n = rings.length;
	let i = 0;
	while (i < n - 2 && rings[i + 1][0] < d) i++;
	const v = (k) => rings[Math.max(0, Math.min(n - 1, k))][field] ?? 0;
	const x = (k) => rings[Math.max(0, Math.min(n - 1, k))][0];
	const x0 = x(i);
	const h = x(i + 1) - x0;
	const u = h > 0 ? Math.min(1, Math.max(0, (d - x0) / h)) : 0;
	const m0 = (v(i + 1) - v(i - 1)) / Math.max(1e-6, x(i + 1) - x(i - 1)) * h * .8;
	const m1 = (v(i + 2) - v(i)) / Math.max(1e-6, x(i + 2) - x(i)) * h * .8;
	const u2 = u * u;
	const u3 = u2 * u;
	return (2 * u3 - 3 * u2 + 1) * v(i) + (u3 - 2 * u2 + u) * m0 + (-2 * u3 + 3 * u2) * v(i + 1) + (u3 - u2) * m1;
}
var spow = (v, p) => Math.sign(v) * Math.abs(v) ** p;
var Part = class {
	uv = [];
	pos = [];
	idx = [];
	si = [];
	sw = [];
	mus = [];
};
function weightsAt(w, d) {
	const out = [];
	const ts = w.cuts.map(([cut, width]) => {
		const v = (d - (cut - width)) / (2 * width);
		const c = Math.min(1, Math.max(0, v));
		return c * c * (3 - 2 * c);
	});
	for (let k = 0; k < w.names.length; k++) {
		const weight = (k === 0 ? 1 : ts[k - 1]) - (k < ts.length ? ts[k] : 0);
		if (weight > 1e-4) out.push([w.names[k], weight]);
	}
	return out;
}
function pushVertex(part, bones, pos, ws, muscle) {
	part.pos.push(pos.x, pos.y, pos.z);
	const top = ws.sort((a, b) => b[1] - a[1]).slice(0, 4);
	const sum = top.reduce((acc, [, w]) => acc + w, 0) || 1;
	for (let k = 0; k < 4; k++) {
		part.si.push(top[k] ? bones[top[k][0]] : 0);
		part.sw.push(top[k] ? top[k][1] / sum : 0);
	}
	if (muscle) part.mus.push(muscleSlot(muscle[0], muscle[1]), muscle[2]);
	else part.mus.push(-1, 0);
}
var DOWN = [
	0,
	-1,
	0
];
var UP = [
	0,
	1,
	0
];
/**
* Sweep oval rings along `axis` from `origin`. Ring angle 0 points along `front`, 90° along
* `side` (the figure's left for limbs). Built for the left side; `mirror` reflects it to the right.
*/
function tube(part, bones, opts) {
	const { rings, origin, mirror = false, weights, muscle, bump, segs = 40, step = .007, shape = 2.3 } = opts;
	const [uRep, vRep] = opts.uvScale ?? [4, 40];
	const axis = new Vector3(...opts.axis ?? DOWN).normalize();
	const front = new Vector3(...opts.front ?? [
		0,
		0,
		1
	]);
	front.addScaledVector(axis, -front.dot(axis)).normalize();
	const side = new Vector3(1, 0, 0);
	side.addScaledVector(axis, -side.dot(axis)).addScaledVector(front, -side.dot(front));
	if (side.lengthSq() < 1e-6) side.crossVectors(front, axis);
	side.normalize();
	const o = new Vector3(...origin);
	const start = rings[0][0];
	const end = rings[rings.length - 1][0];
	const count = Math.max(2, Math.ceil((end - start) / step) + 1);
	const base = part.pos.length / 3;
	const p = 2 / shape;
	const pos = new Vector3();
	for (let k = 0; k < count; k++) {
		const d = start + (end - start) * k / (count - 1);
		const rx = Math.max(.001, cardinal(rings, d, 1));
		const rf = Math.max(.001, cardinal(rings, d, 2));
		const rb = Math.max(.001, cardinal(rings, d, 3));
		const cz = cardinal(rings, d, 4);
		const ws = weightsAt(weights, d);
		for (let j = 0; j < segs; j++) {
			const th = 2 * Math.PI * j / segs;
			const deg = th > Math.PI ? th * 180 / Math.PI - 360 : th * 180 / Math.PI;
			let lx = rx * spow(Math.sin(th), p);
			let lz = (Math.cos(th) >= 0 ? rf : rb) * spow(Math.cos(th), p);
			if (bump) {
				const len = Math.hypot(lx, lz) || 1;
				const b = bump(d, deg);
				lx += lx / len * b;
				lz += lz / len * b;
			}
			pos.copy(o).addScaledVector(axis, d).addScaledVector(side, lx).addScaledVector(front, lz + cz);
			if (mirror) pos.x = -pos.x;
			pushVertex(part, bones, pos, [...ws], muscle?.(d, deg) ?? null);
			part.uv.push(j / segs * uRep, (d - start) * vRep);
		}
	}
	const outward = new Vector3().crossVectors(side, front).dot(axis) < 0 !== mirror;
	for (let k = 0; k < count - 1; k++) for (let j = 0; j < segs; j++) {
		const a = base + k * segs + j;
		const b = base + k * segs + (j + 1) % segs;
		const c = base + (k + 1) * segs + (j + 1) % segs;
		const e = base + (k + 1) * segs + j;
		if (outward) part.idx.push(a, b, c, a, c, e);
		else part.idx.push(a, c, b, a, e, c);
	}
}
/** Shoe rings [z, half width, top y, bottom y] → oval rings around a forward axis. */
function shoeRings(rows) {
	return rows.map(([z, hw, top, bottom]) => {
		const cy = (top + bottom) / 2;
		return [
			z,
			hw,
			Math.max(.002, top - cy),
			Math.max(.002, cy - bottom),
			cy
		];
	});
}
function hand(part, bones, side) {
	const wrist = [
		.185,
		-.08,
		-.005
	];
	const weights = {
		names: [`wrist${side}`],
		cuts: []
	};
	const mirror = side === "R";
	tube(part, bones, {
		rings: PALM,
		origin: wrist,
		mirror,
		weights,
		segs: 24,
		step: .005,
		shape: 2.6
	});
	for (const finger of FINGERS) {
		const r = finger.r;
		const base = new Vector3(wrist[0] - .004, wrist[1] - .093, wrist[2] + finger.z);
		const near = new Vector3(-.18, -1, finger.fan).normalize();
		const far = new Vector3(-.75, -1, finger.fan * 1.2).normalize();
		const nearLen = finger.len * .48;
		const knuckle = base.clone().addScaledVector(near, nearLen);
		tube(part, bones, {
			rings: [
				[
					-.004,
					r * 1.02,
					r * 1.02,
					r * 1.02
				],
				[
					nearLen * .5,
					r * .97,
					r * .97,
					r * .97
				],
				[
					nearLen,
					r * .92,
					r * .92,
					r * .92
				],
				[
					nearLen + .004,
					r * .6,
					r * .6,
					r * .6
				]
			],
			origin: [
				base.x,
				base.y,
				base.z
			],
			axis: [
				near.x,
				near.y,
				near.z
			],
			mirror,
			weights,
			segs: 12,
			step: .004,
			shape: 2
		});
		const farLen = finger.len - nearLen;
		tube(part, bones, {
			rings: [
				[
					-.004,
					r * .6,
					r * .6,
					r * .6
				],
				[
					0,
					r * .9,
					r * .9,
					r * .9
				],
				[
					farLen * .6,
					r * .82,
					r * .82,
					r * .82
				],
				[
					farLen - .005,
					r * .74,
					r * .74,
					r * .74
				],
				[
					farLen,
					r * .25,
					r * .25,
					r * .25
				]
			],
			origin: [
				knuckle.x,
				knuckle.y,
				knuckle.z
			],
			axis: [
				far.x,
				far.y,
				far.z
			],
			mirror,
			weights,
			segs: 12,
			step: .004,
			shape: 2
		});
	}
	tube(part, bones, {
		rings: [
			[
				0,
				.012,
				.012,
				.012
			],
			[
				.03,
				.01,
				.01,
				.01
			],
			[
				.055,
				.008,
				.008,
				.008
			],
			[
				.062,
				.003,
				.003,
				.003
			]
		],
		origin: [
			wrist[0] - .006,
			wrist[1] - .02,
			wrist[2] + .024
		],
		axis: [
			-.35,
			-.6,
			.72
		],
		front: [
			0,
			1,
			0
		],
		mirror,
		weights,
		segs: 12,
		step: .005,
		shape: 2
	});
}
function shoe(parts, bones, side) {
	const ankle = [
		.088,
		-.89,
		0
	];
	const weights = {
		names: [`ankle${side}`],
		cuts: []
	};
	const mirror = side === "R";
	const common = {
		origin: ankle,
		axis: [
			0,
			0,
			1
		],
		front: [
			0,
			1,
			0
		],
		mirror,
		weights,
		segs: 40,
		step: .005
	};
	tube(parts.shoe, bones, {
		...common,
		rings: shoeRings(UPPER),
		shape: 2.8,
		bump: UPPER_BUMPS,
		uvScale: [6, 70]
	});
	tube(parts.sole, bones, {
		...common,
		rings: shoeRings(MIDSOLE),
		shape: 2.7
	});
	const upper = shoeRings(UPPER);
	for (let k = 0; k < 6; k++) {
		const z = .006 + k * .019;
		const top = cardinal(upper, z, 4) + cardinal(upper, z, 2);
		const dir = new Vector3(1, 0, k % 2 ? .45 : -.45).normalize();
		const half = .022;
		tube(parts.sole, bones, {
			rings: [
				[
					0,
					.0012,
					.0012,
					.0012
				],
				[
					.003,
					.0024,
					.0024,
					.0024
				],
				[
					half * 2 - .003,
					.0024,
					.0024,
					.0024
				],
				[
					half * 2,
					.0012,
					.0012,
					.0012
				]
			],
			origin: [
				ankle[0] - dir.x * half,
				ankle[1] + top + .0035,
				ankle[2] + z - dir.z * half
			],
			axis: [
				dir.x,
				dir.y,
				dir.z
			],
			front: [
				0,
				1,
				0
			],
			mirror,
			weights,
			segs: 8,
			step: .004,
			shape: 2
		});
	}
}
function buildBody(materials) {
	const container = new Group();
	const bones = {};
	const index = {};
	const list = [];
	for (const [name, parent, pos] of BONES) {
		const bone = new Bone();
		bone.name = name;
		bone.position.set(...pos);
		if (parent) bones[parent].add(bone);
		bones[name] = bone;
		index[name] = list.length;
		list.push(bone);
	}
	container.add(bones.root);
	container.updateMatrixWorld(true);
	const parts = {
		skin: new Part(),
		shirt: new Part(),
		shorts: new Part(),
		shoe: new Part(),
		sole: new Part()
	};
	for (const side of ["L", "R"]) {
		const mirror = side === "R";
		const hip = [
			.088,
			-.02,
			0
		];
		const shoulder = [
			.185,
			.47,
			-.005
		];
		const legWeights = {
			names: [
				"pelvis",
				`hip${side}`,
				`knee${side}`,
				`ankle${side}`
			],
			cuts: [
				[.02, .06],
				[.44, .05],
				[.86, .025]
			]
		};
		const armWeights = {
			names: [
				"chest",
				`shoulder${side}`,
				`elbow${side}`,
				`wrist${side}`
			],
			cuts: [
				[-.015, .05],
				[.29, .04],
				[.55, .03]
			]
		};
		const legMuscle = (d, th) => best(LEG_REGIONS, d, th, side);
		tube(parts.skin, index, {
			rings: LEG,
			origin: hip,
			mirror,
			weights: legWeights,
			muscle: legMuscle,
			bump: LEG_BUMPS
		});
		tube(parts.shorts, index, {
			rings: SHORTS_LEG,
			origin: hip,
			mirror,
			weights: legWeights,
			muscle: legMuscle
		});
		tube(parts.skin, index, {
			rings: ARM,
			origin: shoulder,
			mirror,
			weights: armWeights,
			segs: 32,
			bump: ARM_BUMPS
		});
		tube(parts.shirt, index, {
			rings: SLEEVE,
			origin: shoulder,
			mirror,
			weights: armWeights,
			segs: 36,
			muscle: (d) => d < .14 ? [
				"shoulders",
				side,
				window$1(d, -.08, .14, .03)
			] : null
		});
		hand(parts.skin, index, side);
		shoe(parts, index, side);
	}
	tube(parts.shorts, index, {
		rings: PELVIS,
		origin: [
			0,
			0,
			0
		],
		axis: UP,
		weights: {
			names: ["pelvis", "spine"],
			cuts: [[.1, .04]]
		},
		segs: 56,
		bump: (d, th) => SHORTS_BUMPS(d, th),
		muscle: (d, th) => best([{
			id: "glutes",
			d: [-.12, .07],
			th: [140, 36],
			side: "L"
		}, {
			id: "glutes",
			d: [-.12, .07],
			th: [-140, 36],
			side: "R"
		}], d, th, "C")
	});
	tube(parts.shirt, index, {
		rings: SHIRT,
		origin: [
			0,
			0,
			0
		],
		axis: UP,
		weights: {
			names: [
				"pelvis",
				"spine",
				"ribs",
				"neck"
			],
			cuts: [
				[.06, .05],
				[.24, .06],
				[.545, .015]
			]
		},
		segs: 64,
		bump: SHIRT_BUMPS,
		muscle: (d, th) => best(SHIRT_REGIONS, d, th, "C")
	});
	tube(parts.shirt, index, {
		rings: COLLAR,
		origin: [
			0,
			.522,
			.004
		],
		axis: UP,
		weights: {
			names: ["ribs", "neck"],
			cuts: [[.03, .02]]
		},
		segs: 48,
		step: .003,
		shape: 2
	});
	tube(parts.skin, index, {
		rings: NECK,
		origin: [
			0,
			.45,
			0
		],
		axis: UP,
		weights: {
			names: ["ribs", "neck"],
			cuts: [[.07, .03]]
		},
		segs: 32
	});
	tube(parts.skin, index, {
		rings: HEAD,
		origin: [
			0,
			.705,
			.014
		],
		axis: UP,
		weights: {
			names: ["head"],
			cuts: []
		},
		segs: 64,
		step: .004,
		bump: HEAD_BUMPS
	});
	const skeleton = new Skeleton(list);
	const meshes = [];
	for (const key of Object.keys(parts)) {
		const part = parts[key];
		const geo = new BufferGeometry();
		geo.setAttribute("position", new Float32BufferAttribute(part.pos, 3));
		geo.setAttribute("skinIndex", new Uint16BufferAttribute(part.si, 4));
		geo.setAttribute("skinWeight", new Float32BufferAttribute(part.sw, 4));
		geo.setAttribute("aMuscle", new Float32BufferAttribute(part.mus, 2));
		geo.setAttribute("uv", new Float32BufferAttribute(part.uv, 2));
		geo.setIndex(part.idx);
		geo.computeVertexNormals();
		const mesh = new SkinnedMesh(geo, materials[key]);
		mesh.castShadow = true;
		mesh.frustumCulled = false;
		container.add(mesh);
		mesh.bind(skeleton);
		meshes.push(mesh);
	}
	const rig = {
		joints: {},
		points: {}
	};
	for (const name of Object.keys(bones)) if (name !== "ribs" && name !== "head") rig.joints[name] = bones[name];
	rig.ribs = bones.ribs;
	for (const [name, bone, pos] of POINTS) {
		const obj = new Object3D();
		obj.position.set(...pos);
		bones[bone].add(obj);
		rig.points[name] = obj;
	}
	return {
		container,
		rig,
		vertexCount: meshes.reduce((sum, mesh) => sum + mesh.geometry.getAttribute("position").count, 0),
		dispose() {
			for (const mesh of meshes) mesh.geometry.dispose();
			skeleton.dispose();
		}
	};
}
var OUTFIT = {
	skin: "#c6c9cd",
	shirt: "#7d8086",
	shorts: "#55575b",
	shoe: "#f1f2f1",
	sole: "#d6d2bf",
	primary: "#ff3b30",
	secondary: "#ff9f0a"
};
/**
* Every body vertex carries (muscle slot, strength). The shader looks up whether that slot is
* lit and tints the surface, so the highlight is painted on the skin itself and bends with it.
*/
function withMuscles(material, uniforms) {
	material.onBeforeCompile = (shader) => {
		Object.assign(shader.uniforms, uniforms);
		shader.vertexShader = shader.vertexShader.replace("#include <common>", `#include <common>
attribute vec2 aMuscle;
uniform float uLevel[${MUSCLE_SLOTS}];
varying float vPrim;
varying float vSec;`).replace("#include <begin_vertex>", `#include <begin_vertex>
{
  float lv = 0.0;
  for (int i = 0; i < ${MUSCLE_SLOTS}; i++) {
    if (abs(float(i) - aMuscle.x) < 0.5) lv = uLevel[i];
  }
  vPrim = (lv > 0.5 && lv < 1.5) ? aMuscle.y : 0.0;
  vSec = lv > 1.5 ? aMuscle.y : 0.0;
}`);
		shader.fragmentShader = shader.fragmentShader.replace("#include <common>", `#include <common>
uniform vec3 uPrimary;
uniform vec3 uSecondary;
uniform float uGlow;
varying float vPrim;
varying float vSec;`).replace("#include <color_fragment>", `#include <color_fragment>
float hp = clamp(vPrim, 0.0, 1.0);
float hs = clamp(vSec, 0.0, 1.0);
diffuseColor.rgb = mix(diffuseColor.rgb, uSecondary, hs * 0.78);
diffuseColor.rgb = mix(diffuseColor.rgb, uPrimary, hp * 0.85);`).replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>
totalEmissiveRadiance += uPrimary * hp * uGlow + uSecondary * hs * uGlow * 0.6;`);
	};
	material.customProgramCacheKey = () => "coach-muscles";
	return material;
}
/** Height map of knitted stitches (rows of small Vs), tiled over the shoe uppers. */
function knitTexture() {
	const size = 64;
	const canvas = document.createElement("canvas");
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	const img = ctx.createImageData(size, size);
	for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
		const cx = x % 8 / 8;
		const cy = y % 8 / 8;
		const v = Math.abs(cx - .5) * 2;
		const value = 90 + 140 * (1 - Math.min(1, Math.abs(v - (1 - cy)) * 3)) + (x * 31 + y * 17) % 13;
		const i = (y * size + x) * 4;
		img.data[i] = img.data[i + 1] = img.data[i + 2] = Math.min(255, value);
		img.data[i + 3] = 255;
	}
	ctx.putImageData(img, 0, 0);
	const texture = new CanvasTexture(canvas);
	texture.wrapS = RepeatWrapping;
	texture.wrapT = RepeatWrapping;
	return texture;
}
function useMaterials() {
	return (0, import_react.useMemo)(() => {
		const uniforms = {
			uLevel: { value: new Array(MUSCLE_SLOTS).fill(0) },
			uPrimary: { value: new Color(OUTFIT.primary) },
			uSecondary: { value: new Color(OUTFIT.secondary) },
			uGlow: { value: .4 }
		};
		return {
			parts: {
				skin: withMuscles(new MeshPhysicalMaterial({
					color: OUTFIT.skin,
					roughness: .55,
					clearcoat: .12,
					clearcoatRoughness: .6,
					sheen: .2,
					sheenColor: new Color("#ffffff")
				}), uniforms),
				shirt: withMuscles(new MeshPhysicalMaterial({
					color: OUTFIT.shirt,
					roughness: .82,
					sheen: .6,
					sheenRoughness: .6,
					sheenColor: new Color("#c9ccd1")
				}), uniforms),
				shorts: withMuscles(new MeshPhysicalMaterial({
					color: OUTFIT.shorts,
					roughness: .75,
					sheen: .4,
					sheenRoughness: .5,
					sheenColor: new Color("#bdbdbd")
				}), uniforms),
				shoe: new MeshPhysicalMaterial({
					color: OUTFIT.shoe,
					roughness: .75,
					sheen: .5,
					sheenColor: new Color("#ffffff"),
					bumpMap: knitTexture(),
					bumpScale: .6
				}),
				sole: new MeshStandardMaterial({
					color: OUTFIT.sole,
					roughness: .6
				})
			},
			uniforms
		};
	}, []);
}
/** Write the lit muscles into the shader's slot table. */
function setHighlights(uniforms, highlights) {
	const level = uniforms.uLevel.value;
	level.fill(0);
	for (const [key, value] of highlights) {
		const [id, side] = key.split(":");
		level[muscleSlot(id, side)] = value === "primary" ? 1 : 2;
	}
}
/** The skinned mannequin. Its bones are the rig joints the pose driver moves. */
function Mannequin({ onRig, highlights, mats }) {
	const body = (0, import_react.useMemo)(() => buildBody(mats.parts), [mats]);
	(0, import_react.useEffect)(() => {
		onRig(body.rig);
		return () => body.dispose();
	}, [body, onRig]);
	(0, import_react.useEffect)(() => setHighlights(mats.uniforms, highlights), [mats, highlights]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", { object: body.container });
}
var FOV = 30;
var DEFAULT_VIEW = {
	az: 36,
	el: 8
};
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
function Scene({ move, side, paused, muscles = true, focus, at, override, view: forcedView }) {
	const rigRef = (0, import_react.useRef)(null);
	const onRig = (0, import_react.useCallback)((next) => {
		rigRef.current = next;
	}, []);
	const mats = useMaterials();
	const anim = (0, import_react.useMemo)(() => animFor(move, side), [move, side]);
	const highlights = (0, import_react.useMemo)(() => muscles ? highlightsFor(move, side, focus) : /* @__PURE__ */ new Map(), [
		move,
		side,
		muscles,
		focus
	]);
	const reduced = useReducedMotion();
	const memo = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const clock = (0, import_react.useRef)(0);
	const tween = (0, import_react.useRef)(null);
	const framed = (0, import_react.useRef)("");
	const { camera, size, invalidate, gl } = useThree();
	const controls = useThree((state) => state.controls);
	(0, import_react.useEffect)(() => {
		memo.current = /* @__PURE__ */ new Map();
		clock.current = (anim.still ?? .25) * anim.dur;
		invalidate();
	}, [anim, invalidate]);
	(0, import_react.useEffect)(() => invalidate(), [
		highlights,
		paused,
		at,
		override,
		invalidate
	]);
	useFrame((state, delta) => {
		const rig = rigRef.current;
		if (!rig || !rigReady(rig)) return;
		const aspect = size.width / Math.max(1, size.height);
		const key = `${move}:${side ?? ""}:${aspect.toFixed(2)}:${forcedView?.az ?? ""}:${forcedView?.el ?? ""}`;
		if (framed.current !== key) {
			const target = fit(measure(rig, anim, memo.current), forcedView ?? anim.view ?? (side === "right" ? {
				az: -DEFAULT_VIEW.az,
				el: DEFAULT_VIEW.el
			} : DEFAULT_VIEW), FOV, aspect);
			const first = framed.current === "";
			framed.current = key;
			if (first) {
				gl.domElement.style.opacity = "1";
				camera.position.copy(target.position);
				controls?.target.copy(target.target);
				camera.lookAt(target.target);
			} else tween.current = {
				from: camera.position.clone(),
				to: target.position,
				fromT: controls ? controls.target.clone() : target.target.clone(),
				toT: target.target,
				k: 0
			};
		}
		if (!paused && !reduced && at === void 0) clock.current += Math.min(delta, .05);
		const t = at ?? (reduced ? anim.still ?? .25 : clock.current / anim.dur % 1);
		frame(rig, anim, t, memo.current, override);
		const pulse = .5 + .5 * Math.sin(state.clock.elapsedTime * 3.2);
		mats.uniforms.uGlow.value = reduced ? .45 : .25 + .4 * pulse;
		const tw = tween.current;
		if (tw) {
			tw.k = Math.min(1, tw.k + delta * 1.8);
			const e = tw.k < .5 ? 2 * tw.k * tw.k : 1 - (-2 * tw.k + 2) ** 2 / 2;
			camera.position.lerpVectors(tw.from, tw.to, e);
			controls?.target.lerpVectors(tw.fromT, tw.toT, e);
			if (tw.k >= 1) tween.current = null;
			invalidate();
		}
		controls?.update();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mannequin, {
		onRig,
		highlights,
		mats
	}), anim.wall !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			0,
			1.1,
			anim.wall + .02
		],
		receiveShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			1.6,
			2.2,
			.04
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#eceef1",
			roughness: .9
		})]
	}) : null] });
}
function CoachStage(props) {
	const live = !props.paused || props.at !== void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
		className: "coach-canvas",
		dpr: [1, 2],
		frameloop: live ? "always" : "demand",
		camera: {
			fov: FOV,
			near: .05,
			far: 40,
			position: [
				2.4,
				1.4,
				3.6
			]
		},
		gl: {
			antialias: true,
			preserveDrawingBuffer: props.at !== void 0
		},
		"aria-label": props.label,
		role: "img",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
				attach: "background",
				args: ["#ffffff"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
				"#ffffff",
				"#dfe1e6",
				.7
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
				position: [
					1.6,
					5,
					2.6
				],
				intensity: 1.5
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
				position: [
					-3,
					2.5,
					-2
				],
				intensity: .45
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Environment, {
				resolution: 128,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
						form: "rect",
						intensity: 2.2,
						position: [
							0,
							4,
							2
						],
						"rotation-x": Math.PI / 2,
						scale: [
							6,
							4,
							1
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
						form: "rect",
						intensity: 1.2,
						position: [
							-4,
							1.5,
							1
						],
						"rotation-y": Math.PI / 2,
						scale: [
							4,
							3,
							1
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
						form: "rect",
						intensity: .8,
						position: [
							4,
							1,
							-2
						],
						"rotation-y": -Math.PI / 2,
						scale: [
							4,
							3,
							1
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, { ...props }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
				position: [
					0,
					.001,
					0
				],
				scale: 6,
				far: 1.4,
				blur: 2.4,
				opacity: .42,
				resolution: 512,
				color: "#1d2026"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
				makeDefault: true,
				enablePan: false,
				minDistance: 1.5,
				maxDistance: 9,
				minPolarAngle: .08,
				maxPolarAngle: 1.62
			})
		]
	});
}
//#endregion
export { CoachStage as default };
