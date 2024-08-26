<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";

$data = getRequestDataBody();

$sql = "SELECT * FROM `gi_comuni` WHERE `sigla_provincia` = '" . $data["provincia"]. "' ORDER BY `denominazione_ita`";
$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $object = new stdClass(); 
        $object->denominazione_ita = $row["denominazione_ita"]; 
        array_push($data, $object);
    }
  }

//print_r($data);
 echo json_encode($data);
//echo json_last_error_msg();
$conn->close();
?>