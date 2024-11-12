<?php
namespace Models;
use MVC\Model;
class ModelsUser extends Model {
    public function getUserbyEmail($req) {
        $email="'".$req['Username']."'";
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "users WHERE Username=". $email);
        return $query->row;
    }

   
}