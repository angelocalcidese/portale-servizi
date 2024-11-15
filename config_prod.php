<?php
// Db Params
$servername = "89.46.111.226";
$username = "Sql1718069";
$password = "Pomezia2023!";
$dbname = "Sql1718069_5";
$dbname2 = "Sql1718069_2";

// email params
$emailAddr = "info@easysw.it";
$emailObj = "Portale EasySw.it";
$emailPsw = "E4sy6w!2023";
$emailTeams = "EasySw";
$emailAddress = "https://www.easysw.it/";

// other Params
$otpActive = false;
$test = false;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$conn2 = new mysqli($servername, $username, $password, $dbname2);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully";
?>