<?php
require './API/Models/Studentsachivenment.php';
use Auth\Authentication;
use Models\ModelsStudentachivement;
use MVC\Controller;
class Controllersstudentachivement extends Controller {
    public function getStudentachivementbyid(){
        try {
               $id=$this->request->get('id');
               $studentachivement=new ModelsStudentachivement();
               $resdata =$studentachivement->lastrecord($id);
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }public function getallStudentachivement(){
        try {
               $id=$this->request->get();
               $studentachivement=new ModelsStudentachivement();
               $resdata =$studentachivement->getall();
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }

    public function saveStudentachivement()
    {
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
      
                $postdata = file_get_contents("php://input");
                $reqdata = json_decode($postdata, true);
                                

                 $studentachivement=new ModelsStudentachivement();
                 $resdata =$studentachivement->save($reqdata);
                 $this->response->sendStatus(200);
                 $this->response->setContent($resdata);
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    }
    public function updateStudentachivement(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
        
                $postdata = file_get_contents("php://input");
                $reqdata = json_decode($postdata, true);
                $datas=$_POST;

                
                $resdata = (new ModelsStudentachivement)->Update($reqdata,$reqdata['id']);
                $this->response->sendStatus(200);
                $this->response->setContent($resdata);
           }
        } catch (\Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    
    }
    public function deleteStudentachivement(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
           
                $reqdata = $this->request->input();
                $studentachivement=new ModelsStudentachivement();
            
        
                $studentachivement->Delete($reqdata['id']);
                $this->response->sendStatus(200);
                $this->response->setContent($reqdata['id']);
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }

    }
}
