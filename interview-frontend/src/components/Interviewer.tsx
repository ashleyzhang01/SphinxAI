import { FC, useEffect, useState } from "react";
import VideoHeader from "./VideoHeader";

interface Interviewer {
  videoUrl: string;
}

const VideoPlayer: FC<Interviewer> = ({ videoUrl }) => {
  return (
    <div className="h-full w-full relative">
      <div className="absolute">
        <VideoHeader variant={2} value={3} username="Interviewer" />
      </div>
      <iframe className="h-full w-full" src={videoUrl} frameBorder="0" />
    </div>
  );
};

export default VideoPlayer;
