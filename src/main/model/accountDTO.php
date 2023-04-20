<?php 

    class accountDTO {

        private $id;
        private $ten_tk;
        private $password;
        private $email;
        private $idNhomuyen;
        private $status;


        public function getId() {
            return $this->id;
        }
        public function setId($id) {
            $this->id = $id;
        } 

        public function getTen_tk() {
            return $this->ten_tk;
        }
        public function setTen_tk($ten_tk) {
            $this->ten_tk = $ten_tk;
        }

        public function getPassword() {
            return $this->password;
        }
        public function setPassword($password) {
            $this->password = $password;
        }

        public function getEmail() {
            return $this->email;
        }
        public function setEmail($email) {
            $this->email = $email;
        }

        public function getIdNhomquyen() {
            return $this->idNhomuyen;
        }
        public function setIdNhomquyen($idNhomquyen) {
            $this->idNhomuyen = $idNhomquyen;
        }

        public function getStatus() {
            return $this->status;
        }
        public function setStatus($status) {
            $this->status = $status;
        }
    }

?>