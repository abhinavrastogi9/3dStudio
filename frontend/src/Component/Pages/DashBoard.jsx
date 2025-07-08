import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Plus, User } from "lucide-react";
import { ObjectPreviewCard } from "@/components/ui/ObjectPreviewCard.jsx";
import { Link } from "react-router-dom";

const mockObjects = [
  {
    id: "1",
    name: "Classic Teapot",
    type: "OBJ",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    thumbnail: "/placeholder.svg?height=200&width=200",
    vertices: "5,432",
    faces: "10,864",
  },
  {
    id: "2",
    name: "Geometric Cube",
    type: "GLB",
    size: "1.2 MB",
    uploadDate: "2024-01-14",
    thumbnail: "/placeholder.svg?height=200&width=200",
    vertices: "8",
    faces: "12",
  },
  {
    id: "3",
    name: "Smooth Torus",
    type: "GLTF",
    size: "3.1 MB",
    uploadDate: "2024-01-13",
    thumbnail: "/placeholder.svg?height=200&width=200",
    vertices: "2,048",
    faces: "4,096",
  },
  {
    id: "4",
    name: "Complex Sphere",
    type: "FBX",
    size: "4.7 MB",
    uploadDate: "2024-01-12",
    thumbnail: "/placeholder.svg?height=200&width=200",
    vertices: "8,192",
    faces: "16,384",
  },
  {
    id: "5",
    name: "Cylinder Model",
    type: "OBJ",
    size: "1.8 MB",
    uploadDate: "2024-01-11",
    thumbnail: "/placeholder.svg?height=200&width=200",
    vertices: "1,024",
    faces: "2,048",
  },
  {
    id: "6",
    name: "Pyramid Shape",
    type: "GLB",
    size: "0.9 MB",
    uploadDate: "2024-01-10",
    thumbnail: "/placeholder.svg?height=200&width=200",
    vertices: "5",
    faces: "8",
  },
];

export default function DashBoard() {
  // Simulate user authentication state
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user.name.split(" ")[0]}!
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and visualize your 3D models
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
              <User className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">{user.email}</span>
            </div>
            <Link href="/upload">
              <Button className="gap-2 bg-gray-900 hover:bg-gray-800">
                <Upload className="h-4 w-4" />
                Upload Model
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-6 py-6">
        {mockObjects.length === 0 ? (
          // Empty state with upload button
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No 3D models uploaded yet
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by uploading your first 3D model file
              </p>
              <Link href="/upload">
                <Button className="gap-2 bg-gray-900 hover:bg-gray-800">
                  <Upload className="h-4 w-4" />
                  Upload Your First Model
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          // 3D Objects Grid
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockObjects.map((object) => (
                <ObjectPreviewCard key={object.id} object={object} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
