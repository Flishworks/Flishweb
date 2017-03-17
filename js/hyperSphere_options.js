var xFreq=20;
var yFreq=1;
var colorFreq=.01;
var resolution=300;
var xRadius=200.0;
var yRadius=200.0;
var zRadius=200.0;
var xCenter;
var yCenter;
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
  background(50);
  xCenter=0;
  yCenter=0;
  x2=xCenter;
  y2=yCenter;
  stroke(255);
  fill(50);
  frameRate(10);
}

function draw(){

 translate(width/2,height/2);
 drawBG();
  
  
 for (var i=0; i<resolution; i++){
   t++;
   switch (effect) {
     case 1:// simple sphere
         x1=x2;
         x2=xRadius*sin(t/400*yFreq*TWO_PI+PI/2.0)*sin(t/400.04*xFreq*TWO_PI)+xCenter;
         y1=y2;
         y2=yRadius*sin(t/400.02*yFreq*TWO_PI)+yCenter;
     break;
     case 2: // swirlyqueue
         x1=x2;
         x2=xRadius*sin(t/400*yFreq*TWO_PI+PI/2.0)+xCenter;
         y1=y2;
         y2=yRadius*sin(t/400*xFreq*TWO_PI+PI/3.0)*sin(t/400*yFreq*TWO_PI)+yCenter;
     break;
     case 3:// springy complex sphere
         yRadius=map(mouseY,height,0,0,xRadius);
         x1=x2;
         x2=xRadius*sin(t/400*yFreq*TWO_PI+PI/2.0)*sin(t/400*xFreq*TWO_PI)+xCenter;
         y1=y2;
         y2=yRadius*sin(t/400*yFreq*TWO_PI)+yCenter+(xRadius-yRadius)*sin(t/400*yFreq*TWO_PI+PI/2)*sin(t/400*xFreq*TWO_PI+PI/2);
     break;
     case 4:// complex sphere mouse modulate
         yRadius=map(mouseY,height,0,0,xRadius);
         x1=x2;
         phase=map(mouseX,0,width,0,PI);
         x2=xRadius*sin(t/400*yFreq*TWO_PI+phase)*sin(t/400*xFreq*TWO_PI)+xCenter;
         y1=y2;
         y2=yRadius*sin(t/400*yFreq*TWO_PI)+yCenter+(xRadius-yRadius)*sin(t/400*yFreq*TWO_PI+PI/2)*sin(t/400*xFreq*TWO_PI+PI/2);
     break;
     case 5:// complex sphere auto modulate
         yRadius=100*sin(t/160000*TWO_PI)+100;
         x1=x2;
         phase=sin(t/32000*TWO_PI);
         x2=xRadius*sin(t/resolution*yFreq*TWO_PI+phase)*sin(t/resolution*xFreq*TWO_PI)+xCenter;
         y1=y2;
         y2=yRadius*sin(t/resolution*yFreq*TWO_PI)+yCenter+(xRadius-yRadius)*sin(t/resolution*yFreq*TWO_PI+PI/2)*sin(t/resolution*xFreq*TWO_PI+PI/2);
     break;
     case 6:// crazy sphere mouse modulate
         yRadius=map(mouseY,height,0,0,xRadius);
         x1=x2;
         phase=map(mouseX,0,width,0,PI);
         x2=xRadius*sin(t/400*yFreq*TWO_PI+phase)*sin(t/400*xFreq*TWO_PI)+xCenter;
         y1=y2;
         y2=yRadius*sin(t/400*yFreq*TWO_PI)+yCenter+(xRadius-yRadius)*sin(t/400*yFreq*TWO_PI+PI/2)*sin(t/400*4*xFreq*TWO_PI+PI/2);
     break;
     case 0:// perfect complex sphere
         
         var axisAngle=PI/2*sin(t/(25000*sin(t/25001+PI)+75000))-PI/2;//map(mouseY,-height,0,0,PI);
         yRadius=200*cos(axisAngle);//map(mouseY,height,0,0,xRadius);
         x1=x2;
         phase=PI/2*sin(t/(25000*sin(t/25000)+75000))+PI/2;//map(mouseX,0,width,0,PI);
         x2=xRadius*sin(t/400*yFreq*TWO_PI+phase)*sin(t/400*xFreq*TWO_PI)+xCenter;
         y1=y2;
         y2=yRadius*sin(t/400*yFreq*TWO_PI)+yCenter+zRadius*sin(axisAngle)*sin(t/400*yFreq*TWO_PI+PI/2)*sin(t/400*xFreq*TWO_PI+PI/2);
     break;
     }
     var r=int(map(x1+(height-y1),0,width+height,20,200));
     var g=int(map(x1+(height-y1),0,width+height,20,200));
     var b=int(map(x1+(height-y1),0,width+height,20,200));
     
     
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

function mouseClicked() {
  if(effect<6){effect++;}
  else{effect=0}
}

function drawBG(){
 background(50);
 stroke(75);
 strokeWeight(2);
 for (var i=-width/2;i<width/2;i+=width/10){
   line(i,-height/2,i,height/2);
 }
 for (var i=-height/2;i<height/2;i+=width/10){
   line(-width/2,i,width/2,i);
 }
}