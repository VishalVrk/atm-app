import React from 'react';
import { Mic, MicOff, CreditCard, DollarSign } from 'lucide-react';

const CustomerScreen = ({ 
  isListening, 
  onToggleListening, 
  message, 
  screen, 
  balance, 
  withdrawalAmount 
}) => {
  return (
    <div className="relative w-96 bg-gradient-to-b from-blue-100 to-white rounded-2xl shadow-lg overflow-hidden p-4">
      <div className="bg-blue-700 p-4 rounded-lg shadow-md mb-6 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-6 h-6" />
            <h2 className="text-xl font-semibold">State Bank ATM</h2>
          </div>
          <button 
            onClick={onToggleListening}
            className={`flex items-center px-4 py-1 rounded-full space-x-2 ${isListening ? 'bg-red-500' : 'bg-gray-300'}`}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4 text-white" />
                <span className="text-white">Stop</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 text-gray-800" />
                <span className="text-gray-800">Start</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow-md">
          <p className="text-lg text-blue-700 font-medium">{message}</p>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow">
          {screen === 'balance' && (
            <div className="text-center">
              <p className="text-gray-600 mb-2">Current Balance</p>
              <div className="text-3xl font-bold text-green-700 flex items-center justify-center">
                <DollarSign className="w-6 h-6 mr-1" />
                Rs. {balance.toLocaleString()}
              </div>
            </div>
          )}
          
          {screen === 'withdrawal' && withdrawalAmount > 0 && (
            <div className="text-center">
              <p className="text-gray-600 mb-2">Withdrawing Amount</p>
              <div className="text-3xl font-bold text-blue-700 flex items-center justify-center">
                <DollarSign className="w-6 h-6 mr-1" />
                Rs. {withdrawalAmount.toLocaleString()}
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Voice Commands:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              "Check balance"
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              "Withdrawal"
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              "Withdraw 5000" (example amount)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerScreen;
