
let worm;
let cols = 40;
let rows = 30;
let gameState;

function setup() {
  createCanvas(400, 300);
  worm = new Worm();
  gameState = GameState.PAUSED;
}

let lastMove = 0;
function draw() {
  
  let now = millis();
  let fps = worm.speed;
  let secPerFrame = 1.0 / fps;
  let msPerFrame = secPerFrame * 1000;
  let elapsed = now - lastMove;
  if (gameState === GameState.PLAYING && elapsed > msPerFrame) {
    lastMove = now;
    worm.move();
  }
  push();
  scale(width / cols, height / rows);
  background(30);
  worm.draw();
  pop();
  drawHelp();
  textAlign(CENTER);
  textSize(48);
  textFont('monospace');
  noStroke();
  fill(255);
  text(gameState, width / 2, height / 2);
}

function drawHelp() {
  textAlign(CENTER);
  textSize(48);
  textFont('monospace');
  noStroke();
  fill(255);
  switch(gameState) {
  case GameState.PLAYING:
    textSize(9);
    fill(127);
    text(`Score: ${worm.body.length}`, width - 30, height - 10);
    break;
  case GameState.PAUSED:
    textSize(48);
    text('PAUSED', width / 2, height / 2);
    textSize(20);
    text('Press SPACE to begin/resume', width / 2, height / 2 + 30);
    text('Use W/A/S/D to move', width / 2, height / 2 + 60);
    break;
  case GameState.GAMEOVER:
    textSize(48);
    text('GAME OVER', width / 2, height / 2);
    textSize(20);
    text(`Score: ${worm.body.length}`, width / 2, height / 2 + 30);
    break;
  }
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode === 32) {
    // space bar
    if (gameState === GameState.PLAYING) {
      gameState = GameState.PAUSED;
    } else {
      if (gameState === GameState.GAMEOVER) {
        worm.reset();
      }
      gameState = GameState.PLAYING;
    }
  } else if (keyCode === 87) {
    // W
    worm.changeDirection(Direction.UP);
  } else if (keyCode === 83) {
    // S
    worm.changeDirection(Direction.DOWN);
  } else if (keyCode === 65) {
    // A
    worm.changeDirection(Direction.LEFT);
  } else if (keyCode === 68) {
    // F
    worm.changeDirection(Direction.RIGHT);
  }
  
}

const GameState = {
  PLAYING: '',
  PAUSED: 'PAUSED',
  GAMEOVER: 'GAME OVER'
}

const Direction = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
};

class Apple {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.floor(random(0, cols));
    this.y = Math.floor(random(0, rows));
  }

  draw() {
    noStroke();
    fill(127);
    rect(this.x, this.y, 1, 1);
  }
}

class WormPart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }


}

class Worm{
  constructor() {
    this.reset();
  }

  reset() {
    this.head = new WormPart(5, 3);
    this.body = [new WormPart(4, 3), new WormPart(3, 3)];
    this.speed = 10;
    this.direction = Direction.RIGHT;
    this.directionQueue = [];
    this.apple = new Apple();
  }

  changeDirection(direction) {
    this.directionQueue.push(direction);
  }

  move() {
    // consume the direction queue
    let i = 0;
    while (i < this.directionQueue.length) {
      let nextDir = this.directionQueue[i++];
      if (this.direction % 2 !== nextDir % 2) {
        this.direction = nextDir;
        break;
      }
    }
    this.directionQueue.splice(0, i);

    // move the head one space in the current direction
    
    let newX = this.head.x;
    let newY = this.head.y;
    switch (this.direction) {
      case Direction.UP:
      newY = this.head.y - 1;
      break;
      case Direction.RIGHT:
      newX = this.head.x + 1;
      break;
      case Direction.DOWN:
      newY = this.head.y + 1;
      break;
      case Direction.LEFT:
      newX = this.head.x - 1;
      break;
    }

    this.body.unshift(this.head);
    this.head = new WormPart(newX, newY);

    if (this.head.x === this.apple.x && this.head.y == this.apple.y) {
      this.apple.reset();
      this.speed = this.speed + .1;
    } else {
      this.body.pop();
    }

    if (this.head.x < 0 || this.head.x >= cols || this.head.y < 0 || this.head.y >= rows) {
      gameState = GameState.GAMEOVER;
    }

    for (let i = 0; i < this.body.length; i++) {
      let part = this.body[i];
      if (this.head.x === part.x && this.head.y === part.y) {
        gameState = GameState.GAMEOVER;
      }
    }
  }

  draw() {
    for (let i = -1; i < this.body.length; i++) {
      let c = map(i, -1, this.body.length, 255, 127);
      fill(c);
      if (i === -1) {
        rect(this.head.x, this.head.y, 1, 1);
      } else {
        rect(this.body[i].x, this.body[i].y, 1, 1);
      }
    }
    this.apple.draw();
  }
}
