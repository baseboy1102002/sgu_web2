<?php

require_once '../../../../config.php';
require_once(ROOT.'\src\main\dao\dbDAO.php');

class featureDAO extends dbDAO {

    public function findAll() {
        $sql = "SELECT * FROM chuc_nang";
        $result = $this->read($sql);
        return $result;
    }
}

?>
