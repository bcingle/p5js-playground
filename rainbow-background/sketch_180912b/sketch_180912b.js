let width = 300;
let height = 300;

function setup() {
  createCanvas(width, height);
  background(0);
}

function draw() {
  let frames = 255;
  let c = frameCount % frames;
  let relative, r, g, b;
  if (c < 64) {
    relative = c / 64;
    r = 255;
    g = relative * 255;
    b = 0;
  } else if (c < 128) {
    relative = (c - 64) / 64;
    r = 255 - (relative * 255);
    g = 255;
    b = relative * 255;
  } else if (c < 192) {
    relative = (c - 128) / 64;
    r = 0;
    g = 255 - (relative * 255);
    b = 255;
  } else {
    relative = (c - 192) / 64;
    r = relative * 255;
    g = 0;
    b = 255 - (relative * 255);
  }
  console.log('r ' + r + ' g ' + g + ' b ' + b);

  background(r, g, b);
}
