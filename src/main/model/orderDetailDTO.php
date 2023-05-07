<?php
class orderDetailDTO{
    private $id_donhang;
    private $sku_id;
    private $so_luong;


    function __construct($id_donhang,$sku_id,$so_luong)
    {
        $this->id_donhang = $id_donhang;
        $this->sku_id = $sku_id;
        $this->so_luong= $so_luong; 
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
}

?>