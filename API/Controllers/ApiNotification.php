<?php
require './API/Models/Notification.php';
use Auth\Authentication;
use Models\ModelsNotification;
use MVC\Controller;
class Controllersnotification extends Controller {
    public function getNotificationbyid(){
        try {
               $id=$this->request->get('id');
               $notification=new ModelsNotification();
               $resdata =$notification->lastrecord($id);
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }public function getallNotification(){
        try {
               $id=$this->request->get();
               $notification=new ModelsNotification();
               $resdata =$notification->getall();
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }

    public function saveNotification()
    {
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
      
                $postdata = file_get_contents("php://input");
                $reqdata = json_decode($postdata, true);
                                

                 $notification=new ModelsNotification();
                 $resdata =$notification->save($reqdata);
                 $this->response->sendStatus(200);
                 $this->response->setContent($resdata);
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    }
    public function updateNotification(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
        
                $postdata = file_get_contents("php://input");
                $reqdata = json_decode($postdata, true);
                $datas=$_POST;

                
                $resdata = (new ModelsNotification)->Update($reqdata,$reqdata['id']);
                $this->response->sendStatus(200);
                $this->response->setContent($resdata);
           }
        } catch (\Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    
    }
    public function deleteNotification(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
           
                $reqdata = $this->request->input();
                $notification=new ModelsNotification();
            
        
                $notification->Delete($reqdata['id']);
                $this->response->sendStatus(200);
                $this->response->setContent($reqdata['id']);
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }

    }
}
