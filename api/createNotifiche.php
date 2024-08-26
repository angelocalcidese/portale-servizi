<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";
require_once "../../portale/api/getUserCoockie.php";

$data = getRequestDataBody();

$sql= "INSERT INTO `notifiche` (`id`, `addon`, `icon`, `message`, `da`, `assegnatoa`, `view`) VALUES (NULL, '".$data['addon']. "', '" . $data['icon'] . "', '" . $data['message'] . "', '" . $user_params->id . "', '" . $data['assegnatoa'] . "', '0')";

$result = $conn->query($sql);

echo $result;
?>
