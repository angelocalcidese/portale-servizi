<!doctype html>
<html lang="it" data-bs-theme="auto">

<?php include("../portale/head.php"); ?>
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
            <h5>TARGA : <span><?php echo base64_decode($_GET["t"]); ?></span></h5>
            <?php include("../portale/api/sendKm.php"); ?>
            
            


        </div>
    </div>
    <!-- jQuery library -->
    <script src="../portale/assets/jquery/jquery-3.7.1.min.js"></script>
    <script src="../portale/assets/jquery-ui/jquery-ui.js"></script>
    <script src="../portale/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="../portale/assets/fontawesome/js/all.min.js"></script>
    <script src="../portale/assets/generalFunction.js"></script>
    <!--<script src="https://cdn.jsdelivr.net/npm/chart.js@4.3.2/dist/chart.umd.js" integrity="sha384-eI7PSr3L1XLISH8JdDII5YN/njoSsxfbrkCTnJrzXt+ENP5MOVBxD+l6sEG4zoLp" crossorigin="anonymous"></script>-->
<?php echo '<script>
            $("#km").keyup(function () {
                var val = $(this).val();
                console.log("KM INSERITI", val);
                console.log("KM ATTUALI",' . $kmold . ');
                if(val > ' . $kmold . '){
                    $("#submit").prop("disabled", false);
                } else {
                    $("#submit").prop("disabled", true);
                }
            });
            </script>';
?>
</body>

</html>