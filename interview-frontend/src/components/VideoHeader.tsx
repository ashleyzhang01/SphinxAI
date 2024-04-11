import React from "react";
import RoundedBarControlGroup from "./RoundedBarControlGroup";

const VideoHeader = ({ value, username, variant }: any) => {
  if (variant == 1) {
    return (
      <div className="h-10 w-fit bg-white flex pl-4 pr-4 items-center rounded-tl-lg bg-opacity-60 rounded-br-lg">
        <RoundedBarControlGroup value={value} />
        <div className="font-bold text-md ml-1">{username}</div>
      </div>
    );
  } else {
    return (
      <div className="h-10 w-fit bg-white flex pl-4 pr-4 items-center bg-opacity-60 rounded-br-lg">
        <RoundedBarControlGroup value={value} />
        <div className="font-bold text-md ml-1">{username}</div>
      </div>
    );
  }
};

export default VideoHeader;
