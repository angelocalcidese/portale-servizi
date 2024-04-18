
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
            voce += '<a class="nav-link d-flex align-items-center gap-2 link-menu-left" onclick="changeAddons()" href="../' + link[b].url + '">';
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

function changeAddons() {
    localStorage.removeItem("tab");
};
function readCookie() {
    $.ajax({
        method: "GET",
        url: "../portale/api/getCookie.php",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $("#user-login span").text(data.nome + " " + data.cognome);
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
        }
    });
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
            readCookie();
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
            window.location.href = '../portale/logout.php';
        }
    });
}

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

