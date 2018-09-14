const pitft = require("pitft");
const fb = pitft("/dev/fb1", true);
const screenDims = fb.size();
const fontFace = "fantasy";

const Colors = {
  black: fb.patternCreateRGB(1, 1, 1),
  white: fb.patternCreateRGB(0, 0, 0),
  red: fb.patternCreateRGB(1, 0, 0),
  green: fb.patternCreateRGB(0, 1, 0),
  blue: fb.patternCreateRGB(0, 0, 1)
};

function parseColor(webColor) {
  const byte = 0xFF;
  if (!webColor || webColor.indexOf("#") < 0) return [1, 1, 1];
  try {
    let red = parseInt(webColor.slice(1, 3), 16)
    let green = parseInt(webColor.slice(3, 5), 16);
    let blue = parseInt(webColor.slice(5), 16);
    return [red / byte, green / byte, blue / byte];
  }
  catch (err) {
    return [1, 1, 1];
  }
}

function update() { fb.blit(); }
function clear() { fb.clear(); }
function drawBackground(color) { 
  setColor(color);
  fb.rect(0, 0, screenDims.width, screenDims.height); 
}
function drawCenteredText(text, color = Colors.white, fontSize = 25, vOffset = 0) {
  setColor(color);
  fb.font(fontFace, fontSize);
  let x = screenDims.width / 2;
  let y = (screenDims.height / 2) + vOffset;
  fb.text(x, y, text, true); 
}
function setColor(color) {
  if (typeof color === "number") {
    fb.color(color);
  } else if (typeof color === "string") {
    const c = parseColor(color);
    fb.color(c[0], c[1], c[2]);
  }
}

class Screen {
  constructor() {
    clear();
    drawBackground(Colors.black);
    drawCenteredText("Initialized", Colors.white);
  }

  setBackgroundColor(color) {
    drawBackground(color);
    update();
  }

  printText(text, background = Colors.black, foreground = Colors.white) {
    drawBackground(background);
    drawCenteredText(text, foreground);
    update();
  }

}

module.exports = {
  screen: new Screen(),
  Colors
};