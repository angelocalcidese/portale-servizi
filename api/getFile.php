<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "utility.php";

$data = getRequestDataBody();

//$sql = "SELECT * FROM `file` WHERE `type` = " . $data["name"];
$sql = "SELECT * FROM `file` WHERE type = '". $data["name"]."'";
$result = $conn->query($sql);

$res = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $object = new stdClass();
        $object->id = $row["id"];
        $object->type = $row["type"];
        $object->file = $row["file"];
        array_push($res, $object);
    }
}

echo json_encode($res);

$conn->close();
