const baseColors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
        let targetColor;
        let score = 0;
        let highScore = 0;
        let timer;
        let timeLeft = 10;
        let lives = 3; 
        
        const colorBox = document.getElementById('colorBox');
        const gameStatus = document.getElementById('gameStatus');
        const scoreDisplay = document.getElementById('score');
        const highScoreDisplay = document.getElementById('highScore');
        const timerDisplay = document.getElementById('timer');
        const livesDisplay = document.getElementById('lives');
        const colorOptions = document.getElementById('colorOptions');
        const newGameButton = document.getElementById('newGameButton');
        const gameOverOverlay = document.getElementById('gameOverOverlay');
        const overlayButton = document.getElementById('overlayButton');
        const gameOverMessage = document.getElementById('gameOverMessage');

        function setupGame() {
            targetColor = getRandomColor();
            colorBox.style.backgroundColor = targetColor;
            generateColorOptions();
            gameStatus.textContent = 'Guess the color!';
            gameStatus.style.opacity = 0;
            updateScore();
            updateLives();
            startTimer();
        }

        function getRandomColor() {
            return baseColors[Math.floor(Math.random() * baseColors.length)];
        }

        function generateColorOptions() {
            colorOptions.innerHTML = '';
            const options = [targetColor];

            while (options.length < 6) {
                const randomColor = getRandomShade(targetColor);
                if (!options.includes(randomColor)) {
                    options.push(randomColor);
                }
            }

            options.sort(() => Math.random() - 0.5);
            options.forEach(color => {
                const button = document.createElement('button');
                button.className = 'color-button';
                button.style.backgroundColor = color;
                button.setAttribute('data-testid', 'colorOption');
                button.onclick = () => handleGuess(color);
                colorOptions.appendChild(button);
            });
        }

        function getRandomShade(color) {
            const shades = {
                'red': ['#FFCCCC', '#FF9999', '#FF6666', '#FF3333', '#FF0000'],
                'green': ['#CCFFCC', '#99FF99', '#66FF66', '#33FF33', '#00FF00'],
                'blue': ['#CCCCFF', '#9999FF', '#6666FF', '#3333FF', '#0000FF'],
                'yellow': ['#FFFFCC', '#FFFF99', '#FFFF66', '#FFFF33', '#FFFF00'],
                'purple': ['#E6CCFF', '#D699FF', '#B366FF', '#9933FF', '#8000FF'],
                'orange': ['#FFCC99', '#FFB266', '#FF9933', '#FF8000', '#FF6600']
            };
            const shadesArray = shades[color];
            return shadesArray[Math.floor(Math.random() * shadesArray.length)];
        }

        function handleGuess(color) {
            clearInterval(timer);
            if (color === targetColor) {
                gameStatus.textContent = 'Correct!';
                score++;
                if (score > highScore) {
                    highScore = score;
                }
                animateGameStatus('correct');
                setTimeout(setupGame, 1000);
            } else {
                lives--;
                if (lives <= 0) {
                    gameOver();
                } else {
                    gameStatus.textContent = 'Wrong! Try again.';
                    updateLives();
                    animateGameStatus('wrong');
                    setTimeout(() => {
                        setupGame();
                    }, 1000);
                }
            }
            updateScoreDisplay();
        }

        function animateGameStatus(result) {
            gameStatus.style.opacity = 1;
            setTimeout(() => {
                gameStatus.style.opacity = 0;
            }, 1000);
        }

        function updateScore() {
            scoreDisplay.textContent = `Score: ${score}`;
            highScoreDisplay.textContent = `High Score: ${highScore}`;
        }

        function updateLives() {
            livesDisplay.textContent = lives;
        }

        function updateScoreDisplay() {
            scoreDisplay.textContent = `Score: ${score}`;
            highScoreDisplay.textContent = `High Score: ${highScore}`;
        }

        function startTimer() {
            timeLeft = 10;
            timerDisplay.textContent = `Time: ${timeLeft}`;
            timerDisplay.classList.remove('bouncing'); 
            timerDisplay.style.color = 'white';
            timer = setInterval(() => {
                timeLeft--;
                timerDisplay.textContent = `Time: ${timeLeft}`;
                if (timeLeft === 5) {
                    timerDisplay.classList.add('bouncing');
                    timerDisplay.style.color = 'red';
                }
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    gameOver();
                }
            }, 1000);
        }

        function gameOver() {
            clearInterval(timer);
            const messages = [
                "Oops! Your color vision needs some serious help! Try again!",
                "Game Over! Looks like your eyes took a coffee break. Let's play again!",
                "Uh-oh! You painted yourself into a corner! Time for a rematch!",
                "You’ve run out of lives! Time to consult a color guru. Want to try again?",
                "Color me surprised! You’ve lost! Let’s see if you can do better next time!",
                "Oops! Your color guessing skills just hit a wall! Ready for another round?",
                "Game Over! Your color intuition is on vacation. Shall we bring it back?",
                "Yikes! Your color choices were like a toddler's art project! Let's try again!",
                "Looks like your color sense went on a holiday! Ready to give it another shot?",
                "Uh-oh! You’ve lost the color battle! Want to jump back in the ring?"
            ];
            
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            gameOverOverlay.style.display = 'flex';
            gameOverMessage.textContent = randomMessage; 
            score = 0;
            updateScore();
            updateScoreDisplay();
        }

        newGameButton.onclick = () => {
            score = 0;
            lives = 3;
            clearInterval(timer);
            setupGame();
        };

        overlayButton.onclick = () => {
            gameOverOverlay.style.display = 'none'; 
            lives = 3; 
            setupGame(); 
        };

        
        setupGame();