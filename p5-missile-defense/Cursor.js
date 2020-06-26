class Cursor {

  constructor() {
    this.x = mouseX;
    this.y = mouseY;
  }

  update() {
    this.x = max(0, mouseX);
    this.x = min(game.settings.width, this.x);
    this.y = max(game.settings.ceiling, mouseY);
    this.y = min(game.settings.height - game.settings.floor, this.y);
  }

  draw() {
    push();
    let x = max(0, mouseX);
    x = min(game.settings.width, x);
    let y = max(game.settings.ceiling, mouseY);
    y = min(game.settings.height - game.settings.floor, y);

    stroke(game.settings.fgColor);
    line(x - 5, y - 5, x + 5, y + 5);
    line(x - 5, y + 5, x + 5, y - 5);
    pop();
  }
}