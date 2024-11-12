<?php


require './API/Models/Boardmembers.php';
use Auth\Authentication;
use Models\ModelsBoardmembers;
use MVC\Controller;


class Controllersboardmembers extends Controller {

public function getallBoardmembers(){
    try {
        
        $faculties=new ModelsBoardmembers();
        
        $resdata =$faculties->getall();
        $this->response->sendStatus(200); 
        $this->response->setContent($resdata); 

    } catch (Exception $e) {
    echo 'Error Message: ' . $e->getMessage();
        
    } 
}
  


public function saveBoardmembers(){
    try {
        $verify = Authentication::verifyJWT();
        if ($verify == "Unauthorized") {
            http_response_code(401);
            echo json_encode(array("error" => "Unauthorized"));
        } else {
        
        
            $reqdata = $_POST;
            
            if (isset($_FILES['Image'])) {
                $uploadedFile = $_FILES['Image']['tmp_name'];

            $folderName = 'Upload/boardmembersimg';
            if (!file_exists($folderName)) {
                mkdir($folderName, 0777, true);
            }
            $destination = $folderName . '/' . time() . '_' . $_FILES['Image']['name'];
            if (move_uploaded_file($uploadedFile, $destination)) {
                $reqdata['Image'] = $destination;
            } else {
                $reqdata['Image'] = '';  
            }
        } elseif (isset($reqdata['Image'])) {
            $reqdata['Image'] = $reqdata['Image'];
        } else {
            $reqdata['Image'] = '';
        }            
            
            $faculties=new ModelsBoardmembers();
            $resdata =$faculties->save($reqdata);
            $this->response->sendStatus(200);  
            $this->response->setContent($resdata); 
            
        }
        
    } catch (Exception $e) {
        echo 'Error Message: ' . $e->getMessage();
    }
}

public function deleteBoardmembers(){
    try {
        $verify = Authentication::verifyJWT();
        if ($verify == "Unauthorized") {
            http_response_code(401);
            echo json_encode(array("error" => "Unauthorized"));
        } else {
        
        $reqdata = $this->request->input();
        $faculties=new ModelsBoardmembers();

        $resdata2 =$faculties->lastrecord($_GET['id']);  
        
        $filename = $resdata2['Image']; 
        

            $file_path = $filename;
            $message = 'Deleted successfully';
            if (file_exists($file_path)) {
                unlink($file_path);
            } 
            $response = array(
                'file_path' => $file_path,
                'message' => $message
            );        
          
            $resdata =$faculties->Delete($_GET['id']);
            $this->response->sendStatus(200);  
            $this->response->setContent($response); 
        }
        
    } catch (Exception $e) {
        echo 'Error Message: ' . $e->getMessage();
    }

}
 

public function updateBoardmembers() {
    try {
        $verify = Authentication::verifyJWT();
        if ($verify == "Unauthorized") {
            http_response_code(401);
            echo json_encode(array("error" => "Unauthorized"));
            return;
        } else {
            $reqdata = json_decode(file_get_contents("php://input"), true);
            $destination = ''; 
            if (isset($_FILES['Image']) && !empty($_FILES['Image']['tmp_name'])) {
                $uploadedFile = $_FILES['Image']['tmp_name'];
                $folderName = 'Upload/boardmembersimg';
                if (!file_exists($folderName)) {
                    mkdir($folderName, 0777, true);
                }

                $destination = $folderName . '/' . time() . '_' . $_FILES['Image']['name'];

                if (move_uploaded_file($uploadedFile, $destination)) {
                    $reqdata['Image'] = $destination;
                }
            }

            if (!isset($reqdata['id']) || empty($reqdata['id'])) {
                if (!isset($_GET['id']) || empty($_GET['id'])) {
                    throw new Exception("Missing 'id' for update operation.");
                }
                $reqdata['id'] = $_GET['id'];
            }

            if (!isset($reqdata['Image']) || empty($reqdata['Image'])) {
                $existingRecord = (new ModelsBoardmembers)->lastrecord($reqdata['id']); 
                $reqdata['Image'] = isset($existingRecord['Image']) ? $existingRecord['Image'] : '';
            }
            $resdata = (new ModelsBoardmembers)->Update($reqdata, $reqdata['id']);

            $this->response->sendStatus(200);
            $this->response->setContent($resdata);
        }
    } catch (\Exception $e) {
        echo 'Error Message: ' . $e->getMessage();
    }
}



    public function getBoardmembersbyid(){
        try {
            $requestData = json_decode(file_get_contents('php://input'), true);
    
            if(isset($_GET['id'])) {
                $date = $_GET['id']; 
    
                $currentAffairs = new ModelsBoardmembers();
    
                $resData = $currentAffairs->lastrecord($date);
    
                http_response_code(200);
    
                echo json_encode($resData);
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "id is required"));
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("error" => "An error occurred: " . $e->getMessage()));
        } 
        
    }
}