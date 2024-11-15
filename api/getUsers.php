<?php 
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/api/getUserCoockie.php";

$sql = "SELECT * FROM `user` WHERE `company` = " . $user_params->company . " AND `view` = 1 AND `fornitore` = 0 ORDER BY `user`.`cognome` ASC";
//echo $sql;
$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $object = new stdClass(); 
        $object->id = $row["id"]; 
        $object->nome = $row["nome"]; 
        $object->cognome = $row["cognome"]; 
        $object->cf = $row["cf"]; 
        $object->annodinascita = $row["annodinascita"]; 
        $object->ruolo = $row["ruolo"]; 
        $object->assunzione = $row["assunzione"]; 
        $object->nazione = $row["nazione"]; 
        $object->email = $row["email"]; 
        $object->telefono = $row["telefono"]; 
        array_push($data, $object);
    }
  } 

  //print_r($data);
 echo json_encode($data);

$conn->close();
?>