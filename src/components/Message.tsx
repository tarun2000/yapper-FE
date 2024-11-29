import React from 'react';

interface MessageProps {
    text: string;
    isOwnMessage?: boolean; // Optional: to style differently for sender's messages
}

const Message: React.FC<MessageProps> = ({ text, isOwnMessage = false }) => {
    return (
        <div
            className={`p-3 rounded-lg shadow-md mb-2 max-w-md ${
                isOwnMessage
                    ? 'bg-blue-500 text-white self-end'
                    : 'bg-white text-gray-800'
            }`}
        >
            {text}
        </div>
    );
};

export default Message;
