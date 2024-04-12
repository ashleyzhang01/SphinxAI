import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';

interface SpeechToTextProps {
  onTranscriptChange: (transcript: string) => void;
  recording: boolean;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ onTranscriptChange, recording }) => {
  const [transcript, setTranscript] = useState('');
  let recognition: any = null;

  useEffect(() => {
    if (recording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [recording]);

  const startRecording = () => {
    if ('SpeechRecognition' in window) {
      recognition = new (window as any).SpeechRecognition();
    } else if ('webkitSpeechRecognition' in window) {
      recognition = new (window as any).webkitSpeechRecognition();
    } else {
      console.log('Speech recognition is not supported in this browser');
      return;
    }
  
    recognition.onresult = (event: any) => {
      const newTranscript = event.results[0][0].transcript;
      setTranscript(prevTranscript => prevTranscript + ' ' + newTranscript);
      onTranscriptChange(newTranscript);
    };
  
    recognition.start();
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const saveTranscript = () => {
    const blob = new Blob([transcript], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "transcript.txt");
  };

  const buttonStyle = {
    backgroundColor: 'grey',
    color: 'white',
    padding: '10px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px 10px',
    height: '35px',
    width: '120px',
    textAlign: 'center',
    fontSize: '12px',
  }

  return (
    <div>
      <button style={buttonStyle} onClick={saveTranscript}>Save Response</button>
    </div>
  );
};

export default SpeechToText;
