<?php

namespace Models;

use MVC\Model;

class ModelsCourse extends Model {
    
    public function lastRecord($id) {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "course WHERE id=" . (int)$id);
        return $query->row;
    }  
    
    public function getAll() {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "course");
        return $query->rows;
    }
    public function getbycourse($Course){
       
        // Properly escape the date and encapsulate it in single quotes
        $escapedDate = $this->db->escape($Course);
       
        
        // Assuming Cadate is a string type, you should also encapsulate it in single quotes
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "course WHERE Course='" . $escapedDate . "'");
        
        return $query->row;
    }
        
    
    
    public function save($data) {
        $keys = implode(",", array_keys($data));
        $values = "'" . implode("','", array_values($data)) . "'";
        $query = $this->db->query("INSERT INTO " . DB_PREFIX . "course ($keys) VALUES ($values)");
        $id = $this->db->getLastId();
        return $this->lastRecord($id);
    }
    
    public function update($data, $id) {
        if (array_key_exists("id", $data)) {
           unset($data['id']);
        }
        $cols = array();
        foreach ($data as $key => $val) {
            $cols[] = "$key = '$val'";
        }
        $query = $this->db->query("UPDATE " . DB_PREFIX . "course SET " . implode(', ', $cols) . " WHERE id = " . (int)$id);
        return $this->lastRecord($id);
    }
    
    public function delete($id) {
        $query = $this->db->query("DELETE FROM " . DB_PREFIX . "course WHERE id = " . (int)$id);
        return $id;
    }
}
