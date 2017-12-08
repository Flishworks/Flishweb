//var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
var source = audioCtx.createBufferSource();
source.connect(analyser);
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

var oscCanvas = document.getElementById('oscCanvas');
var oscCanvasCtx = oscCanvas.getContext('2d');
oscCanvasCtx.clearRect(0, 0, this.width, this.height);

function draw() {
	drawVisual = requestAnimationFrame(draw);
	analyser.getByteTimeDomainData(dataArray);
	oscCanvasCtx.fillStyle = 'rgb(200, 200, 200)';
    oscCanvasCtx.fillRect(0, 0, this.width, this.height);
	oscCanvasCtx.lineWidth = 2;
    oscCanvasCtx.strokeStyle = 'rgb(0, 0, 0)';
    oscCanvasCtx.beginPath();
	var x=0;
	var sliceWidth=1;
	for(var i = 0; i < bufferLength; i++) {
   
        var v = dataArray[i] / 128.0;
        var y = v * oscCanvasCtx.height/2;

        if(i === 0) {
          oscCanvasCtx.moveTo(300, 500);
        } else {
          //canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }
	  oscCanvasCtx.lineTo(this.width, this.height/2);
      oscCanvasCtx.stroke();
    };
	draw();