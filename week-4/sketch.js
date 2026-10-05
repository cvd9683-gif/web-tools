// Noise tends to look smoother with coordinates that are very close together
// These values will be multiplied by the x and y coordinates to make the
// resulting values very close together
let xScale = 0.015;
let yScale = 0.02;

// make these variables accessible globally within the 'window' object
window.gap = 10;
window.offset = 0;
window.color1 = "#ff4f9a";
window.color2 = "#3de0ff";
window.bgColor = "#14112b";
window.shape = "circle";
window.autoOffset = false;

function setup() {
  let canvas = createCanvas(400, 400);
  // put the canvas inside the div with id="canvasHolder" so flexbox can place it
  canvas.parent("canvasHolder");

  // Draw the grid
  dotGrid();
}

// draw() runs over and over (about 60 times a second)
// when auto offset is on, we nudge the offset a little and redraw each time
function draw() {
  if (window.autoOffset) {
    window.offset = Number(window.offset) + 0.2;
    dotGrid();
  }
}

function dotGrid() {
  background(window.bgColor);
  noStroke();
  rectMode(CENTER);

  let offset = Number(window.offset) || 0;
  let gap = Number(window.gap) || 10;
  // Loop through x and y coordinates, at increments set by gap
  for (let x = gap / 2; x < width; x += gap) {
    for (let y = gap / 2; y < height; y += gap) {
      // Calculate noise value using scaled and offset coordinates
      let noiseValue = noise((x + offset) * xScale, (y + offset) * yScale);

      // lerpColor mixes the two colors using the noise value (0-1)
      // so small dots get color1 and big dots get color2
      let dotColor = lerpColor(color(window.color1), color(window.color2), noiseValue);
      fill(dotColor);

      // Since noiseValue will be 0-1, multiply it by gap to set diameter to
      // between 0 and the size of the gap between circles
      let diameter = noiseValue * gap;

      if (window.shape == "square") {
        square(x, y, diameter);
      } else {
        circle(x, y, diameter);
      }
    }
  }
}
window.dotGrid = dotGrid;
