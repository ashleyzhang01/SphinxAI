"use client";
import NavBar from "@/components/NavBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ColorButton } from "@/components/Button";

const HomeScreen = (props: any) => {
  const [userData, setUserData] = useState<any>({ username: "" });
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get('/api/users', {
  //         withCredentials: true
  //       });
  //       setUserData(response.data.user);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log(decoded);
      setUserData({ username: decoded.user });
    } else {
      setUserData({ username: "" });
    }
  }, []);

  return (
    <div>
      <div className="h-screen">
        <NavBar userData={userData} />

        <h1 className="text-6xl text-center mt-24">SphinxAI</h1>
        <h2 className="text-3xl text-center mt-4">
          Decode Success, Revolutionize Your Hiring Game
        </h2>
        <div className="flex items-center mt-16 space-x-8 ml-16 mr-16">
          <div className="bg-black bg-opacity-10 shadow-lg p-6 rounded-lg w-1/3">
            <h3 className="text-2xl font-semibold mb-4">
              Comprehensive Interview Simulation
            </h3>
            <p>
              We simulate interview processes for a variety of roles, including
              software engineering, quantitative trading, consulting, and
              investment banking. We offer both behavioral and technical
              interviews, which include coding interviews for SWE, case
              questions for consulting, etc.{" "}
            </p>
          </div>
          <div className="bg-black bg-opacity-10 shadow-lg p-6 rounded-lg w-1/3">
            <h3 className="text-2xl font-semibold mb-4">
              Full Immersive Interview Experience
            </h3>
            <p>
              We provide a full immersive interview experience, with
              text-to-speech and speech-to-text capabilities, along with a
              customizable mock interviewer, which uses AI to generate follow up
              responses/questions. It looks amd feels like you are conversing
              with a real interviewer.
            </p>
          </div>
          <div className="bg-black bg-opacity-10 shadow-lg p-6 rounded-lg w-1/3">
            <h3 className="text-2xl font-semibold mb-4">
              Personalized AI Analysis & Training
            </h3>
            <p>
              We use AI to provide personalized feedback and analysis on your
              responses&apos correctness and clarity, helping you optimize your
              performance. You&apos ll also get feedback on how to make your
              points more clear and confident with analysis of eye-tracking,
              pauses, and filler words.{" "}
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default HomeScreen;