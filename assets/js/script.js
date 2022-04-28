var codequestions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "True or False? The main purpose of the <head> element is to provide information to the the browser so it understands what the page is about, what it should look like, and any other behind-the-scenes information.",
        choices: ["true", "false"],
        answer: "true"
    },
    {
        title: "In the DOM's event object, what does the target property refer to?",
        choices: ["It refers to the HTML element that was interacted with to dispatch the event.", "It refers to the HTML element we want to affect as a result of our dispatched event."],
        answer: "It refers to the HTML element that was interacted with to dispatch the event."
    },
    {
        title: "True or False? You must use Bootstrap if you want to create a responsive grid layout.",
        choices: ["true", "false"],
        answer: "false"
    },
    {
        title: "If you save an array of objects to the browser's local storage and it looks like [Object object] when you visit it in Chrome's DevTools, what's wrong?",
        choices: ["The array wasn't stringified with JSON.stringify() before saving to local storage.", "The array wasn't parsed with JSON.parse() before saving to local storage."],
        answer: "The array wasn't stringified with JSON.stringify() before saving to local storage."
    },
    {
        title: "True or False? Your website can only use fonts that came preinstalled on the user's device or that they install themselves.",
        choices: ["true", "false"],
        answer: "false"
    },
    {
        title: "How do you create a flexbox?",
        choices: ["display: flex;", "display: flexbox;", "display: box;"],
        answer: "display: flex;"
    },
    {
        title: "True of False? The main purpose of the <body> element is to hold all of the document's actual displayed content that is meant to be seen and interacted with by the user.",
        choices: ["true", "false"],
        answer: "true"
    },
    {
        title: "By default, in which direction does a flexbox lay out its items?",
        choices: ["A row (horizontal), with all of the child elements laid out side by side.", "A column(vertical), with all of the child elements laid out on top of one another."],
        answer: "A row (horizontal), with all of the child elements laid out side by side."
    }    
];

var timeEl = document.querySelector("#time");
var startEl = document.querySelector("#start-screen");
var startBtnEl = document.querySelector("#startBtn");
var questionsEl = document.querySelector("#questions");
var questionTitleEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var endScreenEl = document.querySelector("#end-screen");
var finalScoreEl = document.querySelector("#final-score");
var initialsEl = document.querySelector("#initials");
var submitBtnEl = document.querySelector("#submit");
var highScoresEl = document.querySelector("#high-scores");
var timerState ;
var questionIndex = 0;
var timer = 120;
   
// create time interval function
const timerInterval = () => {
    timer --;
    timeEl.textContent = timer;
    if (timer <= 0) {
        // fire end quiz function
        endQuiz();
    }
};

// create start quiz function that hides start screen, 
//unhides questions, 
//starts timer, 
//then runs cycle questions function
const quizStart = function() {
    startEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    timerState = setInterval(timerInterval, 1000);
    cycleQuestions();
};

// cycle questions function that takes current question index 
//and displays question title, 
//a forEach that creates a button on the answer choices array, 
//add attributes that will allow us to check right/wrong
const cycleQuestions = () => {
    const currentQuestion = codequestions[questionIndex];
    questionTitleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach(choice => {
        const choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = choice;
        choiceBtn.onclick = correctAnswer;
        choicesEl.appendChild(choiceBtn);
    });
};

// check answer function that checks if answer is correct or incorrect, 
//if incorrect, moves to next question index, 
//and if no more questions fire quiz end function else fire cycle questions again  

const correctAnswer = function() {
    console.log(codequestions[questionIndex].answer);
    if (this.value === codequestions[questionIndex].answer) {
        console.log("correct answer");
    } else {
        console.log("wrong answer");
        timer = timer - 10;
        timeEl.textContent = timer;
    };
    
    questionIndex++;
    
    if (questionIndex >= codequestions.length) {
        // quiz end function
        endQuiz();
    } else {
        cycleQuestions();
    };
};

const endQuiz = () => {
    questionsEl.setAttribute("class", "hide");
    endScreenEl.removeAttribute("class");

    clearInterval(timerState);

    finalScoreEl.textContent = timer;

    renderScores();
};

const saveScore = () => {
    var highScores = JSON.parse(localStorage.getItem("highsScoresArr")) || [];

    var newScore = {
        score: timer,
        name: initialsEl.value
    };

    highScores.push(newScore);

    localStorage.setItem("highsScoresArr", JSON.stringify(highScores));
};

const renderScores = () => {
    var highScores = JSON.parse(localStorage.getItem("highsScoresArr")) || [];

    highScores.forEach(score => {
        const scoreList = document.createElement("li");
        scoreList.textContent = score.name + ": " + score.score;
        highScoresEl.appendChild(scoreList);
    });
}

startBtnEl.addEventListener("click", function(){
    quizStart();
});

submitBtnEl.addEventListener("click", function() {
    saveScore();

    highScoresEl.innerHTML = "";

    renderScores();
});