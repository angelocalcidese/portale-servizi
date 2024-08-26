<div class="menu-portale sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
    <ul class="nav flex-column mt-3">
        <li class="nav-item">
            <a class="nav-link d-flex align-items-center gap-2 " aria-current="page" onclick="closeMenu()">
                <i class="fa-solid fa-arrow-left"></i>
                Close
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link d-flex align-items-center gap-2 active" aria-current="page" href="../portale/dashboard.php">
                <i class="fa-solid fa-house"></i>
                Homepage
            </a>
        </li>
    </ul>
    <div id="dynamic-menu">

    </div>
</div>

</div>

<script>
    var menu = false;

    $(document).ready(function() {
        //$(".menu-portale").hide().slow();
    });

    $("body").on("click", function() {
        console.log("MENU", menu);
        if (menu) {
            //closeMenu();
        }
    });

    function openMenu() {
        $(".menu-portale").animate({
            left: '0'
        });
        $(".menu-portale").addClass("open");
        menu = true;
    }

    function closeMenu() {
        $(".menu-portale").animate({
            left: '-219px'
        });
        $(".menu-portale").removeClass("open");
        menu = false;
    }
</script>
<script src="../portale/assets/menu-gestionale.js"></script>