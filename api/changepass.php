<?php
require_once "../portale/config.php";
if (!empty($_POST['email']) && !empty($_POST['password'])) {

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
        
        if(password_verify($_POST['password'], $psw)){
            if($_POST['newpassword'] == $_POST['renewpassword']){
                    $contaCar = strlen($_POST['newpassword']);

                    if($contaCar >= 8){
                        $hash = password_hash($_POST['newpassword'], PASSWORD_DEFAULT);
                        $sql2 = "UPDATE `user` SET `password` = '".$hash. "', `firstaccess` = '0' WHERE `user`.`id` = ". $user->id;
                        $result1 = $conn->query($sql2);
                        header("Location: ../login.php?change=ok");
                    } else {
                        echo '<div class="alert alert-danger" role="alert">Inserire almeno 8 caratteri</div>';
                    }
            } else {
                echo '<div class="alert alert-danger" role="alert">nuova password non ineserita correttamente</div>';
            }
        } else {
            echo '<div class="alert alert-danger" role="alert">Email o Password Errate</div>';
        }
    } else {
        echo "email o password errati o non esistenti";
    }
} else {
    echo '<div class="alert alert-warning center" style="text-align:center" role="alert">Inserire tutti i campi</div>';
}
