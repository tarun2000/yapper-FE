import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC<{ setRoom: (room: string) => void; setUsername: (username: string) => void }> = ({
  setRoom,
  setUsername,
}) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [privateRoom, setPrivateRoom] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const navigate = useNavigate();

  const commonRooms = ['General', 'Gaming', 'Music', 'Tech'];

  const handleJoinRoom = () => {
    if (usernameInput && (selectedRoom || privateRoom)) {
      const roomToJoin = privateRoom || selectedRoom;
      setRoom(roomToJoin);
      setUsername(usernameInput);
      navigate(`/chat/${roomToJoin}`);
    } else {
      alert('Please enter your username and select or create a room.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col justify-center items-center text-gray-200">
      <h1 className="text-4xl font-bold mb-6">Welcome to Yapper</h1>
      <input
        type="text"
        placeholder="Enter your username"
        className="mb-4 px-4 py-2 w-80 rounded-lg bg-gray-700 text-gray-200 focus:outline-none"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
      />
      <div className="flex flex-col w-80 mb-4">
        <label className="mb-2 text-gray-400">Select a common room:</label>
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none"
        >
          <option value="">-- Select a room --</option>
          {commonRooms.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-80 mb-4">
        <label className="mb-2 text-gray-400">Or create your own private room:</label>
        <input
          type="text"
          placeholder="Enter room name"
          className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none"
          value={privateRoom}
          onChange={(e) => setPrivateRoom(e.target.value)}
        />
      </div>
      <button
        onClick={handleJoinRoom}
        className="px-6 py-2 bg-pastel-purple hover:bg-pastel-teal text-gray-900 rounded-lg shadow-md"
      >
        Join Room
      </button>
    </div>
  );
};

export default LandingPage;
