// spawn 256 divs with .pixel class - wrap around to make a grid

const containerDiv = document.querySelector(".canvas-container");
const gridButton = document.querySelector("#grid-selection");
const clearButton = document.querySelector(".clear-grid");

const rainbowButton = document.querySelector(".rainbow-checkbox");
const shadingButton = document.querySelector(".shading-checkbox");

let color = "rgba(0,0,0,1.0)";
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
    pixelDiv.style.backgroundColor = "white";
    pixelDiv.style.opacity = "1";
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
  const currentOpacity = e.target.style.opacity;
  console.log(currentOpacity);

  const currentColor = e.target.style.backgroundColor;
  if (shadingMode === true && rainbowMode === true) {
    e.target.style.backgroundColor = rainbowColor(0.1);
  }
  else if (rainbowMode === true) {
    e.target.style.backgroundColor = rainbowColor();
  }
  else if (shadingMode === true) {
    e.target.style.backgroundColor = drawShade(e, color, currentColor);
  }
  else {
    e.target.style.backgroundColor = color;
  }
}

function drawShade(e, color, currentColor) {
  let divColor = e.target.style.backgroundColor;
  
  const colorSplit = color.split(",")

  const divRed = colorSplit[0].split("(")[1];
  const divGreen = colorSplit[1];
  const divBlue = colorSplit[2];

  console.log(`currentColor: ${currentColor}`)
  if (divColor !== currentColor || divColor === "white") {
    return `rgba(${divRed},${divGreen},${divBlue},0.1)`;
  }

  try {
    let currentColorSplitShade = currentColor.split(",")[3];
    currentColorSplitShade = Number(currentColorSplitShade.split(")")[0]);

    let newDivShade = currentColorSplitShade + 0.1;
    console.log(newDivShade);
    return `rgba(${divRed},${divGreen},${divBlue},${newDivShade})`;
  }
  catch(err) {
    console.log(err);
  }
}

function rainbowColor(opacity = 1) {
  let randomRGB = `rgba(${Math.floor(Math.random() * (255 - 0 + 1) + 0)},${Math.floor(Math.random() * (255 - 0 + 1) + 0)},${Math.floor(Math.random() * (255 - 0 + 1) + 0)},${opacity})`; 
  return randomRGB;
}

function shadingColor() {
  return color;
}

