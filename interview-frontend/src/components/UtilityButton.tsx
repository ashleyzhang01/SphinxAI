import React from "react";
import { FaPhoneSlash } from "react-icons/fa";

const UtilityButton = () => {
  return (
    <button className="h-12 w-12 bg-red-500 hover:bg-blue-700 rounded-full items-center justify-center flex  shadow-md ">
      <FaPhoneSlash size={28} />
    </button>
  );
};

export default UtilityButton;
