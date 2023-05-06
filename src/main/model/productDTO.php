<?php

    class productDTO{
        
        private $id;
        private $ten_sp;
        private $description;
        private $img_path;
        private $in_stock;
        private $id_danh_muc;
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
        public function setTen_sp($ten_sp) {
            $this->ten_sp = $ten_sp;
        }
        public function getTen_sp() {
            return $this->ten_sp;
        }

        // product price getter, setter
        public function setDescription($description) {
            $this->description = $description;
        }
        public function getDescription() {
            return $this->description;
        }

        // product status getter, setter
        public function setIn_stock($in_stock) {
            $this->in_stock = $in_stock;
        }
        public function getIn_stock() {
            return $this->in_stock;
        }

        public function setImg_path($img_path) {
            $this->img_path = $img_path;
        }
        public function getImg_path() {
            return $this->img_path;
        }

        public function setIDdanhmuc($id_danh_muc) {
            $this->id_danh_muc = $id_danh_muc;
        }
        public function getIDDanhmuc() {
            return $this->id_danh_muc;
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