<?php 
class cartDetailDTO{
    private $id_gio_hang;
    private $id_sku;
    private $quantity;
    
    
    function __construct($id_gio_hang,$id_sku,$quantity)
    {
        $this->id_gio_hang=$id_gio_hang;
        $this->id_sku=$id_sku;
        $this->quantity=$quantity;
    }

    public function getId_gio_hang(){
        return $this->id_gio_hang;
    }
    public function setId_gio_hang($id_gio_hang){
        $this->id_gio_hang=$id_gio_hang;
    }
    public function getId_sku(){
        return $this->id_sku;
    }
    public function setId_sku($id_sku){
        $this->id_sku=$id_sku;
    }
    public function getQuantity(){
        return $this->quantity;
    }
    public function setQuantity($quantity){
        $this->quantity=$quantity;
    }
}





?>