"use client";

import Card from "@/components/Card";
import React from "react";
import { FC } from "react";
import SignUpForm from "@/components/SignUpForm";
import Select from "@/components/Select";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import NavBar from "@/components/NavBar";
const SignUp: FC = () => {
  const [userData, setUserData] = React.useState({ username: "" });
  return (
    <div>
      <NavBar userData={userData}></NavBar>
      <div className="p-7">
        <div className="grid grid-cols-3 gap-4">
          <div></div>
          <Card title="Sign Up" titleAlign="center">
            <div className="text-center text-black">
              Sign up to get started with interviews.
            </div>
            <div className="mt-10">
              <SignUpForm></SignUpForm>
            </div>
          </Card>

          <div></div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
