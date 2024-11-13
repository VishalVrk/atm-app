// BankMonitorScreen.js
import React from 'react';
import { BarChart3 } from 'lucide-react';

const BankMonitorScreen = ({ screen, balance, isListening, withdrawalAmount }) => {
  return (
    <div className="w-96 bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
      <div className="bg-gray-800 p-6">
        <div className="flex items-center space-x-2 text-white">
          <BarChart3 className="w-6 h-6" />
          <h2 className="text-xl font-bold">Bank Monitor</h2>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-400 mb-1">Current Screen</p>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${screen === 'main' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
            <p className="font-mono text-white">{screen.toUpperCase()}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-400 mb-2">Account Status</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Balance:</span>
              <span className="font-mono text-green-400">Rs. {balance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Voice Input:</span>
              <span className={`font-mono ${isListening ? 'text-green-400' : 'text-red-400'}`}>
                {isListening ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-400 mb-2">Last Transaction</p>
          <p className="font-mono text-white">
            {withdrawalAmount > 0 
              ? `WITHDRAW: Rs. ${withdrawalAmount.toLocaleString()}`
              : 'NO RECENT TRANSACTION'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankMonitorScreen;
