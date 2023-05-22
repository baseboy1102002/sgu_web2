<?php

require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\dbDAO.php');
require_once(ROOT.'\src\main\model\permissionDTO.php');

class permissionDAO extends dbDAO {

    public function findById($id) {
        $sql = "SELECT ctq.* FROM nhom_quyen as nq INNER JOIN chi_tiet_quyen as ctq ON nq.id = ctq.id_nhom_quyen WHERE nq.id = ?";
        $result = $this->read($sql,"i",$id);
        return $result;
    }
    
    public function findAll() {
        $sql = "SELECT * FROM nhom_quyen";
        $result = $this->read($sql);
        return $result;
    }

    public function save($permissionDTO) {
        $sql = "INSERT INTO nhom_quyen (ten_nhom_quyen) VALUES (?)";
        $result = $this->insert($sql, "s" , $permissionDTO->getTen_nhom_quyen());
        return $result;
    }

    public function save_Permission_Feature($permissionDTO) {
        $arr_id_chuc_nang = $permissionDTO->getId_chuc_nang();
        $arr_read = $permissionDTO->getRead();
        $arr_insert = $permissionDTO->getInsert();
        $arr_update = $permissionDTO->getUpdate();
        $arr_delete = $permissionDTO->getDelete();

        $sql = "INSERT INTO chi_tiet_quyen (id_nhom_quyen, id_chuc_nang, is_insert, is_update, is_delete, is_read) VAlUES (?,?,?,?,?,?)";
        $sql .= str_repeat(",(?,?,?,?,?,?)", count($arr_id_chuc_nang)-1);
        $type = "".str_repeat("i", count($arr_id_chuc_nang) * 6);
        $params = array();
        for ($i=0; $i<count($arr_id_chuc_nang); $i++) {
            $params[] = $permissionDTO->getId();
            $params[] = $arr_id_chuc_nang[$i];
            $params[] = $arr_insert[$i];
            $params[] = $arr_update[$i];
            $params[] = $arr_delete[$i];
            $params[] = $arr_read[$i];
        }   
        $result = $this->update($sql, $type, ...$params);
        return $result;
    }

    public function updatePermission($permissionDTO) {
        $sql = "UPDATE nhom_quyen SET ten_nhom_quyen=? WHERE id=?";
        $this->update2($sql, "si", $permissionDTO->getTen_nhom_quyen(), $permissionDTO->getId());
    }

    public function update_Permission_Feature($permissionDTO) {
        $arr_id_chuc_nang = $permissionDTO->getId_chuc_nang();
        $arr_read = $permissionDTO->getRead();
        $arr_insert = $permissionDTO->getInsert();
        $arr_update = $permissionDTO->getUpdate();
        $arr_delete = $permissionDTO->getDelete();

        $sql = "INSERT INTO chi_tiet_quyen (id_nhom_quyen, id_chuc_nang, is_insert, is_update, is_delete, is_read) VAlUES (?,?,?,?,?,?)";
        $sql .= str_repeat(",(?,?,?,?,?,?)", count($arr_id_chuc_nang)-1);
        $sql .= " ON DUPLICATE KEY UPDATE is_insert=VALUES(is_insert), is_update = VALUES(is_update), is_delete = VALUES(is_delete), is_read = VALUES(is_read)";
        $type = "".str_repeat("i", count($arr_id_chuc_nang) * 6);
        $params = array();
        for ($i=0; $i<count($arr_id_chuc_nang); $i++) {
            $params[] = $permissionDTO->getId();
            $params[] = $arr_id_chuc_nang[$i];
            $params[] = $arr_insert[$i];
            $params[] = $arr_update[$i];
            $params[] = $arr_delete[$i];
            $params[] = $arr_read[$i];
        }
        return $this->update2($sql, $type, ...$params);
    }

    public function deletePermission($id) {
        $sql = "DELETE FROM nhom_quyen WHERE id=?";
        return $this->update2($sql, "i", $id);
    }

    public function delete_Permission_Feature($id_nhom_quyen) {
        $sql = "DELETE FROM chi_tiet_quyen WHERE id_nhom_quyen=?";
        return $this->update2($sql, "i", $id_nhom_quyen);
    }
        
}

?>
