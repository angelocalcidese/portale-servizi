<?php
unset($_COOKIE['easySW']);
setcookie('easySW', '', -1, '/'); 
header("Location: ../login.php");
?>