<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/utility.php";
require_once "../../portale/api/getUserCoockie.php";
require_once "../../portale/api/sendMailMessageExt.php";

$data = getRequestDataBody();

$sql = "INSERT INTO `messaggi` (`id`, `day`, `obj`, `message`, `da`, `assegnatoa`, `view`) VALUES (NULL, '" . $data["day"] . "', '" . $data["oggetto"] . "', '" . $data["messaggio"] . "', '". $data["mittente"]. "', '" . $data["destinatario"] . "', '0')";

$result = $conn->query($sql);
if(isset($data["email"])){
   $oggetto = "Nuovo Messaggio ricevuto";
    $messaggio = "Hai ricevuto il seguente messaggio da: <br><br><b>". $user_params->nome." ". $user_params->cognome. "</b><br><br>Accedi al portale per leggere il messaggio.<br> Cordiali Saluti<br>
    Il Team EasySw";

    sendEmail($data["email"], $messaggio, $oggetto); 
}


echo $result;
?>