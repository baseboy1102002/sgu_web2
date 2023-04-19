<?php 

    class categoryDTO {
        private $id;
        private $ten_danh_muc;

        // function __construct($id, $ten_danh_muc) {
        //     $this->id = $id;
        //     $this->ten_danh_muc = $ten_danh_muc;
        // }

        public function setId($id) {
            $this->id = $id;
        }
        public function getId() {
            return $this->id;
        }

        public function setTen_danh_muc($ten_danh_muc) {
            $this->ten_danh_muc = $ten_danh_muc;
        }
        public function getTen_danh_muc() {
            return $this->ten_danh_muc;
        }
    }

?>