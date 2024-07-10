<?php
// Db Params
$servername = "127.0.0.1:3306";
$username = "Admin";
$password = "p4ssw0rd";
$dbname = "easysw";

// email params
$emailAddr = "info@easysw.it";
$emailObj = "Portale EasySw.it";
$emailPsw = "E4sy6w!2023";
$emailTeams = "EasySw";
$emailAddress = "http://localhost/";

// other Params
$otpActive = false;
$test = true;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully";
?>