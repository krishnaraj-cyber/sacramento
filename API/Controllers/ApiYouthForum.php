<?php
require './API/Models/YouthForum.php';
use Auth\Authentication;
use Models\ModelsYouthForum;
use MVC\Controller;
class ControllersYouthForum extends Controller {
    public function getYouthForumbyid(){
        try {
               $id=$this->request->get('id');
               $studentachivement=new ModelsYouthForum();
               $resdata =$studentachivement->lastrecord($id);
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }
    
    public function getallYouthForum() {
        try {
            if (Authentication::verifyJWT() === "Unauthorized") {
                http_response_code(401);
                echo json_encode(["error" => "Unauthorized"]);
                return;
            } else {
            $faculties = new ModelsYouthForum();
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
    
            $columns = ['Name', 'Status'];
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
    
            $totalCountQuery = "SELECT COUNT(*) as total FROM " . DB_PREFIX . "youthforum $filterQuery";
            $totalCountResult = $this->db->query($totalCountQuery);
            
            if (!$totalCountResult || !isset($totalCountResult->row['total'])) {
                throw new Exception("Failed to fetch total count.");        
            }
            
            $totalLength = $totalCountResult->row['total'];
            $dataQuery = "SELECT * FROM " . DB_PREFIX . "youthforum $filterQuery LIMIT $first, $rows";
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

    public function getYouthByStatus() {
        try {
            $faculties = new ModelsYouthForum();
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
            $activeMembers = $faculties->getByStatus(); 
            if (!empty($globalfilter)) {
                $columns = ['Name',];  
                $activeMembers = array_filter($activeMembers, function ($member) use ($globalfilter, $columns) {
                    foreach ($columns as $column) {
                        if (stripos($member[$column], $globalfilter) !== false) {
                            return true;
                        }
                    }
                    return false;
                });
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

    public function getFilterYouth() {
        try {
            $field = isset($_POST['field']) ? $_POST['field'] : (isset($_GET['field']) ? $_GET['field'] : '');
            if (empty($field)) {
                $this->response->sendStatus(400);
                $this->response->setContent(['message' => 'Field parameter is required']);
                return;
            }
            $query = "SELECT DISTINCT $field FROM " . DB_PREFIX . "youthforum";
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

    public function saveYouthForum() {
        try {
            if (Authentication::verifyJWT() === "Unauthorized") {
                http_response_code(401);
                echo json_encode(["error" => "Unauthorized"]);
                return;
            } else {
    
            $reqdata = $_SERVER['CONTENT_TYPE'] === 'application/json' ? json_decode(file_get_contents("php://input"), true) : $_POST;
            if (!$reqdata) {
                echo json_encode(["error" => "Invalid or missing input data"]);
                return;
            }

            if (!empty($_FILES['Image']['tmp_name'])) {
                $folderName = 'Upload/youthforum';
                if (!file_exists($folderName)) mkdir($folderName, 0777, true);
                $destination = "$folderName/" . time() . '_' . $_FILES['Image']['name'];
                move_uploaded_file($_FILES['Image']['tmp_name'], $destination);
                $reqdata['Image'] = $destination;
            } elseif (isset($reqdata['Image'])) {
                $reqdata['Image'] = $reqdata['Image'];
            } else {
                $reqdata['Image'] = '';
            }
    
            $faculties = new ModelsYouthForum();
            $resdata = $faculties->save($reqdata);
    
            $this->response->sendStatus(200);
            $this->response->setContent($resdata);
        }
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    }

    public function updateYouthForum() {
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
                $folderName = 'Upload/youthforum';
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
            $resdata = (new ModelsYouthForum)->update($reqdata, $id);
            $this->response->sendStatus(200);
            $this->response->setContent($resdata);
        } catch (Exception $e) {
            http_response_code(400); 
            echo json_encode(["error" => $e->getMessage()]);
        }
    }


    public function deleteYouthForum(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
           
                $reqdata = $this->request->input();
                $studentachivement=new ModelsYouthForum();
            
        
                $studentachivement->Delete($_GET['id']);
                $this->response->sendStatus(200);
                $this->response->setContent('Deleted successfully');
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }

    }
}
