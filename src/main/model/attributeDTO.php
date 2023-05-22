<?php 

    class attributeDTO {
        private $id;
        private $ten_thuoc_tinh;

        public function setId($id) {
            $this->id = $id;
        }
        public function getId() {
            return $this->id;
        }

        public function setTen_thuoc_tinh($ten_thuoc_tinh) {
            $this->ten_thuoc_tinh = $ten_thuoc_tinh;
        }
        public function getTen_thuoc_tinh() {
            return $this->ten_thuoc_tinh;
        }
    }

?>