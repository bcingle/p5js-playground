function setup() {
  game = new Game();
  let canvas = createCanvas(game.settings.width, game.settings.height);
  canvas.parent('missile-defense');
  canvas.mouseClicked(mouseClickedOnCanvas);
}

function draw() {
  game.update();
  game.draw();
}

/** when mouse is clicked, tell the game the mouse has been clicked */
function mouseClickedOnCanvas() {
  game.click = true;
}

function keyPressed() {
  game.keyPressed = keyCode;
}

// touch already activates mouseClicked event
// function touchEnded() {
//   game.click = true; 
// }