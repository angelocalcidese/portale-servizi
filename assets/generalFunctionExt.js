var userscompany = [];
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

function usersCallExt() {
    $.ajax({
        url: '../portale/api/getUsersAll.php',
        dataType: 'json', //restituisce un oggetto JSON
        complete: function (user) {
            //console.log("RISPOSTA", user.responseJSON);
            userscompany = user.responseJSON;
        }
    });
}

function searchUserExt(id) {
    var data = "";
    for (var a = 0; a < userscompany.length; a++) {
        if (id == userscompany[a].id) {
            data = userscompany[a].nome + " " + userscompany[a].cognome;
        }
    }
    return data;
}
usersCallExt();

function sendMessageExt(oggetto, messaggio, destinatario, mittente) {
    var dest = searchUserExt(destinatario);
    $.ajax({
        method: "POST",
        url: "api/sendMessage.php",
        data: JSON.stringify({ oggetto: oggetto, messaggio: messaggio, destinatario: destinatario, day: strDate, email: dest.email, mittente: mittente }),
        contentType: "application/json",
        success: function (data) {
            console.log("MESSAGGIO INVIATO");
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
        }
    });
}

function saluto() {
    console.log("CIAO");
}

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
    for (var a = 0; a < regioniTotal.length; a++) {
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
        data: JSON.stringify({ regione: regione }),
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