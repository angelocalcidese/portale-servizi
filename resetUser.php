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

            <div class="alert center alert-warning" id="alert-voice" role="alert">
                <b id="load">Attendere ... </b>
                <b class="hide" id="text-load">La tua password è stata correttamente resettata, riceverai un email con la password provvisoria per accedere al portale</b>
            </div>
            <div class="text-center mt-2 mb-2 " id="spin-login">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <a href="/login.php" class="btn btn-secondary fadeIn mt-3 mb-3 hide" id="btn-run">Torna alla Login</a>

            <!-- Login Form -->

        </div>
    </div>


    <!-- jQuery library -->
    <script src="../portale/assets/jquery/jquery-3.7.1.min.js"></script>
    <script src="../portale/assets/jquery-ui/jquery-ui.js"></script>
    <script src="../portale/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="../portale/assets/fontawesome/js/all.min.js"></script>
    <script>
        var email = "<?php echo base64_decode($_GET["token"]); ?>";
        var id = "<?php echo $_GET["id"]; ?>";


        function reset() {
            //console.log("EMAIL: ", email);
            //console.log("ID: ", id);

            $.ajax({
                url: '../../gestioneutenze/api/resetUser.php',
                data: JSON.stringify({ email: email, id: id }),
                method: "POST",
                complete: function(resp) {
                    $("#load").addClass("hide");
                    $("#text-load").removeClass("hide");
                    $("#btn-run").removeClass("hide");
                    $("#spin-login").addClass("hide");


                }
            });
        }
        reset();
    </script>