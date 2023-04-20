<?php

// include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\dao\productVariantsDAO.php';
// include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\model\productVariantsDTO.php';
require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\productVariantsDAO.php');
require_once(ROOT.'\src\main\model\productVariantsDTO.php');

class productVariantsService {

    private $productVariantsDAO;

    function __construct() {
        $this->productVariantsDAO = new productVariantsDAO();
    }

    public function findById($id) {
        $result = $this->productVariantsDAO->findById($id);
        return $result;
    }
    
    public function findAll($pageableDTO) {
        return $this->productVariantsDAO->findAll($pageableDTO);
    }

    public function findAllVariantsByProductId($product_id) {
        $result = $this->productVariantsDAO->findAllVariantsByProductId($product_id);
        return $result;
    }

    // return type: Int (id product)
    public function save($productVariantsDTO) {
        $result = $this->productVariantsDAO->save($productVariantsDTO);
        return $result;
    }

    public function updateProductVariant($productVariantsDTO) {
        return $this->productVariantsDAO->updateProductVariant($productVariantsDTO);
    }

    public function deleteProductVariant($sku_id) {
        return $this->productVariantsDAO->deleteProductVariant($sku_id);
    }

    public function countResults($pageableDTO=null) {
        if($pageableDTO==null) return $this->productVariantsDAO->countResults();
        else return $this->productVariantsDAO->countResults($pageableDTO);
    }
}

?>
