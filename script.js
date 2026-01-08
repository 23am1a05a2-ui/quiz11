const user = localStorage.getItem("quizUser");
if (!user) {
    window.location.href = "index.html";
}

document.getElementById("welcome").innerText = `Welcome, ${user}!`;

const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: ["Shark", "Blue whale", "Elephant", "Giraffe"],
        correct: 1
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: ["Asia", "Australia", "Arctic", "Africa"],
        correct: 1
    },
    {
        question: "Which is the largest desert in the world?",
        answers: ["Kalahari", "Gobi", "Sahara", "Antarctica"],
        correct: 3
    },
    {
        question: "Which is the smallest country in the world?",
        answers: ["Vatican City", "Bhutan", "Nepal", "Sri Lanka"],
        correct: 0
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progress = document.getElementById("progress");

let currentQuestionIndex = 0;
let score = 0;
let selectedIndex = null;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    answerButtons.innerHTML = "";
    nextButton.style.display = "none";
    selectedIndex = null;

    const q = questions[currentQuestionIndex];
    questionElement.innerText = q.question;
    progress.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    const labels = ["A", "B", "C", "D"];

    q.answers.forEach((text, index) => {
        const btn = document.createElement("button");
        btn.classList.add("btn");
        btn.innerText = `${labels[index]}. ${text}`;
        btn.onclick = () => selectAnswer(btn, index);
        answerButtons.appendChild(btn);
    });
}

function selectAnswer(btn, index) {
    Array.from(answerButtons.children).forEach(b =>
        b.classList.remove("selected")
    );

    btn.classList.add("selected");
    selectedIndex = index;
    nextButton.style.display = "block";
}

nextButton.onclick = () => {
    if (selectedIndex === questions[currentQuestionIndex].correct) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
};

function showScore() {
    questionElement.innerHTML =
        `${user}, you scored <b>${score}</b> out of ${questions.length}`;
    progress.innerHTML = "";
    answerButtons.innerHTML = "";
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
    nextButton.onclick = () => {
        localStorage.removeItem("quizUser");
        window.location.href = "index.html";
    };
}

startQuiz();




