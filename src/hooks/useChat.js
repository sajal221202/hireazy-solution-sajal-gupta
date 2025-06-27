import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useChat = (userRole) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Add message to chat
  const addMessage = useCallback((content, sender, type = 'text') => {
    const newMessage = {
      id: uuidv4(),
      content,
      sender,
      type,
      timestamp: new Date(),
      formattedTime: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  // Add system message
  const addSystemMessage = useCallback((content) => {
    return addMessage(content, 'system', 'system');
  }, [addMessage]);

  // Send message
  const sendMessage = useCallback((content = inputValue, type = 'text') => {
    if (!content.trim() && type === 'text') return false;

    addMessage(content, userRole, type);
    if (type === 'text') {
      setInputValue('');
    }
    return true;
  }, [addMessage, inputValue, userRole]);

  // Handle input change
  const handleInputChange = useCallback((value) => {
    setInputValue(value);
  }, []);

  // Clear chat
  const clearChat = useCallback(() => {
    setMessages([]);
    setInputValue('');
    setIsTyping(false);
  }, []);

  // Add welcome message
  const addWelcomeMessage = useCallback((role) => {
    const welcomeMessage = role === 'candidate'
      ? "Welcome to your interview! I'll be asking you some questions. Please take your time to think and respond thoughtfully."
      : "Welcome! You can now chat with the candidate. Feel free to upload relevant documents or ask questions.";
    
    addMessage(welcomeMessage, 'ai');
  }, [addMessage]);

  // Simulate AI response (demo only)
  const simulateAIResponse = useCallback(() => {
    const responses = [
      "That's an interesting perspective. Could you elaborate more on that?",
      "Thank you for sharing. How would you handle a similar situation in a different context?",
      "I see. Can you give me a specific example from your experience?",
      "That's helpful. What would you do differently if you faced this challenge again?",
    ];

    setIsTyping(true);

    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, 'ai');
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  }, [addMessage]);

  return {
    messages,
    inputValue,
    isTyping,
    hasMessages: messages.length > 0,
    messageCount: messages.length,
    sendMessage,
    handleInputChange,
    clearChat,
    simulateAIResponse,
    addWelcomeMessage,
    addSystemMessage
  };
}; 