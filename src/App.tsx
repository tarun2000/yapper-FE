import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Chat from './components/Chat';

const App: React.FC = () => {
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage setRoom={setRoom} setUsername={setUsername} />} />
        <Route path="/chat/:roomId" element={<Chat room={room} username={username} />} />
      </Routes>
    </Router>
  );
};

export default App;
