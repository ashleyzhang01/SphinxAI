import React from "react";
import RoundedBar from "./RoundedBar";

const RoundedBarControlGroup = ({ value }: any) => {
  return (
    <div className="flex items-center">
      <RoundedBar on={value > 2} height={6}></RoundedBar>
      <RoundedBar on={value > 1} height={4}></RoundedBar>
      <RoundedBar on={value > 0} height={2}></RoundedBar>
    </div>
  );
};

export default RoundedBarControlGroup;
