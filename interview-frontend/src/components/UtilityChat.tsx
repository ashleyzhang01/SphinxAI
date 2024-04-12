import React from "react";
import { MdOutlineChat } from "react-icons/md";

const UtilityChat = () => {
  return (
    <button className="h-12 w-12 bg-green-300 hover:bg-blue-700 rounded-full items-center justify-center flex shadow-md  ">
      <MdOutlineChat size={28} />
    </button>
  );
};

export default UtilityChat;
