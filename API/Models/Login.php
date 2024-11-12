<?php
namespace Models;
use MVC\Model;
class ModelsLogin extends Model {

    public function Login($req) {
        $email="'".$req['Username']."'";
        $password="'".$req['Password']."'";
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "users WHERE Username=". $email."AND Password=".$password."AND Status='Active'");
        return array('res'=>$query->num_rows);
    }

}