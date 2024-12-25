<?php
require './API/Models/Register.php'; 
require_once './EmailService.php';
use Auth\Authentication;
use Models\ModelsRegister;
use MVC\Controller;
class ControllersRegister extends Controller {
    public function getRegisterbyid(){
        try {
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
                http_response_code(401);
                echo json_encode(array("error" => "Unauthorized"));
            } else {
               $id=$this->request->get('id');
               $notification=new ModelsRegister();
               $resdata =$notification->lastrecord($id);
               $this->response->sendStatus(200);
               $this->response->setContent($resdata);
            }
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }

    public function getallRegister() {
        try {
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
    
            $columns = ['First_Name','Last_Name','Email','Phone_Number','Entry_Fees','Willingness','Number_Guests','Adults','Kids','Babes','Game_Title','Team_Name','Team_Members_Count','Disclaimer_Acceptance','EventName','Date','Registered_Year','Poster_Type','Reg_ID','Status'];
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
    
            $totalCountQuery = "SELECT COUNT(*) as total FROM " . DB_PREFIX . "register $filterQuery";
            $totalCountResult = $this->db->query($totalCountQuery);
            
            if (!$totalCountResult || !isset($totalCountResult->row['total'])) {
                throw new Exception("Failed to fetch total count.");        
            }
            
            $totalLength = $totalCountResult->row['total'];
            $dataQuery = "SELECT * FROM " . DB_PREFIX . "register $filterQuery LIMIT $first, $rows";
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
    
    public function getAllFilterRegister() { 
        try {
            $field = isset($_POST['field']) ? $_POST['field'] : (isset($_GET['field']) ? $_GET['field'] : '');
            if (empty($field)) {
                $this->response->sendStatus(400);
                $this->response->setContent(['message' => 'Field parameter is required']);
                return;
            }

            // $query = "SELECT DISTINCT $field FROM " . DB_PREFIX . "register WHERE Poster_Type = 'Registration Form'";
            if ($field === 'Selected_Event') { 
                $query = "SELECT DISTINCT rp.Selected_Event 
                          FROM " . DB_PREFIX . "register AS r
                          JOIN " . DB_PREFIX . "register_participants AS rp 
                          ON r.id = rp.id
                          WHERE r.Poster_Type = 'Registration Form'";
            } else { 
                $query = "SELECT DISTINCT $field 
                          FROM " . DB_PREFIX . "register 
                          WHERE Poster_Type = 'Registration Form'";
            }

            $result = $this->db->query($query);
            if ($result->num_rows > 0) {
                $distinctValues = [];
                foreach ($result->rows as $row) {
                if ($field === 'Selected_Event') {
                    $distinctValues[] = $row['Selected_Event'];
                } else {
                    $distinctValues[] = $row[$field];
                }
            }
                $this->response->sendStatus(200);
                $this->response->setContent([$field => array_values(array_unique(array_filter($distinctValues)))]);
            } else {
                $this->response->sendStatus(200);
                $this->response->setContent([$field => []]);
            }
    
        } catch (Exception $e) {
            $this->response->sendStatus(500);
            $this->response->setContent(['message' => 'An error occurred', 'error' => $e->getMessage()]);
        }
    }


    public function getFilteredbyPoster() {
        try { 
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
                http_response_code(401);
                echo json_encode(array("error" => "Unauthorized"));
                return;
            }
     
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
                    } else {
                        $colfilter[$column] = $filterData;
                    }
                }
            }
     
            if (!isset($colfilter['Poster_Type'])) {
                $notification = new ModelsRegister($this->db);
                $defaultPosterTypes = $notification->getUniquePosterTypes();
                if (!empty($defaultPosterTypes)) {
                    $colfilter['Poster_Type'] = $defaultPosterTypes;
                }
            }
     
            $columns = ['First_Name', 'Last_Name', 'Email', 'Phone_Number', 'Entry_Fees', 'Willingness', 
                        'Number_Guests', 'Adults', 'Kids', 'Babes', 'Game_Title', 'Team_Name', 
                        'Team_Members_Count', 'Disclaimer_Acceptance', 'EventName','Date','Registered_Year', 'Poster_Type','Reg_ID'];
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
     
            $notification = new ModelsRegister($this->db);
            $totalLength = $notification->getTotalCount($filterQuery);
            $resdata = $notification->getFilteredData($filterQuery, $first, $rows);
     
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



    public function saveRegisterfree()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                if (isset($_SERVER['CONTENT_TYPE']) && 
                    strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
                    $jsonInput = file_get_contents('php://input');
                    error_log('Raw JSON Input: ' . $jsonInput);
                    $reqdata = json_decode($jsonInput, true);
                    if (json_last_error() !== JSON_ERROR_NONE) {
                        http_response_code(400);
                        echo json_encode([
                            'error' => 'Invalid JSON',
                            'json_error' => json_last_error_msg(),
                            'status' => false
                        ]);
                        return;
                    }
                } else {
                    $reqdata = $_POST;
                }
            } else {
                http_response_code(405);
                echo json_encode([
                    'error' => 'Method Not Allowed',
                    'status' => false
                ]);
                return;
            }
            if (!is_array($reqdata) || empty($reqdata)) {
                http_response_code(400);
                echo json_encode([
                    'error' => 'Invalid or missing input data',
                    'status' => false
                ]);
                return;
            }
            $message = "Registered Successfully";
            $notification = new ModelsRegister();
            $savedData = $notification->save($reqdata);

            if ($savedData) {
                $emailService = new EmailService();
                $emailService->sendRegistrationEmail($reqdata);
            }

            $resdata = [
                 $savedData,
                'message' => $message
            ]; 

            header('Content-Type: application/json');
            echo json_encode($resdata);
            http_response_code(200);
    
        } catch (Exception $e) { 
            http_response_code(500);
            echo json_encode([
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'status' => false
            ]);
        }
    }


    public function createPaymentSession()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $input = json_decode(file_get_contents('php://input'), true);
    
                if (empty($input['Amount'])) {
                    http_response_code(400);
                    echo json_encode(['error' => 'Missing payment amount']);
                    return;
                }
    
                \Stripe\Stripe::setApiKey('sk_test_51PZgSgRsjTnsPyMfnRmGlfRNirfcSOdLWjlTjdYZEvIiLF2ioOU00m4qHQFPI6srmbYf3l1ttUl1q3bhzcVsHo7N00xXm2rO6l');
    
                $session = \Stripe\Checkout\Session::create([
                    'payment_method_types' => ['card'],
                    'line_items' => [[
                        'price_data' => [
                            'currency' => 'usd',
                            'product_data' => ['name' => $input['Title'] ?? 'Event Registration'],
                            'unit_amount' => intval($input['Amount'] * 100), // Convert to cents
                        ],
                        'quantity' => 1,
                    ]],
                    'mode' => 'payment',
                    'success_url' => 'http://192.168.29.62:5173/success?session_id={CHECKOUT_SESSION_ID}',
                    'cancel_url' => 'http://192.168.29.62:5173/cancel',
                ]);
    
                echo json_encode(['url' => $session->url]);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
        } catch (\Stripe\Exception\ApiErrorException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }


    public function saveRegister()
{
    try {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (isset($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
                $jsonInput = file_get_contents('php://input');
                $reqdata = json_decode($jsonInput, true);

                if (json_last_error() !== JSON_ERROR_NONE) {
                    http_response_code(400);
                    echo json_encode([
                        'error' => 'Invalid JSON',
                        'json_error' => json_last_error_msg(),
                        'status' => false
                    ]);
                    return;
                }
            } else {
                $reqdata = $_POST;
            }
 
            if (!is_array($reqdata) || empty($reqdata) || !isset($reqdata['payment_session_id'])) {
                http_response_code(400);
                echo json_encode([
                    'error' => 'Invalid or missing input data',
                    'status' => false
                ]);
                return;
            }
 
            \Stripe\Stripe::setApiKey('sk_test_51PZgSgRsjTnsPyMfnRmGlfRNirfcSOdLWjlTjdYZEvIiLF2ioOU00m4qHQFPI6srmbYf3l1ttUl1q3bhzcVsHo7N00xXm2rO6l');

            $sessionId = $reqdata['payment_session_id'];
            try {
                $session = \Stripe\Checkout\Session::retrieve($sessionId);

                if ($session->payment_status !== 'paid') {
                    http_response_code(400);
                    echo json_encode([
                        'error' => 'Payment not completed',
                        'status' => false
                    ]);
                    return;
                }

                  // Extract payment details
                $paymentIntentId = $session->payment_intent;
                $customerId = $session->customer;
 
                $paymentIntent = \Stripe\PaymentIntent::retrieve($paymentIntentId);

                $paymentDetails = [
                    'session_id' => $sessionId,
                    'payment_intent_id' => $paymentIntentId,
                    'customer_id' => $customerId,
                    'amount_received' => $paymentIntent->amount_received / 100,  
                    'currency' => $paymentIntent->currency,
                    'payment_method' => $paymentIntent->payment_method,
                    'status' => $paymentIntent->status,
                    'created' => date('Y-m-d H:i:s', $paymentIntent->created)
                ];
 
                // http_response_code(200);
                // echo json_encode([
                //     'message' => 'Payment verified successfully',
                //     'payment_details' => $paymentDetails,
                //     'status' => true
                // ]);
                $reqdata['payment_intent_id'] = $paymentIntentId;
                $reqdata['payment_status'] = $paymentIntent->status;

            } catch (\Stripe\Exception\ApiErrorException $e) {
                http_response_code(500);
                echo json_encode([
                    'error' => 'Payment verification failed',
                    'details' => $e->getMessage(),
                    'status' => false
                ]);
                return;
            }
 
            $notification = new ModelsRegister();
            $savedData = $notification->save($reqdata);

            if ($savedData) {
                $emailService = new EmailService();
                $emailService->sendRegistrationEmail($reqdata, $paymentDetails);
            }

            $resdata = [
                'resdata' => $savedData,
                'payment_details' => $paymentDetails,
                'message' => 'Registered Successfully'
            ];

            header('Content-Type: application/json');
            echo json_encode($resdata);
            http_response_code(200);
        } else {
            http_response_code(405);
            echo json_encode([
                'error' => 'Method Not Allowed',
                'status' => false
            ]);
        }  
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
            'status' => false
        ]);
    }
}


    public function updateRegister() {
        try {
            $verify = Authentication::verifyJWT();
            if ($verify == "Unauthorized") {
                http_response_code(401);
                echo json_encode(["error" => "Unauthorized"]);
                return;
            }
             $id = $_GET['id'] ?? null;
            if (!$id) {
                throw new Exception("Missing ID parameter.");
            }
            
            $reqdata = $_POST;
            if (empty($reqdata)) {
                throw new Exception("No data provided for update.");
            }
    
            $resdata = (new ModelsRegister)->update($reqdata, $id);
            $this->response->sendStatus(200);
            $this->response->setContent($resdata);
        } catch (Exception $e) {
            http_response_code(400); 
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
    
    public function deleteRegister(){
        try {
           $verify = Authentication::verifyJWT();
           if ($verify == "Unauthorized") {
               http_response_code(401);
               echo json_encode(array("error" => "Unauthorized"));
           } else {
           
                $reqdata = $this->request->input();
                $notification=new ModelsRegister();
                $notification->Delete($_GET['id']);
                $this->response->sendStatus(200);
                $this->response->setContent('Deleted successfully');
           }
            
        } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        }

    }
}
