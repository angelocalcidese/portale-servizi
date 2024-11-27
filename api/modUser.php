<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";

$data = getRequestDataBody();

$sql = "UPDATE `user` SET  `emailpersonale` = '" . $data["emailpersonale"] . "', `telefonopersonale` = '" . $data["telefonopersonale"] . "' WHERE `user`.`id` = ". $data["id"];

$result = $conn->query($sql);

echo $result;
//echo $sql;
?>