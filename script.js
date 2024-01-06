const questions = [
    {
        question: "what is the long form of HTML?",
        answers:[
            { text:"HighText Markup Language", correct: false},
            { text:"HyperText Markup Language", correct: true},
            { text:"HighText Markdown Language", correct: false},
            { text:"none of the above", correct: false},
        ]
    },
    {
        question: " How to create an ordered list in HTML?",
        answers:[
            { text:"ul", correct: false},
            { text:" href ", correct: false},
            { text:"ol", correct: true},
            { text:"b", correct: false},
        ]
    },
    {
        question: " How many sizes of headers are available in HTML by default?",
        answers:[
            { text:"5", correct: false},
            { text:"1", correct: false},
            { text:"3", correct: false},
            { text:"6", correct: true},
        ]
    },
    {
        question: " Which of the following is correct about HTML?",
        answers:[
            { text:"HTML uses User Defined Tags.", correct: false},
            { text:"HTML uses tags defined eithin the language.", correct: true},
            { text:"Both A and B.", correct: false},
            { text:"None of the above", correct: false},
        ]
    },
    {
        question: "What is the smallest header in HTML by default?",
        answers:[
            { text:"h1", correct: false},
            { text:"h2", correct: false},
            { text:"h6", correct: true},
            { text:"h4", correct: false},
        ]
    },
    {
        question: "What are the attributes used to change the size of an image?",
        answers:[
            { text:"Width and height", correct: true},
            { text:"Big and Small", correct: false},
            { text:"Top and bottom", correct: false},
            { text:"None of the above", correct: false},
        ]
    },
    {
        question: "What tag is used to render an image on a webpage?",
        answers:[
            { text:"src", correct: false},
            { text:"img", correct: true},
            { text:"Tag", correct: false},
            { text:"image", correct: false},
        ]
    },
    {
        question: "Which attribute is used to provide a unique name to an HTML element?",
        answers:[
            { text:"None of the above", correct: false},
            { text:"type", correct: false},
            { text:"class", correct: false},
            { text:"id", correct: true},
        ]
    },
    {
        question: "Which attribute is used to provide a unique name to an HTML element",
        answers:[
            { text:"class", correct: false},
            { text:"id", correct: true},
            { text:"type", correct: false},
            { text:"attribute", correct: false},
        ]
    },
    {
        question: "HTML files are saved by default with the extension?",
        answers:[
            { text:".html", correct: true},
            { text:".h", correct: false},
            { text:".ht", correct: false},
            { text:"none of the above", correct: false},
        ]
    }
];

const  questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

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
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>
        {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);
            if(answer.correct){
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
        })
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();

