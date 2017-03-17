var i = 0;
var fillColor;
var fillPrev;
var scrnWdth;
var scrnHght;
var numSqrs=40;
var framerate=10;
var ColorFlag=false;

function setup(){
  scrnWdth=$(window).width();
  scrnHght=$(window).height();
  frameRate(framerate);
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("p5canvas");
  
  rectMode(CENTER);
  noStroke();
}

function draw(){

  i=i+30/framerate;
  background(0);
  for(var j = numSqrs; j >0 ; j--) {
    push();
    translate(width/2, height/2);
    rotate(PI/100*i/j);
    getFill(i,j);
    rect(0, 0, scrnWdth*sqrt(2)/numSqrs*j,scrnWdth*sqrt(2)/numSqrs*j, 7);
    pop();
  }
  
}
function getFill(i, j){
  if (!ColorFlag){ 
    fill(255/2*(sin(TWO_PI/1000*(i+(mouseY-50)/4*j))+1),255-255*mouseX/(scrnWdth)); // inner term, mouseY, controls the period of the black/white gradient. mouseX portion controls intensity
  }
  else{
    var red=125*(sin(TWO_PI/1000*(i+(mouseY/4-75)/4*j))+1);
    var blue = 125*(sin(TWO_PI/1000*(i+(mouseX/4-75)/4*j))+1);
    fill(red,255-red,blue); 
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  ColorFlag=!ColorFlag;
}