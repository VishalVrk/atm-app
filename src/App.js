import React, { useState } from 'react';
import { ArrowLeft, Wallet } from 'lucide-react';
import PinEntryPage from './components/PinEntryPage';
import OptionsPage from './components/OptionsPage';
import WithdrawalPage from './components/WithdrawalPage';

// Balance Display Component
const BalanceScreen = ({ balance, onBack, onNewTransaction }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ background: '#f3f4f6' }}>
      <div className="bg-white rounded-2xl shadow-xl p-16 w-96">
        <div className="flex flex-col items-center space-y-8">
          <Wallet size={80} className="text-blue-500" />
          <h1 className="text-3xl font-bold text-center text-blue-700">
            Current Balance
          </h1>
          <p className="text-4xl font-bold text-gray-700">
            ₹{balance.toLocaleString()}
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

function App() {
  const [screen, setScreen] = useState("pinEntry");
  const [balance, setBalance] = useState(10000); // Initial balance - ₹10,000
  const [previousScreen, setPreviousScreen] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigateToScreen = (newScreen) => {
    setPreviousScreen(screen);
    setScreen(newScreen);
  };

  const handleBack = () => {
    if (previousScreen) {
      setScreen(previousScreen);
      setPreviousScreen(null);
    } else {
      setScreen("pinEntry");
    }
  };

  const handlePinSubmit = (pin) => {
    if (pin === "1234") {
      navigateToScreen("options");
    }
  };

  const handleOptionSelect = (option) => {
    if (option === "withdraw") {
      navigateToScreen("withdraw");
    } else if (option === "balance") {
      navigateToScreen("balance");
    }
  };

  const handleAmountSubmit = (amount) => {
    if (amount <= balance) {
      setBalance(balance - amount);
      setShowSuccess(true);
    } else {
      // Handle insufficient funds error
      const audio = new Audio(`${process.env.PUBLIC_URL}/insufficient_funds.mp3`);
      audio.play().catch((error) => {
        console.error("Audio play error:", error);
      });
    }
  };

  const handleNewTransaction = () => {
    setShowSuccess(false);
    navigateToScreen("options");
  };

  const handleExit = () => {
    setShowSuccess(false);
    setScreen("pinEntry");
  };

  // Render the appropriate screen
  const renderScreen = () => {
    switch (screen) {
      case "pinEntry":
        return <PinEntryPage onPinSubmit={handlePinSubmit} />;
      
      case "options":
        return (
          <OptionsPage 
            onOptionSelect={handleOptionSelect} 
            onBack={handleExit}
          />
        );
      
      case "withdraw":
        return (
          <WithdrawalPage 
            onAmountSubmit={handleAmountSubmit}
            onBack={handleBack}
            onNewTransaction={handleNewTransaction}
            onExit={handleExit}
            showSuccess={showSuccess}
          />
        );
      
      case "balance":
        return (
          <BalanceScreen 
            balance={balance}
            onBack={handleExit}
            onNewTransaction={handleNewTransaction}
          />
        );
      
      default:
        return <PinEntryPage onPinSubmit={handlePinSubmit} />;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ 
      width: '1920px', 
      height: '1080px',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: '#f3f4f6'
    }}>
      {renderScreen()}
    </div>
  );
}

export default App;