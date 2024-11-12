<?php
require './API/Models/sponsor.php';
use Auth\Authentication;
use Models\ModelsSponsor;
use MVC\Controller;
class ControllersSponsor extends Controller {
    public function getSponsorbyid(){
        try {
               $id=$this->request->get('id');
               $blog=new ModelsSponsor();
               $resdata =$blog->lastrecord($id);
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }public function getallsponsor(){
        try {
               $id=$this->request->get();
               $blog=new ModelsSponsor();
               $resdata =$blog->getall();
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }

    // public function savesponsor()
    // {
    //     try {
    //        $verify = Authentication::verifyJWT();
    //        if ($verify == "Unauthorized") {
    //            http_response_code(401);
    //            echo json_encode(array("error" => "Unauthorized"));
    //        } else {
      
    //             $postdata = file_get_contents("php://input");
    //             $reqdata = json_decode($postdata, true);
                                

    //              $blog=new ModelsSponsor();
    //              $resdata =$blog->save($reqdata);
    //              $this->response->sendStatus(200);
    //              $this->response->setContent($resdata);
    //        }
            
    //     } catch (Exception $e) {
    //         echo 'Error Message: ' . $e->getMessage();
    //     }
    // }

    public function savesponsor() {
        try {
            if (Authentication::verifyJWT() === "Unauthorized") {
                http_response_code(401);
                echo json_encode(["error" => "Unauthorized"]);
                return;
            }
    
            $reqdata = $_SERVER['CONTENT_TYPE'] === 'application/json' ? json_decode(file_get_contents("php://input"), true) : $_POST;
            if (!$reqdata) {
                echo json_encode(["error" => "Invalid or missing input data"]);
                return;
            }

            if (!empty($_FILES['Image']['tmp_name'])) {
                $folderName = 'Upload/sponsor';
                if (!file_exists($folderName)) mkdir($folderName, 0777, true);
                $destination = "$folderName/" . time() . '_' . $_FILES['Image']['name'];
                move_uploaded_file($_FILES['Image']['tmp_name'], $destination);
                $reqdata['Image'] = $destination;
            } elseif (isset($reqdata['Image'])) {
                $reqdata['Image'] = $reqdata['Image'];
            } else {
                $reqdata['Image'] = '';
            }
    
            $faculties = new ModelsSponsor();
            $resdata = $faculties->save($reqdata);
    
            $this->response->sendStatus(200);
            $this->response->setContent($resdata);
    
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    }
    
    
    
    



    public function updatesponsor()
    {
        try {
              if (Authentication::verifyJWT() === "Unauthorized") {
                http_response_code(401);
                echo json_encode(["error" => "Unauthorized"]);
                return;
            }
    
            $reqdata = $_SERVER['CONTENT_TYPE'] === 'application/json' ? json_decode(file_get_contents("php://input"), true) : $_POST;
            $id = $reqdata['id'] ?? $_GET['id'] ?? null;
            if (!$id) {
                echo json_encode(["error" => "Missing or invalid input data"]);
                return;
            }
    
            if (!empty($_FILES['Image']['tmp_name'])) {
                $folder = 'Upload/sponsor';
                file_exists($folder) ?: mkdir($folder, 0777, true);
                $reqdata['Image'] = "$folder/" . time() . '_' . $_FILES['Image']['name'];
                move_uploaded_file($_FILES['Image']['tmp_name'], $reqdata['Image']);
            } elseif (empty($reqdata['Image'])) {
                $reqdata['Image'] = (new ModelsSponsor)->lastrecord($id)['Image'] ?? '';
            }
    
            $existingData = (new ModelsSponsor)->lastrecord($id);
            $updatedData = array_merge($existingData, array_filter($reqdata, fn($key) => array_key_exists($key, $existingData), ARRAY_FILTER_USE_KEY));
            $resdata = (new ModelsSponsor)->Update($updatedData, $id);
    
            if (isset($this->response)) {
                $this->response->sendStatus(200);
                $this->response->setContent($resdata);
            } else {
                http_response_code(200);
                echo json_encode($resdata);
            }
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage();
        }
    }
    
    



    public function deletesponsor(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
           
                $reqdata = $this->request->input();
                $blog=new ModelsSponsor();
        
                $blog->Delete($_GET['id']);
                $this->response->sendStatus(200);
                $this->response->setContent("Deleted successfully");
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }

    }
}
