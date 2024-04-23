<?php
require_once "../portale/config.php";
require_once "sendMailMessage.php";
$form = '<form action="" method="POST">
                <input type="text" id="email" class="fadeIn second " name="email" value="" placeholder="E-MAIL">
                <input type="submit" class="fadeIn fourth" value="Invia">
            </form>';


if (!empty($_POST['email'])) {

    $sql = "SELECT * FROM `user` WHERE `email` = '" . $_POST['email'] . "'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $contatto = "";
        while ($row = $result->fetch_assoc()) {
            $contatto = $row["nome"] ." ". $row["cognome"];
        }
        $emailbase64 =  base64_encode($_POST['email']);
        $title = "Reset Password Portale EasySw";
         $message = "Buongiorno, ". $contatto . ", <br><br> abbiamo ricevuto una richiesta di reset della sua password, se &egrave; stata lei ad effettuare la richiesta
        pu&ograve; accedere alle seguente <a href='http//easysw.it/portale/changePassword.php?token=" . $emailbase64 . "'><b>Link</b></a>, se no pu&ograve; semplicemente ignorare 
        questa email.<br><br>Cordiali Saluti<br><br> Il Team di EasySW";
        //$message = "Buongiorno, " . $contatto . ", <br><br> abbiamo ricevuto una richiesta di reset della sua password, se &egrave; stata lei ad effettuare la richiesta";

        sendEmail($_POST['email'], $message, $title);
       //echo $emailbase64;
        echo '<div class="alert alert-success center" style="text-align:center" role="success">Richiesta inviata con successo.<br> Le abbiamo inviato le istruzioni per resettare la password.</div>';
       
    } else {
        echo '<div class="alert alert-error center" style="text-align:center" role="error">Email non esistente</div>';
        echo $form;
    }
} else {
    echo '<div class="alert alert-warning center" style="text-align:center" role="alert">Inserisci la tua email per il recupero della password</div>';
    echo $form;
}
