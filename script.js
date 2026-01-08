// ===== Large Question Pool (Example, can expand) =====
const quizPool = {
  easy: [
    { question: "Which is the largest animal in the world?", answers:["Shark","Blue Whale","Elephant","Giraffe"], correct:1, reason:"Blue Whale is the largest animal on Earth." },
    { question: "Which planet is known as the Red Planet?", answers:["Earth","Venus","Mars","Jupiter"], correct:2, reason:"Mars appears red due to iron oxide." },
    { question: "How many days are there in a week?", answers:["5","6","7","8"], correct:2, reason:"A week has 7 days." },
    { question: "Which color do you get by mixing red and white?", answers:["Pink","Purple","Orange","Brown"], correct:0, reason:"Mixing red and white produces pink." },
    { question: "Which continent is India in?", answers:["Africa","Asia","Europe","Australia"], correct:1, reason:"India is in Asia." },
    { question: "Which ocean is the largest?", answers:["Atlantic","Indian","Pacific","Arctic"], correct:2, reason:"Pacific Ocean is the largest." },
    { question: "Which animal is known as the King of the Jungle?", answers:["Lion","Tiger","Elephant","Leopard"], correct:0, reason:"The lion is called the King of the Jungle." },
    { question: "How many continents are there on Earth?", answers:["5","6","7","8"], correct:2, reason:"There are 7 continents on Earth." },
    { question: "What is H2O commonly called?", answers:["Salt","Water","Oxygen","Hydrogen"], correct:1, reason:"H2O is the chemical formula for water." },
    { question: "Which is the fastest land animal?", answers:["Lion","Cheetah","Horse","Elephant"], correct:1, reason:"Cheetah is the fastest land animal." },
    { question: "Which gas do humans breathe in?", answers:["Oxygen","Nitrogen","Carbon Dioxide","Hydrogen"], correct:0, reason:"Humans breathe in Oxygen." },
    { question: "Which animal lays eggs?", answers:["Dog","Cat","Chicken","Elephant"], correct:2, reason:"Chickens lay eggs." }
  ],

  medium: [
    { question:"Which gas is most abundant in Earth’s atmosphere?", answers:["Oxygen","Nitrogen","Carbon Dioxide","Hydrogen"], correct:1, reason:"Nitrogen makes up ~78% of atmosphere." },
    { question:"Who invented the World Wide Web?", answers:["Bill Gates","Tim Berners-Lee","Steve Jobs","Elon Musk"], correct:1, reason:"Tim Berners-Lee invented WWW in 1989." },
    { question:"Which country hosted the 2016 Olympics?", answers:["China","UK","Brazil","Russia"], correct:2, reason:"Brazil hosted the 2016 Olympics in Rio." },
    { question:"What is the capital of Australia?", answers:["Sydney","Melbourne","Canberra","Perth"], correct:2, reason:"Canberra is the capital." },
    { question:"Which planet is closest to the Sun?", answers:["Mercury","Venus","Earth","Mars"], correct:0, reason:"Mercury is closest to Sun." },
    { question:"How many elements are there in the periodic table?", answers:["108","118","128","138"], correct:1, reason:"There are 118 elements." },
    { question:"Which vitamin is produced by sunlight?", answers:["Vitamin A","Vitamin B","Vitamin C","Vitamin D"], correct:3, reason:"Sunlight produces Vitamin D." },
    { question:"Which organ purifies our blood?", answers:["Heart","Kidney","Liver","Lungs"], correct:1, reason:"Kidneys filter blood." },
    { question:"Who wrote 'Romeo and Juliet'?", answers:["Shakespeare","Hemingway","Dickens","Tolstoy"], correct:0, reason:"Shakespeare wrote 'Romeo and Juliet'." },
    { question:"Which is the largest desert in the world?", answers:["Sahara","Gobi","Kalahari","Antarctica"], correct:3, reason:"Antarctica is the largest desert." },
    { question:"Which gas do plants release?", answers:["Oxygen","Carbon Dioxide","Nitrogen","Hydrogen"], correct:0, reason:"Plants release Oxygen during photosynthesis." }
  ],

  hard: [
    { question:"What is the SI unit of electrical resistance?", answers:["Volt","Ampere","Ohm","Watt"], correct:2, reason:"Ohm (Ω) is the unit of resistance." },
    { question:"Which data structure uses LIFO principle?", answers:["Queue","Array","Stack","Linked List"], correct:2, reason:"Stack works on Last In First Out." },
    { question:"Who proposed the theory of relativity?", answers:["Newton","Einstein","Tesla","Galileo"], correct:1, reason:"Einstein proposed relativity." },
    { question:"Which element has the symbol 'Fe'?", answers:["Fluorine","Iron","Francium","Fermium"], correct:1, reason:"Fe is Iron." },
    { question:"What is the capital of Iceland?", answers:["Reykjavik","Oslo","Helsinki","Stockholm"], correct:0, reason:"Reykjavik is the capital." },
    { question:"Which planet has the most moons?", answers:["Earth","Mars","Jupiter","Saturn"], correct:2, reason:"Jupiter has the most moons (~95)."} ,
    { question:"In computer science, what does 'FIFO' stand for?", answers:["First In First Out","First In Final Out","Final In First Out","Fast Input Fast Output"], correct:0, reason:"FIFO = First In First Out, used in queues." },
    { question:"Who discovered penicillin?", answers:["Marie Curie","Alexander Fleming","Louis Pasteur","Gregor Mendel"], correct:1, reason:"Alexander Fleming discovered penicillin." },
    { question:"Which blood type is universal donor?", answers:["A","B","AB","O"], correct:3, reason:"Type O negative is universal donor." },
    { question:"What is the speed of light in vacuum?", answers:["3 x 10^8 m/s","3 x 10^6 m/s","3 x 10^5 m/s","3 x 10^7 m/s"], correct:0, reason:"Speed of light = 3x10^8 m/s." },
    { question:"Which element has atomic number 1?", answers:["Hydrogen","Helium","Oxygen","Carbon"], correct:0, reason:"Hydrogen has atomic number 1." }
  ]
};

// ===== Shuffle helper =====
function shuffleArray(arr){
    return arr.sort(()=>Math.random()-0.5);
}

// ===== User & Difficulty =====
const difficulty = localStorage.getItem("quizDifficulty");
const user = localStorage.getItem("quizUser");
if(!user || !difficulty) window.location.href="index.html";

// Pick 10 random questions
const questions = shuffleArray([...quizPool[difficulty]]).slice(0,10);

// ===== DOM Elements =====
const welcomeEl = document.getElementById("welcome");
const modeEl = document.getElementById("mode");
const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultsEl = document.getElementById("results");

welcomeEl.innerText = `Welcome, ${user}!`;
modeEl.innerText = `Mode: ${difficulty.toUpperCase()}`;

let currentQuestionIndex = 0;
let selectedAnswers = [];
let selectedIndex = null;

function startQuiz(){
    currentQuestionIndex=0;
    selectedAnswers=[];
    resultsEl.innerHTML="";
    showQuestion();
}

function showQuestion(){
    answerButtons.innerHTML="";
    nextButton.style.display="none";
    selectedIndex=null;

    const q = questions[currentQuestionIndex];
    questionEl.innerText = q.question;
    progressEl.innerText = `Question ${currentQuestionIndex+1} of ${questions.length}`;

    const labels=["A","B","C","D"];
    q.answers.forEach((text,index)=>{
        const btn=document.createElement("button");
        btn.classList.add("btn");
        btn.innerText=`${labels[index]}. ${text}`;
        btn.onclick=()=>selectAnswer(btn,index);
        answerButtons.appendChild(btn);
    });
}

function selectAnswer(btn,index){
    Array.from(answerButtons.children).forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedIndex=index;
    nextButton.style.display="block";
}

nextButton.onclick = ()=>{
    if(selectedIndex===null) return;
    selectedAnswers.push(selectedIndex);
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length) showQuestion();
    else showResults();
};

// ===== Show results with explanations =====
function showResults(){
    questionEl.innerHTML = `Quiz Completed!`;
    progressEl.innerHTML="";
    answerButtons.innerHTML="";
    nextButton.style.display="none";

    let score = 0;
    resultsEl.innerHTML = "";

    questions.forEach((q,i)=>{
        const userAns = selectedAnswers[i];
        const isCorrect = userAns===q.correct;
        if(isCorrect) score++;
        const div = document.createElement("div");
        div.style.border="1px solid #ddd";
        div.style.borderRadius="10px";
        div.style.padding="10px";
        div.style.marginBottom="10px";
        div.innerHTML = `
            <b>Q${i+1}:</b> ${q.question}<br>
            <b>Your answer:</b> ${q.answers[userAns] || "No Answer"}<br>
            <b>Correct answer:</b> ${q.answers[q.correct]}<br>
            <b>Explanation:</b> ${q.reason}<br>
            <b>${isCorrect ? "✅ Correct" : "❌ Wrong"}</b>
        `;
        resultsEl.appendChild(div);
    });

    const scoreDiv = document.createElement("div");
    scoreDiv.style.fontWeight="bold";
    scoreDiv.style.marginBottom="15px";
    scoreDiv.innerHTML = `${user}, your score is ${score} out of ${questions.length}`;
    resultsEl.prepend(scoreDiv);

    const btn = document.createElement("button");
    btn.innerText="Play Again";
    btn.onclick = ()=>{
        localStorage.removeItem("quizUser");
        localStorage.removeItem("quizDifficulty");
        window.location.href="index.html";
    };
    resultsEl.appendChild(btn);
}

startQuiz();
