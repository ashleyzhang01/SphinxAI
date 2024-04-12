"use client";

import React from "react";
import Image from "next/image";
import Message from "../../components/Message";
import VideoHeader from "../../components/VideoHeader";
import UtilityButton from "../../components/UtilityButton";
import UtilityChat from "../../components/UtilityChat";
import UtilityMute from "../../components/UtilityMute";
import MessageField from "../../components/MessageField";
import Participant from "../../components/Participant";
import Interviewer from "../../components/Interviewer";
import SpeechToText from "../../components/SpeechToText";
import { OpenAI } from "openai";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { PiFilePdfLight } from "react-icons/pi";
type User = {
  id: number;
  username: string;
};

export default function TechnicalView() {
  const [transcript, setTranscript] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [users, setUsers]: any = React.useState([]);
  const [editorValue, setEditorValue] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);
  const [userData, setUserData] = React.useState({ username: "" });
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
    dangerouslyAllowBrowser: true,
  });

  type ChatMessage = { sender: string; content: string };
  const pfp =
    "data:image/jpeg;base64,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";
  const handleSendCode = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/technical/submit",
      {
        problem_name: "countPairs",
        problem_language: "java",
        user_code: editorValue,
      }
    );
    setChatMessages([
      ...chatMessages,
      {
        sender: "Interviewer",
        content: `Test Results: ${response.data.test_results}`,
      },
      { sender: "Interviewer", content: `Runtime: ${response.data.runtime}` },
    ]);
  };

  React.useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log(decoded);
      setUserData({ username: decoded.user });
    } else {
      setUserData({ username: "" });
    }
  }, []);
  const handleEditorInput = (s: any) => {
    console.log(s);
    setEditorValue(s);
  };
  const qString =
    "import java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n\n    public long countPairs(int n, int[][] edges) {\n";
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
  const language = "Java";
  const problemString =
    "You are given an integer n. There is an undirected graph with n nodes, numbered from 0 to n - 1. You are given a 2D integer array edges where edges[i] = [a_i, b_i] denotes that there exists an undirected edge connecting nodes a_i and b_i.\n\nReturn the number of pairs of different nodes that are unreachable from each other.\n\nExample 1:\nInput: n = 3, edges = [[0,1],[0,2],[1,2]]\nOutput: 0\nExplanation: There are no pairs of nodes that are unreachable from each other. Therefore, we return 0.\n\nExample 2:\nInput: n = 7, edges = [[0,2],[0,5],[2,4],[1,6],[5,4]]\nOutput: 14\nExplanation: There are 14 pairs of nodes that are unreachable from each other:\n[[0,1],[0,3],[0,6],[1,2],[1,3],[1,4],[1,5],[2,3],[2,6],[3,4],[3,5],[3,6],[4,6],[5,6]].\nTherefore, we return 14.\n";
  const charmander =
    "https://xf-assets.pokecharms.com/data/attachment-files/2015/10/236933_Charmander_Picture.png";
  return (
    <main>
      <div className="grid grid-cols-4">
        <div className="col-span-3 w-full h-screen bg-gray-200 relative">
          <div className="h-full w-full py-4 flex">
            <div className="w-5/12 h-full px-4">
              <div className="text-left text-3xl font-bold mb-2 text-black">
                countPairs
              </div>
              <div className="text-left text-md font-bold mb-2 text-black bg-orange-300 w-min py-1 px-2 rounded-lg">
                {language}
              </div>
              <hr
                className="mb-2"
                style={{
                  color: "gray",
                  backgroundColor: "gray",
                  height: 1,
                }}
              />

              <div className="text-sm" style={{ whiteSpace: "pre-wrap" }}>
                {problemString}
              </div>
              <div className="w-full flex justify-center mt-4">
                <div className="text-left text-xl font-bold mb-2 text-black bg-green-300 py-2 px-4 rounded-lg mt-4">
                  <button onClick={handleSendCode}>Test Code</button>
                </div>
              </div>
            </div>
            <AceEditor
              mode="java"
              theme="monokai"
              height="100%"
              width="100%"
              fontSize={18}
              enableLiveAutocompletion
              onChange={handleEditorInput}
              name="yes"
              defaultValue={qString}
              editorProps={{ $blockScrolling: false }}
            />
          </div>
          <div className="w-1/4 h-1/4 bg-slate-900 absolute bottom-8 right-8 rounded-lg shadow-md z-60">
            {active == 0 ? (
              <Participant name={userData.username}></Participant>
            ) : (
              <Interviewer
                variant={2}
                videoUrl="https://www.youtube.com/embed/YMOYM1YZ97o?si=6XLD9_zBVZz5O8iV"
              />
            )}
          </div>
          <div className="absolute top-6 right-6 flex z-60">
            <div className="ml-4">
              <UtilityChat />
            </div>
            <div className="ml-4">
              <UtilityMute />
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
                  pfp={pfp}
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
