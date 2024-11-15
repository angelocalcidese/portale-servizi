<?php
require_once "../config.php";
if (isset($_COOKIE["easySW"]) && isset($_COOKIE["POMACLIENTLOGGED"])) {
    $user_params = json_decode(base64_decode($_COOKIE["easySW"])); 
    echo true;
} else {
    echo false;
}

