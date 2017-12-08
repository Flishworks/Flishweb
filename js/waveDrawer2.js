//https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Stereo
var channels = 1;
// Create an empty two second stereo buffer at the
// sample rate of the AudioContext

var framesPerSec = 10;
var sampleRate = 22050;
var sampleCount = sampleRate;//audio buffer size
var myArrayBuffer = audioCtx.createBuffer(channels, sampleCount, sampleRate); //audioCtx.sampleRate);
var scaler = 150;//number of times the points on the wavegraph are repeated to fill the buffer. Higher number makes fewer samples and a higher frequency. note that resolution must remain a whole number.
var resolution=Math.round(sampleCount/scaler); //the number of points on the wavegraph
var wavePoints = new Float32Array(6*resolution); //[];
var t=0;
var nowBuffering;
var lastMouseX;
var lastMouseY;

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

}

function draw(){

  t++;//for timing
  //this.Size =  thrusterToggle.size().height;
  //console.log(thrusterToggle.size().height);
  background(200);
  drawGrid();
  
  stroke(255,0,0);
  strokeWeight(2);
  fill(255,0,0);
  for (this.i=0;this.i<resolution;this.i++){ //draw the points to the screen
    //ellipse(this.i/resolution*width,height/2+wavePoints[this.i]*height,5,5);
	line(this.i/resolution*width,height/2+wavePoints[this.i]*height,(this.i+1)/resolution*width,height/2+wavePoints[this.i+1]*height);
  }
  
  if (mouseIsPressed) {
	  //wavePoints[Math.floor(mouseX/width*resolution)]=(mouseY/height)-.5;
	  var currentAmp=(mouseY/height)-.5
	  var lastAmp=(lastMouseY/height)-.5
	  
		if (mouseX>lastMouseX){
			for (this.i=Math.floor(lastMouseX/width*resolution); this.i<Math.floor(mouseX/width*resolution); this.i++){
				//wavePoints[this.i]=(mouseY/height)-.5;//map(this.i,Math.floor(lastMouseX/width*resolution),this.i<Math.floor(mouseX/width*resolution),lastMouseY, mouseY)/height-.5;
				//wavePoints[this.i]=(lastMouseY+(mouseY-lastMouseY)*(this.i-Math.floor(lastMouseX/width*resolution))/(Math.floor(mouseX/width*resolution)-Math.floor(lastMouseX/width*resolution))/height)-.5
			      wavePoints[this.i]=(this.i-Math.floor(lastMouseX/width*resolution))/(Math.floor(mouseX/width*resolution)-Math.floor(lastMouseX/width*resolution))*(currentAmp-lastAmp)+lastAmp;
			}
		}
		else{
			for (this.i=Math.floor(lastMouseX/width*resolution); this.i>Math.floor(mouseX/width*resolution); this.i--){
				//wavePoints[this.i]=(mouseY/height)-.5;//map(this.i,Math.floor(lastMouseX/width*resolution),this.i<Math.floor(mouseX/width*resolution),lastMouseY, mouseY)/height-.5;
			      wavePoints[this.i]=(this.i-Math.floor(lastMouseX/width*resolution))/(Math.floor(mouseX/width*resolution)-Math.floor(lastMouseX/width*resolution))*(currentAmp-lastAmp)+lastAmp;
			
			}
		}	
  }
  lastMouseX=mouseX;
  lastMouseY=mouseY;
  
  //if (t%frameRate()<1){ //load the buffer once per second
    //for (var channel = 0; channel < channels; channel++) {
     // This gives us the actual array that contains the data
     var channel = 0;
	 nowBuffering = myArrayBuffer.getChannelData(channel);
	 scaler = 150+4*freqDivSlide.value();
	 resolution=Math.round(sampleCount/scaler);
	 
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
		wavePoints[this.i]=.5*sin(2*Math.PI*this.i/resolution);
    }
}

function loadSawtooth(){
	for (this.i=0;this.i<resolution;this.i++){
		wavePoints[this.i]=-(this.i/resolution)+.5;
    }
}

function loadSquare(){
	for (this.i=0;this.i<resolution;this.i++){
		if(.5*sin(2*Math.PI*this.i/resolution)>0){
			wavePoints[this.i]=.5;
		}
		else{
			wavePoints[this.i]=-.5;
		}	
    }
}

function loadNoise(){
	for (this.i=0;this.i<resolution;this.i++){
			wavePoints[this.i]=Math.random()-.5;
    }
}

function loadTriangle(){
	for (this.i=0;this.i<resolution;this.i++){
		if (this.i<resolution/4){
			wavePoints[this.i]=map(this.i,0,resolution/4,0,.5);
		}
		else if (this.i<3*resolution/4.0){
			wavePoints[this.i]=-2/resolution*this.i+1;
		}
		else{
			wavePoints[this.i]=map(this.i,3*resolution/4,resolution,-.5,0);
		}
	}
}

function controls(){
  //*****left side*****
  //load Sine Wave
  loadSineButton = createButton('Load Sine Wave');
  loadSineButton.size(.15*getDocWidth());
  loadSineButton.position(getDocWidth()*.23-loadSineButton.size().width, getDocHeight()*.4);
  loadSineButton.class("controls");
  loadSineButton.mouseReleased(function() {
    loadSine();
  })
  
    loadSquareButton = createButton('Load Square Wave');
  loadSquareButton.size(.15*getDocWidth());
  loadSquareButton.position(getDocWidth()*.23-loadSquareButton.size().width, getDocHeight()*.5);
  loadSquareButton.class("controls");
  loadSquareButton.mouseReleased(function() {
    loadSquare();
  })
  
    loadTriangleButton = createButton('Load Triangle Wave');
  loadTriangleButton.size(.15*getDocWidth());
  loadTriangleButton.position(getDocWidth()*.23-loadTriangleButton.size().width, getDocHeight()*.6);
  loadTriangleButton.class("controls");
  loadTriangleButton.mouseReleased(function() {
    loadTriangle();
  })
  
    loadSawtoothButton = createButton('Load Sawtooth Wave');
  loadSawtoothButton.size(.15*getDocWidth());
  loadSawtoothButton.position(getDocWidth()*.23-loadSawtoothButton.size().width, getDocHeight()*.7);
  loadSawtoothButton.class("controls");
  loadSawtoothButton.mouseReleased(function() {
    loadSawtooth();
  })
 
  //Tweak the freq//
  freqDiv = createDiv('Frequency<\P>');
  freqDiv.position(getDocWidth()*(1-.23), getDocHeight()*.4); 
  freqDiv.id("freqDiv");
  freqDiv.class("controls");
  freqDiv.size(150);
  freqDivSlide = createSlider(-30, 30, 0, 3); 
  freqDivSlide.parent("freqDiv");
  
   /*
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




    