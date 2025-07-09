import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { lazy, Suspense } from "react";
import Loading from "./ui/Loading";
import {useInView} from "react-intersection-observer"
// Outside the component (top of the file)
const DynamicModelLoader = lazy(() => import("./DynamicModelLoader.jsx"));
export function ObjectPreviewCard({ file }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-gray-300">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 flex items-center gap-2 mt-1 justify-between">
            <h3 className="font-semibold text-wrap text-gray-900  flex truncate">
              {file.fileName}
            </h3>
            <Badge
              variant="secondary"
              className={`text-xs ${
                file.fileType == "obj"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {file.fileType}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden flex justify-center items-center" ref={ref}>
         {inView && <Suspense fallback={<Loading />}>
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
              <Environment preset={file?.environmentPreset} background />

              <DynamicModelLoader
                publicUrl={file?.publicUrl}
                type={file?.fileType}
              />

              <OrbitControls enablePan enableZoom enableRotate />
            </Canvas>
          </Suspense>}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link to={`/dashboard/model/${file._id}`}>
          <Button
            size="sm"
            className="flex-1 gap-1 bg-gray-900 hover:bg-gray-800"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
        </Link>
        <Button
          size="sm"
          variant="outline"
          className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
        >
          <Trash2 className="h-3 w-3" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
