if (typeof window.acksCreator == "undefined")
	window.acksCreator = {
		names: [],
		init: [],
		Register: function(name,initfunc){
			if (typeof this[name] == "undefined") {
				this[name] = {};
				this.names.push(name);
			}
			this.init[name] = initfunc;
		},
		Initialize: function(){
			Object.keys(this.init).forEach(function(el){
				window.acksCreator.init[el]();
			});
		},
		Start: function(){
			this.Initialize();
			let splt = location.pathname.split('/');
			let pagename = splt[splt.length-1].split('.')[0];
			window.acksCreator[pagename].start();
		},
		decompress: function(str){
			let compressed = atob(str);
			let stringy = pako.ungzip(compressed,{ to: 'string' });
			return JSON.parse(stringy);
		},
		save: function(obj){
			if(obj.name == "")
				obj.name = "Custom"+obj.objType.capitalize();
			let saveme = JSON.stringify(obj);
			let compressed = pako.gzip(saveme,{ to: 'string' });
			let b64 = btoa(compressed);
			return b64;
		},
		popup: function(title,width,buttons,html){
			let setting = {
				modal: true,
				title: title,
				height: window.innerHeight/4*3
			};
			if(width)
				setting.width = width;
			if(buttons)
				setting.buttons = buttons;
			else
				setting.buttons =  [{text:"Ok",click:function(){$(this).dialog('close');}}];
			let popup = $('<div />');
			popup.html('<h3>'+title+'</h3>'+html).dialog(setting).on('dialogclose', function() {
				$(this).remove();
			});
			popup.find('input[type="text"],input[type="number"]').addClass('ui-corner-all ui-state-default ui-widget');
			//popup.find('select').selectmenu();
		},
		popload: function(accepted,runafter){
			let buttons = [
				{text: "Cancel",click: function(){$(this).dialog('close');}},
				{text: "Ok",click: function(){
					let str = ($('#storagelist')[0].selectedIndex > 0 ?
						localStorage.getItem($('#storagelist').val()) :
						$('#popload_input').val()
					);
					if(runafter(str.slice(1)))
						$(this).dialog('close');
					else
						alert('Something went wrong loading the data!');
				}}
			];
			window.acksCreator.popup(
				'Load',null,buttons,
				'<div><p>Load from local storage or a string. <span id="loaderror"></span></p><select id="storagelist"></select><br /><input type="text" id="popload_input" class="ui-corner-all ui-state-default ui-widget" /></div>'
			);
			let str = ['<option>Load from string below</option>'];
			Object.keys(localStorage).forEach(function (obj) {
				if(obj[0] == 'm' && accepted.indexOf('m') > -1)
					str.push('<option value="'+obj+'">Magic: '+obj.slice(1)+'</option>');
				else if(obj[0] == 'r' && accepted.indexOf('r') > -1)
					str.push('<option value="'+obj+'">Race: '+obj.slice(1)+'</option>');
				else if(obj[0] == 'c' && accepted.indexOf('c') > -1)
					str.push('<option value="'+obj+'">Class: '+obj.slice(1)+'</option>');
			});
			$('#storagelist').append(str.join('')).selectmenu({
				change: function(){
					$('#popload_input').toggle($('#storagelist')[0].selectedIndex == 0);
				}
			});
			$('#popload_input').bind('input propertychange', function(){
				if(accepted.indexOf($(this).val()[0]) < 0)
					$('#loaderror').text('Error: save data may be corrupt.').show();
				else
					$('#loaderror').hide();
			});
		},
		popask: function(name, values, doafter){
			let buttons = [
				{text:"Cancel",click: function(){
					$('.waitvalue').remove();
					$(this).dialog('close');
				}},
				{text: "Ok",click: function(){
					let target = $('.waitvalue');
					let cost = $(this).children('select').val();
					let name = $('.waitvalue .name').text();
					target.attr('cost', cost).children('.mycost').text(cost);
					if(name == 'Inhumanity') {
						let alt = target.clone();
						alt.attr('cost',-cost);
						alt.children('.mycost').attr('cost',-cost).text(-cost);
						alt.children('.remove').remove();
						target.insertAfter(alt);
					}
					$('.waitvalue').removeClass('waitvalue');
					$(this).dialog('close');
					doafter();
				}}
			];
			this.popup('Choose Power Level',null,buttons,
				'<p>Select value for "'+name+'":</p><select id="popask_select"></select></div>'
			);
			let vals = [];
			values.forEach(function(val){
				vals.push('<option>'+val+'</option>');
			});
			$('#popask_select').append(vals.join('')).selectmenu();
		},
		popspell: function(runafter){
			let list = ['at will', '1/hr', '1/8hr', '1/day', '1/week', '1/month', '1/year'];
			let buttons =  [
				{text: "Cancel",click: function() {
					$('.waitvalue').remove();
					$(this).dialog("close");
				}},
				{text: "Ok",click: function() {
					let pow = $('.waitvalue');
					pow.attr('cost', 1).removeClass('waitvalue');
					pow.children('.mycost').attr('cost','1').html('1');
					pow.children('.name').html($('#popspell_result').text());
					$(this).dialog("close");
					runafter();
				}}
			];
			this.popup('Spell As Power',null,buttons,
				'<p>Spell name: <input type="text" id="popspell_name" /></p><p>Spell level: <input type="number" id="popspell_level" /></p><p>Casting time: <fieldset id="popspell_time"><label><input type="radio" name="casttime" value="round" checked="checked" /> 1 round</label><label><input type="radio" name="casttime" value="turn" /> 1 turn</label></fieldset></p><p id="popspell_result"></p>'
			);
			$('#popspell_time').buttonset();
			$('#popspell_name,#popspell_level,#popspell_time input').on('change keyup paste', function(){
				if($('#popspell_name').val() == '' || $('#popspell_level').val() == '')
					return;
				let castwait = $('#popspell_level').val() * 1;
				if ($('#popspell_time input:checked').val() == 'turn')
					castwait -= 1;
				$('#popspell_result').text($('#popspell_name').val() +
					' (1 ' + $('#popspell_time input:checked').val() +
					', ' + list[castwait] + ')');
			});
		},
		poppower: function(runafter,enableCost = true){
			let buttons = [
				{text:"Cancel",click: function(){
					$('.waitvalue').remove();
					$(this).dialog('close');
				}},
				{text: "Ok", click: function(){
					let cost = $('#poppower_cost').val();
					let name = $('#poppower_name').val();
					let pow = $('.waitvalue');
					pow.attr('cost', cost);
					pow.children('.mycost').attr('cost',cost).text(cost);
					pow.children('.name').text(name);
					$('.waitvalue').removeClass('waitvalue');
					$(this).dialog("close");
					runafter();
				}}
			];
			this.popup('Custom Power',null,buttons,
				'<p>Power name: <input type="text" id="poppower_name" /><br />Power point cost: <input type="number" id="poppower_cost" /></p>'
			);
			if(!enableCost)
				$('#poppower_cost').val('1').attr('disabled',true);
		},
		popmulti: function(runafter){
			let buttons = [
				{text:"Cancel",click: function(){
					$('.waitvalue').remove();
					$(this).dialog('close');
				}},
				{text: "Ok", click: function(){
					let pow = $('.waitvalue');
					$('.waitvalue .name').text($('.waitvalue .name').text()+' ('+$('#popmulti_name').val()+')');
					pow.removeClass('waitvalue');
					$(this).dialog("close");
					runafter(pow);
				}}
			];
			this.popup('Selection Information',null,buttons,
				'<p>The power selected has multiple options. Enter the option text here: <input type="text" id="popmulti_name" /></p>'
			);
		}
	};

document.addEventListener('DOMContentLoaded', function(){
	window.acksCreator.Start();
}, false);

String.prototype.capitalize = function(){return this.charAt(0).toUpperCase() + this.slice(1);}
Array.prototype.sentance = Array.prototype.sentance || function(_x){
	let x = Array.from(this);
	if(x.length > 1);
		x.push('and '+x.pop());
	if(x.length > 2)
		return x.join(', ');
	else
		return x.join(' ');
};
Array.prototype.map = Array.prototype.map || function(_x){
	for(let o=[], i=0; i<this.length; i++)
		o[i] = _x(this[i]);
	return o;
};
