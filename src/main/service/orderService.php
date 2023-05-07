<?php 
require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\orderDAO.php');
require_once(ROOT.'\src\main\model\orderDTO.php');
require_once(ROOT.'\src\main\dao\orderDetailDAO.php');
require_once(ROOT.'\src\main\model\orderDetailDTO.php');
class orderService{
    private $orderDAO;
    private $orderDetailDAO;
    function __construct(){
        $this->orderDAO = new orderDAO();
        $this->orderDetailDAO = new orderDetailDAO();
    }
    public function findById($id){
        return $this->orderDAO->findById($id);
    }
    public function findAll(){
        return $this->orderDAO->findAll();
    }
    public function createOrder($orderDTO){
        return $this->orderDAO->createOrder($orderDTO);
    }
    public function onStatus($id){
        return $this->orderDAO->OnStatus($id);
    }
    public function createOrderDetail($orderDetailDTO){
        return $this->orderDetailDAO->createOrderDetail($orderDetailDTO);
    }

}
?>