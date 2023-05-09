<?php


// require_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\service\productService.php'; 
require_once '../../../../config.php';
require_once (ROOT.'\src\main\service\productService.php');

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
        $pageableDTO = new pageableDTO();
        $pageableDTO->setPage($_GET['page']);
        $pageableDTO->setItemPerPage($_GET['itemPerPage']);
        $pageableDTO->setCategoryId($_GET['categoryId']);
        $pageableDTO->setKey_words($_GET['keyword']);

        $result = $this->productService->findAll($pageableDTO);
        if($pageableDTO->hasAnyFilter())
            $countRs = $this->productService->countRs($pageableDTO);
        else
            $countRs = $this->productService->countRs();
    
        if ($result->num_rows > 0) {
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            $count = intval($countRs->fetch_array()[0]);
            $response = array(
                'products'=>$rows,
                'count'=>$count
            );
            header('Content-Type: application/json');
            echo json_encode($response);
        } else {
            header('HTTP/1.0 404 Not Found');
        }
    }

    // return type: Int (id product)
    public function createProduct() {
        
        $check_file = true;
        
        if (isset($_FILES['image'])) {
            $file = $_FILES['image'];

            if ($file['error'] !== UPLOAD_ERR_OK) {
                // Handle the upload error
                echo 'Upload failed with error code ' . $file['error'];
                $check_file = false;
            }
            
            // Check if the file is an image and has an allowed extension
            $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];
            $file_extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            if (!in_array($file_extension, $allowed_extensions)) {
                // Error: Invalid file extension
                echo 'Error: Invalid file extension';
                $check_file = false;
            }
            
            // Generate a unique name for the uploaded file
            $file_name = uniqid() . '.' . $file_extension;
            
            // Move the uploaded file to the designated folder
            $upload_dir = '../../../uploads/';
            $imageName = basename($_FILES['image']['name']);
            // if (!is_dir($upload_dir)) {
            //     mkdir($upload_dir, 0777, true);
            // }
            if (file_exists($upload_dir . $imageName)) {
                // file already exists
                echo "Sorry, file already exists";
                $check_file = false;
            }

            if ($check_file==true) {
                if (!move_uploaded_file($file['tmp_name'], $upload_dir . $file_name)) {
                    // Error: Failed to move the uploaded file
                    echo 'Error: Failed to move the uploaded file';
                    $check_file = false;
                }
            }
            $product_image = $file_name;
        } else {
            // No file was uploaded
            $product_image = 'default.jpg';
        }

        if($check_file==true) {
            $productDTO = new productDTO();
            $date = date('Y-m-d H:i:s', time());
            $productDTO->setTen_sp($_POST['ten_sp']);
            $productDTO->setDescription($_POST['description']);
            $productDTO->setImg_path($product_image);
            $productDTO->setIn_stock($_POST['in_stock']);
            $productDTO->setIDdanhmuc($_POST['id_danh_muc']);
            $productDTO->setCreated_date($date);
            $productDTO->setModified_date($date);
            $result = $this->productService->save($productDTO);

            if ($result!=null) {
                header('HTTP/1.0 201 Created');
                header('Content-Type: application/json');
                echo json_encode($result);
            } else {
                header('HTTP/1.0 500 Internal Server Error');
            }
        } else {
            header('HTTP/1.0 500 Internal Server Error');
        }
        
    }

    public function updateProduct($id) {
        
        $check_file = true;
        
        if (isset($_FILES['image'])) {
            $file = $_FILES['image'];

            if ($file['error'] !== UPLOAD_ERR_OK) {
                // Handle the upload error
                echo 'Upload failed with error code ' . $file['error'];
                $check_file = false;
            }
            
            // Check if the file is an image and has an allowed extension
            $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];
            $file_extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            if (!in_array($file_extension, $allowed_extensions)) {
                // Error: Invalid file extension
                echo 'Error: Invalid file extension';
                $check_file = false;
            }
            
            // Generate a unique name for the uploaded file
            $file_name = uniqid() . '.' . $file_extension;
            
            // Move the uploaded file to the designated folder
            $upload_dir = '../../../uploads/';
            $imageName = basename($_FILES['image']['name']);
            // if (!is_dir($upload_dir)) {
            //     mkdir($upload_dir, 0777, true);
            // }
            // if (file_exists($upload_dir . $imageName)) {
            //     // file already exists
            //     echo "Sorry, file already exists";
            //     $check_file = false;
            // }

            if ($check_file==true) {
                if (!move_uploaded_file($file['tmp_name'], $upload_dir . $file_name)) {
                    // Error: Failed to move the uploaded file
                    echo 'Error: Failed to move the uploaded file';
                    $check_file = false;
                }
            }
            $old_file = $_POST['img_path_value'];
            if(file_exists($upload_dir . $old_file))
            unlink($upload_dir . $old_file);
            $product_image = $file_name;
        } else {
            // No file was uploaded
            $product_image = null;
        }

        if($check_file==true) {
            $productDTO = new productDTO();
            $date = date('Y-m-d H:i:s', time());
            $productDTO->setId($id);
            $productDTO->setTen_sp($_POST['ten_sp']);
            $productDTO->setDescription($_POST['description']);
            $productDTO->setImg_path($product_image);
            $productDTO->setIn_stock($_POST['in_stock']);
            $productDTO->setIDdanhmuc($_POST['id_danh_muc']);
            $productDTO->setModified_date($date);
            $result = $this->productService->updateProduct($productDTO);

            if ($result) {
                header('HTTP/1.0 204 No Content');
                header('Content-Type: application/json');
            } else {
                header('HTTP/1.0 500 Internal Server Error');
            }
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
date_default_timezone_set('Asia/Ho_Chi_Minh');
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
        // INSERT OR UPDATE
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $productAPI->updateProduct($id);
        } else {
            $productAPI->createProduct();
        }
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

?>
