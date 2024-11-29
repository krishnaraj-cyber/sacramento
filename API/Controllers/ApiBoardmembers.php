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
        $faculties = new ModelsBoardmembers();
        $first = isset($_GET['first']) ? intval($_GET['first']) : 0;
        $rows = isset($_GET['rows']) ? intval($_GET['rows']) : 10;
        $globalfilter = isset($_GET['globalfilter']) ? $_GET['globalfilter'] : '';
        $colfilter = isset($_GET['colfilter']) ? json_decode($_GET['colfilter'], true) : [];
        $columns = ['Name', 'Designation', 'Status'];
        $globalFilterQuery = '';
        if (!empty($globalfilter)) {
            $globalFilterConditions = [];
            foreach ($columns as $column) {
                $globalFilterConditions[] = "$column LIKE '%" . $this->db->escape($globalfilter) . "%'";
            }
            $globalFilterQuery = "(" . implode(' OR ', $globalFilterConditions) . ")";
        }
        $additionalFilterQuery = '';
        if (!empty($colfilter)) {
            $additionalConditions = [];
            foreach ($colfilter as $key => $value) {
                $escapedValue = $this->db->escape($value);
                $additionalConditions[] = "$key = '$escapedValue'";
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
        $totalLength = $totalCountResult->row['total'];
        $dataQuery = "SELECT * FROM " . DB_PREFIX . "boardmembers $filterQuery LIMIT $first, $rows";
        $dataResult = $this->db->query($dataQuery);
        $resdata = $dataResult->rows;
        $this->response->sendStatus(200);
        $this->response->setContent([
            'resdata' => $resdata,
            'totallength' => $totalLength
        ]);

    } catch (Exception $e) {
        echo 'Error Message: ' . $e->getMessage();
    }
}


// function getFilterOptions($req, $conn) {

//     echo $req; echo $conn;
//     // Validate and sanitize the field parameter
//     $field = isset($req['field']) ? $req['field'] : '';
//     if (empty($field)) {
//         return json_encode(['message' => 'Field parameter is required']);
//     }

//     // Define allowed fields to prevent invalid columns being queried
//     $allowedFields = ['Name', 'Designation', 'Status'];
//     if (!in_array($field, $allowedFields)) {
//         return json_encode(['message' => 'Invalid field parameter']);
//     }

//     try {
//         // Build the query to fetch distinct values for the given field
//         $sql = "SELECT DISTINCT `$field` FROM " . DB_PREFIX . "boardmembers";
//         $stmt = $conn->prepare($sql);
//         $stmt->execute();

//         // Retrieve results
//         $result = $stmt->get_result();

//         // Format the results
//         if ($result->num_rows > 0) {
//             $distinctValues = [];
//             while ($row = $result->fetch_assoc()) {
//                 $distinctValues[] = $row[$field];
//             }

//             return json_encode([$field => $distinctValues]);
//         } else {
//             return json_encode([$field => []]);
//         }
//     } catch (Exception $e) {
//         // Handle exceptions gracefully
//         return json_encode(['message' => 'An error occurred', 'error' => $e->getMessage()]);
//     }
// }

function getFilterOptions() {
    $field = '';
    if (isset($_GET['field']) && !empty($_GET['field'])) {
        $field = $_GET['field'];
    } 
    elseif (isset($_POST['field']) && !empty($_POST['field'])) {
        $field = $_POST['field'];
    } 
    elseif (isset($this->request) && isset($this->request->field) && !empty($this->request->field)) {
        $field = $this->request->field;
    }

    error_log("Received field parameter: " . ($field ?: 'EMPTY'));

    $allowedFields = ['Designation', 'Status', 'Name'];
    
    if (empty($field)) {
        error_log('Field parameter is missing');
        return $this->send(400, ['message' => 'Field parameter is required']);
    }
    
    if (!in_array($field, $allowedFields)) {
        error_log('Invalid field requested: ' . $field);
        return $this->send(400, ['message' => 'Invalid field requested']);
    }
    
    try {
        $sql = "SELECT DISTINCT `" . $this->db->escape($field) . "` FROM " . DB_PREFIX . "boardmembers WHERE `$field` IS NOT NULL AND `$field` != ''";
        
        error_log("Generated SQL Query: " . $sql);
        
        $result = $this->db->query($sql);
        if ($result === false) {
            error_log('Database query failed: ' . print_r($this->db->errorInfo(), true));
            return $this->send(500, ['message' => 'Query execution failed']);
        }
        
        $distinctValues = [];
        if (is_array($result)) {
            foreach ($result as $row) {
                if (is_array($row) && !empty($row[$field])) {
                    $distinctValues[] = $row[$field];
                } elseif (is_object($row) && !empty($row->$field)) {
                    $distinctValues[] = $row->$field;
                }
            }
        } elseif (is_object($result)) {
            if (method_exists($result, 'fetch_assoc')) {
                while ($row = $result->fetch_assoc()) {
                    if (!empty($row[$field])) {
                        $distinctValues[] = $row[$field];
                    }
                }
            } elseif (method_exists($result, 'fetchAll')) {
                $rows = $result->fetchAll(PDO::FETCH_ASSOC);
                foreach ($rows as $row) {
                    if (!empty($row[$field])) {
                        $distinctValues[] = $row[$field];
                    }
                }
            }
        }
        $distinctValues = array_unique($distinctValues);
        error_log("Distinct values found for $field: " . print_r($distinctValues, true));
        sort($distinctValues);
        return $this->send(200, [$field => $distinctValues]);
    
    } catch (Exception $e) {
        error_log('Exception in getFilterOptions: ' . $e->getMessage());
        error_log('Exception trace: ' . $e->getTraceAsString());
        
        return $this->send(500, ['message' => 'Error retrieving filter options: ' . $e->getMessage()]);
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