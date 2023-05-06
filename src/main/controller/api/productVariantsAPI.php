<?php

// require_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\service\productVariantsService.php';
require_once '../../../../config.php';
require_once (ROOT.'\src\main\service\productVariantsService.php');

class productVariantsAPI{

    private $productVariantsService;

    function __construct() {
        $this->productVariantsService = new productVariantsService();
    }

    public function getProductVariantById($id) {
        $result = $this->productVariantsService->findById($id);
    
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
    
    public function getAllProductVariants() {
        $pageableDTO = new pageableDTO();
        $pageableDTO->setPage($_GET['page']);
        $pageableDTO->setItemPerPage($_GET['itemPerPage']);
        $pageableDTO->setCategoryId($_GET['categoryId']);
        $pageableDTO->setKey_words($_GET['keyword']);
        $pageableDTO->setPriceStart(isset($_GET['priceStart']) ? $_GET['priceStart']:null);
        $pageableDTO->setPriceEnd(isset($_GET['priceEnd']) ? $_GET['priceEnd']:null);
        $result = $this->productVariantsService->findAll($pageableDTO);
        if($pageableDTO->hasAnyFilter())
            $countRs = $this->productVariantsService->countResults($pageableDTO);
        else
            $countRs = $this->productVariantsService->countResults();
        if ($result->num_rows > 0) {
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            $c = $countRs->fetch_array();
            $count = intval($c[0]);
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

    public function getAllVariantsByProductId($product_id) {
        $result = $this->productVariantsService->findAllVariantsByProductId($product_id);
        
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
    public function createProductVariant() {
        $data = json_decode(file_get_contents('php://input'), true);
        $productVariantsDTO = new productVariantsDTO();
        $date = date('Y-m-d H:i:s', time());
        $productVariantsDTO->setSku_name($data['sku_name']);
        $productVariantsDTO->setDon_gia($data['don_gia']);
        $productVariantsDTO->setSo_luong($data['so_luong']);
        $productVariantsDTO->setIn_stock($data['in_stock']);
        $productVariantsDTO->setIDSan_pham($data['id_san_pham']);
        $productVariantsDTO->setId_thuoc_tinh($data['id_thuoc_tinh']);
        $productVariantsDTO->setId_gia_tri($data['id_gia_tri']);
        $productVariantsDTO->setCreated_date($date);
        $productVariantsDTO->setModified_date($date);
        $result = $this->productVariantsService->save($productVariantsDTO);

        if ($result) {
            header('HTTP/1.0 201 Created');
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            header('HTTP/1.0 500 Internal Server Error');
        }
    }

    public function updateProductVariant($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        $productVariantsDTO = new productVariantsDTO();
        $date = date('Y-m-d H:i:s', time());
        $productVariantsDTO->setId($id);
        $productVariantsDTO->setSku_name($data['sku_name']);
        $productVariantsDTO->setDon_gia($data['don_gia']);
        $productVariantsDTO->setSo_luong($data['so_luong']);
        $productVariantsDTO->setIn_stock($data['in_stock']);
        $productVariantsDTO->setIDSan_pham(intval($data['id_san_pham']));
        $productVariantsDTO->setId_thuoc_tinh($data['id_thuoc_tinh']);
        $productVariantsDTO->setId_gia_tri($data['id_gia_tri']);
        $productVariantsDTO->setModified_date($date);
        $result = $this->productVariantsService->updateProductVariant($productVariantsDTO);

        if ($result) {
            header('HTTP/1.0 204 No Content');
            header('Content-Type: application/json');
        } else {
            header('HTTP/1.0 500 Internal Server Error');
        }
    }

    public function deleteProductVariant($sku_id) {
        $result = $this->productVariantsService->deleteProductVariant($sku_id);
        var_dump($result);
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
$productVariantsAPI = new productVariantsAPI();
switch ($method) {
    // SELECT
    case 'GET':
        if (!empty($_GET['id'])) {
            $id = intval($_GET['id']);
            $productVariantsAPI->getProductVariantById($id);
        } else if (!empty($_GET['product_id'])) {
            $product_id = intval($_GET['product_id']);
            $productVariantsAPI->getAllVariantsByProductId($product_id);
        }
        else {
            $productVariantsAPI->getAllProductVariants();
        }
        break;
    case 'POST':
        $productVariantsAPI->createProductVariant();
        break;
    case 'PUT':
        // UPDATE
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $productVariantsAPI->updateProductVariant($id);
        }
        break;
    case 'DELETE':
        // Delete
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $productVariantsAPI->deleteProductVariant($id);
        }
        break;
}

?>
