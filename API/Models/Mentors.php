<?php
namespace Models;
use MVC\Model;
class ModelsMentors extends Model {
    public function lastrecord($id){
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "mentors WHERE id=".$id);
        return $query->row;
    }
    public function getTotalRecords() {
        $query = $this->db->query("SELECT COUNT(*) as total FROM " . DB_PREFIX . "mentors");
        return $query->row['total'];
    }
  
    public function getAll() {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "mentors");
        return $query->rows;
    }
    public function save($data) {
        $array_keys =implode(",", array_keys($data));
        $array_values = "'".implode("','", array_values($data))."'";
        $query = $this->db->query("INSERT INTO " . DB_PREFIX ."mentors (".$array_keys.") VALUES (".$array_values.")");
        $id=$this->db->getLastId();
        $fdata=$this->lastrecord($id);
        return $fdata;
    }
    public function Update($data,$id) {
        if(array_key_exists("id",$data))
        {
           unset($data['id']);
        }
        $cols = array();
        foreach ($data as $key => $val) {
            $cols[] = "$key = '$val'";
        }
        $query = $this->db->query("UPDATE " . DB_PREFIX . "mentors SET " . implode(', ', $cols) . " WHERE id=" . $id);
        $fdata = $this->lastrecord($id);
        return $fdata;
    }
    public function Delete($id) {
        $query = $this->db->query("DELETE FROM " . DB_PREFIX ."mentors WHERE id=".$id);
        return $id;
    }
}