<?php 
function uploadFile($base64_file, $folder, $name) {
    $file = $base64_file["base64textString"];
    $pos = strpos($file, ';');
    $type = explode(':', substr($file, 0, $pos))[1];
    $mime = explode('/', $type);

    $ext = explode(".", $base64_file["imageName"]);

   $pathImage = $folder.$name.$ext[1];
    //print_r($pathImage);
    $file = substr($file, strpos($file, ',') + 1, strlen($file));
    $dataBase64 = base64_decode($file);
    file_put_contents($pathImage, $dataBase64);
    return $name.$ext[1];
}
 
 ?>