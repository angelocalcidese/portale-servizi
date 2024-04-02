
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
        voce += '<a class="nav-link d-flex align-items-center gap-2" href="../' + link[b].url + '/">';
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