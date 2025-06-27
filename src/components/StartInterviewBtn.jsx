import React from 'react';

const StartInterviewBtn = ({ disabled = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
        disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-green-500 hover:bg-green-600 active:bg-green-700'
      }`}
    >
      {disabled ? 'Complete Setup First' : 'Start Interview'}
    </button>
  );
};

export default StartInterviewBtn; 