<?php
function sendOtpEmail($otp, $email){
    $title = "OTP Portale EasySw";
    $message = "Salve il suo codice OTP è il seguente:<br>".$otp."<br>Cordiali Saluti<br>Il Team di EasySW";
    sendEmail($email, $message, $title);
}
