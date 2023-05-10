<?php

    // include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\dao\dbDAO.php';
    // include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\model\accountDTO.php';
    require_once '../../../../config.php';
    require_once(ROOT.'\src\main\dao\dbDAO.php');
    require_once(ROOT.'\src\main\model\accountDTO.php');

    class accountDAO extends dbDAO {

        public function findById($id) {
            $sql = "SELECT * FROM tai_khoan WHERE id = ?";
            $result = $this->read($sql,"i",$id);
            return $result;
        }
        //code cua Chinh
        public function findAll() {
            $sql = "SELECT tk.*,nq.ten_nhom_quyen FROM tai_khoan as tk INNER JOIN nhom_quyen as nq ON tk.id_nhom_quyen=nq.id WHERE is_deleted !=1";
            $result = $this->read($sql);
            return $result;
        }

        public function save($accountDTO) {
            $sql = "INSERT INTO tai_khoan (ten_tk, password, email, id_nhom_quyen, status) VALUES (?,?,?,?,?)";
            $result = $this->insert($sql, "sssii", $accountDTO->getTen_tk(), $accountDTO->getPassword(), $accountDTO->getEmail(), $accountDTO->getIdNhomquyen(), $accountDTO->getStatus());
            return $result;
        }
        //code cua Chinh
        public function updateAccount($accountDTO) {
            $sql= "UPDATE tai_khoan SET ten_tk=?, password=?, email=?, id_nhom_quyen=?, status=? WHERE id=?";
            return $this->update($sql,"sssiii",$accountDTO->getTen_tk(),$accountDTO->getPassword(),$accountDTO->getEmail(),$accountDTO->getIdNhomquyen(),$accountDTO->getStatus(),$accountDTO->getId());
        }
        //code cua Chinh
        public function deleteAccount($id) {
            $sql="UPDATE tai_khoan SET is_deleted = 1, status=0 WHERE id=?";
            return $this->update($sql,"i",$id);
        }

        public function findByUserNameAndPassword($username, $password) {
            $sql = "SELECT count(id), id, ten_tk FROM tai_khoan WHERE ten_tk = ? AND password = ? AND status!=0";
            $result = $this->read($sql, "ss", $username, $password);
            return $result;
        }

        public function findRoleByUserNameAndPassword($username, $password) {
            $sql = "SELECT nq.ten_nhom_quyen, nq.id FROM tai_khoan as tk INNER JOIN nhom_quyen AS nq ON tk.id_nhom_quyen=nq.id WHERE tk.ten_tk = ? AND tk.password = ?";
            $result = $this->read($sql, "ss", $username, $password);
            return $result;
        }
        //code cua chinh
        public function findRoleByUserId($id) {
            $sql = "SELECT nq.ten_nhom_quyen FROM tai_khoan as tk INNER JOIN nhom_quyen AS nq ON tk.id_nhom_quyen=nq.id WHERE tk.id = ?";
            $result = $this->read($sql, "i", $id);
            return $result;
        }

        //  CODE T MỚI VIẾT NGÀY 9/5, M SỬA Ở TRÊN THOẢI MÁI, ĐỪNG ĐỘNG VÔ CODE DƯỚI NÀY //
        public function updateIdNhomQuyen($id_nhom_quyen) {
            $sql = "UPDATE tai_khoan SET id_nhom_quyen=1 WHERE id_nhom_quyen=?";
            return $this->update2($sql, "i", $id_nhom_quyen);
        }

    }
?>