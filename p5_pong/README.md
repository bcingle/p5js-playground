## p5-pong

This is my version of the classic pong game, played against an AI.  The AI tries to 
move towards the ball on every frame, up to a certain number of pixels.  Similarly, the player can
only move the same number of pixels per frame.  The ball increases speed until it gets by a 
paddle (either the player or the AI) and resets back to the original speed and position. 
The bounce angle is determined by combining the current angle with the distance from the
center of the paddle.  The farther away from the center of the paddle, the more extreme the angle.


Start the game by pressing SPACE, and direct the player's paddle using the up and down arrows. 


The entire game is written with about 150 lines of javascript using p5.js.