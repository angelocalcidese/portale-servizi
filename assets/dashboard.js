console.log("menu da Dashboard: ", menu);

function createRow() {
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
}
