<?php


// require_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\service\productService.php'; 
require_once '../../../../config.php';
require_once (ROOT.'\src\main\service\categoryService.php');

class productAPI{

    private $productService;

    function __construct() {
        $this->productService = new productService();
    }

    public function getProductById($id) {
        $result = $this->productService->findById($id);
    
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            header('Content-Type: application/json');
            echo json_encode($row);
        } else {
            header('HTTP/1.0 404 Not Found');
        }
    }
    
    public function getAllProduct() {
        $result = $this->productService->findAll();
    
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
    public function createProduct() {
        $data = json_decode(file_get_contents('php://input'), true);
        $productDTO = new productDTO();
        $productDTO->setTen_sp($data['ten_sp']);
        $productDTO->setDescription($data['description']);
        $productDTO->setImg_path($data['img_path']);
        $productDTO->setIn_stock($data['in_stock']);
        $productDTO->setIDdanhmuc($data['id_danh_muc']);
        $result = $this->productService->save($productDTO);

        if ($result!=null) {
            header('HTTP/1.0 201 Created');
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            header('HTTP/1.0 500 Internal Server Error');
        }
    }

    public function updateProduct($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        $productDTO = new productDTO();
        $productDTO->setId($id);
        $productDTO->setTen_sp($data['ten_sp']);
        $productDTO->setDescription($data['description']);
        $productDTO->setImg_path($data['img_path']);
        $productDTO->setIn_stock($data['in_stock']);
        $productDTO->setIDdanhmuc($data['id_danh_muc']);
        $result = $this->productService->updateProduct($productDTO);

        if ($result) {
            header('HTTP/1.0 204 No Content');
            header('Content-Type: application/json');
            // echo json_encode($result);
        } else {
            header('HTTP/1.0 500 Internal Server Error');
        }
    }

    public function deleteProduct($id) {
        $result = $this->productService->deleteProduct($id);

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
$productAPI = new productAPI();
switch ($method) {
    // SELECT
    case 'GET':
        if (!empty($_GET['id'])) {
            $id = intval($_GET['id']);
            $productAPI->getProductById($id);
        }
        else {
            $productAPI->getAllProduct();
        }
        break;
    case 'POST':
        // INSERT
        $productAPI->createProduct();
        break;
    case 'PUT':
        // UPDATE
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $productAPI->updateProduct($id);
        }
        break;
    case 'DELETE':
        // Delete
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $productAPI->deleteProduct($id);
        }
        break;
}

// Define the functions for each HTTP method
// function getProduct($id) {
//     global $DBConn;
//     $sql = "SELECT * FROM products WHERE id = ?";
//     $result = $DBConn->read($sql,$id);

//     if ($result->num_rows > 0) {
//         $row = $result->fetch_assoc();
//         header('Content-Type: application/json');
//         echo json_encode($row);
//     } else {
//         header('HTTP/1.0 404 Not Found');
//     }
// }

// function getProducts() {
//     global $DBConn;
//     $sql = "SELECT * FROM products";
//     $result = $DBConn->read($sql);

//     if ($result->num_rows > 0) {
//         $rows = array();
//         while ($row = $result->fetch_assoc()) {
//             $rows[] = $row;
//         }
//         header('Content-Type: application/json');
//         echo json_encode($rows);
//     } else {
//         header('HTTP/1.0 404 Not Found');
//     }
// }

// function createProduct() {
//     global $DBConn;
//     $data = json_decode(file_get_contents('php://input'), true);
//     $name = $data['name'];
//     $price = $data['price'];
//     $status = $data['status'];

//     $sql = "INSERT INTO products (name, price, status) VALUES (?, ?, ?)";
//     $result = $DBConn->create($sql, "sii" , $name, $price, $status);

//     if ($result) {
//         header('HTTP/1.0 201 Created');
//         header('Content-Type: application/json');
//         echo json_encode(array('id' => $DBConn->getConnection()->insert_id));
//     } else {
//         header('HTTP/1.0 500 Internal Server Error');
//     }
// }

// function updateProduct($id) {
//     global $db;
//     $data = json_decode(file_get_contents('php://input'), true);
//     $name = $data['name'];
//     $description = $data['description'];
//     $price = $data['price'];

//     $sql = "UPDATE products SET name='$name', description='$description', price=$price WHERE id=$id";
//     $result = $db->query($sql);

//     if ($result) {
//         header('HTTP/1.0 204 No Content');
//     } else {
//         header('HTTP/1.0 500 Internal Server Error');
//     }    
// }

// function deleteProduct($id) {
//     global $db;
//     $sql = "DELETE FROM products WHERE id=$id";
//     $result = $db->query($sql);
//     if ($result) {
//         header('HTTP/1.0 204 No Content');
//     } else {
//         header('HTTP/1.0 500 Internal Server Error');
//     }
// }

?>
