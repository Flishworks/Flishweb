<!DOCTYPE html>
<html lang="en">
<head>
  
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!--specifies compatibility with most recent version of IE>-->
	<meta name="viewport" content="width=device-width, initial-scale=1"> <!-- something for mobile device zooming -->
	<meta charset="UTF-8">  <!-- specify character set. this is probably defaulted anyway -->
		
	<title class=Title>Avi's Poetry</title> <!--title on page tab -->
	
  <link href="css/poemStyle.css" rel="stylesheet" type="text/css" />
  
  <link href='https://fonts.googleapis.com/css?family=Luckiest+Guy' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Titillium+Web:400,600' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Peralta' rel='stylesheet' type='text/css'> <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <link href='https://fonts.googleapis.com/css?family=Cherry+Cream+Soda' rel='stylesheet' type='text/css'>
  </head>
  
  <!--Title Block-->
<body>
  <div class="canvas"></div> <!--canvas overlay-->
    <div id="headBox">
        <h2 id="pageTitle">Words
        </h2>
        <div id="header">
          <h3 id="links"> 
            <a class="navigator" href="index.html">Home</a>
            <a class="navigator" href="Drawings.html">Drawings</a>
            <a class="navigator" href="Paintings.html">Paintings</a>
            <a class="navigator" href="Music.html">Music</a>
            <a class="navigator" href="Projects.html">Projects</a>
            <a class="navigator" href="GamesAndVisuals.html">Games and Visuals</a>
            <a class="navigator" href="AboutMe.html">About Me</a>
           
          </h3>
      </div>
    </div>
       
   <div class="row"> 
    <div class="col-sm-3" id="sideColumn">
      TAKE SOME 
        <div id="scrollPoems">

          <a class="poemLinks">A Thousand Words</a>
          <a class="poemLinks">Bucksot Forget Me Nots</a>
          <a class="poemLinks">Stone Cold Cutlery</a>
          <a class="poemLinks">Empathy</a>
          <a class="poemLinks">Entropy</a>
          <a class="poemLinks">Googlebreath</a>
          <a class="poemLinks">Toothpicks</a>
          <a class="poemLinks">Slow Leak</a>
          <a class="poemLinks">Crash</a>
          <a class="poemLinks">Dust Collection</a>
          <a class="poemLinks">The Family</a>
          <a class="poemLinks">Never Was</a>
          <a class="poemLinks">Anonymous Wax</a>
          <a class="poemLinks">Beautiful Things</a>
          <a class="poemLinks">Steep Dive</a>
          <a class="poemLinks">Broken Tongue</a>
          <a class="poemLinks">Leave Us Free</a>
          <a class="poemLinks">Naked</a>
          <a class="poemLinks">Rubber Cement and Popsicle Sticks</a>
          <a class="poemLinks">Drive</a>
          <a class="poemLinks">Collective Duality</a>
          <a class="poemLinks">Shell</a>
          <a class="poemLinks">Cold Water</a>
          <a class="poemLinks">Style</a>
          <a class="poemLinks">Cigarettes</a>
          <a class="poemLinks">Jennifer</a>
          <a class="poemLinks">Gumballz</a>
          <a class="poemLinks">A Hole in the Living Room</a>
          <a class="poemLinks">Timeless</a>
          <a class="poemLinks">Mother</a>
          <a class="poemLinks">Campfire Eyes</a>  
          <a class="poemLinks">Needle</a>
          <a class="poemLinks">Godbone</a>
          <a class="poemLinks">Human by Association</a>
          <a class="poemLinks">City</a>
          <a class="poemLinks">Lost In You</a>
          <a class="poemLinks">The Boy At The Busstop</a>
          <a class="poemLinks">Toluene Dreams</a>
          <a class="poemLinks">You Are Perfect</a>
          <a class="poemLinks">Self Interest</a>
          <a class="poemLinks">Sleepy</a>
          <a class="poemLinks">The Machine Gun</a>
          <a class="poemLinks">To The Clouds</a>
          <a class="poemLinks">1234</a>
          <a class="poemLinks">World Citizen</a>
          <a class="poemLinks">Planned Obsolescence</a>
          <a class="poemLinks">Where The Ends Meet</a>   
        </div>     
    </div> 
    
    <div class="col-sm-6" id="poemBoxContainer">  
     <div id="poemBox">
     </div>
     <div id="triangleContainer">
       <div id="triangleOuterLeft">
          <div id="triangleInnerLeft">
          </div>
       </div>
     </div>
    </div>
    
    <div class="col-sm-3" id="sideColumn">
          Leave Some
          <div id="scrollPoems">
            <?php 
            //this script both saves user entered poems upon reload (if page is reloaded from submission form) and loads the list of guest poems
              $link = mysql_connect('avikazencom.ipagemysql.com', 'akazencom', 'Nodata'); 
              if (!$link) { 
                die('Could not connect: ' . mysql_error()); 
              } 
              mysql_select_db(guest_names); 
              
              //count visits
              mysql_query("UPDATE count 
              SET count = count + 1
              ");
              $count=mysql_query("SELECT * FROM `count` WHERE 1");
               
              //post new poem to database if loaded from submit form
              $name=$_POST['name'];
              $title=$_POST['title'];
              $poem=addslashes ($_POST['poem']); //
              //table goes name, poem, poem title, date
       
              if (isset($title)) {
                $setPoem = "INSERT INTO `poems` (`guest_name`, `poem_text`, `poem_title`, `submit_date`) VALUES ('$name','$poem','$title', NOW())";  
                mysql_query($setPoem);
                if(!$setPoem) {
                  die('Could not enter data: ' . mysql_error());
                }
              }
              
              //load and print all poem titles
              $getlist="SELECT * FROM poems";  
              $list = mysql_query($getlist);
              if(!$list )
              {
                  die('Could not get data: ' . mysql_error());
              }
              
              while($row = mysql_fetch_array($list)) {
                echo "<a class='loadDBpoem'>".$row[2]."</a>";
              }
              $count=mysql_fetch_array($count);
              echo "<br/><br/><br/><br/>".$count[0];    
              mysql_close($link);//important to limit open connections
          ?>
        </div> 
        <div id="addPoemButton">Share!</div>
    </div>
  </div>
    
  <div id="foot"> 
    <div class="col-sm-3" id="sideColumn">
      <img id="retroMan" src="img/RetroMan.png" />
    </div> 
    <div class="col-sm-6" >  
    </div>
    <div class="col-sm-3" id="sideColumn">
    <img id="retroWoman" src="img/RetroWoman.png" />
    </div>
  </div>
  
</body>

  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  <script type="text/javascript" src="https://code.jquery.com/ui/1.11.4/jquery-ui.js"></script> <!-- JQuery color library -->
  <script type="text/javascript" src="js/poemScript.js"></script> <!--my script-->
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

</html>