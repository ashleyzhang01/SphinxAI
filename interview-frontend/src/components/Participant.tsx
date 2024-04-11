"use client";

import { useEffect, useRef, FC } from "react";
import styles from "../styles/Home.module.css";
import VideoHeader from "./VideoHeader";

interface ParticipantProps {
  name: string;
}

const Participant: FC<ParticipantProps> = ({ name }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="h-full w-full z-10 relative blur-none">
      <div className="absolute">
        <VideoHeader variant={1} value={3} username={name} />
      </div>
      <video
        className="rounded-lg h-full w-full"
        ref={videoRef}
        autoPlay
        playsInline
      />
    </div>
  );
};

export default Participant;
