class Aircraft {
  
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
  
  update() {
    this.x += this.speed;
    
    if (game.inExplosion(this.x, this.y)) {
      game.score += game.settings.aircraftScore;
      game.createExplosion(this.x, this.y);
      game.removeAircraft(this);
    }
    
    if (this.x > game.settings.width + 10) {
      game.removeAircraft(this);
    }
  }
  
  draw() {
    push();
    fill(game.settings.aircraftColor);
    stroke(game.settings.aircraftColor);
    translate(this.x, this.y);
    
    beginShape();
    
    let scale = game.settings.width / 500;
    
    vertex(-10 * scale, 0);
    vertex(-10 * scale, -5 * scale);
    vertex(-7 * scale, -2 * scale);
    vertex(0, -3 * scale);
    vertex(10 * scale, 0);
    vertex(8 * scale, 2 * scale);
    vertex(4 * scale, 2 * scale);
    vertex(0, 5 * scale);
    vertex(-2 * scale, 5 * scale);
    vertex(-1 * scale, 2 * scale);
    vertex(-10 * scale, 0);
    
    endShape(CLOSE);
    
    pop();
    
  }
  
  
}