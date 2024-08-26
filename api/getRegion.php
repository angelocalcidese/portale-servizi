<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";

$sql = "SELECT * FROM `gi_regioni` ORDER BY `denominazione_regione`";
$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $object = new stdClass(); 
        $object->codice_regione  = $row["codice_regione"]; 
        $object->denominazione_regione = $row["denominazione_regione"]; 
        array_push($data, $object);
    }
  } 

  //print_r($data);
  
echo json_encode($data);
$conn->close();
?>