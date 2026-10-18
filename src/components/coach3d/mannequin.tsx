import { useEffect, useMemo } from "react";
import { buildBody } from "./body";
import type { Rig } from "./driver";
import { setHighlights, type Highlights, type Materials } from "./materials";

/** The skinned mannequin. Its bones are the rig joints the pose driver moves. */
export function Mannequin({
  onRig,
  highlights,
  mats,
}: {
  onRig: (rig: Rig) => void;
  highlights: Highlights;
  mats: Materials;
}) {
  const body = useMemo(() => buildBody(mats.parts), [mats]);

  useEffect(() => {
    onRig(body.rig);
    return () => body.dispose();
  }, [body, onRig]);

  useEffect(() => setHighlights(mats.uniforms, highlights), [mats, highlights]);

  return <primitive object={body.container} />;
}
