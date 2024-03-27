<!doctype html>
<html lang="it" data-bs-theme="auto">

<?php include("../portale/head.php"); ?>

<body>
  <?php include("../portale/header.php"); ?>

  <div class="container-fluid">
    <div class="row">
      

      
        <div class="container px-4 py-5" id="icon-grid">
          <h2 class="pb-2 border-bottom">Dashboard</h2>

          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
            <div class="col d-flex align-items-start">
              <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em">
                <use xlink:href="#bootstrap" />
              </svg>
              <div>
                <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Featured title</h3>
                <p>Paragraph of text beneath the heading to explain the heading.</p>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em">
                <use xlink:href="#cpu-fill" />
              </svg>
              <div>
                <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Featured title</h3>
                <p>Paragraph of text beneath the heading to explain the heading.</p>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em">
                <use xlink:href="#calendar3" />
              </svg>
              <div>
                <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Featured title</h3>
                <p>Paragraph of text beneath the heading to explain the heading.</p>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em">
                <use xlink:href="#home" />
              </svg>
              <div>
                <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Featured title</h3>
                <p>Paragraph of text beneath the heading to explain the heading.</p>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em">
                <use xlink:href="#speedometer2" />
              </svg>
              <div>
                <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Featured title</h3>
                <p>Paragraph of text beneath the heading to explain the heading.</p>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em">
                <use xlink:href="#toggles2" />
              </svg>
              <div>
                <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Featured title</h3>
                <p>Paragraph of text beneath the heading to explain the heading.</p>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em">
                <use xlink:href="#geo-fill" />
              </svg>
              <div>
                <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Featured title</h3>
                <p>Paragraph of text beneath the heading to explain the heading.</p>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em">
                <use xlink:href="#tools" />
              </svg>
              <div>
                <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Featured title</h3>
                <p>Paragraph of text beneath the heading to explain the heading.</p>
              </div>
            </div>
          </div>
        </div>
</div>
  <!-- jQuery library -->
  <script src="assets/jquery/jquery-3.7.1.min.js"></script>
  <script src="assets/jquery-ui/jquery-ui.js"></script>
  <script src="assets/jquery-ui/datepicker-it.js"></script>
  <script src="assets/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/fontawesome/js/all.min.js"></script>
  <script src="assets/DataTables/datatables.min.js"></script>
  <script src="assets/service.js"></script>
  <script>
    $(document).ready(function() {
      $("#inputnascita").datepicker($.datepicker.regional['it']);
      $("#inputeng").datepicker($.datepicker.regional['it']);
    });
  </script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.3.2/dist/chart.umd.js" integrity="sha384-eI7PSr3L1XLISH8JdDII5YN/njoSsxfbrkCTnJrzXt+ENP5MOVBxD+l6sEG4zoLp" crossorigin="anonymous"></script>
  <script src="dashboard.js"></script>
</body>

</html>