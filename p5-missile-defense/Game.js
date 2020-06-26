class Game {
  
  constructor() {
    this.defaultSettings = {
      width: 720, // width of the canvas
      height: 500, // height of the canvas
      bgColor: 10, // normal background color
      fgColor: 220, // normal foreground color
      bombColor: '#f00', // red
      bombTrailColor: '#f99', // light red
      aircraftColor: '#0f0', // green
      buildingColor: '#00f', // blue
      canonColor: 220, // light gray
      missileColor: '#33f', // light blue
      missileTrailColor: '#99f', // very light blue
      explosionColor: '#f90', // orange
      groundColor: '#090', // dark green
      ceiling: 60, // the space above the playable area, reserved for HUD
      floor: 30, // the space below the playable area, reserved for HUD
      missileSpeed: 4, // the speed of launchedm missiles
      planeSpeedMin: 0.5, // minimum speed of aircraft
      planeSpeedMax: 1.5, // maximum speed of aircraft
      aircraftScore: 1000, // how many points you get for destroying an aircract
      bombScore: 100, // how many points you get for destroying a bomb
      explosionSpeed: 1.8, // how fast an explosion grows/shrinks
      explosionSize: 100, // how big an explosion gets before it stops growing
      bombSpeed: 1.2, // the speed of bombs
      bombDamage: 3, // buildings have 8 possible damage
      maxMissiles: 3, // max number of missiles at a time
      startingMissiles: 100, // number of missiles available at start
      averageAircraftInterval: 800, // average frames between aircraft
      averageBombInterval: 100 // average frames between bombs
    };
    // maybe add an interface for user to change settings?
    this.settings = this.defaultSettings;
    this.resetGame();
    this.paused = true;
  }

  resetSettings() {
    this.settings = this.defaultSettings;
  }

  resetGame() {
    this.city = this.populateCity();
    this.canon = this.generateCanon();
    this.cursor = new Cursor();
    this.missiles = [];
    this.explosions = [];
    this.aircraft = [];
    this.bombs = [];
    this.gameOverMessage = new Overlay('GAME OVER');
    this.pausedMessage = new Overlay('PAUSED');
    this.click = false;
    this.keyPressed = false;
    this.paused = false;
    this.missilesRemaining = this.settings.startingMissiles;
    this.score = 0;
  }

  update() {
    if (!focused) {
      // do no updates
    } else if (this.isGameOver()) {
      if (this.keyPressed === 32 || game.click) {
        this.resetGame();
      }
    } else if (this.isPaused()) {
      if (this.keyPressed === 32 || game.click) {
        this.paused = false;
      }
    } else {
      if (this.keyPressed === 32) {
        this.paused = true;
      } else {
        this.cursor.update();
        if (this.click && this.missilesRemaining > 0) {
          this.launchMissile(this.cursor.x, this.cursor.y);
          this.missilesRemaining -= 1;
        }
        this.canon.update();
        this.city.forEach(b => b.update());
        this.missiles.forEach(m => m.update());
        this.explosions.forEach(e => e.update());
        this.aircraft.forEach(a => a.update());
        this.bombs.forEach(b => b.update());

        // every so often, create an aircraft
        let r = random(this.settings.averageAircraftInterval);
        if (Math.floor(r) === 1) {
          this.createRandomAircraft();
        }

        // every so often, drop a bomb
        r = random(this.settings.averageBombInterval);
        if (Math.floor(r) === 1) {
          this.createSmartBomb();
        }
      }
    }

    this.click = false;
    this.keyPressed = null;
  }

  draw() {
    push();
    background(this.settings.bgColor);
    fill(this.settings.fgColor);
    textFont('monospace');
    stroke(this.settings.groundColor);
    line(0, this.settings.height - this.settings.floor, this.settings.width, this.settings.height - this.settings.floor);
    stroke(this.settings.bgColor);
    this.cursor.draw();
    this.canon.draw();
    this.city.forEach(b => b.draw());
    this.missiles.forEach(m => m.draw());
    this.explosions.forEach(e => e.draw());
    this.aircraft.forEach(a => a.draw());
    this.bombs.forEach(b => b.draw());

    if (this.isGameOver()) {
      this.gameOverMessage.draw();
    }

    if (this.isPaused()) {
      this.pausedMessage.draw();
    }

    // draw hud
    // score in top center
    // missile count in bottom center
    textAlign(LEFT, CENTER);
    textSize(this.settings.ceiling/2);
    text(this.score, this.settings.width/2, this.settings.ceiling/2);
    textAlign(CENTER, CENTER);
    textSize(this.settings.floor/2);
    text(this.missilesRemaining, this.settings.width/2, this.settings.height - (this.settings.floor/2));

    pop();
  }

  createExplosion(x, y) {
    let explosion = new Explosion(x, y);
    this.explosions.push(explosion);
  }

  createRandomAircraft() {
    let y = random(50, 200);
    let speed = random(this.settings.planeSpeedMin, this.settings.planeSpeedMax);
    this.aircraft.push(new Aircraft(-10, y, speed));
  }

  createSmartBomb() {
    let x = random(0, this.settings.width);
    let y = this.settings.ceiling;
    let idx = Math.floor(random(this.city.length));
    let building = this.city[idx];
    let bomb = new Bomb(x, y, building);
    this.bombs.push(bomb);

  }
  
  createBomb(target) {
    // target is one of the buildings, if it still exists
    let idx = this.city.indexOf(target);
    if (idx >= 0) {
      
    }
  }

  launchMissile(x, y) {
    if (this.missiles.length > this.settings.maxMissiles) {
      return;
    }
    let missile = new Missile(x, y);
    this.missiles.push(missile);
  }

  removeAircraft(aircraft) {
    let idx = this.aircraft.indexOf(aircraft);
    if (idx >= 0) {
      this.aircraft.splice(idx, 1);
    }
  }

  removeMissile(missile) {
    var idx = game.missiles.indexOf(missile);
    if (idx >= 0) {
      game.missiles.splice(idx, 1);
    }
  }

  removeExplosion(explosion) {
    let idx = game.explosions.indexOf(explosion);
    if (idx >= 0) {
      game.explosions.splice(idx, 1);
    }
  }

  removeBomb(bomb) {
    let idx = this.bombs.indexOf(bomb);
    if (idx >= 0) {
      game.bombs.splice(idx, 1);
    }
  }

  removeBuilding(building) {
    let idx = this.city.indexOf(building);
    if (idx >= 0) {
      game.city.splice(idx, 1);
    }
  }

  inExplosion(x, y) {
    for (let i = 0; i < this.explosions.length; i++) {
      let explosion = this.explosions[i];
      if (explosion.inExplosion(x, y)) {
        return true;
      }
    }
    return false;
  }

  populateCity() {
    let city = [];
    let x = this.settings.width / 20;
    let width = this.settings.width / 20;
    let height = this.settings.height / 20;
    for (let i = 0; i < 3; i++) {
      city.push(new Building(x, this.settings.height - this.settings.floor - height, width, height));
      x += this.settings.width / 8;
    }
    x += this.settings.width / 5;
    for (let i = 0; i < 3; i++) {
      city.push(new Building(x, this.settings.height - this.settings.floor - height, width, height));
      x += this.settings.width / 8;
    }
    return city;
  }

  generateCanon() {
    let width = this.settings.width / 10;
    let height = this.settings.height / 10;
    let x = this.settings.width / 2 - width / 2;
    let y = this.settings.height - this.settings.floor - height;
    let canon = new Canon(x, y, width, height, 100);
    return canon;
  }

  isGameOver() {
    // game over if all cities are destroyed or if there are no more missiles or explosions
    return this.city.length === 0 || 
      (this.missilesRemaining === 0 && 
       this.explosions.length === 0 &&
       this.missiles.length === 0);
  }

  isPaused() {
    return this.paused;
  }
}