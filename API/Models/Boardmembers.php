<?php
namespace Models;
use MVC\Model;
class ModelsBoardmembers extends Model {

    public function lastrecord($id){
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "boardmembers WHERE id=".$id);
        return $query->row;
    }
    public function getTotalRecords() {
        $query = $this->db->query("SELECT COUNT(*) as total FROM " . DB_PREFIX . "boardmembers");
        return $query->row['total'];
    }
  
    public function getAll($whereClause = '') {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "boardmembers");
        return $query->rows;
    }
    public function save($data) {
        $array_keys =implode(",", array_keys($data));
        $array_values = "'".implode("','", array_values($data))."'";
        $query = $this->db->query("INSERT INTO " . DB_PREFIX ."boardmembers (".$array_keys.") VALUES (".$array_values.")");
        $id=$this->db->getLastId();
        $fdata=$this->lastrecord($id);
        return $fdata;
    }
   
    public function Update($data, $id) {
        if (array_key_exists("id", $data)) {
            unset($data['id']);
        }
        $cols = [];
        $values = [];
        foreach ($data as $key => $val) {
            $cols[] = "$key = ?";
            $values[] = $val;
        }
        $query = "UPDATE " . DB_PREFIX . "boardmembers SET " . implode(', ', $cols) . " WHERE id = ?";
        $values[] = (int)$id; 
        $stmt = $this->db->prepare($query); 
        if ($stmt->execute($values)) {
            return $this->lastRecord($id);
        } else {
            throw new Exception("Failed to update record.");
        }
    }

    public function Delete($id) {
        $query = $this->db->query("DELETE FROM " . DB_PREFIX ."boardmembers WHERE id=".$id);
        return $id;
    }
}