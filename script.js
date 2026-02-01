const questions = [{
        question: "What is the capital of France?",
        options: ["Paris", "Rome", "Berlin", "Madrid"],
        answer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        answer: "Mars",
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: [
            "William Shakespeare",
            "Charles Dickens",
            "Mark Twain",
            "Jane Austen",
        ],
        answer: "William Shakespeare",
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        answer: "Blue Whale",
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Iron", "Hydrogen"],
        answer: "Oxygen",
    },
    {
        question: "What year did the Titanic sink?",
        options: ["1912", "1905", "1920", "1898"],
        answer: "1912",
    },
    {
        question: "Which is the fastest land animal?",
        options: ["Cheetah", "Lion", "Horse", "Tiger"],
        answer: "Cheetah",
    },
    {
        question: "In which continent is the Sahara Desert located?",
        options: ["Africa", "Asia", "Australia", "South America"],
        answer: "Africa",
    },
    {
        question: "What is the smallest prime number?",
        options: ["1", "2", "3", "0"],
        answer: "2",
    },
    {
        question: "Which famous scientist developed the theory of relativity?",
        options: [
            "Isaac Newton",
            "Albert Einstein",
            "Galileo Galilei",
            "Nikola Tesla",
        ],
        answer: "Albert Einstein",
    },
];

const quizStartCard = document.querySelector(".quiz-start-card");
const quizQuestionsCard = document.querySelector(".quiz-questions-card");
const quizResultCard = document.querySelector(".quiz-end-card");

const startBtn = document.querySelector(".start-button");
const restartBtn = document.querySelector('.restart-button');

const QuestionSpan = document.querySelector(".question-text");
const currentQuestionSpan = document.querySelector(".current-question");
const totalQuestionsSpan = document.querySelector(".total-questions");
const currentScoreSpan = document.querySelector(".current-score");
const progressBar = document.querySelector(".progress-bar");

const resultScoreSpan = document.querySelector(".score");
const maxScore = document.querySelector(".max-score");
const remarksSpan = document.querySelector('.remarks');

const answerContainer = document.querySelector(".answers-container");

let score = 0;
let currentQuestionIndex = 0;

startBtn.addEventListener("click", () => {
    score = 0;
    currentQuestionIndex = 0;

    quizQuestionsCard.style.display = "block";
    quizStartCard.style.display = "none";

    showQuestions();
});

restartBtn.addEventListener('click', () => {

    quizResultCard.style.display = "none";
    quizStartCard.style.display = "block";
});

function showQuestions() {
    const currentQuestion = questions[currentQuestionIndex];

    QuestionSpan.innerText = currentQuestion.question;
    currentQuestionSpan.innerText = currentQuestionIndex + 1;
    totalQuestionsSpan.innerText = questions.length;

    currentScoreSpan.innerText = score;

    answerContainer.innerHTML = "";

    currentQuestion.options.forEach((option) => {
        const optionButton = document.createElement("button");
        optionButton.classList.add("option-btn");

        optionButton.innerText = option;

        optionButton.addEventListener("click", () => {
            checkAnswer(option);
        });

        answerContainer.appendChild(optionButton);
    });
}

function checkAnswer(selectedOption) {
    const allOptionsButton = document.querySelectorAll(".option-btn");
    const currentQuestion = questions[currentQuestionIndex];

    allOptionsButton.forEach((optionBtn) => {
        optionBtn.disabled = true;

        if (currentQuestion.answer === selectedOption) {
            if (optionBtn.innerText === selectedOption) {
                optionBtn.classList.add("correct");
            }
        } else {
            if (optionBtn.innerText === selectedOption) {
                optionBtn.classList.add("wrong");
            }
        }
    });

    setTimeout(updateProgressbar, 700);

    if (selectedOption === currentQuestion.answer) {
        score++;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestions();
        } else {
            showResult();
        }
    }, 1000);
}

function updateProgressbar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;
}

function showResult() {

    quizQuestionsCard.style.display = "none";
    quizResultCard.style.display = "block";

    resultScoreSpan.innerText = score;
    maxScore.innerText = questions.length;

    let message = "";

    if (score <= 3) {
        message = "Keep practicing 💪";
    } else if (score > 3 && score <= 6) {
        message = "Good job 👍";
    } else {
        message = "Excellent work 🎉";
    }

    remarksSpan.innerText = message;
}