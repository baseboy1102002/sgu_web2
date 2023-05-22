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
    public function findAll(){
        if(isset($_GET['started_date'])&& isset($_GET['ended_date']))
            $result = $this->orderService->findAllByDate($_GET['started_date'],$_GET['ended_date']);
        else 
            $result = $this->orderService->findAll();
        if($result->num_rows>0){
            $rows = array();
            while($row = $result->fetch_assoc()){
                $rows[] = $row;
            }
            header('Content-Type: application/json');
            header('HTTP/1.0 201 Created');
            echo json_encode($rows);
        }else 
        echo json_encode(null);
    }
    public function findById($id){
        $result = $this->orderService->findById($id);
        if($result->num_rows>0){
            $row=$result->fetch_assoc();
            header('Content-Type: application/json');
            header('HTTP/1.0 201 Created');
            echo json_encode($row);
        }
        else 
        header('HTTP/1.0 404 Not Found');
    }
    public function findByAccountId($id){
        $result = $this->orderService->findByAccountId($id);
        if($result->num_rows>0){
            $rows = array();
            while($row = $result->fetch_assoc())
                $rows[]=$row;
            header('Content-Type: application/json');
            header('HTTP/1.0 201 Created');
            echo json_encode($rows);
        }
        else 
        header('HTTP/1.0 404 Not Found');
    }
    public function findDetailByOrderId($id){
        $result = $this->orderService->findDetailByOrderId($id);
        if($result->num_rows>0){
            $rows = array();
            while($row = $result->fetch_assoc())
                $rows[]=$row;
            header('Content-Type: application/json');
            header('HTTP/1.0 201 Created');
            echo json_encode($rows);
        }
        else 
        header('HTTP/1.0 404 Not Found');
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
                $orderItem=new orderDetailDTO($data['id_gio_hang'],$row['id_sku'],$row['quantity'],$row['don_gia']);
                $orderItems[]=$orderItem;
            }
        }
        $this->productVariantsService = new productVariantsService();
        $total=0;
        $check = true;
        foreach($orderItems as $item=>$value){
            $sku = $this->productVariantsService->findById($value->getId_sku())->fetch_assoc();
            if($sku==null || $sku['in_stock']==0){
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


    public function onStatus($id){
        $result = $this->orderService->onStatus($id);
        if($result){
            header('HTTP/1.0 201 Created');
        }
        else {
            header('HTTP/1.0 500 Internal Server Error');
        }
    }

    public function statistic(){
        $filter=array();
        $filter['started_date']=$_GET['started_date'];
        $filter['ended_date']=$_GET['ended_date'];
        $filter['category_id']=$_GET['category_id'];
        $filter['title']=$_GET['title'];
        $filter['sort']=$_GET['sort'];
        $result=$this->orderService->countProductSold($filter);
        if($result->num_rows>0){
            $rows=array();
            while($row=$result->fetch_assoc())
            $rows[]=$row;
            header('Content-Type: application/json');
            header('HTTP/1.0 201 Created');
            echo json_encode($rows);
        }else header('HTTP/1.0 404 Not Found');
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$orderAPI = new orderAPI();
switch ($method) {
    // SELECT
    case 'GET':
        if(isset($_GET['action']))
        switch ($_GET['action']) {
            case 'order':
                if(isset($_GET['id'])){
                    $id = intval($_GET['id']);
                    $orderAPI->findById($id);
                }else if(isset($_GET['account_id'])){
                    $id = intval($_GET['account_id']);
                    $orderAPI->findByAccountId($id);
                } else
                    $orderAPI->findAll();
                break;
            case 'orderDetail':
                if(isset($_GET['id'])){
                    $id = intval($_GET['id']);
                    $orderAPI->findDetailByOrderId($id);
                }
                break;
            case 'statistic':
                $orderAPI->statistic();
                break;
        }
        break;
    case 'POST':
        $orderAPI->createOrder();
        break;
    case 'PUT':
        if(isset($_GET['id'])){
            $id = intval($_GET['id']);
            $orderAPI->onStatus($id);
        }
        break;
    case 'DELETE':

        break;
}
?>  