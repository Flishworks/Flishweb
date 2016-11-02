
<html>
  <head>
   <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
   </head>
  <body>
  
  <form action="guestPoems.php" method="post">
  Name: <input type="text" name="name"><br>
  Title: <input type="text" name="title"><br>
  Poem: <input type="text" name="poem"><br>
<input type="Submit">
</form>

<h2> Client example </h2>
  <h3>Output: </h3>
  <div id="output">this element will be accessed by jquery and this text replaced</div>
  
  <br/>
  <br/>
  <a class="button">Test1</a>
  <br/>
  <br/>
 <script id="source" language="javascript" type="text/javascript">
   $(document).ready(function(){
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
        $('#output').html(data); //Set output element html
        //recommend reading up on jquery selectors they are awesome 
        // http://api.jquery.com/category/selectors/
        }
      }); 
    });
  }); 

  </script>
  </body>
</html>



 
<?php 
  $link = mysql_connect('avikazencom.ipagemysql.com', 'akazencom', 'Nodata'); 
  if (!$link) { 
    die('Could not connect: ' . mysql_error()); 
  } 
  mysql_select_db(guest_names); 
  
  //load and print all poem titles
  $getlist="SELECT * FROM poems";  
  $list = mysql_query($getlist);
  if(!$list )
  {
      die('Could not get data: ' . mysql_error());
  }
  
  while($row = mysql_fetch_array($list)) {
    echo "<a class='loadDBpoem'>".$row[2]."</a><br />";
  }

 
 
  
  //post new poem to database if loaded from submit form
  $name=$_POST['name'];
  $title=$_POST['title'];
  $poem=$_POST['poem'];
  //table goes name, poem, poem title, date
  $setPoem = "INSERT INTO `poems` (`guest_name`, `poem_text`, `poem_title`, `submit_date`) VALUES ('$name','$poem','$title', NOW())";  
  mysql_query($setPoem);
  if(!$setPoem) {
    die('Could not enter data: ' . mysql_error());
  }
      
      mysql_close();//important to limit open connections
?>