<?php

require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\categoryDAO.php');
require_once(ROOT.'\src\main\model\categoryDTO.php');

class categoryService {

    private $categoryDAO;

    function __construct() {
        $this->categoryDAO = new categoryDAO();
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

    public function deletecategory($id) {
        return $this->categoryDAO->deletecategory($id);
    }
}

?>
