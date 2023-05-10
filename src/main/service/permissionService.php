<?php

require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\permissionDAO.php');
require_once(ROOT.'\src\main\dao\accountDAO.php');
require_once(ROOT.'\src\main\model\permissionDTO.php');

class permissionService {

    private $permissionDAO;
    private $accountDAO;

    function __construct() {
        $this->permissionDAO = new permissionDAO();
        $this->accountDAO = new accountDAO();
    }

    public function findById($id) {
        $result = $this->permissionDAO->findById($id);
        return $result;
    }
    
    public function findAll() {
        $result = $this->permissionDAO->findAll();
        return $result;
    }


    public function save($permissionDTO) {
        $result = $this->permissionDAO->save($permissionDTO);
        if($result!=null) {
            $permissionDTO->setId($result);
            return $this->permissionDAO->save_Permission_Feature($permissionDTO);
        } else {
            return false;
        }
    }

    public function updatePermission($permissionDTO) {
        $result1 = $this->permissionDAO->updatePermission($permissionDTO);
        $result2 = $this->permissionDAO->update_Permission_Feature($permissionDTO);
        if($result1>=0 && $result2>=0) return true;
        else return false;
    }

    public function deletePermission($id) {
        $rs1 = $this->accountDAO->updateIdNhomQuyen($id);
        $rs3 = $this->permissionDAO->delete_Permission_Feature($id);
        $rs2 = $this->permissionDAO->deletePermission($id);
        if($rs1>=0 && $rs2>=0 && $rs3>=0) return true;
        else return false;
    }
}

?>
