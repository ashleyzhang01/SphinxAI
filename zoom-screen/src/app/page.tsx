'use client'

import { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from './styles/Home.module.css'
import Participant from './components/Participant';
import Interviewer from './components/Interviewer';
import SpeechToText from './components/SpeechToText';
import { OpenAI } from 'openai';

export default function Home() {
  const [transcript, setTranscript] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

  type ChatMessage = { sender: string; content: string; };

  useEffect(() => {
    if (transcript !== '') {
      handleUserInput(transcript);
    }
  }, [transcript]);

  const handleUserInput = async (message: string) => {
    setChatMessages([...chatMessages, { sender: 'user', content: message }]);

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
      setChatMessages([...chatMessages, { sender: 'AI', content: chunk.choices[0]?.delta?.content || '' }]);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Mock Zoom Call</title>
        <meta name="description" content="Mock Zoom Call" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to your mock interview
        </h1>

        <div className={styles.grid}>
          <Interviewer videoUrl="https://www.youtube.com/watch?v=g6ib_I9ukZA&ab_channel=BloombergTelevision" />
          <Participant name="Participant 2" />
          <SpeechToText onTranscriptChange={setTranscript} />
        </div>
        <p>{transcript}</p> {/* display the transcript */}
        {chatMessages.map((message, index) => (
          <p key={index}><strong>{message.sender}:</strong> {message.content}</p>
        ))}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </footer>
    </div>
  )
}