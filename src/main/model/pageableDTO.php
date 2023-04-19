<?php

    class pageableDTO{
        
        private $page;
        private $itemPerPage;
        private $categoryId;
        private $priceStart;
        private $priceEnd;
        private $key_words;
        private $totalPages;

        // function __construct() {
            
        // }

        // product id getter, setter
        public function setPage($page) {
            $this->page = $page;
        }
        public function getPage() {
            return $this->page;
        }

        // product name getter, setter
        public function setItemPerPage($itemPerPage) {
            $this->itemPerPage = $itemPerPage;
        }
        public function getItemPerPage() {
            return $this->itemPerPage;
        }

        // product price getter, setter
        public function setCategoryId($categoryId) {
            $this->categoryId = $categoryId;
        }
        public function getCategoryId() {
            return $this->categoryId;
        }

        // product status getter, setter
        public function setPriceStart($priceStart) {
            $this->priceStart = $priceStart;
        }
        public function getPriceStart() {
            return $this->priceStart;
        }

        public function setPriceEnd($priceEnd) {
            $this->priceEnd = $priceEnd;
        }
        public function getPriceEnd() {
            return $this->priceEnd;
        }

        public function setKey_words($key_words) {
            $this->key_words = $key_words;
        }
        public function getKey_words() {
            return $this->key_words;
        }

        public function setTotalPages($totalPages) {
            $this->totalPages = $totalPages;
        }
        public function getTotalPages() {
            return $this->totalPages;
        }

        public function hasAnyFilter() {
            return $this->categoryId!=null || $this->key_words!=null
            || $this->priceStart!=null || $this->priceEnd!=null;
        }
    }
?>