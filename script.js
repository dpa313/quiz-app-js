// getting all required elements
const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const quizBox = document.querySelector(".quiz_box");
const quitBtn = document.querySelector(".buttons .quit");
const continueBtn = document.querySelector(".buttons .restart");
const optionList = document.querySelector(".option_list");
const timeCount = quizBox.querySelector(".timer .time_sec");
const timeLine = quizBox.querySelector("header .time_line");
const timeOff = quizBox.querySelector("header .time_text");

// if start quiz button clicked
startBtn.onclick = () => {
  infoBox.classList.add("active_info"); //show the info box
};

// if exit button clicked
quitBtn.onclick = () => {
  infoBox.classList.remove("active_info"); //hide the info box
};

// if continue button clicked
continueBtn.onclick = () => {
  infoBox.classList.remove("active_info"); //hide the info box
  quizBox.classList.add("quiz_info"); //show quiz box
  showQuestions(0);
  queCounter(1);
  startTimer(15);
  startTimerLine(0);
};

let queCount = 0;
let numCount = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const nextBtn = quizBox.querySelector(".next_btn");
const resultBox = document.querySelector(".result_box");
const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

restartQuiz.onclick = () => {
  resultBox.classList.remove("active_result");
  quizBox.classList.add("quiz_info");

  queCount = 0;
  numCount = 1;
  timeValue = 15;
  widthValue = 0;
  userScore = 0;
  showQuestions(queCount);
  queCounter(numCount);
  clearInterval(counter);
  startTimer(timeValue);
  clearInterval(counterLine);
  startTimerLine(widthValue);
  nextBtn.style.display = "none";
  timeOff.textContent = "Time Left";
};

quitQuiz.onclick = () => {
  window.location.reload();
};
// if next button is clicked
nextBtn.onclick = () => {
  if (queCount < questions.length - 1) {
    queCount++;
    numCount++;
    showQuestions(queCount);
    queCounter(numCount);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = "none";
    timeOff.textContent = "Time Left";
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    console.log("completed");
    showResultBox();
  }
};
// getting questions and options from array
const showQuestions = (index) => {
  const queText = document.querySelector(".que_text");
  let queTag =
    "<span>" +
    questions[index].numb +
    " ." +
    questions[index].question +
    "</span>";
  let optionTag =
    '<div class="option">' +
    questions[index].options[0] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[1] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[2] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[3] +
    "<span></span></div>";
  queText.innerHTML = queTag;
  optionList.innerHTML = optionTag;
  const option = optionList.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
};

let ticIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

const optionSelected = (answer) => {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  const correctAns = questions[queCount].answer;
  const allOptions = optionList.children.length;

  if (userAns == correctAns) {
    userScore += 1;
    console.log(userScore);
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", ticIcon);
    console.log("Correct ans");
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIcon);
    // if answer in incorrect automatically select the correct answer
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAns) {
        optionList.children[i].setAttribute("class", "option correct");
        optionList.children[i].insertAdjacentHTML("beforeend", ticIcon);
      }
    }
    console.log("Wrong ans");
  }
  // once selected then disabled all
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }
  nextBtn.style.display = "block";
};

const startTimer = (time) => {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      timeOff.textContent = "Time Off";
      clearInterval(counter);
      timeCount.textContent = "00";

      const correctAns = questions[queCount].answer;
      const allOptions = optionList.children.length;

      for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].textContent == correctAns) {
          optionList.children[i].setAttribute("class", "option correct");
          optionList.children[i].insertAdjacentHTML("beforeend", ticIcon);
        }
      }

      for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
      }
      nextBtn.style.display = "block";
    }
  }
};

const startTimerLine = (time) => {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px";
    if (time > 550) {
      clearInterval(counterLine);
    }
  }
};

const queCounter = (index) => {
  const counter = quizBox.querySelector(".total_que");
  let countTag =
    "<span><p>" +
    index +
    "</p>of<p>" +
    questions.length +
    "</p>Questions</span>";
  counter.innerHTML = countTag;
};

const showResultBox = () => {
  infoBox.classList.remove("active_info"); //hide the info box
  quizBox.classList.remove("quiz_info"); //hide quiz box
  resultBox.classList.add("active_result");
  const scoreText = resultBox.querySelector(".score_text");
  if (userScore > 3) {
    let scoreTag =
      "<span>Congrats! you got only <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      "<span>Nice! you got only <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span>and sorry, you got only <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
};
