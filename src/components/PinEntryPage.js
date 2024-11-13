import React, { useState } from 'react';

const PinEntryPage = ({ onPinSubmit }) => {
  const [pin, setPin] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const correctPin = "1234"; // Example correct PIN
  const [error, setError] = useState(false);
  const [listening, setlistening] = useState(false);

  const handleStartInteraction = () => {
    setHasInteracted(true);
    playEnterPinAudio();
  };

  const playEnterPinAudio = () => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/pin_prompt.mp3`);
    audio.play().then(() => {
      setTimeout(() => {
        setlistening(true);
        startListening();
      }, 10000);
      setlistening(false);
    }).catch((error) => {
      console.error("Audio play error:", error);
    });
  };

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.replace(/\s+/g, "");
      console.log("Recognized text:", spokenText);
      setPin(spokenText);
      
      if (spokenText === correctPin) {
        onPinSubmit(spokenText);
      } else {
        playIncorrectPinAudio();
        setError(true);
      }
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
    };
  };

  const handleVoiceCommand = (command) => {
    if (command.includes(correctPin)) {
      onPinSubmit(pin);
    } else {
      playIncorrectPinAudio();
      setError(true);
    }
  };

  const playIncorrectPinAudio = () => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/incorrect_pin.mp3`);
    audio.play().catch((error) => {
      console.error("Audio play error:", error);
    });
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center" style={{ width: '1920px', height: '1080px' }}>
      <div className="bg-white rounded-2xl shadow-xl p-16 w-100">
        <h1 className="text-4xl font-bold text-center mb-12 text-blue-700">
          Enter ATM PIN
        </h1>
        
        {!hasInteracted ? (
          <div className="flex justify-center">
            <button
              onClick={handleStartInteraction}
              className="bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold py-6 px-12 rounded-xl transition-colors duration-200 shadow-lg"
            >
              Start Session
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="relative">
              <input
                type="password"
                value={pin}
                readOnly
                className="w-full text-6xl text-center py-6 border-2 border-gray-300 rounded-xl bg-gray-50 tracking-widest"
                placeholder="••••"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                <button
                  key={num}
                  onClick={() => setPin(pin + num)}
                  className="h-30 w-30 bg-blue-600 hover:bg-blue-700 text-white text-3xl font-semibold rounded-xl transition-colors duration-200 shadow-lg flex items-center justify-center"
                >
                  {num}
                </button>
              ))}
            </div>

            <div className="flex flex-col items-center space-y-6 mt-8">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-4 px-8 rounded-xl transition-colors duration-200 shadow-lg w-full"
                onClick={() => playEnterPinAudio()}
              >
                Retry Voice Input
              </button>

              {listening && (
                <div className="flex items-center space-x-3 text-green-600">
                  <div className="w-4 h-4 bg-green-600 rounded-full animate-pulse"></div>
                  <span className="text-xl font-medium">Listening...</span>
                </div>
              )}

              {error && (
                <div className="text-red-500 text-xl font-medium flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Incorrect PIN. Please try again.</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PinEntryPage;