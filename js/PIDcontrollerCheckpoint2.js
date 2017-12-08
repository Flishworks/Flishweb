var orb;
var thrust;
var gravity;
var gravityWithNoise;
var gravNoiseIntensity=0; //amplitude of noise on gravity
var gNoise=0;
var thrustOn=false;
var history;
//for PID control
var P=0; //proportional portion of control. 
var I=0; //integral portion of control. 
var D=0; //derivitive portion of control. 

var setPoint=100;

var oldError=0;
var T=0;
var timeStep=5;

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
  console.log(OnOffPID.kP);
  background(200);
  drawGrid();
  gravityNoise(); //add noise to gravity
  setPoint=setPointSlide.value();
  if (T%timeStep==0){
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
  ellipse(4*width/5,height-20,30,30); //thrust on indicator
    

  // Move and display the orb
  orb.move();
  orb.display();
  orb.checkWallCollision();
  orb.checkGroundCollision();
  drawHistory();
}

function gravityNoise(){
  if (T%10==0){
    //gNoise=random(-1*gravNoiseIntensity,gravNoiseIntensity)*gravity.y;
    gNoise=(noise(T)-.5)/10.0*gravNoiseIntensity;
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
      this.velocity.y *= -1.0;
    }
  }
}

function OnOffPID(variable, target){
  this.control=false;
  this.kP=1.0;
  this.kI=.001;
  this.kD=30.0/timeStep;
  this.error=target-variable; //positive when above the line
  P=-1*this.kP*(this.error); //negative when above line
  I+=-1*this.kI*this.error; //negative when above line longer than  below line
  D=this.kD*(oldError-this.error); //positive when going down
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
  //buttons
  controlToggle = createButton('Toggle Control');
  controlToggle.position(getDocWidth()*.8, getDocHeight()*.3);
  controlToggle.mousePressed(function() {
  
  })
  noiseToggle = createButton('Toggle noise');
  noiseToggle.position(getDocWidth()*.8, getDocHeight()*.4);
  noiseToggle.mousePressed(function() {
    gravNoiseIntensity=(gravNoiseIntensity+1)%10;
  })
  thrusterToggle = createButton('Manual control');
  thrusterToggle.position(getDocWidth()*.8, getDocHeight()*.5);
  thrusterToggle.mousePressed(function() {
    thrustOn=true;
  })
  thrusterToggle.mouseReleased(function() {
    thrustOn=false;
  })
  
  //*****SETPOINT ADJUST*****//
  setPointDiv = createDiv('Setpoint<\P>');
  setPointDiv.position(getDocWidth()*.8, getDocHeight()*.6); 
  setPointDiv.id("setPointDiv");
  setPointDiv.class("controls");
  setPointSlide = createSlider(0, height, height/2); 
  //setPointSlide.position(getDocWidth()*.8, getDocHeight()*.8);
  setPointSlide.parent("setPointDiv");
  
  //*****kI/kP/kD inputs*****//
  parameterInputDiv = createDiv('Control Parameters</P');
  parameterInputDiv.position(getDocWidth()*.1, getDocHeight()*.3); 
  parameterInputDiv.id("parameterInputDiv");
  parameterInputDiv.class("controls");
  
  kPDiv = createDiv('kP ');
  kPDiv.id("kPDiv");
  kPDiv.parent("parameterInputDiv");
  kIDiv = createDiv('</P>kI ');
  kIDiv.id("kIDiv");
  kIDiv.parent("parameterInputDiv");
  kDDiv = createDiv('</P>kD ');
  kDDiv.id("kDDiv");
  kDDiv.parent("parameterInputDiv");
  
  var kPInput = createInput('kP');
  kPInput.parent("kPDiv");
  kPInput.size(50)
  kPInput.input(function() {OnOffPID.kP=this.value();})
  var kIInput = createInput('kI');
  kIInput.parent("kIDiv");
  kIInput.size(50)
  //inp.input(myInputEvent);
  var kDInput = createInput('kD');
  kDInput.parent("kDDiv");
  kDInput.size(50)
  //inp.input(myInputEvent);
  
}




    