<?php

namespace Models;

use MVC\Model;

use PDO;

class ModelsRegister extends Model {
    
    public function lastRecord($id) { 
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "register WHERE id = " . (int)$id);
        $record = $query->row; 
        if (!empty($record)) {
            $participantsQuery = $this->db->query("SELECT * FROM " . DB_PREFIX . "register_participants WHERE id = " . (int)$id);
            $record['Participants'] = $participantsQuery->rows;
        } else { 
            $record['Participants'] = [];
        } 
        return $record;
    }
    

    public function lastRecord2($Year) {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "register WHERE Year=" . (int)$Year);
        return $query->row;
    }  
    
    public function getAll($filters = []) {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "register");
        $events = $query->rows;
    
        if (!empty($events)) {
            foreach ($events as &$event) {
                $eventId = (int)$event['id'];
                $gamesQuery = $this->db->query("SELECT * FROM " . DB_PREFIX . "register_participants WHERE id = $eventId");
                $event['Participant'] = $gamesQuery->rows;
            }
        }
        return $events;
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

    public function getUniquePosterTypes() {
        $query = $this->db->query("SELECT DISTINCT Poster_Type FROM " . DB_PREFIX . "register WHERE Poster_Type = 'Registration Form'");
        $posterTypes = [];
        foreach ($query->rows as $row) {
            $posterTypes[] = $row['Poster_Type'];
        }
        return $posterTypes;
    }
    public function getFilteredData($filterQuery, $first, $rows) {
        $dataQuery = "SELECT * FROM " . DB_PREFIX . "register $filterQuery ORDER BY id DESC LIMIT $first, $rows";
        $dataResult = $this->db->query($dataQuery);
        $data = $dataResult->rows; 
        foreach ($data as &$record) {
            if (isset($record['id'])) {
                $recordId = (int)$record['id'];
                $participantsQuery = $this->db->query("SELECT * FROM " . DB_PREFIX . "register_participants WHERE id = $recordId");
                $record['Participants'] = $participantsQuery->rows;
            } else {
                $record['Participants'] = [];
            }
        }

        return $data;
    }
 
    public function getTotalCount($filterQuery) {
        $countQuery = "SELECT COUNT(*) as total FROM " . DB_PREFIX . "register $filterQuery";
        $result = $this->db->query($countQuery);
        return $result->row['total'] ?? 0;
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
            'Disclaimer_Acceptance',
            'payment_intent_id',
            'payment_status',
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
            case 'RSVP': 
                $prefix = 'SACRSVP'; 
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

        if (isset($data['Participant']) && is_array($data['Participant']) && !empty($data['Participant'])) {
            $participantValues = [];
            
            foreach ($data['Participant'] as $participant) { 
                $participantData = [
                    'id' => $id,  
                    'Participant_Name' => $this->db->escape($participant['Participant_Name'] ?? ''),
                    'Selected_Event' => $this->db->escape($participant['Selected_Event'] ?? ''), 
                    'Age' => $this->db->escape($participant['Age'] ?? '') 
                ];
     
                $participantValues[] = "(" . 
                    "'" . $participantData['id'] . "', " .
                    "'" . $participantData['Participant_Name'] . "', " .
                    "'" . $participantData['Selected_Event'] . "', " .
                    "'" . $participantData['Age'] . "'" .
                    ")";
            }
     
            if (!empty($participantValues)) {
                $participantInsertQuery = "INSERT INTO " . DB_PREFIX . "register_participants " .
                    "(id, Participant_Name, Selected_Event, Age) VALUES " . 
                    implode(", ", $participantValues);
                
                try {
                    $this->db->query($participantInsertQuery);
                    error_log("Participants inserted successfully");
                } catch (Exception $e) {
                    error_log("Error inserting participants: " . $e->getMessage()); 
                }
            }
        }

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
        $query1 = $this->db->query("DELETE FROM " . DB_PREFIX . "register_participants WHERE id = " . (int)$id);
        $query = $this->db->query("DELETE FROM " . DB_PREFIX . "register WHERE id = " . (int)$id);
        return $id;
    }
}
