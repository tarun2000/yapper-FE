import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  username: string;
  message: string;
}

const Chat: React.FC<{ room: string; username: string }> = ({ room, username }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    ws.onopen = () => {
      const joinPayload = JSON.stringify({
        type: 'join',
        payload: { roomId: room, username },
      });
      ws.send(joinPayload);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.username && data.message) {
        setMessages((prevMessages) => [...prevMessages, { username: data.username, message: data.message }]);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from server.');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [room, username]);

  const sendMessage = () => {
    if (socket && newMessage.trim()) {
      const chatPayload = JSON.stringify({
        type: 'chat',
        payload: { message: newMessage },
      });
      socket.send(chatPayload);
      setNewMessage('');
    }
  };

  const disconnectRoom = () => {
    if (socket) {
      socket.close();
    }
    navigate('/');
  };

  const copyRoomInfo = () => {
    const appUrl = window.location.origin;
    const message = `Hey, I would like you to join me on Yapper. Here's my room ID: ${room}. App link: ${appUrl}`;
    navigator.clipboard.writeText(message).then(() => {
      alert('Room info copied to clipboard!');
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 shadow-md">
        <button
          onClick={copyRoomInfo}
          className="text-pastel-blue hover:text-pastel-teal font-bold text-lg"
        >
          {room}
        </button>
        <h1 className="text-pastel-purple font-extrabold text-xl">Yapper</h1>
        <button
          onClick={disconnectRoom}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Disconnect
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`p-3 rounded-lg shadow-md ${
                msg.username === username
                  ? 'bg-pastel-teal text-gray-900 self-end'
                  : 'bg-gray-800 text-gray-200 self-start'
              }`}
            >
              <span
                className={`font-bold ${
                  msg.username === username ? 'text-gray-900' : 'text-pastel-blue'
                }`}
              >
                {msg.username}
              </span>
              : {msg.message}
            </li>
          ))}
        </ul>
      </div>

      {/* Input */}
      <div className="flex items-center p-4 bg-gray-800">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-l-lg bg-gray-700 text-gray-200 focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-pastel-teal hover:bg-pastel-blue text-gray-900 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
