// InterviewsPage.jsx
'use client'
import React, { useState } from 'react';
import {useRouter} from "next/navigation"
import axios from 'axios';

const InterviewsPage = () => {
  const [category, setCategory] = useState('');
  const [resume, setRsesume] = useState<File | null>(null); 
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
        formData.append('resume', resume);
      }
      const questions = await axios.post('http://localhost:5000/api/behavioral', formData);
      localStorage.setItem("category", category)
      router.push('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Interviews</h1>
      <div>
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          <option value="Investment Banking">Investment Banking</option>
          <option value="Consulting">Consulting</option>
          <option value="Quant">Quant</option>
          <option value="Software Engineering">Software Engineering</option>
        </select>
        <input type="file" onChange={handleResumeChange} />
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default InterviewsPage;
