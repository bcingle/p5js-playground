function setup() {
  game = new Game();
  let canvas = createCanvas(game.settings.width, game.settings.height);
  canvas.parent('missile-defense');
}

function draw() {
  game.update();
  game.draw();
}

/** when mouse is clicked, tell the game the mouse has been clicked */
function mouseClicked() {
  game.click = true;
}

function keyPressed() {
  game.keyPressed = keyCode;
}