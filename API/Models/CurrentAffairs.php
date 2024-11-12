<?php

namespace Models;

use MVC\Model;

class ModelsCurrentAffairs extends Model {
    
    public function lastRecord($id) {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "current_affairs WHERE id=" . (int)$id);
        return $query->row;
    }  
    
    public function getAll() {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "current_affairs");
        return $query->rows;
    }
    public function getbydate($Cadate){
       
        // Properly escape the date and encapsulate it in single quotes
        $escapedDate = $this->db->escape($Cadate);
       
        
        // Assuming Cadate is a string type, you should also encapsulate it in single quotes
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "current_affairs WHERE Cadate='" . $escapedDate . "'");
        
        return $query->row;
    }
    public function getbyyear($Year){
       
        // Properly escape the date and encapsulate it in single quotes
        $escapedDate = $this->db->escape($Year);
       
        
        // Assuming Cadate is a string type, you should also encapsulate it in single quotes
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "current_affairs WHERE Year='" . $escapedDate . "'");
        
        return $query->rows;
    }
    
    
    
    public function save($data) {
        $keys = implode(",", array_keys($data));
        $values = "'" . implode("','", array_values($data)) . "'";
        $query = $this->db->query("INSERT INTO " . DB_PREFIX . "current_affairs ($keys) VALUES ($values)");
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
        $query = $this->db->query("UPDATE " . DB_PREFIX . "current_affairs SET " . implode(', ', $cols) . " WHERE id = " . (int)$id);
        return $this->lastRecord($id);
    }
    
    public function delete($id) {
        $query = $this->db->query("DELETE FROM " . DB_PREFIX . "current_affairs WHERE id = " . (int)$id);
        return $id;
    }
}
