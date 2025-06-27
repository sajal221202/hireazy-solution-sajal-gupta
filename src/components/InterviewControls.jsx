import React from 'react';

const InterviewControls = ({ 
  isInterviewActive, 
  onStartInterview, 
  onEndInterview,
  onExportChat,
  userRole,
  disabled = false
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
      <div className="flex items-center space-x-2">
        {isInterviewActive ? (
          <div className="flex items-center">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-green-600">Interview in Progress</span>
          </div>
        ) : (
          <span className="text-sm font-medium text-gray-500">Interview {disabled ? 'Ended' : 'Not Started'}</span>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        {/* Export Chat Button */}
        {(isInterviewActive || disabled) && (
          <button
            onClick={onExportChat}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export Chat</span>
            </div>
          </button>
        )}

        {/* Start/End Interview Button */}
        {!disabled && (
          <button
            onClick={isInterviewActive ? onEndInterview : onStartInterview}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isInterviewActive
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
            }`}
          >
            {isInterviewActive ? 'End Interview' : 'Start Interview'}
          </button>
        )}
      </div>
    </div>
  );
};

export default InterviewControls; 