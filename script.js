// spawn 256 divs with .pixel class - wrap around to make a grid

const containerDiv = document.querySelector(".canvas-container");
const gridButton = document.querySelector("#grid-selection");

let color = "gray";
let size = 16;
const canvasWidth = 800;

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

function hover(e) {
  e.target.style.backgroundColor = color;
}

// extra TODO:
/* add the rainbow functionality
try to change the listener for click and hold
color changer */

