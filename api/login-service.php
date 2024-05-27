<?php 
require_once "portale/config.php";
include("portale/otp.php"); 
include("portale/api/sendMailMessage.php"); 
include("portale/api/sendOtpEmail.php"); 

$form = '<form action="" method="POST" id="form-login">
<input type="text" id="email" class="fadeIn second" name="email" placeholder="E-MAIL">
<input type="password" id="password" class="fadeIn third" name="password" placeholder="PASSWORD">
<div class="text-center mt-2 mb-2 hide" id="spin-login">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
<input type="submit" id="login-btn" class="fadeIn fourth" value="Log In">
</form>';

$footer = '<div id="formFooter">
<a class="underlineHover" href="portale/resetPassword.php">Hai dimenticato la Password?</a>
</div>';
if(!empty($_POST['email']) && !empty($_POST['password'])){
    
    $sql = "SELECT * FROM `user` WHERE `email` = '" . $_POST['email'] . "'";
    $result = $conn->query($sql);
    //echo $_POST['username']." - ". $_POST['email'];
    $otp =  generateOTP("123");
    if($test == true){
        echo $otp;
    }
    
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
        } else if((password_verify($_POST['password'], $psw)) && empty($_POST['otp'])){
            echo '<div class="hide">';
                    sendOtpEmail($otp, $_POST['email']);
                    echo '</div>';
            echo '<div class="alert alert-warning" role="alert">
            &Egrave; stato inviato a <b>'.$user->email.'</b> il codice OTP per accedere.
            Se entro 120 secondi non riverai il codice OTP potrai richiedere un nuovo codice
            </div>';
            
            echo '<form action="" method="POST" id="login-otp">
                <input type="text" id="otp" class="fadeIn second otp-style" name="otp" placeholder="OTP">
                    <input type="hidden" id="email" name="email" value="'.$_POST['email'].'">
                    <input type="hidden" id="password" name="password"  value="'.$_POST['password']. '">
                    <div class="text-center mt-2 mb-2 hide" id="spin-login">
                    <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                    </div>
                    </div>
                    <input type="submit" class="fadeIn fourth otp-style" id="login-btn" value="Log In">
                    <input type="submit" class=" hide" id="nuovo-codice" value="Invia nuovo codice">
                    <p id="timer">(<b id="secondi"></b> secondi)</p>
                </form>';
         } else if((password_verify($_POST['password'], $psw)) && isset($otp) && ($_POST['otp'] != $otp)){
                    echo '<div class="hide">';
                    sendOtpEmail($otp, $_POST['email']);
                    echo '</div>';
                    echo '<div class="alert alert-warning" role="alert">
                    <b>Codice OTP Errato</b><br>
                    &Egrave; stato inviato a <b>'.$user->email.'</b> il codice OTP per accedere.
                    Se entro 60 secondi non riverai il codice OTP potrai richiedere un nuovo codice
                    </div>';
                    
                    echo '<form action="" method="POST" id="login-otp">
                <input type="text" id="otp" class="fadeIn second otp-style" name="otp" placeholder="OTP">
                    <input type="hidden" id="email" name="email" value="'.$_POST['email'].'">
                    <input type="hidden" id="password" name="password"  value="'.$_POST['password']. '">
                    <div class="text-center mt-2 mb-2 hide" id="spin-login">
                    <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                    </div>
                    </div>
                    <input type="submit" class="fadeIn fourth otp-style" id="login-btn" value="Log In">
                    <input type="submit" class=" hide" id="nuovo-codice" value="Invia nuovo codice">
                    <p id="timer">(<b id="secondi"></b> secondi)</p>
                </form>';
        } else if((password_verify($_POST['password'], $psw)) && ($_POST['otp'] == $otp)){
            $obj = json_encode($user);
            setcookie("easySW", base64_encode($obj), time() + 86400); // 86400 = 1 day
            header("Location: portale/dashboard.php");
            exit();
        } else {
            echo '<div class="alert alert-danger" role="alert">
                email o password errati
                </div>';
            echo $form;
            //echo "email o password errati";
        }
        
    } else {
        echo '<div class="alert alert-danger" role="alert">
                email o password errati
                </div>';
        echo $form;
        echo $footer;
    }

    
} elseif(isset($_COOKIE["easySW"])) {
    header("Location: portale/dashboard.php");
} else {
    echo $form;
    echo $footer;
}

?>