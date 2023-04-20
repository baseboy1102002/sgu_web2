<?php

// include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\dao\dbDAO.php';
// include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\model\categoryDTO.php';
require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\dbDAO.php');
require_once(ROOT.'\src\main\model\categoryDTO.php');

class categoryDAO extends dbDAO {

    public function findById($id) {
        $sql = "SELECT * FROM category WHERE id = ?";
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
        $sql = "INSERT INTO category (ten_danh_muc) VALUES (?)";
        $result = $this->insert($sql, "s" , $categoryDTO->getName());
        return $result;
    }

    public function updateCategory($categoryDTO) {
        $sql = "UPDATE category SET name=? WHERE id=?";
        $this->update($sql, "si", $categoryDTO->getName());
    }

    public function deleteCategory($id) {
        $sql = "DELETE FROM category WHERE id=?";
        $this->update($sql, "i", $id);
    }
        
}

?>
