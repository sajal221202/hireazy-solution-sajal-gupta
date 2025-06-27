import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '../hooks/useChat';
import useInterviewQuestions from '../hooks/useInterviewQuestions';
import InterviewControls from './InterviewControls';

const ChatBox = ({ userRole = 'candidate', selectedRole, resumeFile, onMessageSent }) => {
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [isInterviewEnded, setIsInterviewEnded] = useState(false);
  
  const {
    messages,
    inputValue,
    isTyping,
    hasMessages,
    messageCount,
    sendMessage,
    handleInputChange,
    clearChat,
    addSystemMessage
  } = useChat(userRole);

  const {
    loading: questionsLoading,
    error: questionsError,
    getCurrentQuestion,
    getNextQuestion,
    resetInterview,
    hasMoreQuestions,
    progress
  } = useInterviewQuestions(selectedRole, resumeFile);

  // Handle interview start
  const handleStartInterview = () => {
    setIsInterviewActive(true);
    setIsInterviewEnded(false);
    resetInterview();
    
    // Add welcome messages
    addSystemMessage('Interview started');
    setTimeout(() => {
      const firstQuestion = getCurrentQuestion();
      if (firstQuestion) {
        sendMessage(firstQuestion, 'ai');
      }
    }, 1000);
  };

  // Handle interview end
  const handleEndInterview = () => {
    setIsInterviewActive(false);
    setIsInterviewEnded(true);
    addSystemMessage('Interview ended');
    
    // Add feedback message
    setTimeout(() => {
      sendMessage("Thank you for completing the interview! I'll provide a summary of your performance:", 'ai');
      // Add mock feedback (this could be enhanced with actual analysis)
      setTimeout(() => {
        const feedback = [
          "✨ Strong Points:",
          "- Clear communication style",
          "- Good technical knowledge",
          "- Structured responses",
          "",
          "🎯 Areas for Improvement:",
          "- Provide more specific examples",
          "- Elaborate on technical decisions",
          "",
          "Overall Score: 8.5/10"
        ].join('\n');
        sendMessage(feedback, 'ai');
      }, 1500);
    }, 1000);
  };

  // Handle chat export
  const handleExportChat = () => {
    const chatContent = messages.map(msg => {
      const sender = msg.sender === userRole ? 'You' : 
        msg.sender === 'system' ? 'System' :
        msg.sender === 'ai' ? 'AI Interviewer' : 'Interviewer';
      return `[${msg.formattedTime}] ${sender}: ${msg.content}`;
    }).join('\n');

    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    });
  };

  // Scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle send message
  const handleSend = () => {
    if (!inputValue.trim()) return;

    const success = sendMessage();
    if (success) {
      // Notify parent component
      if (onMessageSent) {
        onMessageSent(inputValue);
      }
      
      // Wait for a moment before AI response
      setTimeout(() => {
        if (hasMoreQuestions) {
          // Add a relevant response based on the candidate's answer
          const responseOptions = [
            "Thank you for that answer. Let's move on to the next question.",
            "That's interesting. I'd like to ask you something else now.",
            "Good explanation. Here's another question for you.",
            "I appreciate your detailed response. Let's continue with the next topic."
          ];
          const response = responseOptions[Math.floor(Math.random() * responseOptions.length)];
          sendMessage(response, 'ai');

          // Ask the next question after a short delay
          setTimeout(() => {
            const nextQuestion = getNextQuestion();
            if (nextQuestion) {
              sendMessage(nextQuestion, 'ai');
            } else {
              handleEndInterview();
            }
          }, 1500);
        } else {
          handleEndInterview();
        }
      }, 1000);
    }
  };

  // Handle input key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Get message alignment and styling based on sender
  const getMessageStyle = (sender) => {
    if (sender === 'ai') {
      return {
        container: 'flex justify-start mb-4',
        bubble: 'bg-blue-500 text-white p-3 rounded-lg max-w-[70%] mr-auto',
        info: 'text-left text-xs text-gray-400 mt-1'
      };
    } else if (sender === 'system') {
      return {
        container: 'flex justify-center mb-4',
        bubble: 'bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm',
        info: 'text-center text-xs text-gray-400 mt-1'
      };
    } else {
      return {
        container: 'flex justify-end mb-4',
        bubble: 'bg-green-500 text-white p-3 rounded-lg max-w-[70%] ml-auto',
        info: 'text-right text-xs text-gray-400 mt-1'
      };
    }
  };

  // Get sender display name
  const getSenderName = (sender) => {
    switch (sender) {
      case 'candidate':
        return 'You';
      case 'interviewer':
        return 'Interviewer';
      case 'ai':
        return 'AI Interviewer';
      case 'system':
        return 'System';
      default:
        return sender;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Interview progress */}
      {isInterviewActive && (
        <div className="bg-gray-50 border-b px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Question {progress.current} of {progress.total}
            </div>
            <div className="text-sm text-gray-600">
              Progress: {Math.round((progress.current / progress.total) * 100)}%
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div 
              className="bg-primary-600 h-1.5 rounded-full transition-all duration-300" 
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-lg">
              {!isInterviewActive 
                ? "Welcome! Click 'Start Interview' to begin" 
                : isInterviewEnded 
                  ? 'Interview has ended'
                  : 'Start typing your response...'}
            </p>
          </div>
        ) : (
          messages.map((message, index) => {
            const style = getMessageStyle(message.sender);
            const isAI = message.sender === 'ai';
            
            return (
              <div key={index} className={style.container}>
                {isAI && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <span role="img" aria-label="AI" className="text-blue-600 text-sm">🤖</span>
                  </div>
                )}
                <div className={style.bubble}>
                  {message.content}
                </div>
                {!isAI && message.sender !== 'system' && (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center ml-2">
                    <span role="img" aria-label="You" className="text-green-600 text-sm">👤</span>
                  </div>
                )}
              </div>
            );
          })
        )}
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <span role="img" aria-label="AI" className="text-blue-600 text-sm">🤖</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your response..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="3"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={`px-4 py-2 rounded-lg ${
              inputValue.trim()
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-300'
            } text-white`}
          >
            Send
          </button>
        </div>
      </div>

      {/* Interview controls */}
      <div className="border-t flex-shrink-0">
        {!isInterviewActive && !isInterviewEnded && (
          <div className="p-4 bg-gray-50 text-center">
            {questionsLoading ? (
              <div className="text-gray-600">Loading interview questions...</div>
            ) : questionsError ? (
              <div className="text-red-600">Error: {questionsError}</div>
            ) : (
              <button
                onClick={handleStartInterview}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Start Interview
              </button>
            )}
          </div>
        )}

        {isInterviewEnded && (
          <div className="p-4 bg-gray-50 flex justify-center space-x-4">
            <button
              onClick={handleStartInterview}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Start New Interview
            </button>
            <button
              onClick={handleExportChat}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Export Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox; 