const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const mainGame = document.getElementById("main-game-container");
const mathQuestion = document.querySelector(".question")
const optionA = document.querySelector(".optionA");
const optionB = document.querySelector(".optionB");
const optionC = document.querySelector(".optionC");
const optionD = document.querySelector(".optionD");
const optionBtns = document.querySelectorAll(".option-btn");
const scoreCount = document.querySelector(".score-count");
const timer = document.getElementById("timer");
const gameOverScreen = document.getElementById("game-over-screen");
const restartBtn = document.getElementById("restart-btn");
const finalScore = document.querySelector(".final-score");

let score = 0;
let currentQuestionIndex = 0;
let timeLeft = 15;
let timerInterval;

const questions = [{
    question: "What is 7 x 8?",
    options: ["54", "56", "62", "64"],
    correct: "B"
  },
  {
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "13"],
    correct: "C"
  },
  {
    question: "What is 15% of 80?",
    options: ["10", "12", "14", "16"],
    correct: "B"
  },
  {
    question: "What is 32 ÷ 4?",
    options: ["6", "7", "8", "9"],
    correct: "C"
  },
  {
    question: "What is 5^3?",
    options: ["125", "100", "75", "150"],
    correct: "A"
  },
  {
    question: "What is the next number in the sequence: 2, 4, 8, 16, ...?",
    options: ["24", "28", "30", "32"],
    correct: "D"
  },
  {
    question: "What is the sum of angles in a triangle?",
    options: ["90°", "120°", "180°", "360°"],
    correct: "C"
  },
  {
    question: "What is 3/4 as a decimal?",
    options: ["0.25", "0.75", "0.50", "0.80"],
    correct: "B"
  },
  {
    question: "What is the area of a rectangle with length 8 and width 5?",
    options: ["30", "35", "40", "45"],
    correct: "C"
  },
  {
    question: "What is 17 + 23?",
    options: ["40", "39", "37", "41"],
    correct: "A"
  },
  {
    question: "What is 2^5?",
    options: ["25", "30", "32", "64"],
    correct: "C"
  },
  {
    question: "What is the value of π (pi) to two decimal places?",
    options: ["3.12", "3.14", "3.16", "3.18"],
    correct: "B"
  },
  {
    question: "What is 40% of 150?",
    options: ["50", "60", "70", "80"],
    correct: "B"
  },
  {
    question: "What is the least common multiple of 6 and 8?",
    options: ["12", "18", "24", "48"],
    correct: "C"
  },
  {
    question: "What is 13 x 7?",
    options: ["81", "87", "97", "91"],
    correct: "D"
  },
  {
    question: "What is the perimeter of a square with side length 9?",
    options: ["27", "32", "36", "81"],
    correct: "C"
  },
  {
    question: "What is 72 ÷ 9?",
    options: ["8", "7", "6", "9"],
    correct: "A"
  },
  {
    question: "What is the value of x in the equation 2x + 5 = 13?",
    options: ["3", "4", "5", "6"],
    correct: "B"
  },
  {
    question: "What is 1/3 + 1/4?",
    options: ["1/7", "4/12", "7/12", "2/7"],
    correct: "C"
  },
  {
    question: "What is the next prime number after 17?",
    options: ["19", "21", "23", "25"],
    correct: "A"
  }];


function startGame(){
  startScreen.style.display = "none";
  mainGame.style.display = "block";
  score = 0;
  currentQuestionIndex = 0;
  updateQuestion();
  startTimer();
  updateScore();
}

function updateQuestion(){
    if(currentQuestionIndex < questions.length){
      const currentQuestion = questions[currentQuestionIndex];
      mathQuestion.innerText = currentQuestion.question;
      optionA.innerText = currentQuestion.options[0];
      optionB.innerText = currentQuestion.options[1];
      optionC.innerText = currentQuestion.options[2];
      optionD.innerText = currentQuestion.options[3];
      enableButtons();
      startTimer();
    } else {
        endGame();
    }
}

function handleAnswer(event){
    clearInterval(timerInterval);
    const selectedOption = event.target;
    const currentQuestion = questions[currentQuestionIndex];

    if(selectedOption.dataset.option === currentQuestion.correct){
        selectedOption.classList.add("correct");
        score++;
        updateScore();
    } else {
        selectedOption.classList.add("incorrect");
        const correctButton = document.querySelector(`[data-option="${currentQuestion.correct}"]`);
        correctButton.classList.add("correct");
    }

    disableButtons();

    setTimeout(() => {
        currentQuestionIndex++;
        resetOptionStyles();
        updateQuestion();
    }, 2000)
}

function resetOptionStyles(){
    optionBtns.forEach((button) => {
        button.classList.remove("correct", "incorrect");
    });
}

function updateScore(){
    scoreCount.innerText = `Score: ${score}`;
}

function startTimer(){
    timer.style.display = "block"
    timeLeft = 15;
    updateTimerDisplay();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimerEnd();
        }
    }, 1000);
}

function updateTimerDisplay(){
    timer.innerText = `Time left: ${timeLeft}s`;
}

function handleTimerEnd(){
    const currentQuestion = questions[currentQuestionIndex];
    const correctButton = document.querySelector(`[data-option="${currentQuestion.correct}"]`);
    correctButton.classList.add("correct");
    disableButtons();

    setTimeout(() => {
        currentQuestionIndex++;
        resetOptionStyles();
       updateQuestion();
    }, 2000);
}

function endGame(){
    clearInterval(timerInterval);
    mainGame.style.display = "none";
    timer.style.display = "none"
    gameOverScreen.style.display = "block";
    finalScore.innerText = `Your final score is: ${score}`;
}

function restartGame(){
    gameOverScreen.style.display = "none";
    startGame();
}

function enableButtons(){
    optionBtns.forEach(btn => {
        btn.disabled = false;
        btn.addEventListener("click", handleAnswer);
    })
}

function disableButtons(){
    optionBtns.forEach(btn => {
        btn.disabled = true;
        btn.removeEventListener("click", handleAnswer)
    })
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);