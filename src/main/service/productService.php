<?php

// include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\dao\productDAO.php';
// include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\model\productDTO.php';
require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\productDAO.php');
require_once(ROOT.'\src\main\model\productDTO.php');

class productService {

    private $productDAO;

    function __construct() {
        $this->productDAO = new productDAO();
    }

    public function findById($id) {
        $result = $this->productDAO->findById($id);
        return $result;
    }
    
    public function findAll() {
        $result = $this->productDAO->findAll();
        return $result;
    }

    // return type: Int (id product)
    public function save($productDTO) {
        $result = $this->productDAO->save($productDTO);
        return $result;
    }

    public function updateProduct($productDTO) {
        return $this->productDAO->updateProduct($productDTO);
    }

    public function deleteProduct($id) {
        return $this->productDAO->deleteProduct($id);
    }
}

?>
