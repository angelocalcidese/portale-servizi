<?php
require_once "../cors.php";
require_once "../config.php";
if (isset($_COOKIE["easySW"])) {
    $user_params = json_decode(base64_decode($_COOKIE["easySW"]));
    echo json_encode($user_params);
} else {
    echo false;
}

