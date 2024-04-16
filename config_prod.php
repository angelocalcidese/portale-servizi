<?php
$servername = "89.46.111.226";
$username = "Sql1718069";
$password = "Pomezia2023!";
$dbname = "Sql1718069_5";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully";
?>