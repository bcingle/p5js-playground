function Paddle(x, y) {
  this.x = x;
  this.y = y;
  this.yAcc = 0;
}

Paddle.prototype.move = function(acc) {
  this.yAcc = acc;
}

Paddle.prototype.draw = function () {
  this.y = constrain(this.y + this.yAcc, 0, height - paddleHeight);
  rect(this.x, this.y, paddleWidth, paddleHeight);
}

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.xAcc = 0;
  this.yAcc = 0;
}

Ball.prototype.move = function (xAcc, yAcc) {
  this.xAcc = xAcc;
  this.yAcc = yAcc;
}

Ball.prototype.draw = function () {
  var maxX = width - (paddleWidth * 2 + ballRadius);
  var minX = paddleWidth * 2;
  var maxY = height - ballRadius;
  var minY = 0;
  var newX = constrain(this.x + this.xAcc, minX, maxX);
  var newY = constrain(this.y + this.yAcc, minY, maxY);
  if (newY === minY || newY === maxY) {
    // impact boundary, reverse y angle
    this.yAcc = -this.yAcc;
  }
  if (newX === minX) {
    // impact player paddle?
    if (playerPaddle.y <= ball.y + ballRadius && playerPaddle.y + paddleHeight >= ball.y) {
      // calculate angle
      var dy = ball.y - playerPaddle.y;
      var minAngle = -this.xAcc * 1.1;
      var maxAngle = this.xAcc * 1.1;
      var angle = map(dy, 0, paddleHeight, minAngle, maxAngle);
      this.xAcc = -(this.xAcc * 1.1);
      this.yAcc = angle;
    } else {
      reset();
      score.ai++;
    }
  }
  
  if (newX === maxX) {
    // impact AI paddle?
    if (aiPaddle.y <= ball.y + ballRadius && aiPaddle.y + paddleHeight >= ball.y) {
      var dy = ball.y - aiPaddle.y;
      var angle = map(dy, 0, paddleHeight, -this.xAcc * 1.1, this.xAcc * 1.1);
      this.xAcc = -(this.xAcc * 1.1);
      this.yAcc = angle;
    } else {
      score.player++;
      reset();
    }
  }
  this.x = newX;
  this.y = newY;
  ellipse(this.x, this.y, ballRadius * 2, ballRadius * 2);
}
  
