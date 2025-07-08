import { useCallback, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
export default function UploadFile() {
  const [dragActive, setDragActive] = useState(false);
  const handleDrag = useCallback((event) => {
    event.preventDefault();
    if (event.type === "dragenter" || event.type === "dragover")
      setDragActive(true);
    else if (event.type == "dragleave") setDragActive(false);
  }, []);
  function handleDrop(e) {
    // Handle file drop logic here
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  }
  function handleChange(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  }
  function handleFiles(file) {
    console.log(file.name);
  }
  return (
    <>
      {" "}
      <div className="max-w-4xl mx-auto p-6">
        <Card className="mb-8">
          <CardContent className="p-8">
            <div
              className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".obj,.glb"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {dragActive ? "Drop your files here" : "Upload 3D Model Files"}
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop your files here, or click to browse
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Supported formats: OBJ, GLB
              </p>
              <Button className="bg-gray-900 hover:bg-gray-800">
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* {type supported} */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Supported File Formats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  OBJ{" "}
                </Badge>
                <p className="text-xs text-gray-600 mt-1">Wavefront OBJ</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  GLB{" "}
                </Badge>
                <p className="text-xs text-gray-600 mt-1">Binary gltf</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
