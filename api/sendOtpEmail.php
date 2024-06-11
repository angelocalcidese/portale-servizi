<?php
function sendOtpEmail($otp, $email){
    require 'portale/config.php';
    $title = "OTP ". $emailObj;
    $message = "Salve,<br> il suo codice OTP, per accedere al ". $emailObj.", &egrave; il seguente:<br><b>".$otp."</b><br>Cordiali Saluti<br>Il Team di ". $emailTeams;
    sendEmail($email, $message, $title);
}
