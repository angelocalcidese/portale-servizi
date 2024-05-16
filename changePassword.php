<!doctype html>
<html lang="it" data-bs-theme="auto">
<?php include("../portale/head.php"); ?>
<link href="../portale/assets/style.css" rel="stylesheet">
<link href="../portale/assets/login.css" rel="stylesheet">
<?php include("../portale/api/changepass.php");
?>

<body>
    <div class="wrapper fadeInDown">
        <div id="formContent">
            <!-- Tabs Titles -->

            <!-- Icon -->
            <div class="fadeIn first">
                <img src="../portale/assets/img/logo.png" id="icon" alt="User Icon" />
            </div>

            <!-- Login Form -->
            <form action="" method="POST">
                <input type="text" id="email" class="fadeIn second " name="email" value="<?php echo $_GET['email']; ?>" placeholder="E-MAIL" >
                <input type="password" id="password" class="fadeIn third" name="password" placeholder="OLD PASSWORD">
                <input type="password" id="newpassword" class="fadeIn third" name="newpassword" placeholder="NEW PASSWORD">
                <input type="password" id="renewpassword" class="fadeIn third" name="renewpassword" placeholder="REPEAT NEW PASSWORD">
                <input type="submit" class="fadeIn fourth" value="Invia">
            </form>
        </div>
    </div>
    <!-- jQuery library -->
    <script src="../portale/assets/jquery/jquery-3.7.1.min.js"></script>
    <script src="../portale/assets/jquery-ui/jquery-ui.js"></script>
    <script src="../portale/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="../portale/assets/fontawesome/js/all.min.js"></script>
   <!-- <script src="https://cdn.jsdelivr.net/npm/chart.js@4.3.2/dist/chart.umd.js" integrity="sha384-eI7PSr3L1XLISH8JdDII5YN/njoSsxfbrkCTnJrzXt+ENP5MOVBxD+l6sEG4zoLp" crossorigin="anonymous"></script>-->

</body>

</html>