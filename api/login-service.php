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

            $active = $row["active"];
            $firstaccess = $row["firstaccess"];
        }

        if(password_verify($_POST['password'], $psw) && ($active != 1)){
            echo "Utente non abilitato";
        } else if(password_verify($_POST['password'], $psw) &&  $firstaccess == 1){
            header("Location: portale/changePassword.php?id=". $user->id."&email=". $user->email);
        } else if(password_verify($_POST['password'], $psw)){
            $obj = json_encode($user);
            setcookie("easySW", base64_encode($obj), time() + 86400); // 86400 = 1 day
            header("Location: portale/dashboard.php");
            exit();
        } else {
            echo '<div class="alert alert-danger" role="alert">
                email o password errati
                </div>';
            //echo "email o password errati";
        }
        
    } else {
        echo "email o password errati o non esistenti";
    }

    
} elseif(isset($_COOKIE["easySW"])) {
    header("Location: portale/dashboard.php");
} 

?>