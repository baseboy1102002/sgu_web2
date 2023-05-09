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
        $sql = "SELECT * FROM gia_tri_thuoc_tinh WHERE is_delete != 1";
        $result = $this->read($sql);
        return $result;
    }

    public function findAll_Atrr_Value_By_AttrId($id_thuoc_tinh) {
        $sql = "SELECT * FROM gia_tri_thuoc_tinh WHERE id_thuoc_tinh = ? AND is_delete != 1";
        $result = $this->read($sql, "i", $id_thuoc_tinh);
        return $result;
    }

    // return type: Int (id product)
    public function save($attributeValueDTO) {
        // $sql = "INSERT INTO gia_tri_thuoc_tinh (gia_tri, id_thuoc_tinh) VALUES (?, ?)";
        // $result = $this->insert($sql, "si" , $attributeValueDTO->getTen_thuoc_tinh());
        // return $result;
        $arr_gt = $attributeValueDTO->getGia_tri();
        $sql = "INSERT INTO gia_tri_thuoc_tinh (gia_tri, id_thuoc_tinh) VALUES (?,?)";
        if(count($arr_gt)>1) {
            $sql .= str_repeat(",(?,?)", count($arr_gt)-1);
        }
        $type = "".str_repeat("si", count($arr_gt));
        $params = array();
        for ($i=0; $i<count($arr_gt); $i++) {
            $params[] = $arr_gt[$i];
            $params[] = $attributeValueDTO->getId_thuoc_tinh();
        }
        return $this->insert($sql, $type, ...$params);
    }

    public function updateAttributeValue($attributeValueDTO) {
        $arr_id = $attributeValueDTO->getIds();
        $arr_gt = $attributeValueDTO->getGia_tri();
        $del_id = array();
        for ($i=0; $i<count($arr_id); $i++) {
            if(strcmp($arr_id[$i], "DEFAULT")!=0)
                $del_id[] = $arr_id[$i];
        }
        if(count($del_id)>0) {
            $sql1 = "UPDATE gia_tri_thuoc_tinh SET is_delete=1 WHERE id_thuoc_tinh=? AND id NOT IN (?";
            if(count($del_id)>1)
                $sql1 .= str_repeat(",?", count($del_id)-1);
            $sql1 .= ")";
            $type1 = "i".str_repeat("i", count($del_id));
            $this->update($sql1, $type1, $attributeValueDTO->getId_thuoc_tinh(), ...$del_id);
        } else {
            $sql1 = "UPDATE gia_tri_thuoc_tinh SET is_delete=1 WHERE id_thuoc_tinh=?";
            $this->update($sql1, "i", $attributeValueDTO->getId_thuoc_tinh());
        }


        $sql = "INSERT INTO gia_tri_thuoc_tinh (id, gia_tri, id_thuoc_tinh) VALUES (?,?,?)";
        if(count($arr_gt)>1) {
            $sql .= str_repeat(",(?,?,?)", count($arr_gt)-1);
        }
        $sql .= " ON DUPLICATE KEY UPDATE gia_tri = VALUES(gia_tri), id_thuoc_tinh = VALUES(id_thuoc_tinh)";
        $type = "".str_repeat("isi", count($arr_gt));
        $params = array();
        for ($i=0; $i<count($arr_gt); $i++) {
            $params[] = intval($arr_id[$i]);
            $params[] = $arr_gt[$i];
            $params[] = $attributeValueDTO->getId_thuoc_tinh();
        }
        return $this->update2($sql, $type, ...$params);
    }

    public function deleteAttributeValue($id) {
        $sql = "UPDATE FROM gia_tri_thuoc_tinh  SET is_delete=1 WHERE id=?";
        $this->update($sql, "i", $id);
    }
}

?>
