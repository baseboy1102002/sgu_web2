<?php
// require_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\service\categoryService.php';
require_once '../../../../config.php';
require_once (ROOT.'\src\main\service\categoryService.php');


class categoryAPI{

    private $categoryService;

    function __construct() {
        $this->categoryService = new categoryService();
    }

    public function getCategoryById($id) {
        $result = $this->categoryService->findById($id);
    
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            header('Content-Type: application/json');
            echo json_encode($row);
        } else {
            header('HTTP/1.0 404 Not Found');
        }
    }
    
    public function getAllCategory() {
        $result = $this->categoryService->findAll();
    
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
    //Code cua Chinh
    public function createCategory() {
        $data = json_decode(file_get_contents('php://input'), true);
        $categoryDTO = new categoryDTO();
        $categoryDTO->setTen_danh_muc($_POST['ten_danh_muc']);
        $categoryDTO->setIn_stock($_POST['in_stock']);
        $result = $this->categoryService->save($categoryDTO);

        if ($result!=null) {
            header('HTTP/1.0 201 Created');
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            header('HTTP/1.0 500 Internal Server Error');
        }
    }

    public function updateCategory($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        $categoryDTO = new categoryDTO();
        $categoryDTO->setId($id);
        $categoryDTO->setTen_danh_muc($_POST['ten_danh_muc']);
        $result = $this->categoryService->updateCategory($categoryDTO);

        if ($result) {
            header('HTTP/1.0 204 No Content');
            header('Content-Type: application/json');
            // echo json_encode($result);
        } else {
            header('HTTP/1.0 500 Internal Server Error');
        }
    }

    public function deleteCategory($id) {
        $result = $this->categoryService->deleteCategory($id);

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
$categoryAPI = new categoryAPI();
switch ($method) {
    // SELECT
    case 'GET':
        if (!empty($_GET['id'])) {
            $id = intval($_GET['id']);
            $categoryAPI->getCategoryById($id);
        }
        else {
            $categoryAPI->getAllCategory();
        }
        break;
    case 'POST':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $categoryAPI->updateCategory($id);
        }else
        // INSERT
        $categoryAPI->createCategory();
        break;
    case 'PUT':
        // UPDATE
        break;
    case 'DELETE':
        // Delete
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $categoryAPI->deleteCategory($id);
        }
        break;
}

?>
