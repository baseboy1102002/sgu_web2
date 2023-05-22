<?php

require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\dbDAO.php');
require_once(ROOT.'\src\main\model\attributeDTO.php');

class attributeDAO extends dbDAO {

    public function findById($id) {
        $sql = "SELECT * FROM thuoc_tinh WHERE id = ?";
        $result = $this->read($sql,"i",$id);
        return $result;
    }
    
    public function findAll() {
        $sql = "SELECT * FROM thuoc_tinh WHERE is_delete != 1";
        $result = $this->read($sql);
        return $result;
    }

    // return type: Int (id product)
    public function save($attributeDTO) {
        $sql = "INSERT INTO thuoc_tinh (ten_thuoc_tinh) VALUES (?)";
        $result = $this->insert($sql, "s" , $attributeDTO->getTen_thuoc_tinh());
        return $result;
    }

    public function updateAttribute($attributeDTO) {
        $sql = "UPDATE thuoc_tinh SET ten_thuoc_tinh=? WHERE id=?";
        $this->update2($sql, "si", $attributeDTO->getTen_thuoc_tinh(), $attributeDTO->getId());
    }

    public function deleteAttribute($id) {
        $sql = "UPDATE thuoc_tinh SET is_delete = 1 WHERE id=?";
        $this->update($sql, "i", $id);
    }
}

?>
