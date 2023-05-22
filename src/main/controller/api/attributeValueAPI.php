<?php

require_once '../../../../config.php';
require_once (ROOT.'\src\main\service\attributeValueService.php');

class attributeValueAPI{

    private $attributeValueService;

    function __construct() {
        $this->attributeValueService = new attributeValueService();
    }

    public function get_Attribute_Value_ById($id) {
        $result = $this->attributeValueService->findById($id);
    
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            header('Content-Type: application/json');
            echo json_encode($row);
        } else {
            header('HTTP/1.0 404 Not Found');
        }
    }
    
    public function getAll_Attribute_Value() {
        $result = $this->attributeValueService->findAll();
    
        if ($result->num_rows > 0) {
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($rows);
        } else {
            header('HTTP/1.0 404 Not Found');
        }
    }

    function getAll_Attr_Value_By_AttrId($id_thuoc_tinh) {
        $result = $this->attributeValueService->findAll_Atrr_Value_By_AttrId($id_thuoc_tinh);

        if ($result->num_rows > 0) {
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($rows);
        } else {
            header('HTTP/1.0 404 Not Found');
        }
    }

    // return type: Int (id product)
    public function create_Attribute_Value() {
        $data = json_decode(file_get_contents('php://input'), true);
        $attributeValueDTO = new attributeValueDTO();
        $attributeValueDTO->setGia_tri($data['gia_tri']);
        $attributeValueDTO->setId_thuoc_tinh($data['id_thuoc_tinh']);
        $result = $this->attributeValueService->save($attributeValueDTO);

        if ($result!=null) {
            header('HTTP/1.0 201 Created');
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            header('HTTP/1.0 500 Internal Server Error');
        }
    }

    public function update_Attribute_Value() {
        $data = json_decode(file_get_contents('php://input'), true);
        $attributeValueDTO = new attributeValueDTO();
        $attributeValueDTO->setIds($data['id_gia_tri']);
        $attributeValueDTO->setGia_tri($data['gia_tri']);
        $attributeValueDTO->setId_thuoc_tinh($data['id_thuoc_tinh']);
        $result = $this->attributeValueService->updateAttributeValue($attributeValueDTO);

        if ($result) {
            header('HTTP/1.0 204 No Content');
            header('Content-Type: application/json');
            // echo json_encode($result);
        } else {
            header('HTTP/1.0 500 Internal Server Error');
        }
    }

    public function deleteAttributeValue($id) {
        $result = $this->attributeValueService->deleteAttributeValue($id);

        if ($result) {
            header('HTTP/1.0 204 No Content');
            header('Content-Type: application/json');
            // echo json_encode($result);
        } else {
            header('HTTP/1.0 500 Internal Server Error');
        }
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$attributeValueAPI = new attributeValueAPI();
switch ($method) {
    // SELECT
    case 'GET':
        if (!empty($_GET['id'])) {
            $id = intval($_GET['id']);
            $attributeValueAPI->get_Attribute_Value_ById($id);
        }
        else if (isset($_GET['id_thuoc_tinh'])) {
            $id_thuoc_tinh = intval($_GET['id_thuoc_tinh']);
            $attributeValueAPI->getAll_Attr_Value_By_AttrId($id_thuoc_tinh);
        }
        else {
            $attributeValueAPI->getAll_Attribute_Value();
        }
        break;
    case 'POST':
        // INSERT
        $attributeValueAPI->create_Attribute_Value();
        break;
    case 'PUT':
        // UPDATE
        // if (isset($_GET['id'])) {
        //     $id = intval($_GET['id']);
        //     $attributeValueAPI->update_Attribute_Value($id);
        // }
        $attributeValueAPI->update_Attribute_Value();
        break;
    case 'DELETE':
        // Delete
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $attributeValueAPI->deleteAttributeValue($id);
        }
        break;
}

?>
