"use client";

import { useEffect, useRef, FC } from "react";
import styles from "../styles/Home.module.css";

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
    <div className={styles.card}>
      <h2>{name} &rarr;</h2>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
};

export default Participant;
