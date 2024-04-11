import React from 'react';

const Message = ({ username,  message, pfp}: any) => {
  return (
    <div className="flex items-center p-2 bg-gray-200 w-full mb-4 rounded-lg">
      <div className="flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={pfp} alt={username} />
      </div>
      <div className="ml-3">
        <div className="font-sm font-bold text-gray-700">{username}</div>
        <div className="text-xs text-gray-500">{message}</div>
      </div>
    </div>
  );
};

export default Message;