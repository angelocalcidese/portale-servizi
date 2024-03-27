<?php 
require_once "config.php";

if(!empty($_POST['email']) && !empty($_POST['password'])){

    $sql = "SELECT * FROM `user` WHERE `email` = '" . $_POST['email'] . "'";
    $result = $conn->query($sql);
    //echo $_POST['username']." - ". $_POST['email'];

    $psw = "";
    $user = new stdClass();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $psw = $row["password"];
            
            $user->nome = $row["nome"];
            $user->cognome = $row["cognome"];
            $user->email = $row["email"];
            $user->telefono = $row["telefono"];
            $user->company = $row["company"];
        }
        print_r($user);
    } else {
        echo "email o password errati o non esistenti";
    }

    
}

?>