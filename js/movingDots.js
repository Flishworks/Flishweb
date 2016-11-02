var speed = .0001;
var n = 30; 
var grid = [];
var spacing = 35;
var clickX=-100;
var clickY=-100;
var timer=0;

function setup() {
   var myCanvas = createCanvas(getDocWidth(), getDocHeight());
   myCanvas.parent("p5canvas");  //puts canvas in the p5canvas div
    for(var y = 0; y < height; y += spacing) {
    for(var x = 0; x < width; x += spacing) {
      grid.push(createVector(x, y));
          }
      }
}

function draw() {
  timer=timer+1;
  var timeMorf=cos(millis()*speed);
  var a = 255;
  background(100,235,240, a);
    
  
  var control = [];
  for(var i = 0; i < 1; i++) {
    //var x = width * noise(i*2 + 0, millis() * speed);
    //var y = height * noise(i*2 + 1, millis() * speed);
    var v = createVector(clickX, clickY);
    control.push(v);
    // ellipse(v.x, v.y, 10, 10); // draw centers
  }
  
  noStroke();
  fill(255);
  
  var range = min(width, height) / 6; //radius of circle
  var zoom = range / 10//how "magnified" the circle looks
  
  grid.forEach(function (v) {
    var vv = v.copy();
    control.forEach(function (c) {
      var difference = p5.Vector.sub(v, c);
      var length = difference.mag();
      difference.div(length);
      if(length < range) {
       var amt = map(cos(map(length, 0, range, 0, TWO_PI)*timer*.01), 1, -1, 0, zoom);
        vv.add(difference.mult(amt));
      }
    })
    ellipse(vv.x+30*cos(millis()*.0004)*sin(vv.x*PI/width), vv.y, 4, 4);
  });
}

function mouseClicked() {
  clickX=mouseX;
  clickY=mouseY;
  timer=0;
}