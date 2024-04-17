
menu = [];
function populateMenu(menu) {
  if (menu == 0) {    
    window.location.href = '../portale/logout.php';
    //console.log(menu)
    }
    for (var a = 0; a < menu.length; a++) {
        var voce = '<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">';
        voce += '<span>' + menu[a].voce + '</span>';
        voce += '<a class="link-secondary" href="#" aria-label="Add a new report">';
        voce += '<svg class="bi"><use xlink:href="#plus-circle"/></svg>';
        voce += '</a>';
        voce += '</h6>';
        voce += '<ul class="nav flex-column">';
        var link = menu[a].link;
        for (var b = 0; b < link.length; b++) {
            voce += '';
            voce += '<li class="nav-item">';
            voce += '<a class="nav-link d-flex align-items-center gap-2 link-menu-left" href="../' + link[b].url + '">';
            voce += '<i class="fa-solid ' + link[b].icon + '"></i>';
            voce += link[b].dicitura;
            voce += '</a>';
            voce += '</li>';
        }
        voce += '</ul>';
        if (link.length > 0) {
            $("#dynamic-menu").append(voce);
        }
        //$("#icon-grid").clone().appendTo("#dashboard-icon");
    }  
}

function callMenu() {
    $.ajax({
        method: "GET",
        url: "../portale/api/getMenu.php",
        dataType: 'json',
        success: function (data) {
            menu = data;
            populateMenu(data);
            createRow();
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
           
        }
    });
}
/*function createRow() {
    for (var a = 0; a < menu.length; a++) {
        var row = $("#dashboard-icon .icon-structure").clone();
        $(row).removeClass("hide");
        $(row).attr('id', "icon-dash-" + a)
        $(row).find(".title-row").text(menu[a].voce);
        var link = menu[a].link;
        $(row).find(".icon-badge").remove();
        for (var b = 0; b < link.length; b++) {
            var icon = $("#dashboard-icon .icon-badge").clone();
            $(icon).removeClass("hide");
            $(icon).find(".text-body-emphasis").text(link[b].dicitura);
            $(icon).find(".fa-solid").addClass(link[b].icon);
            $(icon).find(".link-out").attr('href', "/" + link[b].url);
            $(row).find(".icon-badge-list").append(icon);
        }
        if (link.length > 0) {
            $("#dashboard-icon-new").append(row);
        }
    }
}*/
function createRow() {
    console.log("MENU:", menu);
    for (var a = 0; a < menu.length; a++) {
        var link = menu[a].link;
        for (var b = 0; b < link.length; b++) {
            var row = $("#dashboard-clone .card-home").clone();
            row.append('<i class="fa-solid ' + link[b].icon + ' fa-2xl"></i>');
            row.append('<h5>' + link[b].dicitura + '</h5>');
            row.attr("href", "/" + link[b].url);
            $("#dashboard-grid .card-style").append(row);
        }
    }
}
callMenu();
$(".link-menu-left").click(function () {
    localStorage.removeItem("tab");
});