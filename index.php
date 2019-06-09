<?php defined('SPOT')?'':define( 'SPOT', '.' );
/**
 * Background home directory
 * */
define( 'THEME', 'admin' );
/**
 * System master directory
 * */
define( 'SYSTEM', 'system' );
/**
 * network route
 * */
$http = (isset($_SERVER['HTTPS'])&&$_SERVER['HTTPS']!='off')?'https://':'http://';
$HTTP_ARR = explode('/', $_SERVER['SERVER_PROTOCOL']);
define( 'PATH', str_replace($_SERVER['DOCUMENT_ROOT'], strtolower($http).$_SERVER['HTTP_HOST'], str_replace('\\', '/', dirname(__FILE__))) );
/**
 * File path
 **/
define( 'ROOT', dirname(__FILE__) );
/**
 * HTTPS URL
 **/
define( '_HTTP_', $http );
/**
 * Entry file 
 **/
require_once './public.php';