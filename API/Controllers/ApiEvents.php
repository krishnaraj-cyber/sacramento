<?php
require './API/Models/Events.php';
use Auth\Authentication;
use Models\ModelsEvents;
use MVC\Controller;
class ControllersEvents extends Controller {
    public function getEventsbyid(){
        try {
               $id=$this->request->get('id');
               $studentachivement=new ModelsEvents();
               $resdata =$studentachivement->lastrecord($id);
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }
    // public function getallEvents(){
    //     try {
    //            $id=$this->request->get();
    //            $studentachivement=new ModelsEvents();
    //            $resdata =$studentachivement->getall();
    //            $this->response->sendStatus(200);
    //            $this->response->setContent($resdata);
    //         } catch (Exception $e) {
    //         echo 'Error Message: ' . $e->getMessage();
    //     } 
    // }

    public function getallEvents() {
        try {
            $eventsModel = new ModelsEvents();
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
    
            $columns = ['EventName','Image','Date', 'Status'];
            
            // Use the model's method to get events with their associated games
            $allEvents = $eventsModel->getAll();
    
            // Apply global filter
            $filteredEvents = $allEvents;
            if (!empty($globalfilter)) {
                $filteredEvents = array_filter($allEvents, function($event) use ($globalfilter, $columns) {
                    foreach ($columns as $column) {
                        if (stripos($event[$column], $globalfilter) !== false) {
                            return true;
                        }
                    }
                    return false;
                });
            }
    
            // Apply column filters
            if (!empty($colfilter)) {
                $filteredEvents = array_filter($filteredEvents, function($event) use ($colfilter) {
                    foreach ($colfilter as $column => $value) {
                        if (is_array($value)) {
                            if (!in_array($event[$column], $value)) {
                                return false;
                            }
                        } else {
                            if ($event[$column] != $value) {
                                return false;
                            }
                        }
                    }
                    return true;
                });
            }
    
            // Calculate total length
            $totalLength = count($filteredEvents);
    
            // Apply pagination
            $filteredEvents = array_slice($filteredEvents, $first, $rows);
    
            $this->response->sendStatus(200);
            $this->response->setContent([
                'resdata' => $filteredEvents,
                'totallength' => $totalLength
            ]);
    
        } catch (Exception $e) {
            $this->response->sendStatus(500);
            $this->response->setContent([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function getFilterEvents() {
        try {
            $field = isset($_POST['field']) ? $_POST['field'] : (isset($_GET['field']) ? $_GET['field'] : '');
            if (empty($field)) {
                $this->response->sendStatus(400);
                $this->response->setContent(['message' => 'Field parameter is required']);
                return;
            }
            $query = "SELECT DISTINCT $field FROM " . DB_PREFIX . "events";
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

    public function saveEvents() {
        try {
            if (Authentication::verifyJWT() === "Unauthorized") {
                http_response_code(401);
                echo json_encode(["error" => "Unauthorized"]);
                return;
            }
    
            $reqdata = $_SERVER['CONTENT_TYPE'] === 'application/json' ? json_decode(file_get_contents("php://input"), true) : $_POST;
            if (!$reqdata) {
                echo json_encode(["error" => "Invalid or missing input data"]);
                return;
            }

            if (!empty($_FILES['Image']['tmp_name'])) {
                $folderName = 'Upload/events';
                if (!file_exists($folderName)) mkdir($folderName, 0777, true);
                $destination = "$folderName/" . time() . '_' . $_FILES['Image']['name'];
                move_uploaded_file($_FILES['Image']['tmp_name'], $destination);
                $reqdata['Image'] = $destination;
            } elseif (isset($reqdata['Image'])) {
                $reqdata['Image'] = $reqdata['Image'];
            } else {
                $reqdata['Image'] = '';
            }
    
            $faculties = new ModelsEvents();
            $resdata = $faculties->save($reqdata);
    
            $this->response->sendStatus(200);
            $this->response->setContent($resdata);
    
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }
    }

    public function updateEvents() {
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
                $folderName = 'Upload/events';
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
            $resdata = (new ModelsEvents)->update($reqdata, $id);
            $this->response->sendStatus(200);
            $this->response->setContent($resdata);
        } catch (Exception $e) {
            http_response_code(400); 
            echo json_encode(["error" => $e->getMessage()]);
        }
    }


    public function deleteEvents(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
           
                $reqdata = $this->request->input();
                $studentachivement=new ModelsEvents();
            
        
                $studentachivement->Delete($_GET['id']);
                $this->response->sendStatus(200);
                $this->response->setContent('Deleted successfully');
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }

    }
}
