function setup() {
  createCanvas(600, 600);
  birds = [];
  for (var i = 0; i < 15; i++) {
    birds[i] = randomBird();
  }
}

var birds;

function draw() {
  background(128, 160, 255);
  sun();
  for (var i = 0; i < birds.length; i++) {
    drawBird(birds[i]);
  }
  rainbow(height - 120);
  clouds(height - 120);
}

function clouds(y) {

  cloudBundle(80, y);
  cloudBundle(width - 80, y);
}

function rainbow(y) {
  push();
  strokeWeight(1);
  noFill();
  colorMode(HSB);
  var end = constrain(map(mouseX, 0, width, PI, TWO_PI), PI, TWO_PI);
  for (var i = 0; i < 100; i++) {
    stroke(map(i, 0, 100, 255, 0), 255, 100);
    arc(width/2, y, 400 + i, 400 + i, PI, end);
  }
  pop();
}

function cloudBundle(x, y) {
  push();
  noStroke();
  fill(240);
  ellipse(x - 40, y + 20, 60, 30);
  ellipse(x, y + 20, 60, 30);
  ellipse(x + 40, y + 20, 60, 30);
  ellipse(x - 20, y, 60, 30);
  ellipse(x + 20, y, 60, 30);
  pop();
}

function sun() {
  push();
  noStroke();
  fill(255, 255, 0);
  ellipse(120, 120, 100, 100);
  fill(240);
  ellipse(100, 90, 120, 50);
  ellipse(140, 150, 80, 30);
  pop();
}

function randomBird() {
  return {
  x: 
    random(20, width - 20), 
    y: 
    random(20, height - 20), 
    size: 
    random(20, 40)
  };
}

function drawBird(bird) {
  push();
  stroke(0);
  noFill();
  arc(bird.x, bird.y, bird.size/2, bird.size/4, PI, 0);
  arc(bird.x + bird.size/2, bird.y, bird.size/2, bird.size/4, PI, 0);
  pop();
}
