<?php

require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\attributeDAO.php');
require_once(ROOT.'\src\main\model\attributeDTO.php');

class attributeService {

    private $attributeDAO;

    function __construct() {
        $this->attributeDAO = new attributeDAO();
    }

    public function findById($id) {
        $result = $this->attributeDAO->findById($id);
        return $result;
    }
    
    public function findAll() {
        $result = $this->attributeDAO->findAll();
        return $result;
    }

    // return type: Int (id category)
    public function save($attributeDTO) {
        $result = $this->attributeDAO->save($attributeDTO);
        return $result;
    }

    public function updateAttribute($attributeDTO) {
        return $this->attributeDAO->updateAttribute($attributeDTO);
    }

    public function deleteAttribute($id) {
        return $this->attributeDAO->deleteAttribute($id);
    }
}

?>
