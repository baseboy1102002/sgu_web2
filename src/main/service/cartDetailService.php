<?php 
require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\cartDetailDAO.php');
require_once(ROOT.'\src\main\model\cartDetailDTO.php');

class cartDetailService {
    private $cartDetailDAO;
    function __construct()
    {
        $this->cartDetailDAO = new cartDetailDAO();
    }

    public function getAllByCartId($id){
        $result = $this->cartDetailDAO->getAllByCartId($id);
        return $result;
    }
    public function checkProductInCart($cartDetailDTO){
        $result = $this->cartDetailDAO->checkProductInCart($cartDetailDTO);
        return $result;
    }
    public function getQuantityInCart($id_sku){
        $result = $this->cartDetailDAO->getQuantityInCart($id_sku);
        return $result;
    }
    public function addToCart($cartDetailDTO){
        $result = $this->cartDetailDAO->addToCart($cartDetailDTO);
        return $result;
    }
    // public function increaseQuantity($cartDetailDTO){
    //     $result = $this->cartDetailDAO->increaseQuantity($cartDetailDTO);
    //     return $result;
    // }
    // public function decreaseQuantity($cartDetailDTO){
    //     $result = $this->cartDetailDAO->decreaseQuantity($cartDetailDTO);
    //     return $result;
    // }
    public function updateQuantity($cartDetailDTO){
        $result= $this->cartDetailDAO->updateQuantity($cartDetailDTO);
        return $result;
    }
    public function RemoveItemFromCart($cartDetailDTO){
        return $this->cartDetailDAO->RemoveItemFromCart($cartDetailDTO);
    }
}
?>