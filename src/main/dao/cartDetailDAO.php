<?php
    require_once '../../../../config.php';
    require_once(ROOT.'\src\main\dao\dbDAO.php');
    require_once(ROOT.'\src\main\model\cartDetailDTO.php'); 
class cartDetailDAO extends dbDAO{

    public function getAllByCartId($id){
        $sql="SELECT ct.id_sku,CONCAT(sp.ten_sp, ' ' ,skus.sku_name) as ten_sp,sp.img_path, skus.don_gia,ct.quantity,skus.in_stock,skus.so_luong FROM chi_tiet_gio_hang as ct 
        INNER JOIN skus ON ct.id_sku=skus.id
        INNER JOIN san_pham as sp ON skus.id_sp=sp.id
        WHERE ct.id_gio_hang=?";
        $result =$this->read($sql,"i",$id);
        return $result;
    }
    public function checkProductInCart($cartDetailDTO){
        $sql="SELECT * FROM chi_tiet_gio_hang WHERE id_gio_hang=? AND id_sku =?";
        $result=$this->read($sql,"is",$cartDetailDTO->getId_gio_hang(),$cartDetailDTO->getId_sku());
        return $result;
    }
    public function getQuantityInCart($id_sku){
        $sql="SELECT ct.quantity,skus.sku_name FROM chi_tiet_gio_hang as ct 
        INNER JOIN skus on ct.id_sku = skus.id WHERE ct.id_sku=? AND skus.in_stock=?";
        $result=$this->read($sql,"ii",$id_sku,1);
        return $result;
    }
    public function addToCart($cartDetailDTO){
        $sql="INSERT INTO chi_tiet_gio_hang(id_gio_hang,id_sku,quantity)
        SELECT ?,id,? FROM skus WHERE id=? AND so_luong>=? AND in_stock=1";
        $result=$this->insert($sql,"iiii",$cartDetailDTO->getId_gio_hang(),$cartDetailDTO->getQuantity(),$cartDetailDTO->getId_sku(),$cartDetailDTO->getQuantity());
        return $result;
    }
    // public function increaseQuantity($cartDetailDTO){
    //     $sql="UPDATE chi_tiet_gio_hang SET quantity=quantity+1 where id_gio_hang=? And id_sku=?";
    //     $result=$this->update($sql,"ii",$cartDetailDTO->getId_gio_hang(),$cartDetailDTO->getId_sku());
    //     return $result;
    // }
    // public function decreaseQuantity($cartDetailDTO){
    //     $sql="UPDATE chi_tiet_gio_hang SET quantity=quantity-1 where id_gio_hang=? And id_sku=?";
    //     $result=$this->update($sql,"ii",$cartDetailDTO->getId_gio_hang(),$cartDetailDTO->getId_sku());
    //     return $result;
    // }
        public function updateQuantity($cartDetailDTO){
            $sql="UPDATE chi_tiet_gio_hang SET quantity = ? Where id_gio_hang = ? and id_sku IN (SELECT id from skus WHERE so_luong>=? AND id =?)";
            $result=$this->update($sql,"iiii",$cartDetailDTO->getQuantity(),$cartDetailDTO->getId_gio_hang(),$cartDetailDTO->getQuantity(),$cartDetailDTO->getId_sku());
            return $result;
        }
        public function RemoveItemFromCart($cartDetailDTO){
            $sql="DELETE FROM chi_tiet_gio_hang WHERE id_gio_hang=? AND id_sku =? ";
            return $this->update($sql,"ii",$cartDetailDTO->getId_gio_hang(),$cartDetailDTO->getId_sku());
            
        }

}
?>