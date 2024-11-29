<?php
require './API/Models/Register.php';
use Auth\Authentication;
use Models\ModelsRegister;
use MVC\Controller;
class ControllersRegister extends Controller {
    public function getRegisterbyid(){
        try {
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
                http_response_code(401);
                echo json_encode(array("error" => "Unauthorized"));
            } else {
               $id=$this->request->get('id');
               $notification=new ModelsRegister();
               $resdata =$notification->lastrecord($id);
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            }
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }
    public function getallRegister(){
        try {
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
                http_response_code(401);
                echo json_encode(array("error" => "Unauthorized"));
            } else {
               $id=$this->request->get();
               $notification=new ModelsRegister();
               $resdata =$notification->getall();
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            }
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }

    public function getFilteredRegister() {
        try {
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
                http_response_code(401);
                echo json_encode(array("error" => "Unauthorized"));
            } else {
                $filter = $this->request->get('Poster_Type'); 
                $notification = new ModelsRegister();
                $resdata = $notification->getFiltered($filter); 
                $this->response->sendStatus(200);
                $this->response->setContent($resdata);
            }
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    }
    

 

    public function saveRegister()
    {
        try {      
            $reqdata = $_SERVER['CONTENT_TYPE'] === 'application/json' ? json_decode(file_get_contents("php://input"), true) : $_POST;
            if (!$reqdata) {
                echo json_encode(["error" => "Invalid or missing input data"]);
                return;
            }

              
                $message="Registered Successfully";

                 $notification=new ModelsRegister();
                 $reqdata =$notification->save($reqdata);
                 $resdata = [$reqdata,'message'=>$message];
                 $this->response->sendStatus(200);
                 $this->response->setContent($resdata);
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    }

    public function updateRegister() {
        try {
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
                http_response_code(401);
                echo json_encode(["error" => "Unauthorized"]);
                return;
            }
             $id = $_GET['id'] ?? null;
            if (!$id) {
                throw new Exception("Missing ID parameter.");
            }
            
            $reqdata = $_POST;
            if (empty($reqdata)) {
                throw new Exception("No data provided for update.");
            }
    
            $resdata = (new ModelsRegister)->update($reqdata, $id);
            $this->response->sendStatus(200);
            $this->response->setContent($resdata);
        } catch (Exception $e) {
            http_response_code(400); 
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
    
    public function deleteRegister(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
           
                $reqdata = $this->request->input();
                $notification=new ModelsRegister();
            
        
                $notification->Delete($_GET['id']);
                $this->response->sendStatus(200);
                $this->response->setContent('Deleted successfully');
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }

    }
}
