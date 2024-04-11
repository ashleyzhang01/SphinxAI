import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';

interface SpeechToTextProps {
  onTranscriptChange: (transcript: string) => void;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ onTranscriptChange }) => {
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onresult = (event: any) => {
      const newTranscript = event.results[0][0].transcript;
      setTranscript(prevTranscript => prevTranscript + ' ' + newTranscript);
      onTranscriptChange(newTranscript);
    };

    recognition.start();
  }, [onTranscriptChange]);

  const saveTranscript = () => {
    const blob = new Blob([transcript], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "transcript.txt");
  };

  return (
    <button onClick={saveTranscript}>Save Response</button>
  );
};

export default SpeechToText;