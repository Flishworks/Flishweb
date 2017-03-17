var speed;
var scoreBox;
var numMouse=20;
var level=0;
var numLevels=5;
var clicks=numLevels;
var delayFlag=false;
var mouse;
var fontSize=64;
var textX=15;
var textY=75;
var randX;
var randY;
var enable=true;


    
function setup() {


  noCursor();
  noStroke();
  textAlign(LEFT);
  rectMode(CENTER);
  fill(255);
  var myCanvas = createCanvas(windowWidth, windowHeight);
 
  if (width<500){
    enable=false;
    }
    
  mouse = loadImage("../img/mouse.png");
  scoreBox = new Box(width/2,height/2,50);
  speed = [numMouse];
  for (var i = 1; i<numMouse;i++){
    speed[i]=new Array(numMouse);
    for (var j = 1; j<numMouse;j++){
      speed[i][j] = random(-1, 2);
    }
  }
} 

function draw(){
  
  //background(102);
  if (!boolean(enable)){
    fill(0);
    text("This game doesn't make sense on a touchscreen device.", textX,textY);  
    }
  else{
    if (boolean(delayFlag)){
     var delay=1000; //1 second

      setTimeout(function() {
        delayFlag=false;
      }, delay);
      
    }
    
    if (delayFlag==false){
    background(102);
    scoreBox.display();
    image(mouse, mouseX, mouseY); 
      textSize(42);
      text("Remaining Clicks: "+(clicks-1), textX, height-50);

      
    var x=0;
    var y=0; 
    if (clicks<1){level=-2;}
      switch(level) {
         case -2:
          clicks=numLevels;
          scoreBox.centerX=width/2;
          scoreBox.centerY=height/2;
          textSize(fontSize);
          text("Oh ya,", textX,textY); 
          text("only "+(numLevels-1)+" clicks.", textX , textY+fontSize);
          break;
        case -1:
          clicks=numLevels;
          scoreBox.centerX=width/2;
          scoreBox.centerY=height/2;
          textSize(64);
          text("Don't touch the wall.", textX,textY); 
          text("Click the box.", textX,textY+fontSize);
          break;
        case 0:
          clicks=numLevels;
          scoreBox.centerX=width/2;
          scoreBox.centerY=height/2;
          textSize(64);
          text("Just click the square.", textX,textY); 
          text("It's that easy.", textX,textY+fontSize);
          break;
        case 1:
          clicks=numLevels;
          scoreBox.centerX=randX;
          scoreBox.centerY=randY;
          textSize(64);
          text("One more time", textX,textY); 
          text("for practice.", textX,textY+fontSize);
          break;
        case 2: 
          scoreBox.centerX=randX;
          scoreBox.centerY=randY;
          for (var i = 0; i<numMouse;i++){
            for (var j = 0; j<numMouse;j++){  
               x=mouseX-width/2+width/numMouse*i;//the last 20 offsets to match the cursor position
               y=mouseY-height/2+height/numMouse*j;
               if (x>width){x-=width;} if (x<0){x+=width;}
               if (y>height){y-=height;} if (y<0){y+=height;}
               image(mouse, x,y);  // Draw at coordinate (110, 90) at size 100 x 100
              }
            }
            boundary();
          break;
        case 3: 
          scoreBox.centerY=randY;
          scoreBox.centerX=(scoreBox.centerX+1)%width;
           // if (scoreBox.centerX>width){
            //  scoreBox.centerX-=width;
           // }
           for (var i = 0; i<numMouse;i++){
              for (var j = 0; j<numMouse;j++){  
                x=i*mouseX/(15*speed[i][j])-speed[i][j]*width;
                y=j*mouseY/(15*speed[i][j])-speed[i][j]*height;
                if (x>width){x-=width;} if (x<0){x+=width;}
                if (y>height){y-=height;} if (y<0){y+=height;}
                image(mouse, x,y);  // Draw at coordinate (110, 90) at size 100 x 100
                }
              }
              boundary();
            break;
         case 4: 
            scoreBox.centerY=mouseX*height/width;
            scoreBox.centerX=(height-mouseY)*width/height;
           for (var i = 0; i<numMouse;i++){
              for (var j = 0; j<numMouse;j++){  
                x=i*mouseX/(15*speed[i][j])-speed[i][j]*width;
                y=j*mouseY/(15*speed[i][j])-speed[i][j]*height;
                if (x>width){x-=width;} if (x<0){x+=width;}
                if (y>height){y-=height;} if (y<0){y+=height;}
                image(mouse, x,y);  // Draw at coordinate (110, 90) at size 100 x 100
                }
              }
              boundary();
            break;
         case 5:
          textSize(64);
          text("You win!!", textX,textY); 
          textSize(42);
          text("Now wipe the finger print off your monitor, you cheater.", textX,textY+fontSize);
          break;
        }
      }
  }
}

function boundary(){
  var thickness=10;
  rect(thickness,height/2,2*thickness,height);
  rect(width-thickness,height/2,2*thickness,height);
  rect(width/2,thickness,width,2*thickness);
  rect(width/2,height-thickness,width,2*thickness);
  if ((mouseX>width-2*thickness)||(mouseX<2*thickness)||(mouseY>height-2*thickness)||(mouseY<2*thickness)){
    level=-1;
  }
}


function mouseClicked(){
  if (delayFlag==false){
    clicks=clicks-1;
    if ((mouseX>scoreBox.centerX-scoreBox.wide/2)&&(mouseX<scoreBox.centerX+scoreBox.wide/2)){
      if ((mouseY>scoreBox.centerY-scoreBox.tall/2)&&(mouseY<scoreBox.centerY+scoreBox.tall/2)){
       randX=random(50,width-50);
       randY=random(50,height-50);
       level=level+1%(numLevels+1);
        if (level>1){
          if (clicks>1){
            fill(50);
            rect(width/2, height/2, width, height);
            textSize(75);
            fill(255);
            text("Nice!", textX,textY);
            delayFlag=true;
          }
        }
      }
    }
  }
}

function Box(x, y, size){
   this.centerX=x;
   this.centerY=y;
   this.wide=size;
   this.tall=size;
   
   this.display = function(){
    rect(this.centerX, this.centerY, this.wide, this.tall, 7);
  }
}

//from http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
function is_touch_device() {
  return 'ontouchstart' in window        // works on most browsers 
      || navigator.maxTouchPoints;       // works on IE10/11 and Surface
};