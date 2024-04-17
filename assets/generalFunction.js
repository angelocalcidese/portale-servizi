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
    $(".alarm-not").addClass("hide");
    $(".list-not-alarm").addClass("hide");
    $(".list-not-alarm span").text("");
    
    if ((data.stato == "Attiva") || (data.stato == "In Vendita")) {
         /* SCADENZA TAGLIANDO */
        var tagliandokm = data.km / data.tagliando;
        var prossimo = Math.ceil(tagliandokm) * data.tagliando;
       

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