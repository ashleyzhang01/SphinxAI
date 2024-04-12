"use client";

import React from "react";
import Image from "next/image";
import Message from "../components/Message";
import VideoHeader from "../components/VideoHeader";
import UtilityButton from "../components/UtilityButton";
import userService from "../userService";
import MessageField from "../components/MessageField";
import Participant from "../components/Participant";
import Interviewer from "../components/Interviewer";
import SpeechToText from "../components/SpeechToText";
import { OpenAI } from "openai";

type User = {
  id: number;
  username: string;
};

export default function Home() {
  const [transcript, setTranscript] = React.useState("");
  const [users, setUsers]: any = React.useState([]);
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
    dangerouslyAllowBrowser: true,
  });

  type ChatMessage = { sender: string; content: string };

  React.useEffect(() => {
    if (transcript !== "") {
      handleUserInput(transcript);
    }
  }, [transcript]);

  const handleUserInput = async (message: string) => {
    setChatMessages([...chatMessages, { sender: "user", content: message }]);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
        { role: "assistant", content: "" },
      ],
      stream: true,
    });

    for await (const chunk of response) {
      setChatMessages([
        ...chatMessages,
        { sender: "AI", content: chunk.choices[0]?.delta?.content || "" },
      ]);
    }
  };
  const charmander =
    "https://xf-assets.pokecharms.com/data/attachment-files/2015/10/236933_Charmander_Picture.png";
  return (
    <main>
      <div className="grid grid-cols-4">
        <div className="col-span-3 w-full h-screen bg-blue-300 relative">
          <div className="h-full w-full z-30">
            <Interviewer
              variant={1}
              videoUrl="https://www.youtube.com/embed/2zKsBfsrxrs?si=5v8dKCzZGeEQnvN9"
            />
          </div>
          <div className="w-1/3 h-1/3 bg-slate-900 absolute bottom-6 right-6 rounded-lg shadow-md">
            <Participant name="Saahil"></Participant>
          </div>
          <div className="absolute top-6 right-6 flex z-60">
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
        </div>
        <div className="w-full h-screen bg-sky-950 flex flex-col justify-between items-center pt-4 relative">
          <div className="w-5/6 justify-self-start h-min">
            <div className="text-center text-2xl font-bold mb-4 text-gray-50">
              Feed
            </div>
            <div className="overflow-auto h-4/5">
              {chatMessages.map((message, index) => (
                <Message
                  key={index}
                  username={message.sender}
                  avatar={charmander}
                  message={message.content}
                />
              ))}
            </div>
          </div>
          <MessageField click={handleUserInput}></MessageField>
        </div>
        <SpeechToText onTranscriptChange={setTranscript} />
        <p>{transcript}</p>
      </div>
    </main>
  );
}
