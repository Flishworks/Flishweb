var radius = 40;
var spotSelect;
var tangleSelect;
var moveCount;
var win=false;
var Spots=[12];
var Tangles=[2]; 
var spotY=[6]; //column of circles
function setup() {
  
  //var wide=Math.min(getDocWidth(),1000);
  //var tall=Math.min(getDocHeight(),700);
  var myCanvas = createCanvas(getDocWidth(), getDocHeight());
  
  if (height<500){
  radius=height/14;
  }
  
  myCanvas.parent("p5canvas");  //puts canvas in the p5canvas div
  
  strokeWeight(7); //outline weight
  textAlign(CENTER, CENTER);
  
  for ( var i=0; i<6; i++) {
    spotY[i] = (i+1)*height/7; //starting point
  }

  for ( var i=0; i<6; i++) {
      Spots[i]=new Spot(width/4, spotY[i], radius, random(255),random(255),random(255),1);
                            }
  for ( var i=6; i<12; i++) {
      Spots[i]=new Spot(3*width/4, spotY[i-6], radius, random(255),random(255),random(255),0);
                             }
                             
     Tangles[0]=new Tangle(width/2, height/3, height/6,random(255),random(255),random(255),"top");
     Tangles[1]=new Tangle(width/2, 2*height/3, height/6,random(255),random(255),random(255),"bottom");
     

}

function draw() {  
  background(127);
   
 var difRed=abs(Tangles[0].r - Tangles[1].r);
 var difGreen = abs(Tangles[0].g - Tangles[1].g);
 var difBlue =abs(Tangles[0].b - Tangles[1].b);
 if (difRed<25&&difGreen<25&&difBlue<25){ //no dif larger than 25
   if ((difRed+difGreen+difBlue)/3<17){ //average dif < 17
          win=true;
          moveCount=0;
      }
 }

          
 stroke(0); // outline black
 Tangles[0].display();
    //noStroke(); //outline white
Tangles[1].display();
 
stroke(255); // outline white
 for ( var i=0; i<12; i++) {
      Spots[i].display();
                                      }

fill(0);                                  
//textSize(32);
//text(moveCount, width/2, height/2); 
if (win){
  noStroke();
  fill(255);
  textSize(72);
  text("You Win!", width/2, height/3);
  fill(50,125,125);
  stroke(255);
  rect(width/2-150, height/2-50, 300, 100, height/20);
  fill(255);
  noStroke();
  textSize(40);
  text("Reset", width/2, height/2);
  
  if (tangleSelect==1){
    Tangles[1].r=Tangles[0].r;
    Tangles[1].g=Tangles[0].g;
    Tangles[1].b=Tangles[0].b;
  }
  else {
    Tangles[0].r=Tangles[1].r;
    Tangles[0].g=Tangles[1].g;
    Tangles[0].b=Tangles[1].b;
    }

  }

}

function randomize(){
radius = 40;
var i;
i=int(random(11));
if (i!=spotSelect){
Spots[i]=new Spot(Spots[i].x, Spots[i].y, radius, random(255),random(255),random(255),1);
}
}
            
 //<>//
function mousePressed() {
  for ( var i=0; i<Spots.length; i++) {
     if (mouseX<=Spots[i].x+radius &&  mouseX>=Spots[i].x-radius){
       if (mouseY<=Spots[i].y+radius &&  mouseY>=Spots[i].y-radius){
         Spots[i].rad = radius*1.5;
         spotSelect=i;
      } 
    }
  }
}

function mouseDragged() {
Spots[spotSelect].x=mouseX;
Spots[spotSelect].y=mouseY; 
  }

function mouseReleased() {
    Spots[spotSelect].rad = radius;
    for ( var i=0; i<2; i++) { 
     if (mouseX<=Tangles[i].x+Tangles[i].rad &&  mouseX>=Tangles[i].x-Tangles[i].rad){
       if (mouseY<=Tangles[i].y+Tangles[i].rad &&  mouseY>=Tangles[i].y-Tangles[i].rad){
         tangleSelect=i;
         moveCount=moveCount+1;
            Tangles[tangleSelect].r=(Tangles[tangleSelect].r+Spots[spotSelect].r)/2;
            Tangles[tangleSelect].g=(Tangles[tangleSelect].g+Spots[spotSelect].g)/2;
            Tangles[tangleSelect].b=(Tangles[tangleSelect].b+Spots[spotSelect].b)/2;
           if (spotSelect<6){
            Spots[spotSelect]=new Spot(width/4, spotY[spotSelect], radius, random(255),random(255),random(255),1);
           }
            if (spotSelect>5){
            Spots[spotSelect]=new Spot(3*width/4, spotY[spotSelect%6], radius, random(255),random(255),random(255),1);
           }
          }
         }
       }
       
       if (win){
        if (mouseX<=width/2+150 &&  mouseX>=width/2-150){
          if (mouseY<=height/2+50 &&  mouseY>=height/2-50){
            win=false;
            moveCount=0;
            Tangles[0]=new Tangle(width/2, height/3, height/6,random(255),random(255),random(255),"top");
            Tangles[1]=new Tangle(width/2, 2*height/3, height/6,random(255),random(255),random(255),"bottom");
     
            
          }    
        }
       }
     }
 
 function Spot(xpos, ypos, radius, fillRed, fillGreen, fillBlue, addType) {
    this.x = xpos;
    this.y = ypos;
    this.rad = radius;
    this.r=fillRed;
    this.g=fillGreen;
    this.b=fillBlue;
    this.type=addType;
    
    this.display = function(){
      fill(this.r, this.g, this.b);
      ellipse(this.x, this.y, this.rad*2, this.rad*2);
                   }
     }

function Tangle(xpos, ypos, radius, fillRed, fillGreen, fillBlue, position) {
    this.x = xpos;
    this.y = ypos;
    this.rad = radius;
    this.r=fillRed;
    this.g=fillGreen;
    this.b=fillBlue;
    this.pos=position;
    
    this.display = function(){
    fill(this.r, this.g, this.b);
    rect(this.x-this.rad, this.y-.9*this.rad, this.rad*2, this.rad*1.8, height/20);
                 }
    }  
          
          
  


    
 