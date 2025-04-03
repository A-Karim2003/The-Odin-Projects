"use strict";

const resultEl = document.querySelector(".display-result");
const calculationEl = document.querySelector(".display-calculation");
const deleteEl = document.getElementById("delete");
const clear = document.getElementById("clear");
// const equalBtn = document.querySelector(".equal");
const numbersEl = document.querySelectorAll(".numbers");
const operatorsEl = document.querySelectorAll(".operator");
const accessibilitiesEl = document.querySelectorAll(".accessibility");
const buttonsContainerEl = document.querySelector(".buttons");

const operators = ["+", "-", "÷", "x"];

let operator;
let iscalculating = true;
buttonsContainerEl.addEventListener("click", (e) => {
  const buttons = e.target.closest("button");
  if (!buttons) return;

  //* Handles the logic for displaying text
  //? handle clicks for numbers
  if (buttons.classList.contains("numbers")) {
    if (!iscalculating) {
      resultEl.textContent = "";
      calculationEl.textContent = "";
    }
    iscalculating = true;
    resultEl.textContent += buttons.textContent.trim();
  }

  //? Handle clicks for the delete button
  if (buttons.closest("#delete")) {
    const displayText = resultEl.textContent.trim();
    resultEl.textContent = displayText.slice(0, -1);
  }

  //? Handle clicks for the clear button
  if (buttons.closest("#clear")) {
    resultEl.textContent = "";
    calculationEl.textContent = "";
  }

  //? Handle clicks for the operators
  if (
    buttons.classList.contains("operator") &&
    !buttons.classList.contains("equal")
  ) {
    operator = buttons.textContent;
    const length = resultEl.textContent.trim().length;

    if (!operators.includes(resultEl.textContent.trim()[length - 1]))
      resultEl.append(buttons.textContent.trim());
  }

  //* Now handle the logic for operations
  //? handle logic once equal button is clicked

  const equalBtn = buttons.closest(".equal");
  if (e.target === equalBtn) {
    iscalculating = false;
    const [number1, number2] = resultEl.textContent
      .trim()
      .split(/[+\-x÷=]/)
      .filter((e) => e !== "");
    displayResults(number1, number2);
  }
});

function operate(number1, operator, number2) {
  const isValid = validateInput(number1, operator, number2);
  if (!isValid) return;

  number1 = parseFloat(number1);
  number2 = parseFloat(number2);

  switch (operator) {
    case "+":
      return sum(number1, number2);
    case "-":
      return subtract(number1, number2);
    case "x":
      return multiply(number1, number2);
    case "÷":
      return divide(number1, number2);
    default:
      return "Error with input. Try again!";
  }
}

function displayResults(number1, number2) {
  const isValid = validateInput(number1, operator, number2);
  if (!isValid) return;
  calculationEl.textContent = resultEl.textContent.trim();
  resultEl.textContent = "";
  const result = operate(number1, operator, number2);
  resultEl.textContent = result;
}

function validateInput(number1, operator, number2) {
  if (!number1 || !number2 || !operator) return false;
  return true;
}

function sum(number1, number2) {
  return number1 + number2;
}

function subtract(number1, number2) {
  return number1 - number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function divide(number1, number2) {
  return number1 / number2;
}
