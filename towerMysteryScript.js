let currentPosition = 0; //Player's tower Level
let randomNumber = Math.floor(Math.random() * 25) + 1; // Initialize random number

//Task 3 jumbled sentences
const sentences = [
    'the cat sat on the mat',
    'i love to play soccer',
    'the sun rises in the east',
    'singing is a musical art',
    'i like to read stories',
    'the dog barks in the park',
    'the quick brown fox jumps over the lazy dog'
];
let currentSentence = '';
let jumbledSentence = '';

function spin() {
    const diceNumbers = document.querySelectorAll('.diceNumber');
    const spinButton = document.getElementById('spinButton');
    spinButton.disabled = true; // Disable the spin button when clicked
    let currentIndex = 0;
    const spinDuration = 1500;
    let startTime = null;

    function animateSpin(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        // Spin animate by continuous blinking
        diceNumbers.forEach(cell => cell.classList.remove('glow'));
        diceNumbers[currentIndex].classList.add('glow');

        if (elapsed < spinDuration) {
            currentIndex = (currentIndex + 1) % diceNumbers.length;
            requestAnimationFrame(animateSpin);
        } else {
            const randomIndex = Math.floor(Math.random() * diceNumbers.length);
            diceNumbers.forEach(cell => cell.classList.remove('glow'));
            diceNumbers[randomIndex].classList.add('glow');
            moveButtonToTower(parseInt(diceNumbers[randomIndex].innerText));
        }
    }
    requestAnimationFrame(animateSpin);
}

function moveButtonToTower(diceValue) {
    const towerSpots = document.querySelectorAll('.towerspot');
    // Only update the spot text if it's not the Start position
    if (currentPosition !== 0) {
        document.getElementById(`spot${currentPosition}`).innerText = currentPosition;
    }
    // Add glow to the selected position on tower
    currentPosition = Math.min(currentPosition + diceValue, towerSpots.length - 1);
    document.getElementById(`spot${currentPosition}`).classList.add('glow');

    // Display the corresponding task div
    function getTaskDiv(currentPosition) {
    switch (currentPosition) {
        case 1:
        case 11:
            return 'task1';
        case 2:
        case 13:
            return 'task2';
        case 3:
        case 10:
            return 'task3';
        case 5:
            return 'task5';
        case 6:
        case 12:
            return 'task6';
        case 8:
        case 15:
            return 'task8';
        case 4:
        case 7:
        case 9:
        case 14:
            return 'task4';
        case 16:
            return 'task9'
        default:
            return null;
    }
}

const taskDiv = document.getElementById(getTaskDiv(currentPosition));
    if (taskDiv) {
        taskDiv.style.display = 'block';
        taskDiv.querySelector('.enableSpin').onclick = function() {
            document.getElementById('spinButton').disabled = false; // Enable the spin button again
            taskDiv.style.display = 'none'; // Hide the task div again
            if(taskDiv != task4) {
                taskDiv.querySelector('.enableSpin').style.display = 'none';
            }
        };
        // Reset random number for guessing game when moving to that task
        if (currentPosition === 2 || currentPosition === 13) {
            randomNumber = Math.floor(Math.random() * 25) + 1; // Reset random number
        } else if (currentPosition === 3 || currentPosition === 10) {
            newSentence(); // Initialize the jumbled sentence game
        } else if (currentPosition === 12) {
            getRandomQuestion(); // Get a new trivia question when moving to task 6
            document.getElementById('result').innerText = ''; // Clear previous result
        }
    }
}

function playRPC(userChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result = '';
    if (userChoice === computerChoice) {
        result = `It's a tie! You both chose ${userChoice}.`;
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = `You win! ${userChoice} beats ${computerChoice}.`;
        document.getElementById('t1enableSpin').style.display = 'block'; // Show spin again button
    } else {
        result = `You lose! ${computerChoice} beats ${userChoice}.`;
        document.getElementById('t1enableSpin').style.display = 'none'; // Hide spin again button
    }
    document.getElementById('task1result').innerText = result;
    document.getElementById('time-choice').innerText = `Time master chose: ${computerChoice}`;
}

document.getElementById('guess').addEventListener('input', function() {
    const input = document.getElementById('guess').value;
    document.getElementById('guessValue').innerText = input;
});

function checkNumberGuess() {
    const userGuess = parseInt(document.getElementById('guess').value);
    const resultDiv = document.getElementById('task2result');
    if (userGuess === randomNumber) {
        resultDiv.innerText = "Congratulations! You guessed the right number!";
        document.getElementById('t2enableSpin').style.display = 'block'; // Show spin again button
    } else if (userGuess < randomNumber) {
        resultDiv.innerText = "Too low! Try again.";
    } else {
        resultDiv.innerText = "Too high! Try again.";
    }
}

function jumbleSentence(sentence) {
    return sentence.split(' ').sort(() => Math.random() - 0.5).join(' ');
}

function newSentence() {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    currentSentence = sentences[randomIndex];
    jumbledSentence = jumbleSentence(currentSentence);
    document.getElementById('jumbled-sentence').innerText = jumbledSentence;
    document.getElementById('task3result').innerText = ''; // Corrected line
    document.getElementById('task3input').value = '';
}

function task3checkAnswer() {
    const userInput = document.getElementById('task3input').value;
    if (userInput.toLowerCase() === currentSentence) {
        document.getElementById('task3result').innerText = 'Correct! 🎉';
        document.getElementById('t3enableSpin').style.display = 'block';
    } else {
        document.getElementById('task3result').innerText = 'Try again!';
    }
}

const maze = [
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 1, 1, 1, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
];

let playerPosition = { x: 0, y: 0 };
const endPosition = { x: 9, y: 9 }; // End position
const messageElement = document.getElementById('task5message');
function drawMaze() {
    const mazeElement = document.getElementById('maze');
    mazeElement.innerHTML = '';
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (maze[row][col] === 1) {
                cell.classList.add('wall');
            }
            if (row === playerPosition.y && col === playerPosition.x) {
                cell.classList.add('player');
            }
            if (row === 0 && col === 0) {
                cell.classList.add('start'); // Mark start
            }
            if (row === endPosition.y && col === endPosition.x) {
                cell.classList.add('end'); // Mark end
            }
            mazeElement.appendChild(cell);
        }
    }
    checkWin(); // Check if the maze is solved
}

function move(direction) {
    const { x, y } = playerPosition;
    if (direction === 'up' && y > 0 && maze[y - 1][x] === 0) {
        playerPosition.y--;
    } else if (direction === 'down' && y < maze.length - 1 && maze[y + 1][x] === 0) {
        playerPosition.y++;
    } else if (direction === 'left' && x > 0 && maze[y][x - 1] === 0) {
        playerPosition.x--;
    } else if (direction === 'right' && x < maze[y].length - 1 && maze[y][x + 1] === 0) {
        playerPosition.x++;
    }
    drawMaze();
}

function checkWin() {
    if (playerPosition.x === endPosition.x && playerPosition.y === endPosition.y) {
        messageElement.textContent = 'Congratulations! You solved the maze!';
        document.getElementById('t5enableSpin').style.display = 'block';
    } else {
        messageElement.textContent = ''; // Clear message if not solved
    }
}
drawMaze();

const questions = [
    {
        question: 'What fruit is known to float on water?',
        options: ['Banana', 'Apple', 'Watermelon', 'Grape'],
        answer: 'c'
    },
    {
        question: 'Which country has a festival dedicated to the throwing of tomatoes?',
        options: ['Italy', 'Spain', 'Mexico', 'Brazil'],
        answer: 'b'
    },
    {
        question: 'What is the most stolen food item in the world?',
        options: ['Cheese', 'Chocolate', 'Bread', 'Apples'],
        answer: 'a'
    },
    {
        question: 'Which animal can sleep for up to three years?',
        options: ['Bear', 'Sloth', 'Koala', 'Snail'],
        answer: 'd'
    },
    {
        question: 'What is the name of the phobia that involves an irrational fear of long words?',
        options: ['Logophobia', 'Verbophobia', 'Sesquipedalophobia', 'Hippopotomonstrosesquippedaliophobia'],
        answer: 'd'
    },
    {
        question: 'Which planet is known for having a day longer than its year?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        answer: 'a'
    },
    {
        question: 'Which animal is known to have the largest brain relative to its body size?',
        options: ['Blue whale', 'Elephant', 'Ant', 'Octopus'],
        answer: 'c'
    },
    {
        question: 'What is the name of the largest living organism on Earth?',
        options: ['Blue whale', 'Honey fungus', 'Giant sequoia', 'Great barrier reef'],
        answer: 'b'
    }
];

let currentQuestion = {};
function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = `
        <div class="question">
            <p>${currentQuestion.question}</p>
            <ul class="options">
                ${currentQuestion.options.map((option, index) => `<li><input type="radio" name="option" value="${String.fromCharCode(97 + index)}"> ${option}</li>`).join('')}
            </ul>
        </div>
    `;
}

function task6checkAnswer() {
    const userAnswer = document.querySelector('input[name="option"]:checked');
    if (userAnswer && userAnswer.value === currentQuestion.answer) {
        document.getElementById('result').innerText = 'Correct! 🎉';
        document.getElementById('t6enableSpin').style.display = 'block';
    } else {
        document.getElementById('result').innerText = 'Try again!';
    }
}

// Start the quiz
getRandomQuestion();

const colors = ['red', 'green', 'blue', 'yellow'];
let sequence = [];
let playerSequence = [];
let level = 0;

const task8message = document.getElementById('task8message');
const startButton = document.getElementById('task8start');

startButton.addEventListener('click', task8startGame);

function task8startGame() {
    level = 0;
    sequence = [];
    task8message.textContent = '';
    nextSequence();
}

function nextSequence() {
    if (level < 5) {
        level++;
        playerSequence = [];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(randomColor);
        showSequence();
    } else {
        task8message.textContent = 'Congratulations! You completed the game!';
        document.getElementById('t8enableSpin').style.display = 'block';
    }
}

function nextSequence() {
    if (level < 5) {
        level++;
        playerSequence = [];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(randomColor);
        showNextStep(randomColor); // Show only the next step
    } else {
        task8message.textContent = 'Congratulations! You completed the game!';
        document.getElementById('t8enableSpin').style.display = 'block';
    }
}

function showNextStep(color) {
    flashColor(color); // Flash the next color
    setTimeout(() => {
        enableClick(); // Enable user to click after showing the color
    }, 1000); // Wait for 1 second before enabling clicks
}

function flashColor(color) {
    const colorDiv = document.getElementById(color);
    colorDiv.style.opacity = '1';
    setTimeout(() => {
        colorDiv.style.opacity = '0.4'; // Darken the color
    }, 500);
}

function enableClick() {
    colors.forEach(color => {
        document.getElementById(color).addEventListener('click', handleClick);
    });
}

function handleClick(event) {
    const clickedColor = event.target.id;
    playerSequence.push(clickedColor);
    flashColor(clickedColor);
    checkSequence(playerSequence.length - 1);
}

function checkSequence(index) {
    if (playerSequence[index] !== sequence[index]) {
        task8message.textContent = 'Wrong! Try again.';
        task8resetGame();
    } else if (playerSequence.length === sequence.length) {
        setTimeout(nextSequence, 1000);
    }
}

function task8resetGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
}