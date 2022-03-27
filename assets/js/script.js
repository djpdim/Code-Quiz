var questionslist=[
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        question: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    }
 ]

var timerEl=document.getElementById("timelapse");
var currentTime= questionslist.length * 15;
var time;
var startbtn=document.getElementById("startbtn");
var questionsDiv=document.getElementById("questionsDiv");
var currentQuestionIndex=0;
var choices=document.getElementById("choices");
var feedback=document.getElementById("feedback");
var holdInterval = 0;
var submitbtn=document.getElementById("submitbtn")
var tryagainbtn = document.getElementById("tryagainbtn")

function startQuiz() {

    // Hide the default start menu
    startbtn.setAttribute("style", "display: none;");
    qst.setAttribute("style", "display: block");
    choices.setAttribute("style", "display: block");
    h1.setAttribute("style", "display: none;");
    par.setAttribute("style", "display: none;");
    timelapse.removeAttribute("class");
    time=setInterval(timer, 1000);
    timerEl.textContent=currentTime;
}

function timer() {
currentTime--;
timerEl.textContent=currentTime;
 
if (currentTime===0){
    timerEl.textContent="Time's up!"
    clearInterval(time);
    tryagainbtn.removeAttribute("class");
    quizScreen.setAttribute("class", "hide");
}
}

function getQuestion(){
    currentQuestion=questionslist[currentQuestionIndex];
    var qst=document.getElementById("qst");
    qst.textContent=currentQuestion.question;

    choices.innerHTML="";

    currentQuestion.choices.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent=i + ". " + choice;
        choices.appendChild(choiceBtn);
        choiceBtn.onclick=questionCheck;
        
    });

    
}

function questionCheck(){
    if (this.value !==questionslist[currentQuestionIndex].answer) {
        currentTime -= 10;

        timerEl.textContent=currentTime;

        feedback.textContent="Wrong";
    }
    else {
        feedback.textContent="Correct";
    }
    currentQuestionIndex++;
    if (currentQuestionIndex===questionslist.length){
        clearInterval(time)
        quizend();
    } else {
        getQuestion()
    };
}

function quizend(){
    
    document.getElementById("wrapper").style.display = "none";
    document.getElementById("quizend").style.display = "block";
    document.getElementById("scorespan").textContent = userScore;
    document.getElementById("feedback").style.display = "none";

}

function submitScore() {
    // submit the score to the local storage
    // get user initial
    var userinitial=document.getElementById("initialinput").value
    // get user highscore
    var gameObj = {
        initials: userinitial,
        score: currentTime
    }
    var previousScores = JSON.parse(localStorage.getItem('allScores')) || []
    previousScores.push(gameObj)
    // store in local storage
    localStorage.setItem('allScores', JSON.stringify(previousScores))
    window.location.href = "./highscores.html"
}

function refreshPage() {
    // refresh the page
    refreshPage = location.reload();
}

startbtn.onclick = startQuiz;
tryagainbtn.onclick = refreshPage
getQuestion();
// click listener on submitbtn element to call submitScore function
    submitbtn.onclick=submitScore
