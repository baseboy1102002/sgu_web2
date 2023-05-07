<?php 
require_once '../../../../config.php';
require_once (ROOT.'\src\main\service\productVariantsService.php');
require_once (ROOT.'\src\main\service\orderService.php');
require_once (ROOT.'\src\main\service\cartDetailService.php');
class orderAPI {
    private $orderService;
    private $cartDetailService;
    private $productVariantsService;

    function __construct()
    {
        $this->orderService = new orderService();
        $this->cartDetailService = new cartDetailService();
    }
    public function createOrder(){
        session_start();
        $data=json_decode(file_get_contents('php://input'),true);
        $orderDTO = new orderDTO();
        $orderDTO->setId_tk($_SESSION['account_id']);
        $orderDTO->setCreated_date(date("Y-m-d h:i:s"));
        $orderDTO->setTen_nguoi_nhan($data['name']);
        $orderDTO->setDia_chi($data['address']);
        $orderDTO->setSdt($data['phone']);
        $orderDTO->setStatus(0);
        $orderItems = array();
        $result = $this->cartDetailService->getAllByCartId($data['id_gio_hang']);
        if($result->num_rows>0){
            while($row = $result->fetch_assoc()){
                $orderItem=new orderDetailDTO($data['id_gio_hang'],$row['id_sku'],$row['quantity']);
                $orderItems[]=$orderItem;
            }
        }
        $this->productVariantsService = new productVariantsService();
        $total=0;
        $check = true;
        foreach($orderItems as $item=>$value){
            $sku = $this->productVariantsService->findById($value->getId_sku())->fetch_assoc();
            if($sku==null){
                $check = false;
                break;
            }
            else if($sku['so_luong'] < $value->getSo_luong()){
                $check=false;
                break;
            }else {
                $total +=doubleval($value->getSo_luong()*$sku['don_gia']);
            }
        }
        if($check == true){
            $orderDTO->setTong_tien($total);
            $order_id=$this->orderService->createOrder($orderDTO);
            if($order_id!=null)
            foreach($orderItems as $item=>$value){
                $value->setId_donhang($order_id);
                $value->getId_donhang();
                $this->orderService->createOrderDetail($value);
                $this->productVariantsService->updateQuantity($value->getId_sku(),$value->getSo_luong());
            }
            header('Content-Type: application/json');
            header('HTTP/1.0 201 Created');
            echo json_encode($check);
        }
        else {
            header('HTTP/1.0 500 Internal Server Error');
            echo("OOps!! bạn chậm tay r ^^! sản phẩm đã hết hàng, mời bạn cập nhật lại giỏ hàng");
        }
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$orderAPI = new orderAPI();
switch ($method) {
    // SELECT
    case 'GET':

        break;
    case 'POST':
        $orderAPI->createOrder();
        break;
    case 'PUT':

        break;
    case 'DELETE':

        break;
}
?>