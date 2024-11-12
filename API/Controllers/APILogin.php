<?php
namespace Controller;
require './API/Models/Login.php';
require './API/Models/User.php';
use Auth\Authentication;
use Models\ModelsLogin;
use Models\ModelsUser;
class APILoginController{
    public  function AdminLogin()
    {       
        try { 
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata, true);
            $login=new ModelsLogin();
            $loginusers= $login->Login($request);
            if ($loginusers['res'] > 0) {
                $usermodel=new ModelsUser();
                $user = $usermodel->getUserbyEmail($request);
                $JWTtoken = Authentication::generateJWT($user);
                echo json_encode($JWTtoken); // Response Data
            }  else {
                $json = array("message" => "Invalid username or password");
                echo json_encode($json);
            }
        }
        catch (\Exception $e) {  
            echo 'Exception Message: ' .$e->getMessage();  
         }  
    }
}

