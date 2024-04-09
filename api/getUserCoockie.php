<?php
    if (isset($_COOKIE["easySW"])) {
     $user_params = json_decode(base64_decode($_COOKIE["easySW"]));
    } else {
        header("Location: ../login.php");
    }
?>