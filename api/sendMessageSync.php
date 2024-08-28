<?php
function sendMessageExt($oggetto, $messaggio, $mittente, $destinatario){
    require_once "../portale/cors.php";
    require_once "../portale/config.php";
    //require_once "../portale/api/sendMailMessageExt.php";
    $today = date('d/m/Y');

   /* $sql = "SELECT * FROM `user` WHERE `id` = ". $destinatario;
    $result = $conn->query($sql);
    $data = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            sendEmail($row["email"], $messaggio, $oggetto);   
        }
    } */

    $sql1 = "INSERT INTO `messaggi` (`id`, `day`, `obj`, `message`, `ext`, `assegnatoa`, `view`) VALUES (NULL, '" . $today . "', '" . $oggetto . "', '" . $messaggio . "', '". $mittente. "', '" . $destinatario . "', '0')";
   // echo $sql1;
    $conn->query($sql1);
}

?>