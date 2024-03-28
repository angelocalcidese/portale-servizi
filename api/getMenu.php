<?php 
require_once "config.php";
    $menu = array();

    $sql = "SELECT * FROM `typemenu`";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $section  = new stdClass(); 
            $section->voce = $row["voce"]; 
            $section->link = array(); 

                $sql1 = "SELECT * FROM `addon` WHERE `tipologia`= ".$row["id"]."";
                $result1 = $conn->query($sql1);
            
                if ($result1->num_rows > 0) {
                    while ($row1 = $result1->fetch_assoc()) {
                        $voice = new stdClass(); 
                        $voice->dicitura = $row1["voce"];
                        $voice->url = $row1["url"];
                        $voice->icon = $row1["icon"];
                        array_push($section->link, $voice);
                    }
                }

            array_push($menu, $section);
        }
    } 
//print_r($menu);
echo json_encode($menu);

?>