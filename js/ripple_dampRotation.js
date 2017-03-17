var y;
var res=50;
var depth=800;
var yMag=0;
var YdX;
var YdZ;
var dampingFactor=.99;
var startIndex=0;//index of firat ripple. ripple removed after awhile
var ripples=[];
var ripplePropSpeed=6; //speed
var rippleBounceSpeed=.2;
var magCount;
var boxMode=false;

function setup(){
var myCanvas = createCanvas(windowWidth, windowHeight,WEBGL);
myCanvas.parent("p5canvas");
  
background(0);
frameRate(20);
//res=windowWidth/30;
}

function draw(){

background(0);
  
for (var i=0;i<ripples.length;i++){
   ripples[i].propagate();
}

rotateX(.2);
translate(0,0, -(depth-220));
for (var z=1;z<depth;z+=res){
   for (var x=20;x<width-20;x+=res){
     yMag=0;
     YdX=0.0;
     YdZ=0.0;
     for (var i=0;i<ripples.length;i++){
       var yIndex=int(Math.sqrt(pow((z-ripples[i].originZ),2.0)+pow((x-ripples[i].originX),2.0))); //calculate how far we are from ripple origin
       yMag+=ripples[i].Y[yIndex];
       YdX+=(ripples[i].Y[yIndex]-ripples[i].Y[(yIndex > 0) ? yIndex-1 : 0])*(x-ripples[i].originX)/(Math.sqrt(pow((z-ripples[i].originZ),2.0)+pow((x-ripples[i].originX),2.0))+1);
       YdZ+=(ripples[i].Y[yIndex]-ripples[i].Y[(yIndex > 0) ? yIndex-1 : 0])*(z-ripples[i].originZ)/(Math.sqrt(pow((z-ripples[i].originZ),2.0)+pow((x-ripples[i].originX),2.0))+1);
       ripples[i].RX[yIndex]=constrain(50.0*Math.atan(YdX/res),0,ripples[i].RX[(yIndex > 0) ? yIndex-1 : 0]+.1)
       ripples[i].RZ[yIndex]=constrain(50.0*Math.atan(YdZ/res),0,ripples[i].RZ[(yIndex > 0) ? yIndex-1 : 0]+.1)
       }
      push();
       translate(x-width/2, height/3+yMag, z);
       rotateX(-PI/2); //make squares face up
       var yIndex=int(Math.sqrt(pow((z-ripples[i].originZ),2.0)+pow((x-ripples[i].originX),2.0))); //calculate how far we are from ripple origin
       
       rotateY(ripples[i].RX[yIndex]); //derivitive of x component
       rotateX(ripples[i].RZ[yIndex]);//constrain(YdZ/4.0,-1.0,1.0)*PI/2.0); //derivitive of z component
       fill(20.0*yMag*z/depth*(Math.sin(x*1.0/width*PI)),-20.0*yMag*z/depth*(Math.sin(x*1.0/width*PI)),(z/4.0)*Math.sin(x*1.0/width*PI));
       //rect(0,0,res,res);
  
       if (!boxMode){
         ellipse(0,0,2*res/3,2*res/3);
       }
       else{
         box(res,res,res);
       }
      pop();
    }
  }
}

function cleanup(){ //remove ripples when they are fully damped
  for (var i=startIndex;i<ripples.length;i++){
    if (ripples[i].damping==0){
        ripples[i]=0;//clear data
        startIndex++;//stop checking this ripple in the future.
    }
  }
}

function mousePressed(){
  magCount=millis(); //track time mouse is presset for magnitude of ripple
}
function mouseReleased(){
 ripples.push(new Ripple(mouseX,mouseY+1,millis()-magCount));
 cleanup(); //clean up old rippleswhen we add a new one
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function Ripple(x, z, mag){
  this.originX=x;
  this.originZ=z;
  this.magnitude=mag/25.0;
  this.Y = [];
  this.RX = [];//used to make the rotations smoother
  this.RZ = [];//used to make the rotations smoother
  for (var i=0;i<width;i++){
    this.Y[i]=0;
  }
  this.damping=1;
  this.t=0;
  
  this.propagate = function(){
    this.damping*=dampingFactor;
    for (var k=0;k<ripplePropSpeed;k++){
      this.Y[0]=this.magnitude*Math.sin(this.t/10.0)*(this.damping);//modulate origin y
      for (var i=width-1;i>0;i--){
        this.Y[i]=this.Y[i-1];
      }
    this.t+=rippleBounceSpeed;
    }
  }
}

function keyReleased() {
  if (key==' ') {
    boxMode = !boxMode;
  }
}