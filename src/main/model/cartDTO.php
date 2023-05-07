<?php 
class cartDTO{
    private $id;
    private $id_tk;


    public function getId(){
        return $this->id;
    }
    public function setId($id){
        $this->id = $id;
    }
    public function getId_tk(){
        return $this->id_tk;
    }
    public function setId_tk($id_tk){
        $this->id_tk = $id_tk;
    }
}

?>
