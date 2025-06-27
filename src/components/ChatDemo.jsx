import React, { useState } from 'react';
import { useChat } from '../hooks/useChat';

const ChatDemo = () => {
  const [currentRole, setCurrentRole] = useState('candidate');
  
  const {
    messages,
    inputValue,
    isTyping,
    hasMessages,
    messageCount,
    sendMessage,
    handleInputChange,
    clearChat,
    simulateAIResponse,
    addWelcomeMessage,
    addMessage
  } = useChat(currentRole);

  const handleSend = () => {
    const success = sendMessage();
    if (success && currentRole === 'candidate') {
      // Simulate AI response for demo
      simulateAIResponse();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const switchRole = () => {
    const newRole = currentRole === 'candidate' ? 'interviewer' : 'candidate';
    setCurrentRole(newRole);
    clearChat();
    setTimeout(() => addWelcomeMessage(newRole), 500);
  };

  const addSampleMessages = () => {
    addMessage("Hi there! This is a sample message.", currentRole);
    setTimeout(() => {
      addMessage("This is a response message that demonstrates auto-scroll and message wrapping for longer text content.", 'ai');
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Chat Demo</h2>
        <div className="flex space-x-2">
          <button
            onClick={switchRole}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Switch to {currentRole === 'candidate' ? 'Interviewer' : 'Candidate'}
          </button>
          <button
            onClick={addSampleMessages}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
          >
            Add Sample Messages
          </button>
          <button
            onClick={clearChat}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
          >
            Clear Chat
          </button>
        </div>
      </div>

      <div className="mb-4 p-2 bg-gray-100 rounded">
        <p className="text-sm">
          <strong>Current Role:</strong> {currentRole} | 
          <strong> Messages:</strong> {messageCount} | 
          <strong> Typing:</strong> {isTyping ? 'Yes' : 'No'}
        </p>
      </div>

      {/* Chat Messages */}
      <div className="h-64 overflow-y-auto border border-gray-300 rounded p-3 mb-4 space-y-2">
        {!hasMessages ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No messages yet. Send a message to start!</p>
          </div>
        ) : (
          <>
            {messages.map((message) => {
              const isOwn = message.sender === currentRole;
              return (
                <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2`}>
                  <div className="max-w-xs">
                    <div className={`px-3 py-2 rounded-lg break-words ${
                      isOwn 
                        ? 'bg-blue-500 text-white rounded-br-sm' 
                        : 'bg-gray-200 text-gray-800 rounded-bl-sm'
                    }`}>
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                      {message.sender} • {message.formattedTime}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isTyping}
        />
        <button
          onClick={handleSend}
          disabled={!inputValue.trim() || isTyping}
          className={`px-4 py-2 rounded font-medium ${
            !inputValue.trim() || isTyping
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Send
        </button>
      </div>

      {inputValue.length > 50 && (
        <div className="mt-1 text-xs text-gray-500 text-right">
          {inputValue.length} characters
        </div>
      )}

      <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
        <h3 className="font-semibold mb-2">Features Demonstrated:</h3>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>✅ Message input and send button</li>
          <li>✅ Message display from both users</li>
          <li>✅ Shared state management (useReducer)</li>
          <li>✅ Message structure: ID, sender, text, timestamp</li>
          <li>✅ Empty message prevention</li>
          <li>✅ Long message wrapping</li>
          <li>✅ Auto-scroll to latest message</li>
          <li>✅ Typing indicators</li>
          <li>✅ Enter key support</li>
          <li>✅ Role-based messaging</li>
        </ul>
      </div>
    </div>
  );
};

export default ChatDemo; 