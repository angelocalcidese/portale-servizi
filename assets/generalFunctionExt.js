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