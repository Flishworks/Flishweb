var orb;
var thrust;
var gravity;
var gravityWithNoise;
var gravNoiseIntensity=0; //amplitude of noise on gravity
var gNoise=0;
var thrustOn=false;

//for PID control
var P=0; //proportional portion of control. 
var I=0; //integral portion of control. 
var D=0; //derivitive portion of control. 

var oldError=0;
var i=0;
var timeStep=5;

var controlToggle;
var noiseToggle;
var thrusterToggle;

function setup(){
  var myCanvas = createCanvas(getDocWidth(), getDocHeight()-200);
  myCanvas.parent("p5canvas");  //puts canvas in the p5canvas div
  // An orb object that will fall and bounce around
  orb = new Orb(width/2, 50, 10);
  thrust = createVector(0,0);
  gravity = createVector(0,0.05);
  gravityWithNoise = createVector(0,0.05);
  
  //buttons
  controlToggle = createButton('Toggle Control');
  controlToggle.position(50, height+80);
  controlToggle.mousePressed(function() {
  
  })
  noiseToggle = createButton('Toggle noise');
  noiseToggle.position(width/2-100, height+80);
  noiseToggle.mousePressed(function() {
    gravNoiseIntensity=(gravNoiseIntensity+1)%10;
  })
  thrusterToggle = createButton('Manual control');
  thrusterToggle.position(width-250, height+80);
  thrusterToggle.mousePressed(function() {
    thrustOn=true;
  })
  thrusterToggle.mouseReleased(function() {
    thrustOn=false;
  })
  textSize(20);
}


function draw(){
  i+=1;//for timing

// Background
  background(100);

// Draw ground
//draw background
  gravityNoise(); //add noise to gravity

if (i%timeStep==0){
  thrustOn=OnOffPID(orb.position.y,height/3);
}
  
  stroke(100,200,0);
  fill(100,200,0);
  line(width/3,height/3,2*width/3,height/3);
  ellipse(width/3,height/3,10,10);
  ellipse(2*width/3,height/3,10,10);
  
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

  
  fill(255);
  text("Noise Level: "+gravNoiseIntensity, width/2-100, height-10);
}

function gravityNoise(){
  if (i%10==0){
    gNoise=random(-1*gravNoiseIntensity,gravNoiseIntensity)*gravity.y;
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
    stroke(0);
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
    if (this.position.y>height-100-this.r) {
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
  text("Control Scheme: "+(D), 50, height-10);
  
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



    