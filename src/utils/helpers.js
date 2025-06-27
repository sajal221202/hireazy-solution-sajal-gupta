import { v4 as uuidv4 } from 'uuid';

// Generate unique message IDs
export const generateMessageId = () => {
  return uuidv4();
};

// Format timestamp for messages
export const formatTimestamp = (date = new Date()) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Create message object structure
export const createMessage = (content, sender = 'user', type = 'text') => {
  return {
    id: generateMessageId(),
    content,
    sender,
    type,
    timestamp: new Date(),
    formattedTime: formatTimestamp()
  };
};

// Debounce function for input handling
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}; 