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
        if($result!=null) {
            $productVariantsDTO->setId($result);
            return $this->productVariantsDAO->save_Variant_Attr_Value($productVariantsDTO);
        } else return false;
    }

    public function updateProductVariant($productVariantsDTO) {
        $result = $this->productVariantsDAO->updateProductVariant($productVariantsDTO);
        if($result) {
            $this->productVariantsDAO->update_Variant_Attr_Value($productVariantsDTO);
        }
        return $result;
    }

    public function deleteProductVariant($sku_id) {
        $result =  $this->productVariantsDAO->deleteProductVariant($sku_id);
        if($result)
            $this->productVariantsDAO->deleteProductVariantAttr($sku_id);
        return $result;
    }

    public function countResults($pageableDTO=null) {
        if($pageableDTO==null)
            return $this->productVariantsDAO->countResults();
        else
            return $this->productVariantsDAO->countResults($pageableDTO);
    }
}

?>
