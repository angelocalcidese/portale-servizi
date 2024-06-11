<!doctype html>
<html lang="it" data-bs-theme="auto">

<?php include("../portale/head.php"); ?>
<link href="../portale/assets/dashboard.css" rel="stylesheet">

<body>
  <?php include("../portale/header.php"); ?>
  <div class="container-fluid">
   
    <div class="row">
      <?php include("../portale/menu.php"); ?>

      <main class="hide" id="dashboard-clone">
        <div class="card-style row mt-4">
          <a class="col-md-3 card-home button-open" href="#">
          </a>
        </div>
      </main>

      <main class="col" id="dashboard-grid">

      </main>
    </div>

      <!--<script src="https://cdn.jsdelivr.net/npm/chart.js@4.3.2/dist/chart.umd.js" integrity="sha384-eI7PSr3L1XLISH8JdDII5YN/njoSsxfbrkCTnJrzXt+ENP5MOVBxD+l6sEG4zoLp" crossorigin="anonymous"></script>-->
      <?php include("../portale/footer.php"); ?>
</body>

</html>