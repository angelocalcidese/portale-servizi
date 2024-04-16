<?php 
require_once "../cors.php";
require_once "../config.php";

$permission = array();
$conta = 0;


if (isset($_COOKIE["easySW"])) {
    $user_params = json_decode(base64_decode($_COOKIE["easySW"]));
    if($user_params->id){
        $conta++;
    }
    if(count($permission) == 0){
       $sql1 = "SELECT * FROM `permission` WHERE `user` = " . $user_params->id;
        $result1 = $conn->query($sql1);
        if ($result1->num_rows > 0) {
            while ($row1 = $result1->fetch_assoc()) {
            $conta++;
            array_push($permission, $row1["function"]);
            }
        }
        //callType();
        //echo json_encode($permission);
        $menu = array();
        $sql = "SELECT * FROM `typemenu`";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $section  = new stdClass();
                $section->voce = $row["voce"];
                $section->link = array();

                //$key = array_search($row["id"], $permission);
                //print_r($key);
                $sql1 = "SELECT * FROM `addon` WHERE `tipologia`= " . $row["id"] . "";
                $result1 = $conn->query($sql1);

                if ($result1->num_rows > 0) {
                    while ($row1 = $result1->fetch_assoc()) {
                        $voice = new stdClass();
                        $voice->dicitura = $row1["voce"];
                        $voice->url = $row1["url"];
                        $voice->icon = $row1["icon"];

                        $key = array_search($row1["id"], $permission);
                        //print_r($key);

                        if (($key == !null) || ($key === 0)) {
                            $conta++;
                            array_push($section->link, $voice);
                        }
                    }
					array_push($menu, $section);
                }


                
            }
            echo json_encode($menu);
			//print_r($menu);
        }
        //print_r(json_encode($menu, JSON_FORCE_OBJECT));
        //print_r(json_encode($menu));

        //header("Location: ../login.php");
        if ($conta > 0) {
            //echo json_encode($menu);
        } else {
            //echo $conta;
        }
    } 
} 


  /*  
function callType(){
	
	$sql = "SELECT * FROM `typemenu`";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $section  = new stdClass(); 
            $section->voce = $row["voce"]; 
            $section->link = array();

            //$key = array_search($row["id"], $permission);
            //print_r($key);
                $sql1 = "SELECT * FROM `addon` WHERE `tipologia`= ".$row["id"]."";
                $result1 = $conn->query($sql1);
            
                if ($result1->num_rows > 0) {
                    while ($row1 = $result1->fetch_assoc()) {
                        $voice = new stdClass();
                        $voice->dicitura = $row1["voce"];
                        $voice->url = $row1["url"];
                        $voice->icon = $row1["icon"];
                    
                        $key = array_search($row1["id"], $permission);
                        //print_r($key);

                        if (($key ==! null) || ($key === 0)) {
                            $conta++;
                            array_push($section->link, $voice);
                        }
                    }
                }
            
                

            array_push($menu, $section);
        }
    }
//print_r(json_encode($menu, JSON_FORCE_OBJECT));
//print_r(json_encode($menu));

//header("Location: ../login.php");
if($conta > 0){
   echo json_encode($menu);
} else {
    echo $conta;
}
	}
    

*/
?>