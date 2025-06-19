# 🎮 영어카드 매칭 게임 - English Card Matching Game

아이들을 위한 재미있는 영어 단어 학습 게임입니다!

## 🎯 게임 소개

카드를 뒤집어서 같은 의미의 영어-한국어 단어 쌍을 찾는 매칭 게임입니다.

### ✨ 주요 기능

- 🎴 **16개 영어 단어**와 이모지
- ⏰ **60초 타이머** 도전
- 🏆 **점수 시스템** (매칭 성공 시 100점)
- 💡 **힌트 기능** (점수 -20점)
- 🎉 **승리 애니메이션**
- 🔊 **사운드 효과**
- 📱 **반응형 디자인** (모바일/데스크톱)

### 🎲 게임 방법

1. "🚀 게임 시작" 버튼 클릭
2. 카드를 클릭해서 뒤집기
3. 영어 단어와 한국어 뜻이 같은 카드 2장 찾기
4. 60초 안에 8쌍 모두 매칭하면 승리!

### 📚 단어 목록

🍎 apple(사과), 📚 book(책), 🐱 cat(고양이), 🐶 dog(개), 🏠 house(집), 💧 water(물), ☀️ sun(태양), 🌙 moon(달), 🚗 car(자동차), 🌸 flower(꽃), 🎵 music(음악), 🍔 food(음식), 🌳 tree(나무), ❤️ heart(마음), ⭐ star(별), 🌧️ rain(비)

## 🚀 실행 방법

### 온라인 플레이
- **GitHub Pages**: [여기에 배포 URL 추가]
- **Cloudflare Pages**: [여기에 배포 URL 추가]

### 로컬 실행

```bash
# 레포지토리 클론
git clone [repository-url]
cd english-word-game

# 방법 1: 단순 HTTP 서버
python3 -m http.server 3000

# 방법 2: Node.js 서버
npm install
npm start
```

브라우저에서 `http://localhost:3000` 또는 `http://localhost:3333` 접속

## 🛠️ 기술 스택

- **HTML5** - 구조
- **CSS3** - 스타일링 (애니메이션, 반응형)
- **JavaScript (ES6+)** - 게임 로직
- **Web Audio API** - 사운드 효과

## 📁 파일 구조

```
english-word-game/
├── index.html          # 메인 HTML 파일
├── style.css          # CSS 스타일시트
├── script.js          # JavaScript 게임 로직
├── server.js          # Node.js 서버 (선택사항)
├── package.json       # 프로젝트 설정
└── README.md          # 프로젝트 문서
```

## 🎨 디자인 특징

- **어린이 친화적** Comic Sans MS 폰트
- **화려한 그라디언트** 배경과 버튼
- **부드러운 애니메이션** 카드 뒤집기, 매칭 효과
- **직관적인 UI** 큰 버튼과 명확한 피드백

## 📱 반응형 지원

- **데스크톱**: 4x4 그리드
- **태블릿**: 3x4 그리드 (768px 이하)
- **모바일**: 2x8 그리드 (480px 이하)

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

MIT License - 자유롭게 사용하세요!

## 🙏 감사

🤖 Generated with [Claude Code](https://claude.ai/code)

---

즐거운 영어 공부 되세요! 🌟