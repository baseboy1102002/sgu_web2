<?php 

    class attributeValueDTO {
        private $id;
        private $gia_tri = array();
        private $id_thuoc_tinh;
        private $ids = array();
        
        public function setId($id) {
            $this->id = $id;
        }
        public function getId() {
            return $this->id;
        }

        public function setGia_tri($gia_tri) {
            $this->gia_tri = $gia_tri;
        }
        public function getGia_tri() {
            return $this->gia_tri;
        }

        public function setId_thuoc_tinh($id_thuoc_tinh) {
            $this->id_thuoc_tinh = $id_thuoc_tinh;
        }
        public function getId_thuoc_tinh() {
            return $this->id_thuoc_tinh;
        }

        public function setIds($ids) {
            $this->ids = $ids;
        }
        public function getIds() {
            return $this->ids;
        }
    }

?>