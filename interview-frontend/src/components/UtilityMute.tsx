import React from "react";
import { FaMicrophoneSlash } from "react-icons/fa";

const UtilityMute = () => {
  return (
    <button className="h-12 w-12 bg-gray-100 hover:bg-blue-700 rounded-full items-center justify-center flex shadow-md">
      <FaMicrophoneSlash size={28} />
    </button>
  );
};

export default UtilityMute;
