import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const OptionsPage = ({ onOptionSelect, onBack }) => {
  const [error, setError] = useState(false);
  const [listening, setlistening] = useState(false);

  useEffect(() => {
    playOptionaudio();
  }, []);

  const playOptionaudio = () => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/choose_option.mp3`);
    audio.play().then(() => {
      setTimeout(() => {
        setlistening(true)
        startListening();
      }, 10000);
      setlistening(false)
    }).catch((error) => {
      console.error("Audio play error:", error);
    });
  }

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.toLowerCase();
      console.log("Recognized text:", spokenText);

      if (spokenText.includes("withdraw")) {
        onOptionSelect("withdraw");
      } else if (spokenText.includes("balance")) {
        onOptionSelect("balance");
      } else {
        playErrorAudio();
        setError(true);
      }
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      setError(true);
    };
  };

  const playErrorAudio = () => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/error_option.mp3`);
    audio.play().catch((error) => {
      console.error("Audio play error:", error);
    });
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center" style={{ width: '1920px', height: '1080px' }}>
      <div className="bg-white rounded-2xl shadow-xl p-16 w-3/5 relative">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          aria-label="Go back"
        >
          <ArrowLeft size={32} />
        </button>

        <h1 className="text-4xl font-bold text-center mb-12 text-blue-700">
          Choose an Option
        </h1>

        <div className="space-y-6">
          <button 
            onClick={() => onOptionSelect("withdraw")} 
            className="bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold py-6 px-8 rounded-xl transition-colors duration-200 shadow-lg w-full"
          >
            Withdraw
          </button>

          <button 
            onClick={() => onOptionSelect("balance")} 
            className="bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold py-6 px-8 rounded-xl transition-colors duration-200 shadow-lg w-full"
          >
            Balance Check
          </button>

          <button 
            onClick={playOptionaudio}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-4 px-8 rounded-xl transition-colors duration-200 shadow-lg w-full mt-8"
          >
            Retry Voice Input
          </button>

          {listening && (
            <div className="flex items-center justify-center space-x-3 text-green-600 mt-6">
              <div className="w-4 h-4 bg-green-600 rounded-full animate-pulse"></div>
              <span className="text-xl font-medium">Listening...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center space-x-3 text-red-500 mt-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-xl font-medium">Sorry, I didn't understand. Please try again.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptionsPage;