<?php
class orderDetailDTO{
    private $id_donhang;
    private $sku_id;
    private $so_luong;
    private $don_gia;


    function __construct($id_donhang,$sku_id,$so_luong,$don_gia)
    {
        $this->id_donhang = $id_donhang;
        $this->sku_id = $sku_id;
        $this->so_luong= $so_luong; 
        $this->don_gia=$don_gia;
    }

    public function setId_donhang($id_donhang){
        $this->id_donhang = $id_donhang;
    }
    public function getId_donhang(){
        return $this->id_donhang;
    }
    public function setId_sku($sku_id){
        $this->sku_id = $sku_id;
    }
    public function getId_sku(){
        return $this->sku_id;
    }
    public function setSo_luong($so_luong){
        $this->so_luong= $so_luong;
    }
    public function getSo_luong(){
        return $this->so_luong;
    }
    public function setDon_gia($don_gia){
        $this->don_gia= $don_gia;
    }
    public function getDon_gia(){
        return $this->don_gia;
    }
}

?>