import React, { useState } from 'react';

const RoomPage = ({ user, onLogout, onJoinRoom }) => {
  const [activeTab, setActiveTab] = useState('create');
  const [roomCode, setRoomCode] = useState('');
  const [capacity, setCapacity] = useState('8');
  const [aiCount, setAiCount] = useState('0');
  const [createdCode, setCreatedCode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const generateRoomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (Number(capacity) < 4 || Number(capacity) > 15) {
      setError('인원은 4~15명이어야 합니다.');
      return;
    }

    const code = generateRoomCode();
    setCreatedCode(code);
    setMessage(`방이 생성되었습니다! 코드: ${code}`);
    setTimeout(() => {
      onJoinRoom(code);
    }, 1500);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    setError('');
    
    if (!roomCode.trim()) {
      setError('방 코드를 입력해주세요.');
      return;
    }

    if (!/^[A-Z0-9]{6}$/.test(roomCode.toUpperCase())) {
      setError('방 코드는 6자리여야 합니다.');
      return;
    }

    onJoinRoom(roomCode.toUpperCase());
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div className="title" style={{ marginBottom: 0, flex: 1 }}>🎭 마피아 온라인</div>
        <button onClick={onLogout} className="button secondary" style={{ width: 'auto', padding: '8px 16px' }}>
          로그아웃
        </button>
      </div>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <span style={{ color: '#999', fontSize: '14px' }}>안녕하세요, <strong>{user.nickname}</strong>님!</span>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('create')}
          className={`button ${activeTab === 'create' ? '' : 'secondary'}`}
        >
          방 만들기
        </button>
        <button
          onClick={() => setActiveTab('join')}
          className={`button ${activeTab === 'join' ? '' : 'secondary'}`}
        >
          방 입장
        </button>
      </div>

      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}

      {activeTab === 'create' && (
        <form onSubmit={handleCreateRoom}>
          <div className="form-group">
            <label>최대 인원</label>
            <select
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            >
              {[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(n => (
                <option key={n} value={n}>{n}명</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>AI 플레이어</label>
            <select
              value={aiCount}
              onChange={(e) => setAiCount(e.target.value)}
            >
              {[0, 1, 2, 3, 4].map(n => (
                <option key={n} value={n}>{n}명</option>
              ))}
            </select>
          </div>
          <button type="submit" className="button">방 만들기</button>
        </form>
      )}

      {activeTab === 'join' && (
        <form onSubmit={handleJoinRoom}>
          <div className="form-group">
            <label>방 코드</label>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="예: ABC123"
              maxLength="6"
            />
          </div>
          <button type="submit" className="button">입장하기</button>
        </form>
      )}
    </div>
  );
};

export default RoomPage;