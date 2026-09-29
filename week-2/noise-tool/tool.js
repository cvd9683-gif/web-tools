// get access to our inputs
let offsetSlider = document.getElementById("offsetInput");
let gapSlider = document.getElementById("gapInput");
let colorPicker1 = document.getElementById("colorInput1");
let colorPicker2 = document.getElementById("colorInput2");
let bgPicker = document.getElementById("bgInput");
let shapeMenu = document.getElementById("shapeInput");
let autoCheckbox = document.getElementById("autoInput");

// the offset slider gets its own function so that changing a color
// doesn't reset the offset while auto offset is running
offsetSlider.addEventListener("input", onOffsetChange);

function onOffsetChange(ev) {
  window.offset = offsetSlider.value;
  window.dotGrid();
}

// turn auto offset on or off when the checkbox is clicked
autoCheckbox.addEventListener("input", onAutoChange);

function onAutoChange(ev) {
  window.autoOffset = autoCheckbox.checked;
}

// call onChange every time any of the other inputs change
gapSlider.addEventListener("input", onChange);
colorPicker1.addEventListener("input", onChange);
colorPicker2.addEventListener("input", onChange);
bgPicker.addEventListener("input", onChange);
shapeMenu.addEventListener("input", onChange);

// this is called when we change an input
// it copies the values into the sketch and redraws the grid
function onChange(ev) {
  window.gap = gapSlider.value;
  window.color1 = colorPicker1.value;
  window.color2 = colorPicker2.value;
  window.bgColor = bgPicker.value;
  window.shape = shapeMenu.value;
  window.dotGrid();
}

document
  .getElementById("downloadButton")
  .addEventListener("click", downloadCanvasImage);

function downloadCanvasImage() {
  let allCanvasesInThisDocument = document.getElementsByTagName("canvas");
  let p5Canvas = allCanvasesInThisDocument[0];

  p5Canvas.toBlob((blob) => {
    const imageUrl = URL.createObjectURL(blob);

    // create a link (anchor) element
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "image.png"; // Sets the default file name

    // add that link to the document's body and click on it
    document.body.appendChild(a);
    a.click();

    // remove the link the element and the URL
    document.body.removeChild(a);
    URL.revokeObjectURL(imageUrl);
  });
}
