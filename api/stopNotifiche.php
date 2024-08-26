<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";
require_once "../../portale/api/getUserCoockie.php";

$data = getRequestDataBody();
$sql = "UPDATE `notifiche` SET `view` = '1' WHERE `notifiche`.`assegnatoa` = " . $user_params->id;

$result = $conn->query($sql);

echo $result;
?>
