<?php defined('SPOT')?'':exit('Can not be opened, not the only entrance.');
/**
 * 全局公用文件，适用于所有控制
 * */
$userrows = CheckIn();
$xmlMenu = ReadXml( dirname(__FILE__).'/.selectionmenu.xml' );
$route 	 = configuration( $userrows );
$menu 	 = $route['menu'];
$logo 	 = $route['logo']; 
$title 	 = $route['title'];
$bar 	 = $route['bar'];
$page    = $route['page'];
