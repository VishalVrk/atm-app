// src/components/VoiceRecognition.js
import React, { useState } from 'react';

const VoiceRecognition = ({ onCommand }) => {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      onCommand(command); // pass the command to the parent
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
  };

  return (
    <button onClick={startListening} className="bg-blue-500 text-white p-2 rounded">
      {listening ? "Listening..." : "Use Voice"}
    </button>
  );
};

export default VoiceRecognition;
