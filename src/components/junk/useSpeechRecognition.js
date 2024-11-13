// useSpeechRecognition.js
import { useState, useEffect, useCallback } from 'react';

const useSpeechRecognition = (onCommand) => {
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.webkitSpeechRecognition) {
      const newRecognition = new window.webkitSpeechRecognition();
      newRecognition.continuous = true;
      newRecognition.interimResults = false;
      newRecognition.lang = 'en-IN';

      newRecognition.onresult = (event) => {
        const text = event.results[event.results.length - 1][0].transcript;
        onCommand(text.toLowerCase().trim());
      };

      newRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      setRecognition(newRecognition);
    }
  }, [onCommand]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      recognition?.start();
      setIsListening(true);
    }
  }, [isListening, recognition]);

  return { isListening, toggleListening };
};

export default useSpeechRecognition;
