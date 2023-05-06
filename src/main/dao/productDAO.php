<?php

// include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\dao\dbDAO.php';
// include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\model\productDTO.php';
require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\dbDAO.php');
require_once(ROOT.'\src\main\model\productDTO.php');
require_once(ROOT.'\src\main\model\pageableDTO.php');

class productDAO extends dbDAO {

    public function findById($id) {
        $sql = "SELECT * FROM san_pham WHERE id = ?";
        $result = $this->read($sql,"i",$id);
        return $result;
    }
    
    public function findAll($pageableDTO) {
        $sql = "SELECT * FROM san_pham";
        $type = "";
        $params = array();
        $key_words = $pageableDTO->getKey_words();
        $categoryId = $pageableDTO->getCategoryId();
        $offset = ($pageableDTO->getPage()-1)*$pageableDTO->getItemPerPage();
        $sql .= " WHERE in_stock != 0";
        if($categoryId != null) {
            $sql .= " AND id_danh_muc = ?";
            $type .= "i";
            $params[] = $categoryId;
        }
        if($key_words != null) {
            $sql .= " AND ten_sp LIKE CONCAT('%',?,'%')";
            $type .= "s";
            $params[] = $key_words;
        }
        $sql .= " ORDER BY created_date DESC LIMIT ? OFFSET ?";
        $type .= "ii";
        $params[] = $pageableDTO->getItemPerPage();
        $params[] = $offset;
        return $this->read($sql, $type, ...$params);
    }

    // return type: Int (id product)
    public function save($productDTO) {
        $sql = "INSERT INTO san_pham (ten_sp, description, img_path, in_stock, id_danh_muc, created_date, modified_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $result = $this->insert($sql, "sssiiss" , $productDTO->getTen_sp(), $productDTO->getDescription(), $productDTO->getImg_path(), $productDTO->getIn_stock(), $productDTO->getIDDanhmuc(), $productDTO->getCreated_date(), $productDTO->getModified_date());
        return $result;
    }

    public function updateProduct($productDTO) {
        if($productDTO->getImg_path()==null) {
            $sql = "UPDATE san_pham SET ten_sp=?, description=?, in_stock=?, id_danh_muc=?, modified_date=? WHERE id=?";           
            return $this->update($sql, "ssiisi", $productDTO->getTen_sp(), $productDTO->getDescription(), $productDTO->getIn_stock(), $productDTO->getIDDanhmuc(), $productDTO->getModified_date(), $productDTO->getId());
        }
        else {
            $sql = "UPDATE san_pham SET ten_sp=?, description=?, img_path=?, in_stock=?, id_danh_muc=?, modified_date=? WHERE id=?";
            return $this->update($sql, "sssiisi", $productDTO->getTen_sp(), $productDTO->getDescription(), $productDTO->getImg_path(), $productDTO->getIn_stock(), $productDTO->getIDDanhmuc(), $productDTO->getModified_date(), $productDTO->getId());
        }
        
    }

    public function deleteProduct($id) {
        $sql = "UPDATE san_pham SET in_stock=0 WHERE id=?";
        return $this->update($sql, "i", $id);
    }

    public function deleteProductByCategoryId($categoryId) {
        $sql = "UPDATE san_pham SET in_stock=0 WHERE id_danh_muc =?";
        return $this->update($sql, "i", $categoryId);
    }
    
    public function countRs($pageableDTO=null) {
        $sql = "SELECT count(id) FROM san_pham";
        if($pageableDTO != null) {
            $type = "";
            $params = array();
            $key_words = $pageableDTO->getKey_words();
            $categoryId = $pageableDTO->getCategoryId();
            $sql .= " WHERE in_stock != 0";
            if($categoryId != null) {
                $sql .= " AND id_danh_muc = ?";
                $type .= "i";
                $params[] = $categoryId;
            }
            if($key_words != null) {
                $sql .= " AND ten_sp LIKE CONCAT('%',?,'%')";
                $type .= "s";
                $params[] = $key_words;
            }
            return $this->read($sql, $type, ...$params);
        } else {
            return $this->read($sql);
        }
    }
}

?>
