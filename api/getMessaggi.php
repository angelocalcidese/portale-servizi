<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";
require_once "../../portale/api/getUserCoockie.php";

$sql = "SELECT * FROM `messaggi` WHERE `assegnatoa` = " . $user_params->id. " AND `archiviato` = 0 ORDER BY `id` DESC";
$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $object = new stdClass();
        $object->id  = $row["id"];
        $object->day  = $row["day"];
        $object->message  = $row["message"];
        $object->da  = $row["da"];
        $object->ext  = $row["ext"];
        $object->view  = $row["view"];
        $object->obj  = $row["obj"];
        array_push($data, $object);
    }
  } 

  //print_r($data);
  
echo json_encode($data);
$conn->close();
?>