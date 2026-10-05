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

// ---- Gallery ----
// "Add to gallery" takes a picture of the canvas and adds it to the page

document.getElementById("addButton").addEventListener("click", addToGallery);

function addToGallery() {
  let p5Canvas = document.getElementsByTagName("canvas")[0];

  // make a new <img> and use the canvas picture as its source
  let img = document.createElement("img");
  img.src = p5Canvas.toDataURL();
  img.title = "Click to download";

  // clicking a thumbnail downloads that pattern
  img.addEventListener("click", function () {
    let a = document.createElement("a");
    a.href = img.src;
    a.download = "image.png";
    a.click();
  });

  // put the new image in the gallery and hide the "nothing here yet" message
  document.getElementById("gallery").appendChild(img);
  document.getElementById("emptyMessage").style.display = "none";
}

// ---- Palettes ----
// inspired by coolors: each button sets all three colors at once

function setPalette(small, big, background) {
  colorPicker1.value = small;
  colorPicker2.value = big;
  bgPicker.value = background;
  onChange();
}

document.getElementById("paletteNight").addEventListener("click", function () {
  setPalette("#ff4f9a", "#3de0ff", "#14112b");
});
document.getElementById("paletteSunset").addEventListener("click", function () {
  setPalette("#ffd23f", "#ee4266", "#540d6e");
});
document.getElementById("paletteForest").addEventListener("click", function () {
  setPalette("#a7c957", "#f2e8cf", "#386641");
});
document.getElementById("palettePaper").addEventListener("click", function () {
  setPalette("#e63946", "#1d3557", "#f1faee");
});

// ---- Mutate ----
// inspired by pattern mutation: change the pattern a little bit at random

document.getElementById("mutateButton").addEventListener("click", mutate);

function mutate() {
  // jump to a random offset
  offsetSlider.value = Math.random() * 100;
  window.offset = offsetSlider.value;

  // make the gap a little bigger or smaller (between -2 and +2)
  let change = Math.round(Math.random() * 4 - 2);
  gapSlider.value = Number(gapSlider.value) + change;

  onChange();
}
