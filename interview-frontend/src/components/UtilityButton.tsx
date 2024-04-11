import React from "react";
import { FaPhoneSlash } from "react-icons/fa";

const UtilityButton = () => {
  return (
    <button className="h-16 w-16 bg-red-500 hover:bg-blue-700 rounded-full items-center justify-center flex  ">
      <FaPhoneSlash size={35} />
    </button>
  );
};

export default UtilityButton;
