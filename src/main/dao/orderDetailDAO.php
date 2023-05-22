<?php 
require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\dbDAO.php');
require_once(ROOT.'\src\main\model\orderDetailDTO.php');

class orderDetailDAO extends dbDAO {
    public function findByOrderId($id){
        $sql="SELECT ct.sku_id,CONCAT(sp.ten_sp, ' ' ,skus.sku_name) as ten_sp,ct.don_gia,ct.so_luong FROM chi_tiet_don_hang as ct 
        INNER JOIN skus ON ct.sku_id=skus.id
        INNER JOIN san_pham as sp ON skus.id_sp=sp.id
        WHERE ct.id_donhang=?";
        $result =$this->read($sql,"i",$id);
        return $result;
    }
    public function createOrderDetail($orderDetailDTO){
        $sql = "INSERT INTO chi_tiet_don_hang(id_donhang,sku_id,so_luong,don_gia) VALUES (?,?,?,?)";
        return $this->insert($sql,"iiii",$orderDetailDTO->getId_donhang(),$orderDetailDTO->getId_sku(),$orderDetailDTO->getSo_luong(),$orderDetailDTO->getDon_gia());
    }
    public function countProductSold($filter){
        $type="";
        $params=array();
        $sql="SELECT ct.sku_id,CONCAT(sp.ten_sp, ' ' ,skus.sku_name) as ten_sp, SUM(ct.so_luong) as so_luong, SUM(ct.don_gia*ct.so_luong) as doanh_thu 
        FROM `chi_tiet_don_hang` as ct 
        INNER JOIN don_hang as dh on ct.id_donhang = dh.id
        INNER JOIN skus on ct.sku_id=skus.id
        INNER JOIN san_pham as sp on sp.id=skus.id_sp
        WHERE dh.status!=0 ";
        if($filter['started_date']!=null && $filter['ended_date']!=null){
            $type.="ss";
            $params[]=$filter['started_date'];
            $params[]=$filter['ended_date'];
            $sql.="AND Date(dh.created_date) BETWEEN ? AND ? ";
        }if($filter['category_id']!="all"){
            $type.="s";
            $params[]=$filter['category_id'];
            $sql.="AND sp.id_danh_muc= ? ";
        }
        $sql.="GROUP BY ct.sku_id ";
        if($filter['sort']=="total")
            $sql.="ORDER BY doanh_thu ";
        else $sql.="ORDER BY so_luong ";
        if($filter['sort']!="ASC"){
            $sql.="DESC";
        }
        return $this->read($sql,$type,...$params);
    }
}
?>