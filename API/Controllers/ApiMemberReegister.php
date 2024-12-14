<?php
require './API/Models/MemberRegister.php';
use Auth\Authentication;
use Models\ModelsMemberRegister;
use MVC\Controller;
class ControllersMemberRegister extends Controller {
    public function getMemberRegisterbyid(){
        try {
               $id=$this->request->get('id');
               $notification=new ModelsMemberRegister();
               $resdata =$notification->lastrecord($id);
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }

    public function getallMemberRegister() {
        try {
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
                http_response_code(401);
                echo json_encode(array("error" => "Unauthorized"));
            } else {
            $faculties = new ModelsMemberRegister();
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
    
            $columns = ['First_Name', 'Email','Phone_Number','Location','Notify_stm','Contact_for_stm','Register_spouse'];
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
    
            $totalCountQuery = "SELECT COUNT(*) as total FROM " . DB_PREFIX . "memberregister $filterQuery";
            $totalCountResult = $this->db->query($totalCountQuery);
            
            if (!$totalCountResult || !isset($totalCountResult->row['total'])) {
                throw new Exception("Failed to fetch total count.");        
            }
            
            $totalLength = $totalCountResult->row['total'];
            $dataQuery = "SELECT * FROM " . DB_PREFIX . "memberregister $filterQuery ORDER BY id DESC LIMIT $first, $rows";
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

    public function getMemberRegisterByStatus() {
        try {
            $faculties = new ModelsMemberRegister();
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
                $columns = ['Firsr_Name', 'Email','Phone_Number','Location','Notify_stm','Contact_for_stm','Register_spouse'];  
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

    public function getFilterMemberRegister() {
        try {
            $field = isset($_POST['field']) ? $_POST['field'] : (isset($_GET['field']) ? $_GET['field'] : '');
            if (empty($field)) {
                $this->response->sendStatus(400);
                $this->response->setContent(['message' => 'Field parameter is required']);
                return;
            }
            $query = "SELECT DISTINCT $field FROM " . DB_PREFIX . "memberregister";
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

    public function saveMemberRegister()
    {
        try {
      
            $reqdata = $_SERVER['CONTENT_TYPE'] === 'application/json' ? json_decode(file_get_contents("php://input"), true) : $_POST;
            if (!$reqdata) {
                echo json_encode(["error" => "Invalid or missing input data"]);
                return;
            }
                $message = "Registered Successfully";
                 $notification=new ModelsMemberRegister();
                 $resdata =$notification->save($reqdata);
                 $this->response->sendStatus(200);
                 $saveddata = [
                    $resdata,
                    'message' => $message
                 ];
                 $this->response->setContent($saveddata);
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    }

    public function updateMemberRegister() {
        try {
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
                http_response_code(401);
                echo json_encode(["error" => "Unauthorized"]);
                return;
            }
            $reqdata = $_POST;

            error_log(print_r($_POST, true));
            error_log(print_r($_FILES, true));
            error_log(print_r($_GET, true));
    
            if (empty($reqdata)) {
                throw new Exception("No data provided for update.");
            }
    
            $id = $_GET['id'] ?? null;
            if (!$id) {
                throw new Exception("Missing ID parameter.");
            }
            $resdata = (new ModelsMemberRegister)->update($reqdata, $id);
            $this->response->sendStatus(200);
            $this->response->setContent($resdata);
        } catch (Exception $e) {
            http_response_code(400); 
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
    
    public function deleteMemberRegister(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
           
                $reqdata = $this->request->input();
                $notification=new ModelsMemberRegister();
            
        
                $notification->Delete($_GET['id']);
                $this->response->sendStatus(200);
                $this->response->setContent('Deleted successfully');
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }

    }
}
