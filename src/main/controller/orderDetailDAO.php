<?php 
require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\dbDAO.php');
require_once(ROOT.'\src\main\model\orderDetailDTO.php');

class orderDetailDAO extends dbDAO {
    public function findByOrderId($id){
        $sql = "SELECT * FROM chi_tiet_don_hang WHERE id_donhang = ?";
        return $this->read($sql,"i",$id);
    }
    public function createOrderDetail($orderDetailDTO){
        $sql = "INSERT INTO chi_tiet_don_hang(id_donhang,sku_id,so_luong) VALUES (?,?,?)";
        return $this->insert($sql,"iii",$orderDetailDTO->getId_donhang(),$orderDetailDTO->getId_sku(),$orderDetailDTO->getSo_luong());
    }
}
?>