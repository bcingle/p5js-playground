class Missile {
  constructor(x, y) {
    this.startX = game.settings.width/2;
    this.startY = game.settings.height - game.settings.floor;
    this.x = x;
    this.y = y;
    this.speed = game.settings.missileSpeed;
    this.progress = 0;
    this.distance = dist(this.startX, this.startY, this.x, this.y);
  }

  update() {
    this.progress += this.speed;
    let pct = this.progress / this.distance;
    if (pct >= 1) {
      game.createExplosion(this.x, this.y);
      game.removeMissile(this);
    }
  }

  draw() {
    push();
    
    // move to canon position
    translate(this.startX, this.startY);
    // angle to current location
    let a = atan2(this.y - this.startY, this.x - this.startX);
    // rotate to angle
    rotate(a - PI/2);
    // draw straight line (missile trail), which has been rotated to correct angle
    fill(game.settings.missileTrailColor);
    stroke(game.settings.missileTrailColor);
    line(0, 0, 0, this.progress);
    // draw the actual missile
    fill(game.settings.missileColor);
    stroke(game.settings.missileColor);
    ellipse(0, this.progress, 2, 2);
    
    
    
    pop();
  }
}