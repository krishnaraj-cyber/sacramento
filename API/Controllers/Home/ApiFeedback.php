<?php 
use Auth\Authentication; 
use MVC\Controller;
require_once './EmailService.php';
class ControllersFeedback extends Controller {

    public function sendFeedback(){
        try {
                $reqdata = $_SERVER['CONTENT_TYPE'] === 'application/json' ? json_decode(file_get_contents("php://input"), true) : $_POST; 
                if (!$reqdata) {
                    echo json_encode(["error" => "Invalid or missing input data"]);
                    return;
                }
                $message = "Feedback Send Successfully";
                if ($reqdata) {
                    $emailService = new EmailService();
                    $emailService->sendFeedbacktoAdmin($reqdata);
                    $emailService->sendFeedbackResponseToUser($reqdata);
                }
    
                echo json_encode([
                    "data" => $reqdata,
                    "message" => $message,
                ]);
            } catch (Exception $e) {
            echo 'Error Message: ' . $e->getMessage();
        } 
    }

} ?>