<?php

    class productVariantsDTO{
        
        private $id;
        private $sku_name;
        private $don_gia;
        private $so_luong;
        private $in_stock;
        private $id_san_pham;
        private $id_thuoc_tinh = array();
        private $id_gia_tri = array();
        private $created_date;
        private $modified_date;

        // function __construct() {
            
        // }

        // product id getter, setter
        public function setId($id) {
            $this->id = $id;
        }
        public function getId() {
            return $this->id;
        }

        // product name getter, setter
        public function setSku_name($sku_name) {
            $this->sku_name = $sku_name;
        }
        public function getSku_name() {
            return $this->sku_name;
        }

        // product price getter, setter
        public function setDon_gia($don_gia) {
            $this->don_gia = $don_gia;
        }
        public function getDon_gia() {
            return $this->don_gia;
        }

        // product status getter, setter
        public function setIn_stock($in_stock) {
            $this->in_stock = $in_stock;
        }
        public function getIn_stock() {
            return $this->in_stock;
        }

        public function setSo_luong($so_luong) {
            $this->so_luong = $so_luong;
        }
        public function getSo_luong() {
            return $this->so_luong;
        }

        public function setIDSan_pham($id_san_pham) {
            $this->id_san_pham = $id_san_pham;
        }
        public function getIDSan_pham() {
            return $this->id_san_pham;
        }

        public function setId_thuoc_tinh($id_thuoc_tinh) {
            $this->id_thuoc_tinh = $id_thuoc_tinh;
        }
        public function getId_thuoc_tinh() {
            return $this->id_thuoc_tinh;
        }

        public function setId_gia_tri($id_gia_tri) {
            $this->id_gia_tri = $id_gia_tri;
        }
        public function getId_gia_tri() {
            return $this->id_gia_tri;
        }

        public function setModified_date($modified_date) {
            $this->modified_date  =$modified_date;
        }
        public function getModified_date() {
            return $this->modified_date;
        }
        public function setCreated_date($created_date) {
            $this->created_date  =$created_date;
        }
        public function getCreated_date() {
            return $this->created_date;
        }
    }
?>