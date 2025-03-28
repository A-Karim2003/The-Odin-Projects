const range = document.getElementById("range");
const label = document.querySelector(".range-container label");
const container = document.querySelector(".container");
const randomColorEl = document.getElementById("random-color");
const eraseColorEl = document.getElementById("erase-color");
const customColorEl = document.getElementById("custom-color");
const colorPicker = document.getElementById("color-picker");

// An initial grid size of 16x16
createBoxes(60);

//* Functionality for the range slider and adding boxes
range.addEventListener("input", (e) => {
  const value = Number(e.target.value);
  label.textContent = value;

  const rangeWidth = e.target.clientWidth;
  const max = Number(e.target.max); // 100

  // Normalize the value between 0 and 1
  const percent = value / max;
  const thumbOffset = percent * rangeWidth;
  label.style.left = `${thumbOffset}px`;
  if (value >= 90) {
    label.style.transform = `translateX(-90%)`;
  } else {
    label.style.transform = "";
  }

  //? Adds grid based on slider range value
  createBoxes(value);
});

function createBoxes(gridSize) {
  container.textContent = "";
  const totalBoxes = gridSize * gridSize;

  for (let i = 0; i < totalBoxes; i++) {
    const box = document.createElement("div");

    box.style.width = `calc(100% / ${gridSize})`;
    box.style.height = `calc(100% / ${gridSize})`;
    container.append(box);
  }
}

//* Functionality for hovering over the canvas

container.addEventListener("mouseover", (e) => {
  const randomColor = getRandomColors();
  const canvasColor = eraseColors();
  const box = e.target;
  if (box === container) return;

  //? Check if Random Colors radio option is checked
  if (randomColorEl.checked) box.style.background = randomColor;
  if (eraseColorEl.checked) box.style.background = canvasColor;
  if (customColorEl.checked) box.style.background = colorPicker.value;
});

function getRandomColors() {
  const [R, G, B] = Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * 256)
  );

  return `rgb(${R}, ${G}, ${B})`;
}

/* 
The erase functionality works by settings the individual
boxes inside to match the containers (canvas) color.
*/

function eraseColors() {
  const containerColor = getComputedStyle(container).backgroundColor;

  return containerColor;
}
