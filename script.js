import { questionsArr } from './questions.js';

const wrapper = document.querySelector(".wrapper");
const question = document.querySelector("#question");
const choices = document.querySelector(".choices");
const subtitle = document.querySelector("#subtitle");

let currentIndex = 0;
let score = 0;

// Check isCorrect dataset attribute
function checkIsCorrect(e) {
  if (e.target.dataset.isCorrect == "true") {
    score++;
  } else {
  }
  choices.innerHTML = "";
  setQuestion(currentIndex);
}

// Set the question
function setQuestion(num) {
  num = currentIndex;
  if (currentIndex >= questionsArr.length) {
    question.innerHTML = "";
    subtitle.innerHTML = "";
    let msg = document.createElement("h2");
    msg.id = "msg";
    msg.innerHTML = "Congratulations!<br /><br />" + "\n" + "You got " + score + " correct answer(s) out of " + questionsArr.length + " questions.";
    wrapper.appendChild(msg);

    // Create a reset button
    let resetBtn = document.createElement("button");
    resetBtn.classList.add("btn", "btn-outline-success");
    resetBtn.textContent = "Reset";
    wrapper.appendChild(resetBtn);
    resetBtn.addEventListener("click", () => {
      window.location.reload();
    })
  } else {
    question.textContent = (currentIndex + 1)+ ".) " + questionsArr[num].question;
    questionsArr[num].answers.map(el => {
      let inputEl = document.createElement("input");
      inputEl.classList.add("form-control");
      inputEl.type = "button";
      inputEl.value = el.text;
      inputEl.dataset.isCorrect = el.isCorrect;
      choices.appendChild(inputEl);

      inputEl.addEventListener("click", (e) => {
        checkIsCorrect(e);
      });
    });
    subtitle.textContent = (currentIndex + 1) + " of " + questionsArr.length + " Questions";
    currentIndex++;
  }
}

// Load question
window.addEventListener("DOMContentLoaded", setQuestion);
