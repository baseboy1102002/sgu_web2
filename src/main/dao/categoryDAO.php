<?php

require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\dbDAO.php');
require_once(ROOT.'\src\main\model\categoryDTO.php');

class categoryDAO extends dbDAO {

    public function findById($id) {
        $sql = "SELECT * FROM danh_muc WHERE id = ?";
        $result = $this->read($sql,"i",$id);
        return $result;
    }
    
    public function findAll() {
        $sql = "SELECT * FROM danh_muc";
        $result = $this->read($sql);
        return $result;
    }

    // return type: Int (id product)
    public function save($categoryDTO) {
        $sql = "INSERT INTO danh_muc (ten_danh_muc) VALUES (?)";
        $result = $this->insert($sql, "s" , $categoryDTO->getTen_danh_muc());
        return $result;
    }

    public function updateCategory($categoryDTO) {
        $sql = "UPDATE danh_muc SET ten_danh_muc=? WHERE id=?";
        $this->update($sql, "si", $categoryDTO->getTen_danh_muc());
    }

    public function deleteCategory($id) {
        $sql = "DELETE FROM danh_muc WHERE id=?";
        $this->update($sql, "i", $id);
    }
        
}

?>
