class EnglishCardMatchingGame {
    constructor() {
        this.vocabulary = [
            { english: 'apple', korean: '사과', emoji: '🍎' },
            { english: 'book', korean: '책', emoji: '📚' },
            { english: 'cat', korean: '고양이', emoji: '🐱' },
            { english: 'dog', korean: '개', emoji: '🐶' },
            { english: 'house', korean: '집', emoji: '🏠' },
            { english: 'water', korean: '물', emoji: '💧' },
            { english: 'sun', korean: '태양', emoji: '☀️' },
            { english: 'moon', korean: '달', emoji: '🌙' },
            { english: 'car', korean: '자동차', emoji: '🚗' },
            { english: 'flower', korean: '꽃', emoji: '🌸' },
            { english: 'music', korean: '음악', emoji: '🎵' },
            { english: 'food', korean: '음식', emoji: '🍔' },
            { english: 'tree', korean: '나무', emoji: '🌳' },
            { english: 'heart', korean: '마음', emoji: '❤️' },
            { english: 'star', korean: '별', emoji: '⭐' },
            { english: 'rain', korean: '비', emoji: '🌧️' }
        ];
        
        this.gameCards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.score = 0;
        this.timeLeft = 60;
        this.gameStarted = false;
        this.gameTimer = null;
        this.startTime = null;
        
        this.initializeElements();
        this.bindEvents();
    }
    
    initializeElements() {
        this.gameBoard = document.getElementById('game-board');
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.matchesElement = document.getElementById('matches');
        this.startBtn = document.getElementById('start-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.hintBtn = document.getElementById('hint-btn');
        this.gameOverModal = document.getElementById('game-over');
        this.gameResult = document.getElementById('game-result');
        this.finalScore = document.getElementById('final-score');
        this.timeTaken = document.getElementById('time-taken');
        this.playAgainBtn = document.getElementById('play-again-btn');
        this.victoryAnimation = document.getElementById('victory-animation');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.hintBtn.addEventListener('click', () => this.showHint());
        this.playAgainBtn.addEventListener('click', () => this.startGame());
    }
    
    startGame() {
        this.gameStarted = true;
        this.startTime = Date.now();
        this.matchedPairs = 0;
        this.score = 0;
        this.timeLeft = 60;
        this.flippedCards = [];
        
        this.gameOverModal.classList.add('hidden');
        this.victoryAnimation.classList.add('hidden');
        
        this.createGameCards();
        this.startTimer();
        this.updateDisplay();
        
        this.startBtn.disabled = true;
        this.hintBtn.disabled = false;
        
        this.playSound('start');
    }
    
    createGameCards() {
        const selectedWords = this.vocabulary.slice(0, 8);
        this.gameCards = [];
        
        selectedWords.forEach((word, index) => {
            this.gameCards.push({
                id: index * 2,
                type: 'english',
                word: word.english,
                matchId: index,
                emoji: word.emoji,
                matched: false
            });
            
            this.gameCards.push({
                id: index * 2 + 1,
                type: 'korean',
                word: word.korean,
                matchId: index,
                emoji: word.emoji,
                matched: false
            });
        });
        
        this.shuffleArray(this.gameCards);
        this.renderCards();
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    renderCards() {
        this.gameBoard.innerHTML = '';
        
        this.gameCards.forEach(cardData => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.dataset.cardId = cardData.id;
            cardElement.innerHTML = `
                <div class="card-inner">
                    <div class="card-front"></div>
                    <div class="card-back">
                        <div class="card-emoji">${cardData.emoji}</div>
                        <div class="card-word">${cardData.word}</div>
                    </div>
                </div>
            `;
            
            cardElement.addEventListener('click', () => this.flipCard(cardData.id));
            this.gameBoard.appendChild(cardElement);
        });
    }
    
    flipCard(cardId) {
        if (!this.gameStarted) return;
        
        const cardData = this.gameCards.find(card => card.id === cardId);
        const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
        
        if (cardData.matched || this.flippedCards.includes(cardId) || this.flippedCards.length >= 2) {
            return;
        }
        
        cardElement.classList.add('flipped');
        this.flippedCards.push(cardId);
        this.playSound('flip');
        
        if (this.flippedCards.length === 2) {
            setTimeout(() => this.checkMatch(), 800);
        }
    }
    
    checkMatch() {
        const [firstId, secondId] = this.flippedCards;
        const firstCard = this.gameCards.find(card => card.id === firstId);
        const secondCard = this.gameCards.find(card => card.id === secondId);
        
        if (firstCard.matchId === secondCard.matchId) {
            this.handleMatch(firstCard, secondCard);
        } else {
            this.handleMismatch();
        }
    }
    
    handleMatch(firstCard, secondCard) {
        firstCard.matched = true;
        secondCard.matched = true;
        this.matchedPairs++;
        this.score += 100;
        
        const firstElement = document.querySelector(`[data-card-id="${firstCard.id}"]`);
        const secondElement = document.querySelector(`[data-card-id="${secondCard.id}"]`);
        
        firstElement.classList.add('matched');
        secondElement.classList.add('matched');
        
        this.flippedCards = [];
        this.updateDisplay();
        this.playSound('match');
        
        if (this.matchedPairs === 8) {
            setTimeout(() => this.endGame(true), 500);
        }
    }
    
    handleMismatch() {
        const [firstId, secondId] = this.flippedCards;
        const firstElement = document.querySelector(`[data-card-id="${firstId}"]`);
        const secondElement = document.querySelector(`[data-card-id="${secondId}"]`);
        
        firstElement.classList.add('shake');
        secondElement.classList.add('shake');
        
        setTimeout(() => {
            firstElement.classList.remove('flipped', 'shake');
            secondElement.classList.remove('flipped', 'shake');
            this.flippedCards = [];
        }, 600);
        
        this.playSound('wrong');
    }
    
    startTimer() {
        this.gameTimer = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.endGame(false);
            }
        }, 1000);
    }
    
    endGame(isWin) {
        this.gameStarted = false;
        clearInterval(this.gameTimer);
        
        const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);
        
        if (isWin) {
            this.score += this.timeLeft * 10;
            this.gameResult.textContent = '🎉 축하합니다! 승리! 🎉';
            this.victoryAnimation.classList.remove('hidden');
            this.playSound('win');
        } else {
            this.gameResult.textContent = '⏰ 시간이 다 됐어요! 다시 도전해보세요!';
            this.playSound('lose');
        }
        
        this.finalScore.textContent = `최종 점수: ${this.score}점`;
        this.timeTaken.textContent = `걸린 시간: ${timeTaken}초`;
        
        setTimeout(() => {
            this.gameOverModal.classList.remove('hidden');
        }, 1000);
        
        this.startBtn.disabled = false;
        this.hintBtn.disabled = true;
    }
    
    showHint() {
        if (!this.gameStarted || this.flippedCards.length > 0) return;
        
        const unmatchedCards = this.gameCards.filter(card => !card.matched);
        if (unmatchedCards.length < 2) return;
        
        const randomCard = unmatchedCards[Math.floor(Math.random() * unmatchedCards.length)];
        const matchingCard = unmatchedCards.find(card => 
            card.matchId === randomCard.matchId && card.id !== randomCard.id
        );
        
        if (matchingCard) {
            const hintElement1 = document.querySelector(`[data-card-id="${randomCard.id}"]`);
            const hintElement2 = document.querySelector(`[data-card-id="${matchingCard.id}"]`);
            
            hintElement1.style.border = '3px solid #ffd700';
            hintElement2.style.border = '3px solid #ffd700';
            
            setTimeout(() => {
                hintElement1.style.border = '';
                hintElement2.style.border = '';
            }, 2000);
            
            this.score = Math.max(0, this.score - 20);
            this.updateDisplay();
        }
    }
    
    resetGame() {
        this.gameStarted = false;
        clearInterval(this.gameTimer);
        
        this.gameBoard.innerHTML = '';
        this.gameOverModal.classList.add('hidden');
        this.victoryAnimation.classList.add('hidden');
        
        this.startBtn.disabled = false;
        this.hintBtn.disabled = true;
        
        this.score = 0;
        this.matchedPairs = 0;
        this.timeLeft = 60;
        this.flippedCards = [];
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.timerElement.textContent = this.timeLeft;
        this.matchesElement.textContent = this.matchedPairs;
    }
    
    playSound(type) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch(type) {
            case 'flip':
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
            case 'match':
                oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
            case 'wrong':
                oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
            case 'win':
                oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.5);
                break;
            case 'start':
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
        }
    }
    
}

// 게임 시작
document.addEventListener('DOMContentLoaded', () => {
    const game = new EnglishCardMatchingGame();
});