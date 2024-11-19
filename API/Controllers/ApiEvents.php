<?php
require './API/Models/Events.php';
use Auth\Authentication;
use Models\ModelsEvents;
use MVC\Controller;
class ControllersEvents extends Controller {
    public function getEventsbyid(){
        try {
               $id=$this->request->get('id');
               $studentachivement=new ModelsEvents();
               $resdata =$studentachivement->lastrecord($id);
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }public function getallEvents(){
        try {
               $id=$this->request->get();
               $studentachivement=new ModelsEvents();
               $resdata =$studentachivement->getall();
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }

    public function saveEvents() {
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
                $folderName = 'Upload/events';
                if (!file_exists($folderName)) mkdir($folderName, 0777, true);
                $destination = "$folderName/" . time() . '_' . $_FILES['Image']['name'];
                move_uploaded_file($_FILES['Image']['tmp_name'], $destination);
                $reqdata['Image'] = $destination;
            } elseif (isset($reqdata['Image'])) {
                $reqdata['Image'] = $reqdata['Image'];
            } else {
                $reqdata['Image'] = '';
            }
    
            $faculties = new ModelsEvents();
            $resdata = $faculties->save($reqdata);
    
            $this->response->sendStatus(200);
            $this->response->setContent($resdata);
    
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    }

    public function updateEvents() {
        try {
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
                http_response_code(401);
                echo json_encode(["error" => "Unauthorized"]);
                return;
            }
            $reqdata = $_POST;
            $files = $_FILES;
    
            if (empty($reqdata)) {
                throw new Exception("No data provided for update.");
            }
    
            if (!empty($_FILES['Image']['tmp_name'])) {
                $folderName = 'Upload/events';
                if (!file_exists($folderName)) mkdir($folderName, 0777, true);
                $destination = "$folderName/" . time() . '_' . $_FILES['Image']['name'];
                move_uploaded_file($_FILES['Image']['tmp_name'], $destination);
                $reqdata['Image'] = $destination;
            } elseif (isset($reqdata['Image'])) {
                $reqdata['Image'] = $reqdata['Image'];
            } else {
                $reqdata['Image'] = '';
            }
    
            $id = $_GET['id'] ?? null;
            if (!$id) {
                throw new Exception("Missing ID parameter.");
            }
            $resdata = (new ModelsEvents)->update($reqdata, $id);
            $this->response->sendStatus(200);
            $this->response->setContent($resdata);
        } catch (Exception $e) {
            http_response_code(400); 
            echo json_encode(["error" => $e->getMessage()]);
        }
    }


    public function deleteEvents(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
           
                $reqdata = $this->request->input();
                $studentachivement=new ModelsEvents();
            
        
                $studentachivement->Delete($_GET['id']);
                $this->response->sendStatus(200);
                $this->response->setContent('Deleted successfully');
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }

    }
}
