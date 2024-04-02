<?php 
require_once "portale/config.php";

if(!empty($_POST['email']) && !empty($_POST['password'])){

    $sql = "SELECT * FROM `user` WHERE `email` = '" . $_POST['email'] . "'";
    $result = $conn->query($sql);
    //echo $_POST['username']." - ". $_POST['email'];

    $psw = "";
    $user = new stdClass();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $psw = $row["password"];
            $user->id = $row["id"];
            $user->nome = $row["nome"];
            $user->cognome = $row["cognome"];
            $user->email = $row["email"];
            $user->telefono = $row["telefono"];
            $user->company = $row["company"];
        }

        $obj = json_encode($user);

        setcookie("easySW", base64_encode($obj), time() + (86400 * 30), "/"); // 86400 = 1 day
        header("Location: portale/dashboard.php");
        exit();
    } else {
        echo "email o password errati o non esistenti";
    }

    
} elseif(isset($_COOKIE["easySW"])) {
    header("Location: portale/dashboard.php");
}

?>