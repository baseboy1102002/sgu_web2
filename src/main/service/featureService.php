<?php

require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\featureDAO.php');

class featureService {

    private $featureDAO;

    function __construct() {
        $this->featureDAO = new featureDAO();
    }
 
    public function findAll() {
        $result = $this->featureDAO->findAll();
        return $result;
    }

}

?>
