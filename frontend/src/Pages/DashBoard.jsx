import { Button } from "@/components/ui/button";
import { Upload, User } from "lucide-react";
import { ObjectPreviewCard } from "@/components/ObjectPreviewCard.jsx";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllFilesApiCall } from "../Store/fileApiCalls/fileApiSlice";
export default function DashBoard() {
  // Simulate user authentication state
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authenticationSlice);
  const { allFiles, filesLoading } = useSelector((state) => state.fileApiSlice);
  useEffect(() => {
    dispatch(getAllFilesApiCall());
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
   <header className="bg-white border-b border-gray-200 px-6 py-4 flex-col justify-start">
  <div className="flex flex-col md:flex-row justify-between md:items-center items-start gap-4">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome back, {userInfo?.firstName}!
      </h1>
      <p className="text-gray-600 mt-1">
        Manage and visualize your 3D models
      </p>
    </div>

    <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
      <div className="md:flex text-wrap items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg hidden">
        <User className="h-4 w-4 text-gray-600" />
        <span className="text-sm text-wrap text-gray-700 ">{userInfo?.email}</span>
      </div>
      <Link to="/dashboard/uploadfile">
        <Button className="gap-2 cursor-pointer bg-gray-900 hover:bg-gray-800">
          <Upload className="h-4 w-4" />
          Upload Model
        </Button>
      </Link>
    </div>
  </div>
</header>

      {/* Main Content */}
      <div
        className={`px-6 py-6 min-h-screen ${filesLoading && "animate-pulse"}`}
      >
        {allFiles.length === 0 ? (
          // Empty state with upload button
          <div
            className={`flex flex-col items-center justify-center py-16 ${
              filesLoading && "animate-pulse bg-gray-100 "
            }`}
          >
            <div className="text-center">
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No 3D models uploaded yet
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by uploading your first 3D model file
              </p>
              <Link to="/dashboard/uploadfile">
                <Button className="gap-2 bg-gray-900 cursor-pointer hover:bg-gray-800">
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
              {allFiles?.map((file) => (
                <ObjectPreviewCard key={file._id} file={file} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
