import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GLBImageLoader from "../components/ui/GLBImageLoader";
import ObjImageLoader from "../components/ui/ObjImageLoader";
import { Environment } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

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

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    </div>
  );
};

const ModelViewer = () => {
  const controlsRef = useRef();
  const [environment, setEnvironment] = useState("warehouse");

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
    <>
      <div className="flex min-h-screen bg-gray-50">
        <div className="flex-1 relative max-h-[90vh]">
          <Canvas
            camera={{ position: [0, 2, 6], fov: 60 }}
            className="w-full h-[90vh]"
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
            <Environment preset={environment} background />

            <Suspense fallback={null}>
              {/* <GLBImageLoader /> */}
              <ObjImageLoader />
            </Suspense>
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              ref={controlsRef}
            />
            <CameraPositionViewer controlsRef={controlsRef} />
          </Canvas>

          {/* Bottom Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Camera State
            </Button>
            <Button
              variant="outline"
              className="bg-white/90 backdrop-blur-sm text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Model
            </Button>
          </div>
          <div className="w-80 top-4 right-4 absolute  border-gray-200 p-6 overflow-y-auto">
            <div className="space-y-6">
              <div className="space-y-2 ">
                <Button variant="outline" className="w-full bg-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 bg-white"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Model
                </Button>
                <Select
                  value={environment}
                  onValueChange={setEnvironment}
                  className="w-full bg-white"
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Environment" />
                  </SelectTrigger>
                  <SelectContent>
                    {environmentPresets.map((preset) => (
                      <SelectItem
                        key={preset}
                        value={preset}
                        className="cursor-pointer bg-whtie"
                      >
                        {preset}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        {/* Side Panel */}
      </div>
    </>
  );
};

export default ModelViewer;
