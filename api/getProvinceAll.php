<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";

$data = getRequestDataBody();

$sql = "SELECT * FROM `gi_province` ORDER BY `denominazione_provincia`";
$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $object = new stdClass(); 
        $object->sigla_provincia  = $row["sigla_provincia"]; 
        $object->denominazione_provincia = $row["denominazione_provincia"]; 
        array_push($data, $object);
    }
  } 

  //print_r($data);
 echo json_encode($data);

$conn->close();
?>