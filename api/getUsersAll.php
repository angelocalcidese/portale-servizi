<?php 
require_once "../../portale/cors.php";
require_once "../../portale/config.php";

$sql = "SELECT * FROM `user` ORDER BY `user`.`cognome` ASC ";
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