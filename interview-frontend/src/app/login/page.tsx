"use client";

import Card from "@/components/Card";
import { FC } from "react";
import LogInForm from "@/components/LoginForm";
import NavBar from "@/components/NavBar";
import Select from "@/components/Select";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const LogIn: FC = (props: any) => {
  const userData = { username: "" };
  return (
    <div>
      <NavBar userData={userData}></NavBar>
      <div>
        <div className="p-7">
          <div className="grid grid-cols-3 gap-4">
            <div></div>
            <Card title="Log In" titleAlign="center">
              <div className="text-center text-black">
                Take control of your health!
              </div>
              <div className="mt-10">
                <LogInForm></LogInForm>
              </div>
            </Card>

            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
