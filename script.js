var questions = [
    {
        question : "Question goes here",
        choices : ["choice one", "choice two", "choice three", "choice four"],
        answer : "choice three",
        marked : false,
        correct : false
    },
    {
        question : "Question goes here",
        choices : ["choice one", "choice two", "choice three", "choice four"],
        answer : "choice three",
        marked : false,
        correct : false
    },
    {
        question : "Question goes here",
        choices : ["choice one", "choice two", "choice three", "choice four"],
        answer : "choice three",
        marked : false,
        correct : false
    },
    {
        question : "Question goes here",
        choices : ["choice one", "choice two", "choice three", "choice four"],
        answer : "choice three",
        marked : false,
        correct : false
    },
    {
        question : "Question goes here",
        choices : ["choice one", "choice two", "choice three", "choice four"],
        answer : "choice three",
        marked : false,
        correct : false
    },
    {
        question : "Question goes here",
        choices : ["choice one", "choice two", "choice three", "choice four"],
        answer : "choice three",
        marked : false,
        correct : false
    },
    {
        question : "Question goes here",
        choices : ["choice one", "choice two", "choice three", "choice four"],
        answer : "choice three",
        marked : false,
        correct : false
    },
    {
        question : "Question goes here",
        choices : ["choice one", "choice two", "choice three", "choice four"],
        answer : "choice three",
        marked : false,
        correct : false
    },
    {
        question : "Question goes here",
        choices : ["choice one", "choice two", "choice three", "choice four"],
        answer : "choice three",
        marked : false,
        correct : false
    },
    {
        question : "Question goes here",
        choices : ["choice one", "choice two", "choice three", "choice four"],
        answer : "choice three",
        marked : false,
        correct : false
    },
];

var score = 0;
var quizDuration = 0;
var quizSecondElapsed = 0;
var quizInterval;
var questionDuration = 60;
var questionSecondElapsed = 0;
var questionInterval;
var currentQuestion = 0;
var username;
var quizTimer = document.getElementById("quizTimer");
var quiz = document.getElementById("quiz");
var timerTable = document.getElementById("timer");
var randomQuestions;

function init() {
    clear();
    reset();
    let heading = document.createElement("p");
    heading.setAttribute("id", "heading");
    heading.textContent = "You have 10 minutes to complete the test";
    quiz.appendChild(heading);
    let instructions = document.createElement("p");
    instructions.setAttribute("id", "instructions")
    instructions.textContent = "Click the START button to start the test!";
    quiz.appendChild(instructions);
    let nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name");
    nameLabel.textContent = "Enter test ID : ";
    let nameInput = document.createElement("input");
    nameInput.setAttribute("id", "name");
    nameInput.setAttribute("name", "name");
    let lb = document.createElement("br");
    quiz.appendChild(nameLabel);
    quiz.appendChild(nameInput);
    quiz.appendChild(lb);
    let startQuiz = document.createElement("button");
    startQuiz.setAttribute("id", "startQuiz");
    startQuiz.textContent = "START";
    quiz.appendChild(startQuiz);
    startQuiz.addEventListener("click", function(){
        username = nameInput.value;
        if(username!="") {
            randomQuestions = rQuestions(questions);
            sidebar(randomQuestions);
            startquiz(randomQuestions);
        } else {
            alert("First Enter your test ID");
        } 
    })
}

function clear() {
    quiz.innerHTML = "";
}

function sidebar(randomQuestions) {
    var side = document.getElementById("sidebar");
    side.className = "sb";
    side.style.visibility = "visible";
    for(let i = 0; i < questions.length; i++){
        let sideQuestion = document.createElement("li");
        sideQuestion.setAttribute("id", i + 1);
        sideQuestion.setAttribute("style", "list-style-type:none");
        sideQuestion.textContent = i + 1;
        side.appendChild(sideQuestion);
    }
    side.addEventListener("click", function() {
        toggleSidebar(randomQuestions);
    })
}

function toggleSidebar(randomQuestions) {
    let e = event.target;
    if(e.matches("li")){
        let questionno = e.textContent;
        showQuestion(Number(questionno) - 1, randomQuestions);
    }
}

function reset() {
    score = 0;
    quizDuration = 0;
    quizSecondElapsed = 0;
    currentQuestion = 0;
    questionDuration = 60;
    questionSecondElapsed = 0;
    questionInterval;
    for(let i = 0; i < questions.length; i++){
        questions[i].marked = false;
    }
    quizInterval;
}

function startquiz(randomQuestions){
    timerTable.style.visibility = "visible";
    quizDuration = questions.length * 60;
    startTimer();
    time();
    showQuestion(currentQuestion, randomQuestions);
}

function rQuestions(arr) {
    var randomQuestions = [];
    var result = [], randNumber,Count=questions.length;
    while ( Count > 0) {
        randNumber = Math.round(Math.random() * (questions.length - 1));
        if (result.indexOf(randNumber) == -1) {
            result.push(randNumber);
            Count--;
        }
    }
    for(let i = 0; i < questions.length; i++) {
        randomQuestions[i] = arr[result[i]];
        randomQuestions[i].number = i + 1;
    }
    return randomQuestions;
}

function startTimer() {
    clearInterval(quizInterval);
    quizSeconds = quizDuration;
    quizInterval = setInterval(function() {
        quizSecondElapsed++;
        questionSecondElapsed++;
        time();
    }, 1000);
}

function time() {
    let s = quizDuration - quizSecondElapsed;
    function fmtMSS(s){
        return(s-(s%=60))/60+(9<s?':':':0')+s
    }
    let content = fmtMSS(s);
    quizTimer.textContent = content;
    if((quizDuration - quizSecondElapsed) < 1){
        endQuiz();
    }
}

var attempted;

function showQuestion(i, randomQuestions) {
    clear();
    questionSecondElapsed = 0;
    currentQuestion = i;
    if(i == randomQuestions.length){
        endQuiz();
        return;
    }
    let question = document.createElement("h1");
    question.setAttribute("question", randomQuestions[i].question);
    question.setAttribute("id", "question")
    question.textContent = "Q" +  eval(i + 1) + ". " + randomQuestions[i].question;
    quiz.appendChild(question);
    let choicebox = document.createElement("ul");
    choicebox.setAttribute("id", "choicebox");
    quiz.append(choicebox);
    for(let j = 0; j < randomQuestions[i].choices.length; j++){
        let listchoice = document.createElement("li");
        listchoice.setAttribute("choice-value", randomQuestions[i].choices[j]);
        listchoice.setAttribute("id","questionNum-" + j);
        listchoice.setAttribute("style", "list-style-type:none");
        listchoice.textContent = j + 1 + ". " + randomQuestions[i].choices[j];
        if(randomQuestions[i].marked && randomQuestions[i].answer == randomQuestions[i].choices[j]){
            listchoice.setAttribute("style", "background-color: green; color: white");
        }
        if(randomQuestions[i].userAnswer == randomQuestions[i].choices[j] && randomQuestions[i].userAnswer != randomQuestions[i].answer){
            listchoice.setAttribute("style", "background-color: red;");
        }
        choicebox.appendChild(listchoice);
    }
    choicebox.addEventListener("click", function () {
        attempted = true;
        scoreAnswer(randomQuestions[i]);
    })
    let previous = document.createElement("button");
    previous.setAttribute("id", "previous");
    previous.textContent = "Previous";
    quiz.appendChild(previous);
    if(i == 0){
        previous.style.visibility = "hidden";
    }
    let next = document.createElement("button");
    next.setAttribute("id", "next");
    if(i == randomQuestions.length - 1){
        next.textContent = "Submit";
    }else{
        next.textContent = "Next";
    }
    quiz.appendChild(next);
    previous.addEventListener("click", function () {
        currentQuestion--;
        showQuestion(currentQuestion, randomQuestions);
    })
    next.addEventListener("click", function(){
        currentQuestion++;
        //start
        // if(attempted == null) {
        //     alert('in');
        //     document.getElementById(currentQuestion.number).style.backgroundColor = "red";
        // }
        //end
        showQuestion(currentQuestion, randomQuestions);
    })
}

function scoreAnswer(current) {
    var e = event.target;
    if(e.matches("li") && !current.marked){
        let selectedItem = e.textContent.slice(3);
        if(selectedItem == current.answer){
            if(questionDuration < questionSecondElapsed + 1){
                score += 0;
            }else{
                score += questionDuration - questionSecondElapsed;
            }
            document.getElementById("score").textContent = score;
            current.correct = true;
            // document.getElementById(current.number).style.backgroundColor = "green";
            // document.getElementById(current.number).style.color = "white";
        }
        else{
            //document.getElementById(current.number).style.backgroundColor = "red";
        }
        document.getElementById(current.number).style.backgroundColor = "green";
        document.getElementById(current.number).style.color = "white";
        current.marked = true;
        current.userAnswer = selectedItem;
        showAnswer(current, selectedItem);
    }
}

function showAnswer(current, selectedItem) {
    for(let i = 0; i < current.choices.length; i++){
        let questionid = "#questionNum-" + i;
        let questionrow = document.querySelector(questionid);
        if(current.choices[i] == current.answer){
            questionrow.setAttribute("style", "background-color: green; color: white");
        }
        else if(selectedItem == current.choices[i]){
            questionrow.setAttribute("style", "background-color: red");
        }
    }
    setTimeout(function() {
        showQuestion(currentQuestion + 1, randomQuestions);
    }, 1000);
}

function refresh() {
    location.reload();
}

function endQuiz(){
    stopTimer();
    clear();
    timerTable.style.visibility = "hidden";
    var sidebar = document.getElementById("sidebar");
    sidebar.style.display = "none";
    let heading = document.createElement("p");
    heading.setAttribute("id", "heading");
    heading.textContent = "Test Over!";
    let instructions = document.createElement("p");
    instructions.setAttribute("id", "instructions");
    instructions.textContent = "Hey! " + username + " Your Score is " + score;
    quiz.appendChild(heading);
    quiz.appendChild(instructions);
}

function stopTimer() {
    quizSeconds = 0;
    clearInterval(quizInterval);
}

init();