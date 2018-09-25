function setup() {           // **change** void setup() to function setup()
  var w = 400;
  var h = 400;
  createCanvas(w, h);    // **change** size() to createCanvas()
}

var msInSec = 1000;
var msInMin = msInSec * 60;
var msInHour = msInMin * 60;
var msIn12Hours = msInHour * 12;
var msInDay = msIn12Hours * 2;

function draw() {                        
  background(10);                          
  translate(width/2, height/2);

  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var sec = now.getSeconds();
  var ms = now.getMilliseconds();

  push();
  push();
  textSize(72);
  noStroke();
  fill(64);
  textAlign(CENTER);
  textFont('monospace');
  text(pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(sec, 2), 0, 30);
  pop();

  var msOfDay = hours * msInHour + minutes * msInMin + sec * msInSec + ms;

  var hourHand = msOfDay % msIn12Hours;
  var minHand = msOfDay % msInHour;
  var secHand = msOfDay % msInMin;

  
  rotate(-HALF_PI);
  noFill();
  strokeWeight(3);


  stroke(255, 100, 100);
  var hourRotation = map(hourHand, 0, msIn12Hours, 0, TWO_PI);
  push();
  rotate(hourRotation);
  strokeWeight(8);
  line(0, 0, 50, 0);
  pop();
  arc(0, 0, 240, 240, 0, hourRotation);

  stroke(100, 255, 100);
  var minRotation = map(minHand, 0, msInHour, 0, TWO_PI);
  push();
  strokeWeight(6);
  rotate(minRotation);
  line(0, 0, 75, 0);
  pop();
  arc(0, 0, 260, 260, 0, minRotation);

  stroke(100, 100, 255);
  var secRotation = map(secHand, 0, msInMin, 0, TWO_PI);
  push();
  strokeWeight(4);
  rotate(secRotation);
  line(0, 0, 100, 0);
  pop();
  arc(0, 0, 280, 280, 0, secRotation);

  stroke(255);
  strokeWeight(10);
  point(0, 0);
  pop();
}

function pad(str, size) {
  var s = '';
  while (s.length < size) {
    s = s + '0';
  }
  s = s + str;
  return s.substring(s.length - size);
}
