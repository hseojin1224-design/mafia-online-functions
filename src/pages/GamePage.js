import React, { useState, useEffect } from 'react';

const GamePage = ({ user, roomCode, onLeave }) => {
  const [gameState, setGameState] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock game state for demo
  useEffect(() => {
    setTimeout(() => {
      setGameState({
        roomCode: roomCode,
        phase: 'day',
        phaseLabel: '낮 · 토론/투표',
        round: 1,
        isHost: true,
        alive: true,
        myRole: '경찰',
        players: [
          { uid: 'user1', nickname: '플레이어1', alive: true, isAI: false, isHost: true },
          { uid: 'user2', nickname: user.nickname, alive: true, isAI: false, isHost: false },
          { uid: 'ai1', nickname: 'AI 1', alive: true, isAI: true, isHost: false },
          { uid: 'ai2', nickname: 'AI 2', alive: true, isAI: true, isHost: false }
        ],
        messages: [
          { nickname: '플레이어1', text: '안녕하세요! 게임 시작합니다.', channelLabel: '전체' },
          { nickname: user.nickname, text: '좋아요!', channelLabel: '전체' }
        ],
        info: '낮이 시작됐어요. 대화 후 투표하세요.',
        results: ''
      });
      setLoading(false);
    }, 500);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setGameState(prev => ({
      ...prev,
      messages: [...prev.messages, {
        nickname: user.nickname,
        text: message,
        channelLabel: '전체'
      }]
    }));
    setMessage('');
  };

  const handleVote = (targetUid) => {
    setSelectedTarget(targetUid);
    alert(`${gameState.players.find(p => p.uid === targetUid)?.nickname}님에게 투표했습니다.`);
  };

  const handleAdvancePhase = () => {
    const phases = ['day', 'night', 'results', 'lobby'];
    const currentIndex = phases.indexOf(gameState.phase);
    const nextPhase = phases[(currentIndex + 1) % phases.length];
    
    setGameState(prev => ({
      ...prev,
      phase: nextPhase,
      phaseLabel: nextPhase === 'day' ? '낮 · 토론/투표' : 
                  nextPhase === 'night' ? '밤 · 마피아 행동' :
                  nextPhase === 'results' ? '게임 종료' : '대기 중',
      round: nextPhase === 'day' && gameState.phase !== 'night' ? prev.round : prev.round + 1
    }));
  };

  if (loading) {
    return (
      <div className="container centered">
        <div className="spinner"></div>
        <p>방에 입장 중...</p>
      </div>
    );
  }

  if (!gameState) return null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', padding: '20px' }}>
      {/* 왼쪽: 플레이어 목록 및 정보 */}
      <div>
        <div className="container" style={{ maxWidth: 'none' }}>
          <div className="phase-indicator">
            <div className="phase-label">{gameState.phaseLabel}</div>
            <div className="phase-round">라운드 {gameState.round}</div>
          </div>

          <div className="info-box">
            <strong>방 코드:</strong> {gameState.roomCode}<br/>
            <strong>내 역할:</strong> {gameState.myRole}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>플레이어</div>
            <div className="players-list">
              {gameState.players.map(player => (
                <div
                  key={player.uid}
                  className={`player-item ${!player.alive ? 'dead' : ''}`}
                  onClick={() => gameState.phase === 'day' && handleVote(player.uid)}
                  style={{
                    cursor: gameState.phase === 'day' && player.uid !== user.uid ? 'pointer' : 'default',
                    border: selectedTarget === player.uid ? '2px solid #667eea' : '2px solid transparent'
                  }}
                >
                  <div className="player-name">{player.nickname}</div>
                  {player.isHost && <div style={{ fontSize: '10px', color: '#f59e0b' }}>👑 방장</div>}
                  {player.isAI && <div style={{ fontSize: '10px', color: '#999' }}>🤖 AI</div>}
                  {gameState.phase === 'results' && <div className="player-role">{gameState.myRole === player.nickname ? gameState.myRole : '???'}</div>}
                </div>
              ))}
            </div>
          </div>

          {gameState.isHost && gameState.phase !== 'results' && (
            <button onClick={handleAdvancePhase} className="button margin-top">
              다음 단계로
            </button>
          )}

          <button onClick={onLeave} className="button secondary margin-top">
            방 나가기
          </button>
        </div>
      </div>

      {/* 오른쪽: 채팅 */}
      <div>
        <div className="container" style={{ maxWidth: 'none', padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', borderBottom: '2px solid #e0e0e0' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>채팅</div>
          </div>

          <div className="chat-messages">
            {gameState.messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.channelLabel === '마피아 비밀' ? 'mafia' : ''}`}>
                <div className="chat-nickname">{msg.nickname} <span style={{ fontSize: '10px', color: '#999' }}>({msg.channelLabel})</span></div>
                <div className="chat-text">{msg.text}</div>
              </div>
            ))}
          </div>

          {gameState.alive && gameState.phase !== 'lobby' && gameState.phase !== 'results' && (
            <form onSubmit={handleSendMessage}>
              <div className="chat-input">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  maxLength="300"
                />
                <button type="submit">전송</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;