<?php
require_once "../portale/cors.php";
require_once "../portale/config.php";
require_once "utility.php";

$mounth = array('01' => 'Gennaio','02' => 'Febbraio', '03' => 'Marzo', '04' => 'Aprile', '05' => 'Maggio', '06' => 'Giugno',
    '07' => 'Luglio', '08' => 'Agosto', '09' => 'Settambre', '10' => 'Ottobre', '11' => 'Novembre', '12' => 'Dicembre');

$meseoggi = date("m");

$anno = date("Y");
$targa = base64_decode($_GET["t"]);
$id = $_GET["i"];
$veicolo = $_GET["v"];
$mese = $_GET["mese"];
$spesaextra = null;
//echo $mese. " - " .$meseoggi;
echo "Richiesta per il mese di: <b>".$mounth[$mese]."</b>";
$form = '<form action="" method="POST">
               <input type="text" id="km" class="fadeIn second numberInput" name="km" placeholder="KM ATTUALI DEL VEICOLO">
                <input type="text" id="extra" class="fadeIn second numberInput" name="extra" placeholder="Spese extra del mese">
                <input type="submit" class="fadeIn fourth" id="submit" value="Invia" disabled>
            </form>';


if (!empty($_POST['km'])) {

        $sql = "SELECT * FROM `veicoli` WHERE id =". $veicolo;
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $kmold = $row["km"];
            }
        }
        
        $sql1 = "SELECT * FROM `kmveicolo` WHERE `mese` = ".$mese." AND `anno` = ".$anno." AND `veicolo` = ". $veicolo;

        $result1 = $conn->query($sql1);

    if ($result1->num_rows > 0) {
        while ($row = $result1->fetch_assoc()) {
            $idRow = $row["id"];
            $spesaextra = $row["spesaextra"];
        }
    }

    if(isset($_POST["extra"]) && ($mese == $meseoggi)){
        $spesaextra = $_POST["extra"];
    }

    if($_POST['km'] >= $kmold){
        //echo "MESE NEW ";
        if(isset($idRow)){
            $sql3 = "UPDATE `kmveicolo` SET `kmold` = '" . $kmold . "', `km` = '". $_POST['km']."', `spesaextra` = '". $spesaextra."' WHERE `kmveicolo`.`id` = ". $idRow;
            $result3 = $conn->query($sql3);
        } else {
            $sql4 = "INSERT INTO `kmveicolo` (`id`, `veicolo`, `assegnata`, `km`, `kmold`, `spesacard`, `spesaextra`, `mese`, `anno`) VALUES (NULL, '".$veicolo."', '".$id. "', '" . $_POST['km'] . "', '". $kmold. "', NULL, '" . $spesaextra . "', '".$mese."', '".$anno."');";
            $result4 = $conn->query($sql4);
        }

        $sql5 = "UPDATE `veicoli` SET `km` = '" . $_POST['km'] . "' WHERE `veicoli`.`id` = ". $veicolo;
        $result5 = $conn->query($sql5);

        echo  '<div class="alert alert-success center" style="text-align:center" role="alert">Inserimento avvenuto con successo. Grazie per avere inserito i Km </div>';
    } else if($mese < $meseoggi){

        //echo "MESE OLD ";
        if (isset($idRow)) {
            $sql3 = "UPDATE `kmveicolo` SET  `km` = '" . $_POST['km'] . "', `spesaextra` = '" . $spesaextra . "' WHERE `kmveicolo`.`id` = " . $idRow;
            $result3 = $conn->query($sql3);
        } else {
            $sql4 = "INSERT INTO `kmveicolo` (`id`, `veicolo`, `assegnata`, `km`, `spesacard`, `spesaextra`, `mese`, `anno`) VALUES (NULL, '" . $veicolo . "', '" . $id . "', '" . $_POST['km'] . "', NULL, '" . $spesaextra . "', '" . $mese . "', '" . $anno . "');";
            $result4 = $conn->query($sql4);
        }
        //echo $sql4;
        echo  '<div class="alert alert-success center" style="text-align:center" role="alert">Inserimento avvenuto con successo. Grazie per avere inserito i Km </div>';
    } else {
        echo '<div class="alert alert-danger center" style="text-align:center" role="alert">I km non possono essere inferiori ai km del ultimo inserimento</div>';
        echo $form;
    }
    
} else {
    $sql = "SELECT * FROM `veicoli` WHERE id =" . $veicolo;
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $kmold = $row["km"];
            $sql1 = "SELECT * FROM `kmveicolo` WHERE `veicolo` = ". $veicolo." AND `mese`= ".$mese." AND `anno` = " . $anno;
            $result1 = $conn->query($sql1);
            
            if ($result1->num_rows > 0) {
                echo '<div class="alert alert-warning center" style="text-align:center" role="alert">Per questo mese i km sono già stati inseriti, in caso contattare il proprio responsabile</div>';
            } else {
              echo '<div class="alert alert-warning center" style="text-align:center" role="alert">Inserire i <b>KM ATTUALI</b> segnati dal conta km del veicolo </div>';
              echo $form;  
            }
        }
    }

}

?>