<?php
require_once "../cors.php";
require_once "../config.php";
require_once "../utility.php";
require_once "sendMailMessage.php";

$data = getRequestDataBody();
/** GET VEICOLI */

$sql = "SELECT * FROM `user` WHERE `email` = '" . $data['email'] . "'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $contatto = "";
    while ($row = $result->fetch_assoc()) {
        $contatto = $row["nome"] . " " . $row["cognome"];
        $id = $row["id"];
    }
    $emailbase64 =  base64_encode($data['email']);
    $title = "Reset Password ". $emailObj;
    $message = "Buongiorno, " . $contatto . ", <br><br> abbiamo ricevuto una richiesta di reset della sua password, se &egrave; stata lei ad effettuare la richiesta
        pu&ograve; accedere alle seguente <a href='". $emailAddress."portale/resetUser.php?token=" . $emailbase64 . "&id=" . $id . "'><b>Link</b></a>, se no pu&ograve; semplicemente ignorare 
        questa email.<br><br>Cordiali Saluti<br><br> Il Team di ". $emailTeams;
       sendEmail($data['email'], $message, $title);
        $message = "Email di recupero password Inviata";
    } else {
        $message ="Email non esistente";
}

echo $message;
