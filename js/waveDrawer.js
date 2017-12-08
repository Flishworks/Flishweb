//https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Stereo
var channels = 1;
// Create an empty two second stereo buffer at the
// sample rate of the AudioContext

var framesPerSec = 10;
var sampleRate = 22050;
var sampleCount = sampleRate/framesPerSec;//audio buffer size
var myArrayBuffer = audioCtx.createBuffer(channels, sampleCount, sampleRate); //audioCtx.sampleRate);
var scaler = 20;//number of times the points on the wavegraph are repeated to fill the buffer. Higher number makes fewer samples and a higher frequency. note that resolution must remain a whole number.
var resolution=Math.round(sampleCount/scaler); //the number of points on the wavegraph
var wavePoints = new Float32Array(resolution); //[];
var t=0;
var nowBuffering;

function setup(){
  var canvas = createCanvas(getDocWidth()*.5, getDocHeight()*.5);
  canvas.parent("p5canvas");  //puts canvas in the p5canvas div
  canvas.position(getDocWidth()*.25,0);

  //add controls
  controls();
  
  //initialize the visual wave buffer
  for (this.i=0;this.i<resolution;this.i++){
    wavePoints[this.i]=0;
  }
  
  frameRate(framesPerSec);
  
  loadSine();
}

function draw(){
  t++;//for timing
  //this.Size =  thrusterToggle.size().height;
  //console.log(thrusterToggle.size().height);
  background(200);
  drawGrid();
  
  noStroke();
  fill(255,0,0);
  for (this.i=0;this.i<resolution;this.i++){ //draw the points to the screen
    ellipse(this.i/resolution*width,height/2+wavePoints[this.i]*height,5,5);
  }
  
  if (mouseIsPressed) {
	   //for (this.j = -5; this.j < 5; this.j++) {
		wavePoints[Math.floor(mouseX/width*resolution)]=(mouseY/height)-.5;
	   //}
  }
  
  //if (t%frameRate()<1){ //load the buffer once per second
    //for (var channel = 0; channel < channels; channel++) {
     // This gives us the actual array that contains the data
     var channel = 0;
	 nowBuffering = myArrayBuffer.getChannelData(channel);
     
		for (this.i=0; this.i<scaler; this.i++){
			 for (this.j = 0; this.j < resolution; this.j++) {
			   // audio needs to be in [-1.0; 1.0]
				nowBuffering[this.i*resolution+this.j] = wavePoints[this.j];
				//nowBuffering[this.j] = wavePoints[this.j];
			  }
		}
    //} 
    
 
    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    var source = audioCtx.createBufferSource();
    // set the buffer in the AudioBufferSourceNode
    source.buffer = myArrayBuffer;
    // connect the AudioBufferSourceNode to the
    // destination so we can hear the sound
    source.connect(audioCtx.destination);
    // start the source playing
    source.start();
  }
//}


//}


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

function loadSine(){
	for (this.i=0;this.i<resolution;this.i++){
		wavePoints[this.i]=.5*sin(8*Math.PI*this.i/resolution);
    }
}

function controls(){
  //*****left side*****
  //manual button//
  /* thrusterToggle = createButton('Manual On/Off');
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
  
  //*****right side****
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
  
  //*****Center*****
  equation = createDiv('');
  equation.position(getDocWidth()/4, height+200); 
  equation.class("equation");
  
  */

  
}




    