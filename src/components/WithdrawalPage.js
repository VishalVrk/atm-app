import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const WithdrawalSuccessScreen = ({ amount, onBack, onNewTransaction }) => {
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center" style={{ width: '1920px', height: '1080px' }}>
      <div className="bg-white rounded-2xl shadow-xl p-16 w-96">
        <div className="flex flex-col items-center space-y-8">
          <CheckCircle size={80} className="text-green-500" />
          <h1 className="text-3xl font-bold text-center text-green-700">
            Withdrawal Successful!
          </h1>
          <p className="text-2xl text-gray-600 text-center">
            Amount: ₹{amount}
          </p>
          <div className="space-y-4 w-full pt-8">
            <button
              onClick={onNewTransaction}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-4 px-8 rounded-xl transition-colors duration-200 shadow-lg w-full"
            >
              New Transaction
            </button>
            <button
              onClick={onBack}
              className="bg-gray-600 hover:bg-gray-700 text-white text-xl font-semibold py-4 px-8 rounded-xl transition-colors duration-200 shadow-lg w-full"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const WithdrawalPage = ({ onAmountSubmit, onBack }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      console.error("Browser does not support speech recognition.");
      return;
    }
    playWidthdrawalAudio();
  }, []);

  const playWidthdrawalAudio = () => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/enter_amount.mp3`);
    audio.play().then(() => {
      setTimeout(() => {
        startListening();
      }, 5000);
    }).catch((error) => {
      console.error("Audio play error:", error);
    });
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
  };

  useEffect(() => {
    if (!transcript) return;

    const recognizedAmount = parseInt(transcript.replace(/[^0-9]/g, ""), 10);

    if (!isNaN(recognizedAmount) && recognizedAmount > 0) {
      setAmount(recognizedAmount.toString());
      handleSuccessfulWithdrawal(recognizedAmount);
      resetTranscript();
    } else {
      playErrorAudio();
      setError(true);
      resetTranscript();
    }
  }, [transcript, onAmountSubmit, resetTranscript]);

  const handleSuccessfulWithdrawal = (amount) => {
    onAmountSubmit(amount);
    setShowSuccess(true);
  };

  const playErrorAudio = () => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/error_amount.mp3`);
    audio.play().catch((error) => {
      console.error("Audio play error:", error);
    });
  };

  if (showSuccess) {
    return (
      <WithdrawalSuccessScreen
        amount={amount}
        onBack={onBack}
        onNewTransaction={() => window.location.reload()} // Or your preferred way to restart
      />
    );
  }

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center" style={{ width: '1920px', height: '1080px' }}>
      <div className="bg-white rounded-2xl shadow-xl p-16 w-120 relative">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          aria-label="Go back"
        >
          <ArrowLeft size={32} />
        </button>

        <h1 className="text-4xl font-bold text-center mb-12 text-blue-700">
          Enter Withdrawal Amount
        </h1>

        <div className="space-y-8">
          <div className="relative">
            <input
              type="text"
              value={amount ? `₹${amount}` : ''}
              className="w-full text-4xl text-center py-6 border-2 border-gray-300 rounded-xl bg-gray-50"
              placeholder="₹0"
              readOnly
            />
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-4 px-8 rounded-xl transition-colors duration-200 shadow-lg w-full"
            onClick={playWidthdrawalAudio}
          >
            Retry Voice Input
          </button>

          {listening && (
            <div className="flex items-center justify-center space-x-3 text-green-600">
              <div className="w-4 h-4 bg-green-600 rounded-full animate-pulse"></div>
              <span className="text-xl font-medium">Listening...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center space-x-3 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-xl font-medium">Invalid amount. Please try again.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawalPage;