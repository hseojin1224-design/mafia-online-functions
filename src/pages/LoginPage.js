import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    onLogin({
      uid: 'user_' + Date.now(),
      nickname: nickname.trim()
    });
  };

  return (
    <div className="container">
      <div className="title">🎭 마피아 온라인</div>
      <div className="subtitle">함께하는 마피아 게임</div>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="게임에서 사용할 닉네임을 입력하세요"
            maxLength="16"
          />
        </div>
        <button type="submit" className="button">게임 시작</button>
      </form>
    </div>
  );
};

export default LoginPage;