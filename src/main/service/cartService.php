<?php 
require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\cartDAO.php');
require_once(ROOT.'\src\main\model\cartDTO.php');

class cartService {
    private $cartDAO;
    function __construct()
    {
        $this->cartDAO = new cartDAO();
    }

    public function getById(){
        $result = $this->cartDAO->getById();
        return $result;
    }
    public function createCart(){
        $result = $this->cartDAO->createCart();
        return $result;
    }
    public function deleteCart($id){
        $result= $this->cartDAO->deleteCart($id);
        return $result;
    }
}
?>