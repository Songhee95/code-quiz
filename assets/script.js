var questionArray = [{
    question: "Where is the correct place to insert a JavaScript?",
    answers: [
      "1. The &lt;head&gt; section",
      "2. The &lt;body&gt; section",
      "3. Both the &lt;head&gt; section and the [body] section are correct"
    ],
    correctAnswer: "3"
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      "1. function:myFunction()",
      "2. function myFunction()",
      "3. function = myFunction()"
    ],
    correctAnswer: "3"
  },
  {
    question: "How can you detect the client's browser name?",
    answers: [
      "1. client.navName",
      "2. navigator.appName",
      "3. browser.name"
    ],
    correctAnswer: "2"
  },
  {
    question: "How do you find the number with the highest value of x and y?",
    answers: [
      "1. Math.max(x,y)",
      "2. ceil(x,y)",
      "3. Math.ceil(x,y)",
      "4. top(x,y)"
    ],
    correctAnswer: "1"
  }
];
var headBar = document.querySelector('#head');
var ViewScores = document.querySelector('#viewHighScore')
var timeDisplay = document.querySelector('#timer');
var startContainer = document.querySelector('#startPage');
var startBtn = document.querySelector("#start");
var questionDisplay = document.querySelector('#questionWrap');
var quiz = document.querySelector('#questionPart');
var answer = document.querySelector('#answerPart');
var CheckAnswer = document.querySelector('#checkAnswerWrap');
var Line = document.querySelector('#line');
var checkAnswerDisplay = document.querySelector('#rightOrWrong');
var Score = document.querySelector('#score');
var userId = document.querySelector('#player');
var allDoneSection = document.querySelector('#allDoneWrap');
var Submit = document.querySelector('#submit');
var rankingWrap = document.querySelector("#rankWrap");
var ranking = document.querySelector('#scoreRanking');
var goBackBtn=document.querySelector('#goBack');
var clearBtn = document.querySelector('#clearScores');
var timer;
var totalTime;
var scoreList=[];

allDoneSection.style.display = 'none';
rankingWrap.style.display = 'none';
CheckAnswer.style.display = 'none';

function viewScores(){
  clearInterval(timer);
  rankingList();
  rankingWrap.style.display="block";
  startContainer.style.display = 'none';
  questionDisplay.style.display = 'none';
  allDoneSection.style.display = 'none';
}
function startButton(){
  userId.value= '';
  totalTime = 75;
  startContainer.style.display = 'none';
    timeDisplay.textContent = totalTime;
    // create <hr> and right or wrong text after user clicks the answer
    timer =setInterval(function(){
      totalTime--;
      timeDisplay.textContent = totalTime;
      if(totalTime <0){
        alert('Time out!')
        clearInterval(setInterval);
      }
    },1000);;
    createNewQuiz();
  };
// after click 'Start Quiz' button, create new quiz container in the blank page
// question will start from first index of questionArray
var questionNum = 0;
// after user clicks one of the answers, next quiz shows up
function createNewQuiz(){
    questionWrap.style.display = 'block';
    var questions = document.createElement('h2');
    questions.textContent = questionArray[questionNum].question;
    quiz.append(questions);
    var answerList = questionArray[questionNum].answers;
    for(var i=0; i<answerList.length; i++){
        var options = document.createElement('div');
        options.innerHTML = "<button class=\"btn-sm pt-0 pb-0\">" +answerList[i]+ "</button>";
        options.setAttribute('data-index', i+1);
        answer.appendChild(options);
    }
}
// after user clicks one of the answers, present question disappears and new question shows up
function clear(){
    quiz.textContent = '';
    answer.textContent = '';
}
// check the answer whether user choose right answer or wrong answer.
function correctOrWrong(event){
    var element = event.target;
    if(element.matches('button')){
        var userClick = element.parentElement.getAttribute('data-index');
        var ans = questionArray[questionNum].correctAnswer;
        // correct or wrong div will disappear after 3 sec
        if(userClick === ans){
            CheckAnswer.style.display='block';
            checkAnswerDisplay.textContent = 'CORRECT';
            setTimeout(function(){
              CheckAnswer.style.display='none';
            },1500)
        }else{
            totalTime = totalTime-5;
            CheckAnswer.style.display='block';
            checkAnswerDisplay.textContent = 'WRONG';
            setTimeout(function(){
              CheckAnswer.style.display='none';
            },1500)
        }
    clear();
    questionNum++;
    if(questionNum >= questionArray.length){
      CheckAnswer.style.display = 'none';
      allDoneSection.style.display = 'block';
      clearInterval(timer);
      Score.textContent = totalTime;
      return;
    }
    createNewQuiz();
    }
}
function submit(){
  headBar.style.display = 'none';
  var user = userId.value;
  scoreList.push({
    "Name": user,
    "score": totalTime
  });
  storeScore();
  allDoneSection.style.display = 'none';
  rankingWrap.style.display="block";
  // highscores page 
  rankingList();
}
function storeScore(){
  localStorage.setItem('scoreList', JSON.stringify(scoreList));
}
function init(){
  var scoreFromList = JSON.parse(localStorage.getItem('scoreList'));
  if(scoreFromList !== null){
    scoreList = scoreFromList;
  }
}

function rankingList(){
  for(var k=0; k<scoreList.length; k++){
    var rankName = scoreList[k].Name;
    var rankScore = scoreList[k].score;
    var rankElement = document.createElement('p');
    rankElement.setAttribute("class",'alert-primary');
    rankElement.textContent = (k+1)+ '.'+ rankName + "-"+rankScore;
    ranking.append(rankElement);
  }
}
function goBack(){
  checkAnswerDisplay.textContent ='';
  rankingWrap.style.display = 'none';
  headBar.style.display = 'block';
  startContainer.style.display = 'block';
  ranking.textContent = '';
  timeDisplay.textContent = 0;
  questionNum =0;
  clear();
}
function clearScores(){
  scoreList.splice(0, scoreList.length);
  console.log(scoreList);
  ranking.textContent= ' ';
  storeScore();
  init();
  rankingList();
}

init();
ViewScores.addEventListener('click', viewScores);
startBtn.addEventListener('click', startButton);
answer.addEventListener('click', correctOrWrong);
Submit.addEventListener('click', submit);
goBackBtn.addEventListener('click', goBack);
clearBtn.addEventListener('click', clearScores);

