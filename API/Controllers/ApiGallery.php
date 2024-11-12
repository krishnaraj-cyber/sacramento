<?php


require './API/Models/Gallery.php';
use Auth\Authentication;
use Models\ModelsGallery;
use MVC\Controller;


class ControllersGallery extends Controller {

    public function getallGallery(){
        try {
           
            $gallery=new ModelsGallery();
               
                $resdata =$gallery->getall();
                $this->response->sendStatus(200);  //Response Status
                $this->response->setContent($resdata); // Response Data

           
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }
  


    public function saveGallery()
    {
        try {
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
                http_response_code(401);
                echo json_encode(array("error" => "Unauthorized"));
            } else {
           
           
                $reqdata = $_POST;
                
                if (isset($_FILES['Image'])) {
                    $uploadedFile = $_FILES['Image']['tmp_name'];
                    $folderName = 'Upload/galleryimg';
                    if (!file_exists($folderName)) {
                        mkdir($folderName, 0777, true);
                    }
                    $destination = $folderName . '/' . time() . $_FILES['Image']['name'];
                    if (move_uploaded_file($uploadedFile, $destination)) {
                    }
                }
            
                $reqdata['Image'] =$destination;
                
                $gallery=new ModelsGallery();
               
                $resdata =$gallery->save($reqdata);
                $this->response->sendStatus(200);  //Response Status
                $this->response->setContent($resdata); // Response Data
            }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    }

    public function deleteGallery(){
        try {
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
                http_response_code(401);
                echo json_encode(array("error" => "Unauthorized"));
            } else {
           
            $reqdata = $this->request->input();
            $gallery=new ModelsGallery();

            $resdata2 =$gallery->lastrecord($reqdata['id']);  
           
            $filename = $resdata2['Image']; 
           

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
   
    public function updateGallery(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
           
           
            $reqdata = $_POST;
                
            if (isset($_FILES['Image'])) {
                $uploadedFile = $_FILES['Image']['tmp_name'];
                $folderName = 'Upload/galleryimg';
                if (!file_exists($folderName)) {
                    mkdir($folderName, 0777, true);
                }
                $destination = $folderName . '/' . time() . $_FILES['Image']['name'];
                if (move_uploaded_file($uploadedFile, $destination)) {
                }
            }
        
            $reqdata['Image'] =$destination;
                
                $resdata = (new ModelsGallery)->Update($reqdata,$reqdata['id']);
                $this->response->sendStatus(200);
                $this->response->setContent($resdata);
           }
        } catch (\Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    
    }
    public function getGallerybyid(){
        try {
            // Get the JSON data from the request body
            $requestData = json_decode(file_get_contents('php://input'), true);
    
            // Check if the JSON data contains the Cadate
            if(isset($requestData['id'])) {
                $date = $requestData['id'];
    
                // Assuming ModelsCurrentAffairs is your model class
                $currentAffairs = new ModelsGallery();
    
                // Fetch data by date
                $resData = $currentAffairs->lastrecord($date);
    
                // Set HTTP response status
                http_response_code(200);
    
                // Send the response data as JSON
                echo json_encode($resData);
            } else {
                // Cadate is not provided in the request data
                http_response_code(400);
                echo json_encode(array("message" => "id is required"));
            }
        } catch (Exception $e) {
            // Handle any exceptions
            http_response_code(500);
            echo json_encode(array("error" => "An error occurred: " . $e->getMessage()));
        } 
        
    }
}
