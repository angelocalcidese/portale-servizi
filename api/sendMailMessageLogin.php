<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

function sendEmail($email, $message, $title)
{
require 'portale/config.php';

    $mail = new PHPMailer(true); //se true vengono sollevate eventuali eccezioni utili per il debugging

    try {
        //Impostazioni server
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                 //Debug mode
        $mail->isSMTP();                                       //Invio tramite SMTP
        $mail->Host       = 'smtps.aruba.it';                  //Server SMTP
        $mail->SMTPAuth   = true;                              //Abilita autenticazione SMTP
        $mail->Username   = $emailAddr;           //SMTP username
        $mail->Password   = $emailPsw;                      //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;    //Abilita TLS implicito
        $mail->Port       = 465;                               //Porta SMTP

        //Recipients
        $mail->setFrom($emailAddr, $emailObj);
        $mail->addAddress($email, 'Dest');  //Indirizzo destinatario
        $mail->addReplyTo($emailAddr, 'User');          //Indirizzo di risposta
        //$mail->addCC('cc@gmail.com');                         //Campo CC  (Copia Carbone)    
        // $mail->addBCC('info@easysw.it');                       //Campo BCC (Copia Carbone Nascosta)

        //Content
        $mail->isHTML(true);                                  //Abilita invio in HTML
        $mail->Subject = $title;                           //Oggetto 
        $mail->Body    = $message; //Corpo email
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients'; //Testo alternativo

        $mail->send();
        echo 'Il messaggio è stato inviato con successo';
    } catch (Exception $e) {
        echo "Il messaggio non è stato inviato. Errore: {$mail->ErrorInfo}";
        // echo "<script>console.log('Il messaggio non è stato inviato. Errore:', {$mail->ErrorInfo});<script>";
    }
}
