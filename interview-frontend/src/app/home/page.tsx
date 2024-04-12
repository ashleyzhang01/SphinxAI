"use client";
import NavBar from "@/components/NavBar";
import React from "react";

const HomeScreen = (props: any) => {
  return (
    <div>
      <div className="h-screen">
        <NavBar userData={{ username: "fdsgdfg" }} />

        <h1 className="text-5xl text-center mt-72">
          Your Supa Hot Fun Interview App
        </h1>
      </div>
    </div>
  );
};

export default HomeScreen;
