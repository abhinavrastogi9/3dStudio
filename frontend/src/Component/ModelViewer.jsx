import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GLBImageLoader from "./GLBImageLoader";
import ObjImageLoader from "./ObjImageLoader";
import { Environment } from "@react-three/drei";

const CameraPositionViewer = ({ controlsRef }) => {
  const { camera } = useThree();
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleEnd = () => {
      const position = camera.position;
      const target = controls.target;
      const zoomDistance = position.distanceTo(target);

      console.log("🎯 Camera Position:", position);
      console.log("🎯 Camera Target:", target);
      console.log("🔍 Zoom (Distance):", zoomDistance.toFixed(2));
    };

    controls.addEventListener("end", handleEnd);
    return () => controls.removeEventListener("end", handleEnd);
  }, [camera, controlsRef]);

  return null;
};

const ModelViewer = () => {
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, []);
  const environmentPresets = [
    "sunset",
    "dawn",
    "night",
    "warehouse",
    "forest",
    "apartment",
    "studio",
    "city",
    "park",
    "lobby",
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex items-center justify-center border-2 border-gray-300 rounded-lg shadow-lg">
        <Canvas
          camera={{ position: [0, 2, 6], fov: 60 }}
          className="w-full h-full"
          shadows
        >
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[10, 10, 10]}
            intensity={1.5}
            castShadow
          />
          <directionalLight position={[-10, -5, -10]} intensity={0.6} />
          <pointLight position={[0, 5, 5]} intensity={0.8} />
          <hemisphereLight args={["#ffffff", "#444444", 0.6]} />
          <Environment preset="apartment" background />

          <Suspense fallback={null}>
            {/* <GLBImageLoader /> */}
            <ObjImageLoader />
          </Suspense>
          <OrbitControls enablePan enableZoom enableRotate ref={controlsRef} />
          <CameraPositionViewer controlsRef={controlsRef} />
        </Canvas>
      </div>
    </div>
  );
};

export default ModelViewer;
