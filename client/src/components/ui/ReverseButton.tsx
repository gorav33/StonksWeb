import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const ReverseButton = () => {
  return (
    <Link
      to="/"
      className="absolute top-6 left-4 z-10 bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-all"
    >
      <ArrowLeft className="w-6 h-6 text-white" />
    </Link>
  );
};
