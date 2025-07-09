import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export default function CameraPositionViewer({
  controlsRef,
  setInitalcameraState,
}) {
  const { camera } = useThree();
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    const handleEnd = () => {
      const position = camera.position;
      const target = controls.target;
      const zoomDistance = position.distanceTo(target).toFixed(2);
      setInitalcameraState({
        position: { x: position.x, y: position.y, z: position.z },
        target: { x: target.x, y: target.y, z: target.z },
        zoom: Number(zoomDistance),
      });
    };
    controls.addEventListener("end", handleEnd);
    return () => controls.removeEventListener("end", handleEnd);
  }, [camera, controlsRef]);
  return null;
}
