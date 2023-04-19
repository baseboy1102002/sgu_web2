<?php

include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\dao\dbDAO.php';
include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\model\productVariantsDTO.php';
include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\model\pageableDTO.php';

class productVariantsDAO extends dbDAO {

    public function findById($id) {
        $sql = "SELECT * FROM skus WHERE id = ?";
        $result = $this->read($sql,"i",$id);
        return $result;
    }
    
    public function findAll($pageableDTO) {
        $sql = "SELECT skus.id, skus.id_sp, CONCAT(sp.ten_sp, ' ' ,skus.sku_name) AS tensp, sp.img_path, skus.don_gia FROM skus INNER JOIN san_pham as sp ON skus.id_sp = sp.id";
        $type = "";
        $params = array();
        $key_words = $pageableDTO->getKey_words();
        $categoryId = $pageableDTO->getCategoryId();
        $priceStart = $pageableDTO->getPriceStart();
        $priceEnd = $pageableDTO->getPriceEnd();
        $offset = ($pageableDTO->getPage()-1)*$pageableDTO->getItemPerPage();
        if($categoryId != null) {
            $sql .= " WHERE sp.id_danh_muc = ?";
            $type .= "i";
            $params[] = $categoryId;
        }
        if($key_words != null) {
            if(count($params)===0)
                $sql .= " WHERE sp.ten_sp LIKE CONCAT('%',?,'%')";
            else
                $sql .= " AND sp.ten_sp LIKE CONCAT('%',?,'%')";
            $type .= "s";
            $params[] = $key_words;
        }
        if($priceStart != null && $priceEnd != null) {
            if(count($params)===0)
                $sql .= " WHERE skus.don_gia BETWEEN ? AND ?";
            else
                $sql .= " AND skus.don_gia BETWEEN ? AND ?";
            $type .= "dd";
            $params[] = $priceStart;
            $params[] = $priceEnd;
        }
        $sql .= " LIMIT ? OFFSET ?";
        $type .= "ii";
        $params[] = $pageableDTO->getItemPerPage();
        $params[] = $offset;
        return $this->read($sql, $type, ...$params);
    }

    public function findAllVariantsByProductId($product_id) {
        $sql = "SELECT sku.id, sku.sku_name, tt.ten_thuoc_tinh, gttt.gia_tri, sku.don_gia, sku.so_luong";
        $sql .= "FROM bien_the_sp as btsp INNER JOIN skus as sku ON btsp.skus_id = sku.id";
        $sql .= "INNER JOIN thuoc_tinh as tt ON btsp.id_thuoc_tinh = tt.id";
        $sql .= "INNER JOIN gia_tri_thuoc_tinh as gttt on btsp.id_gia_tri_tt = gttt.id";
        $sql .= "WHERE btsp.id_sp = ?";
        $result = $this->read($sql, "i", $product_id);
        return $result;
    }

    // return type: Int (id product)
    public function save($productVariantsDTO) {
        $sql = "INSERT INTO skus (sku_name, don_gia, so_luong, id_sp, in_stock) VALUES (?,?,?,?,?)";
        $result = $this->insert($sql, "sdiii" , $productVariantsDTO->getSku_name(), $productVariantsDTO->getDon_gia(), $productVariantsDTO->getSo_luong(), $productVariantsDTO->getIDSan_pham(), $productVariantsDTO->getIn_stock());
        return $result;
    }

    public function updateProductVariant($productVariantsDTO) {
        $sql = "UPDATE skus SET sku_name=?,don_gia=?,so_luong=?,id_sp=?,in_stock=? WHERE id = ?";
        $this->update($sql, "sdiiii", $productVariantsDTO->getSku_name(), $productVariantsDTO->getDon_gia(), $productVariantsDTO->getSo_luong(), $productVariantsDTO->getIDSan_pham(), $productVariantsDTO->getIn_stock(), $productVariantsDTO->getId());
    }

    public function deleteProductVariant($sku_id) {
        $sql = "UPDATE skus SET in_stock = 0 WHERE id = ?";
        $this->update($sql, "i", $sku_id);
    }
    
    public function countResults($pageableDTO=null) {
        $sql = "SELECT count(skus.id) FROM skus INNER JOIN san_pham as sp ON skus.id_sp = sp.id";
        if($pageableDTO != null) {
            $type = "";
            $params = array();
            $key_words = $pageableDTO->getKey_words()!=null ? $pageableDTO->getKey_words():null;
            $categoryId = $pageableDTO->getCategoryId()!=null ? $pageableDTO->getCategoryId():null;
            $priceStart = $pageableDTO->getPriceStart()!=null ? $pageableDTO->getPriceStart():null;
            $priceEnd = $pageableDTO->getPriceEnd()!=null ? $pageableDTO->getPriceEnd():null;
            if($categoryId != null) {
                $sql .= " WHERE sp.id_danh_muc = ?";
                $type .= "i";
                $params[] = $categoryId;
            }
            if($key_words != null) {
                if(count($params)===0)
                    $sql .= " WHERE sp.ten_sp LIKE CONCAT('%',?,'%')";
                else
                    $sql .= " AND sp.ten_sp LIKE CONCAT('%',?,'%')";
                $type .= "s";
                $params[] = $key_words;
            }
            if($priceStart != null && $priceEnd != null) {
                if(count($params)===0)
                    $sql .= " WHERE skus.don_gia BETWEEN ? AND ?";
                else
                    $sql .= " AND skus.don_gia BETWEEN ? AND ?";
                $type .= "dd";
                $params[] = $priceStart;
                $params[] = $priceEnd;
            }
            return $this->read($sql, $type, ...$params);
        } else return $this->read($sql);
    }
}

?>
