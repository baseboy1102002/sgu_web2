<?php

// include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\dao\dbDAO.php';
// include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\model\productVariantsDTO.php';
// include_once 'D:\XAMPP\htdocs\ThaiTranWeb2\src\main\model\pageableDTO.php';
require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\dbDAO.php');
require_once(ROOT.'\src\main\model\productVariantsDTO.php');
require_once(ROOT.'\src\main\model\pageableDTO.php');

class productVariantsDAO extends dbDAO {

    public function findById($id) {
        $sql = "SELECT skus.id, skus.sku_name, skus.don_gia, skus.so_luong, skus.id_sp,skus.in_stock, btsp.id_thuoc_tinh , tt.ten_thuoc_tinh, btsp.id_gia_tri_tt, gttt.gia_tri FROM skus";
        $sql .= " INNER JOIN ct_tt_bien_the_sp as btsp ON skus.id = btsp.skus_id";
        $sql .= " INNER JOIN thuoc_tinh as tt ON btsp.id_thuoc_tinh = tt.id";
        $sql .= " INNER JOIN gia_tri_thuoc_tinh as gttt ON btsp.id_gia_tri_tt = gttt.id";
        $sql .= " WHERE skus.id = ?";
        $result = $this->read($sql,"i",$id);
        return $result;
    }
    
    public function findAll($pageableDTO) {
        $sql = "SELECT skus.id, skus.id_sp, CONCAT(sp.ten_sp, ' ' ,skus.sku_name) AS tensp, sp.img_path, skus.don_gia, skus.so_luong FROM skus INNER JOIN san_pham as sp ON skus.id_sp = sp.id";
        $type = "";
        $params = array();
        $key_words = $pageableDTO->getKey_words();
        $categoryId = $pageableDTO->getCategoryId();
        $priceStart = $pageableDTO->getPriceStart();
        $priceEnd = $pageableDTO->getPriceEnd();
        $offset = ($pageableDTO->getPage()-1)*$pageableDTO->getItemPerPage();
        $sql .= " WHERE skus.in_stock != 0";
        if($categoryId != null) {
            $sql .= " AND sp.id_danh_muc = ?";
            $type .= "i";
            $params[] = $categoryId;
        }
        if($key_words != null) {
            $sql .= " AND CONCAT(sp.ten_sp, ' ' ,skus.sku_name) LIKE CONCAT('%',?,'%')";
            $type .= "s";
            $params[] = $key_words;
        }
        if($priceStart != null && $priceEnd != null) {
             $sql .= " AND skus.don_gia BETWEEN ? AND ?";
            $type .= "dd";
            $params[] = $priceStart;
            $params[] = $priceEnd;
        }
        $sql .= " ORDER BY skus.created_date DESC LIMIT ? OFFSET ?";
        $type .= "ii";
        $params[] = $pageableDTO->getItemPerPage();
        $params[] = $offset;
        return $this->read($sql, $type, ...$params);
    }

    public function findAllVariantsByProductId($product_id) {
        $sql = "SELECT sku.id, CONCAT(sp.ten_sp,' ',sku.sku_name ) as sku_name, sp.img_path, sp.description, tt.ten_thuoc_tinh, gttt.gia_tri, sku.don_gia, sku.so_luong";
        $sql .= " FROM ct_tt_bien_the_sp as btsp INNER JOIN skus as sku ON btsp.skus_id = sku.id";
        $sql .= " INNER JOIN thuoc_tinh as tt ON btsp.id_thuoc_tinh = tt.id";
        $sql .= " INNER JOIN gia_tri_thuoc_tinh as gttt on btsp.id_gia_tri_tt = gttt.id";
        $sql .= " INNER JOIN san_pham as sp ON sp.id = btsp.id_sp";
        $sql .= " WHERE btsp.id_sp = ? AND sku.in_stock != 0";
        $result = $this->read($sql, "i", $product_id);
        return $result;
    }

    // return type: Int (id product)
    public function save($productVariantsDTO) {
        $sql = "INSERT INTO skus (sku_name, don_gia, so_luong, id_sp, in_stock, created_date, modified_date) VALUES (?,?,?,?,?,?,?)";
        $result = $this->insert($sql, "sdiiiss" , $productVariantsDTO->getSku_name(), $productVariantsDTO->getDon_gia(), $productVariantsDTO->getSo_luong(), $productVariantsDTO->getIDSan_pham(), $productVariantsDTO->getIn_stock(), $productVariantsDTO->getCreated_date(), $productVariantsDTO->getModified_date());
        return $result;
    }

    public function save_Variant_Attr_Value($productVariantsDTO) {
        $arr_tt = $productVariantsDTO->getId_thuoc_tinh();
        $arr_gt = $productVariantsDTO->getId_gia_tri();

        $sql = "INSERT INTO ct_tt_bien_the_sp (skus_id, id_thuoc_tinh, id_gia_tri_tt, id_sp) VAlUES (?,?,?,?)";
        if(count($arr_tt)>1) {
            $sql .= str_repeat(",(?,?,?,?)", count($arr_tt)-1);
        }
        $type = "".str_repeat("i", count($arr_tt) * 4);
        $params = array();
        for ($i=0; $i<count($arr_tt); $i++) {
            $params[] = $productVariantsDTO->getId();
            $params[] = $arr_tt[$i];
            $params[] = $arr_gt[$i];
            $params[] = $productVariantsDTO->getIDSan_pham();
        }
        $result = $this->update($sql, $type, ...$params);
        return $result;
    }

    public function updateProductVariant($productVariantsDTO) {
        $sql = "UPDATE skus SET sku_name=?,don_gia=?,so_luong=?,id_sp=?,in_stock=?, modified_date=? WHERE id = ?";
        return $this->update($sql, "sdiiisi", $productVariantsDTO->getSku_name(), $productVariantsDTO->getDon_gia(), $productVariantsDTO->getSo_luong(), $productVariantsDTO->getIDSan_pham(), $productVariantsDTO->getIn_stock(), $productVariantsDTO->getModified_date(), $productVariantsDTO->getId());
    }

    public function update_Variant_Attr_Value($productVariantsDTO) {
        $arr_tt = $productVariantsDTO->getId_thuoc_tinh();
        $arr_gt = $productVariantsDTO->getId_gia_tri();

        $sql1 = "DELETE FROM ct_tt_bien_the_sp WHERE skus_id = ? AND id_thuoc_tinh NOT IN (?";
        if(count($arr_tt)>1)
            $sql1 .= str_repeat(",?", count($arr_tt)-1);
        $sql1 .= ")";
        $type1 = "i".str_repeat("i", count($arr_tt));
        $this->update($sql1, $type1, $productVariantsDTO->getId(), ...$arr_tt);

        $sql = "INSERT INTO ct_tt_bien_the_sp (skus_id, id_thuoc_tinh, id_gia_tri_tt, id_sp) VAlUES (?,?,?,?)";
        if(count($arr_tt)>1) {
            $sql .= str_repeat(",(?,?,?,?)", count($arr_tt)-1);
        }
        $sql .= " ON DUPLICATE KEY UPDATE id_thuoc_tinh=VALUES(id_thuoc_tinh), id_gia_tri_tt = VALUES(id_gia_tri_tt), id_sp = VALUES(id_sp)";
        $type = "".str_repeat("i", count($arr_tt) * 4);
        $params = array();
        for ($i=0; $i<count($arr_tt); $i++) {
            $params[] = $productVariantsDTO->getId();
            $params[] = $arr_tt[$i];
            $params[] = intval($arr_gt[$i]);
            $params[] = $productVariantsDTO->getIDSan_pham();
        }
        $result = $this->update($sql, $type, ...$params);
        return $result;
    }

    public function deleteProductVariant($sku_id) {
        $sql = "UPDATE skus SET in_stock = 0 WHERE id = ?";
        return $this->update($sql, "i", $sku_id);
    }

    public function deleteProductVariantAttr($sku_id) {
        $sql = "DELETE FROM ct_tt_bien_the_sp WHERE skus_id = ?";
        return $this->update($sql, "i", $sku_id);
    }

    public function delete_ProductVariant_ByProductId($product_id) {
        $sql = "UPDATE skus JOIN san_pham as sp ON skus.id_sp = sp.id SET skus.in_stock = 0 WHERE sp.id = ?";
        return $this->update($sql, "i", $product_id);
    }

    public function delete_ProductVariantAttr_ByProductId($product_id) {
        $sql = "DELETE FROM ct_tt_bien_the_sp  WHERE id_sp = ?";
        return $this->update($sql, "i", $product_id);
    }

    function delete_ProductVariant_ByCategoryId($categoryId) {
        $sql = "UPDATE skus JOIN san_pham as sp ON skus.id_sp = sp.id JOIN danh_muc as dm ON sp.id_danh_muc = dm.id SET skus.in_stock = 0 WHERE dm.id = ?";
        return $this->update($sql, "i", $categoryId);
    }

    function delete_ProductVariantAttr_ByCategoryId($categoryId) {
        $sql = "DELETE btsp FROM ct_tt_bien_the_sp btsp JOIN san_pham as sp ON btsp.id_sp = sp.id JOIN danh_muc as dm ON sp.id_danh_muc = dm.id WHERE dm.id = ?";
        return $this->update($sql, "i", $categoryId);
    }
    
    public function countResults($pageableDTO=null) {
        $sql = "SELECT count(skus.id) FROM skus INNER JOIN san_pham as sp ON skus.id_sp = sp.id WHERE skus.in_stock != 0";
        if($pageableDTO != null) {
            $type = "";
            $params = array();
            $key_words = $pageableDTO->getKey_words();
            $categoryId = $pageableDTO->getCategoryId();
            $priceStart = $pageableDTO->getPriceStart();
            $priceEnd = $pageableDTO->getPriceEnd();
            // $sql .= " WHERE skus.in_stock != 0";
            if($categoryId != null) {
                $sql .= " AND sp.id_danh_muc = ?";
                $type .= "i";
                $params[] = $categoryId;
            }
            if($key_words != null) {
                $sql .= " AND sp.ten_sp LIKE CONCAT('%',?,'%')";
                $type .= "s";
                $params[] = $key_words;
            }
            if($priceStart != null && $priceEnd != null) {
                $sql .= " AND skus.don_gia BETWEEN ? AND ?";
                $type .= "dd";
                $params[] = $priceStart;
                $params[] = $priceEnd;
            }
            return $this->read($sql, $type, ...$params);
        } else return $this->read($sql);
    }
    public function updateQuantity($id,$quantity){
        $sql = "UPDATE skus SET so_luong =so_luong -? WHERE id =?";
        return $this->update($sql,"ii",$quantity,$id);
    }
}

?>
