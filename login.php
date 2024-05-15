<!doctype html>
<html lang="it" data-bs-theme="auto">

<?php include("portale/head-login.php"); ?>
<style>
    .hide {
        display: none !important;
    }
</style>

<body>
    <div class="wrapper fadeInDown">
        <div id="formContent">
            <!-- Tabs Titles -->

            <!-- Icon -->
            <div class="fadeIn first">
                <img src="portale/assets/img/logo.png" id="icon" alt="User Icon" />
            </div>
            <?php include("portale/api/login-service.php"); ?>
        </div>
    </div>

    <!-- jQuery library -->
    <script src="portale/assets/jquery/jquery-3.7.1.min.js"></script>
    <script src="portale/assets/jquery-ui/jquery-ui.js"></script>
    <script src="portale/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="portale/assets/fontawesome/js/all.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.3.2/dist/chart.umd.js" integrity="sha384-eI7PSr3L1XLISH8JdDII5YN/njoSsxfbrkCTnJrzXt+ENP5MOVBxD+l6sEG4zoLp" crossorigin="anonymous"></script>
    <script>
        var counter = 60;
        var interval = setInterval(function() {
            counter--;
            // Display 'counter' wherever you want to display it.
            if (counter <= 0) {
                clearInterval(interval);
                $('#timer').addClass("hide");
                $('.otp-style').addClass("hide");
                $("#nuovo-codice").removeClass("hide");
                return;
            } else {
                $('#secondi').text(counter);
                // console.log("Timer --> " + counter);
            }
        }, 1000);

        $("#login-btn").on("click", function() {
            $("#login-btn").addClass("hide");
            $("#spin-login").removeClass("hide");
            $("#form-login").submit();
        });

        $("#login-btn-otp").on("click", function() {
            $("#login-btn-otp").addClass("hide");
            $("#spin-login").removeClass("hide");
            $("#login-otp").submit();
        });

        $("#nuovo-codice").on("click", function() {
            $("#nuovo-codice").addClass("hide");
            $("#spin-login").removeClass("hide");
            $("#login-otp").submit();
        });
    </script>
</body>

</html>