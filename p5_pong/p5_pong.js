var playerPaddle;
var aiPaddle;
var ball;

var paddleWidth;
var paddleHeight;
var ballRadius;
var impacts = 0;
var moveMultiplier = 5;
var status;
var statusEnum = {
  reset: 'reset',
  playing: 'playing'
};

var score = {
  player: 0, 
  ai: 0
}

function setup() {
  var canvas = createCanvas(600, 400);
  canvas.parent('sketch-holder');
  paddleWidth = width / 100;
  paddleHeight = height / 8;
  ballRadius = paddleWidth / 2;
  playerPaddle = new Paddle(paddleWidth, height / 2 - paddleHeight);
  aiPaddle = new Paddle(width - (paddleWidth * 2), height / 2 - paddleHeight);
  reset();
}

function reset() {
  ball = new Ball(paddleWidth * 2 + ballRadius, playerPaddle.y + paddleHeight / 2);
  status = statusEnum.reset;
  impacts = 0;
}

function draw() {
  background(0);
  fill(255);
  var lineLength = height / 8;
  for (var i = 0; i < 8; i++) {
    stroke(128);
    line(width / 2, i * lineLength, width / 2, i * lineLength + lineLength / 2);
  }
  noStroke();
  ball.draw();
  if (status === statusEnum.reset && keyIsDown(32)) {
    status = statusEnum.playing;
    ball.move(moveMultiplier / 2, moveMultiplier / 2);
  }
  if (keyIsDown(UP_ARROW)) {
    playerPaddle.move(-moveMultiplier);
    if (status === statusEnum.reset) {
      ball.move(0, -moveMultiplier);
    }
  } else if (keyIsDown(DOWN_ARROW)) {
    playerPaddle.move(moveMultiplier);
    if (status === statusEnum.reset) {
      ball.move(0, moveMultiplier);
    }
  } else {
    playerPaddle.move(0);
    if (status === statusEnum.reset) {
      ball.move(0, 0);
    }
  }
  var aiDeltaY = ball.y - (aiPaddle.y + paddleHeight / 2);
  var aiMove = constrain(aiDeltaY, -(moveMultiplier), moveMultiplier);
  aiPaddle.move(aiMove);
  playerPaddle.draw();
  aiPaddle.draw();
  textSize(paddleWidth * 2);
  text(score.player, paddleWidth * 3, paddleWidth * 3);
  text(score.ai, width - paddleWidth * 3, paddleWidth * 3);
  
  if (status === statusEnum.reset) {
    textFont('monospace');
    textSize(min(height, width) / 4);
    textAlign(CENTER);
    noFill();
    stroke(128);
    text('P5-PONG', width / 2, height / 2);
    textSize(min(height, width) / 24);
    fill(128);
    noStroke();
    text('Press SPACE to start', width / 2, 3 * height / 4);
  }
}
