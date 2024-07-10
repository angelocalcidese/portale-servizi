var importXLS = [];
var errorCSVText = "";

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
    //console.log("DATA: ", data);
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

        if (data.ultimo_tagliando) {
            prossimo = parseInt(data.ultimo_tagliando) + parseInt(data.tagliando);
            var trakm = prossimo - km;
            $("#prossimo-tagliando span").text(trakm);
           
           
            
        } else {
            var trakm = prossimo - km;
            $("#prossimo-tagliando span").text(trakm);
        }
        console.log("tagliando: ", prossimo - km);
        if (data.km > prossimo) {
            console.log("ERRORE: ", prossimo);
            $("#alarm-tagliando").removeClass("hide");
            $(".alarm-tagliando-not").removeClass("hide");
            var text = " Tagliando scaduto da ";
            $(".alarm-tagliando-not span").text(text + (data.km - prossimo));
            alarm++;
        }

        if (((prossimo - km) < 3000)) { 
            //console.log("ALARM TAGLIANDO: " + data.targa);
            $("#alarm-tagliando").removeClass("hide");
            $(".alarm-tagliando-not").removeClass("hide");
            var text = " Tagliando scadrà tra ";
            $(".alarm-tagliando-not span").text(text + (prossimo - km));
            alarm++;
        }
        /* SCADENZA DISTRIBUZUIONE */
        var kmdistr = data.km;
        if (data.ultima_distribuzione) {
            kmdistr = data.ultima_distribuzione;
        }
        var distribuzione = kmdistr / data.distribuzione;
        var prossimadistr = Math.ceil(distribuzione) * data.distribuzione;
        if ((prossimadistr - kmdistr) < 5000) {
            //console.log("ALARM TAGLIANDO: " + data.targa);
            $("#alarm-distribuzione").removeClass("hide");
            $(".alarm-distribuzione-not").removeClass("hide");
            $(".alarm-distribuzione-not span").text(prossimo - kmdistr);
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
