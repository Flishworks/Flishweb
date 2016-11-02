<?php 
  $mysqli = new mysqli('avikazencom.ipagemysql.com', 'akazencom', 'Nodata','guest_names'); 
  if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
  }

  $title=$_GET["poem_title"];
  
  $getPoem="SELECT * FROM poems WHERE poem_title='".$title."'";
  
  if ($result = $mysqli->query($getPoem)) {
    /* fetch object array */
    while ($row = $result->fetch_row()) {
        //table goes name, poem, poem title, date
        echo nl2br("<strong>".$row[2]."</strong><br />By ".$row[0]."<br /><br />".$row[1]);
    }
    
    $result->close();/* free result set */
}    
  $mysqli->close();
?>