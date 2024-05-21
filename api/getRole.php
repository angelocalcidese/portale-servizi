<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/api/getUserCoockie.php";

$sql = "SELECT * FROM `role` WHERE `company` = ". $user_params->company;
$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $object = new stdClass(); 
        $object->id = $row["id"]; 
        $object->ruolo = $row["ruolo"]; 
        array_push($data, $object);
    }
  } 

  //print_r($data);
 echo json_encode($data);

$conn->close();
?>