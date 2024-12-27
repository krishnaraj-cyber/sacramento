<?php
namespace Models;
use MVC\Model;
class ModelsGallery extends Model {
    public function lastrecord($id){
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "gallery WHERE id=".$id);
        return $query->row;
    }
    public function getByYear($year) {
        $year = $this->db->escape($year); 
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "gallery WHERE Status = 'Active' AND YEAR(Year) = '" . $year . "'");
        return $query->rows;
    }
    public function getTotalRecords() {
        $query = $this->db->query("SELECT COUNT(*) as total FROM " . DB_PREFIX . "gallery");
        return $query->row['total'];
    }
  
    public function getAll($whereClause = '') {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "gallery $whereClause");
        return $query->rows;
    }

    public function getByStatus() {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "gallery WHERE Status = 'Active'");
        return $query->rows;
    }

    public function save($data) {
        $validColumns = ['EventName', 'Year', 'Status', 'Image']; 
        $filteredData = array_intersect_key($data, array_flip($validColumns));
    
        $array_keys = implode(",", array_keys($filteredData));
        $array_values = "'" . implode("','", array_values($filteredData)) . "'";
        
        $query = $this->db->query("INSERT INTO " . DB_PREFIX . "gallery (" . $array_keys . ") VALUES (" . $array_values . ")");
        $id = $this->db->getLastId();
        $fdata = $this->lastrecord($id);
        return $fdata;
    }

    

    public function update($data, $id) {
        $validColumns = ['EventName', 'Year', 'Status', 'Image']; // Valid columns in the database
    
        // Filter only valid columns from the input data
        $filteredData = array_intersect_key($data, array_flip($validColumns));
    
        // Handle the 'Image' field to store it as a comma-separated string
        if (isset($filteredData['Image']) && is_array($filteredData['Image'])) {
            $filteredData['Image'] = implode(',', $filteredData['Image']); // Convert array to a comma-separated string
        }
    
        // Prepare the SET clause for the SQL query
        $cols = [];
        $values = [];
        foreach ($filteredData as $key => $val) {
            $cols[] = "$key = ?";
            $values[] = $val;
        }
    
        // Add the condition for updating the specific record
        $query = "UPDATE " . DB_PREFIX . "gallery SET " . implode(', ', $cols) . " WHERE id = ?";
        $values[] = (int)$id; // Bind the record ID as the last parameter
    
        // Execute the query
        $stmt = $this->db->prepare($query);
        if ($stmt->execute($values)) {
            return $this->lastRecord($id); // Fetch and return the updated record
        } else {
            throw new Exception("Failed to update record.");
        }
    }
    

    public function Delete($id) {
        $query = $this->db->query("DELETE FROM " . DB_PREFIX ."gallery WHERE id=".$id);
        return $id;
    }
}