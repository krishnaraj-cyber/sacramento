<?php
require './API/Models/testimonial.php';
use Auth\Authentication;
use Models\ModelsTestimonial;
use MVC\Controller;
class Controllerstestimonial extends Controller {
    public function gettesTimonialbyid(){
        try {
               $id=$this->request->get('id');
               $testimonial=new ModelsTestimonial();
               $resdata =$testimonial->lastrecord($id);
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }public function getallTestimonial(){
        try {
               $id=$this->request->get();
               $testimonial=new ModelsTestimonial();
               $resdata =$testimonial->getall();
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }

    public function saveTestimonial()
    {
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
      
                $postdata = file_get_contents("php://input");
                $reqdata = json_decode($postdata, true);
                                

                 $testimonial=new ModelsTestimonial();
                 $resdata =$testimonial->save($reqdata);
                 $this->response->sendStatus(200);
                 $this->response->setContent($resdata);
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    }
    public function updaTetestimonial(){
        try {
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
            }
            else {
                $postdata = file_get_contents("php://input");
                $reqdata = json_decode($postdata, true);
                $datas=$_POST;
                
                $resdata = (new ModelsTestimonial)->Update($reqdata,$reqdata['id']);
                $this->response->sendStatus(200);
                $this->response->setContent($resdata);
           }
        } catch (\Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    
    }
    public function deleteTestimonial(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
           
                $reqdata = $this->request->input();
                $testimonial=new ModelsTestimonial();
            
        
                $testimonial->Delete($reqdata['id']);
                $this->response->sendStatus(200);
                $this->response->setContent($reqdata['id']);
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }

    }
}
