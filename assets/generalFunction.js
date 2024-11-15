var importXLS = [];
var errorCSVText = "";
var userscompany = [];
var message = [];
var addonsList = [];
var d = new Date();
var day = d.getDate();

if (day < 10) {
    day = "0" + day;
}
var year = d.getFullYear();
var mounth = d.getMonth() + 1;
if (mounth < 10) {
    mounth = "0" + mounth;
}
var strDate = day + "/" + mounth + "/" + d.getFullYear();

function usersCall() {
    $.ajax({
        url: '../portale/api/getUsers.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (user) {
            //console.log("RISPOSTA", user.responseJSON);
            userscompany = user.responseJSON;
        }
    });
}

function searchUserComp(id) {
    var data = "";
    for (var a = 0; a < userscompany.length; a++) {
        if (id == userscompany[a].id) {
            data = userscompany[a].nome + " " + userscompany[a].cognome;
        }
    }
    return data;
}
usersCall();

function searchItemInData(id, obj) {
    var data = "";
    for (var a = 0; a < obj.length; a++) {
        if (id == obj[a].id) {
            data = obj[a];
        }
    }
    return data;
}

function callAddonsList() {
    $.ajax({
        url: '../gestioneAddons/api/getVoice.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (data) {
            //console.log("RISPOSTA ADDONS", data.responseJSON);
            addonsList = data.responseJSON;
        }
    });
}

/** 
 * CENTRO NOTIFICHE
*/
function openNotifiche() {
    $("#notificheModal").modal("show");
    deactiveNotifiche();
}

function createNotifiche(addon, icon, message, assegnatoa) {
    $.ajax({
        url: '../portale/api/createNotifiche.php',
        dataType: 'json', //restituisce un oggetto JSON
        method: "POST",
        data: JSON.stringify({ addon: addon, icon:icon, message:message, assegnatoa:assegnatoa }),
        complete: function (result) {
            counterNot = 10;
        }

    });
}
function deactiveNotifiche() {
    $.ajax({
        url: '../portale/api/stopNotifiche.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (result) {
            counterNot = 5;
        }

        });
}

function deleteNotifiche(addon) {
    $.ajax({
        url: '../portale/api/deleteNotifiche.php',
        dataType: 'json', //restituisce un oggetto JSON
        method: "POST",
        data: JSON.stringify({ addon: addon }),
        complete: function (result) {
            counterNot = 2;
        }

    });
}

function deleteNotifica(id) {
    $.ajax({
        url: '../portale/api/deleteNotifica.php',
        dataType: 'json', //restituisce un oggetto JSON
        method: "POST",
        data: JSON.stringify({ id: id }),
        complete: function (result) {
            counterNot = 1;
        }

    });
}

function controlNotifiche() {
    //$("#count-notifiche").text(0);
    $("#body-not").empty();
    $.ajax({
        url: '../portale/api/getNotifiche.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (result) {
            
            if (result.responseJSON) {
                var data = result.responseJSON;
                var countnew = 0;
                //console.log("Notifiche TEST: ", data);
                
                for (var a = 0; a < data.length; a++){
                    //console.log("Notifica " + a, data[a].view);
                    var notifiche = "";
                    if (data[a].view == "0") {
                        countnew++;
                        notifiche += '<td scope="row"><i class="fa-solid fa-bell fa-shake" style="color: #f18e04;"></i></td><td><i class="fa-solid ' + data[a].icon + '"></i></td><td><a onclick="changeAddons()" href="../' + data[a].addon + '">' + data[a].message + '</a></td><td><button type="button" class="btn btn-light btn-sm" onclick="deleteNotifica(' + data[a].id +')"><i class="fa-solid fa-trash fa-sm"></i></button></td>';
                    } else {
                        notifiche += '<td scope="row"><i class="fa-solid fa-bell"></i></td><td><i class="fa-solid ' + data[a].icon + '"></i></td><td><a onclick="changeAddons()" href="../' + data[a].addon + '">' + data[a].message + '</a></td><td><button type="button" class="btn btn-light btn-sm" onclick="deleteNotifica(' + data[a].id +')"><i class="fa-solid fa-trash fa-sm"></i></button></td>';
                    }
                    $("<tr/>").append(notifiche).appendTo("#table-notifiche");
                }
                

                if (countnew > 0) {
                    $("#bell-on").removeClass("hide");
                    $("#bell-off").addClass("hide");
                    //$("#button-bell").attr("title", "Hai " + countnew + "nuove Notifiche");

                    $("#button-bell").tooltip({
                        placement: "right",
                        title: "Hai nuove notifiche da leggere",
                        html: true,
                    });
                    
                } else {
                    $("#bell-on").addClass("hide");
                    $("#bell-off").removeClass("hide");
                    //$("#button-bell").attr("title", "Non ci sono nuove notifiche");
                    $("#button-bell").tooltip({
                        placement: "right",
                        title: "Non ci sono nuove notifiche",
                        html: true,
                    });
                }
                //console.log(countnew);
                $("#count-notifiche").text(countnew);
                //$('[data-toggle="tooltip"]').tooltip();

                if (data.length == 0) {
                    var notifiche = '<td class="text-center" colspan="3">Non ci sono notifiche al momento</td>';
                    $("<tr/>").append(notifiche).appendTo("#table-notifiche");
                }
            } else {
                var notifiche = '<td class="text-center" colspan="3">Non ci sono notifiche al momento</td>';
                $("<tr/>").append(notifiche).appendTo("#table-notifiche");
            }

        }
    });
}
$("document").ready(function () { 
    controlNotifiche();  
    controlMessaggi();
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });
    $(".dropdown-toggle").dropdown();
});


var counterNot = 60;
var interval2 = setInterval(function () {
    counterNot--;
    // Display 'counter' wherever you want to display it.
    if (counterNot == 0) {
        //console.log("Chiama il servizio");
        counterNot = 60;
        controlNotifiche();
        return;
    } 
}, 1000);

/** 
 * FINE CENTRO NOTIFICHE
*/

/**
 * CENTRO MESSAGGI
 */
var idMessage = null;
function openMessage() {
    $("#messaggiModal").modal("show");
    cleanMessage();
    idMessage = null;
}

function cleanMessage() {
    $("#mess-da").text("");
    $("#mess-a").text("");
    $("#mess-oggetto").text("");
    $("#mess-messaggio").text("");
    $("#nascondi-mess").removeClass("hide");
    $("#visualizza-mess").addClass("hide");
    $("#body-mess tr").removeClass("active");
    $("#ok-cancella-mess").addClass("hide");
}

function changeStatusMessage(id) {
    $.ajax({
        url: '../portale/api/changeStatusMessage.php',
        dataType: 'json', //restituisce un oggetto JSON
        method: "POST",
        data: JSON.stringify({ id:id, stato: 1 }),
        complete: function (result) {
            counterMess = 1;
        }

    });
}

function callMessage(id) { 
   // console.log("ID Mess", id);
    cleanMessage();
    for (var a = 0; a < message.length; a++){
        if (id == message[a].id) {
            idMessage = id;
            if (message[a].ext != null) {
                $("#mess-da").text(message[a].ext);
            } else {
                $("#mess-da").text(searchUserComp(message[a].da));
            }
            $("#mess-il").text(message[a].day);
            $("#mess-oggetto").text(message[a].obj);
            $("#mess-messaggio").html(message[a].message);
            $("#nascondi-mess").addClass("hide");
            $("#visualizza-mess").removeClass("hide");
            $("#messaggio-" + id).addClass("active");
            if (message[a].view == 0) changeStatusMessage(id);
        }
    }
   
}
function deleteMessagi() {
    $.ajax({
        url: '../portale/api/changeStatusMessage.php',
        dataType: 'json', //restituisce un oggetto JSON
        method: "POST",
        data: JSON.stringify({ id: idMessage, stato: 2 }),
        complete: function (result) {
            cleanMessage();
            counterMess = 1;
        }

    });
}
var idMessage = null;
function activeDel(id) {
    idMessage = id;
    $("#messaggio-" + id).addClass("active");
    $("#mess-da").text("");
    $("#mess-a").text("");
    $("#mess-oggetto").text("");
    $("#mess-messaggio").text("");
    $("#nascondi-mess").addClass("hide");
    $("#visualizza-mess").addClass("hide");
    $("#ok-cancella-mess").removeClass("hide");
}

function controlMessaggi() {
    //$("#count-notifiche").text(0);
    $("#body-mess").empty();
    //cleanMessage();
    $.ajax({
        url: '../portale/api/getMessaggi.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (result) {

            if (result.responseJSON) {
                var data = result.responseJSON;
                message = data;
                var countnew = 0;

                for (var a = 0; a < data.length; a++) {
                    //console.log("Notifica " + a, data[a].view);
                    var messaggi = "";
                    var mittente = searchUserComp(data[a].da);
                    if (data[a].ext != null) { mittente = data[a].ext; }
                    if (data[a].view == "0") {
                        countnew++;
                        messaggi += '<tr id="messaggio-' + data[a].id + '" >';
                        messaggi += '<td scope="row" onclick="callMessage(' + data[a].id + ')"><i class="fa-solid fa-envelope fa-beat-fade" style="color: #f18e04;"></i></td>';
                        messaggi += '<td onclick="callMessage(' + data[a].id + ')">' + data[a].day + '</td><td onclick="callMessage(' + data[a].id + ')">' + mittente + '</td><td onclick="callMessage(' + data[a].id + ')">' + data[a].obj + '</td>';
                        messaggi += '<td ><button type="button" class="btn btn-outline-secondary btn-sm" onclick="activeDel(' + data[a].id + ')"><i class="fa-solid fa-trash"></i></button></td></tr>';
                       
                    } else {
                        messaggi += '<tr id="messaggio-' + data[a].id + '" >';
                        messaggi += '<td scope="row" onclick="callMessage(' + data[a].id + ')"><i class="fa-solid fa-envelope"></i></td><td onclick="callMessage(' + data[a].id + ')">' + data[a].day + '</td>';
                        messaggi += '<td onclick="callMessage(' + data[a].id + ')">' + mittente + '</td><td onclick="callMessage(' + data[a].id + ')">' + data[a].obj + '</td>';
                        messaggi += '<td ><button type="button" class="btn btn-outline-secondary btn-sm" onclick="activeDel(' + data[a].id + ')"><i class="fa-solid fa-trash"></i></button></td></tr>';
                         }
                    $("#body-mess").append(messaggi);
                    $('[data-bs-toggle="popover"]').popover({ html: true });
                }

                if (countnew > 0) {
                    $("#mess-on").removeClass("hide");
                    $("#mess-off").addClass("hide");
                    //$("#button-bell").attr("title", "Hai " + countnew + "nuove Notifiche");

                    $("#button-message").tooltip({
                        placement: "right",
                        title: "Hai nuovi messaggi da leggere",
                        html: true,
                    });

                } else {
                    $("#mess-on").addClass("hide");
                    $("#mess-off").removeClass("hide");
                    //$("#button-bell").attr("title", "Non ci sono nuove notifiche");
                    $("#button-message").tooltip({
                        placement: "right",
                        title: "Non ci sono messaggi",
                        html: true,
                    });
                }
                //console.log(countnew);
                $("#count-message").text(countnew);
                $('[data-toggle="tooltip"]').tooltip();

                if (data.length == 0) {
                    var messaggi = '<td class="text-center" colspan="4">Non ci sono messaggi da leggere</td>';
                    $("<tr/>").append(messaggi).appendTo("#table-messaggi");
                }
                if (idMessage) {
                    $("#messaggio-" + idMessage).addClass("active");
                }

            } else {
                var messaggi = '<td class="text-center" colspan="4">Non ci sono messaggi da leggere</td>';
                $("<tr/>").append(messaggi).appendTo("#table-messaggi");
            }

        }
    });
}

function sendMessageExt(oggetto, messaggio, destinatario) {
    var dest = searchUserComp(destinatario);
    $.ajax({
        method: "POST",
        url: "api/sendMessage.php",
        data: JSON.stringify({ oggetto: oggetto, messaggio: messaggio, destinatario: destinatario, day: strDate, email: dest.email }),
        contentType: "application/json",
        success: function (data) {
            console.log("MESSAGGIO INVIATO");
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
            }
    });
}

var counterMess = 60;
var interval3 = setInterval(function () {
    counterMess--;
    if (counterMess == 0) {
        counterMess = 60;
        controlMessaggi();
        return;
    }
}, 1000);
/**
 * FINE CENTRO MESSAGGI
 */
var mesiMap = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
var mesiSchema = [{ val: "01", mese: "Gennaio" },
{ val: "02", mese: "Febbraio" },
{ val: "03", mese: "Marzo" },
{ val: "04", mese: "Aprile" },
{ val: "05", mese: "Maggio" },
{ val: "06", mese: "Giugno" },
{ val: "07", mese: "Luglio" },
{ val: "08", mese: "Agosto" },
{ val: "09", mese: "Settembre" },
{ val: "10", mese: "Ottobre" },
{ val: "11", mese: "Novembre" },
{ val: "12", mese: "Dicembre" }
];

const urlObj = new URL(window.location.href);
const urlGlobal = new URL(window.location.href);
function tablePaginationNew() {
    var searchParams = urlObj.hash;

    var searchParams = urlParams.get('search');
    var lengthParams = urlParams.get('length');

    if (!searchParams) {
        searchParams = "";
    }
    if (!lengthParams) {
        lengthParams = 10;
    }
    var table = $('table.display').DataTable({
        responsive: true,
        searchable: false,
        pageLength: lengthParams,
        orderable: false,
        targets: 0
    }).search(searchParams).draw();

    $("#dt-search-0").change(function () {
        var val = $(this).val();
        
        if (val != "") {
           
            urlGlobal.searchParams.set('search', val);
            window.history.replaceState(null, null, urlGlobal);
        } else {
            urlGlobal.searchParams.delete('search');
            window.history.replaceState(null, null, urlGlobal);
        }
    });
    $("#dt-length-0").change(function () {
        var val = $(this).val();
       
        if (val != "") {
            urlGlobal.searchParams.set('length', val);
            window.history.replaceState(null, null, urlGlobal);
        } else {
            urlGlobal.searchParams.delete('length');
            window.history.replaceState(null, null, urlGlobal);
        }
    });
}

function closeModal() {
    window.location.reload(true);
}

function searchData(id) {
    var data = "";
    for (var a = 0; a < rowel.length; a++) {
        if (id == rowel[a].id) {
            data = rowel[a];
        }
    }
    return data;
}
function cleanInput() {
    $(".input-insert").val("");
}

$('.numberInput').keyup(function (e) {
    if (/\D/g.test(this.value)) {
        // Filter non-digits from input value.
        this.value = this.value.replace(/\D/g, '');
    }
});

function yesOrNo(val) {
    var resp = "No";
    if (val == 1) {
        resp = "Si";
    }
    return resp;
}

function controlScadenza(dateStr) {
    var Today = new Date();
    var parts = dateStr.split("/")
    var myDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    var millisBetween = myDate.getTime() - Today.getTime();
    var days = millisBetween / (1000 * 3600 * 24) + 1;

    // Show the final number of days between dates
    //return Math.round(Math.abs(days)); 

    return Math.round(Math.abs(days));
}

/** ALARM VEICOLI */
function controlAlarm(id) {
    var alarm = 0;
    var important = 0;
    //console.log("ID: " + id);
    var data = searchData(id);
    //console.log("DATA Interventi: ", data);
    $(".alarm-not").addClass("hide");
    $(".list-not-alarm").addClass("hide");
    $(".list-not-alarm span").text("");
    
    if (data.stato != "Venduta" && data.km > 0) {
        /* SCADENZA TAGLIANDO */
        var km = data.km;
        if (data.ultimo_tagliando) {
            km = data.ultimo_tagliando;
        }

        var tagliandokm = km / data.tagliando;
        var prossimo = Math.ceil(tagliandokm) * data.tagliando;
        var textAlarm = "";
        //console.log("tagliando: ", data.tagliando);
        //console.log("KM " + data.id + ": ", data.km);
         if (data.ultimo_tagliando) {
            prossimo = parseInt(data.ultimo_tagliando) + parseInt(data.tagliando);
            var trakm = prossimo - km;
            $("#prossimo-tagliando span").text(trakm);
        } else {
            //console.log("KM", km)
            var trakm = prossimo - km;
            $("#prossimo-tagliando span").text(trakm);
        }
        //console.log("tagliando: ", prossimo - km);
        if (data.km >= prossimo) {
            //console.log("ERRORE: ", prossimo);
            $("#alarm-tagliando-important").removeClass("hide");
            $(".alarm-tagliando-not-important").removeClass("hide");
            var text = " Tagliando scaduto da ";
            $(".alarm-tagliando-not-important span").text(text + (data.km - prossimo));
            textAlarm += '<li class="list-group-item-dark">' + text + (data.km - prossimo) + ' km</li>';
            if ((data.km - prossimo) > 0) {
                important++;
            }
            important++;
        } else if (((prossimo - km) < 3000)) { 
            //console.log("ALARM TAGLIANDO: " + data.targa);
            $("#alarm-tagliando").removeClass("hide");
            $(".alarm-tagliando-not").removeClass("hide");
            var text = " Tagliando scadrà tra ";
            $(".alarm-tagliando-not span").text(text + (prossimo - km));
            textAlarm += '<li class="list-group-item-dark">' + text + (prossimo - km) + ' km</li>';
            alarm++;
        }
        /* SCADENZA DISTRIBUZUIONE */
        var kmdistr = data.km;

        if (data.ultima_distribuzione) {
            kmdistr = data.ultima_distribuzione;
        }
        var distribuzione = kmdistr / data.distribuzione;
        var prossimadistr = Math.ceil(distribuzione) * data.distribuzione;

        if (data.ultima_distribuzione) {
            prossimadistr = parseInt(data.ultima_distribuzione) + parseInt(data.distribuzione);
            var trakm = prossimadistr - km;
            $("#prossima-distribuzione span").text(trakm);
        } else {
            var trakm = prossimadistr - km;
            $("#prossima-distribuzione span").text(trakm);
        }

        if (data.km >= prossimadistr) {
            //console.log("ERRORE: ", prossimadistr);
            $("#alarm-distribuzione-important").removeClass("hide");
            $(".alarm-distribuzione-not-important").removeClass("hide");
            var text = " Distribuzione scaduta da ";
            $(".alarm-distribuzione-not-important span").text(text + (data.km - prossimadistr));
            textAlarm += '<li class="list-group-item-dark">' + text + (data.km - prossimadistr) + ' km</li>';
            if ((data.km - prossimadistr) > 0) {
                important++;
            }
            important++;
        } else if (((prossimadistr - km) < 5000)) {
            $("#alarm-distribuzione").removeClass("hide");
            $(".alarm-distribuzione-not").removeClass("hide");
            var text = " Distribuzione scadrà tra ";
            $(".alarm-distribuzione-not span").text(text + (prossimadistr - km));
            textAlarm += '<li class="list-group-item-dark">' + text + (prossimadistr - km) + 'km</li>';
            alarm++;
        }

        /* SCADENZA BOLLO */
        giornobollo = giorniMancanti(data.bollo);
        if (giornobollo <= 0) {
            var giornobollo = giornobollo * -1;
            $("#alarm-bollo-important").removeClass("hide");
            $(".alarm-bollo-not-important").removeClass("hide");
            $(".alarm-bollo-not-important span").text(giornobollo);
            textAlarm += '<li class="list-group-item-dark">Il bollo è scaduto da ' + giornobollo + ' giorni</li>';
            important++;
        } else if (giorniMancanti(data.bollo) < 30){
            $("#alarm-bollo").removeClass("hide");
            $(".alarm-bollo-not").removeClass("hide");
            $(".alarm-bollo-not span").text(giornobollo);
            textAlarm += '<li class="list-group-item-dark">Il bollo scadrà tra ' + giornobollo + ' giorni</li>';
            alarm++;
        }
       
        
        /* SCADENZA ASSICURAZIONE */
        var giorniass = giorniMancanti(data.assicurazione);
        //console.log("ASSIC.", giorniass);
        if (giorniass <= 0) {
            giorniass = giorniass * -1;
            $("#alarm-assicurazione-important").removeClass("hide");
            $(".alarm-assicurazione-not-important").removeClass("hide");
            $(".alarm-assicurazione-not-important span").text(giorniass);
            textAlarm += '<li class="list-group-item-dark">Assicurazione scaduta da ' + giorniass + ' giorni</li>';
            important++;
        } else if (giorniass < 30) {
            $("#alarm-assicurazione").removeClass("hide");
            $(".alarm-assicurazione-not").removeClass("hide");
            $(".alarm-assicurazione-not span").text(giorniass);
            textAlarm += '<li class="list-group-item-dark">Assicurazione scade tra ' + giorniass + ' giorni</li>';
            alarm++;
        }

        
        /* SCADENZA REVISIONE */
        var giornorevisione = giorniMancanti(data.revisione);
        if (giornorevisione <= 0) {
            giornorevisione = giornorevisione * -1;
            $("#alarm-revisione-important").removeClass("hide");
            $(".alarm-revisione-not-important").removeClass("hide");
            $(".alarm-revisione-not-important span").text(giornorevisione);
            textAlarm += '<li class="list-group-item-dark"> Revisione scaduta da ' + giornorevisione + ' giorni</li>';
            important++;
        } else if (giorniMancanti(data.revisione) < 30) {
            $("#alarm-revisione").removeClass("hide");
            $(".alarm-revisione-not").removeClass("hide");
            $(".alarm-revisione-not span").text(giornorevisione);
            textAlarm += '<li class="list-group-item-dark"> Revisione scade tra ' + giornorevisione + ' giorni</li>';
            alarm++;
        }

       
    } else {
        $("#prossimo-tagliando span").text(data.tagliando);
        $("#prossima-distribuzione span").text(data.distribuzione);
    }
    if (important > 0) {
        $("#id-car-" + id).css("color", "#FF0000");
        $("#id-car-" + id).addClass("fa-fade");
        //console.log("ALARM: " + alarm + "ID: " + id);
        statoveicoli[2] = statoveicoli[2] + 1;
        $("#id-car-" + id).tooltip({
            placement: "right",
            title: '<ul class="list-group list-group-flush bg-dark">' + textAlarm + '</ul>',
            html: true,
        });
    } else if (alarm > 0) {
        $("#id-car-" + id).css("color", "#FFD43B");
        //console.log("ALARM: " + alarm + "ID: " + id);
        statoveicoli[1] = statoveicoli[1] + 1;
        $("#id-car-" + id).tooltip({
            placement: "right",
            title: '<ul class="list-group list-group-flush bg-dark">' + textAlarm + '</ul>',
            html: true,
        });
    }
    if ((important == 0) && (alarm == 0)) {
        statoveicoli[0] = statoveicoli[0] + 1;
    }
   /* if (important > 0) {
        $("#id-car-" + id).css("color", "#FF0000");
        $("#id-car-" + id).addClass("fa-fade");
    }*/
    //console.log("STATO VEICOLI ALARM", statoveicoli);
   // dunutsDiagarm();
}

/** FORMAT DATA */

var format = "dd/mm/yyyy";
var match = new RegExp(format
    .replace(/(\w+)\W(\w+)\W(\w+)/, "^\\s*($1)\\W*($2)?\\W*($3)?([0-9]*).*")
    .replace(/m|d|y/g, "\\d"));
var replace = "$1/$2/$3$4"
    .replace(/\//g, format.match(/\W/));

function doFormat(target) {
    target.value = target.value
        .replace(/(^|\W)(?=\d\W)/g, "$10")   // padding
        .replace(match, replace)             // fields
        .replace(/(\W)+/g, "$1");            // remove repeats
}

$(".format-data").keyup(function (e) {
    if (!e.ctrlKey && !e.metaKey && (e.keyCode == 32 || e.keyCode > 46))
        doFormat(e.target)
});
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

function controlFileType(file) {
    var result = true;
    var size = (file.size / 1024 / 1024).toFixed(2);
    
    if ((file.type != "application/pdf") && (file.type != "image/png") && (file.type != "image/jpeg")) {
        result = false;
    } else if (size > 10) {
        //console.log("SIZE: ", size);
        result = false;
    }
    return result;
}

function controlFileTypeAll(file) {
    var result = true;
    var size = (file.size / 1024 / 1024).toFixed(2);
   // console.log("TIPO FILE", file.type);
    if ((file.type != "application/pdf") && (file.type != "application/msword") && (file.type != "application/vnd.openxmlformats-officedocument.wordprocessingml.document") && (file.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") && (file.type != "image/png") && (file.type != "image/jpeg")) {
        result = false;
    } else if (size > 10) {
        //console.log("SIZE: ", size);
        result = false;
    }
    return result;
}

function controlFileTypeDoc(file) {
    var result = true;
    var size = (file.size / 1024 / 1024).toFixed(2);

    if ((file.type != "application/pdf") && (file.type != "application/msword") && (file.type != "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
        result = false;
    } else if (size > 10) {
        //console.log("SIZE: ", size);
        result = false;
    }
    return result;
}
function controlFileTypeImg(file) {
    var result = true;
    var size = (file.size / 1024 / 1024).toFixed(2);

    if ((file.type != "image/png") && (file.type != "image/jpeg")) {
        result = false;
    } else if (size > 10) {
        //console.log("SIZE: ", size);
        result = false;
    }
    return result;
}

function exportXLS(nome, tabella) {
    var table = $("#" + tabella);
    //console.log(table);
    //debugger;
    TableToExcel.convert(table[0], {
        name: nome + `.xlsx`,
        sheet: {
            name: nome
        }
    });
}

function trueOrFalse(value) {
    var resp = '<i class="fa-solid fa-xmark" style="color: #ed1707;"></i>';
    if (value == "1") {
        resp = '<i class="fa-solid fa-check" style="color: #63E6BE;"></i>';
    }

    return resp;
}

function controlNull(value) {
    var res = value;

    if (value == null) {
        res = " - ";
    }
    return res;
}

var ExcelToJSON = function () {
    this.parseExcel = function (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type: 'binary'
            });
            workbook.SheetNames.forEach(function (sheetName) {
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                var productList = JSON.parse(JSON.stringify(XL_row_object));

                var rows = $('#tblItems tbody');
                //console.log("productList: ", productList);
                for (i = 0; i < productList.length; i++) {
                    var columns = Object.values(productList[i])
                    /*rows.append(`
                        <tr>
                            <td>${columns[0]}</td>
                            <td>${columns[1]}</td>
                            <td>${columns[2]}</td>
                            <td>${columns[3]}</td>
                            <td>${columns[4]}</td>
                        </tr>
                    `);*/
                }

            })
        };
        reader.onerror = function (ex) {
            console.log(ex);
        };

        reader.readAsBinaryString(file);
    };
};

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
}

function importCSV() {
    $("#import-csv").val("");
    $('#modalCSV').modal('show');
}

function searchElement(type, voce, element) {
    var resp = "";
    for (var a = 0; a < type.length; a++) {
        if (element == type[a][voce]) {
            resp = type[a].id;
        }
    }
    return resp;
}

function searchValueForId(element, id) {
    var resp = "";
    for (var a = 0; a < element.length; a++) {
        if (element[a].id == id) {
            resp = element[a];
        }
    }
    return resp;
}

function searchUserName(name) {
    var resp = "";
    for (var a = 0; a < users.length; a++) {
        var nomi = users[a].nome + " " + users[a].cognome;
        //console.log("RESP USER SEARCH", nomi);
        if (name == nomi) {
            resp = users[a].id;
        }
    }
    return resp;
}

function yesSendCsv() {
   // console.log("IMPORT", importXLS);
    $(".alert").addClass("hide");
    if (importXLS.length > 0) {
        $("#spinner-modal").removeClass("hide");
        $("#import-csv-input").addClass("hide");
        $("#send-csv-file").prop("disabled", true);
        controlXLS();
    } else {
        $("#alert-error-csv").removeClass("hide");
    }
}

function closeAlarm() {
    //console.log("TIMEOUT");
    $(".alert").addClass("hide");
}

function resizeIframe(altezza) {
    var iframe = $("iframe").attr("src");
    if (iframe) {
         var altezzaW = document.documentElement.clientHeight;
        var headerH = $(".logo").innerHeight();
        var titoloH = $("#title-head").innerHeight();
        var heightIframe = altezzaW - headerH - titoloH;

        $("#iframe-dim").css("height", heightIframe + "px");
        //console.log("ALTEZZA PAGINA: ", heightIframe);
    }
}

$(window).resize(function () {
   var iframe = $("iframe").attr("src");
    if (iframe) {
        var altezzaW = document.documentElement.clientHeight;
        var headerH = $(".logo").innerHeight();
        var titoloH = $("#title-head").innerHeight();
        var heightIframe = altezzaW - headerH - titoloH - 30;

        $("#iframe-dim").css("height", heightIframe + "px");
        //console.log("ALTEZZA PAGINA -- RESIZE --: ", heightIframe);
    }
    
});

resizeIframe();

/**CHIAMO LE REGIONI */
var regioniTotal = [];
function callRegione(select) {
    $.ajax({
        url: '../portale/api/getRegion.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (result) {
            if (result.responseJSON) {
               var regioni = result.responseJSON;
            regioniTotal = result.responseJSON;
            //console.log("REGIONI", regioni);
            for (var a = 0; a < regioni.length; a++) {
                var element = '<option value="' + regioni[a].codice_regione + '">' + regioni[a].denominazione_regione + '</option>';
                $("#" + select).append(element);
            } 
            }
            
        }
    });
}

function searchRegione(id) {
    var res = "-";
    for (var a = 0; a < regioniTotal.length; a++){
        if (id == regioniTotal[a].codice_regione) {
            res = regioniTotal[a].denominazione_regione;
        }
    }
    return res;
}

function callProv(input, select, selected) {
    var regione = $("#" + input).val();
    //$("#" + select).prop("disabled", true);
    $(".input-localization").prop("disabled", true);
    $.ajax({
        method: "POST",
        data: JSON.stringify({regione: regione }),
        url: '../portale/api/getProvince.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (result) {
            var province = result.responseJSON;
            //console.log("PROVINCE", province);
            $(".input-localization").empty();
            var element = '<option value="" selected>Provincia</option>';
            $("#" + select).append(element);
            

            for (var a = 0; a < province.length; a++) {
                var element1 = '<option value="' + province[a].sigla_provincia + '">' + province[a].denominazione_provincia + '</option>';
                $("#" + select).append(element1);
                $("#" + select).prop("disabled", false);
            }
            $("#" + select).val(selected);
        }
    });
}

function callComuni(input, select, selected, prov) {
    var provincia = $("#" + input).val() || prov;
    //console.log("provincia", provincia);
    $("#" + select).prop("disabled", true);
    $.ajax({
        method: "POST",
        data: JSON.stringify({ provincia: provincia }),
        url: '../portale/api/getComuni.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (result) {
            var comuni = result.responseJSON;
            //console.log("COMUNI", comuni);
            $("#" + select).empty();
            var element = '<option value="" selected>Comune</option>';
            $("#" + select).append(element);

            for (var a = 0; a < comuni.length; a++) {
                var element1 = '<option value="' + comuni[a].denominazione_ita + '">' + comuni[a].denominazione_ita + '</option>';
                $("#" + select).append(element1);
                $("#" + select).prop("disabled", false);
            }
            $("#" + select).val(selected);
        }
    });
}
function logoutHeader() {
    window.location.href = '../portale/logout.php';
}
function readCookieGeneral() {
    $.ajax({
        method: "GET",
        url: "../portale/api/getCookie.php",
        dataType: 'json',
        success: function (data) {
            return data;
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
        }
    });
}

function checkDate(inputDate) {
    var parts = inputDate.split('/');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1; 
    var year = parseInt(parts[2], 10);

    var inputParsedDate = new Date(year, month, day);

    var today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (inputParsedDate < today) {
        return true;
    } else {
        return false;
    }
}

function giorniMancanti(dataInput) {
    let parti = dataInput.split('/');
    let giorno = parseInt(parti[0], 10);
    let mese = parseInt(parti[1], 10) - 1; 
    let anno = parseInt(parti[2], 10);
    let dataFutura = new Date(anno, mese, giorno);

    let oggi = new Date();

    let differenzaTempo = dataFutura - oggi;

    let differenzaGiorni = Math.ceil(differenzaTempo / (1000 * 60 * 60 * 24));

   /* if (differenzaGiorni > 0) {
        console.log("Mancano " + differenzaGiorni + " giorni a " + dataInput);
    } else if (differenzaGiorni === 0) {
        console.log("Oggi è il giorno " + dataInput);
    } else {
        console.log("La data " + dataInput + " è già passata.");
    }*/

    return differenzaGiorni;
}

function openCarica() {
    $("#loadingModal").modal('show');
}
//openCarica();
function closeCarica() {
    setTimeout(function () {
        $("#loadingModal").modal('hide');
    }, 1000);
}

function emptyNullValue(val) {
    //console.log("VAL: ", val);
    if (val == null) {
        val = "";
    }
    return val;
}

function isValidEmail(email) {
    // Espressione regolare per validare l'email
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function watchTabellaTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    $(".page-link").on("click", function () {
        //console.log("CAMBIO PAGINA");
        watchTabellaTooltips();
    });
    $('select[name="tabella_length"]').on("change", function () {
       // console.log("Modifico lunghezza tabella");
        watchTabellaTooltips();

    });
    $('#dt-search-0').keyup(function () {
        watchTabellaTooltips();
    });
}

function formatCurrency(numero) {
     let formatoEuro = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format(numero);

    return formatoEuro;
}

