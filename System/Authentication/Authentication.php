<?php
  namespace Auth;
  use Firebase\JWT\JWT;
  use Firebase\JWT\Key;
  class Authentication {
    public static function generateJWT($req){
    
        $secret_key = "YOUR_SECRET_KEY";
        $issuer_claim = "THE_ISSUER"; // this can be the servername
        $audience_claim = "THE_AUDIENCE";
        $issuedat_claim = time(); // issued at
        $notbefore_claim = $issuedat_claim + 10; //not before in seconds
        $expire_claim = floor(microtime(true) * 1000); // expire time in seconds
        //from database
        $Name=$req['Name'];
        $Email=$req['Username'];
        $Role=$req['Role'];
        $id=1;
        $token = array(
            "iss" => $issuer_claim,
            "aud" => $audience_claim,
            //"iat" => $issuedat_claim,
            //"nbf" => $notbefore_claim,
            //"exp" => $expire_claim,
            "data" => array(
                "id" => $id,
                "Name" => $Name,
                "Username" => $Email,
                "Role" => $Role
        ));

        http_response_code(200);

        $jwt = JWT::encode($token, $secret_key,'HS256');
       return 
            array(
                "message" => "Successful login",
                "jwt" => $jwt,
                "Username" => $Email,
                "Role" => $Role,
                "expireAt" => $expire_claim
            );
        }


        public static function verifyJWT(){
          $headers = getallheaders();
         
          if (isset($headers['Authorization'])) {
          $JWT=trim(substr($headers['Authorization'], 7));
         
          $decoded = JWT::decode($JWT, new Key("YOUR_SECRET_KEY", 'HS256'));
          return $decoded->data;
          }
          else{
            return "Unauthorized";
          }
        }

  }



?>