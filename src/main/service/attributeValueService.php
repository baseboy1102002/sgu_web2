<?php

require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\attributeValueDAO.php');
require_once(ROOT.'\src\main\model\attributeValueDTO.php');

class attributeValueService {

    private $attributeValueDAO;

    function __construct() {
        $this->attributeValueDAO = new attributeValueDAO();
    }

    public function findById($id) {
        $result = $this->attributeValueDAO->findById($id);
        return $result;
    }
    
    public function findAll() {
        $result = $this->attributeValueDAO->findAll();
        return $result;
    }

    public function findAll_Atrr_Value_By_AttrId($id_thuoc_tinh) {
        return $this->attributeValueDAO->findAll_Atrr_Value_By_AttrId($id_thuoc_tinh);
    }

    // return type: Int (id category)
    public function save($attributeValueDTO) {
        $result = $this->attributeValueDAO->save($attributeValueDTO);
        return $result;
    }

    public function updateAttributeValue($attributeValueDTO) {
        return $this->attributeValueDAO->updateAttributeValue($attributeValueDTO);
    }

    public function deleteAttributeValue($id) {
        return $this->attributeValueDAO->deleteAttributeValue($id);
    }
}

?>
