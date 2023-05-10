<?php 
require_once '../../../../config.php';
require_once (ROOT.'\src\main\service\productVariantsService.php');
require_once (ROOT.'\src\main\service\cartService.php');
require_once (ROOT.'\src\main\service\cartDetailService.php');
class cartAPI {
    private $cartService;
    private $cartDetailService;
    private $productVariantsService;

    function __construct()
    {
        $this->cartService= new cartService();
        $this->cartDetailService = new cartDetailService();
        $this->productVariantsService= new productVariantsService();
    }
    public function checkCart(){
        $result = $this->cartService->getById();
        if($result->num_rows>0){        //Tìm thấy giỏ hàng
            $row = $result->fetch_assoc();
            header('content-type: application/json');
            echo json_encode($row);
        }else {                         //Không tìm thấy giỏ hàng
            //createCart
            $result = $this->cartService->createCart();
        if($result!==null){
            header('HTTP/1.0 201 Created');
            header('Content-Type: application/json');
            $response = array();
            $response['id'] = $result;
            echo json_encode($response);
        }else {
            echo 'lỗi cmmr';
        }
        }
    }

    public function readCart($id){
        $result= $this->cartDetailService->getAllByCartId($id);
        if($result->num_rows>0)
        {
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($rows);
        }
    }
   
    public function updateCart(){
        $data=json_decode(file_get_contents('php://input'),true);
        $cartItems = $data;
        $outOfOrder=array();
        $updated=array();
        $unUpdated=array();
        $inStock=array();
        foreach($cartItems as $item=>$value){
            $check=$this->cartDetailService->getQuantityInCart($value['id_sku']);
            if($check->num_rows>0){
                $product=$check->fetch_assoc();
                if($product['quantity']!=$value['quantity']){
                $cartDetail = new cartDetailDTO($_GET['cartView'],$value['id_sku'],$value['quantity']);
                    if($this->cartDetailService->updateQuantity($cartDetail)==true)
                        $updated[]=$value['id_sku'];
                    else {
                        $outOfOrder[]=$value['id_sku'];
                    }
                }else{
                    $unUpdated[]=$product['sku_name'];
                }
            } else {
                $inStock[]=$value['id_sku'];
            }
        }
        $response = array(
            'updated'=>$updated,
            'unUpdated'=>$unUpdated,
            'outOfOrder'=>$outOfOrder,
            'inStock'=>$inStock
        );
        header('Content-Type: application/json');
        header('HTTP/1.0 201 Created');
        echo json_encode($response);

    
}
    public function addToCart(){
        $data=json_decode(file_get_contents('php://input'),true);
        $cartDetailDTO = new cartDetailDTO($data['id_gio_hang'],$data['id_sku'],1);
        $check= $this->cartDetailService->checkProductInCart($cartDetailDTO);
        if($check->num_rows==0){        //Sản phẩm chưa có trong giỏ
            $result= $this->cartDetailService->addToCart($cartDetailDTO);
            if($result!==null){             //Thêm thành công
                echo json_encode($result);
                header('Content-Type: application/json');
                header('HTTP/1.0 201 Created');
            }
            else{                        //Thêm thất bại
                echo "Sản phẩm đã hết hàng !!!";
            header('HTTP/1.0 500 Internal Server Error');
            }
        } else {                        //Sản phẩm đã có trong giỏ
            echo "Sản phẩm đã có trong giỏ hàng !!!";
            header('HTTP/1.0 500 Internal Server Error');
        }
    }

    public function removeFromCart($cartId, $itemId){
        $cartDetailDTO = new cartDetailDTO($cartId,$itemId,1);
        $result = $this->cartDetailService->RemoveItemFromCart($cartDetailDTO);
        if($result==true){
            echo json_encode($result);
            header('HTTP/1.0 201 Created');
        }else {
            echo json_encode($result);
            header('HTTP/1.0 500 Internal Server Error');
        }
    }
    public function deleteCart($cartId){
        $result=$this->cartService->deleteCart($cartId);
        if($result==true){
            header('HTTP/1.0 201 Created');
        }else
            header('HTTP/1.0 500 Internal Server Error');
    }
}


$method = $_SERVER['REQUEST_METHOD'];
$cartAPI = new cartAPI();
switch ($method) {
    // SELECT
    case 'GET':
        if(isset($_GET['cartView'])){
            $id=intval($_GET['cartView']);
            $cartAPI->readCart($id);
        }else
        $cartAPI->checkCart();
        break;
    case 'POST':
        $cartAPI->addToCart();
        break;
    case 'PUT':
        $cartAPI->updateCart();
        break;
    case 'DELETE':
        if(isset($_GET['cartId'])&&isset($_GET['itemId'])){
            $cartId=intval($_GET['cartId']); $itemId=intval($_GET['itemId']);
            $cartAPI->removeFromCart($cartId,$itemId);
        }else {
        $cartId=intval($_GET['cartId']);
        $cartAPI->deleteCart($cartId);
        }       
        break;
}
?>