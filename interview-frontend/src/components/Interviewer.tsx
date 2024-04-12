import { FC, useEffect, useState } from "react";
import VideoHeader from "./VideoHeader";

interface Interviewer {
  videoUrl: string;
  variant: number;
}

const VideoPlayer: FC<Interviewer> = ({ videoUrl, variant }: any) => {
  if (variant == 1) {
    return (
      <div className="h-full w-full relative">
        <div className="absolute">
          <VideoHeader variant={2} value={3} username="Interviewer" />
        </div>
        <iframe className="h-full w-full" src={videoUrl} frameBorder="0" />
      </div>
    );
  }
  if (variant == 2) {
    return (
      <div className="h-full w-full relative">
        <div className="absolute">
          <VideoHeader variant={1} value={3} username="Interviewer" />
        </div>
        <iframe
          className="h-full w-full rounded-lg"
          src={videoUrl}
          frameBorder="0"
        />
      </div>
    );
  }
};

export default VideoPlayer;
