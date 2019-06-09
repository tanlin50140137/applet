/*userment.html-js文件 */
///////////////////////////////////////////////////////////////////////////////////////////
//添加会员
function adduser()
{
	$.post(wx.request.url+"/getlaevel",{'flag':'1'},function(d){
		var obj = eval("("+d+")");
		if( obj.error == 0 )
		{	
			var len = obj.msg.length;
						
			var html  = '<form id="send_frm">';	
			html += '<div style="margin:1.6rem;">';
			html += '<div style="font-size:1.3rem;line-height:4rem;margin-top:2rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">手机号码</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p><input type="text" name="tel" value="" placeholder="手机号码" style="border:1px solid #f1ecec;padding:0.5rem;width:30rem;border-radius:0.2rem;outline:none;"/></p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">登录密码</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p><input type="text" name="password" value="" placeholder="登录密码" style="border:1px solid #f1ecec;padding:0.5rem;width:30rem;border-radius:0.2rem;outline:none;"/></p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">所在地区</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p>';
			html += '<select name="city1" id="selea1" onchange="selSha1(this);" style="border:1px solid #f1ecec;margin-right:0.5rem;">';			
			html += '<option value="-1">请选择省份</option>';			
			html += '</select>';
			html += '<select name="city2" id="selea2" onchange="selSha2(this);" style="border:1px solid #f1ecec;margin-right:0.5rem;">';			
			html += '<option value="-1">请选择城市</option>';			
			html += '</select>';
			html += '<select name="city3" id="selea3" style="border:1px solid #f1ecec;margin-right:0.5rem;">';			
			html += '<option value="-1">请选择地区</option>';			
			html += '</select>';
			html += '</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">会员等级</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p><select name="level_l" style="border:1px solid #f1ecec;">';
		for(var i=0;i<len;i++)
		{	
			html += '<option value="'+obj.msg[i].id+'">'+obj.msg[i].name+'</option>';
		}		
			html += '</select>';
			html += '</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">上级推荐</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p><input type="text" name="pid_code" value="" placeholder="上级推荐" style="border:1px solid #f1ecec;padding:0.5rem;width:30rem;border-radius:0.2rem;outline:none;"/></p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div onclick="add_user();" style="border:1px solid #eadede;font-size:1.3rem;line-height:3rem;margin-top:1rem;text-align:center;width:31rem;border-radius:0.2rem;background:#f1eded;cursor:pointer;margin-left:10rem;">提交</div>';
			html += '</div>';
			html += '</form>';
			layer.open({
				  type: 1,
				  title:'添加会员',
				  skin: 'layui-layer-demo', //样式类名
				  area: ['600px', '390px'],
				  anim: 2,
				  shadeClose: true, //开启遮罩关闭
				  content: html
			});
		}
		else
		{
			alert(obj.msg);
		}	
	});
	
	$.ajax({
		url:wx.request.url+'/get_address_earts',
		type:'post',
		data:'flag=all',
		success:function(d){
			var obj = eval("("+d+")");	
			var str = '';
			for( x in obj.msg )
			{				
				str += '<option value="'+x+'">'+obj.msg[x]+'</option>';
			}
			$("#selea1").append(str);					
		}
	});
}
/**********************************************************************************************************/
function selSha1(t)
{
	var index = $(t).val();  //省
	
	if( index != -1 )
	{
		$("#selea2").empty();
		$("#selea3").empty();
		$.ajax({
			url:wx.request.url+'/get_address_earts',
			type:'post',
			data:'flag=sub&index='+index,
			success:function(d){
				var obj = eval("("+d+")");	
				var str = '';
				var index2 = '';
				for( x in obj.msg )
				{
					if( x == 0 )
					{
						index2 = 0;
					}
					str += '<option value="'+x+'">'+obj.msg[x]+'</option>';
				}
				$("#selea2").append(str);	
				
				$.ajax({
					url:wx.request.url+'/get_address_earts',
					type:'post',
					data:'flag=sub2&index='+index+'&index2='+index2,
					success:function(d){
						var obj = eval("("+d+")");	
						var str = '';
						for( x in obj.msg )
						{
							str += '<option value="'+x+'">'+obj.msg[x]+'</option>';
						}
						$("#selea3").append(str);			
					}
				});
			}
		});
	}
	else
	{
		$("#selea2").empty();
		$("#selea3").empty();
		$("#selea2").append('<option value="-1">请选择城市</option>');
		$("#selea3").append('<option value="-1">请选择地区</option>');
	}
}
function selSha2(t)
{
	var index  = $("#selea1").val(); //省
	var index2 = $(t).val();  		 //市
	if( index2 != -1 )
	{
		$("#selea3").empty();
		$.ajax({
			url:wx.request.url+'/get_address_earts',
			type:'post',
			data:'flag=sub2&index='+index+'&index2='+index2,
			success:function(d){
				var obj = eval("("+d+")");	
				var str = '';
				for( x in obj.msg )
				{
					str += '<option value="'+x+'">'+obj.msg[x]+'</option>';
				}
				$("#selea3").append(str);			
			}
		});
	}
	else
	{
		$("#selea3").empty();
		$("#selea3").append('<option value="-1">请选择地区</option>');
	}	
}
/**********************************************************************************************************/
var goods_id = 1;
//提交
function add_user()
{
	var tel = $("[name=tel]").val();
	if( tel == '' )
	{
		layer.tips('请输入手机号码', '[name=tel]');
		$("[name=tel]").focus();
		return false;
	}	
	var password = $("[name=password]").val();
	if( password == '' )
	{
		layer.tips('请输入密码', '[name=password]');
		$("[name=password]").focus();
		return false;
	}	
	var selea1 = $("#selea1").val();
	if( selea1 == -1 )
	{
		layer.tips('请选择地区', '#selea1');
		$("#selea1").focus();
		return false;
	}
	
	//禁止重复提交
	if(goods_id == 0 ){
		return false;
	}
	
	var datainfo = $("#send_frm").serialize();
	
	var index;
	$.ajax({
		url:wx.request.url+'/add_user',
		type:'post',
		data:datainfo,
		beforeSend:function(){
			goods_id = 0;
			index = layer.load(1, {shade: false});
		},
		complete:function(){
			goods_id = 1;
			layer.close(index)
		},
		success:function(d){
			//alert(d);return false;
			var obj = eval("("+d+")");		
			if( obj.error == 0 )
			{
				location.href=wx.request.url+"/userment";
			}	
			else
			{
				alert(obj.msg);
			}	
		}
	});
}
//分页
function getGo(flag)
{
	var getGo = $("#getGo").val();
	var f = flag==''?'':'/'+flag;
	if( getGo != '' )
	{
		location.href=wx.request.url+"/userment/"+getGo+f;
	}	
	else
	{
		$("#getGo").focus();
	}	
}
//查看个人信息
function lookinfo(id)
{
	$.post(wx.request.url+"/lookinfo_useinfo",{'id':id},function(d){
			
		var obj = eval("("+d+")");
		if( obj.error == 0 )
		{
			var html  = '';	
			html += '<div style="margin:1.6rem;">';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;margin-top:2rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">ID</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;">'+obj.msg.id+'</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">上级</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;">'+obj.msg.pid+'</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">等级</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;">'+obj.msg.level_l+'</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">推荐码</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;">'+obj.msg.ref_code+'</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">微信OPENDID</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;">'+obj.msg.openid+'</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">unionid</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;">'+obj.msg.unionid+'</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">支付宝b_id</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;">'+obj.msg.buy_id+'</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">用户名</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;">'+obj.msg.username+'</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">昵称</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;">'+obj.msg.nickname+'</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">手机</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;">'+obj.msg.tel+'</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">邮箱</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;">'+obj.msg.email+'</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">真实姓名</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;">'+obj.msg.realname+'</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">身份证</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;">'+obj.msg.pin_codes+'</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
//			html += '<div style="font-size:1.3rem;line-height:4rem;">';
//			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">证件</div>';
//			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
//			
//			if(obj.msg.front_card!=''){var froobj = eval("("+obj.msg.front_card+")");}	
//			if(obj.msg.reverse_card!=''){var revobj = eval("("+obj.msg.reverse_card+")");}				
//			html += '<p style="color:#000000;font-size:1.3rem;"><img src="'+wx.request.url+'/'+froobj[1]+'" style="height:10rem;"/></p>';
//			html += '<p style="color:#000000;font-size:1.3rem;"><img src="'+wx.request.url+'/'+revobj[2]+'" style="height:10rem;"/></p>';
//			
//			html += '</div>';
//			html += '<div style="clear:both;"></div>';
//			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">支付宝</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;">'+obj.msg.alipay+'</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">头像</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;"><img src="'+obj.msg.pic+'" style="width:3rem;"/></p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">推广二维码</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;"><img src="'+obj.msg.qrcode+'" style="width:12rem;"/></p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">个人收款码</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;"><img src="'+obj.msg.pay_code+'" style="width:12rem;"/> &nbsp; <a href="javascript:;" onclick="Regenerate('+id+');">重新生成</a></p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">归属地</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;">'+obj.msg.province+' '+obj.msg.city+' '+obj.msg.area+'</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">注册时间</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;">'+obj.msg.create_time+'</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">备注</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p style="color:#000000;font-size:1.3rem;">'+obj.msg.remark+'</p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
				
			html += '</div>';
		
			layer.open({
				  type: 1,
				  title:'会员信息',
				  skin: 'layui-layer-demo', //样式类名
				  area: ['1000px', '750px'],
				  anim: 2,
				  shadeClose: true, //开启遮罩关闭
				  content: html
			});
		}
		else
		{
			layer.msg(obj.msg);
		}	
	});
}
///////////////////////////////////////////////////////////////////////////////////////////
//重新生成
function Regenerate(id)
{
	$.post(wx.request.url+'/resetRegenerateCode',{id:id},function(d){
		var obj = eval("("+d+")");
		if( obj.error == 0 )
		{
			layer.msg(obj.msg);
		}
		else
		{
			layer.msg(obj.msg);
		}	
	});
}
//查看推荐二维码
function getqrcode(code,id)
{
	var html  = '<form id="frmcode" action="'+wx.request.url+'/down_user" method="post"><div style="margin:1.6rem;"><input type="hidden" name="code" value="'+code+'"/>';
	html += '<div style="font-size:1.3rem;line-height:4rem;text-align:center;"><img src="'+wx.request.url+'/'+code+'"/></div>';
	html += '<div onclick="down_user();" style="border:1px solid #eadede;font-size:1.3rem;line-height:3rem;margin-top:2rem;text-align:center;width:21.6rem;margin-left:6.6rem;border-radius:0.2rem;background:#f1eded;cursor:pointer;">下载</div>';
	html += '</div></form>';
	layer.open({
		  type: 1,
		  title:'查看会员推广二维码，ID:'+id,
		  skin: 'layui-layer-demo', //样式类名
		  area: ['453px', '380px'],
		  anim: 2,
		  shadeClose: true, //开启遮罩关闭
		  content: html
	});
}
//下载
function down_user()
{
	$("#frmcode").submit();
}
///////////////////////////////////////////////////////////////////////////////////////////
//搜索
function sreach_send(page,level)
{
	var sreach = $("#sreach").val();
	if( sreach != '' )
	{
		location.href=wx.request.url+"/userment/"+page+"/"+(level==''?'null':level)+"/"+sreach;
	}	
	else
	{
		location.href=wx.request.url+"/userment";
	}
}
//更改
function openupdateuser(id,page)
{
	$.post(wx.request.url+"/updateuser",{id:id,page:page},function(d){
		//alert(d);return false;
		var obj = eval("("+d+")");
		if( obj.error == 0 )
		{	
			var html  = '<form id="send_frm"><input type="hidden" name="ref_code" value="'+obj.msg.ref_code+'"/>';
			html += '<div style="margin:1.6rem;">';
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:9.6rem;line-height:9.9rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">LOGO</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p><img src="'+obj.msg.pic+'" id="img_url" style="width:65px;height:65px;border:1px solid #efebeb;border-radius:30rem;"/></p>';
			html += '<p><input type="file" name="file" onchange="previewImage(this);" id="upFileInput"/></p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">用户昵称</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p><input type="text" name="nickname" value="'+obj.msg.nickname+'" placeholder="用户昵称" style="border:1px solid #f1ecec;padding:0.5rem;width:30rem;border-radius:0.2rem;outline:none;"/></p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">性别</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p><select name="sex" style="border:1px solid #f1ecec;"><option value="0" '+(obj.msg.sex==0?'selected':'')+'>保密</option><option value="1" '+(obj.msg.sex==1?'selected':'')+'>男</option><option value="2" '+(obj.msg.sex==2?'selected':'')+'>女</option></select></p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">手机号码</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p><input type="text" name="tel" value="'+obj.msg.tel+'" placeholder="绑定手机号码" style="border:1px solid #f1ecec;padding:0.5rem;width:30rem;border-radius:0.2rem;outline:none;"/></p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">邮箱号码</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p><input type="text" name="email" value="'+obj.msg.email+'" placeholder="绑定邮箱号码" style="border:1px solid #f1ecec;padding:0.5rem;width:30rem;border-radius:0.2rem;outline:none;"/></p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">实名</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p><input type="text" name="realname" value="'+obj.msg.realname+'" placeholder="真实姓名" style="border:1px solid #f1ecec;padding:0.5rem;width:30rem;border-radius:0.2rem;outline:none;"/></p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">身份证号码</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p><input type="text" name="pin_codes" value="'+obj.msg.pin_codes+'" placeholder="身份证号码" style="border:1px solid #f1ecec;padding:0.5rem;width:30rem;border-radius:0.2rem;outline:none;"/></p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">支付宝帐号</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p><input type="text" name="alipay" value="'+obj.msg.alipay+'" placeholder="绑定支付宝帐号" style="border:1px solid #f1ecec;padding:0.5rem;width:30rem;border-radius:0.2rem;outline:none;"/></p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">银行帐户</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p><input type="text" name="account" value="'+obj.msg.account+'" placeholder="绑定银行帐户" style="border:1px solid #f1ecec;padding:0.5rem;width:30rem;border-radius:0.2rem;outline:none;"/></p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">开户行</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p><input type="text" name="bank" value="'+obj.msg.bank+'" placeholder="输入开户行" style="border:1px solid #f1ecec;padding:0.5rem;width:30rem;border-radius:0.2rem;outline:none;"/></p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
			
			html += '<div style="font-size:1.3rem;line-height:4rem;">';
			html += '<div style="height:4rem;line-height:4rem;width:20%;font-size:1.2rem;color:#9e9b9b;float:left;text-align:center;">支付密码</div>';
			html += '<div style="width:78.6%;font-size:1.2rem;color:#9e9b9b;float:left;">';
			html += '<p><input type="password" name="pay_pwd" value="'+(obj.msg.pay_pwd==''?'':obj.msg.pay_pwd)+'" placeholder="设置支付密码" style="border:1px solid #f1ecec;padding:0.5rem;width:30rem;border-radius:0.2rem;outline:none;"/></p>';
			html += '</div>';
			html += '<div style="clear:both;"></div>';
			html += '</div>';
					
			html += '<div onclick="upuserinfo('+id+','+page+');" style="border:1px solid #eadede;font-size:1.3rem;line-height:3rem;margin-top:1rem;text-align:center;width:31rem;border-radius:0.2rem;background:#f1eded;cursor:pointer;margin-left:12.9rem;">提交</div>';
			html += '</div>';
			html += '</form>';
			layer.open({
				  type: 1,
				  title:'更改会员信息，ID:'+id,
				  skin: 'layui-layer-demo', //样式类名
				  area: ['800px', '760px'],
				  anim: 2,
				  shadeClose: true, //开启遮罩关闭
				  content: html
			});
		}
		else
		{
			layer.msg(obj.msg);
		}	
	});
}
var goods_id=1;
//修改用户名
function upuserinfo(id,page)
{
	if( $("[name=nickname]").val() == '' )
	{
		layer.msg('用户昵称不能为空！');
		$("[name=nickname]").focus();
		return false;
	}	
	if( $("[name=tel]").val() == '' )
	{
		layer.msg('手机号码不能为空！');
		$("[name=tel]").focus();
		return false;
	}
	
	//禁止重复提交
	if(goods_id == 0 ){
		return false;
	}
	
	var formData = new FormData();		
	var f = document.getElementById("upFileInput");
	formData.append("file",f.files[0]);
	formData.append("nickname",$("[name=nickname]").val());
	formData.append("sex",$("[name=sex]").val());
	formData.append("tel",$("[name=tel]").val());
	formData.append("email",$("[name=email]").val());
	formData.append("realname",$("[name=realname]").val());
	formData.append("pin_codes",$("[name=pin_codes]").val());
	formData.append("alipay",$("[name=alipay]").val());
	formData.append("account",$("[name=account]").val());
	formData.append("bank",$("[name=bank]").val());
	formData.append("pay_pwd",$("[name=pay_pwd]").val());
	formData.append("id",id);
	formData.append("ref_code",$("[name=ref_code]").val());
	
	var index1='';
	$.ajax({
		url:wx.request.url+"/upuserinfo",
		type:"POST",
		data:formData,
		cache : false,          
		processData : false,  
		contentType : false,
		beforeSend:function(){
			goods_id=0;
			index1 = layer.load(1, {shade: false});
		},
		complete:function(){
			goods_id=1;
			layer.close(index1)
		},
		success:function(data){
			var obj = eval("("+data+")");
			if( obj.error == 0 )
			{
				layer.msg(obj.msg,{time:1000},function(){
					location.href=wx.request.url+"/userment/"+page;
				});
			}	
			else
			{
				layer.msg(obj.msg);
			}	
		}
	});
}
//删除
function opendeleteuser(id,page)
{
	layer.confirm('是否要删除会员？', {
		  title:'删除会员帐户信息',
		  btn: ['确定','取消'] //按钮
	}, function(){
		 $.post(wx.request.url+'/deleteuser',{id:id,page:page},function(d){
			 	var obj = eval("("+d+")");
				if( obj.error == 0 )
				{
					layer.msg(obj.msg, {icon: 1}, function(){
						location.href=wx.request.url+"/userment/"+page;
					});
				}	
				else
				{
					layer.msg(obj.msg);
				}			 
		 }); 
	}, function(){});
}
//对帐单
function openaccount(id,page)
{
	var html  = '<form id="send_frm">';
	html += '<div style="margin:1.6rem;">';
	html += '<div style="margin:1.6rem;">';
	html += '<div style="border:1px solid red;font-size:1.3rem;line-height:4rem;">';
	html += '开始 <input type="text" readonly id="start_time" placeholder="yyyy-MM-dd" class="sreach_txt" style="width:10rem;padding:0 0.3rem;text-align: center;"/>';
	html += '~ <input type="text" readonly id="end_time" placeholder="yyyy-MM-dd" class="sreach_txt" style="width:10rem;padding:0 0.3rem;text-align: center;"/>';
	html += '</div>';
	html += '<div style="clear:both;"></div>';
	html += '</div>';
	
	html += '</div>';
	html += '</form>';
	layer.open({
		  type: 1,
		  title:'下载对帐单',
		  skin: 'layui-layer-demo', //样式类名
		  area: ['1000px', '760px'],
		  anim: 2,
		  shadeClose: true, //开启遮罩关闭
		  content: html
	});
}
//下单个人钱包对帐单
function downloadRecon(id)
{
	location.href=wx.request.url+"/downloadRecon/"+id;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//预览图片
function previewImage(file){
	if(file.files && file.files[0]){
		var img = $("#img_url")[0];
		var reader = new FileReader(),rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;;  
		
		var size = file.size;
		var Max_Size = 2000*1024;
		var width,height;
		var image = new Image();
		
		reader.onload = function(evt){
			img.src=evt.target.result;			
			var data = evt.target.result;
			/*
			image.onload=function(){
			width = image.width;
			height = image.height;
			if(width>img.width && height>img.height){ 
			alert("图片宽高不符合要求，请上传宽高"+img.width+"*"+img.height+"像素图片");
			}
			};*/
			image.src= data; 
		} 
	
	    if(!rFilter.test(file.files[0].type)) { alert("文件类型不正确 "); return; }
	    if(size>Max_Size){ alert("文件大小不能超出2M"); return; }
	    
	    reader.readAsDataURL(file.files[0]);
    }    
}

//展示个人团队
function show_personal_team(id)
{
	$.post(wx.request.url+"/show_personal_team",{'id':id},function(d){
		var obj = eval("("+d+")");
		if( obj.error == 0 )
		{	
			var html = '<div class="showallbox">';
				html += '<script type="text/javascript">';
				html += 'var goods = new dTree(\'goods\',\''+wx.request.url+'\');';
				html += 'goods.add(0,-1,\'层级管理 -- 会员团队\');';
			for(x in obj.msg)
			{	
				html += 'goods.add(\''+obj.msg[x].id+'\',\''+obj.msg[x].pid+'\',\' '+obj.msg[x].nickname+'." -- "'+obj.msg[x].level_l+'" -- id("'+obj.msg[x].id+'")"?>\',\'\',\'\',\'\',\''+obj.msg[x].pic+'\',\''+obj.msg[x].pic+'\');';
			}
				html += 'document.write(goods);';
				html += '</script>';
				html += '</div>';
			
			layer.open({
				  type: 1,
				  title:'添加会员',
				  skin: 'layui-layer-demo', //样式类名
				  area: ['850px', '650px'],
				  anim: 2,
				  shadeClose: true, //开启遮罩关闭
				  content: html
			});
		}
		else
		{
			layer.msg(obj.msg);
		}	
	});
}
