<?php

// include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\dao\productDAO.php';
// include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\model\productDTO.php';
require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\productDAO.php');
require_once(ROOT.'\src\main\model\productDTO.php');
require_once(ROOT.'\src\main\dao\productVariantsDAO.php');

class productService {

    private $productDAO;
    private $productVariantsDAO;

    function __construct() {
        $this->productDAO = new productDAO();
        $this->productVariantsDAO = new productVariantsDAO();
    }

    public function findById($id) {
        $result = $this->productDAO->findById($id);
        return $result;
    }
    
    public function findAll($pageableDTO) {
        $result = $this->productDAO->findAll($pageableDTO);
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
        $result = $this->productDAO->deleteProduct($id);
        if($result) {
            $this->productVariantsDAO->delete_ProductVariant_ByProductId($id);
            $this->productVariantsDAO->delete_ProductVariantAttr_ByProductId($id);
        }
        return $result;
    }

    public function countRs($pageableDTO=null) {
        if($pageableDTO==null)
            return $this->productDAO->countRs();
        else
            return $this->productDAO->countRs($pageableDTO);
    }
}

?>
