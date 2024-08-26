<?php
unset($_COOKIE['easySW']);
setcookie('easySW', '', -1, '/');
setcookie('POMACLIENTLOGGED', '', -1, '/'); 
header("Location: ../login.php");
?>