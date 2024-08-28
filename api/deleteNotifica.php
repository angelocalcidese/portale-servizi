<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";
require_once "../../portale/api/getUserCoockie.php";

$data = getRequestDataBody();
$sql = "DELETE FROM `notifiche` WHERE `notifiche`.`id` = " . $data['id'];

$result = $conn->query($sql);

echo $result;
?>
