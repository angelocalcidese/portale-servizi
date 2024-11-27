<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";

$data = getRequestDataBody();

$sql = "SELECT * FROM `user` WHERE `id` = '" . $data['id'] . "'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $psw = $row["password"];
    }

    if(password_verify($data['oldpassword'], $psw)){
        $hash = password_hash($data['password'], PASSWORD_DEFAULT);
        $sql2 = "UPDATE `user` SET `password` = '" . $hash . "' WHERE `user`.`id` = " . $data['id'];
        $result1 = $conn->query($sql2);
        echo "OK"; 
    } else {
        echo $data['password'];
    }
} else {
    echo "Password Non trovata";
}
?>