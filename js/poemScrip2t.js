//change link color on mouse over
$(document).ready(function() {
  $("a.navigator").mouseover(function() { $(this).stop().animate({color: "#da8900", backgroundColor: "rgba(220, 230, 240, 0.7)"}, 300) });
  $("a.navigator").mouseout(function() { $(this).stop().animate({color: "rgb(255,220,220)", backgroundColor: "rgba(0, 0, 0, 0)"}, 300) });
  $("a.poemLinks").mouseover(function() { $(this).stop().animate({color: "#da8900", backgroundColor: "rgba(220, 230, 240, 0.7)"}, 300) });
  $("a.poemLinks").mouseout(function() { $(this).stop().animate({color: "rgb(50,50,50)", backgroundColor: "rgba(0, 0, 0, 0)"}, 300) });
  $("div#addPoemButton").mouseover(function() { $(this).stop().animate({color: "#da8900", backgroundColor: "rgba(220, 230, 240, 0.7)"}, 300) });
  $("div#addPoemButton").mouseout(function() { $(this).stop().animate({color: "rgb(50,50,50)", backgroundColor: "rgba(0, 0, 0, 0)"}, 300) });

  $("a.poemLinks").click(function() {
        var poemName1 = "poems/"+this.innerHTML+".txt";
        var poemName2 = poemName1.replace(/ /g,"");
        $("#poemBox").load(poemName2,makeBreaks);    
   });
 
 $("div#addPoemButton").click(function() {
        var uploadPoemForm = "<form action='Poems.php'method='post'>Name: <br><input type='text' name='name'><br>Title(must be unique for poem to save):  <br><input type='text' name='title'><br>Poem: <br><textarea name='poem' rows='10' cols='30'></textarea><br><input type='Submit'></form>"
        $("#poemBox").html(uploadPoemForm);
   });
          
  $('.pull-down').each(function() {
    $(this).css('margin-top', $(this).parent().height()-$(this).height())
  }); 
  
  
  // load poem from mySQL database
  $("a.loadDBpoem").click(function() { 
    //-----------------------------------------------------------------------
    // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
    //-----------------------------------------------------------------------
    $.ajax({    
      type: "GET",
      url: "loadpoem.php",                  //the script to call to get data          
      data:{"poem_title": this.innerHTML},   //you can insert url argumnets here to pass to api.php
      dataType: "html",                //data format      
      success: function(data)          //on recieve of reply
      {
        //--------------------------------------------------------------------
        // 3) Update html content
        //--------------------------------------------------------------------
        $("#poemBox").html(data); //Set output element html
        //recommend reading up on jquery selectors they are awesome 
        // http://api.jquery.com/category/selectors/
        }
      }); 
    });
    
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
  
function makeBreaks() {
        var el = document.getElementById("poemBox");
        var str = el.innerHTML;
        //var res = str.replace(/\r\n/g, "<br/>");
        str = str.split("\n").join("<br/>");
        el.innerHTML=str;
}


