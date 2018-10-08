<?php
/**
 * 自定义函数
 * */
function SelectionMenu()
{
	$filename = dirname(__FILE__).'/'.SPOT.strtolower(__FUNCTION__).SPOT.'xml';
	
	$data = xml_str(array('id'=>$_POST['id']));
	
	file_put_contents($filename, $data);
}
function SignOut()
{
	session_start();
	
	$_SESSION['USER_LOGININ'] = null;
	$_COOKIE['USER_LOGININ'] = null;
	setcookie('USER_LOGININ',null,time()-1,'/');
	unset($_COOKIE['USER_LOGININ']);
	unset($_SESSION['USER_LOGININ']);
	
	header('location:'.apth_url());
}