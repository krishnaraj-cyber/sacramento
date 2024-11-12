<?php


require './API/Models/Mentors.php';
use Auth\Authentication;
use Models\ModelsMentors;
use MVC\Controller;


class Controllersmentors extends Controller {

    public function getallMentors(){
        try {
           
            $mentors=new ModelsMentors();
               
                $resdata =$mentors->getall();
                $this->response->sendStatus(200);  //Response Status
                $this->response->setContent($resdata); // Response Data

           
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }
  


    public function saveMentors()
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
                    $folderName = 'Upload/mentorsimg';
                    if (!file_exists($folderName)) {
                        mkdir($folderName, 0777, true);
                    }
                    $destination = $folderName . '/' . time() . $_FILES['Image']['name'];
                    if (move_uploaded_file($uploadedFile, $destination)) {
                    }
                }
            
                $reqdata['Image'] =$destination;
                
                $mentors=new ModelsMentors();
               
                $resdata =$mentors->save($reqdata);
                $this->response->sendStatus(200);  //Response Status
                $this->response->setContent($resdata); // Response Data
            }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    }

    public function deleteMentors(){
        try {
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
                http_response_code(401);
                echo json_encode(array("error" => "Unauthorized"));
            } else {
           
            $reqdata = $this->request->input();
            $mentors=new ModelsMentors();

            $resdata2 =$mentors->lastrecord($reqdata['id']);  
           
            $filename = $resdata2['Image']; 
           

                $file_path = $filename;
                if (file_exists($file_path)) {
                    unlink($file_path);
                } 
            
           
               $resdata =$mentors->Delete($reqdata['id']);
                $this->response->sendStatus(200);  //Response Status
                $this->response->setContent($file_path); // Response Data
            }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }

    }
   
    public function updateMentors(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
           
           
            $reqdata = $_POST;
                
            if (isset($_FILES['Image'])) {
                $uploadedFile = $_FILES['Image']['tmp_name'];
                $folderName = 'Upload/mentorsimg';
                if (!file_exists($folderName)) {
                    mkdir($folderName, 0777, true);
                }
                $destination = $folderName . '/' . time() . $_FILES['Image']['name'];
                if (move_uploaded_file($uploadedFile, $destination)) {
                }
            }
        
            $reqdata['Image'] =$destination;
                
                $resdata = (new ModelsMentors)->Update($reqdata,$reqdata['id']);
                $this->response->sendStatus(200);
                $this->response->setContent($resdata);
           }
        } catch (\Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    
    }
    public function getMentorsbyid(){
        try {
            // Get the JSON data from the request body
            $requestData = json_decode(file_get_contents('php://input'), true);
    
            // Check if the JSON data contains the Cadate
            if(isset($requestData['id'])) {
                $date = $requestData['id'];
    
                // Assuming ModelsCurrentAffairs is your model class
                $currentAffairs = new ModelsMentors();
    
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
