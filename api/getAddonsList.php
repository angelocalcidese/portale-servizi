<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";
require_once "../../portale/api/getUserCoockie.php";

$sql = "SELECT * FROM `notifiche` WHERE `assegnatoa` = " . $user_params->company." LIMIT 10";
//$sql = "SELECT * FROM `notifiche`";
$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $object = new stdClass(); 
        $object->addon  = $row["addon"];
        $object->icon  = $row["icon"];
        $object->message  = $row["message"];
        $object->da  = $row["da"];
        $object->view  = $row["view"];
        array_push($data, $object);
    }
  } 

  //print_r($data);
  
echo json_encode($data);
$conn->close();
?>