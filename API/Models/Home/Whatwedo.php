<?php

namespace Models;

use MVC\Model;

class ModelsWhatwedo extends Model {
    
    public function lastRecord($id) {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "whatwedo WHERE id=" . (int)$id);
        return $query->row;
    }  

    public function lastRecord2($Year) {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "whatwedo WHERE Year=" . (int)$Year);
        return $query->row;
    }  
    
    public function getAll($whereClause = '') {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "whatwedo $whereClause");
        return $query->rows;
    }

    public function getByStatus() {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "whatwedo  WHERE Status = 'Active'");
        return $query->rows;
    }
    
    public function save($data) {
        $keys = implode(",", array_keys($data));
        $values = "'" . implode("','", array_values($data)) . "'";
        $query = $this->db->query("INSERT INTO " . DB_PREFIX . "whatwedo ($keys) VALUES ($values)");
        $id = $this->db->getLastId();
        return $this->lastRecord($id);
    }
    
    public function update($data, $id) {
        if (array_key_exists("id", $data)) {
            unset($data['id']);
        }
        $cols = [];
        $values = [];
        foreach ($data as $key => $val) {
            $cols[] = "$key = ?";
            $values[] = $val;
        }
        $query = "UPDATE " . DB_PREFIX . "whatwedo SET " . implode(', ', $cols) . " WHERE id = ?";
        $values[] = (int)$id; 
        $stmt = $this->db->prepare($query); 
        if ($stmt->execute($values)) {
            return $this->lastRecord($id);
        } else {
            throw new Exception("Failed to update record.");
        }
    }
    
    
    public function delete($id) {
        $query = $this->db->query("DELETE FROM " . DB_PREFIX . "whatwedo WHERE id = " . (int)$id);
        return $id;
    }
}
