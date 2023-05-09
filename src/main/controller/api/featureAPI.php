<?php

require_once '../../../../config.php';
require_once (ROOT.'\src\main\service\featureService.php');


class featureAPI{

    private $featureService;

    function __construct() {
        $this->featureService = new featureService();
    }
    
    public function getAllFeature() {
        $result = $this->featureService->findAll();
    
        if ($result->num_rows > 0) {
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($rows);
        } else {
            header('HTTP/1.0 404 Not Found');
        }
    }

}

$method = $_SERVER['REQUEST_METHOD'];
$featureAPI = new featureAPI();
switch ($method) {
    // SELECT
    case 'GET':
        $featureAPI->getAllFeature();
        break;
    case 'POST':

        break;
    case 'PUT':

        break;
    case 'DELETE':

        break;
}

?>
