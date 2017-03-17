var xFreq=20;
var yFreq=1;
var colorFreq=.01;
var resolution=300;
var xRadius=200.0;
var yRadius=200.0;
var zRadius=200.0;
var t=0;
var x1;
var x2;
var y1;
var y2;
var effect=5;
var phase;

function setup(){
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("p5canvas");
  background(40);
  stroke(255);
  fill(50);
  frameRate(15);
}

function draw(){

 translate(width/2,height/2);
 drawBG();

   for (var i=0; i<resolution; i++){
     t++;
     
     yRadius=100*sin(t/256000*TWO_PI)+100;
     x1=x2;
     phase=sin(t/256000*TWO_PI);
     var stepY=t/resolution*yFreq*TWO_PI;
     var stepX=t/resolution*xFreq*TWO_PI;
     x2=xRadius*sin(stepY+phase)*sin(stepX);
     y1=y2;
     y2=yRadius*sin(stepY)+(xRadius-yRadius)*cos(stepY)*cos(stepX);

     var r=int(map(x1+(height-y1),0,width+height,20,250));
     var g=int(map(x1+(height-y1),0,width+height,20,250));
     var b=int(map(x1+(height-y1),0,width+height,20,250));

     //main line
     strokeWeight(8);
     stroke(r,g,b);
     line(x1,y1,x2,y2);
     //light line
     strokeWeight(2);
     stroke(r+30,g+30,b+50);
     line(x1,y1-2,x2,y2-2);
     //dark line
     strokeWeight(4);
     stroke(r-30,g-30,b-50);
     line(x1,y1+4,x2,y2+4);
  }
}
 

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawBG(){
 background(40);
 stroke(75);
 strokeWeight(2);
 for (var i=-width/2;i<width/2;i+=width/10){
   line(i,-height/2,i,height/2);
 }
 for (var i=-height/2;i<height/2;i+=width/10){
   line(-width/2,i,width/2,i);
 }
}