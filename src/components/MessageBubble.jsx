import React from 'react';

const MessageBubble = ({ message, isOwn, senderName }) => {
  const bubbleStyle = isOwn
    ? 'bg-blue-500 text-white rounded-lg rounded-br-sm'
    : 'bg-gray-200 text-gray-800 rounded-lg rounded-bl-sm';

  const containerStyle = isOwn
    ? 'flex justify-end mb-4'
    : 'flex justify-start mb-4';

  const infoStyle = isOwn
    ? 'text-right text-xs text-gray-500 mt-1'
    : 'text-left text-xs text-gray-500 mt-1';

  return (
    <div className={containerStyle}>
      <div className="max-w-xs lg:max-w-md">
        <div className={`${bubbleStyle} px-4 py-2 break-words`}>
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <div className={infoStyle}>
          <span className="font-medium">{senderName}</span>
          {' • '}
          <span>{message.formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble; 