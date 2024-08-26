<script>
    //clearInterval(interval);
    var counter = 60;
    var interval = setInterval(function() {
        counter--;
        // Display 'counter' wherever you want to display it.
        if (counter <= 0) {
            //console.log("Chiama il servizio");
            $.ajax({
                url: '../portale/api/securelogin.php',
                dataType: 'json', //restituisce un oggetto JSON
                complete: function(obj) {
                    if (obj.responseJSON) {
                        //console.log("riavvio");
                        counter = 60;
                        //controlNotifiche();
                    } else {
                        //console.log("esco");
                        clearInterval(interval);
                        window.location.href = '../portale/logout.php';
                    }
                }
            });
            return;
        } else {
            //console.log(counter);
        }
    }, 1000);
</script>