<?php

namespace Models;

use MVC\Model;

use PDO;

class ModelsVolunteer extends Model {
    
    public function lastRecord($id) {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "register WHERE id=" . (int)$id);
        return $query->row;
    }  

    public function lastRecord2($Year) {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "register WHERE Year=" . (int)$Year);
        return $query->row;
    }  
    
    public function getAll($whereClause = '') {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "register $whereClause");
        return $query->rows;
    }

    // public function getFiltered($posterType = null) {
    //     $queryStr = "SELECT * FROM " . DB_PREFIX . "register";
    //     if ($posterType) {
    //         $queryStr .= " WHERE Poster_Type = :posterType";
    //     }
    //     $query = $this->db->prepare($queryStr);
    //     if ($posterType) {
    //         $query->bindParam(':posterType', $posterType, PDO::PARAM_STR);
    //     }
    //     $query->execute();
    //     return $query->fetchAll(PDO::FETCH_ASSOC);
    // }

    // public function getUniquePosterTypes() {
    //     $query = $this->db->query("SELECT DISTINCT Poster_Type FROM " . DB_PREFIX . "register");
    //     return array_column($query->rows, 'Poster_Type');
    // }
    
    
    public function getUniquePosterTypes() {
        $query = $this->db->query("SELECT DISTINCT Poster_Type FROM " . DB_PREFIX . "register WHERE Poster_Type = 'Registration Form'");
        return array_column($query->rows, 'Poster_Type');
    } 

    public function getUniquePosterVolunteer() {
        $query = $this->db->query("SELECT DISTINCT Poster_Type FROM " . DB_PREFIX . "register WHERE Poster_Type = 'Volunteer'");
        return array_column($query->rows, 'Poster_Type');
    } 

    public function getUniquePosterDonation() {
        $query = $this->db->query("SELECT DISTINCT Poster_Type FROM " . DB_PREFIX . "register WHERE Poster_Type = 'Donation'");
        return array_column($query->rows, 'Poster_Type');
    } 
   

    public function save($data) {
        $allowedKeys = [
            'Reg_No',
            'Reg_ID',
            'First_Name', 
            'Last_Name', 
            'Email', 
            'Phone_Number', 
            'Entry_Fees', 
            'Willingness', 
            'Number_Guests', 
            'Adults', 
            'Kids', 
            'Babes', 
            'Team_Name', 
            'Eventname', 
            'Poster_Type', 
            'Game_Title', 
            'Team_Members_Count', 
            'Disclaimer_Acceptance'
        ];
    
        $filteredData = array_filter( 
            $data, 
            function($key) use ($allowedKeys) { 
                return in_array($key, $allowedKeys); 
            }, 
            ARRAY_FILTER_USE_KEY 
        ); 
        if (empty($filteredData)) { 
            throw new Exception("No valid data provided to save."); 
        } 
        error_log("Initial filteredData: " . print_r($filteredData, true));
        if (!isset($filteredData['Poster_Type'])) {
            error_log("Poster_Type is missing");
            throw new Exception("Poster_Type must be provided.");
        }
        $posterType = $filteredData['Poster_Type']; 
        $date = date('dmy'); 
        error_log("Poster Type: " . $posterType);
        error_log("Date: " . $date);
        switch ($posterType) { 
            case 'Registration Form': 
                $prefix = 'SACREG'; 
                break; 
            case 'Volunteer': 
                $prefix = 'SACVLT'; 
                break; 
            case 'Donation': 
                $prefix = 'SACDON'; 
                break; 
            default: 
                error_log("Invalid Poster_Type: " . $posterType);
                throw new Exception("Invalid Poster_Type."); 
        } 
         
        try {
            $query = "SELECT COALESCE(MAX(CAST(SUBSTRING(Reg_ID, -3) AS UNSIGNED)), 0) + 1 AS last_number  
                      FROM " . DB_PREFIX . "register  
                      WHERE Poster_Type = :posterType  
                      AND DATE_FORMAT(created_at, '%d%m%y') = :date"; 
            $stmt = $this->db->prepare($query); 
            $stmt->bindParam(':posterType', $posterType); 
            $stmt->bindParam(':date', $date); 
            $stmt->execute(); 
            $lastNumber = $stmt->fetchColumn(); 
            error_log("Last Number Query: " . $query);
            error_log("Last Number Result: " . $lastNumber);
            $newRegNo = $prefix . $date . str_pad($lastNumber, 3, '0', STR_PAD_LEFT); 
            $filteredData['Reg_ID'] = $newRegNo; 
            error_log("Generated Reg_ID: " . $newRegNo);
        } catch (Exception $e) {
            error_log("Error generating Reg_ID: " . $e->getMessage());
            throw $e;
        }
        $keys = implode(",", array_keys($filteredData)); 
        $values = "'" . implode("','", array_map([$this->db, 'escape'], array_values($filteredData))) . "'"; 
        error_log("Insert Query: INSERT INTO " . DB_PREFIX . "register ($keys) VALUES ($values)");
        $query = "INSERT INTO " . DB_PREFIX . "register ($keys) VALUES ($values)"; 
        $this->db->query($query); 
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
        $query = "UPDATE " . DB_PREFIX . "register SET " . implode(', ', $cols) . " WHERE id = ?";
        $values[] = (int)$id; 
        $stmt = $this->db->prepare($query); 
        if ($stmt->execute($values)) {
            return $this->lastRecord($id);
        } else {
            throw new Exception("Failed to update record.");
        }
    }
    
    
    public function delete($id) {
        $query = $this->db->query("DELETE FROM " . DB_PREFIX . "register WHERE id = " . (int)$id);
        return $id;
    }
}
