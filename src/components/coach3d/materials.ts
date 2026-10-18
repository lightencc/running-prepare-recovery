import { useMemo } from "react";
import {
  CanvasTexture,
  Color,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  RepeatWrapping,
  type Material,
} from "three";
import type { MuscleId } from "@/content/muscles";
import { MUSCLE_SLOTS, muscleSlot, type PartKey } from "./body";

export type Level = "primary" | "secondary";
/** Which muscles glow, keyed `${muscle}:${L|R|C}` (C = centre-line muscles such as abs). */
export type Highlights = ReadonlyMap<string, Level>;

// Light grey mannequin in a mid-grey tee and darker grey compression shorts, white knit runners on
// an off-white midsole. Grey clothes keep red/orange muscle highlights readable.
export const OUTFIT = {
  skin: "#c6c9cd",
  shirt: "#7d8086",
  shorts: "#55575b",
  shoe: "#f1f2f1",
  sole: "#d6d2bf",
  primary: "#ff3b30",
  secondary: "#ff9f0a",
};

/**
 * Every body vertex carries (muscle slot, strength). The shader looks up whether that slot is
 * lit and tints the surface, so the highlight is painted on the skin itself and bends with it.
 */
function withMuscles<T extends Material>(material: T, uniforms: MuscleUniforms): T {
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
attribute vec2 aMuscle;
uniform float uLevel[${MUSCLE_SLOTS}];
varying float vPrim;
varying float vSec;`,
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
{
  float lv = 0.0;
  for (int i = 0; i < ${MUSCLE_SLOTS}; i++) {
    if (abs(float(i) - aMuscle.x) < 0.5) lv = uLevel[i];
  }
  vPrim = (lv > 0.5 && lv < 1.5) ? aMuscle.y : 0.0;
  vSec = lv > 1.5 ? aMuscle.y : 0.0;
}`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
uniform vec3 uPrimary;
uniform vec3 uSecondary;
uniform float uGlow;
varying float vPrim;
varying float vSec;`,
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
float hp = clamp(vPrim, 0.0, 1.0);
float hs = clamp(vSec, 0.0, 1.0);
diffuseColor.rgb = mix(diffuseColor.rgb, uSecondary, hs * 0.78);
diffuseColor.rgb = mix(diffuseColor.rgb, uPrimary, hp * 0.85);`,
      )
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
totalEmissiveRadiance += uPrimary * hp * uGlow + uSecondary * hs * uGlow * 0.6;`,
      );
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
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cx = (x % 8) / 8;
      const cy = (y % 8) / 8;
      // each stitch is a V: two slanted loops meeting at the bottom
      const v = Math.abs(cx - 0.5) * 2;
      const loop = 1 - Math.min(1, Math.abs(v - (1 - cy)) * 3);
      const value = 90 + 140 * loop + ((x * 31 + y * 17) % 13);
      const i = (y * size + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = Math.min(255, value);
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  return texture;
}

export type MuscleUniforms = {
  uLevel: { value: number[] };
  uPrimary: { value: Color };
  uSecondary: { value: Color };
  uGlow: { value: number };
};

export function useMaterials() {
  return useMemo(() => {
    const uniforms: MuscleUniforms = {
      uLevel: { value: new Array<number>(MUSCLE_SLOTS).fill(0) },
      uPrimary: { value: new Color(OUTFIT.primary) },
      uSecondary: { value: new Color(OUTFIT.secondary) },
      uGlow: { value: 0.4 },
    };
    const parts: Record<PartKey, Material> = {
      skin: withMuscles(
        new MeshPhysicalMaterial({
          color: OUTFIT.skin,
          roughness: 0.55,
          clearcoat: 0.12,
          clearcoatRoughness: 0.6,
          sheen: 0.2,
          sheenColor: new Color("#ffffff"),
        }),
        uniforms,
      ),
      shirt: withMuscles(
        new MeshPhysicalMaterial({ color: OUTFIT.shirt, roughness: 0.82, sheen: 0.6, sheenRoughness: 0.6, sheenColor: new Color("#c9ccd1") }),
        uniforms,
      ),
      shorts: withMuscles(
        new MeshPhysicalMaterial({ color: OUTFIT.shorts, roughness: 0.75, sheen: 0.4, sheenRoughness: 0.5, sheenColor: new Color("#bdbdbd") }),
        uniforms,
      ),
      shoe: new MeshPhysicalMaterial({
        color: OUTFIT.shoe,
        roughness: 0.75,
        sheen: 0.5,
        sheenColor: new Color("#ffffff"),
        bumpMap: knitTexture(),
        bumpScale: 0.6,
      }),
      sole: new MeshStandardMaterial({ color: OUTFIT.sole, roughness: 0.6 }),
    };
    return { parts, uniforms };
  }, []);
}

export type Materials = ReturnType<typeof useMaterials>;

/** Write the lit muscles into the shader's slot table. */
export function setHighlights(uniforms: MuscleUniforms, highlights: Highlights) {
  const level = uniforms.uLevel.value;
  level.fill(0);
  for (const [key, value] of highlights) {
    const [id, side] = key.split(":") as [MuscleId, "L" | "R" | "C"];
    level[muscleSlot(id, side)] = value === "primary" ? 1 : 2;
  }
}
