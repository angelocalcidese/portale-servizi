<?php
function uploadFile($base64_file, $folder, $name)
{
    $file = $base64_file;
    $pos = strpos($file, ';');
    $type = explode(':', substr($file, 0, $pos))[1];
    $mime = explode('/', $type);

    //$ext = explode(".", $base64_file["imageName"]);

    $pathImage = $folder . $name;
    //print_r($pathImage);
    $file = substr($file, strpos($file, ',') + 1, strlen($file));
    $dataBase64 = base64_decode($file);
    file_put_contents($pathImage, $dataBase64);
    return true;
}
 ?>