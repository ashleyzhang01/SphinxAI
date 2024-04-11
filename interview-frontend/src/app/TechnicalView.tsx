"use client";

import React from "react";
import Image from "next/image";
import { FaFileUpload, FaPaperPlane } from "react-icons/fa";
import Message from "../components/Message";
import RoundedBarControlGroup from "../components/RoundedBarControlGroup";
import VideoHeader from "../components/VideoHeader";
import UtilityButton from "../components/UtilityButton";
import { getAllUsers } from "../userService";
import MessageField from "../components/MessageField";

type User = {
  id: number;
  username: string;
};

export default function Home() {
  const [users, setUsers]: any = React.useState([]);
  React.useEffect(() => {
    getAllUsers().then((users) => {
      setUsers(users);
    });
  }, []);
  const charmander =
    "https://xf-assets.pokecharms.com/data/attachment-files/2015/10/236933_Charmander_Picture.png";
  return (
    <main>
      <div className="grid grid-cols-4">
        <div className="col-span-3 w-full h-screen bg-blue-300 relative">
          <iframe
            src="https://www.youtube.com/embed/AfSk24UTFS8?si=D1EDaQMLLq5OoeWZ"
            frameBorder="0"
            allowFullScreen
          />
          <div className="absolute top-6 right-6 flex">
            <div className="ml-4">
              <UtilityButton />
            </div>
            <div className="ml-4">
              <UtilityButton />
            </div>
            <div className="ml-4">
              <UtilityButton />
            </div>
          </div>
          <div>
            <div></div>
            <VideoHeader variant={2} value={3} username="Judy Kim" />
          </div>
          <div className="w-1/3 h-1/3 bg-blue-100 absolute bottom-6 right-6 rounded-lg">
            <VideoHeader variant={1} value={3} username="Saahil" />
          </div>
        </div>
        <div className="w-full h-screen bg-sky-950 flex flex-col justify-between items-center pt-4 relative">
          <div className="w-5/6 justify-self-start h-min">
            <div className="text-center text-2xl font-bold mb-4 text-gray-50">
              Feed
            </div>
            <div className="overflow-auto h-4/5">
              {users.map((user: User) => (
                <Message
                  key={user.id}
                  username={user.username}
                  avatar={charmander}
                  message="Hello, world!"
                />
              ))}
            </div>
          </div>
          <MessageField></MessageField>
        </div>
      </div>
    </main>
  );
}
