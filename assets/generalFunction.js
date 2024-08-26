var importXLS = [];
var errorCSVText = "";
var userscompany = [];
var message = [];
var addonsList = [];

function usersCall() {
    $.ajax({
        url: '../portale/api/getUsers.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (user) {
            console.log("RISPOSTA", user.responseJSON);
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
            counterNot = 10;
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
            counterNot = 5;
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
                        notifiche += '<td scope="row"><i class="fa-solid fa-bell fa-shake" style="color: #f18e04;"></i></td><td><i class="fa-solid ' + data[a].icon + '"></i></td><td><a onclick="changeAddons()" href="../' + data[a].addon +'">'+ data[a].message +'</a></td>';
                    } else {
                        notifiche += '<td scope="row"><i class="fa-solid fa-bell"></i></td><td><i class="fa-solid ' + data[a].icon + '"></i></td><td><a onclick="changeAddons()" href="../' + data[a].addon +'">' + data[a].message +'</a></td>';
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
}

function changeStatusMessage(id) {
    $.ajax({
        url: '../portale/api/changeStatusMessage.php',
        dataType: 'json', //restituisce un oggetto JSON
        method: "POST",
        data: JSON.stringify({ id:id }),
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
            $("#mess-da").text(searchUserComp(message[a].da));
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
                        messaggi += '<tr id="messaggio-' + data[a].id + '" onclick="callMessage(' + data[a].id + ')"><td scope="row" ><i class="fa-solid fa-envelope fa-beat-fade" style="color: #f18e04;"></i></td><td>' + data[a].day + '</td><td>' + mittente + '</td><td>' + data[a].obj + '</td></tr>';
                    } else {
                        messaggi += '<tr id="messaggio-' + data[a].id + '"  onclick="callMessage(' + data[a].id + ')"><td scope="row" ><i class="fa-solid fa-envelope"></i></td><td>' + data[a].day + '</td><td>' + mittente + '</td><td>' + data[a].obj + '</td></tr>';
                    }
                    $("#body-mess").append(messaggi);
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
    //console.log("ID: " + id);
    var data = searchData(id);
    //console.log("DATA Interventi: ", data);
    $(".alarm-not").addClass("hide");
    $(".list-not-alarm").addClass("hide");
    $(".list-not-alarm span").text("");
    
    if (data.stato != "Venduta") {
        /* SCADENZA TAGLIANDO */
        var km = data.km;
        if (data.ultimo_tagliando) {
            km = data.ultimo_tagliando;
        }

        var tagliandokm = km / data.tagliando;
        var prossimo = Math.ceil(tagliandokm) * data.tagliando;
        var textAlarm = "";
        if (data.ultimo_tagliando) {
            prossimo = parseInt(data.ultimo_tagliando) + parseInt(data.tagliando);
            var trakm = prossimo - km;
            $("#prossimo-tagliando span").text(trakm);
        } else {
            var trakm = prossimo - km;
            $("#prossimo-tagliando span").text(trakm);
        }
        //console.log("tagliando: ", prossimo - km);
        if (data.km > prossimo) {
            //console.log("ERRORE: ", prossimo);
            $("#alarm-tagliando").removeClass("hide");
            $(".alarm-tagliando-not").removeClass("hide");
            var text = " Tagliando scaduto da ";
            $(".alarm-tagliando-not span").text(text + (data.km - prossimo));
            textAlarm += '<li class="list-group-item-dark">' + text + (data.km - prossimo) + ' km</li>';
            alarm++;
        }

        if (((prossimo - km) < 3000)) { 
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

        if (data.km > prossimadistr) {
            //console.log("ERRORE: ", prossimadistr);
            $("#alarm-distribuzione").removeClass("hide");
            $(".alarm-distribuzione-not").removeClass("hide");
            var text = " Distribuzione scaduta da ";
            $(".alarm-distribuzione-not span").text(text + (data.km - prossimadistr));
            textAlarm += '<li class="list-group-item-dark">' + text + (data.km - prossimadistr) + ' km</li>';
            alarm++;
        }

        if (((prossimadistr - km) < 5000)) {
            $("#alarm-distribuzione").removeClass("hide");
            $(".alarm-distribuzione-not").removeClass("hide");
            var text = " Distribuzione scadrà tra ";
            $(".alarm-distribuzione-not span").text(text + (prossimadistr - km));
            textAlarm += '<li class="list-group-item-dark">' + text + (prossimadistr - km) + 'km</li>';
            alarm++;
        }

        /* SCADENZA BOLLO */
        if (data.bollo && (controlScadenza(data.bollo) <= 31)) {
            $("#alarm-bollo").removeClass("hide");
            $(".alarm-bollo-not").removeClass("hide");
            $(".alarm-bollo-not span").text(controlScadenza(data.bollo));
            textAlarm += '<li class="list-group-item-dark">Il bollo scadrà tra ' + controlScadenza(data.bollo) + ' giorni</li>';
            alarm++;
        }
        
        /* SCADENZA ASSICURAZIONE */
        if (data.assicurazione && (controlScadenza(data.assicurazione) <= 31)) {
            $("#alarm-assicurazione").removeClass("hide");
            $(".alarm-assicurazione-not").removeClass("hide");
            $(".alarm-assicurazione-not span").text(controlScadenza(data.assicurazione));
            textAlarm += '<li class="list-group-item-dark">Assicurazione scade tra ' + controlScadenza(data.assicurazione) + ' giorni</li>';
            alarm++;
        }
        /* SCADENZA REVISIONE */
        if (data.revisione && (controlScadenza(data.revisione) <= 60)) {
            $("#alarm-revisione").removeClass("hide");
            $(".alarm-revisione-not").removeClass("hide");
            $(".alarm-revisione-not span").text(controlScadenza(data.revisione));
            textAlarm += '<li class="list-group-item-dark"> Revisione scade tra' + controlScadenza(data.revisione) + ' giorni</li>';
            alarm++;
        }
    }
   
    if (alarm > 0) {
        $("#id-car-" + id).css("color", "#FF0000");
        //console.log("ALARM: " + alarm + "ID: " + id);
        $("#id-car-" + id).tooltip({
            placement: "right",
            title: '<ul class="list-group list-group-flush bg-dark">' + textAlarm + '</ul>',
            html: true,
        });
    }
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
        console.log("SIZE: ", size);
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
        console.log("SIZE: ", size);
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
                console.log("productList: ", productList);
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

function searchUserName(name) {
    var resp = "";
    for (var a = 0; a < users.length; a++) {
        var nomi = users[a].nome + " " + users[a].cognome;
        console.log("RESP USER SEARCH", nomi);
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
        console.log("ALTEZZA PAGINA: ", heightIframe);
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
        console.log("ALTEZZA PAGINA -- RESIZE --: ", heightIframe);
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
            console.log("REGIONI", regioni);
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
            console.log("PROVINCE", province);
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
    console.log("provincia", provincia);
    $("#" + select).prop("disabled", true);
    $.ajax({
        method: "POST",
        data: JSON.stringify({ provincia: provincia }),
        url: '../portale/api/getComuni.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (result) {
            var comuni = result.responseJSON;
            console.log("COMUNI", comuni);
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

