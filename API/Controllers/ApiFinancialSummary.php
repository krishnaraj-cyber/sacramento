<?php
require './API/Models/FinancialSummary.php';
use Auth\Authentication;
use Models\ModelsFinancialSummary;
use MVC\Controller;
class ControllersFinancialSummary extends Controller {
    public function getFinancialSummarybyid(){
        try {
               $id=$this->request->get('id');
               $notification=new ModelsFinancialSummary();
               $resdata =$notification->lastrecord($id);
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }public function getallFinancialSummary(){
        try {
               $id=$this->request->get();
               $notification=new ModelsFinancialSummary();
               $resdata =$notification->getall();
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }

    public function saveFinancialSummary()
    {
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
      
            $reqdata = $_SERVER['CONTENT_TYPE'] === 'application/json' ? json_decode(file_get_contents("php://input"), true) : $_POST;
            if (!$reqdata) {
                echo json_encode(["error" => "Invalid or missing input data"]);
                return;
            }
                 $notification=new ModelsFinancialSummary();
                 $resdata =$notification->save($reqdata);
                 $this->response->sendStatus(200);
                 $this->response->setContent($resdata);
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    }

    public function updateFinancialSummary() {
        try {
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
                http_response_code(401);
                echo json_encode(["error" => "Unauthorized"]);
                return;
            }
            $reqdata = $_POST;

            error_log(print_r($_POST, true));
            error_log(print_r($_FILES, true));
            error_log(print_r($_GET, true));
    
            if (empty($reqdata)) {
                throw new Exception("No data provided for update.");
            }
    
            $id = $_GET['id'] ?? null;
            if (!$id) {
                throw new Exception("Missing ID parameter.");
            }
            $resdata = (new ModelsFinancialSummary)->update($reqdata, $id);
            $this->response->sendStatus(200);
            $this->response->setContent($resdata);
        } catch (Exception $e) {
            http_response_code(400); 
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
    
    public function deleteFinancialSummary(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
           
                $reqdata = $this->request->input();
                $notification=new ModelsFinancialSummary();
            
        
                $notification->Delete($_GET['id']);
                $this->response->sendStatus(200);
                $this->response->setContent('Deleted successfully');
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }

    }
}
