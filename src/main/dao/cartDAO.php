<?php 
    require_once '../../../../config.php';
    require_once(ROOT.'\src\main\dao\dbDAO.php');
    require_once(ROOT.'\src\main\model\cartDTO.php');
    class CartDAO extends dbDAO{
        public function getById(){
            session_start();
            $sql="SELECT * FROM gio_hang where id_tk=?";
            $result=$this->read($sql,"i",$_SESSION['account_id']);
            return $result;
        }
        public function createCart(){
            $sql="INSERT INTO gio_hang(id_tk) VALUES (?)";
            $result=$this->insert($sql,"i",$_SESSION['account_id']);
            return $result;
        }
        public function deleteCart($id){
            $sql="DELETE FROM `gio_hang` WHERE id = ?";
            $result= $this->update($sql,"i",$id);
            return $result;
        }
    }
?>