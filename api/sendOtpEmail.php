<?php
function sendOtpEmail($otp, $email){
    $title = "OTP Portale EasySw";
    $message = "Salve,<br> il suo codice OTP, per accedere al portale EasySW, &egrave; il seguente:<br><b>".$otp."</b><br>Cordiali Saluti<br>Il Team di EasySW";
    sendEmail($email, $message, $title);
}
