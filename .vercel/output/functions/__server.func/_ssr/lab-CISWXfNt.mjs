import { i as __toESM } from "../_runtime.mjs";
import { l as require_jsx_runtime, u as require_react } from "../_libs/@react-three/drei+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lab-CISWXfNt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
require_jsx_runtime();
(0, import_react.lazy)(() => import("./coach-stage-BUkOs7ve.mjs"));
function Lab() {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [state, setState] = (0, import_react.useState)({
		move: "jog",
		muscles: true
	});
	const [override, setOverride] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		setMounted(true);
		window.__lab = { set: (next) => setState((prev) => ({
			...prev,
			...next
		})) };
	}, []);
	return null;
}
//#endregion
export { Lab as component };
