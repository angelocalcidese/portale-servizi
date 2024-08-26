<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";

$data = getRequestDataBody();
$sql = "UPDATE `messaggi` SET `view` = '1' WHERE `messaggi`.`id` = " . $data["id"];

$result = $conn->query($sql);

echo $result;
?>
