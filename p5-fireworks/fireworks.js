let fireworks = [];
let explosions = [];
let gravity;

let frames = 0;

function setup() {
  createCanvas(600, 400);

  for (let i = 0; i < 50; i++) {
    let f = new Firework();
    f.onExplode(createExplosion);
    fireworks.push(f);
  }

  gravity = createVector(0, .06);
  runFpsTimer();
  
}

function runFpsTimer() {
  let lastFpsUpdate = millis();
  setInterval(function () {
    let now = millis();
    let elapsed = now - lastFpsUpdate;
    let elapsedSec = elapsed / 1000;
    let fps = frames / elapsedSec;
    console.log(`FPS: ${fps}`);
    frames = 0;
    lastFpsUpdate = now;

    let pCount = 0;
    pCount += fireworks.length;
    explosions.forEach(e => {
      pCount += e.particles.length;
    });

    console.log(`Particles: ${pCount}`);
  }, 1000);
}


function draw() {
  frames++;
  background(10);
  fireworks.forEach(f => {
    f.applyForce(gravity);
    f.update();
    f.show();
  });

  explosions.forEach(e => {
    e.applyForce(gravity);
    e.update();
    e.show();
  });
}

function mouseClicked() {
  let x = mouseX;
  let y = mouseY;

  createExplosion(mouseX, mouseY);
  
  console.log('Mouse clicked');
}

function createExplosion(x, y, size) {
  if (!size) {
    size = random(3, 6);
  }
  let hue = random(0, 100);
  let exp = new Explosion(x, y, size, hue);
  explosions.push(exp);
  exp.onComplete(() => {
    explosions = explosions.filter((value, index, arr) => {
      return value !== exp;
    });
  });
}
