var beni = [];
var multicard = [];
var telepass = [];
var users = [];

function tablePagination(){
    $('table.display').DataTable({
            responsive: true,
            searchable: false,
            orderable: false,
            targets: 0
    });
}

function popVeicles(righe) { 
    beni = righe;
    for (i = 0; i < righe.length; i++) {
        var riga = righe[i];
        var element = "<td>" + riga.id + "</td>";
        element += "<td>" + riga.tipologia + "</td>";
        element += "<td>" + riga.marca + "</td>";
        element += "<td>" + riga.modello + "</td>";
        element += "<td>" + riga.targa + "</td>";
        element += "<td>" + riga.acquisto + "</td>";
        element += "<td>" + riga.assegnatoa + "</td>";
        element += '<td><button type="button" class="btn btn-sm btn-outline-secondary"  onClick="viewVeicle(' + i + ')"><i class="fa-solid fa-desktop"></i></td>';
        element += '<td><button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-square-pen"></i></button></td>';
        element += '<td><button type="button" class="btn btn-sm btn-outline-secondary" onClick="storyVeicle(' + riga.id + ')"><i class="fa-solid fa-screwdriver-wrench"></i></button></td>';
        element += '<td><button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-trash"></i></button></td>';
        $("<tr/>")
            .append(element)
            .appendTo("#tabella-veicoli");
    }
}

function searchVeicle(id) { 
    var targa = "Non Assegnata";
    for (var a = 0; a < beni.length; a++) {
        if (id === beni[a].id) {
            targa = beni[a].targa;
        }
    }
    return targa;
}
/*
function popMulticard(righe) {
    multicard = righe;
    for (i = 0; i < righe.length; i++) {
        var riga = righe[i];
        var element = "<td>" + riga.id + "</td>";
        element += "<td>" + riga.tipologia + "</td>";
        element += "<td>" + riga.codice + "</td>";
        element += "<td>" + searchVeicle(riga.veicolo) + "</td>";
        element += '<td><button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-trash"></i></button></td>';
        element += '<td><button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-trash"></i></button></td>';
        element += '<td><button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-trash"></i></button></td>';
        $("<tr/>")
            .append(element)
            .appendTo("#tabella-multicard");
    }
}

function popTelepass(righe) {
    telepass = righe;
    for (i = 0; i < righe.length; i++) {
        var riga = righe[i];
        var element = "<td>" + riga.id + "</td>";
        element += "<td>" + riga.codice + "</td>";
        element += "<td>" + searchVeicle(riga.veicolo) + "</td>";
        element += '<td><button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-trash"></i></button></td>';
        element += '<td><button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-trash"></i></button></td>';
        element += '<td><button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-trash"></i></button></td>';
        $("<tr/>")
            .append(element)
            .appendTo("#tabella-telepass");
    }
}

function allCall() { 
    $.ajax({
        url: 'api/getVeicles.php', 
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (obj, stato) {
            console.log("RISPOSTA", obj.responseJSON);
           
            var righe = obj.responseJSON;
            popVeicles(righe.veicoli);
            popMulticard(righe.multicard);
            popTelepass(righe.telepass);
            tablePagination();
        }
    });
}*/

function cambioTab(tab){
    $(".tabs-veicolo").addClass("hide");
    $("#" + tab + "-page").removeClass("hide");
    $(".nav-link").removeClass("active");
    $("#tab-" + tab).addClass("active");
}

function viewVeicle(id) {
    console.log(beni[id]);
    var veicolo = beni[id];
    $("#view-tipologia").text(veicolo.tipologia);
    $("#view-marca").text(veicolo.marca);
    $("#view-modello").text(veicolo.modello);
    $("#view-targa").text(veicolo.targa);
    $("#view-assegnato").text(veicolo.assegnatoa);
    $("#view-acquisto").text(veicolo.acquisto);
    $('#viewVeicle').modal('show');
}

function usersCall() {
    $.ajax({
        url: 'api/getEmployees.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (user) {
            console.log("RISPOSTA", user.responseJSON);
            users = user.responseJSON;
            for (i = 0; i < users.length; i++) {
                var riga = users[i];
                var element = "<option value='" + riga.id + "'>" + riga.nome + " " + riga.cognome + "</option>";
           
                $("#user-gest")
                    .append(element);
            }
            
        }
    });
}
function storyVeicle(id) { 
    $('#viewGestEl').modal('show');
}



function viewUser(user) { 
    console.log(beni[user]);
    var utente = beni[user - 1];
    
}

function openListGoods() { 
    goodAssingenedRemove();
    var valore = $("#user-gest").val();
    console.log("utente: ", valore);
    $("#monitor-good").removeClass("hide");
}

function gestListEl(id) { 
    for (var a = 0; a < beni.length; a++){
        if (beni[a].id == id) {
            var titolo = beni[a].marca + " - " + beni[a].modello + " - " + beni[a].seriale;
            $("#titolo-bene").text(titolo);
            $('#viewListEl').modal('show');
        }
    }
    
}

function goodAssingenedStep1() { 
    $("#added-goods-to-employee").addClass("hide");
    $("#start-add-good-to-employee").addClass("hide");
    $("#tipologia-add-to-employee").removeClass("hide");
    $("#button-remove-add-goods").removeClass("hide");
}

function goodAssingenedStep2() {
    $("#tipologia-add-to-employee").addClass("hide");
    $("#add-good-to-employee").removeClass("hide");
}

function goodAssingenedRemove() { 
    $("#added-goods-to-employee").removeClass("hide");
    $("#start-add-good-to-employee").removeClass("hide");
    $("#tipologia-add-to-employee").addClass("hide");
    $("#add-good-to-employee").addClass("hide");
    $("#button-remove-add-goods").addClass("hide");
}

$(document).ready(function () {
    usersCall();
    allCall();
});

/*$(window).on('resize', function () {
    tablePagination();
     } );*/

           