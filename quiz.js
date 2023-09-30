const questions = [
  {
      question: "What is the largest mammal on Earth?",
      options: ["Blue Whale", "Elephant", "Giraffe", "Hippopotamus"],
      answer: "Blue Whale"
  },
  {
      question: "Which planet is known as the 'Red Planet'?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: "Mars"
  },
  {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "F. Scott Fitzgerald"],
      answer: "William Shakespeare"
  },
  {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Cu"],
      answer: "Au"
  },
  {
      question: "What is the national flower of Japan?",
      options: ["Cherry Blossom", "Rose", "Lotus", "Sunflower"],
      answer: "Cherry Blossom"
  }
];

let currentQuestion = 0;
let score = 0;
const questionTimeLimit = 15000;
let questionTimer;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const next = document.getElementById('next_btn');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restartButton');
const txer=document.getElementById('timer');



function startQuiz() {
  showQuestion(currentQuestion);
}

function showQuestion(questionIndex) {
  const currentQues = questions[questionIndex];
  questionElement.innerText = currentQues.question;
  optionsContainer.innerHTML = '';
  currentQues.options.forEach(option => {
      const button = document.createElement('button');
      button.innerText = option;
      button.classList.add('option-btn');
      button.addEventListener('click', selectAnswer);
      optionsContainer.appendChild(button);
  });
  const timerElement = document.createElement('div');
  timerElement.id = 'timer';
  timerElement.classList.add('timer');

  const timeElement = document.createElement('div');
  timeElement.id = 'time';
  timeElement.classList.add('time');

  timerElement.appendChild(timeElement);
  optionsContainer.appendChild(timerElement);

  let timeLeft = questionTimeLimit / 1000;


  const timerInterval = setInterval(() => {
    timeElement.innerText = timeLeft;
    timerElement.style.background = `conic-gradient(#FF0000 ${((questionTimeLimit - timeLeft * 1000) / questionTimeLimit) * 100}%,
    #ccc 0%)`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
      } else {
        showScore();
      }
    }
  }, 1000);
}
function selectAnswer(e) {
  const selectedOption = e.target;
  const correctAnswer = questions[currentQuestion].answer;
  clearTimeout(questionTimer);

  if (selectedOption.innerText === correctAnswer) {
    selectedOption.style.backgroundColor = 'green';
    document.body.style.backgroundColor = '#2ecc71';
    score++;
  } else {
    selectedOption.style.backgroundColor = 'red';
    document.body.style.backgroundColor = '#e74c3c';
  }

  const optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach(button => {
    button.removeEventListener('click', selectAnswer);
  });

  scoreElement.innerText = `Current Score: ${score}`;
  currentQuestion++;
  setTimeout(() => {
    if (currentQuestion < questions.length) {
      showQuestion(currentQuestion);
    } else {
      showScore();
    }
  }, 1000);
}

restartButton.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  feedbackElement.innerText = ''; 
  showQuestion(currentQuestion); 
  next.style.display = 'block'; 
  txer.style.display = 'block'; 
  document.body.style.backgroundColor = 'aqua';
});
function showScore() {
  questionElement.innerText = "Quiz Completed!";
  optionsContainer.innerHTML = '';
  feedbackElement.innerText = `Your Score: ${score} out of ${questions.length}`;
  next.style.display = 'none';
  txer.style.display='none';
  scoreElement.innerText = `Your final score is: ${score}`;
  document.body.style.backgroundColor = 'skyblue';
}
next.addEventListener('click', () => {
  clearTimeout(questionTimer); 
  currentQuestion++; 

  if (currentQuestion < questions.length) {
      showQuestion(currentQuestion);
  } else {
      showScore();
  }
});

startQuiz();
