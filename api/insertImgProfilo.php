<?php
require_once "../../portale/cors.php";
require_once "../../portale/config.php";
require_once "../../portale/api/fileUpload.php";
require_once "../../portale/api/utility.php";
require_once "../../portale/api/getUserCoockie.php";

$data = getRequestDataBody();
$cartellaMadre = "../../utenzadipendenti/file/".$user_params->company;

if (is_dir($cartellaMadre)) {
    $filecount = count(glob($cartellaMadre . "*"));
    $filecount++;
} else {
    mkdir($cartellaMadre);
    $filecount = 1;
}

$cartellaMadre .= "/".$data["id"];

if (is_dir($cartellaMadre)) {
    $filecount = count(glob($cartellaMadre . "*"));
    $filecount++;
} else {
    mkdir($cartellaMadre);
    $filecount = 1;
}

$cartellaMadre = $cartellaMadre . "/";
$nomeFile = $data["namefile"];

$nomeFile = $nomeFile."." . $data["estensione"];

$type = uploadFile($data["file"], $cartellaMadre, $nomeFile);
$filecaricato =  $cartellaMadre."". $nomeFile;

$sql = "UPDATE `user` SET `foto` = '" . $filecaricato . "' WHERE `user`.`id` = " . $data["id"];

$result = $conn->query($sql);

echo $result;
//echo $sql;
?>