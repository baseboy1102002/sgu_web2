<?php

// require_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\service\accountService.php';
require_once '../../../../config.php';
require_once (ROOT.'\src\main\service\accountService.php');

class accountAPI{

    private $accountService;

    function __construct() {
        $this->accountService = new accountService();
    }

    public function getAccountById($id) {
        $result = $this->accountService->findById($id);
    
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            header('Content-Type: application/json');
            echo json_encode($row);
        } else {
            header('HTTP/1.0 404 Not Found');
        }
    }
    
    public function getAllAccounts() {
        $result = $this->accountService->findAll();
    
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
    public function createAccount() {
        $data = json_decode(file_get_contents('php://input'), true);
        $accountDTO = new accountDTO();
        $accountDTO->setTen_tk($data['username']);
        $accountDTO->setPassword($data['password']);
        $accountDTO->setEmail($data['email']);
        $accountDTO->setIdNhomquyen($data['id_nhom_quyen']);
        $accountDTO->setStatus($data['status']);
        $result = $this->accountService->save($accountDTO);

        if ($result!=null) {
            header('HTTP/1.0 201 Created');
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            header('HTTP/1.0 500 Internal Server Error');
        }
    }

    public function updateAccount($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        $accountDTO = new accountDTO();
        $accountDTO->setId($id);
        $accountDTO->setTen_tk($data['username']);
        $accountDTO->setPassword($data['password']);
        $accountDTO->setEmail($data['email']);
        $accountDTO->setIdNhomquyen(intval($data['id_nhom_quyen']));
        $accountDTO->setStatus($data['status']);
        $result = $this->accountService->updateAccount($accountDTO);

        if ($result) {
            header('HTTP/1.0 201 Created');
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            header('HTTP/1.0 500 Internal Server Error');
        }
    }

    public function deleteAccount($id) {
        $result = $this->accountService->deleteAccount($id);
        if ($result) {
            header('HTTP/1.0 201 Created');
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            header('HTTP/1.0 500 Internal Server Error');
        }
    }
    public function checkExistUsername($username){
        $result=$this->accountService->findByUserName($username)->fetch_array()[0];
        if($result>0){
            header('Content-Type: application/json');
            echo json_encode("Yes");
        }
        else header('HTTP/1.0 404 Not Found');
    }

    public function findByUserNameAndPassword() {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->accountService->findByUserNameAndPassword($data['username'], $data['password']);
        $row = $result->fetch_array();
        $count = intval($row[0]);
        $account_id = $row[1];
        $account_username = $row[2];
        if ($count > 0) {
            // dang nhap thanh cong, reset session
            session_start();
            if (isset($_SESSION)) {
                $_SESSION = array();
                session_destroy();
            }
            session_start();
            $_SESSION['account_id'] = $account_id;
            $_SESSION['account_ten-nhom-quyen'] = $this->accountService->findRoleByUserNameAndPassword($data['username'], $data['password'])->fetch_array()[0];
            $_SESSION['account_id-nhom-quyen'] = $this->accountService->findRoleByUserNameAndPassword($data['username'], $data['password'])->fetch_array()[1];
            $_SESSION['account_username'] = $account_username;
            header('Content-Type: application/json');
            header('HTTP/1.0 204 No Content');

            // echo json_encode($account_id);   
        } else {
            // dang nhap that bai
            header('HTTP/1.0 404 Not Found');
        }
    }

    public function logOut() {
        session_start();
        $_SESSION = array();
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        session_destroy();
        header('HTTP/1.0 204 No Content');
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$accountAPI = new accountAPI();
switch ($method) {
    // SELECT
    case 'GET':
        if (!empty($_GET['id'])) {
            $id = intval($_GET['id']);
            $accountAPI->getAccountById($id);
        }else if(isset($_GET['action']) && strcmp($_GET['action'], "check")==0){
            $username = $_GET['username'];
            $accountAPI->checkExistUsername($username);
        }
        else{
            $accountAPI->getAllAccounts();
        }
        break;
    case 'POST':
        if(isset($_GET['action']) && strcmp($_GET['action'], "login")==0) {
            // dang nhap
            $accountAPI->findByUserNameAndPassword();
        }
        else if((isset($_GET['action']) && strcmp($_GET['action'], "signup")==0) || (isset($_GET['action']) && strcmp($_GET['action'], "create")==0)) {
            // dang ky/ them tai khoan (trang admin)
            $accountAPI->createAccount();
        }
        else
            $accountAPI->logOut();
        break;
    case 'PUT':
        // UPDATE
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $accountAPI->updateAccount($id);
        }
        break;
    case 'DELETE':
        // Delete
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $accountAPI->deleteAccount($id);
        }
        break;
}

?>
