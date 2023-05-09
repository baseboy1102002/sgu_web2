<?php

require_once '../../../../config.php';
require_once (ROOT.'\src\main\service\permissionService.php');


class permissionAPI{

    private $permissionService;

    function __construct() {
        $this->permissionService = new permissionService();
    }

    public function get_Permission_Detail_ById($id) {
        $result = $this->permissionService->findById($id);
    
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
    
    public function getAllPermission() {
        $result = $this->permissionService->findAll();
    
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
    public function createPermission() {
        $data = json_decode(file_get_contents('php://input'), true);
        $permissionDTO = new permissionDTO();
        $permissionDTO->setTen_nhom_quyen($data['ten_nhom_quyen']);
        $permissionDTO->setId_chuc_nang($data['id_chuc_nang']);
        $permissionDTO->setRead($data['is_read']);
        $permissionDTO->setInsert($data['is_insert']);
        $permissionDTO->setUpdate($data['is_update']);
        $permissionDTO->setDelete($data['is_delete']);
        $result = $this->permissionService->save($permissionDTO);

        if ($result) {
            header('HTTP/1.0 201 Created');
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            header('HTTP/1.0 500 Internal Server Error');
        }
    }

    public function updatePermission($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        $permissionDTO = new permissionDTO();
        $permissionDTO->setId($id);
        $permissionDTO->setTen_nhom_quyen($data['ten_nhom_quyen']);
        $permissionDTO->setId_chuc_nang($data['id_chuc_nang']);
        $permissionDTO->setRead($data['is_read']);
        $permissionDTO->setInsert($data['is_insert']);
        $permissionDTO->setUpdate($data['is_update']);
        $permissionDTO->setDelete($data['is_delete']);
        $result = $this->permissionService->updatePermission($permissionDTO);
        if ($result) {
            header('HTTP/1.0 204 No Content');
            header('Content-Type: application/json');
            // echo json_encode($result);
        } else {
            header('HTTP/1.0 500 Internal Server Error');
        }
    }

    public function deletePermission($id) {
        $result = $this->permissionService->deletePermission($id);

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
$permissionAPI = new permissionAPI();
switch ($method) {
    // SELECT
    case 'GET':
        if (!empty($_GET['id'])) {
            $id = intval($_GET['id']);
            $permissionAPI->get_Permission_Detail_ById($id);
        }
        else {
            $permissionAPI->getAllPermission();
        }
        break;
    case 'POST':
        // INSERT
        $permissionAPI->createPermission();
        break;
    case 'PUT':
        // UPDATE
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $permissionAPI->updatePermission($id);
        }
        break;
    case 'DELETE':
        // Delete
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $permissionAPI->deletePermission($id);
        }
        break;
}

?>
