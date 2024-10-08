const myquestions = [
  {
    questions: "Who is the richest man in the world?",
    answers: [
      { text: "Dangote", correct: false },
      { text: "Elon Musk", correct: true },
      { text: "Jeff Bezos", correct: false },
      { text: "Bill Gates", correct: false },
    ],
  },
  {
    questions: "What is the largest land animal in the world?",
    answers: [
      { text: "Giraffe", correct: false },
      { text: "Hippopotamus", correct: false },
      { text: "African Bush Elephant", correct: true },
      { text: "White Rhinoceros", correct: false },
    ],
  },
  {
    questions: "Which is the largest fish in the world?",
    answers: [
      { text: "Whale Shark", correct: true },
      { text: "Great White Shark", correct: false },
      { text: "Ocean Sunfish", correct: false },
      { text: "Giant Oceanic Manta Ray", correct: false },
    ],
  },
  {
    questions: "Which is the largest fish in the world?",
    answers: [
      { text: "Whale Shark", correct: true },
      { text: "Great White Shark", correct: false },
      { text: "Ocean Sunfish", correct: false },
      { text: "Giant Oceanic Manta Ray", correct: false },
    ],
  },
];

const numberElement = document.querySelector(".number");
const questionElement = document.querySelector(".question");
const optionsElement = document.querySelector(".options");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = myquestions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  numberElement.innerHTML = `${questionNumber}.`;
  questionElement.innerHTML = currentQuestion.questions;

  currentQuestion.answers.forEach( answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    optionsElement.appendChild(button);
    if (answer.correct === true) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });

  prevButton.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
  nextButton.style.display = "inline-block";
  if (currentQuestionIndex === myquestions.length - 1) {
    nextButton.innerHTML = "Finish";
  }
}

function resetState() {
  while (optionsElement.firstChild) {
    optionsElement.removeChild(optionsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(optionsElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
}

function showScore() {
  resetState();
  numberElement.innerHTML = '';
  questionElement.innerHTML = `You scored ${score} out of ${myquestions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "inline-block";
  prevButton.style.display = "none";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < myquestions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function handlePrevButton() {
  
  if (currentQuestionIndex--) {
    nextButton.innerHTML = "Next";
  }
  // currentQuestionIndex--;
     showQuestion();
 
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < myquestions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});


prevButton.addEventListener("click", handlePrevButton);

startQuiz();
