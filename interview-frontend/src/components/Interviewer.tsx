import { FC, useEffect, useState } from 'react';

interface Interviewer {
  videoUrl: string;
}

const VideoPlayer: FC<Interviewer> = ({ videoUrl }) => {
  return (
    <video controls src={videoUrl} autoPlay />
  );
}

export default VideoPlayer;