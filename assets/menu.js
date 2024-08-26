
menu = [];
role = [];
var userlog = [];
function togleMenuCollapse(id) {
    $(".collapse").collapse('hide');
    $(".symbol-" + id).toggleClass("hide");
    $("#colla-" + id).collapse('toggle');
}

function searchMenuActive() {
   // console.log(window.location.href);
    var href = window.location.href;
    var splitted = href.split("/");
    //console.log(splitted[3]);
    var voice = splitted[3];
    var menuOk = false;
    if (voice == "portale") {
        menuOk = true;
    }
    if (voice != "portale") {
        $("menu-link.nav-link").removeClass("active");
        $("#link-" + voice).addClass("active");
        // $("h1.h2").text("TEST");
    }   
    
    for (var a = 0; a < menu.length; a++) {
        var voce = menu[a].voce
        var link = menu[a].link;
        var id = menu[a].id;
        for (var b = 0; b < link.length; b++) {
            if (voice == link[b].url) {
                $("h1.h2").text(voce);
                togleMenuCollapse(id);
                console.log("ID", id);
                menuOk = true;
               // $("h2").text(link[b].dicitura);
            }
        }
    }
    if (menuOk == false) {
        window.location.href = '../portale/dashboard.php';
    }
}

function populateMenu(menu) {
  if (menu == 0) {    
    window.location.href = '../portale/logout.php';
    //console.log(menu)
    }
    var up = "up";
    var down = "down";
    for (var a = 0; a < menu.length; a++) {
        var voce = '<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase" onclick="togleMenuCollapse(' + menu[a].id + ')">';
        voce += '<span>' + menu[a].voce + '</span>';
        voce += '<a class="link-secondary" href="#" aria-label="Add a new report">';
        //voce += '<svg class="bi" id="symbol-' + menu[a].id + '" onclick="togleMenuCollapse(' + menu[a].id + ')"><use xlink:href="#plus-circle"/></svg>';
        voce += '<button class="btn btn-light symbol-' + menu[a].id + '" id="symbol-' + menu[a].id + '-down" ><i class="fa-solid fa-circle-chevron-down" style="color:#6A887C"></i></button>';
        voce += '<button class="btn btn-light hide symbol-' + menu[a].id + '" id="symbol-' + menu[a].id + '-up"><i class="fa-solid fa-circle-chevron-up" style="color:#6A887C"></i></button>';
        voce += '</a>';
        voce += '</h6>';
        voce += '<div class="collapse" style="background-color:#f4eede" id="colla-' + menu[a].id + '"><ul class="nav flex-column">';
        var link = menu[a].link;
        
        for (var b = 0; b < link.length; b++) {
            voce += '';
            voce += '<li class="nav-item">';
            voce += '<a class="menu-link nav-link d-flex align-items-center gap-2 link-menu-left" id="link-' + link[b].url + '" onclick="changeAddons()" href="../' + link[b].url + '">';
            voce += '<i class="fa-solid ' + link[b].icon + '"></i>';
            voce += link[b].dicitura;
            voce += '</a>';
            voce += '</li>';
        }
        voce += '</ul></div>';
        if (link.length > 0) {
            $("#dynamic-menu").append(voce);
        }
        //$("#icon-grid").clone().appendTo("#dashboard-icon");
    }  


    searchMenuActive();
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
            userlog = data;
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
            //console.log("funzione chiamata quando la chiamata fallisce", error);
            window.location.href = '../portale/logout.php';
        }
    });
}

function createRow() {
    //console.log("MENU:", menu);
    for (var a = 0; a < menu.length; a++) {
        var link = menu[a].link;
        var row = $("#dashboard-clone").clone();
        var dash = "dashboard-clone-" + a;
        row.attr("id", dash);
        row.removeClass("hide");
        row.find(".card-home").append('<h6>' + menu[a].voce + '</h6>');
        row.find(".card-home").addClass("titleGroup");
        row.attr('onclick', 'togleMenuCollapse(' + menu[a].id + ')');
        if (link.length) {
            $("#dashboard-grid").append(row);
        }


        for (var b = 0; b < link.length; b++) {
            var row2 = $("#dashboard-clone .card-home").clone();
            row2.append('<i class="fa-solid ' + link[b].icon + ' fa-2xl"></i>');
            row2.append('<h6>' + link[b].dicitura + '</h6>');
            row2.attr("href", "/" + link[b].url);
            $("#" + dash + " .card-style").append(row2);
        }
    }
}
function companyService() {
    $.ajax({
        method: "GET",
        url: '../portale/api/getCompanyService.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (resp) {
           // console.log("RISPOSTA COMPANY", resp.responseJSON);
            result = resp.responseJSON;
            // IMMAGINE LOGO
            if (result[0].foto) {
              var src = "../../portale/logo_img/" + result[0].foto;
              $(".logo").attr("src", src);  
            }
            $("#logo-spinner").addClass("hide");
            $(".logo").removeClass("hide");

            // COLORI HEADER
            if (result[0].colori) {
                var colori = jQuery.parseJSON(result[0].colori);

                if (colori.logo) { $(".navbar-brand").css("background-color", colori.logo); }
                if (colori.header) { $(".bg-easy").css("background-color", colori.header); }
                if (colori.textmenu) { $(".menu-link.nav-link").css("color", colori.textmenu); }
            }
            
        }
    });
}

function getRole() {
    $.ajax({
        method: "GET",
        url: '../portale/api/getRole.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (resp) {
            console.log("RISPOSTA ROLE", resp.responseJSON);
            result = resp.responseJSON;
            role = result;
        }
    });
}

function searchRole(id) {
    var resp = id;
    for (var a = 0; a < role.length; a++) {
        if (id == role[a].id) {
            resp = role[a].ruolo;
        }
    }
    return resp;
}
function searchRoleNull(id) {
    var resp = null;
    for (var a = 0; a < role.length; a++) {
        if (id == role[a].id) {
            resp = role[a].ruolo;
        }
    }
    return resp;
}

function fadeTime() {
    $(".main-page").fadeIn("slow");
    clearTimeout(myTimeout);
}

function closeNav() {
    $(".main-page").hide();
    $("#menu-sidebar").toggle("linear", function () {
        if ($(this).is(':hidden')) {
            setTimeout(fadeTime, 100);
            $(".main-page").addClass("w-100");
            $("#butt-menu").addClass("close-menu");
            localStorage['menu'] = true;
        } else {
            $(".main-page").removeClass("w-100");
            $("#butt-menu").removeClass("close-menu");
            localStorage['menu'] = false;
            setTimeout(fadeTime, 200);
        }
    });
}


$(document).ready(function () {
    var menuopen = localStorage['menu'];
    if (menuopen == "true") {
        closeNav();
    }
    callMenu();
    companyService();
    getRole();
});
