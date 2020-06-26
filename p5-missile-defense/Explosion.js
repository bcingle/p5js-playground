class Explosion {
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 0;
    this.growth = game.settings.explosionSpeed;
  }
  
  update() {
    this.size += this.growth;
    if (this.size > game.settings.explosionSize) {
      this.growth = -game.settings.explosionSpeed;
    }
    if (this.size <= 0) {
      game.removeExplosion(this);
    }
  }
  
  draw() {
    push();
    translate(this.x, this.y);
    fill(game.settings.explosionColor);
    stroke(game.settings.bgColor);
    ellipse(0, 0, this.size, this.size);
    pop();
  }
  
  inExplosion(x, y) {
    let distance = dist(x, y, this.x, this.y);
    return distance <= this.size/2; // explosion size is diameter, but we're looking for radius
  }
}