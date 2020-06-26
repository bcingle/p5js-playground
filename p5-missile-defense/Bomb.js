class Bomb {
  
  constructor(startX, startY, target) {
    this.startX = startX;
    this.startY = startY;
    this.position = createVector(startX, startY);
    this.target = target; // a building
    this.angle = atan2(target.y - startY + target.height, target.x - startX + (target.width/2));
    this.distance = 0;
  }
  
  update() {
    this.distance += game.settings.bombSpeed;
    
    let movementVector = p5.Vector.fromAngle(this.angle, 1);
    this.position = p5.Vector.add(movementVector, this.position);
    
    if (game.inExplosion(this.position.x, this.position.y)) {
      game.createExplosion(this.position.x, this.position.y);
      game.removeBomb(this);
      game.score += game.settings.bombScore;
    }
  
    if (this.position.y >= game.settings.height - game.settings.floor) {
      // bumb has hit the ground
      this.target.explode();
      game.removeBomb(this);
    }
  }
  
  draw() {
    push();
    
    let angle = atan2(this.target.y - this.startY + this.target.height, this.target.x - this.startX + (this.target.width/2));
    
    stroke(game.settings.bombTrailColor);
    fill(game.settings.bombTrailColor);
    line(this.startX, this.startY, this.position.x, this.position.y);
    
    translate(this.position.x, this.position.y);
    rotate(angle);
    stroke(game.settings.bombColor);
    fill(game.settings.bombColor);
    ellipse(0, 0, 8, 4);
    beginShape();
    vertex(0, 0);
    vertex(-4, -4);
    vertex(-4, 4);
    vertex(0, 0);
    endShape();
    
    
    
    pop();
  }
}