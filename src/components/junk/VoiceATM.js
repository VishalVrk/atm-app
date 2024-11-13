// VoiceATM.js
import React, { useState, useCallback } from 'react';
import CustomerScreen from './CustomerScreen';
import BankMonitorScreen from './BankMonitorScreen';
import useSpeechRecognition from './useSpeechRecognition';
import PinEntryScreen from './PinEntryScreen';

const VoiceATM = () => {
  const [isPinValid, setIsPinValid] = useState(false);
  const [balance, setBalance] = useState(50000);
  const [screen, setScreen] = useState('main');
  const [message, setMessage] = useState('Welcome! Say "check balance" or "withdrawal"');
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);

  const handleCommand = useCallback((command) => {
    if (screen === 'main') {
      if (command.includes('balance')) {
        setScreen('balance');
        setMessage(`Your current balance is Rs. ${balance}`);
      } else if (command.includes('withdrawal') || command.includes('withdraw')) {
        setScreen('withdrawal');
        setMessage('Please specify the amount to withdraw. Say "withdraw 5000" (or your desired amount)');
      }
    } else if (screen === 'withdrawal') {
      const numberMatch = command.match(/\d+/);
      if (numberMatch && numberMatch[0]) {
        const requestedAmount = parseInt(numberMatch[0]);
        if (requestedAmount <= balance && requestedAmount > 0) {
          setBalance(prev => prev - requestedAmount);
          setWithdrawalAmount(requestedAmount);
          setMessage(`Successfully withdrew Rs. ${requestedAmount}. Please collect your cash.`);
          setTimeout(() => {
            setScreen('main');
            setMessage('Welcome! Say "check balance" or "withdrawal"');
            setWithdrawalAmount(0);
          }, 5000);
        } else {
          setMessage('Insufficient balance or invalid amount. Please try again.');
        }
      }
    }
  }, [balance, screen]);

  const { isListening, toggleListening } = useSpeechRecognition(handleCommand);

  if (!isPinValid) {
    return <PinEntryScreen onPinSubmit={setIsPinValid} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="flex gap-8">
            <CustomerScreen
              isListening={isListening}
              onToggleListening={toggleListening}
              message={message}
              screen={screen}
              balance={balance}
              withdrawalAmount={withdrawalAmount}
            />
            <BankMonitorScreen
              screen={screen}
              balance={balance}
              isListening={isListening}
              withdrawalAmount={withdrawalAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceATM;
