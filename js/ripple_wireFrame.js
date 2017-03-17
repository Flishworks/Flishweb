var y;
var res=40;
var depth=200;
var yMag=0;
var YdX;
var YdZ;
var dampingFactor=.99;
var startIndex=0;//index of firat ripple. ripple removed after awhile
var ripples=[];
var ripplePropSpeed=6; //speed
var rippleBounceSpeed=.2;
var magCount;

function setup(){
var myCanvas = createCanvas(windowWidth, windowHeight,WEBGL);
myCanvas.parent("p5canvas");
  
background(0);
frameRate(20);
//noStroke();
//res=windowWidth/30;
}

function draw(){

//directionalLight(255,255,255,width/2,height/2,-500)
background(0);

for (var i=0;i<ripples.length;i++){
   ripples[i].propagate();
}

rotateX(.2);
translate(-width/2,0,300);
for (var z=1;z<depth;z+=res){
   beginShape(TRIANGLE_STRIP);
   for (var x=20;x<width-20;x+=res){
     yMag=0;
     YdX=0.0;
     YdZ=0.0;
     for (var i=0;i<ripples.length;i++){
       var yIndex=int(Math.sqrt(pow((z-ripples[i].originZ),2.0)+pow((x-ripples[i].originX),2.0))); //calculate how far we are from ripple origin
       yMag+=ripples[i].Y[yIndex];
       YdX+=(ripples[i].Y[yIndex]-ripples[i].Y[(yIndex > 0) ? yIndex-1 : 0])*(x-ripples[i].originX)/(Math.sqrt(pow((z-ripples[i].originZ),2.0)+pow((x-ripples[i].originX),2.0))+1);
       YdZ+=(ripples[i].Y[yIndex]-ripples[i].Y[(yIndex > 0) ? yIndex-1 : 0])*(z-ripples[i].originZ)/(Math.sqrt(pow((z-ripples[i].originZ),2.0)+pow((x-ripples[i].originX),2.0))+1);
       }
      push();
       //translate(x-width/2, height/3+yMag, z);
       //rotateX(-PI/2); //make squares face up
       //rotateY(50.0*Math.atan(YdX/res)); //constrain(YdX/4.0,-1.0,1.0)*PI/2.0); //derivitive of x component
       //rotateX(50.0*Math.atan(YdZ/res));//constrain(YdZ/4.0,-1.0,1.0)*PI/2.0); //derivitive of z component
       vertex(x,yMag, z-(depth-200));
       vertex(x,yMag, z+res/4-(depth-200));
       fill(20.0*yMag*z/depth*(Math.sin(x*1.0/width*PI)),-20.0*yMag*z/depth*(Math.sin(x*1.0/width*PI)),(z/4.0)*Math.sin(x*1.0/width*PI));
       //rect(0,0,res,res);
       //box(res,50,res);
       //ellipse(0,0,2*res/3,2*res/3);
      pop();
    }
    endShape();
  }


for (var x=20;x<width-20;x+=res){
   beginShape(TRIANGLE_STRIP);
   for (var z=1;z<depth;z+=res){
     yMag=0;
     YdX=0.0;
     YdZ=0.0;
     for (var i=0;i<ripples.length;i++){
       var yIndex=int(Math.sqrt(pow((z-ripples[i].originZ),2.0)+pow((x-ripples[i].originX),2.0))); //calculate how far we are from ripple origin
       yMag+=ripples[i].Y[yIndex];
       YdX+=(ripples[i].Y[yIndex]-ripples[i].Y[(yIndex > 0) ? yIndex-1 : 0])*(x-ripples[i].originX)/(Math.sqrt(pow((z-ripples[i].originZ),2.0)+pow((x-ripples[i].originX),2.0))+1);
       YdZ+=(ripples[i].Y[yIndex]-ripples[i].Y[(yIndex > 0) ? yIndex-1 : 0])*(z-ripples[i].originZ)/(Math.sqrt(pow((z-ripples[i].originZ),2.0)+pow((x-ripples[i].originX),2.0))+1);
       }
      push();
       //translate(x-width/2, height/3+yMag, z);
       //rotateX(-PI/2); //make squares face up
       //rotateY(50.0*Math.atan(YdX/res)); //constrain(YdX/4.0,-1.0,1.0)*PI/2.0); //derivitive of x component
       //rotateX(50.0*Math.atan(YdZ/res));//constrain(YdZ/4.0,-1.0,1.0)*PI/2.0); //derivitive of z component
       vertex(x,yMag, z-(depth-200));
       vertex(x+res/4,yMag, z-(depth-200));
       fill(20.0*yMag*z/depth*(Math.sin(x*1.0/width*PI)),-20.0*yMag*z/depth*(Math.sin(x*1.0/width*PI)),(z/4.0)*Math.sin(x*1.0/width*PI));
       //rect(0,0,res,res);
       //box(res,50,res);
       //ellipse(0,0,2*res/3,2*res/3);
      pop();
    }
    endShape();
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
 ripples.push(new Ripple(mouseX,int(map(mouseY,height/2,height,0,depth)),millis()-magCount));
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