// Selecting elements
const timer = document.querySelector('.timer');
const quizContainer = document.getElementById('container');
const nextButton = document.getElementById('next-button');
const numOfQuestions = document.querySelector('.number-of-questions');
const displayContainer = document.getElementById('display-container');
const scoreContainer = document.querySelector('.score-container');
const restartButton = document.getElementById('restart');
const userScore = document.getElementById('user-score');
const startScreen = document.querySelector('.start-screen');
const startButton = document.getElementById('start-button');

// Variables
let questionCount = 0;
let scoreCount = 0;
let count = 10;
let countdown;

// Color generator function
const generateRandomColor = () => {
  let color = "#";
  const hexValues = "0123456789ABCDEF";
  for (let i = 0; i < 6; i++) {
    color += hexValues[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Generate a new quiz question
const generateQuestion = () => {
  const correctColor = generateRandomColor();
  const options = [correctColor];

  while (options.length < 4) {
    let wrongColor = generateRandomColor();
    if (!options.includes(wrongColor)) options.push(wrongColor);
  }

  // Shuffle options
  options.sort(() => Math.random() - 0.5);

  quizContainer.innerHTML = `
    <div class="question-color" style="background-color: ${correctColor};"></div>
    <div class="button-container">
      ${options
        .map(
          (color) => `<button class="option-div" data-option="${color}">${color}</button>`
        )
        .join('')}
    </div>
  `;

  // Add event listeners to options
  document.querySelectorAll('.option-div').forEach((button) => {
    button.addEventListener('click', () => checkAnswer(button, correctColor));
  });
};

// Check the user's answer
const checkAnswer = (button, correctColor) => {
  const userChoice = button.getAttribute('data-option');
  const allButtons = document.querySelectorAll('.option-div');

  if (userChoice === correctColor) {
    button.classList.add('correct');
    scoreCount++;
  } else {
    button.classList.add('incorrect');
    allButtons.forEach((btn) => {
      if (btn.getAttribute('data-option') === correctColor) {
        btn.classList.add('correct');
      }
    });
  }

  // Disable all buttons after answer
  allButtons.forEach((btn) => (btn.disabled = true));
  nextButton.classList.remove('hide');
  clearInterval(countdown);
};

// Timer function
const startTimer = () => {
  count = 10;
  timer.innerHTML = `Time Left: ${count}s`;

  countdown = setInterval(() => {
    count--;
    timer.innerHTML = `Time Left: ${count}s`;
    if (count === 0) {
      clearInterval(countdown);
      nextButton.classList.remove('hide');
    }
  }, 1000);
};

// Display next question
const displayNext = () => {
  questionCount++;
  if (questionCount === 5) {
    displayContainer.classList.add('hide');
    scoreContainer.classList.remove('hide');
    userScore.innerHTML = `Your score is ${scoreCount} out of 5!`;
  } else {
    numOfQuestions.innerHTML = `${questionCount + 1} of 5 Questions`;
    generateQuestion();
    startTimer();
    nextButton.classList.add('hide');
  }
};

// Initialize the game
const startGame = () => {
  startScreen.classList.add('hide');
  displayContainer.classList.remove('hide');
  scoreContainer.classList.add('hide');
  questionCount = 0;
  scoreCount = 0;
  numOfQuestions.innerHTML = `1 of 5 Questions`;
  generateQuestion();
  startTimer();
};

// Restart game
restartButton.addEventListener('click', startGame);
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', displayNext);
