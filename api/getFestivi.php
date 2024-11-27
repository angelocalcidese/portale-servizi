<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";

$data = getRequestDataBody();

$sql = "SELECT * FROM `giornifestivi` WHERE YEAR(data) = ".$data["anno"];
$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($data, $row["data"]);
    }
  } 
  
 echo json_encode($data);

$conn->close();
?>