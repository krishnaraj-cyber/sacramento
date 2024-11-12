<?php
 namespace Imageupload;
 class Imageupload {
   public static function uploadimage($uploadedfile,$files,$folderpath)
   {
    $folderName = $folderpath;
    if (!file_exists($folderName)) {
        mkdir($folderName, 0777, true);
    }
    $uploadedFiles = $uploadedfile;  
    if (is_array($uploadedFiles['name'])) {
    $reqdata[$files] = array();
    $uploadedFileCount = count($uploadedFiles['name']);
    for ($i = 0; $i < $uploadedFileCount; $i++) {
        $uploadedFile = $uploadedFiles['tmp_name'][$i];
        $destination = $folderName . '/' . time() . $uploadedFiles['name'][$i];
        if (move_uploaded_file($uploadedFile, $destination)) {

        }
        $reqdata[$files][] = $destination;
    }
   }
    return implode(",",$reqdata[$files]);
   }
 }
?>