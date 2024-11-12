<?php
require './API/Models/CurrentAffairs.php';
use Auth\Authentication;
use Models\ModelsCurrentAffairs;
use MVC\Controller;
class ControllersCurrentAffairs extends Controller {
    public function getcurrentaffairsbyid(){
        try {
               $id=$this->request->get('id');
               $currentaffairs=new ModelsCurrentAffairs();
               $resdata =$currentaffairs->lastrecord($id);
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }
    public function getCurrentAffairsByDate() {
        try {
            // Get the JSON data from the request body
            $requestData = json_decode(file_get_contents('php://input'), true);
    
            // Check if the JSON data contains the Cadate
            if(isset($requestData['Cadate'])) {
                $date = $requestData['Cadate'];
    
                // Assuming ModelsCurrentAffairs is your model class
                $currentAffairs = new ModelsCurrentAffairs();
    
                // Fetch data by date
                $resData = $currentAffairs->getByDate($date);
    
                // Set HTTP response status
                http_response_code(200);
    
                // Send the response data as JSON
                echo json_encode($resData);
            } else {
                // Cadate is not provided in the request data
                http_response_code(400);
                echo json_encode(array("message" => "Cadate is required"));
            }
        } catch (Exception $e) {
            // Handle any exceptions
            http_response_code(500);
            echo json_encode(array("error" => "An error occurred: " . $e->getMessage()));
        } 
    }
    public function getcurrentaffairsbyyear() {
        try {
            // Get the JSON data from the request body
            $requestData = json_decode(file_get_contents('php://input'), true);
    
            // Check if the JSON data contains the Cadate
            if(isset($requestData['Year'])) {
                $date = $requestData['Year'];
    
                // Assuming ModelsCurrentAffairs is your model class
                $currentAffairs = new ModelsCurrentAffairs();
    
                // Fetch data by date
                $resData = $currentAffairs->getbyyear($date);
    
                // Set HTTP response status
                http_response_code(200);
    
                // Send the response data as JSON
                echo json_encode($resData);
            } else {
                // Cadate is not provided in the request data
                http_response_code(400);
                echo json_encode(array("message" => "Cadate is required"));
            }
        } catch (Exception $e) {
            // Handle any exceptions
            http_response_code(500);
            echo json_encode(array("error" => "An error occurred: " . $e->getMessage()));
        } 
    }
    
    
    

    // public function getallcurrentaffairs(){
    //     try {
    //            $page=$this->request->get('page');
    //            $limit=$this->request->get('limit');
               
    //            $offset = ($page - 1) * $limit;
    //            $currentaffairs=new ModelsCurrentAffairs();
    //            $res =$currentaffairs->getall($limit,$offset);
    //            $total =$currentaffairs->getTotalRecords();
    //            $resdata['datas']=$res;
    //            $resdata['totalRecords']=$total;
    //            $this->response->sendStatus(200);
    //            $this->response->setContent($resdata);
    //         } catch (Exception $e) {
    //         echo 'Error Message: ' . $e->getMessage();
    //     } 
    // }
    public function getallcurrentaffairs(){
        try {
               $id=$this->request->get();
               $currentaffairs=new ModelsCurrentAffairs();
               $resdata =$currentaffairs->getall();
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }

    public function savecurrentaffairs()
    {
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
      
                $postdata = file_get_contents("php://input");
                $reqdata = json_decode($postdata, true);
                                

                 $currentaffairs=new ModelsCurrentAffairs();
                 $resdata =$currentaffairs->save($reqdata);
                 $this->response->sendStatus(200);
                 $this->response->setContent($resdata);
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    }
    public function updatecurrentaffairs(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
        
                $postdata = file_get_contents("php://input");
                $reqdata = json_decode($postdata, true);
                $datas=$_POST;

                
                $resdata = (new ModelsCurrentAffairs)->Update($reqdata,$reqdata['id']);
                $this->response->sendStatus(200);
                $this->response->setContent($resdata);
           }
        } catch (\Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    
    }
    public function deletecurrentaffairs(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
           
                $reqdata = $this->request->input();
                $currentaffairs=new ModelsCurrentAffairs();
            
        
                $currentaffairs->Delete($reqdata['id']);
                $this->response->sendStatus(200);
                $this->response->setContent($reqdata['id']);
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }

    }
}
