<!doctype html>
<html lang="it" data-bs-theme="auto">

<?php include("../portale/head.php"); ?>
<link href="../portale/assets/dashboard.css" rel="stylesheet">

<body>
  <?php include("../portale/header.php"); ?>
  <div class="container-fluid">
    <div class="row">
      <?php include("../portale/menu.php"); ?>
      <main class="col hide" id="dashboard-clone">
        <div class="card-style row mt-4">
          <a class="col-md-3 card-home" href="">
          </a>
        </div>
      </main>

      <main class="col" id="dashboard-grid">
        <div class="card-style row mt-4"></div>
      </main>

      <!--<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="dashboard-icon-new">
      </main>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 hide" id="dashboard-icon">
        <div class="container  icon-structure hide">
          <h2 class="pb-2 border-bottom title-row"></h2>
          <div class="row g-4 py-5 row-cols-1 row-cols-lg-3 icon-badge-list">

            <div class="col d-flex align-items-start icon-badge hide">
              <div class="icon-square bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                <a href="#" class="btn btn-light">
                  <i class="fa-solid "></i>
                  <p class="text-body-emphasis"></p>
                </a>
              </div>
              <div>


              </div>
            </div>

          </div>
        </div>
      </main>-->

      <!--<script src="https://cdn.jsdelivr.net/npm/chart.js@4.3.2/dist/chart.umd.js" integrity="sha384-eI7PSr3L1XLISH8JdDII5YN/njoSsxfbrkCTnJrzXt+ENP5MOVBxD+l6sEG4zoLp" crossorigin="anonymous"></script>-->
      <?php include("../portale/footer.php"); ?>
</body>

</html>