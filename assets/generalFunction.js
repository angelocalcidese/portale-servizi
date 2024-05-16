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
    //console.log("DATA: ", data);
    $(".alarm-not").addClass("hide");
    $(".list-not-alarm").addClass("hide");
    $(".list-not-alarm span").text("");
    
    if ((data.stato == "Attiva") || (data.stato == "In Vendita")) {
        /* SCADENZA TAGLIANDO */
        var km = data.km;
        if (data.ultimo_tagliando) {
            km = data.ultimo_tagliando;
        }
        var tagliandokm = km / data.tagliando;
        var prossimo = Math.ceil(tagliandokm) * data.tagliando;

        if (data.ultimo_tagliando) {
            prossimo = parseInt(data.ultimo_tagliando) + parseInt(data.tagliando);
            $("#prossimo-tagliando span").text(prossimo);
        }

        if (((prossimo - km) < 3000)) { 
            //console.log("ALARM TAGLIANDO: " + data.targa);
            $("#alarm-tagliando").removeClass("hide");
            $(".alarm-tagliando-not").removeClass("hide");
            $(".alarm-tagliando-not span").text(prossimo - km);
            alarm++;
        }
        /* SCADENZA DISTRIBUZUIONE */
        var distribuzione = data.km / data.distribuzione;
        var prossimadistr = Math.ceil(distribuzione) * data.distribuzione;
        if ((prossimadistr - data.km) < 5000) {
            //console.log("ALARM TAGLIANDO: " + data.targa);
            $("#alarm-distribuzione").removeClass("hide");
            $(".alarm-distribuzione-not").removeClass("hide");
            $(".alarm-distribuzione-not span").text(prossimo - data.km);
            alarm++;
        }
        /* SCADENZA BOLLO */
        if (data.bollo && (controlScadenza(data.bollo) <= 31)) {
            $("#alarm-bollo").removeClass("hide");
            $(".alarm-bollo-not").removeClass("hide");
            $(".alarm-bollo-not span").text(controlScadenza(data.bollo));
        }
        
        /* SCADENZA ASSICURAZIONE */
        if (data.assicurazione && (controlScadenza(data.assicurazione) <= 31)) {
            $("#alarm-assicurazione").removeClass("hide");
            $(".alarm-assicurazione-not").removeClass("hide");
            $(".alarm-assicurazione-not span").text(controlScadenza(data.assicurazione));
        }
        /* SCADENZA REVISIONE */
        if (data.revisione && (controlScadenza(data.revisione) <= 60)) {
            $("#alarm-revisione").removeClass("hide");
            $(".alarm-revisione-not").removeClass("hide");
            $(".alarm-revisione-not span").text(controlScadenza(data.revisione));
        }
    }
   
    if (alarm > 0) {
        $("#id-car-" + id).css("color", "#FF0000");
        //console.log("ALARM: " + alarm + "ID: " + id);
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