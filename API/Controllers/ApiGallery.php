<?php


require './API/Models/Gallery.php';
use Auth\Authentication;
use Models\ModelsGallery;
use MVC\Controller;


class ControllersGallery extends Controller {

    public function getallGallery(){
        try {
           
            $gallery=new ModelsGallery();
               
                $resdata =$gallery->getall();
                $this->response->sendStatus(200);  
                $this->response->setContent($resdata);

           
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }
  


    // public function saveGallery()
    // {
    //     try {
    //         $verify = Authentication::verifyJWT();
    //         if ($verify == "Unauthorized") {
    //             http_response_code(401);
    //             echo json_encode(array("error" => "Unauthorized"));
    //         } else {
           
           
    //             $reqdata = $_SERVER['CONTENT_TYPE'] === 'application/json' ? json_decode(file_get_contents("php://input"), true) : $_POST;
    //             if (!$reqdata) {
    //                 echo json_encode(["error" => "Invalid or missing input data"]);
    //                 return;
    //             }
    
    //             if (!empty($_FILES['Image']['tmp_name'])) {
    //                 $folderName = 'Upload/gallery/images';
    //                 if (!file_exists($folderName)) mkdir($folderName, 0777, true);
    //                 $destination = "$folderName/" . time() . '_' . $_FILES['Image']['name'];
    //                 move_uploaded_file($_FILES['Image']['tmp_name'], $destination);
    //                 $reqdata['Image'] = $destination;
    //             } elseif (isset($reqdata['Image'])) {
    //                 $reqdata['Image'] = $reqdata['Image'];
    //             } else {
    //                 $reqdata['Image'] = '';
    //             }

             
                
    //             $gallery=new ModelsGallery();
               
    //             $resdata =$gallery->save($reqdata);
    //             $this->response->sendStatus(200); 
    //             $this->response->setContent($resdata);
    //         }
            
    //     } catch (Exception $e) {
    //         echo 'Error Message: ' . $e->getMessage();
    //     }
    // }

    public function saveGallery()
    {
        try {
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
                http_response_code(401);
                echo json_encode(array("error" => "Unauthorized"));
            } else {
                $reqdata = $_SERVER['CONTENT_TYPE'] === 'application/json' 
                    ? json_decode(file_get_contents("php://input"), true) 
                    : $_POST;
    
                if (!$reqdata) {
                    echo json_encode(["error" => "Invalid or missing input data"]);
                    return;
                }
    
                // Initialize valid columns
                $validColumns = ['EventName', 'Year', 'Status', 'Image'];
                $reqdata = array_intersect_key($reqdata, array_flip($validColumns));
    
                // Handle uploaded images
                $imagePaths = [];
                if (!empty($_FILES['Image']['tmp_name'][0])) { 
                    $folderName = 'Upload/gallery/images';
                    if (!file_exists($folderName)) mkdir($folderName, 0777, true);
    
                    foreach ($_FILES['Image']['tmp_name'] as $key => $tmpName) {
                        $destination = "$folderName/" . time() . '_' . $_FILES['Image']['name'][$key];
                        move_uploaded_file($tmpName, $destination);
                        $imagePaths[] = $destination;
                    }
    
                    $reqdata['Image'] = implode(',', $imagePaths); // Save as a comma-separated string
                } elseif (!empty($_FILES['Image']['tmp_name'])) { // Handle single file case
                    $folderName = 'Upload/gallery/images';
                    if (!file_exists($folderName)) mkdir($folderName, 0777, true);
    
                    $destination = "$folderName/" . time() . '_' . $_FILES['Image']['name'];
                    move_uploaded_file($_FILES['Image']['tmp_name'], $destination);
                    $imagePaths[] = $destination;
    
                    $reqdata['Image'] = implode(',', $imagePaths); // Save as a comma-separated string
                } else {
                    $reqdata['Image'] = '';
                }
    
                // Save to database
                $gallery = new ModelsGallery();
                $resdata = $gallery->save($reqdata);
    
                $this->response->sendStatus(200);
                $this->response->setContent($resdata);
            }
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    }
    
    
   
// public function updateGallery() {
//     try {
//         $verify = Authentication::verifyJWT();
//         if ($verify == "Unauthorized") {
//             http_response_code(401);
//             echo json_encode(["error" => "Unauthorized"]);
//             return;
//         }
//         $reqdata = $_POST;
//         $files = $_FILES;

//         if (empty($reqdata)) {
//             throw new Exception("No data provided for update.");
//         }

//         if (!empty($_FILES['Image']['tmp_name'])) {
//                     $folderName = 'Upload/gallery/images';
//                     if (!file_exists($folderName)) mkdir($folderName, 0777, true);
//                     $destination = "$folderName/" . time() . '_' . $_FILES['Image']['name'];
//                     move_uploaded_file($_FILES['Image']['tmp_name'], $destination);
//                     $reqdata['Image'] = $destination;
//                 } elseif (isset($reqdata['Image'])) {
//                     $reqdata['Image'] = $reqdata['Image'];
//                 } else {
//                     $reqdata['Image'] = '';
//                 }

//         $id = $_GET['id'] ?? null;
//         if (!$id) {
//             throw new Exception("Missing ID parameter.");
//         }
//         $resdata = (new ModelsGallery)->update($reqdata, $id);
//         $this->response->sendStatus(200);
//         $this->response->setContent($resdata);
//     } catch (Exception $e) {
//         http_response_code(400); 
//         echo json_encode(["error" => $e->getMessage()]);
//     }
// }

public function updateGallery() {
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
            $folderName = 'Upload/gallery/images';
            if (!file_exists($folderName)) {
                mkdir($folderName, 0777, true);
            }

            // Handle multiple files (if applicable)
            if (is_array($_FILES['Image']['tmp_name'])) {
                $filePaths = [];
                foreach ($_FILES['Image']['tmp_name'] as $index => $tmpName) {
                    $fileName = time() . '_' . $_FILES['Image']['name'][$index];
                    $destination = "$folderName/$fileName";
                    if (move_uploaded_file($tmpName, $destination)) {
                        $filePaths[] = $destination;
                    }
                }
                // Assign the file paths to reqdata if multiple files
                $reqdata['Image'] = implode(',', $filePaths); // Storing paths as comma-separated values for multiple files
            } else {
                // Single file upload
                $destination = "$folderName/" . time() . '_' . $_FILES['Image']['name'];
                if (move_uploaded_file($_FILES['Image']['tmp_name'], $destination)) {
                    $reqdata['Image'] = $destination;
                }
            }
        } elseif (isset($reqdata['Image'])) {
            $reqdata['Image'] = $reqdata['Image'];
        } else {
            $reqdata['Image'] = '';
        }

        $id = $_GET['id'] ?? null;
        if (!$id) {
            throw new Exception("Missing ID parameter.");
        }

        $resdata = (new ModelsGallery)->update($reqdata, $id);
        $this->response->sendStatus(200);
        $this->response->setContent($resdata);
    } catch (Exception $e) {
        http_response_code(400); 
        echo json_encode(["error" => $e->getMessage()]);
    }
}


    public function getGallerybyid(){
        try {
            $id = $_GET['id'] ?? $reqdata['id'] ?? null;
    
            if ($id) {
                $galleryModel = new ModelsGallery();
                $resData = $galleryModel->lastrecord($id);
                
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


public function deleteGallery(){
    try {
        $verify = Authentication::verifyJWT();
        if ($verify == "Unauthorized") {
            http_response_code(401);
            echo json_encode(array("error" => "Unauthorized"));
            return;
        }
        $reqdata = $this->request->input();
        $id = $_GET['id'] ??$reqdata['id'] ??  null;
        
        $gallery = new ModelsGallery();
        $resdata = $gallery->lastrecord($id);  
    
        if ($resdata) {
            $imagePath = $resdata['Image'];
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
            $videoPath = $resdata['Video'];
            if ($videoPath && file_exists($videoPath)) {
                unlink($videoPath);
            }
        }
        $result = $gallery->Delete($id);
        $this->response->sendStatus(200); 
        $this->response->setContent('Deleted successfully');
        
    } catch (Exception $e) {
        echo 'Error Message: ' . $e->getMessage();
    }
}



}