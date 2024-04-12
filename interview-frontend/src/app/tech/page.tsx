"use client";

import React from "react";
import Image from "next/image";
import Message from "../../components/Message";
import VideoHeader from "../../components/VideoHeader";
import UtilityButton from "../../components/UtilityButton";
import { getAllUsers } from "../../userService";
import MessageField from "../../components/MessageField";
import Participant from "../../components/Participant";
import Interviewer from "../../components/Interviewer";
import SpeechToText from "../../components/SpeechToText";
import { OpenAI } from "openai";

type User = {
  id: number;
  username: string;
};

export default function TechnicalView() {
  const [transcript, setTranscript] = React.useState("");
  const [active, setActive] = React.useState(0);
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
    console.log(process.env.YUM);
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
          <div className="w-1/4 h-1/4 bg-slate-900 absolute top-6 left-6 rounded-lg shadow-md">
            {active == 0 ? (
              <Participant name="Saahil"></Participant>
            ) : (
              <Interviewer
                variant={2}
                videoUrl="https://www.youtube.com/embed/YMOYM1YZ97o?si=6XLD9_zBVZz5O8iV"
              />
            )}
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
