class Overlay {
  
  constructor(text) {
    this.text = text;
  }
  
  update() {
    
  }
  
  draw() {
    push();
    let width = textWidth(this.text);
    let height = textAscent();
    // at 12 point font, width and height must fill 80% of frame
    let maxWidth = game.settings.width * 0.8;
    let maxHeight = game.settings.height * 0.8;
    
    let scaleWidth = maxWidth / width;
    let scaleHeight = maxHeight / height;
    
    let scale = Math.min(scaleWidth, scaleHeight);
    
    let x = game.settings.width / 2;
    let y = game.settings.height / 2;
    
    textAlign(CENTER, CENTER);
    textSize(scale * 12);
    text(this.text, x, y);
    
    textSize(scale * 2);
    text('press spacebar to continue', x, y + (scale * 7));
    
    pop();
    
  }
}