<?php

require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\categoryDAO.php');
require_once(ROOT.'\src\main\dao\productDAO.php');
require_once(ROOT.'\src\main\dao\productVariantsDAO.php');
require_once(ROOT.'\src\main\model\categoryDTO.php');

class categoryService {

    private $categoryDAO;
    private $productDAO;
    private $productVariantsDAO;

    function __construct() {
        $this->categoryDAO = new categoryDAO();
        $this->productDAO = new productDAO();
        $this->productVariantsDAO = new productVariantsDAO();
    }

    public function findById($id) {
        $result = $this->categoryDAO->findById($id);
        return $result;
    }
    
    public function findAll() {
        $result = $this->categoryDAO->findAll();
        return $result;
    }

    // return type: Int (id category)
    public function save($categoryDTO) {
        $result = $this->categoryDAO->save($categoryDTO);
        return $result;
    }

    public function updatecategory($categoryDTO) {
        return $this->categoryDAO->updatecategory($categoryDTO);
    }
    //code cua Chinh
    public function deletecategory($id) {
        if($this->categoryDAO->deletecategory($id)){
            $rs1 = $this->productDAO->deleteProductByCategoryId($id);
            $rs2 = $this->productVariantsDAO->delete_ProductVariant_ByCategoryId($id);
            $rs3 = $this->productVariantsDAO->delete_ProductVariantAttr_ByCategoryId($id);
            }
        return true;
        return false;
    }
}

?>
