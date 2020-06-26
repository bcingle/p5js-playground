class Building {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.damage = 0;
  }

  update() {}

  explode() {
    this.damage += game.settings.bombDamage;
    if (this.isDestroyed()) {
      game.removeBuilding(this);
    }
  }

  draw() {
    push();
    stroke(game.settings.buildingColor);
    fill(game.settings.buildingColor);
    this.draw1();
    this.draw2();
    this.draw3();
    this.draw4();
    this.draw5();
    this.draw6();
    this.draw7();
    this.draw8();
    pop();
  }

  isDestroyed() {
    return this.damage >= 8;
  }

  draw1() {
    if (this.damage < 5) {
      rect(this.x,
        this.y + (this.height / 2),
        this.width / 8,
        this.height / 2);
    }
  }

  draw2() {
    if (this.damage < 4) {
      rect(this.x + (this.width / 8),
        this.y + (this.height / 3),
        this.width / 8,
        this.height * 2 / 3);
    }
  }

  draw3() {
    if (this.damage < 7) {
      rect(this.x + (this.width * 2 / 8),
        this.y + (this.height * 3 / 4),
        this.width / 8,
        this.height / 4);
    }
  }

  draw4() {
    if (this.damage < 2) {
      rect(this.x + (this.width * 3 / 8),
        this.y,
        this.width / 8,
        this.height);
    }
  }

  draw5() {
    if (this.damage < 8) {
      rect(this.x + (this.width * 4 / 8),
        this.y + (this.height / 4),
        this.width / 8,
        this.height * 3 / 4);
    }
  }

  draw6() {
    if (this.damage < 1) {
      rect(this.x + (this.width * 5 / 8),
        this.y + (this.height / 2),
        this.width / 8,
        this.height / 2);
    }
  }

  draw7() {
    if (this.damage < 3) {
      rect(this.x + (this.width * 6 / 8),
        this.y + (this.height / 3),
        this.width / 8,
        this.height * 2 / 3);
    }
  }

  draw8() {
    if (this.damage < 6) {
      rect(this.x + (this.width * 7 / 8),
        this.y + (this.height * 3 / 4),
        this.width / 8,
        this.height / 4);
    }
  }

}