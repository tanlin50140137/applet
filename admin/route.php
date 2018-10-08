<?php
$route = array(
	/**
	 * logo
	 * */
	'logo' => array(
		'icon' => apth_url(THEME.'/images/logo.svg')
	),
	/**
	 * page title
	 * */
	'page' => array(
		'admin' => array(
			'title' => 'Applet-后台管理系统'
		),
		'login' => array(
			'title' => 'Applet-用户登录'
		),
		'userlogin' => array(
			'title' => 'Applet-用户注册'
		)
	),
	/**
	 * logo title
	 * */
	'title' => array(
		'admin' => array(
			'link' => apth_url(),
			'title' => 'Applet-微信开发管理系统 | SEO功能汇集'
		),
		'login' => array(
			'link' => apth_url(),
			'title' => 'Applet管理系统 | 用户登录'
		),
		'userlogin' => array(
			'link' => apth_url(),
			'title' => 'Applet管理系统 | 用户注册'
		)
	),
	/**
	 * bar
	 * */
	'bar' => array(
		'admin' => array(
			array(
				'link' 	=> apth_url(),
				'title' => '文档'
			),
			array(
				'link' 	=> apth_url(),
				'title' => '设置'
			),
			array(
				'link' 	=> apth_url(),
				'title' => '<img src="'.($data['pic']==null?apth_url(THEME.'/images/pic.svg'):apth_url('pic/'.$data['pic'])).'" alt="头像"/>'
			),
			array(
				'link' 	=> apth_url(),
				'title' => $data['users']
			)
			,
			array(
				'link' 	=> apth_url('SignOut'),
				'title' => '退出'
			)
		),
		'login' => array(
			array(
				'link' 	=> apth_url('userlogIn'),
				'title' => '立即注册'
			)
		),
		'userlogin' => array(
			array(
				
			)
		)
	),
	/**
	 * menu
	 * */
	'menu' => array(
		array(
			'link' 	=> apth_url(),
			'ind'  	=> '0',	
			'title' => '首页',
			'icon'	=> 'home32' /* 32x32 ；第一张名称为：home32_1 ；第二张名称为：home32_2*/
		),
		array(
			'link' 	=> apth_url('site'),
			'ind'  	=> '1',	
			'title' => '站点管理',
			'icon'	=> 'site32' /* 32x32 ；第一张名称为：site32_1 ；第二张名称为：site32_2*/
		),
		array(
			'link' 	=> apth_url('keyword'),
			'ind'  	=> '2',	
			'title' => '设置关键词',
			'icon'	=> 'keyword32' /* 32x32 ；第一张名称为：keyword32_1 ；第二张名称为：keyword32_2*/
		),
		array(
			'link' 	=> apth_url('recharge'),
			'ind'  	=> '3',	
			'title' => '充值站点',
			'icon'	=> 'recharge32' /* 32x32 ；第一张名称为：recharge32_1 ；第二张名称为：recharge32_2*/
		)
	)
);