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

/** ALARM VEICOLI */
function controlAlarm(id) {
    var alarm = 0;
    //console.log("ID: " + id);
    var data = searchData(id);
    /* SCADENZA TAGLIANDO */
    var tagliandokm = data.km / data.tagliando;
    var prossimo = Math.ceil(tagliandokm) * data.tagliando;
    $(".alarm-not").addClass("hide");
    $(".list-not-alarm").addClass("hide");
    $(".list-not-alarm span").text("");

    if ((prossimo - data.km) < 3000) {
        //console.log("ALARM TAGLIANDO: " + data.targa);
        $("#alarm-tagliando").removeClass("hide");
        $(".alarm-tagliando-not").removeClass("hide");
        $(".alarm-tagliando-not span").text(prossimo - data.km);
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
    /* SCADENZA ASSICURAZIONE */
    /* SCADENZA REVISIONE */

    if (alarm > 0) {
        $("#id-car-" + id).css("color", "#FF0000");
        //console.log("ALARM: " + alarm + "ID: " + id);
    }
}