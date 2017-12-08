var orb;
var thrust;
var gravity;
var gravityWithNoise;
var gNoise=0;
var thrustOn=false;
var history;
var manual=false;
//for PID control
var P=0; //proportional portion of control. 
var I=0; //integral portion of control. 
var D=0; //derivitive portion of control. 
var kP=0;
var kI=0;
var kD=0;//timeStep;
  
var setPoint=100;

var oldError=0;
var T=0;

var controlToggle;
var noiseToggle;
var thrusterToggle;
var setPointSlide;

function setup(){
  var canvas = createCanvas(getDocWidth()*.5, getDocHeight()*.5);
  canvas.parent("p5canvas");  //puts canvas in the p5canvas div
  canvas.position(getDocWidth()*.25,0);
  // An orb object that will fall and bounce
  orb = new Orb(width/2, 50, 4);
  thrust = createVector(0,0);
  gravity = createVector(0,0.05);
  gravityWithNoise = createVector(0,0.05);
  
  //add controls
  controls();
  
  //initialize history array
  for (this.i=0;this.i<100;this.i++){
    history[this.i]=0;
  }
}

function draw(){
  T+=1;//for timing
  //this.Size =  thrusterToggle.size().height;
  //console.log(thrusterToggle.size().height);
  background(200);
  drawGrid();
  gravityNoise(); //add noise to gravity
  setPoint=setPointSlide.value();
  if (T%timestepSlide.value()==0&&!manual){
    thrustOn=OnOffPID(orb.position.y,setPoint);
  }

  //draw setPoint
  strokeWeight(4);
  stroke(100,200,0);
  line(0,setPoint,width,setPoint);
  strokeWeight(1);
  
  if (thrustOn==true) {
    thrust.y=-.1;
    fill(0,255,0);
    }
  else{
    thrust.y=0;
    fill(255,0,0);
  }
  stroke(0);
  ellipse(width-15,15,30,30); //thrust on indicator
  

  // Move and display the orb
  orb.move();
  orb.display();
  orb.checkWallCollision();
  orb.checkGroundCollision();
  drawHistory();
  
  equation.html("On if:</P>"+Math.round(10*kP)/10.0+"*Error+"+Math.round(10*kI)/10.0+"*(sum of error over time)+"+Math.round(10*kD)/10.0+"*(change in error)  <  0</P>Error="+Math.round(10*P)/10.0+"</P>Sum of Error over Time="+Math.round(10*I)/10.0+"</P>Change in Error)="+Math.round(10*D));
}

function gravityNoise(){
  if (T%10==0){
    //gNoise=random(-1*gravNoiseIntensity,gravNoiseIntensity)*gravity.y;
    gNoise=(noise(T)-.5)/10.0*noiselide.value();//gravNoiseIntensity;
  }
  gravityWithNoise.y=gravity.y+gNoise;
}

function Orb(x, y, r_) {
  // Orb has position and velocity
  this.position=createVector(x,0);
  this.velocity=createVector(0,0);
  this.r=r_;
  // A damping of 80% slows it down when it hits the ground
  this.damping = 1;

  this.move = function() {
    // Move orb
    this.velocity.add(gravityWithNoise);
    this.velocity.add(thrust);
    this.position.add(this.velocity);
  }

  this.display = function() {
    // Draw orb
    stroke(200,100,0);
    fill(200,100,0);
    ellipse(this.position.x, this.position.y, this.r*2, this.r*2);
  }
  
  // Check boundaries of window
  this.checkWallCollision = function() {
    if (this.position.x > width-this.r) {
      this.position.x = width-this.r;
      this.velocity.x *= -damping;
    } 
    else if (this.position.x < this.r) {
      this.position.x = this.r;
      this.velocity.x *= -this.damping;
    }
  }
  this.checkGroundCollision = function() {
    if (this.position.y>height-this.r) {
      this.position.y=height-(this.r+1)
      this.velocity.y *= -.6;
    }
  }
}

function OnOffPID(variable, target){
  this.control=false;
  this.error=target-variable; //positive when above the line
  P=-1*kP*(this.error); //negative when above line
  I+=-1*kI*this.error; //negative when above line longer than  below line
  I=constrain(I,-100,100);
  D=kD*(oldError-this.error); //positive when going down
  fill(255);
  
  // simple control 
  //if (variable>target){
  //    control=true;}
  //   else{control=false;}

  //derivitive control
  //if (D>2){control = true;}

  //integral control
  //if (I>10){control = false;}

  //Proportional control
  //if (P<0){control = true;}

  //PID control
  if (P+I+D>0){control = true;}
  else{control=false;}
  oldError = this.error;  
  return control;
}

function drawGrid(){
  stroke(50);
  strokeWeight(1);
  for (this.x=0;this.x<10;this.x++){
    line(width/10*x,0,width/10*x,height);
  }
  for (this.y=0;this.y<10;this.y++){
    line(0,height/10*y,width,height/10*y);
  }
}

function drawHistory(){
  stroke(200,100,0);
  strokeWeight(2);
  for (this.i=0;this.i<99;this.i++){
    line(width/200*this.i,history[this.i],width/200*(this.i+1),history[this.i+1])
    history[this.i]=history[this.i+1];
  }
  line(99*width/200,history[99],width/2,orb.position.y);
  history[99]=orb.position.y;
}

function controls(){
  //*****left side*****//
  //manual button//
  thrusterToggle = createButton('Manual On/Off');
  thrusterToggle.size(.15*getDocWidth());
  thrusterToggle.position(getDocWidth()*.23-thrusterToggle.size().width, getDocHeight()*.3);
  thrusterToggle.class("controls");
  thrusterToggle.mousePressed(function() {
    thrustOn=true;
    manual=true;
  })
  thrusterToggle.mouseReleased(function() {
    thrustOn=false;
    manual=false;
  })
  
  //Noise ADJUST//
  noiseDiv = createDiv('Environment Noise<\P>');
  noiseDiv.position(thrusterToggle.position().x, thrusterToggle.position().y + thrusterToggle.size().height+10); 
  noiseDiv.id("noiseDiv");
  noiseDiv.class("controls");
  noiseDiv.size(thrusterToggle.size().width-20);
  noiselide = createSlider(0, 5, 0); 
  noiselide.parent("noiseDiv");
  
  
  //SETPOINT ADJUST//
  setPointDiv = createDiv('Setpoint<\P>');
  setPointDiv.position(thrusterToggle.position().x, noiseDiv.position().y + noiseDiv.size().height + 10); 
  setPointDiv.id("setPointDiv");
  setPointDiv.class("controls");
  setPointDiv.size(thrusterToggle.size().width-20);
  setPointSlide = createSlider(0, height, height/2); 
  setPointSlide.parent("setPointDiv");
  
  //*****right side*****//
  //kI/kP/kD inputs//
  parameterInputDiv = createDiv('Control Parameters</P');
  parameterInputDiv.size(.15*getDocWidth());
  parameterInputDiv.id("parameterInputDiv");
  parameterInputDiv.class("controls");
  parameterInputDiv.position(getDocWidth()*.77, getDocHeight()*.3); 
  
  kPDiv = createDiv('kP ');
  kPDiv.id("kPDiv");
  kPDiv.parent("parameterInputDiv");
  kIDiv = createDiv('</P>kI ');
  kIDiv.id("kIDiv");
  kIDiv.parent("parameterInputDiv");
  kDDiv = createDiv('</P>kD ');
  kDDiv.id("kDDiv");
  kDDiv.parent("parameterInputDiv");

  var kPInput = createInput('0');
  kPInput.parent("kPDiv");
  kPInput.size(50)
  kPInput.input(function() {kP=this.value();})
  var kIInput = createInput('0');
  kIInput.parent("kIDiv");
  kIInput.size(50)
  kIInput.input(function() {kI=this.value();})
  var kDInput = createInput('0');
  kDInput.parent("kDDiv");
  kDInput.size(50)
  kDInput.input(function() {kD=this.value();})
  
  //auto calc button//
  autoCalcPID = createButton('Auto Calculate');
  autoCalcPID.size(.15*getDocWidth()+20);
  autoCalcPID.position(parameterInputDiv.position().x, parameterInputDiv.position().y + parameterInputDiv.size().height +10);
  autoCalcPID.class("controls");
  autoCalcPID.mousePressed(function() {
    kP=1;
    kPInput.value(kP)
    kI=.005*timestepSlide.value();
    kIInput.value(kI);
    kD=200.0/timestepSlide.value();
    kDInput.value(kD)
  })
  
  //timestep adjust//
  timestepDiv = createDiv('Timestep<\P>');
  timestepDiv.position(autoCalcPID.position().x, autoCalcPID.position().y + autoCalcPID.size().height + 10); 
  timestepDiv.id("timestepDiv");
  timestepDiv.class("controls");
  timestepDiv.size(thrusterToggle.size().width);
  timestepSlide = createSlider(1, 25, 5); 
  timestepSlide.parent("timestepDiv");
  
  //*****Center*****//
  equation = createDiv('');
  equation.position(getDocWidth()/4, height+200); 
  equation.class("equation");
  
  

  
}




    