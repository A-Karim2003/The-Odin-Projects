const main = document.querySelector("main");
const optionsContainer = document.querySelector(".options-container");
const playerScoreEl = document.querySelector(".player-score span");
const computerScoreEl = document.querySelector(".computer-score span");
const displayPlayerChoice = document.querySelector(".display-player-choice  ");
const displayComputerChoice = document.querySelector(
  ".display-computer-choice  "
);
const resultEl = document.querySelector(".result");
resultEl.style.display = "none";

let playerScore = 0;
let computerScore = 0;
let result = "";
let isPlaying = true;
optionsContainer.addEventListener("click", (e) => {
  if (!isPlaying) return;

  //? Get human choice
  const humanChoice = e.target.closest(".option");
  if (!humanChoice) return;

  //? Display player choice image in the DOM
  renderPlayerChoice(humanChoice);

  //? Get computer choice
  const computerChoice = getComputerChoice();

  //? Display player choice image in the DOM
  renderComputerChoice(computerChoice);

  //? Play a round and find winner for each round
  const humanChoiceName = humanChoice.classList[0];
  playRound(humanChoiceName, computerChoice);

  //? Check is theres a winner
  if (playerScore >= 5) {
    result = "You Win!";
    displayResult(result);
    isPlaying = false;
    return;
  }

  if (computerScore >= 5) {
    result = "You Lose!";
    displayResult(result);
    isPlaying = false;
    return;
  }
});

function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  const randomNum = Math.floor(Math.random() * 3);
  return options[randomNum];
}

function renderPlayerChoice(humanChoice) {
  displayPlayerChoice.textContent = "";
  const selectedEmoji = humanChoice.querySelector("img");
  displayPlayerChoice.insertAdjacentHTML("beforeend", selectedEmoji.outerHTML);
}

function renderComputerChoice(computerChoice) {
  displayComputerChoice.textContent = "";
  const img = document.createElement("img");
  img.src = `./img/${computerChoice}-emoji.png`;
  displayComputerChoice.append(img);
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return;
  }

  if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    playerScoreEl.textContent = ++playerScore;
  } else {
    computerScoreEl.textContent = ++computerScore;
  }
}

function displayResult(result) {
  resultEl.style.display = "block";
  const h3 = document.createElement("h3");
  h3.textContent = result;
  resultEl.append(h3);
}
