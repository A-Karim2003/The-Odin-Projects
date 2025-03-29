const range = document.getElementById("range");
const label = document.querySelector(".range-container label");
const container = document.querySelector(".container");
const randomColorEl = document.getElementById("random-color");
const eraseColorEl = document.getElementById("erase-color");
const customColorEl = document.getElementById("custom-color");
const colorPicker = document.getElementById("color-picker");
const borderColorPickerEl = document.getElementById("border-color");
const canvasColorPickerEl = document.getElementById("canvas-color");
const clearBtn = document.querySelector("button");

// An initial grid size of 16x16
createBoxes(50);

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

const hoveredBoxes = [];
//* Functionality for hovering over the canvas
container.addEventListener("mouseover", (e) => {
  const randomColor = getRandomColors();
  const box = e.target;
  if (box === container) return;

  //? Check which colors radio option is checked
  if (randomColorEl.checked) box.style.background = randomColor;
  if (eraseColorEl.checked) box.style.background = "transparent";
  if (customColorEl.checked) box.style.background = colorPicker.value;

  //? Keep track of hovered boxes.
  /* 
  when it comes time for clearing boxes. its more efficient
  to target the hovered boxes instead of all of them
  */
  if (!hoveredBoxes.includes(box)) hoveredBoxes.push(box);
});

//* Functionality for changing the border colors
borderColorPickerEl.addEventListener("change", (e) =>
  updateBorderColor(e.target.value)
);

//* Functionality for changing the canvas colors
canvasColorPickerEl.addEventListener("input", (e) =>
  updateCanvasColor(e.target.value)
);

//* Functionality for clearing the grid colors
clearBtn.addEventListener("click", () => clearGrid());

function createBoxes(gridSize) {
  container.textContent = "";
  const totalBoxes = gridSize * gridSize;
  //? create a temp container to store the boxes
  //* This is better for performance
  const tempContainer = document.createDocumentFragment();

  for (let i = 0; i < totalBoxes; i++) {
    const box = document.createElement("div");

    box.style.width = `calc(100% / ${gridSize})`;
    box.style.height = `calc(100% / ${gridSize})`;
    tempContainer.append(box);
  }
  //? Append all at once instead of each interation in the loop
  container.append(tempContainer);
}

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

function updateBorderColor(color) {
  document.documentElement.style.setProperty("--border-color", color);
}

function updateCanvasColor(color) {
  container.style.background = color;
}

function clearGrid() {
  hoveredBoxes.forEach((box) => (box.style.background = "transparent"));
}
