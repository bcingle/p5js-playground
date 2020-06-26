class Canon {
  
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    let angle = 0;
  }
  
  update() {
  }
  
  draw() {
    push();
    stroke(game.settings.canonColor);
    fill(game.settings.canonColor);
    let vx0 = this.x + this.width / 2;
    let vy0 = this.y + this.height;
    translate(vx0, vy0);
    arc(0, 5, 25, 25, PI, TWO_PI);
    var tan = atan2(game.cursor.y - vy0, game.cursor.x - vx0);
    rotate(tan);
    
    strokeWeight(6);
    line(0, 0, 20, 0);

    pop();
  }
}