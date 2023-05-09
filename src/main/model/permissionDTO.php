<?php 

    class permissionDTO {
        private $id;
        private $ten_nhom_quyen;
        private $id_chuc_nang = array();
        private $read = array();
        private $update = array();
        private $delete = array();
        private $insert = array();
        
        public function setId($id) {
            $this->id = $id;
        }
        public function getId() {
            return $this->id;
        }

        public function setTen_nhom_quyen($ten_nhom_quyen) {
            $this->ten_nhom_quyen = $ten_nhom_quyen;
        }
        public function getTen_nhom_quyen() {
            return $this->ten_nhom_quyen;
        }

        public function setId_chuc_nang($id_chuc_nang) {
            $this->id_chuc_nang = $id_chuc_nang;
        }
        public function getId_chuc_nang() {
            return $this->id_chuc_nang;
        }

        public function setRead($read) {
            $this->read = $read;
        }
        public function getRead() {
            return $this->read;
        }

        public function setUpdate($update) {
            $this->update = $update;
        }
        public function getUpdate() {
            return $this->update;
        }

        public function setDelete($delete) {
            $this->delete = $delete;
        }
        public function getDelete() {
            return $this->delete;
        }

        public function setInsert($insert) {
            $this->insert = $insert;
        }
        public function getInsert() {
            return $this->insert;
        }
    }

?>