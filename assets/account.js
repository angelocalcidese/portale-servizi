var coockieUser = [];
function callUserValue() {
    $.ajax({
        url: 'api/getUser.php',
        dataType: 'json', //restituisce un oggetto JSON
        method: "POST",
        data: JSON.stringify({ utente: coockieUser.id }),
        complete: function (responce) { 
            var resp = responce.responseJSON;
            console.log("USER CALL:", resp);
            for (var a = 0; a < resp.length; a++){
                $("#nome").text(resp[a].nome);
                $("#cognome").text(resp[a].nome);
                $("#cf").text(resp[a].cf);
                $("#email").text(resp[a].email);
                $("#emailpersonale").val(resp[a].emailpersonale);
                $("#telefono").text(resp[a].telefono);
                $("#telefonopersonale").val(resp[a].telefonopersonale);
                $("#indirizzo").text(resp[a].indirizzo);
                $("#annodinascita").text(resp[a].annodinascita);

                if (resp[a].foto != null) {
                    $("#img-no-exist").addClass("hide");
                    $("#img-exist").attr("src", resp[a].foto);
                    $("#img-exist").removeClass("hide");
                }
            }
        }
    });
}
function readUserCookie() {
    $.ajax({
        method: "GET",
        url: "../portale/api/getCookie.php",
        dataType: 'json',
        success: function (data) {
            coockieUser = data;
            console.log("USER COOKIE", coockieUser);
            callUserValue();
        },
        error: function (error) {
            console.log("funzione chiamata quando la chiamata fallisce", error);
        }
    });
}

function cambiaPassword() {
    var oldpassword = $("#oldpassword").val();
    var password = $("#password").val();
    var password1 = $("#password1").val();
    var error = 0;
    $(".form-control").removeClass("is-invalid");
    if (oldpassword == "") { $("#oldpassword").addClass("is-invalid"); error++;}
    if (password == "") { $("#password").addClass("is-invalid"); error++;}
    if (password1 == "") { $("#password1").addClass("is-invalid"); error++;}

    if (((password != "") && (password1 != "") && (password != password1)) || (oldpassword == password)) {
        $("#password").addClass("is-invalid");
        $("#password1").addClass("is-invalid");
        error++;
    }

//console.log("OK", error);
    if (error == 0) {
        
       $.ajax({
            url: 'api/modPassword.php',
            dataType: 'json', //restituisce un oggetto JSON
            method: "POST",
           data: JSON.stringify({ id: coockieUser.id, oldpassword: oldpassword, password: password }),
            complete: function (responce) {
                console.log("RESP,", responce);
                var resp = responce.responseText;
                if (resp == "OK") {
                    $("#password").addClass("is-valid");
                    $("#password1").addClass("is-valid");
                    $(".psw-input").val("");
                } else {
                    $("#oldpassword").addClass("is-invalid");
                }
                
            }
        });
    }
}

function changeData() {
    var emailpersonale = $("#emailpersonale").val();
    var telefonopersonale = $("#telefonopersonale").val();
    $(".form-control").removeClass("is-invalid");

    var error = 0;
    if ((emailpersonale != "") && !isValidEmail(emailpersonale)) {
        $("#emailpersonale").addClass("is-invalid");
        error++;
    }
    if (error == 0) {
        $.ajax({
            url: 'api/modUser.php',
            dataType: 'json', //restituisce un oggetto JSON
            method: "POST",
            data: JSON.stringify({ id: coockieUser.id, emailpersonale: emailpersonale, telefonopersonale: telefonopersonale }),
            complete: function (responce) {
                console.log("RESP,", responce);
                $("#emailpersonale").addClass("is-valid");
                $("#telefonopersonale").addClass("is-valid");
            }
        });
    }
}

$(document).ready(function () { 
    readUserCookie();

    
    $('#togglePassword').on('click', function () {
        let passwordField = $('#oldpassword');
        let passwordFieldType = passwordField.attr('type');
        let icon = $(this).find('i'); // Trova l'icona all'interno del pulsante

        if (passwordFieldType === 'password') {
            passwordField.attr('type', 'text');
            icon.removeClass('bi-eye').addClass('bi-eye-slash'); // Cambia icona
        } else {
            passwordField.attr('type', 'password');
            icon.removeClass('bi-eye-slash').addClass('bi-eye');
        }
    });
    $('#togglePassword1').on('click', function () {
        let passwordField = $('#password');
        let passwordFieldType = passwordField.attr('type');
        let icon = $(this).find('i'); // Trova l'icona all'interno del pulsante

        if (passwordFieldType === 'password') {
            passwordField.attr('type', 'text');
            icon.removeClass('bi-eye').addClass('bi-eye-slash'); // Cambia icona
        } else {
            passwordField.attr('type', 'password');
            icon.removeClass('bi-eye-slash').addClass('bi-eye');
        }
    });
    $('#togglePassword2').on('click', function () {
        let passwordField = $('#password1');
        let passwordFieldType = passwordField.attr('type');
        let icon = $(this).find('i'); // Trova l'icona all'interno del pulsante

        if (passwordFieldType === 'password') {
            passwordField.attr('type', 'text');
            icon.removeClass('bi-eye').addClass('bi-eye-slash'); // Cambia icona
        } else {
            passwordField.attr('type', 'password');
            icon.removeClass('bi-eye-slash').addClass('bi-eye');
        }
    });
    

});