import { Box, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-200 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gri md:grid-cols-4 gap">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Box className="h-6 w-6 text-gray-900" />
                <span className="text-lg font-bold text-gray-900">
                  3D Studio
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                The ultimate platform for 3D model visualization and management.
              </p>
              <div className="flex space-x-4">
                <Github className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className=" border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 3D Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
