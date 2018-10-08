# applet
微信后台安装，一键安装

Liunx系统 git下载:

git clone https://github.com/tanlin50140137/applet.git

需要权限的目录和文件:

system/config 目录需要读写权限,动态生成配置文件。

admin/.selectionmenu.xml 文件需要读写权限，否则右侧菜单栏选中效果无效。

Liunx下开启权限命令：

1). system/config 目录

cd system   进入system目录后执行以下命令：

chmod 0777 config

2). admin/.selectionmenu.xml 文件

cd admin   进入admin目录后执行以下命令：

chmod 0777 .selectionmenu.xml
