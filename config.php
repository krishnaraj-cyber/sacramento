<?php
// Define Path Application
define('SCRIPT', str_replace('\\', '/', rtrim(__DIR__, '/')) . '/');
define('SYSTEM', SCRIPT . 'System/');
define('CONTROLLERS', SCRIPT . 'Api/Controllers/');
define('MODELS', SCRIPT . 'Api/Models/');
define('SERVICES', SCRIPT . 'Services/');
define('VIDEO', SCRIPT . 'Upload/video');
define('PDF', SCRIPT . 'Upload/pdf');
// Config Database
define('DATABASE', [
   /*  'Port'   => '3306',
    'Host'   => 'localhost',
    'Driver' => 'PDO',
    'Name'   => 'cia_online_learning',
    'User'   => 'root',
    'Pass'   => '',
    'Prefix' => 'cia_'*/

    // 'Port'   => '3306',
    // 'Host'   => 'localhost',
    // 'Driver' => 'PDO',
    // 'Name'   => 'sacra_mento',
    // 'User'   => 'root',
    // 'Pass'   => '',
    // 'Prefix' => 'sacra_'

    
    'Port'   => '3306',
    'Host'   => '89.116.53.23',
    'Driver' => 'PDO',
    'Name'   => 'u937770786_sactamil',
    'User'   => 'u937770786_sactamil',
    'Pass'   => 'S=FJB^y3',
    'Prefix' => 'u937770786_'

   
    
    
]);

// DB_PREFIX
define('DB_PREFIX', 'sacra_');
?>