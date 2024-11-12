<?php


require './API/Models/Gallery.php';
use Auth\Authentication;
use Models\ModelsGallery;
use MVC\Controller;


class ControllersGallery extends Controller {

    public function getallimage(){
        try {
           
            $gallery=new ModelsGallery();
               
                $resdata =$gallery->getall();
                $this->response->sendStatus(200);  //Response Status
                $this->response->setContent($resdata); // Response Data

           
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }

    public function saveimage()
    {
        try {
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
                http_response_code(401);
                echo json_encode(array("error" => "Unauthorized"));
            } else {
           
           
                $reqdata = $_POST;
                
                if (isset($_FILES['Tattoopic'])) {
                    $uploadedFile = $_FILES['Tattoopic']['tmp_name'];
                    $folderName = 'Upload/galleryimg';
                    if (!file_exists($folderName)) {
                        mkdir($folderName, 0777, true);
                    }
                    $destination = $folderName . '/' . time() . $_FILES['Tattoopic']['name'];
                    if (move_uploaded_file($uploadedFile, $destination)) {
                    }
                }
            
                $reqdata['Tattoopic'] =$destination;
                $gallery=new ModelsGallery();
               
                $resdata =$gallery->save($reqdata);
                $this->response->sendStatus(200);  //Response Status
                $this->response->setContent($resdata); // Response Data
            }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    }

    public function admindeleteimage(){
        try {
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
                http_response_code(401);
                echo json_encode(array("error" => "Unauthorized"));
            } else {
           
            $reqdata = $this->request->input();
            $gallery=new ModelsGallery();

            $resdata2 =$gallery->lastrecord($reqdata['id']);  
           
            $filename = $resdata2['Tattoopic']; 
           

                $file_path = $filename;
                if (file_exists($file_path)) {
                    unlink($file_path);
                } 
            
           
               $resdata =$gallery->Delete($reqdata['id']);
                $this->response->sendStatus(200);  //Response Status
                $this->response->setContent($file_path); // Response Data
            }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }

    }
}
