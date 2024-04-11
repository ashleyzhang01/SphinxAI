import React from "react";

const RoundedBar = ({ on, height }: any) => {
  if (on) {
    return (
      <div>
        {height < 6 ? (
          height < 4 ? (
            <div className="bg-green-700 h-2 w-1.5 rounded-full mr-0.5"></div>
          ) : (
            <div className="bg-green-700 h-4 w-1.5 rounded-full mr-0.5"></div>
          )
        ) : (
          <div className="bg-green-700 h-6 w-1.5 rounded-full mr-0.5"></div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {height < 6 ? (
          height < 4 ? (
            <div className="bg-gray-300 h-2 w-1.5 rounded-full mr-0.5"></div>
          ) : (
            <div className="bg-gray-300 h-4 w-1.5 rounded-full mr-0.5"></div>
          )
        ) : (
          <div className="bg-gray-300 h-6 w-1.5 rounded-full mr-0.5"></div>
        )}
      </div>
    );
  }
};

export default RoundedBar;
