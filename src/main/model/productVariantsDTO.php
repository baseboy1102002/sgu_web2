<?php

    class productVariantsDTO{
        
        private $id;
        private $sku_name;
        private $don_gia;
        private $so_luong;
        private $in_stock;
        private $id_san_pham;

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
    }
?>