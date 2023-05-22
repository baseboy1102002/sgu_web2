<?php

require_once '../../../../config.php';
require_once (ROOT.'\src\main\service\attributeService.php');

class attributeAPI{

    private $attributeService;

    function __construct() {
        $this->attributeService = new attributeService();
    }

    public function getAttributeById($id) {
        $result = $this->attributeService->findById($id);
    
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            header('Content-Type: application/json');
            echo json_encode($row);
        } else {
            header('HTTP/1.0 404 Not Found');
        }
    }
    
    public function getAllAttribute() {
        $result = $this->attributeService->findAll();
    
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
    public function createAttribute() {
        $data = json_decode(file_get_contents('php://input'), true);
        $attributeDTO = new attributeDTO();
        $attributeDTO->setTen_thuoc_tinh($data['ten_thuoc_tinh']);
        $result = $this->attributeService->save($attributeDTO);

        if ($result!=null) {
            header('HTTP/1.0 201 Created');
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            header('HTTP/1.0 500 Internal Server Error');
        }
    }

    public function updateAttribute($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        $attributeDTO = new attributeDTO();
        $attributeDTO->setId($id);
        $attributeDTO->setTen_thuoc_tinh($data['ten_thuoc_tinh']);
        $result = $this->attributeService->updateAttribute($attributeDTO);

        if ($result) {
            header('HTTP/1.0 204 No Content');
            header('Content-Type: application/json');
            // echo json_encode($result);
        } else {
            header('HTTP/1.0 500 Internal Server Error');
        }
    }

    public function deleteAttribute($id) {
        $result = $this->attributeService->deleteAttribute($id);

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
$attributeAPI = new attributeAPI();
switch ($method) {
    // SELECT
    case 'GET':
        if (!empty($_GET['id'])) {
            $id = intval($_GET['id']);
            $attributeAPI->getAttributeById($id);
        }
        else {
            $attributeAPI->getAllAttribute();
        }
        break;
    case 'POST':
        // INSERT
        $attributeAPI->createAttribute();
        break;
    case 'PUT':
        // UPDATE
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $attributeAPI->updateAttribute($id);
        }
        break;
    case 'DELETE':
        // Delete
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $attributeAPI->deleteAttribute($id);
        }
        break;
}

?>
