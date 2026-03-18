import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-12 w-full">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-pink-100 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  );
}
