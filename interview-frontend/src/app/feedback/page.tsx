"use client";
import NavBar from "@/components/NavBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ColorButtonWide } from "@/components/FeedbackButton";
import { ColorButton } from "@/components/Button";
import Card from "@/components/Card";
import Link from "next/link";

const Feedback = (props: any) => {
  const [userData, setUserData] = useState<any>({ username: "" });
  const [category, setCategory] = useState<any>("");
  const data: any = {
    about:
      "Interviewer: Hello, how are you?\nInterviewee: I'm good, thank you. How are you?\nInterviewer: Tell me about yourself.\nInterviewee: Sure, I'm currently a senior at the University of Pennsylvania, majoring in Computer Science. I've always been passionate about technology and software development, and I've been actively involved in various coding projects and internships throughout my college career.\nInterviewer: Tell me about a time you made a mistake and wish you’d handled a situation with a colleague differently.\nInterviewee: There was a time during a group project where I disagreed with a teammate's approach to solving a problem. Instead of discussing it openly and finding a compromise, I became frustrated and didn't communicate effectively. Looking back, I realize I could have handled the situation better by approaching my teammate calmly and discussing our different perspectives to find a solution together.\nInterviewer: Give me an example of a time you faced a conflict with a coworker. How did you handle that?\nInterviewee: In a previous internship, there was a disagreement between me and a colleague regarding the implementation of a feature. We both had strong opinions on how it should be done, but instead of escalating the conflict, I suggested we gather more data and conduct some tests to determine the most effective approach. We eventually found a solution that satisfied both of us and improved the feature.",
    resume:
      "Interviewer: Tell me about your experience at Penn Labs.\nInterviewee: I am a backend developer for Penn Labs, a student organization at my school that develops applications for the students at the University of Pennsylvania. My most recent project was a subletting feature, where I worked on the models and routes of the backend that will allow students to post their properties for subletting, and browse and make offers for available sublets.\nInterviewer: Tell me about your experiences last summer. I see you worked at a start-up.\nInterviewee: I worked at a start-up last summer, where I was a full-stack engineer intern. I really enjoyed the fast-paced environment where I was constantly learning new things, and hope to achieve that from my next internship.",
    questions:
      "Interviewer: Do you have any questions for me?\nInterviewee: Yes, what is your favorite part of working at OpenAI?\nInterviewer: My favorite part of working at OpenAI is that we are at the forefront of exploration of cutting-edge artificial intelligence technologies, pushing the boundaries of what's possible in AI research and development.\nInterviewer: Do you have any other questions?\nInterviewee: I think that's it for now. Thank you for the opportunity to interview with you.",
  };
  const feedback: any = {
    about_feedback:
      'The conversation starts well with a polite exchange of greetings. The interviewee introduces themselves effectively by providing relevant information about their academic background and passion for technology. However, to improve, the response could be more focused on highlighting key accomplishments or skills relevant to the position.\n\nWhen discussing a mistake made with a colleague, the interviewee provides a detailed example showing self-awareness and the ability to reflect on their actions. To enhance this response, more emphasis could be placed on the lessons learned and specific steps taken to address and avoid such situations in the future.\n\nIn the conflict scenario, the interviewee demonstrates good conflict resolution skills by proposing a collaborative approach. To further strengthen this response, providing specific details on the successful outcome and the impact of the resolution would add depth.\n\nOverall, the interviewee\'s responses are clear and articulate, showing a good level of confidence. However, there is room to improve by reducing filler words like "um" or "you know" for a more polished delivery. Additionally, maintaining a steady pace and avoiding rushed answers can help increase the perceived confidence score. It would also be beneficial to structure responses using the STAR method (Situation, Task, Action, Result) for a more structured and impactful delivery.',
    questions_feedback:
      'Overall, the questions asked were relevant and showed interest in the company. However, it\'s essential to ask questions that delve deeper into the role and the company\'s culture. Here are some suggestions for improvement and more engaging questions the interviewee could ask:\n\n1. Instead of a general question, ask about the interviewer\'s personal experiences: "Can you share a specific project or achievement at OpenAI that you found particularly exciting or challenging?"\n\n2. Seek insights into the team dynamics: "How do teams collaborate and communicate effectively within OpenAI\'s work environment?"\n\n3. Explore growth opportunities: "What professional development opportunities does OpenAI offer to help employees enhance their skills and progress in their careers?"\n\n4. Show interest in the company\'s future goals: "Could you elaborate on the long-term vision and direction of OpenAI in the constantly evolving field of artificial intelligence?"\n\nBy asking more detailed and thought-provoking questions, the interviewee can display a genuine curiosity and understanding of the company, which can leave a lasting impression on the interviewer. Remember to always prepare questions in advance to make the most out of this important part of the interview.',
    resume_feedback:
      "Overall, the interviewee provides a solid overview of their experiences at Penn Labs and the start-up. To improve, the interviewee can speak more confidently and emphasize achievements in each role. \n\nWhen discussing the Penn Labs experience, the interviewee effectively describes their role but could benefit from highlighting specific accomplishments or challenges overcome during the project. This would provide a clearer picture of their contributions.\n\nIn the discussion about the start-up internship, the interviewee mentions enjoying the fast-paced environment but could elaborate on a specific project worked on or a skill acquired. This would make the response more impactful.\n\nTo improve the flow and reduce filler words, consider practicing speaking points succinctly. Additionally, ensure to exude confidence when discussing experiences to enhance the overall presentation.",
  };
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get('/api/users', {
  //         withCredentials: true
  //       });
  //       setUserData(response.data.user);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);
  useEffect(() => {
    setCategory(localStorage.getItem("category"));
    const token = Cookies.get("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log(decoded);
      setUserData({ username: decoded.user });
    } else {
      setUserData({ username: "" });
    }
  }, []);

  return (
    <main>
      <div className="grid grid-cols-4">
        <div className="col-span-3 w-full h-screen bg-gray-200 relative px-10">
          <div className="text-4xl font-bold text-center mt-12">
            Feedback for your <span className="text-red-600">{category}</span>{" "}
            Interview
          </div>
          <div className="grid grid-cols-3 gap-6  justify-items-center mt-10">
            <Card>
              <div className="text-black text-center text-xl mb-4 font-bold">
                About
              </div>
              <div className="overflow-auto h-96">
                {feedback["about_feedback"]}
              </div>
            </Card>
            <Card>
              <div className="text-black text-center text-xl mb-4 font-bold">
                Experience
              </div>
              <div className="overflow-auto h-96">
                {feedback["resume_feedback"]}
              </div>
            </Card>
            <Card>
              <div className="text-black text-center text-xl mb-4 font-bold">
                Questions
              </div>
              <div className="overflow-auto h-96">
                {feedback["questions_feedback"]}
              </div>
            </Card>
          </div>
          <div className="flex justify-center mt-4">
            <Link href="/tech">
              <ColorButton>Next</ColorButton>
            </Link>
          </div>
        </div>
        <div className="w-full h-screen bg-sky-950 py-4 flex flex-col items-center pt-4 relative">
          <div className="mb-5 w-5/6">
            <ColorButtonWide color="green-300">Export as PDF</ColorButtonWide>
          </div>
          <div className="mb-5 w-5/6">
            <ColorButtonWide color="green-300">Leaderboard</ColorButtonWide>
          </div>
          <div className="mb-5 w-5/6">
            <ColorButtonWide color="green-300">
              Share With Friends
            </ColorButtonWide>
          </div>
          <div className="overflow-auto h-5/6 w-full flex flex-col item-center">
            <div className="font-bold text-white text-2xl text-center">
              Transcript
            </div>
            <div className="w-4/5 self-center">
              <div className="font-bold text-white text-lg left my-4">
                About
              </div>
              <div
                className="text-gray-200 text-sm"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {data["about"]}
              </div>
              <div className="font-bold text-white text-lg left my-4">
                Experience
              </div>
              <div
                className="text-gray-200 text-sm"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {data["resume"]}
              </div>
              <div className="font-bold text-white text-lg left my-4">
                Questions
              </div>
              <div
                className="text-gray-200 text-sm"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {data["questions"]}
              </div>
              <div className="font-bold text-white text-xl text-center my-4">
                END OF TRANSCRIPT
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Feedback;
