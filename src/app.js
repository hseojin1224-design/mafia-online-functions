// Mafia Online Game - Main App
import React, { useState, useEffect } from 'react';
import './app.css';
import LoginPage from './pages/LoginPage';
import RoomPage from './pages/RoomPage';
import GamePage from './pages/GamePage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('room');
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentPage('room');
  };

  const handleLogout = () => {
    setUser(null);
    setRoomCode(null);
    localStorage.removeItem('user');
    setCurrentPage('login');
  };

  const handleJoinRoom = (code) => {
    setRoomCode(code);
    setCurrentPage('game');
  };

  const handleLeaveRoom = () => {
    setRoomCode(null);
    setCurrentPage('room');
  };

  return (
    <div className="app">
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
      {currentPage === 'room' && user && <RoomPage user={user} onLogout={handleLogout} onJoinRoom={handleJoinRoom} />}
      {currentPage === 'game' && user && roomCode && <GamePage user={user} roomCode={roomCode} onLeave={handleLeaveRoom} />}
    </div>
  );
};

export default App;