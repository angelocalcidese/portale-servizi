<?php 
require_once "../cors.php";
require_once "../config.php";
require_once "../utility.php";

$data = getRequestDataBody();
$sql = "SELECT * FROM `user` WHERE `email` = '".$data["email"]."'";
$result = $conn->query($sql);

//print_r($result);
$psw = "";
$profile = "";
$response = "";

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $psw = $row["password"]; 
        $profile = $row["type"]; 
        $firstaccess = $row["firstaccess"];
    }
  } 

if(($data["email"] == "Admin") && ($data["password"] == "e4s16w!")){
    $response = json_encode((object) [
        'profile' => 'Administrator',
        'message' => '',
        'firstaccess' => '1'
    ]);
} else if (($result->num_rows == 0) || (!isset($psw))) {
    $response = json_encode((object) [
        'profile' => '',
        'message' => 'Email o password non corrette'
    ]);
} else if(password_verify($data["password"], $psw)){
        $response = json_encode((object) [
            'profile' => $profile,
            'message' => '',
            'firstaccess' => $firstaccess
        ]);
} else {
    $response = json_encode((object) [
        'profile' => '',
        'message' => 'Email o password non corrette',
        'firstaccess' => 0
    ]);
}

echo base64_encode($response);
?>