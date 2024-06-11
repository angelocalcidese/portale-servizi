<!doctype html>
<html lang="it" data-bs-theme="auto">
<?php
include("../portale/head.php");
?>
<link href="../portale/assets/style.css" rel="stylesheet">
<link href="../portale/assets/login.css" rel="stylesheet">

<body>
    <div class="wrapper fadeInDown">
        <div id="formContent">
            <!-- Tabs Titles -->


            <!-- Icon -->
            <div class="fadeIn first">
                <img src="../portale/assets/img/logo.png" id="icon" alt="User Icon" />
            </div>
            <div class="text-center mt-2 mb-2 hide" id="spin-login">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div class="alert center" id="alert-voice" role="alert">
                Inserisci la tua email per il recupero della password
            </div>
            <form action="" method="POST">
                <input type="text" id="email" class="fadeIn second " name="email" value="" placeholder="E-MAIL">
                <button type="button" class="btn btn-secondary fadeIn fourth mt-3 mb-3" id="btn-ok" onClick="resetPsw()">Invia richiesta</button>
                <a href="/" class="btn btn-secondary fadeIn mt-3 mb-3 hide" id="btn-run">Torna alla Homepage</a>
            </form>
            <!-- Login Form -->

        </div>
    </div>
    <!-- jQuery library -->
    <script src="../portale/assets/jquery/jquery-3.7.1.min.js"></script>
    <script src="../portale/assets/jquery-ui/jquery-ui.js"></script>
    <script src="../portale/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="../portale/assets/fontawesome/js/all.min.js"></script>
    <script>
        function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }

        function resetPsw() {
            var email = $("#email").val();

            if ((email != "") && isEmail(email)) {
                $("#alert-voice").removeClass("alert-warning");
                $("#spin-login").removeClass("hide");
                $("#email").attr("disabled", true);
                $("#btn-ok").addClass("hide");

                $.ajax({
                    url: 'api/resPsw.php',
                    data: JSON.stringify({
                        email: email
                    }),
                    method: "POST",
                    complete: function(resp) {
                       // console.log("Resp:", resp);
                        if (resp.responseText == "Email non esistente") {
                            $("#alert-voice").text("Inserire email valida");
                            $("#alert-voice").addClass("alert-warning");
                            $("#spin-login").addClass("hide");
                            $("#email").attr("disabled", false);
                            $("#btn-ok").removeClass("hide");
                        } else {
                            $("#alert-voice").addClass("alert-success");
                            $("#alert-voice").text("Email Inviata con successo");
                            $("#btn-run").removeClass("hide");
                            $("#spin-login").addClass("hide");
                        }

                    }
                });
            } else {
                $("#alert-voice").text("Inserire email valida");
                $("#btn-ok").removeClass("hide");
                $("#email").attr("disabled", false);
                $("#alert-voice").addClass("alert-warning");
            }
        }
    </script>
</body>

</html>