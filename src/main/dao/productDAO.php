<?php

include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\dao\dbDAO.php';
include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\model\productDTO.php';

class productDAO extends dbDAO {

    public function findById($id) {
        $sql = "SELECT * FROM san_pham WHERE id = ?";
        $result = $this->read($sql,"i",$id);
        return $result;
    }
    
    public function findAll() {
        $sql = "SELECT * FROM san_pham";
        $result = $this->read($sql);
        return $result;
    }

    // return type: Int (id product)
    public function save($productDTO) {
        $sql = "INSERT INTO san_pham (ten_sp, descirption, img_path, in_stock, id_danh_muc) VALUES (?, ?, ?, ?, ?)";
        $result = $this->insert($sql, "sssii" , $productDTO->getTen_sp(), $productDTO->getDescription(), $productDTO->getImg_path(), $productDTO->getIn_stock(), $productDTO->getIDDanhmuc());
        return $result;
    }

    public function updateProduct($productDTO) {
        $sql = "UPDATE san_pham SET ten_sp=?, descirption=?, img_path=?, in_stock=?, id_danh_muc=? WHERE id=?";
        $this->update($sql, "sssiii", $productDTO->getTen_sp(), $productDTO->getDescription(), $productDTO->getImg_path(), $productDTO->getIn_stock(), $productDTO->getIDDanhmuc(), $productDTO->getId());
    }

    public function deleteProduct($id) {
        $sql = "DELETE FROM san_pham WHERE id=?";
        $this->update($sql, "i", $id);
    }
        
}

?>
