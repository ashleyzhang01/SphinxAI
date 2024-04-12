// InterviewsPage.jsx
"use client";
import React, { useState } from 'react';
import {useRouter} from "next/navigation"
import axios from 'axios';
import NavBar from '@/components/NavBar';

const InterviewsPage = () => {
  const [category, setCategory] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const router = useRouter();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const handleNext = async () => {
    try {
      const formData = new FormData();
      if (resume) {
        formData.append("resume", resume);
      }
      const questions: any = await axios.post(
        "http://localhost:5000/api/behavioral",
        formData
      );
      localStorage.setItem("category", category);
      localStorage.setItem("behavioral", questions.data.behavioral);
      localStorage.setItem("questions", questions.data.questions);
      localStorage.setItem("resume", questions.data.resume);
      console.log(questions);
      // router.push('/');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        },
      };
      const questions : any = await axios.post('http://localhost:5000/api/behavioral', formData, config);
      localStorage.setItem("category", category)
      localStorage.setItem("questions", questions)
      router.push('/');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="h-screen">
        <NavBar userData={{ username: "asdf" }} />
    <div className="container text-center items-center mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold mt-4 mb-16">Start Interview</h1>
      <div className="flex items-center mb-4">
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 mr-4 ml-64"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          <option value="Investment Banking">Investment Banking</option>
          <option value="Consulting">Consulting</option>
          <option value="Quant">Quant</option>
          <option value="Software Engineering">Software Engineering</option>
        </select>
        <input
          type="file"
          onChange={handleResumeChange}
          className="px-3 py-2 mr-0"
        />
        <button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div></div></div>
  );
};

export default InterviewsPage;
