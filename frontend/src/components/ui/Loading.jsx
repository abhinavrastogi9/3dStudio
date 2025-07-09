// components/Loading.jsx
import React from "react";

const Loading = ({ fullScreen = false }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-6"
      }`}
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
    </div>
  );
};

export default Loading;
