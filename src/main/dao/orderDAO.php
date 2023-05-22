<?php 
require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\dbDAO.php');
require_once(ROOT.'\src\main\model\orderDTO.php');

class orderDAO extends dbDAO{
    public function findById($id){
        $sql = "SELECT * FROM don_hang WHERE id = ?";
        return $this->read($sql,"i",$id);
    }
    public function findAll(){
        $sql = "SELECT * FROM don_hang";
        return $this->read($sql);
    }
    public function findAllByDate($sDate, $eDate){
        $sql="SELECT * FROM don_hang WHERE DATE(created_date) BETWEEN ? AND ?";
        return $this->read($sql,"ss",$sDate,$eDate);
    }
    public function findByAccountId($id){
        $sql="SELECT * FROM don_hang WHERE id_tk=?";
        return $this->read($sql,"s",$id);
    }
    public function createOrder($orderDTO){
        $sql = "INSERT INTO don_hang(id_tk,created_date,ten_nguoi_nhan,dia_chi,sdt,tong_tien,status) VALUES(?,?,?,?,?,?,?)";
        return $this->insert($sql,"issssdi",$orderDTO->getId_tk(),$orderDTO->getCreated_date(),$orderDTO->getTen_nguoi_nhan(),$orderDTO->getDia_chi(),$orderDTO->getSdt(),$orderDTO->getTong_tien(),0);
        
    }
    public function OnStatus($id){
        $sql = "UPDATE don_hang SET status = 1 WHERE id = ?";
        return $this->update($sql,"i",$id);
    }
}
?>