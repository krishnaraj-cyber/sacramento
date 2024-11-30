<?php
require './API/Models/Course.php';
use Auth\Authentication;
use Models\ModelsCourse;
use MVC\Controller;

class ControllersCourse extends Controller {
    public function getCoursebyid(){
        try {
               $id=$this->request->get('id');
               $course=new ModelsCourse();
               $resdata =$course->lastrecord($id);
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }
    public function getCourseByCourse() {
        try {
            // Get the JSON data from the request body
            $requestData = json_decode(file_get_contents('php://input'), true);
    
            // Check if the JSON data contains the Cadate
            if(isset($requestData['Course'])) {
                $date = $requestData['Course'];
    
                // Assuming ModelsCourse is your model class
                $course = new ModelsCourse();
    
                // Fetch data by date
                $resData = $course->getbycourse($date);
    
                // Set HTTP response status
                http_response_code(200);
    
                // Send the response data as JSON
                echo json_encode($resData);
            } else {
                // Cadate is not provided in the request data
                http_response_code(400);
                echo json_encode(array("message" => "Course is required"));
            }
        } catch (Exception $e) {
            // Handle any exceptions
            http_response_code(500);
            echo json_encode(array("error" => "An error occurred: " . $e->getMessage()));
        } 
    }
    
    
    
    

    // public function getallcourse(){
    //     try {
    //            $page=$this->request->get('page');
    //            $limit=$this->request->get('limit');
               
    //            $offset = ($page - 1) * $limit;
    //            $course=new ModelsCourse();
    //            $res =$course->getall($limit,$offset);
    //            $total =$course->getTotalRecords();
    //            $resdata['datas']=$res;
    //            $resdata['totalRecords']=$total;
    //            $this->response->sendStatus(200);
    //            $this->response->setContent($resdata);
    //         } catch (Exception $e) {
    //         echo 'Error Message: ' . $e->getMessage();
    //     } 
    // }
    public function getallCourse(){
        try {
               $id=$this->request->get();
               $course=new ModelsCourse();
               $resdata =$course->getall();
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }

    public function saveCourse()
    {
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
      
                $postdata = file_get_contents("php://input");
                $reqdata = json_decode($postdata, true);
                                

                 $course=new ModelsCourse();
                 $resdata =$course->save($reqdata);
                 $this->response->sendStatus(200);
                 $this->response->setContent($resdata);
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    }
    public function updateCourse(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
        
                $postdata = file_get_contents("php://input");
                $reqdata = json_decode($postdata, true);
                $datas=$_POST;

                // if (isset($_FILES['images'])) {
            
                //     if (isset($datas['id'])) {
                //         $gallery = new ModelsCourse();
                //         $resdata2 = $gallery->lastrecord($datas['id']);
                //         $filenames = explode(",", $resdata2['images']);
                //         foreach ($filenames as $filename) {
                //             $file_path = trim($filename);
                //             if (file_exists($file_path)) {
                //                 unlink($file_path);
                //             }
                //         }
                       
                //     }
                //     $imagupload=new Imageupload();
                //     $uploadedFiles=$imagupload->uploadimage($_FILES['images'],'images','Upload/neighborhoodimages');
                //     $reqdata['images'] = $uploadedFiles;
                // }      
                //  if(isset($reqdata)&&isset($datas)){
                //  $mergedData = array_merge($reqdata, $datas);
                //  }
                //  else{
                //  $mergedData = $datas;
                //  }
                //  if(isset($mergedData['description'])){
                //    $mergedData['description']=addslashes($mergedData['description']);
                //  }
                $resdata = (new ModelsCourse)->Update($reqdata,$reqdata['id']);
                $this->response->sendStatus(200);
                $this->response->setContent($resdata);
           }
        } catch (\Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    
    }
    public function deletecourse(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
           
                $reqdata = $this->request->input();
                $course=new ModelsCourse();
            
        
                $course->Delete($reqdata['id']);
                $this->response->sendStatus(200);
                $this->response->setContent($reqdata['id']);
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }

    }
}
