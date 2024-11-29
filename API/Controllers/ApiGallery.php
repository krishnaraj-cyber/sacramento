<?php


require './API/Models/Gallery.php';
use Auth\Authentication;
use Models\ModelsGallery;
use MVC\Controller;


class ControllersGallery extends Controller {

    // public function getallGallery(){
    //     try {
           
    //         $gallery=new ModelsGallery();
               
    //             $resdata =$gallery->getall();
    //             $this->response->sendStatus(200);  
    //             $this->response->setContent($resdata);

           
    //         } catch (Exception $e) {
    //         echo 'Error Message: ' . $e->getMessage();
    //     } 
    // }

    public function getallGallery() {
        try {
            $faculties = new ModelsGallery();
            $first = isset($_GET['first']) ? intval($_GET['first']) : 0;
            $rows = isset($_GET['rows']) ? intval($_GET['rows']) : 10;
            $globalfilter = isset($_GET['globalfilter']) ? $_GET['globalfilter'] : '';
            $colfilter = [];
            if (isset($_GET['colfilter'])) {
                foreach ($_GET['colfilter'] as $column => $filterData) {
                    if (is_array($filterData)) {
                        foreach ($filterData as $operator => $values) {
                            if ($operator === '$in' && is_array($values)) {
                                $colfilter[$column] = $values;
                            }
                        }
                    }
                }
            }
    
            $columns = ['EventName','Year', 'Status'];
            $globalFilterQuery = '';
            if (!empty($globalfilter)) {
                $globalFilterConditions = [];
                foreach ($columns as $column) {
                    $escapedFilter = $this->db->escape($globalfilter);
                    $globalFilterConditions[] = "$column LIKE '%$escapedFilter%'";
                }
                $globalFilterQuery = "(" . implode(' OR ', $globalFilterConditions) . ")";
            }
    
            $additionalFilterQuery = '';
            if (!empty($colfilter)) {
                $additionalConditions = [];
                foreach ($colfilter as $key => $value) {
                    if (is_array($value)) {
                        $escapedValues = array_map([$this->db, 'escape'], $value);
                        $additionalConditions[] = "$key IN ('" . implode("','", $escapedValues) . "')";
                    } else {
                        $escapedValue = $this->db->escape($value);
                        $additionalConditions[] = "$key = '$escapedValue'";
                    }
                }
                $additionalFilterQuery = implode(' AND ', $additionalConditions);
            }
    
            $filterQuery = '';
            if ($globalFilterQuery && $additionalFilterQuery) {
                $filterQuery = "WHERE $globalFilterQuery AND $additionalFilterQuery";
            } elseif ($globalFilterQuery) {
                $filterQuery = "WHERE $globalFilterQuery";
            } elseif ($additionalFilterQuery) {
                $filterQuery = "WHERE $additionalFilterQuery";
            }
    
            $totalCountQuery = "SELECT COUNT(*) as total FROM " . DB_PREFIX . "gallery $filterQuery";
            $totalCountResult = $this->db->query($totalCountQuery);
            
            if (!$totalCountResult || !isset($totalCountResult->row['total'])) {
                throw new Exception("Failed to fetch total count.");        
            }
            
            $totalLength = $totalCountResult->row['total'];
            $dataQuery = "SELECT * FROM " . DB_PREFIX . "gallery $filterQuery LIMIT $first, $rows";
            $dataResult = $this->db->query($dataQuery);
            
            $resdata = $dataResult->rows;
            
            $this->response->sendStatus(200);
            $this->response->setContent([
                'resdata' => $resdata,
                'totallength' => $totalLength
            ]);
    
        } catch (Exception $e) {
            $this->response->sendStatus(500);
            $this->response->setContent([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function getFilterGallery() {
        try {
            $field = isset($_POST['field']) ? $_POST['field'] : (isset($_GET['field']) ? $_GET['field'] : '');
            if (empty($field)) {
                $this->response->sendStatus(400);
                $this->response->setContent(['message' => 'Field parameter is required']);
                return;
            }
            $query = "SELECT DISTINCT $field FROM " . DB_PREFIX . "gallery";
            $result = $this->db->query($query);
            if ($result->num_rows > 0) {
                $distinctValues = [];
                foreach ($result->rows as $row) {
                    $distinctValues[] = $row[$field];
                }
                $this->response->sendStatus(200);
                $this->response->setContent([$field => $distinctValues]);
            } else {
                $this->response->sendStatus(200);
                $this->response->setContent([$field => []]);
            }
    
        } catch (Exception $e) {
            $this->response->sendStatus(500);
            $this->response->setContent(['message' => 'An error occurred', 'error' => $e->getMessage()]);
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

        $folderName = 'Upload/gallery/images';
        if (!file_exists($folderName)) {
            mkdir($folderName, 0777, true);
        }
        if (!empty($_FILES['Image']['tmp_name'][0])) {
            $uploadedImages = [];
            foreach ($_FILES['Image']['tmp_name'] as $key => $tmpName) {
                $fileName = time() . '_' . $_FILES['Image']['name'][$key];
                $destination = "$folderName/$fileName";
                if (move_uploaded_file($tmpName, $destination)) {
                    $uploadedImages[] = $destination;
                }
            }
            $reqdata['Image'] = implode(',', $uploadedImages);
        } elseif (isset($_POST['ExistingImages']) && is_array($_POST['ExistingImages'])) {
            $reqdata['Image'] = implode(',', $_POST['ExistingImages']);
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

    public function getGallerybyYear(){
        try {
            $year = $_GET['Year'] ?? $reqdata['Year'] ?? null;
    
            if ($year) {
                $galleryModel = new ModelsGallery();
                $resData = $galleryModel->getByYear($year);
                
                http_response_code(200);
                echo json_encode($resData);
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "year is required"));
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