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
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

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
  const problemString =
    "You are given an integer n. There is an undirected graph with n nodes, numbered from 0 to n - 1. You are given a 2D integer array edges where edges[i] = [a_i, b_i] denotes that there exists an undirected edge connecting nodes a_i and b_i.\n\nReturn the number of pairs of different nodes that are unreachable from each other.\n\nExample 1:\nInput: n = 3, edges = [[0,1],[0,2],[1,2]]\nOutput: 0\nExplanation: There are no pairs of nodes that are unreachable from each other. Therefore, we return 0.\n\nExample 2:\nInput: n = 7, edges = [[0,2],[0,5],[2,4],[1,6],[5,4]]\nOutput: 14\nExplanation: There are 14 pairs of nodes that are unreachable from each other:\n[[0,1],[0,3],[0,6],[1,2],[1,3],[1,4],[1,5],[2,3],[2,6],[3,4],[3,5],[3,6],[4,6],[5,6]].\nTherefore, we return 14.\n";
  const charmander =
    "https://xf-assets.pokecharms.com/data/attachment-files/2015/10/236933_Charmander_Picture.png";
  return (
    <main>
      <div className="grid grid-cols-4">
        <div className="col-span-3 w-full h-screen bg-gray-200 relative">
          <div className="h-full w-full py-4 flex">
            <div className="w-5/12 h-full p-4">
              <div className="text-left text-2xl font-bold mb-4 text-black">
                Three Little Duckies
              </div>
              <div className="text-sm" style={{ whiteSpace: "pre-wrap" }}>
                {problemString}
              </div>
            </div>
            <AceEditor
              mode="java"
              theme="monokai"
              height="100%"
              width="100%"
              fontSize={18}
              enableLiveAutocompletion
              onChange={() => console.log("changed")}
              name="UNIQUE_ID_OF_DIV"
              value={
                "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n\n    public long countPairs(int n, int[][] edges) {\n"
              }
              editorProps={{ $blockScrolling: false }}
            />
          </div>
          <div className="w-1/4 h-1/4 bg-slate-900 absolute bottom-8 right-8 rounded-lg shadow-md z-60">
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
