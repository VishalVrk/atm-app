import React, { useState } from 'react';

const PinEntryScreen = ({ onPinSubmit }) => {
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        const spokenPin = spokenText.replace(/\D/g, ''); // Extract only numbers
        setPin((prevPin) => (prevPin + spokenPin).slice(0, 4)); // Limit to 4 digits
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.start();
    } else {
      alert("Voice recognition not supported in this browser.");
    }
  };

  const handlePlayAudio = () => {
    const audio = new Audio('/audio/pin_prompt.mp3');
    audio.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });
    setHasInteracted(true);
  };

  const handleSubmit = () => {
    if (pin === '1234') { // Example PIN validation
      onPinSubmit(true);
    } else {
      setMessage('Invalid PIN. Please try again.');
      setPin('');
    }
  };

  const handleKeypadClick = (digit) => {
    if (pin.length < 4) {
      setPin((prevPin) => prevPin + digit);
    }
  };

  const handleClear = () => setPin('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white space-y-6">
      <h2 className="text-2xl font-bold mb-4">Enter Your PIN</h2>
      
      {!hasInteracted && (
        <button
          onClick={handlePlayAudio}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Start PIN Entry
        </button>
      )}

      {hasInteracted && (
        <>
          <input 
            type="password" 
            value={pin} 
            readOnly 
            className="text-black p-3 rounded-md mb-6 text-center w-24 text-xl" 
            maxLength="4" 
            placeholder="****" 
          />

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'Clear', 0, 'Voice'].map((key, index) => (
              <button
                key={index}
                onClick={() => {
                  if (key === 'Clear') handleClear();
                  else if (key === 'Voice') startVoiceRecognition();
                  else handleKeypadClick(key.toString());
                }}
                className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 text-lg"
              >
                {key}
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 text-lg"
          >
            Submit
          </button>
          <p className="mt-4 text-sm text-red-400">{message}</p>
        </>
      )}
    </div>
  );
};

export default PinEntryScreen;
