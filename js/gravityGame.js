
//Satellite[] orbs;
var orbs=[];//******
var launcher;
var score=0;
var g=.1; //force of gravity
var numOrbs=1;
var powerLevel=1;
var bestScore=0;//track best score
var X; //earth X
var Y; //earth y

var loseFlag=false;
var timeOut=false;

var clock=60;//timer

function setup() {
  setInterval(timeCount, 1000);
  //frameRate(24);
  var myCanvas = createCanvas(getDocWidth()-50, getDocHeight()-140);
  ellipseMode(CENTER);
  textAlign(CENTER,CENTER);
  textSize(15);
  frameRate(35);
  launcher=new Cannon(width/2,height);
  orbs[0]=new Satellite(width/2,height/3,0,0,300,false,0,200,255,0); //create main orb

}

function draw() { 
   
  if (mouseIsPressed == true) {
    if (!loseFlag&&!timeOut){
      powerLevel=constrain(powerLevel+1,1,200);
    }
  }
  
  background(80);
  fill(255);
   
 
 
  
  for (var i=1; i<numOrbs;i++){
    orbs[i].orbit();//******
  }
  for (var i=0; i<numOrbs;i++){
    orbs[i].display();//******   
  }
  
    if (loseFlag&&!timeOut) {
        textSize(60);
        fill(255);
        noStroke();
        text("You Lose!!", width/2, height/2);
        textSize(40);
        text("Dont crash into earth!!", width/2, height/2+100);
        text("click anywhere to restart", width/2, height/2+150);
        textSize(15);
   }
   
   if (clock<1){
      timeOut=true;
      textSize(60);
      fill(255);
      noStroke();
      text("Nice.", width/2, height/2);
      textSize(40);
      text("You scored "+score/2 +" orbits.", width/2, height/2+100);
      text("click anywhere to restart", width/2, height/2+150);
      textSize(15);
      if(score>bestScore){
        bestScore=score/2;
      }
   }
   
  fill(255);
  noStroke();
  text("Number of orbits: "+Math.floor(score/2), 180, height-28);
  text("Time remaining: "+clock, width-150, 28);
  text("Best score: "+bestScore, width-150, height-28);
  
  launcher.display();
  launcher.powerMeter();
  if(!loseFlag&&!timeOut){ //dont count scoere if end of game
    scoreCheck();
  }
  collisionCheck();
  //println(numOrbs);
}

function timeCount() {
    if (!loseFlag&&!timeOut){//pause timer on lose
      clock-=1
    }
}

function mouseReleased() {
  
  if (!loseFlag&&!timeOut){
    //launcher.direction.setMag(1);
    powerLevel=powerLevel/10;
    var r=Math.floor(100*Math.random()+255-100);
    var g=Math.floor(100*Math.random()+255-100);
    var b=Math.floor(100*Math.random()+255-100);
    var newSat=new Satellite(launcher.location.x+launcher.direction.x, launcher.location.y+launcher.direction.y,powerLevel*launcher.direction.x/50,powerLevel*launcher.direction.y/50,50,false,numOrbs,r,g,b);
    orbs.push(newSat);
    powerLevel=1;
    numOrbs+=1;
  }
  else{ //clicked after lose or timeout. Reset game.
    loseFlag=false;
    timeOut=false;
    for (var i = orbs.length - 1; i > 0; i--) {
      orbs.pop();
    }
    numOrbs=1;
    score=0;
    clock=60;
  }
}

function scoreCheck(){
 
  X=orbs[0].location.x;
  Y=orbs[0].location.y;
  for (var i=1; i<numOrbs;i++){
    if ((orbs[i].location.x>=X&&orbs[i].lastX<X)||(orbs[i].location.x<=X&&orbs[i].lastX>X)){
        score+=1;
    }
    orbs[i].lastX=orbs[i].location.x;
    orbs[i].lastY=orbs[i].location.y;
  }
}

 function collisionCheck(){
     for (var i=1; i<numOrbs;i++){
      if (orbs[i].collisionFlag){
        loseFlag=true;
      }
     } 
  }
function Cannon(locX,locY) {
    this.location = createVector(locX,locY);
    this.direction = createVector(mouseX,mouseY);
 
    
     this.display =function(){
      this.direction.x=mouseX;
      this.direction.y=mouseY;
      
      this.direction=p5.Vector.sub(this.direction,this.location);
      this.direction.setMag(50);
      stroke(175);
      strokeWeight(75);
      line(this.location.x, this.location.y, this.location.x+this.direction.x, this.location.y+this.direction.y);
      //stroke(100);
      //line(location.x+direction.x, location.y+direction.y, location.x+direction.x, location.y+direction.y);
    }
    
    this.powerMeter =function(){
      for(var i=0; i<powerLevel; i++){
        noStroke();
        fill(2*i,255-2*i,0);
        rect(width-40,height-4*i,30,2);
      }
    }
   }
    
function Satellite(locX,locY, velX,velY,m,fix,ID,red,green,blue) {
    this.location = createVector(int(locX),int(locY));
    this.velocity = createVector(velX,velY);
    this.nextVelocity = createVector(velX,velY);
    this.velocityDir = createVector(0,0);
    this.acceleration=createVector(0,0);
    this.mass = m;
    this.fixed=fix;
    this.id=ID;
    this.distance = 0;
    this.direction = createVector (0,0);
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.collisionFlag=false;
    this.lastX=location.x;
    this.lastY=location.y;
    
    
  this.orbit = function() { //calculate new positiona and draw orbs
    if (!this.fixed){  //is this a fixed satellite?
    this.velocityDir=this.velocity.copy().normalize(); //unit vector of velocity
    for (var i=0; i<numOrbs;i++){ // consider all other orbs 
       if (i!=this.id) {//only consider other orbs
          this.distance=dist(this.location.x,this.location.y,orbs[i].location.x,orbs[i].location.y);
          this.distance=ceil(orbs[i].location.dist(this.location));
          this.direction=p5.Vector.sub(orbs[i].location,this.location);//get vector from this orb to the other
          this.direction.normalize();//get unit vector or dirction from one orb to other
          //gravity force
          this.acceleration.x=orbs[i].mass*g*this.direction.x/(this.distance); //a = f/m1 = m2*g/d
          this.acceleration.y=orbs[i].mass*g*this.direction.y/(this.distance);
          
          //collision
      if (i==0){ //only consider earth for collisions
          if ((this.distance<=(this.mass/4+orbs[i].mass/4+10))){ //collision detect
            this.collisionFlag=true;
            this.nextVelocity.x=-1*this.velocity.x; //invert velocity
            this.nextVelocity.y=-1*this.velocity.y;
            }
          }
         /*    PVector xUnit=new PVector(1,0);
            PVector yUnit=new PVector(0,1);
            nextVelocity.x=velocity.cross(direction).dot(1,0,0)+orb.mass/mass*orb.velocity.dot(direction)*cos(PVector.angleBetween(direction,xUnit));
            nextVelocity.y=velocity.cross(direction).dot(0,1,0)+orb.mass/mass*orb.velocity.dot(direction)*cos(PVector.angleBetween(direction,yUnit));
           
           
                   }
          if(this.distance>(this.mass/4+orbs[i].mass/4+10)){
            nextVelocity.add(acceleration);
             collisionFlag[i]=false;
          } 
          if (distance<mass/2){ //for springy bounce detect
               direction.mult(-1);
            }
              nextVelocity.x=-velocity.x*.5;//orbs[i].velocity.x;//*;
              nextVelocity.y=-velocity.y*.5;//orbs[i].velocity.y;//*
              orbs[i].mass/mass;
          }
           */
           this.nextVelocity.add(this.acceleration);
           }
           
          }
        } 
    }

     
    this.display = function() {
      //location=nextLocation;
      this.velocity=this.nextVelocity.copy();
      ceil(this.location.add(this.velocity));
      
      stroke(255);
      strokeWeight(4);
      //fill(200,255,0);
      fill(this.red,this.green,this.blue);
      ellipse(this.location.x,this.location.y,this.mass/2,this.mass/2);
      //fill(255);
      //text(id, location.x, location.y);
    }
    
   /*  this.display = function(X,Y) { //for defining specific location on call
      this.location.x = X;
      this.location.y = Y;
      stroke(255);
      strokeWeight(4);
      fill(200,255,0);
      ellipse(this.location.x,this.location.y,this.mass/2,this.mass/2);
      //fill(255);
      //text(id, location.x, location.y);
    } */
   }