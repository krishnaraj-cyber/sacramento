<?php


require './API/Models/Boardmembers.php';
use Auth\Authentication;
use Models\ModelsBoardmembers;
use MVC\Controller;


class Controllersboardmembers extends Controller {

// public function getallBoardmembers(){
//     try {
        
//         $faculties=new ModelsBoardmembers();
        
//         $resdata =$faculties->getall();
//         $this->response->sendStatus(200); 
//         $this->response->setContent($resdata); 

//     } catch (Exception $e) {
//     echo 'Error Message: ' . $e->getMessage();
        
//     } 
// }

public function getallBoardmembers() {
    try {
        $verify = Authentication::verifyJWT();
        if ($verify == "Unauthorized") {
            http_response_code(401);
            echo json_encode(array("error" => "Unauthorized"));
        } else {
        $faculties = new ModelsBoardmembers();
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

        $columns = ['Name', 'Designation','Year','Status'];
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

        $totalCountQuery = "SELECT COUNT(*) as total FROM " . DB_PREFIX . "boardmembers $filterQuery";
        $totalCountResult = $this->db->query($totalCountQuery);
        
        if (!$totalCountResult || !isset($totalCountResult->row['total'])) {
            throw new Exception("Failed to fetch total count.");        
        }
        
        $totalLength = $totalCountResult->row['total'];
        $dataQuery = "SELECT * FROM " . DB_PREFIX . "boardmembers $filterQuery LIMIT $first, $rows";
        $dataResult = $this->db->query($dataQuery);
        
        $resdata = $dataResult->rows;
        
        $this->response->sendStatus(200);
        $this->response->setContent([
            'resdata' => $resdata,
            'totallength' => $totalLength
        ]);
    }
    } catch (Exception $e) {
        $this->response->sendStatus(500);
        $this->response->setContent([
            'error' => $e->getMessage()
        ]);
    }
}

// public function getBoardmemByStatus() {
//     try {
//         $faculties = new ModelsBoardmembers();
//         $first = isset($_GET['first']) ? intval($_GET['first']) : 0;
//         $rows = isset($_GET['rows']) ? intval($_GET['rows']) : 10; 
//         $globalfilter = isset($_GET['globalfilter']) ? $_GET['globalfilter'] : ''; 
//         $colfilter = [];
//         if (isset($_GET['colfilter'])) {
//             foreach ($_GET['colfilter'] as $column => $filterData) {
//                 if (is_array($filterData)) {
//                     foreach ($filterData as $operator => $values) {
//                         if ($operator === '$in' && is_array($values)) {
//                             $colfilter[$column] = $values;
//                         }
//                     }
//                 }
//             }
//         } 
//         $activeMembers = $faculties->getByStatus(); 
//         if (!empty($globalfilter)) {
//             $columns = ['Name', 'Designation', 'Year'];  
//             $activeMembers = array_filter($activeMembers, function ($member) use ($globalfilter, $columns) {
//                 foreach ($columns as $column) {
//                     if (stripos($member[$column], $globalfilter) !== false) {
//                         return true;
//                     }
//                 }
//                 return false;
//             });
//         } 
//         if (!empty($colfilter)) {
//             $activeMembers = array_filter($activeMembers, function ($member) use ($colfilter) {
//                 foreach ($colfilter as $column => $values) {
//                     if (!in_array($member[$column], $values)) {
//                         return false;
//                     }
//                 }
//                 return true;
//             });
//         } 
//         $totalLength = count($activeMembers); 
//         $paginatedMembers = array_slice($activeMembers, $first, $rows); 
//         $this->response->sendStatus(200);
//         $this->response->setContent([
//             'resdata' => $paginatedMembers,
//             'totallength' => $totalLength
//         ]);
//     } catch (Exception $e) {
//         $this->response->sendStatus(500);
//         $this->response->setContent([
//             'error' => $e->getMessage()
//         ]);
//     }
// }

public function getBoardmemByStatus() {
    try {
        $faculties = new ModelsBoardmembers();
        $year = isset($_GET['Year']) ? $_GET['Year'] : null;
        $first = isset($_GET['first']) ? intval($_GET['first']) : 0;
        $rows = isset($_GET['rows']) ? intval($_GET['rows']) : 10; 
        $globalfilter = isset($_GET['globalfilter']) ? $_GET['globalfilter'] : ''; 
        $activeMembers = $faculties->getByStatus($year);
        if (!empty($globalfilter)) {
            $columns = ['Name', 'Designation', 'Year'];  
            $activeMembers = array_filter($activeMembers, function ($member) use ($globalfilter, $columns) {
                foreach ($columns as $column) {
                    if (stripos($member[$column], $globalfilter) !== false) {
                        return true;
                    }
                }
                return false;
            });
        } 
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
        if (!empty($colfilter)) {
            $activeMembers = array_filter($activeMembers, function ($member) use ($colfilter) {
                foreach ($colfilter as $column => $values) {
                    if (!in_array($member[$column], $values)) {
                        return false;
                    }
                }
                return true;
            });
        } 
        $uniqueMembers = [];
        foreach ($activeMembers as $member) {
            $uniqueKey = $member['Name'] . '|' . $member['Designation'];
            if (!isset($uniqueMembers[$uniqueKey])) {
                $uniqueMembers[$uniqueKey] = $member;
            }
        }
        $activeMembers = array_values($uniqueMembers);
        $totalLength = count($activeMembers); 
        $paginatedMembers = array_slice($activeMembers, $first, $rows); 
        
        $this->response->sendStatus(200);
        $this->response->setContent([
            'resdata' => $paginatedMembers,
            'totallength' => $totalLength
        ]);
    } catch (Exception $e) {
        $this->response->sendStatus(500);
        $this->response->setContent([
            'error' => $e->getMessage()
        ]);
    }
}

public function fetchUniqueYears() {
        $model = new ModelsBoardmembers(); 
        $result = $model->getUniqueYear();
        $this->response->sendStatus(200);
        $this->response->setContent([
            'resdata' => $result
        ]);
}


public function getFilterBoard() {
    try {
        $field = isset($_POST['field']) ? $_POST['field'] : (isset($_GET['field']) ? $_GET['field'] : '');
        if (empty($field)) {
            $this->response->sendStatus(400);
            $this->response->setContent(['message' => 'Field parameter is required']);
            return;
        }
        $query = "SELECT DISTINCT $field FROM " . DB_PREFIX . "boardmembers";
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
            echo json_encode(["error" => "Unauthorized"]);
            return;
        }
        $reqdata = $_POST;
        $files = $_FILES;

        if (empty($reqdata)) {
            throw new Exception("No data provided for update.");
        }

        if (!empty($_FILES['Image']['tmp_name'])) {
            $folderName = 'Upload/boardmembersimg';
            if (!file_exists($folderName)) mkdir($folderName, 0777, true);
            $destination = "$folderName/" . time() . '_' . $_FILES['Image']['name'];
            move_uploaded_file($_FILES['Image']['tmp_name'], $destination);
            $reqdata['Image'] = $destination;
        } elseif (isset($reqdata['Image'])) {
            $reqdata['Image'] = $reqdata['Image'];
        } else {
            $reqdata['Image'] = '';
        }

        $id = $_GET['id'] ?? null;
        if (!$id) {
            throw new Exception("Missing ID parameter.");
        }
        $resdata = (new ModelsBoardmembers)->update($reqdata, $id);
        $this->response->sendStatus(200);
        $this->response->setContent($resdata);
    } catch (Exception $e) {
        http_response_code(400); 
        echo json_encode(["error" => $e->getMessage()]);
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