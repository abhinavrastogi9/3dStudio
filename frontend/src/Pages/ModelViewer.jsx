import React, { Suspense, useRef, useEffect, useState, lazy } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Save, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loading from "../components/ui/Loading.jsx";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFileApiCall,
  getFileByIdApiCall,
  UpdateFileApiCall,
} from "../Store/fileApiCalls/fileApiSlice.js";
import CameraPositionViewer from "../components/CameraPositionViewer.jsx";
const DynamicModelLoader = lazy(() =>
  import("../components/DynamicModelLoader.jsx")
);

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
const ModelViewer = () => {
  const controlsRef = useRef();
  const [environment, setEnvironment] = useState("warehouse");
  const [publicUrl, setPublicUrl] = useState("");
  const [fileType, setFileType] = useState("glb");
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { fileFetched, fileData } = useSelector((state) => state.fileApiSlice);
  const [initalcameraState, setInitalcameraState] = useState({
    position: { x: 0, y: 2, z: 6 },
    target: { x: 0, y: 0, z: 0 },
    zoom: 0,
  });
  useEffect(() => {
    dispatch(getFileByIdApiCall(_id));
  }, [_id]);

  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(fileData).length === 0 && fileFetched === "failed") {
      navigate("/dashboard");
    }
  }, [fileFetched, fileData]);
  //delete model
  function deleteModel() {
    dispatch(deleteFileApiCall(_id));
    navigate("/dashboard");
  }
  //save model or update model
  function saveModel() {
    const FileId = _id;
    const environmentPreset = environment;
    const cameraState = initalcameraState;
    dispatch(UpdateFileApiCall({ FileId, environmentPreset, cameraState }));
  }
  //set the inital position of the 3d model in canvas
  useEffect(() => {
    if (fileData?.cameraState) {
      setInitalcameraState(fileData?.cameraState);
      setEnvironment(fileData?.environmentPreset);
      setPublicUrl(fileData?.publicUrl);
      setFileType(fileData?.fileType);
    }
  }, [fileData]);
  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <div className="flex-1 relative max-h-[90vh] flex justify-center items-center">
          {/* 3D Canvas */}
          {Object.keys(fileData).length > 0 && (
            <Suspense fallback={<Loading />}>
              <Canvas
                camera={{
                  position: [
                    initalcameraState?.position?.x,
                    initalcameraState?.position?.y,
                    initalcameraState?.position?.z,
                  ],
                  fov: 60,
                }}
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
                <DynamicModelLoader publicUrl={publicUrl} type={fileType} />
                <OrbitControls
                  enablePan
                  enableZoom
                  enableRotate
                  ref={controlsRef}
                />
                <CameraPositionViewer
                  controlsRef={controlsRef}
                  setInitalcameraState={setInitalcameraState}
                />
              </Canvas>
            </Suspense>
          )}
          {/* Bottom Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={saveModel}
            >
              <Save className="h-4 w-4 mr-2" />
              Save State
            </Button>
            <Button
              variant="outline"
              className="bg-white/90 backdrop-blur-sm text-red-600 hover:text-red-700"
              onClick={deleteModel}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
          {/* Top Controls */}
          <div className="w-50 -top-4 -right-4 absolute  border-gray-200 p-6 overflow-y-auto">
            <div className="space-y-6">
              <div className="space-y-2 ">
                <div className="space-y-2  hidden md:block">
                  <Button
                    variant="outline"
                    className="w-full bg-white"
                    onClick={saveModel}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 bg-white"
                    onClick={deleteModel}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Model
                  </Button>
                </div>
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
