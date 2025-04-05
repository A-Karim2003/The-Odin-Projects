"use strict";

const resultEl = document.querySelector(".display-result");
const calculationEl = document.querySelector(".display-calculation");
const buttonsContainerEl = document.querySelector(".buttons");

const operators = ["+", "-", "÷", "x", "%"];
let operator;
let iscalculating = true;

buttonsContainerEl.addEventListener("click", (e) => {
  const buttons = e.target.closest("button");
  if (!buttons) return;

  //? If the first char entered is an operator, ignore
  if (
    resultEl.textContent.trim() === "" &&
    e.target.classList.contains("operator")
  ) {
    return;
  }

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
  deleteContent(buttons);

  //? Handle clicks for the clear button
  clear(buttons);

  //? Handle clicks for the operators
  if (
    buttons.classList.contains("operator") &&
    !buttons.classList.contains("equal")
  ) {
    iscalculating = true;

    //? If user clicks operator after calculation instead of equals
    const [number1, number2] = getNumbers();
    operator = buttons.textContent.trim();

    const result = operate(number1, operator, number2);
    if (result) {
      displayResults(number1, number2);
    }

    //* Ensures no duplicate operators
    const text = resultEl.textContent.trim();
    const length = text.length;

    if (operators.includes(text[length - 1])) {
      // If last character is an operator → replace it
      resultEl.textContent = text.slice(0, -1) + operator;
    } else {
      // Otherwise just add the operator
      resultEl.append(operator);
    }
  }

  //* Now handle the logic for operations
  //? handle logic once equal button is clicked

  const equalBtn = buttons.closest(".equal");
  if (e.target === equalBtn) {
    iscalculating = false;
    const [number1, number2] = getNumbers();
    displayResults(number1, number2);
  }
});
function clear(buttons) {
  if (buttons.closest("#clear")) {
    resultEl.textContent = "";
    calculationEl.textContent = "";
  }
}

function deleteContent(buttons) {
  if (buttons.closest("#delete")) {
    //* Takes the text content removes 1 element and adds it back
    const displayText = resultEl.textContent.trim();
    resultEl.textContent = displayText.slice(0, -1);
    calculationEl.textContent = "";
  }
}

function getNumbers() {
  return resultEl.textContent
    .trim()
    .split(/[+\-x÷=%]/)
    .filter((e) => e !== "");
}

function operate(number1, operator, number2) {
  const isValid = validateInput(number1, operator, number2);
  if (!isValid) return;

  number1 = parseFloat(number1);
  number2 = parseFloat(number2);

  //? Check for 0 divisions
  if (number2 === 0 && operator === "÷") return "This is tomfoolery";

  switch (operator) {
    case "+":
      return sum(number1, number2);
    case "-":
      return subtract(number1, number2);
    case "x":
      return multiply(number1, number2);
    case "÷":
      return divide(number1, number2);
    case "%":
      return remainder(number1, number2);
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
  const formattedResult = formatResult(result);
  resultEl.textContent = formattedResult;
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

function remainder(number1, number2) {
  return number1 % number2;
}

function isFloat(result) {
  return result % 1 !== 0;
}

function formatResult(result) {
  if (isFloat(result)) return Number(result.toFixed(3));
  return Number(result);
}
