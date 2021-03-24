// setting global variables 
var score = 0;
var currentQuestion = -1;
var shotClock = 0;
var timer = 0;

// Questions
var timedtester = [{
    question: "1. When you create an .html file,",
    multiplechoice: ["a. the BODY element goes inside the HEAD element.", "b. the HEAD element goes inside the BODY element.", "c. the TITLE element goes inside the BODY element.", "d. the TITLE element goes inside the HEAD element."],
    answer: "d. the TITLE element goes inside the HEAD element."
},
{
    question: "2. Where in an HTML document is the correct place for embedded style definitions?",
    multiplechoice: ["a. In the body section", "b. At the top of the document", "c. In the head section", "d. At the end of the document"],
    answer: "c. In the head section"
},
{
    question: "3. Which is the correct CSS syntax?",
    multiplechoice: ["a. {body;color:black}", "b. body:color=black", "c. {body:color=black(body}", "d. body {color: black}"],
    answer: "d. body {color: black}"
},
{
    question: "4. How do you add a background color for all <h1> elements?",
    multiplechoice: ["a. all.h1 {background-color:#FFFFFF}", "b. h1.all {background-color:#FFFFFF}", "c. h1 {background-color:#FFFFFF}", "d. h1 {bgcolor = #FFFFFF}"],
    answer: "c. h1 {background-color:#FFFFFF}"
},
{
    question: "5. Inside which HTML element do we put the JavaScript using brackets?",
    multiplechoice: ["a. js", "b. javascript", "c. scripting", "d. script"],
    answer: "d. script"
},
{
    question: "6. Which of the following is the correct syntax to display “GeeksforGeeks” in an alert box using JavaScript?",
    multiplechoice: ["a. alertbox(“GeeksforGeeks”);", "b. msg(“GeeksforGeeks”);", "c. msgbox(“GeeksforGeeks”);", "d. alert(“GeeksforGeeks”);"],
    answer: "d. alert(“GeeksforGeeks”);"
},
{
    question: "7. Booleans have two values:",
    multiplechoice: ["a. true or false", "b. left or right", "c. integer or a decimal", "d. None of the above"],
    answer: "a. true or false"
},
{
    question: "8. A string is a series of characters and is surrounded by __________.",
    multiplechoice: ["a. brackets", "b. curly brackets", "c. quotes", "d. parentheses"],
    answer: "c. quotes"
},
{
    question: "9. Which symbols together mean strict equality?",
    multiplechoice: ["a. equal equal equal", "b. lessthan equal", "c. and and", "d. equal equal"],
    answer: "a. equal equal equal"
},
{
    question: "10. Slice returns selected elements as ________.",
    multiplechoice: ["a. unchanged array", "b. a new array", "c. new string", "d. unchanged string"],
    answer: "b. a new array"
}
]

// start timer and creates a countdown by shotClock--;
function start() {

shotClock = 60;
document.getElementById("shotClock").innerHTML = shotClock;
// repeats function every time you call timer: moves to end game when time <= 0
timer = setInterval(function() {
    // enables countdown clock from 60
    shotClock--;
    document.getElementById("shotClock").innerHTML = shotClock;
    if (shotClock <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);
// moves to next function 
next();
}


//stop the timer and end the quiz 
function endGame() {
clearInterval(timer);

//score and number correct
var quizContent = `
<h2>Quiz Over</h2>
<h3>` + score / 10 +  ` correct = Score of ` + score + `</h3>
<input type="text" id="name" placeholder="Player"> 
<button onclick="submitSc()">Submit</button>`;

document.getElementById("quizContent").innerHTML = quizContent;
}
//rules for local storage creation of all scores manual entry 

var highInput = document.querySelector("#high-text");
var highForm = document.querySelector("#high-form");
var highList = document.querySelector("#high-list");
var highCountSpan = document.querySelector("#high-count");

var highs= [];
// Clear and update 
function renderHighs() {
  highList.innerHTML = "";
  highCountSpan.textContent = highs.length;

  // New list for each
  for (var i = 0; i < highs.length; i++) {
    var high = highs[i];

    var li = document.createElement("li");
    li.textContent = high;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Remove";

    li.appendChild(button);
    highList.appendChild(li);
  }   
}
// Storage to the local storage 
function init() {
    var storedtodos= JSON.parse(localStorage.getItem("Scores"));

    if (storedtodos!== null) {
        todos= storedHighs;
    }

    renderHighs();
}

// Local storage of array manually entered 
function storedHighs() {
    localStorage.setItem("Scores", JSON.stringify(highs));
  }
  
  // Listening for submission to form
  highForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    var highText = highInput.value.trim();
  
    // Return if blank
    if (highText === "") {
      return;
    }
  
    // Add/clear the input
    highs.push(highText);
    highInput.value = "";
  
    // re-render the list
    storedHighs();
    renderHighs();
  });
  
  // Click Event
  highList.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches("button") === true) {
      // Get its data-index value and remove from the list
      var index = element.parentElement.getAttribute("data-index");
      highs.splice(index, 1);
  
      // Store update in localStorage and re-render
      storedHighs();
      renderHighs();
    }
  });
  
  // Renders on page load
  init()

// Submits last score
function submitSc() {
localStorage.setItem("highscore", score);
localStorage.setItem("playerName",  document.getElementById('name').value.trim());
winorLose();
}

function winorLose() {
var quizContent = `
<h2>` + localStorage.getItem("playerName") + `'s highscore:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quizContent").innerHTML = quizContent;
}

resetGame();

//reset the game 
function resetGame() {
clearInterval(timer);
score= 0;
currentQuestion= -1;
shotClock= 0;
timer= 0;

document.getElementById("shotClock").innerHTML = shotClock;

// reload screen with new heading to replay game 
var quizContent= `
<h1>
    Quiz Reloaded!
</h1>
<button onclick="start()">Start!</button>`;

document.getElementById("quizContent").innerHTML = quizContent;
}

//Seconds Deduction for wrong answers 
function incorrect() {
shotClock -= 10; 
next();
}

//10 points for correct answers
function correct() {
score += 10;
next();
}

//question loop 
function next() {
currentQuestion++;

if (currentQuestion > timedtester.length - 1) {
    endGame();
    return;
}
// replace text in a string 
var quizContent = "<h2>" + timedtester[currentQuestion].question + "</h2>"
// loops through answers on selection of answer 
for (var buttonLoop = 0; buttonLoop < timedtester[currentQuestion].multiplechoice.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[]\">choiceOptions</button>"; 
    buttonCode = buttonCode.replace("choiceOptions", timedtester[currentQuestion].multiplechoice[buttonLoop]);
    if (timedtester[currentQuestion].multiplechoice[buttonLoop] == timedtester[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[]", "incorrect()");
    }
    quizContent += buttonCode
}

document.getElementById("quizContent").innerHTML = quizContent;
}