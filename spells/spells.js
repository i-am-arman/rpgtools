window.acksCreator.Register("spells",function(){
	window.acksCreator.spells = {
		start: function(){
			$("#spelltype").tabs({
				activate: function (event, ui) {
					var url='ajax/'+$("#spelltype ul>li a").eq($('#spelltype').tabs('option','active')).attr("href").replace('#','')+'.json';
					if(url=='ajax/info.json') {return}
					$.getJSON(url,function(data){
						var holdme=window.acksCreator.spells.parseme(data);
						var domath = window.acksCreator.spells.domath;
						ui.newPanel.html('').append(holdme).removeClass('ui-corner-bottom').addClass('ui-corner-all');
						ui.newPanel.find('select').addClass('selectbox').selectmenu({
							change: function(){domath()}
						})
						ui.newPanel.find('input[type="checkbox"]').button().change(function(){domath()});
						ui.newPanel.find('input[type="text"]').change(function(){domath()});
					});
					return false;
				}
			}).addClass("ui-tabs-vertical ui-helper-clearfix");
			$('#spelltype li').removeClass("ui-corner-top" ).addClass("ui-corner-left");
		},

		parseme: function(data){
			$('.tabbox').html('');
			var holder=$('<div id="holder'+data.name.replace(' ','')+'" />').append('<h2>'+data.name+'</h2').append('<div id="hold0" /><div id="hold1"><div class="roundbox roundwide"><h3>Result</h3><div /></div></div>');
			data.values.forEach(function(entry){
				var content=$('<div id="'+entry.id+'" class="roundbox roundwide">');
				var sign;
				if(entry.add==0)
					sign='*';
				else
					sign='+';
				content.append('<h3>'+entry.title+'</h3>');
				var strType='';
				var addCustom=0;
				if(entry.type=='dropdown'){
					strType='<select><option value="0">--Select One--</option>';
					var optgroup=0;
					var addCustom=0;
					entry.values.forEach(function(c){
						if(c.name.lastIndexOf('--',0)==0){
							if(optgroup==1){strType+='</optgroup>';}
							strType+='<optgroup label="'+c.name.replace(/--/g,'')+'">';
						} else if(c.value=='-1') {
							strType+='<option value="-1" sign="'+sign+'" phrase="Custom">Custom</option>';
							addCustom=1;
						} else {
							strType+='<option value="'+c.value+'" sign="'+sign+'" phrase="'+c.name+'">(';
							if(sign=='*') {strType+='x';}
							strType+=c.value+') '+c.name+'</option>';
						}
					});
					if(optgroup==1){strType+='</optgroup>';}
					strType+='</select><br>';
					if(addCustom==1){strType+='<input type="text" value="1" class="ui-widget ui-widget-content ui-corner-all" style="text-align:center;display:none" />';}
				} else {
					entry.values.forEach(function(c){
						if(c.name.lastIndexOf('--',0)==0){
							strType+=c.name.replace(/--/g,'') + '<br>';
						} else {
							var m = ++window.acksCreator.spells.checkcount;
							strType+='<input type="checkbox" sign="'+sign+'" phrase="'+c.name+'" value="'+c.value+'" id="check'+m+'"><label for="check'+m+'">(';
							if(sign=='*'){strType+='x';}
							strType+=c.value+') '+c.name+'</label><br>';
						}
					});
				}
				content.append(strType);
				holder.find('#hold0').append(content);
			});
			checount=0;
			return holder;
		},
		domath: function() {
			var lastsign='';
			var strResult='';
			var strSelected='';
			var custom=$('select option:selected').filter(function(){return $(this).html()=="Custom";});
			if(custom.length>0){
				$('input[type="text"]:hidden').show();
				custom.attr('value',$('input[type="text"]').val());
			} else
				$('input[type="text"]').hide();
			
			if($('select option:selected').filter(function () { return $(this).html() == "--Select One--"; }).length>0)
				return;
			$('input[type="checkbox"]:checked,select option:selected').each(function(index){
				strSelected+=$(this).attr('phrase')+'. ';
				if($(this).attr('sign')!=lastsign) {
					if(lastsign==''){
						lastsign=$(this).attr('sign');
						strResult+=$(this).attr('value');
					} else {
						lastsign=$(this).attr('sign');
						strResult='('+strResult+')'+lastsign+$(this).attr('value');
					}
				} else {
					strResult+=' '+lastsign+$(this).attr('value');
				}
			});
			var total=eval(strResult).toFixed(2);
			$('#hold1 div div').html('').append('<p>Math: '+strResult+'</p><p>Total: '+total+'</p><p>Spell Level '+Math.ceil((total-0.5)/10)+'</p><p>Selected: '+strSelected+'</p>');
		},
		checkcount: 0
	}
});

