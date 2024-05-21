<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/api/getUserCoockie.php";

$sql = "SELECT * FROM `company` WHERE `id` =". $user_params->company;
$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $object = new stdClass(); 
        $object->id = $row["id"]; 
        $object->name = $row["name"]; 
        $object->address = $row["address"]; 
        $object->email = $row["email"]; 
        $object->telephone = $row["telephone"];
        $object->piva = $row["piva"];
        $object->active = $row["active"];
        $object->foto = $row["foto"];
        $object->colori = $row["colori"];
        array_push($data, $object);
    }
  } else {
    echo "0 results";
  }

  //print_r($data);
 echo json_encode($data);

$conn->close();
?>