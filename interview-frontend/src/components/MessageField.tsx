import React from "react";
import { FaPaperPlane, FaFileUpload } from "react-icons/fa";
import Message from "./Message";
import RoundedBarControlGroup from "./RoundedBarControlGroup";
import UtilityButton from "./UtilityButton";
import userService from "../userService";

type MessageFieldProps = {
  click: (message: string) => void;
};

const MessageField = ({ click }: MessageFieldProps) => {
  const [message, setMessage] = React.useState("");
  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };
  return (
    <div
      className="
            w-5/6
            grid
            grid-cols-12
            bg-white
            mb-4 
            shadow-lg 
            rounded-lg
            absolute
            bottom-2
          "
    >
      <textarea
        placeholder="Type a message..."
        className="
          p-3 
          rounded 
          col-span-10
          text-sm 
          border-none 
          focus:ring-0
          focus:outline-none
          h-20
          resize-none
          "
        onChange={(e) => handleChange(e)}
      ></textarea>
      <div className="col-span-2">
        <button
          className="
              bg-red-500 
              text-white 
              text-sm
              w-full
              p-2 
              h-1/2
              rounded-tr-lg
              hover:bg-blue-600
            "
        >
          <div className="h-full flex justify-center items-center">
            <FaFileUpload size={20} />
          </div>
        </button>
        <button
          className="
              bg-green-500 
              text-white 
              text-sm
              w-full
              p-2 
              h-1/2
              rounded-br-lg
              hover:bg-blue-600
            "
          onClick={() => click(message)}
        >
          <div className="h-full flex justify-center items-center">
            <FaPaperPlane size={20} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default MessageField;
