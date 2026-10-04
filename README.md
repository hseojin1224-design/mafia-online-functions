# 🎭 마피아 온라인

Firebase + React를 기반으로 한 온라인 마피아 게임입니다.

## 📋 기능

- ✅ 사용자 인증 (Firebase Auth)
- ✅ 방 생성/입장
- ✅ AI 플레이어 지원
- ✅ 실시간 채팅
- ✅ 투표 시스템
- ✅ 마피아 비밀 채팅
- ✅ 낮/밤 페이즈
- ✅ 게임 결과

## 🚀 시작하기

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

### Firebase 설정

1. Firebase 콘솔에서 새 프로젝트 생성
2. `.env` 파일에 Firebase 설정 추가
```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

### 배포

```bash
# Firebase Hosting에 배포
npm run deploy
```

## 📁 구조

```
├── public/
│   └── index.html          # HTML 진입점
├── src/
│   ├── app.js              # 메인 앱
│   ├── app.css             # 스타일
│   ├── index.js            # React 진입점
│   └── pages/
│       ├── LoginPage.js    # 로그인 페이지
│       ├── RoomPage.js     # 방 관리 페이지
│       └── GamePage.js     # 게임 플레이 페이지
├── index.js                # 백엔드 함수
├── package.json
└── README.md
```

## 🎮 게임 규칙

### 역할
- **마피아**: 밤에 한 명을 제거
- **경찰**: 밤에 한 명을 보호 (개발 중)
- **의사**: 밤에 한 명을 치료 (개발 중)
- **시민**: 낮에 투표로 참여

### 페이즈
1. **대기**: 플레이어 입장
2. **낮**: 토론 후 투표로 한 명 탈락
3. **밤**: 마피아가 대상 선택
4. **종료**: 게임 결과 표시

## 📞 지원

문제가 발생하면 GitHub Issues에 보고해주세요.
