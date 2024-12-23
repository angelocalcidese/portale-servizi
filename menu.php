<div class="container position-absolute" id="butt-menu">
  <button type="button" class="btn btn-light open-button" onclick="closeNav();">Open <i class="fa-solid fa-chevron-right"></i></button>
  <button type="button" class="btn btn-light close-button" onclick="closeNav();"><i class="fa-solid fa-chevron-left"></i> Close</button>
</div>
<div id="menu-sidebar" class=" sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">

  <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="sidebarMenuLabel">Area Riservata</h5>
      <button type="button" class="btn-close" style="position:absolute;" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">

      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center gap-2 active" aria-current="page" href="../portale/dashboard.php">
            <i class="fa-solid fa-house"></i>
            Homepage
          </a>
        </li>
      </ul>
      <div id="dynamic-menu">

      </div>
      <hr class="my-3">
      <ul class="nav flex-column mb-auto">
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center gap-2" id="user-login" href="../portale/account.php">
            <i class="fa-regular fa-user"></i>
            <span></span>
          </a>
        </li>

      </ul>
    </div>
  </div>
</div>

<!-- jQuery library -->
<script src="../portale/assets/jquery/jquery-3.7.1.min.js"></script>
<script src="../portale/assets/jquery-ui/jquery-ui.js"></script>
<script src="../portale/assets/jquery-ui/datepicker-it.js"></script>
<script src="../portale/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="../portale/assets/fontawesome/js/all.min.js"></script>
<script src="../portale/assets/DataTables/datatables.min.js"></script>
<script>

</script>
<script src="../portale/assets/menu.js"></script>