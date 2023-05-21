// spawn 256 divs with .pixel class - wrap around to make a grid

const containerDiv = document.querySelector(".canvas-container");
const gridButton = document.querySelector("#grid-selection");
const clearButton = document.querySelector(".clear-grid");

const rainbowButton = document.querySelector(".rainbow-checkbox");
const shadingButton = document.querySelector(".shading-checkbox");

let color = "rgba(0, 0, 0, 1)";
let size = 16;
const canvasWidth = 800;

let rainbowMode = false;
let shadingMode = false;

function removeGrid() {
  const divs = document.querySelectorAll(".pixel");
  for (let i = 0; i < divs.length; i++) {
    containerDiv.removeChild(divs[i]);
  }
}

function renderGrid(size) {
  const pixelSize = canvasWidth / size;
  const numOfPixels = size * size;

  for (let i = 0; i < numOfPixels; i++) {
    const pixelDiv = document.createElement("div");
    pixelDiv.classList.add("pixel");
    pixelDiv.style.width = `${pixelSize}px`;
    pixelDiv.style.height = `${pixelSize}px`;
    pixelDiv.addEventListener("mouseover", hover);
    containerDiv.appendChild(pixelDiv);
  }
}
renderGrid(size);


gridButton.addEventListener("click", gridPrompt);
clearButton.addEventListener("click", () => {
  removeGrid();
  renderGrid(size);
});
rainbowButton.addEventListener("click", rainbowSwitch);
shadingButton.addEventListener("click", shadingSwitch);

function gridPrompt() {
  size = prompt("Select the size of the grid (1-80)");
  while (size > 80 || size < 0) {
    size = prompt("Please select a number between 1 and 80");
  }
  removeGrid();
  renderGrid(size);
}

function rainbowSwitch() {
  if (rainbowMode) {
    rainbowMode = false;
    rainbowButton.classList.toggle("active-rainbow");
  }
  else {
    rainbowMode = true;
    rainbowButton.classList.toggle("active-rainbow");
  }
  console.log(rainbowMode)
}

function shadingSwitch() {
  if (shadingMode) {
    shadingMode = false;
    shadingButton.classList.toggle("active-shading");
  }
  else {
    shadingMode = true;
    shadingButton.classList.toggle("active-shading");
  }
}

function hover(e) {
  /* console.log(rainbowMode) */
  if (shadingMode === true && rainbowMode === true) {
    e.target.style.backgroundColor = rainbowColor(0.1);
  }
  else if (rainbowMode === true) {
    e.target.style.backgroundColor = rainbowColor();
  }
  else if (shadingMode === true) {
    console.log("shading");
    e.target.style.backgroundColor = changeColor(0.1);
  }
  
  else {
    e.target.style.backgroundColor = color;
  }
}

function changeColor(opacity = 1) {
  return `rgba(0, 0, 0, ${opacity})`;
}

function rainbowColor(opacity = 1) {
  let randomRGB = `rgba(${Math.floor(Math.random() * (255 - 0 + 1) + 0)}, ${Math.floor(Math.random() * (255 - 0 + 1) + 0)}, ${Math.floor(Math.random() * (255 - 0 + 1) + 0)}, ${opacity})`; 
  return randomRGB;
}

function shadingColor() {
  return color;
}


// extra TODO:
/* color changer
clear grid
shading */

