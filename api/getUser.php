<?php 
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/api/getUserCoockie.php";
require_once "../../portale/utility.php";
$data = getRequestDataBody();
$sql = "SELECT * FROM `user` WHERE `company`= " . $user_params->company . " ";

if (isset($data["utente"])) {
  $sql .= " AND `id` = '" . $data["utente"] . "'";
}

$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $object = new stdClass(); 
        $object->id = $row["id"]; 
        $object->nome = $row["nome"]; 
        $object->cognome = $row["cognome"]; 
        $object->firstaccess = $row["firstaccess"]; 
        $object->active = $row["active"]; 
        $object->emailpersonale = $row["emailpersonale"];
        $object->email = $row["email"]; 
        $object->telefono = $row["telefono"];
        $object->telefonopersonale = $row["telefonopersonale"];
        $object->nazione = $row["nazione"];
        $object->ruolo = $row["ruolo"];
        $object->cf = $row["cf"];
        $object->annodinascita = $row["annodinascita"];
        $object->assunzione = $row["assunzione"];
        $object->citta = $row["citta"];
        $object->provincia = $row["provincia"];
        $object->regione = $row["regione"];
        $object->responsabile = $row["responsabile"];
        $object->fornitore = $row["fornitore"];
        $object->nomefornitore = $row["nome_fornitore"];
        $object->indirizzo = $row["indirizzo"];
        $object->foto = $row["foto"];
        array_push($data, $object);
    }
  } 

  //print_r($data);
 echo json_encode($data);

$conn->close();
?>