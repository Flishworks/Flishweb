
var g=.01; //force of gravity
var numNodes;
var nodes=[];
var nodeColors=[];
var clickNode=0;

                      
function setup() {
frameRate(24);
background(100);
numNodes=random(4,7);
  var myCanvas = createCanvas(getDocWidth(), getDocHeight());
  myCanvas.parent("p5canvas");  //puts canvas in the p5canvas div
  stroke(100,random(100,200),random(100,150));
  strokeWeight(4);
  
  for (var i=0; i < numNodes; i++){
    nodes[i]=new Satellite(floor(random(-.2*width,width+.2*width)),floor(random(0,.5*height)),0,0,random(100,300),false,i); //create Nodes
    //nodeColors[i]=color(100,random(100,200),random(100,150));
  } 
  
}

function draw() {
  background(85);
  for (var i=0; i<numNodes;i++){
    nodes[i].orbit();
    nodes[i].display();  
  }
  
  for (var i=0; i<numNodes;i++){
    for (var j=0; j<numNodes;j++){
      if (i!=j){
        //stroke(nodeColors[i]);
        line(nodes[i].location.x, nodes[i].location.y, nodes[j].location.x, nodes[j].location.y);
      }
      }
    }
  }

//class Satellite {
  
  function Satellite(locX,locY,velX,velY,m,fix,ID) {
    int(this.location = createVector(locX,locY));
    this.velocity = createVector(velX,velY);
    this.nextVelocity = createVector(velX,velY);
    this.velocityDir = createVector(0,0);
    this.acceleration=createVector(0,0);
    this.mass = m;
    this.fixed=fix;
    this.id=ID;
    this.distance = 0;
    this.direction = createVector (0,0);
  
    this.orbit = function() { //calculate new positiona and draw orbs
      this.velocityDir=this.velocity.copy().normalize();
      //this.velocityDir=this.velocityDir.normalize(); //unit vector od velocity
      for (var i=0; i<numNodes;i++){ // consider all other orbs 
        if (i!=this.id) {//only consider other orbs
          this.distance=ceil(nodes[i].location.dist(this.location));
          this.direction=p5.Vector.sub(nodes[i].location,this.location);//get vector from this orb to the other
          this.direction.normalize();
          //get unit vector or dirction from one orb to other
          this.acceleration.x=nodes[i].mass*g*this.direction.x/(this.distance); //a = f/m1 = m2*g/d
          this.acceleration.y=nodes[i].mass*g*this.direction.y/(this.distance);
     
    //forces
          if(this.distance>height){
            this.nextVelocity.add(this.acceleration);}
          else{
            this.nextVelocity.sub(this.acceleration);
          }
           
         }
        }    
      }
  
     
     this.display = function() {
      //location=nextLocation;
      this.velocity=this.nextVelocity.copy();
      ceil(this.location.add(this.velocity));
      fill(255,0,0);
      //ellipse(this.location.x, this.location.y, this.mass/2, this.mass/2);
    }
}

function mouseClicked() {
  //nodeColors[clickNode]=color(100,random(100,200),random(100,150));
  nodes[clickNode].location.x=mouseX;
  nodes[clickNode].location.y=mouseY;
  clickNode++;
  if (clickNode>numNodes){
    clickNode=0;
  }
}

