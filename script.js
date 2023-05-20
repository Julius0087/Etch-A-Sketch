// spawn 256 divs with .pixel class - wrap around to make a grid

const containerDiv = document.querySelector(".canvas-container");
const gridButton = document.querySelector("#grid-selection");
const rainbowButton = document.querySelector(".rainbow-checkbox");

let color = "gray";
let size = 16;
const canvasWidth = 800;

let rainbowMode = false;

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
rainbowButton.addEventListener("click", rainbowSwitch);

function gridPrompt() {
  size = prompt("Select the size of the grid (1-80)");
  while (size > 80 || size < 0) {
    size = prompt("Please select a number between 1 and 80");
  }

  const divs = document.querySelectorAll(".pixel");
  for (let i = 0; i < divs.length; i++) {
    containerDiv.removeChild(divs[i]);
  }
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

function hover(e) {
  console.log(rainbowMode)
  if (rainbowMode === true) {
    e.target.style.backgroundColor = rainbowColor();
  }
  else {
    e.target.style.backgroundColor = color;
  }
  
}

function rainbowColor() {
  let randomRGB = `rgb(${Math.floor(Math.random() * (255 - 0 + 1) + 0)}, ${Math.floor(Math.random() * (255 - 0 + 1) + 0)}, ${Math.floor(Math.random() * (255 - 0 + 1) + 0)})`;
    return randomRGB;
}


// extra TODO:
/* color changer */

