import React, { useState } from 'react';

const ATMDemo = () => {
  const [language, setLanguage] = useState('english');
  const [balance, setBalance] = useState(1000);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('');

  const translations = {
    english: {
      welcome: 'Welcome to the ATM',
      balance: 'Current Balance',
      withdraw: 'Withdraw',
      deposit: 'Deposit',
      language: 'Switch to Tamil',
      audio: 'Toggle Audio',
      voice: 'Voice Command',
      enterAmount: 'Enter amount',
      selectOperation: 'Select operation',
      submit: 'Submit',
      checkBalance: 'Check Balance',
      close: 'Close',
    },
    tamil: {
      welcome: 'ATM-க்கு வரவேற்கிறோம்',
      balance: 'தற்போதைய இருப்பு',
      withdraw: 'பணம் எடு',
      deposit: 'பணம் செலுத்து',
      language: 'ஆங்கிலத்திற்கு மாறவும்',
      audio: 'ஒலியை மாற்றவும்',
      voice: 'குரல் கட்டளை',
      enterAmount: 'தொகையை உள்ளிடவும்',
      selectOperation: 'செயல்பாட்டைத் தேர்ந்தெடுக்கவும்',
      submit: 'சமர்ப்பிக்கவும்',
      checkBalance: 'இருப்பைச் சரிபார்க்கவும்',
      close: 'மூடு',
    },
  };

  const t = translations[language];

  const handleLanguageToggle = () => {
    setLanguage(language === 'english' ? 'tamil' : 'english');
  };

  const handleAudioToggle = () => {
    setAudioEnabled(!audioEnabled);
  };

  const handleVoiceCommand = () => {
    setMessage('Voice command activated. Please speak your request.');
  };

  const handleTransaction = () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }

    if (selectedOperation === 'withdraw') {
      if (balance >= parsedAmount) {
        setBalance(balance - parsedAmount);
        setMessage(`Withdrawn $${parsedAmount}. New balance: $${balance - parsedAmount}`);
      } else {
        setMessage('Insufficient funds');
      }
    } else if (selectedOperation === 'deposit') {
      setBalance(balance + parsedAmount);
      setMessage(`Deposited $${parsedAmount}. New balance: $${balance + parsedAmount}`);
    }

    setAmount('');
    setSelectedOperation('');
  };

  const handleCheckBalance = () => {
    setMessage(`Your current balance is ${balance}`);
  };

  const closeNotification = () => {
    setMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {message && (
        <div className="w-full max-w-md bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md mb-4 relative">
          <button 
            onClick={closeNotification}
            className="absolute top-2 right-2 text-blue-700 hover:text-blue-900"
            aria-label={t.close}
          >
            ✕
          </button>
          <p className="font-bold">Notification</p>
          <p>{message}</p>
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg w-full max-w-md overflow-hidden">
        <div className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold text-center">{t.welcome}</h1>
        </div>
        <div className="p-6 space-y-4">
          <div className="text-center text-xl font-bold">
            {t.balance}: ${balance}
          </div>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedOperation}
            onChange={(e) => setSelectedOperation(e.target.value)}
          >
            <option value="">{t.selectOperation}</option>
            <option value="withdraw">{t.withdraw}</option>
            <option value="deposit">{t.deposit}</option>
          </select>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder={t.enterAmount}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={handleTransaction}
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300"
            disabled={!selectedOperation || !amount}
          >
            {t.submit}
          </button>
          <button
            onClick={handleCheckBalance}
            className="w-full bg-gray-200 text-gray-800 p-2 rounded-md hover:bg-gray-300 transition duration-300"
          >
            {t.checkBalance}
          </button>
        </div>
        <div className="bg-gray-100 p-4 flex flex-wrap justify-center gap-2">
          <button
            onClick={handleLanguageToggle}
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition duration-300"
          >
            {t.language}
          </button>
          <button
            onClick={handleAudioToggle}
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition duration-300"
          >
            {audioEnabled ? '🔊' : '🔇'} {t.audio}
          </button>
          <button
            onClick={handleVoiceCommand}
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition duration-300"
          >
            🎤 {t.voice}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ATMDemo;