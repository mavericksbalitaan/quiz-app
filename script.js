import { questionsArr } from './questions.js';

const wrapper = document.querySelector(".wrapper");
const question = document.querySelector("#question");
const choices = document.querySelector(".choices");

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
    question.textContent = "You got " + score + " correct answer(s) out of " + questionsArr.length + " questions.";

    // Create a reset button
    let resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset";
    wrapper.appendChild(resetBtn);
    resetBtn.addEventListener("click", () => {
      window.location.reload();
    })
  } else {
    question.textContent = questionsArr[num].question;
    questionsArr[num].answers.map(el => {
      let inputEl = document.createElement("input");
      inputEl.type = "button";
      inputEl.value = el.text;
      inputEl.dataset.isCorrect = el.isCorrect;
      choices.appendChild(inputEl);

      inputEl.addEventListener("click", (e) => {
        checkIsCorrect(e);
      });
    });
    currentIndex++;
  }
}

// Load question
window.addEventListener("DOMContentLoaded", setQuestion);
