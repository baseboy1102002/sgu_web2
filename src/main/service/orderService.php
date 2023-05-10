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
    public function findByAccountId($id){
        return $this->orderDAO->findByAccountId($id);
    }
    public function findAll(){
        return $this->orderDAO->findAll();
    }
    public function findAllByDate($sDate, $eDate){
        return $this->orderDAO->findAllByDate($sDate, $eDate);
    }
    public function createOrder($orderDTO){
        return $this->orderDAO->createOrder($orderDTO);
    }
    public function onStatus($id){
        return $this->orderDAO->OnStatus($id);
    }


// orderDetail

    public function findDetailByOrderId($id){
        return $this->orderDetailDAO->findByOrderId($id);
    }
    public function createOrderDetail($orderDetailDTO){
        return $this->orderDetailDAO->createOrderDetail($orderDetailDTO);
    }
    public function countProductSold($filter){
        return $this->orderDetailDAO->countProductSold($filter);
    }

}
?>