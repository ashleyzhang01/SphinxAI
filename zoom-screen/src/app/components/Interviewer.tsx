import { FC, useEffect, useState } from 'react';

interface Interviewer {
  videoUrl: string;
}

const videoStyle = {
  width: '50%',
  height: '50%',
  objectFit: 'cover'
};

const VideoPlayer: FC<Interviewer> = ({ videoUrl }) => {
  return (
    <video style = {videoStyle} controls src={videoUrl} autoPlay />
  );
}

export default VideoPlayer;