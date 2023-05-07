<?php 
class orderDTO {
    private $id;
    private $id_tk;
    private $created_date;
    private $ten_nguoi_nhan;
    private $dia_chi;
    private $sdt;
    private $tong_tien;
    private $status;
    public function setId($id) {
        $this->id = $id;
    }
    public function getId() {
        return $this->id;
    }
    public function setId_tk($id_tk){
        $this->id_tk = $id_tk;
    }
    public function getId_tk(){
        return $this->id_tk;
    }
    public function setCreated_date($created_date){
        $this->created_date = $created_date;
    }
    public function getCreated_date(){
        return $this->created_date;
    }
    public function setTen_nguoi_nhan($ten_nguoi_nhan){
        $this->ten_nguoi_nhan=$ten_nguoi_nhan;
    }
    public function getTen_nguoi_nhan(){
        return $this->ten_nguoi_nhan;
    }
    public function setDia_chi($dia_chi){
        $this->dia_chi = $dia_chi;
    }
    public function getDia_chi(){
        return $this->dia_chi;
    }
    public function setSdt($sdt){
        $this->sdt = $sdt;
    }
    public function getSdt(){
        return $this->sdt;
    }
    public function setTong_tien($tong_tien){
        $this->tong_tien = $tong_tien;
    }
    public function getTong_tien(){
        return $this->tong_tien;
    }
    public function setStatus($status){
        $this->status = $status;
    }
    public function getStatus(){
        return $this->status;
    }

}



?>