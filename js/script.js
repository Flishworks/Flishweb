//change link color on mouse over

$(document).ready(function() {
  $("a").mouseenter(function() { 
    $(this).stop().animate({backgroundColor: "rgba(220, 230, 240, 0.7)"}, 300) 
    });
    
  $("a").mouseout(function() { $(this).stop().animate({backgroundColor: "rgba(0, 0, 0, 0)"}, 300) });


//responsive web layout for small screens 
if ($(window).width() < 600){ 
  document.getElementById("headBox").style.height="300px";
  document.getElementById("titleImage").style.display="block";
  document.getElementById("titleImage").style.marginLeft="Auto";
  document.getElementById("titleImage").style.marginRight="Auto";
  document.getElementById("titleImage").style.width="60%";   
  document.getElementById("header").style.textAlign ="center";
  document.getElementById("links").style.paddingLeft ="0px";
  document.getElementById("pageTitle").style.textAlign ="center";
  document.getElementById("pageTitle").style.paddingLeft ="0px";
  document.getElementById("processing-canvas").style.paddingTop ="150px";
  //document.getElementById("links").style.paddingLeft = "0px";
  }
  });


function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

function getDocWidth() {
    var D = document;
    return Math.max(
        D.body.scrollWidth, D.documentElement.scrollWidth,
        D.body.offsetWidth, D.documentElement.offsetWidth,
        D.body.clientWidth, D.documentElement.clientWidth
    );
}