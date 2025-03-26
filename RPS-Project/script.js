const main = document.querySelector("main");
const optionsContainer = document.querySelector(".options-container");
const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score ");
const displayPlayerChoice = document.querySelector(".display-player-choice  ");
const displayComputerChoice = document.querySelector(
  ".display-computer-choice  "
);

optionsContainer.addEventListener("click", (e) => {
  //? Get human choice
  const humanChoice = e.target.closest(".option");
  if (!humanChoice) return;

  //? Display player choice image in the DOM
  renderPlayerChoice(humanChoice);

  //? Get computer choice
  const computerChoice = getComputerChoice();
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
