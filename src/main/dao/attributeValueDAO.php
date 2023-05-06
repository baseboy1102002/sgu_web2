<?php

require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\dbDAO.php');
require_once(ROOT.'\src\main\model\attributeValueDTO.php');

class attributeValueDAO extends dbDAO {

    public function findById($id) {
        $sql = "SELECT * FROM gia_tri_thuoc_tinh WHERE id = ?";
        $result = $this->read($sql,"i",$id);
        return $result;
    }
    
    public function findAll() {
        $sql = "SELECT * FROM gia_tri_thuoc_tinh";
        $result = $this->read($sql);
        return $result;
    }

    public function findAll_Atrr_Value_By_AttrId($id_thuoc_tinh) {
        $sql = "SELECT * FROM gia_tri_thuoc_tinh WHERE id_thuoc_tinh = ?";
        $result = $this->read($sql, "i", $id_thuoc_tinh);
        return $result;
    }

    // return type: Int (id product)
    public function save($attributeValueDTO) {
        $sql = "INSERT INTO gia_tri_thuoc_tinh (gia_tri, id_thuoc_tinh) VALUES (?, ?)";
        $result = $this->insert($sql, "si" , $attributeValueDTO->getTen_thuoc_tinh());
        return $result;
    }

    public function updateAttributeValue($attributeValueDTO) {
        $sql = "UPDATE gia_tri_thuoc_tinh SET gia_tri, id_thuoc_tinh=? WHERE id=?";
        $this->update($sql, "sii", $attributeValueDTO->getTen_thuoc_tinh());
    }

    public function deleteAttributeValue($id) {
        $sql = "DELETE FROM gia_tri_thuoc_tinh WHERE id=?";
        $this->update($sql, "i", $id);
    }
}

?>
