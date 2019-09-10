window.acksCreator.Register("race",function(){
	window.acksCreator.race = {
		data: {
			name: "CustomRace",
			objType: "race",
			additionalxp: {
				fighter: 0,
				thief: 0,
				cleric: 0,
				mage: 0
			},
			magic: null, //link to magictype.data
			race: []
		},
		toString: function(){
			let rac = window.acksCreator.race.data;
			let str = '<p>Minimum Stats:'
			if(rac.minimums.length > 0)
				str += rac.minval + ' in ' + rac.minimums.join(', ');
			else
				str += "None";
			str += '</p>';
			if(rac.saves)
				str += '<p>Additional XP at level 8:'+rac.additionalxp.fighter+'</p>'
			else {
				str += '<p>Additional XP at level 8 when saving as...<ul><li>Fighter: '+rac.additionalxp.fighter+'</li><li>Thief: '+rac.additionalxp.thief+'</li><li>Cleric: '+rac.additionalxp.cleric+'</li><li>Mage: '+rac.additionalxp.mage+'</li></ul>'
			}
			str += '<p>Uses a custom magic type? '+(rac.magic ? 'Yes' : 'No')+'</p>';
			return str;
		},
		powervals: [[1,1,[2,12]],[1,1,[3,11]],[1,1,[4,10]],[1,1,[5,9]],[1,1,[6,8]],[1,1,[7,7]],[2,1,[3,5,7]],[2,1,[2,4,9]],[2,1,[5,5,5]],[1,7,[8,14]],[1,7,[9,13]],[1,8,[9,14]],[1,8,[10,13]],[1,9,[10,14]],[1,9,[11,13]],[1,9,[12,12]],[1,10,[11,14]],[1,10,[12,13]],[1,11,[12,14]],[1,11,[13,13]],[1,12,[13,14]]],
		getCount: function(thing, lvl){
			let val = 0;
			for(let i = 1; i<=lvl; i++)
				if(this.data.race[i][thing])
					val++;
			return val;
		},
		start: function() {
			let rac = window.acksCreator.race;
			$('#popup').dialog({autoOpen: false});
			$('#about').button().click(function(){
				window.acksCreator.popup(
					'Race Creator',null,[{text:"Ok",click:function(){$(this).dialog('close');}}],
					"<p>Welcome to Race Creator, an interactive race creation service for the <a style='display:inline' href='http://www.autarch.co/buy-now'>Adventurer, Conquerer, King</a> System. The data has been taken directly from <a href='http://www.autarch.co/comment/6770#comment-6770'>this comment</a> at the ACKS Forums, as well as the player's companion and the guide. Without the guide and the player's companion, this tool won't be much use to you, so if you haven't bought them already, you should!</p><p>Importantly, this tool is neither bug-free nor rules-complete. The Judge has the final say; if you're the Judge, make sure you're not doing something silly.</p><p>If any part of it doesn't make sense, or you have more questions about what you can and can't do, please purchase the Adventurer, Conquerer, King player's companion - it really is an awesome resource!</p>"
				);
			});
			$('#saveit').button().click(function(){
				let buttons = [
					{text:'Cancel',click:function(){$(this).dialog('close')}},
					{text: 'Copy to Clipboard', click:function(){
						$('#popsave_text').select();
						document.execCommand("copy");
					}},
					{text:'Save Locally',click: function(){
						let name = $('#name').val();
						if(!name)
							name = 'Custom Race';
						localStorage.setItem('r'+name, $('#popsave_text').text());
						$(this).dialog('close');
					}}
				];
				window.acksCreator.popup('Copy to Save',null,buttons,
					'<p>Click the button below to copy the text to the clipboard; alternatively, copy the code below manually. Make sure to get everything between (and including) the square brackets:</p><textarea id="popsave_text">r' + window.acksCreator.save(window.acksCreator.race.data) + '</textarea>'
				);
			});
			$('#classlist p span:last').hide();
			$('#loadit').button().click(function () {
				window.acksCreator.popload('mr',function(obj){
					if(window.acksCreator.race.load(obj)) {
						window.acksCreator.race.calc();
						return true;
					} else
						return false;
				});
			});
			$('#displayit').button().click(function(){
				rac.displayPdf();
			});
			$("#powertrade").accordion({heightStyle:"fill", height:"15em"});
			$('#racelevels').tabs();
			
			let tradelist = []
			for(let i = 0; i<rac.powervals.length; i++){
				let val0 = rac.powervals[i];
				tradelist.push(
					'<span class="trade" count="'+val0[0]+'" lvl="'+val0[1]+'" trade="'+i+'" rets="'+val0[2].join(' ')+'">'+val0[0]+' lvl '+val0[1]+' for '+val0[2].join(', ')+'</span>'
				);
			}
			$("#tradelist").append(tradelist.join(''));
			rac.makepower('.trade,.class');
			$.getJSON("ajax/custompowers.json", function(data) {
				var items = [];
				data.powers.forEach(function(el){
					items.push('<span cost="'+el.cost+'" class="power" extend="'+el.extend+'">'+el.name+'</span>');
				});
				$('<p/>').html(items.join('')).appendTo('#powerlist');
				rac.makepower('.power');
			});
			$.getJSON("ajax/proficiencies.json", function(data) {
				var items = $('<p/>');
				data.profs.forEach(function(el){
					let itm = $('<span/>').text(el.name).addClass('power');
					let m = [];
					for(let i=1; i<=el.stacks; i++)
						m.push(i);
					itm.attr('cost',m.join(','));
					if(el.multi)
						itm.addClass('multi');
					if(el.stack)
						itm.addClass('stack');
					items.append(itm);
				});
				items.appendTo('#proflist');
				rac.makepower('.power');
			});
			$("#popask").dialog({
				modal: true,
				autoOpen: false,
				dialogClass: "no-close",
				buttons: [{
					text: "Ok",
					click: function() {
						$('.waitvalue').attr('cost',$(this).children('select').val());
						$('.waitvalue').children('.mycost').text($(this).children('select').val());
						if($('.waitvalue .name').text() == 'Inhumanity') {
							let alt = $('.waitvalue').clone();
							let cost = alt.attr('cost')*1;
							alt.attr('cost',-cost).children('.mycost').attr('cost',-cost).text(-cost);
							alt.children('.remove').remove();
							$('.waitvalue').parent().append(alt);
						}
						$('.waitvalue').removeClass('waitvalue');
						$(this).children('select').empty();
						$(this).dialog("close");
						rac.calc();
					}
				},{
					text: "Cancel",
					click: function(){
						$('.waitvalue').remove();
						$(this).dialog("close");
					}
				}]
			});
			$("#popspell").dialog({
				modal:true,
				autoOpen:false,
				buttons: [{
					text: "Cancel",
					click: function(){
						$('.waitvalue').remove();
						$(this).dialog("close");
					}
				},{
					text: "Ok",
					click: function() {
						var list=['at will','1/hr','1/8hr','1/day','1/week','1/month','1/year'];
						var castwait=$('#popspell input[type="number"]').val()*1;
						if($('#popspell input:radio:checked').val()=='turn'){
							castwait-=1;
						}
						rac.addRemove($('.waitvalue').empty().attr('cost',1).removeClass('waitvalue').removeClass('addspell').html('<span class="mycost" cost="1">1</span> <span class="name">'+$('#popspell input[type="textbox"]').val()+' (1 '+$('#popspell input:radio:checked').val()+', '+list[castwait]+')</span>'));
						$('#popspell input[type="textbox"]').val('');
						$('#popspell input[type="number"]').val('');
						$('#popspell input:radio').prop('checked', false);
						$(this).dialog("close");
						rac.calc();
					}
				}]
			});
			$("#casttime").buttonset();
			$('#poppower').dialog({
				modal:true,
				autoOpen:false,
				buttons: [{
					text: "Ok",
					click: function() {
						var cost=$('#poppower input[type="number"]').val();
						rac.addRemove($('.waitvalue').empty().attr('cost',cost).removeClass('waitvalue').html('<span class="mycost" cost="'+cost+'">'+cost+'</span> <span class="name">'+$('#poppower input[type="textbox"]').val()+'</span>'));
						$('#poppower input').val('');
						$(this).dialog("close");
						rac.calc();
					}
				},{
					text: "Cancel",
					click: function(){
						$('.waitvalue').remove();
						$(this).dialog("close");
					}
				}]
			});
			$('#popmulti').dialog({
				modal:true,
				autoOpen:false,
				buttons: [{
					text: "Ok",
					click: function() {
						$('.waitvalue .name').text($('.waitvalue .name').text()+' ('+$('#popmulti input').val()+')');
						$('#popmulti input').val('');
						$(this).dialog("close");
						window.acksCreator.race.powerPops();
					}
				},{
					text: "Cancel",
					click: function(){
						$('.waitvalue').remove();
						$(this).dialog("close");
					}
				}]
			});
			$('input[type="textbox"]').addClass('ui-corner-all ui-state-default ui-widget');
			$('input[type="number"]').spinner();
			$('#radio input').checkboxradio({
				icon: false
			}).change(function(){
				rac.calc();
			});
			$('#radio').controlgroup();
			$('.raceholder').append('<textarea class="racedesc ui-corner-all" placeholder="Description..."></textarea><div class="classlvls"></div><div class="tradeoffs"></div><ul><li lvl="1">1: <div></div></li></ul>');
			$('#race0 .classlvls').remove();
			$('.raceholder textarea').focus(function(){$(this).addClass('selected',500);}).focusout(function(){$(this).removeClass('selected',500);}).change(function(){
				let idx = $(this).parents('.raceholder').attr('id')[4]*1;
				window.acksCreator.race.data.race[idx].description = $(this).val();
			});
			$('#name').change(function(){
				window.acksCreator.race.data.name = $(this).val();
			});
			$('#human').change(function(){
				window.acksCreator.race.data.superhuman = $(this).is('checked');
				rac.calc();
			});
			$('#racelevels>ul').droppable({over: function(event, ui){
				$('.raceholder:visible').animate({scrollTop: '-=150px'},600,"easeOutQuint");
			}});
			$('.scrolldn').droppable({over: function(event, ui){
				$('.raceholder:visible').animate({scrollTop: '+=150px'},600,"easeOutQuint");
			}});
			$('#minval').change(function(){
				window.acksCreator.race.data.minval = $(this).val()*1;
			});
			$('#minvaldiv').controlgroup();
			$('#minvaldiv input').checkboxradio({icon:false}).change(function(){
				window.acksCreator.race.data.minimums = [];
				$('#minvaldiv input:checked').each(function(){
					window.acksCreator.race.data.minimums.push($(this).parent().text());
				});
			});
			for(let i=0;i<5;i++){
				rac.data.race[i] = {
					powers: [],
					tradeoffs: []
				};
			}
			rac.calc();
		},
		calc: function(){
			let data = window.acksCreator.race.data;
			let race = data.race;
			for(let i=0;i<5;i++){
				race[i].powers = [];
				race[i].tradeoffs = [];
			}
			data.name = $('#name').val();
			data.superhuman = $('#human').is(':checked');
			data.minval = $('#minval').val()*1;
			data.minimums = [];
			$('#minvaldiv input:checked').each(function(){
				data.minimums.push($(this).parent().text());
			});
			$('.raceholder').each(function(idx){
				$(this).children('.tradeoffs').children('div.trade').each(function(){
					race[idx].tradeoffs.push($(this).attr('trade')*1);
				});
				let lvlused = [,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
				let lvlprov = [,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
				race[idx].tradeoffs.forEach(function(val){
					//subtract the level
					let powerval = window.acksCreator.race.powervals[val];
					lvlused[powerval[1]] += powerval[0];
					powerval[2].forEach(function(lvl){
						lvlprov[lvl]++;
					});
				});
				$(this).find('li').each(function(){
					let lvl = $(this).attr('lvl')*1;
					$(this).find('.powers').each(function(){
						let cost = $(this).attr('cost')*1;
						let extend = $(this).attr('extend') == 'true';
						lvlused[lvl] += cost
						race[idx].powers.push({
							level: lvl,
							name: $(this).children('.name').text(),
							cost: cost,
							extend: extend
						});
					});
				});
				for(let i=2;i<=14;i++) {
					if(lvlprov[i] < 1 && lvlused[i] < 1) {
						$(this).find('li[lvl="'+i+'"]').remove();
					} else {
						$(this).find('li[lvl="'+i+'"] .remaining').text(lvlprov[i]-lvlused[i]);
						$(this).find('li[lvl="'+i+'"] .total').text(lvlprov[i]);
						if(lvlprov[i]-lvlused[i]<0)
							$(this).find('li[lvl="'+i+'"]').addClass('error');
						else
							$(this).find('li[lvl="'+i+'"]').removeClass('error');
					}
				}
				race[idx].xp = lvlused[1];
				//subtract previous powers
				race[idx].powers.forEach(function(pow){
					let maxlvl = 0;
					for(let i = 0; i<idx; i++){
						race[i].powers.forEach(function(p){
							if(pow.name == p.name)
								maxlvl = p.cost;
						});
					}
					race[idx].xp -= maxlvl;
				});
				if (!data.superhuman && idx == 0) {
					race[idx].xp -= 1;
				}
				race[idx].xp *= 40;
				let dv = 0, tf = 0, ac = 0, cm = 0;
				for(let i=0;i<=idx;i++){
					if(race[i].divine) dv++;
					if(race[i].thief) tf++;
					if(race[i].arcane) ac++;
					if(race[i].custommagic) cm++;
				}
				if(race[idx].hd) race[idx].xp += 500;
				if(race[idx].fight) race[idx].xp += 500;
				if(race[idx].thief) race[idx].xp += [0,200,500,700,1100][tf];
				if(race[idx].divine) race[idx].xp += [0,250,250,500,1000][dv];
				if(race[idx].arcane) race[idx].xp += 625;
				if(race[idx].custommagic) {
					let lvls = window.acksCreator.magic.data.xplevels();
					race[idx].xp += lvls[cm-1];
					if(cm-1>0)
						race[idx].xp -= lvls[cm-2];
				}

				race[idx].xp = 25*Math.round(race[idx].xp/25);
				if(race[idx].xp<0)
					race[idx].xp=0;
				if(idx > 0)
					race[idx].xp += race[idx-1].xp;
				$('#race'+idx+'xp').text(race[idx].xp);
				race[idx].description = $('#race'+idx+' .racedesc').val();
			});
			if(race[1].powers.length+race[2].powers.length+race[3].powers.length+race[4].powers.length > 0){
				let add = 1000*Math.round(race[4].xp*2/105);
				$('#additional').text(add);
				data.additionalxp = {
					fighter: add,
					thief: add,
					cleric: add,
					mage: add
				};
				$('#radio').hide();
			} else {
				$('#radio').show();
				if($('#radio input:checked').length!=2)
					$('#additional').text('select two saves below');
				else {
					let first = [];
					let second = [];
					let add1 = 1000*Math.round(race[4].xp*5/700);
					let add2 = 1000*Math.round(race[4].xp*15/700);
					['fighter','thief','cleric','mage'].forEach(function(el){
						if($('#radio'+el).is(':checked')) {
							first.push(el.capitalize());
							data.additionalxp[el] = add1;
						} else {
							second.push(el.capitalize());
							data.additionalxp[el] = add2;
						}
					});
					$('#additional').text(add1+' for '+first.join(' and ')+', and '+add2+' for '+second.join(' and ')+'.');
				}
			}
		},
		makepower: function(typ){
			$(typ).draggable({
				helper: "clone",
				scroll: true,
				start: function(event,ui){
					let name = ui.helper[0].textContent;
					let classes = ui.helper[0].classList;
					let target = '';

					if(classes.contains('class')) {
						if($('.classlvls:visible .class').length == 0)
							target = '.raceholder>.classlvls';
						else
							target = '#does-not-exist';
					} else if(classes.contains('trade'))
						target = '.raceholder>.tradeoffs';
					else {
						let old = $('.raceholder:visible .powers span.name:contains('+$(this).text()+')')
						if(old.length > 0) {
							old = old.parent();
							let oldcost = old.attr('cost')*1;
							let maxcost = old.children('.mycost').attr('cost');
							if(maxcost.indexOf(',')>0) {
								maxcost = maxcost.split(',');
								maxcost = maxcost[maxcost.length-1];
							}
							if(maxcost*1 > oldcost)
								target = old.parent();
							else
								target = '#does-not-exist';
						} else
							target = '.raceholder>ul>li>div';
					}
					$(target).append('<div class="target"/>');
					window.acksCreator.race.addDroppable();
					ui.helper.addClass("helper");
				},
				stop: function(event,ui){
					$(".raceholder .target").remove();
				}
			});
		},
		addDroppable: function(){
			$(".target").droppable({
				addClasses: false,
				tolerance: "pointer",
				activeClass: "activetarget",
				drop: function(event, ui) {
					$(this).droppable("destroy");
					if(ui.draggable.hasClass("class")) {
						let data = window.acksCreator.race.data;
						$(this).removeClass("target")
							.addClass("powers")
							.addClass('class')
							.html(ui.draggable.text());
						let typ = ['hd','fight','thief','divine','arcane','custommagic'][ui.draggable.attr('trade')*1];
						let lvl = $('.raceholder:visible').attr('id')[4]*1;
						data.race[lvl][typ] = true;
						$(this).append('<span class="remove">X</span>');
						$(this).children('.remove').click(function(){
							let rac = window.acksCreator.race;
							let div = $(this).parent();
							let typ = ['hd','fight','thief','divine','arcane','custommagic'][$('#classlist p span.class:contains("'+div.text().slice(0,-1)+'")').attr('trade')*1];
							let lvl = $('.raceholder:visible').attr('id')[4]*1;
							rac.data.race[lvl][typ] = undefined;
							console.log(lvl,typ,rac.data.race[lvl][typ]);
							div.remove();
							rac.setMagicPowers();
						});
						if(typ == 'custommagic') {
							data.magic = window.acksCreator.magic.data.raw;
							window.acksCreator.race.setMagicPowers();
						} else
							window.acksCreator.race.calc();
						return;
					} else if(ui.draggable.hasClass("power")) {
						$(this).addClass('waitvalue')
							.removeClass("target")
							.addClass("powers")
							.html('<span class="mycost" cost="'+ui.draggable.attr('cost')+'"></span> <span class="name">'+ui.draggable.text()+'</span>');
						if(ui.draggable.hasClass('addspell'))
							$('#popspell').dialog("open");
						else if(ui.draggable.hasClass('addpower'))
							$('#poppower').dialog("open");
						else if(ui.draggable.hasClass('multi'))
							$('#popmulti').dialog('open');
						else
							window.acksCreator.race.powerPops();
						window.acksCreator.race.addRemove($(this));
						//window.acksCreator.race.calc();
					} else {
						//Tradeoffs
						$(this).removeClass("target").addClass("trade").attr('cost',ui.draggable.attr('count')).attr('trade',ui.draggable.attr('trade'));
						ul = $(this).parent().parent().children('ul');
						for(let ret = 2; ret<15;ret++){
							if($(ul).children('li[lvl="'+ret+'"]').length<1)
								$(ul).append('<li lvl="'+ret+'">'+ret+' (<span class="remaining"></span> of <span class="total"></span>): <div></div></li>');
						}
						let items = $(ul).children().get();
						items.sort(function(a,b){
							let keyA = $(a).attr('lvl')*1;
							let keyB = $(b).attr('lvl')*1;
							
							if (keyA < keyB) return -1;
							if (keyA > keyB) return 1;
							return 0;
						});
						items.forEach(function(li){
							ul.append(li);
						});
						$(this).html(ui.draggable.text());
						window.acksCreator.race.addRemove($(this));
						window.acksCreator.race.calc();
					}
				}
			});
		},
		setMagicPowers: function(){
			let rac = this;
			$('.raceholder .powers.magicpower').remove();
			if(rac.data.magic && rac.data.magic.powers) {
				let magiclevel = -1;
				let lvls = [0];
				for(let i = 0; i<4; i++) {
					if(rac.data.race[i].custommagic)
						lvls[++magiclevel] = i;
				}
				rac.data.magic.powers.forEach(function(el){
					if(el.classlevel <= magiclevel) {
						$('#race'+lvls[el.classlevel]+'>ul>li:first-child>div').prepend('<span class="powers magicpower" cost="0"><span class="mycost" cost="'+el.cost+'">'+el.cost+'</span> <span class="name">'+el.name+'</span></span>');
					}
				});
			}
			rac.calc();
		},
		addRemove: function(obj){
			obj.append('<span class="remove">X</span>');
			obj.children('.remove').click(function(){
				let div = $(this).parent();
				if(div.children('.name').text() == 'Inhumanity')
					div.next().remove();
				div.remove();
				window.acksCreator.race.calc();
			});
		},
		powerPops: function(){
			let rac = this;
			let pow = $('.waitvalue');
			let cost = pow.children('.mycost').attr('cost');
			if(cost == 'arcane') {
				pow.attr('arcane','true');
				//TODO: figure out how expensive this is later (an extra 25xp)
				pow.attr('cost',1);
				pow.children('.mycost').text('*');
				pow.removeClass('waitvalue');
				rac.calc();
				return;
			}
			let name = pow.children('.name').text();
			if(name == 'After the Flesh')
				cost = 3;
			let rlvl = $('.raceholder:visible').attr('id')[4]*1;
			let lastpower = 0;
			let nextpower = 100;
			let hasLevel = false;
			this.data.race.forEach(function(r,idx){r.powers.forEach(function(p){
				if(p.name == name) {
					if(idx != rlvl && p.level > 1) {
						hasLevel = true;
						return;
					} else if(idx < rlvl)
						lastpower = Math.max(p.cost,lastpower);
					else if (idx > rlvl)
						nextpower = Math.min(nextpower, p.cost);
				}
			});});
			if(hasLevel) {
				pow.remove();
				alert('If a power is in a tradeoff level, it is not allowed at other race levels.');
				return;
			}
			let costs = cost.split(',').map(Number);
			if(lastpower > 0)
				costs.splice(0,costs.indexOf(lastpower)+1);
			if(nextpower < 100 && costs.length > 0)
				costs.splice(costs.indexOf(nextpower));
			if(costs.length < 1) {
				pow.remove();
				alert('Remove or modify "'+name+'" on other race levels first!');
				return;
			}
			let old = $('.raceholder:visible .powers span.name:contains('+name+')');
			if(old.length > 1)
				$(old[0]).parent().remove();
			if(costs.length == 1) {
				pow.removeClass('waitvalue').attr('cost',costs[0]).children('.mycost').text(costs[0]);
				rac.calc();
			} else {
				costs.forEach(function(val){
					$('#popask select').append('<option value="'+val+'">'+val+'</option>');
				});
				$('#popask div p').text("Select value for '"+name+"':");
				$('#popask').dialog('open');
			}
		},
		load: function(str){
			let obj = window.acksCreator.decompress(str);
			if(obj.objType == 'magic')
				return this.loadMagic(obj);
			else if(obj.objType == 'race')
				return this.loadRace(obj);
			else
				return false;
		},
		loadMagic: function(obj){
			window.acksCreator.magic.data.raw = obj;
			$('#classlist p span').show();
			$('#classlist p span:last').attr('cost',window.acksCreator.magic.data.xplevels().join(',')).text(obj.name);
			return true;
		},
		loadRace: function(obj){
			let rac = window.acksCreator.race;
			rac.data = obj;
			if (rac.data.magic)
				this.loadMagic(rac.data.magic);
			$('.raceholder .classlvls, .raceholder .tradeoffs, .raceholder>ul').empty();
			$('.raceholder>ul').append('<li lvl="1">1: <div></div></li>');
			$('#name').val(rac.data.name);
			$('#minval').val(rac.data.minval);
			rac.data.minimums.forEach(function(el){
				$('#minvaldiv label:contains("'+el+'")').children('input').prop('checked',true);
			});
			$('#minvaldiv input').checkboxradio('refresh');
			let race = rac.data.race;
			for(let i=0; i<5; i++) {
				let items = [];
				$('#race'+i+' .racedesc').val(race[i].description);
				//HD, Fight, Divine, Thief, Arcane, Custom Magic
				if(race[i].hd) items.push('<div class="powers class">Hit Dice</div>');
				if(race[i].fight) items.push('<div class="powers class">Fighting</div>');
				if(race[i].divine) items.push('<div class="powers class">Divine</div>');
				if(race[i].thief) items.push('<div class="powers class">Thief</div>');
				if(race[i].arcane) items.push('<div class="powers class">Arcane</div>');
				if(race[i].custommagic) items.push('<div class="powers class">'+rac.data.magic.name+'</div>');
				$('#race'+i+' .classlvls').append(items.join(""));
				rac.addRemove($('#race'+i+' .classlvls .powers'));

				//Tradeoffs
				let ul = $('#race'+i+'>ul');
				race[i].tradeoffs.forEach(function(t){
					let val = window.acksCreator.race.powervals[t];
					let str = val[0]+' lvl '+val[1]+' for ';
					val[2].forEach(function(lvl){
						str += 'lvl '+lvl+', ';
					});
					let trade = $('<div/>');
					trade.text(str).addClass('trade').attr('cost',val[1]).attr('trade',t);
					rac.addRemove(trade);
					$('#race'+i+' .tradeoffs').append(trade);
				});
				for(let lvl=2;lvl<=14;lvl++)
					$(ul).append('<li lvl="'+lvl+'">'+lvl+' (<span class="remaining"></span> of <span class="total"></span>): <div></div></li>');
				//Powers
				race[i].powers.forEach(function(pow){
					let power = $('<div/>');
					power.addClass('powers').attr('cost',pow.cost).html('<span class="mycost">'+pow.cost+'</span> <span class="name">'+pow.name+'</span>');
					if(pow.name != 'Inhumanity' || pow.cost > 0)
						rac.addRemove(power);
					$(ul).find('li[lvl="'+pow.level+'"]>div').append(power);
				});
			}
			rac.calc();
			return true;
		},
		displayPdf: function() {
			var doc = new jsPDF();
			
			doc = this.pdf(doc);
			doc.setFontSize(12);
			doc.setFontType('normal');
			for(let p = 1; p<=doc.getNumberOfPages(); p++) {
				doc.setPage(p);
				doc.text(doc.internal.pageSize.getWidth()-55,
					doc.internal.pageSize.getHeight()-20+doc.getLineHeight()*71/200,
					'Page '+p
				);
			}

			window.acksCreator.popup(
				'Download Your Race','75%',null,
				'<iframe class="preview-pane" type="application/pdf" width="100%" height="95%" frameborder="0" style="position:relative;z-index:999"></iframe>'
			);
			$('.preview-pane').attr('src', doc.output('bloburi'));
		},
		pdf: function(doc){
			let data = this.data;
			let h = function(){
				return doc.getLineHeight()*71/200;
			}
			doc.setFont('times');
			doc.setFontSize(12);
			let height = doc.internal.pageSize.getHeight()-20;
			let width = doc.internal.pageSize.getWidth()-40;

			//Title
			doc.setFontType('bolditalic');
			doc.setFontSize(18);
			doc.text(20, 20, data.name);

			//Requisites
			let y = 35;
			let saves = (data.race[1].powers.length+data.race[2].powers.length+data.race[3].powers.length+data.race[4].powers.length > 0);
			doc.setFontType('bold');
			doc.setFontSize(12);
			doc.text(20, y, 'Minimum Stats:');
			y += h();
			if(saves)
				doc.text(20, 40, 'Additional XP at level 8:');
			else {
				y += h();
				doc.text(20, 40, 'Additional XP at level 8 when saving as...');
				doc.text(39, 40+h(),'Fighter:',null,null,'right');
				doc.text(39+width/4, 40+h(),'Thief:',null,null,'right');
				doc.text(39+width/4*2, 40+h(),'Cleric:',null,null,'right');
				doc.text(39+width/4*3, 40+h(),'Mage:',null,null,'right');
			}
			y += h();
			doc.text(20, y, 'Uses a custom magic type? '+(data.magic ? 'Yes' : 'No'));
			doc.setFontType('normal');
			y = 35;
			if(data.minimums.length > 0)
				doc.text(50, y, data.minval + ' in ' + data.minimums.join(', '));
			else
				doc.text(50, y, "None");
			y += h();
			if(saves)
				doc.text(65,y,data.additionalxp.fighter.toString());
			else {
				y += h();
				doc.text(40, y,data.additionalxp.fighter.toString());
				doc.text(40+width/4, y,data.additionalxp.thief.toString());
				doc.text(40+width/2, y,data.additionalxp.cleric.toString());
				doc.text(40+width/4*3, y,data.additionalxp.mage.toString());
			}
			y += h()*3;
			let powers = [];
			let hd = 0;
			let ft = 0;
			let tf = 0;
			let dv = 0;
			let ac = 0;
			let cm = 0;
			for(let lvl = 0; lvl <= 4; lvl++) {
				let race = data.race[lvl];

				race.powers.forEach(function(obj){
					let idx = powers.findIndex(function(el){return el.name == obj.name});
					if(idx >= 0)
						powers[idx].cost = obj.cost;
					else
						powers.push(obj);
				});
				let div = Math.floor(powers.length/3);
				let rem = powers.length-div*3;

				let totalheight = h()*(div+(rem>0));
				doc.setFontSize(16);
				totalheight += h();
				if(y+totalheight > height) {
					doc.addPage();
					y = 20;
				}
				
				doc.setFontType('bold');
				doc.text(20,y,'Race '+lvl+':');
				let newy = y+h();
				let txtwidth = doc.getTextDimensions('Race 0: ').w;
				doc.setFontType('normal');
				doc.setFontSize(12);
				doc.text(20+txtwidth,y,race.xp.toString() + ' XP');
				if(race.hd) hd++;
				if(race.fight) ft++;
				if(race.thief) tf++;
				if(race.divine) dv++;
				if(race.arcane) ac++;
				if(race.custommagic) cm++;
				let x = 1;
				if(hd > 0)
					doc.text(25+width/5*x++,y,'Hit Dice '+hd);
				if(ft > 0)
					doc.text(25+width/5*x++,y,'Fighting '+ft);
				if(tf > 0)
					doc.text(25+width/5*x++,y,'Thief '+tf);
				if(dv > 0)
					doc.text(25+width/5*x++,y,'Divine '+dv);
				if(ac > 0)
					doc.text(25+width/5*x++,y,'Arcane '+ac);
				if(cm > 0 && data.magic)
					doc.text(25+width/5*x++,y,window.acksCreator.magic.data.raw.name+' '+cm);
				y = newy;
				x = 0;
				let count = 0;
				newy = y;
				let afterh = (rem>0 ? h()*2 : h());
				powers.forEach(function(pow){
					let txt = pow.name + ' ' + pow.cost;
					if(pow.level>1)
						txt += ' (at level ' + pow.level + ')';
					if(count >= div+(rem>0)) {
						x++;
						rem--;
						count = 0;
						y = newy;
					}
					doc.text(25+width/3*x,y,txt);
					y += h();
					count++;
				});
				y += afterh;

				doc.splitTextToSize(race.description,width).forEach(function(txt){
					if(y>height) {
						y = 20;
						doc.addPage();
					}
					doc.text(20,y,txt);
					y += h();
				});
				doc.line(20,y,width,y);
				y += h();
			}
			if(data.magic && cm > 0) {
				doc.addPage();
				window.acksCreator.magic.pdf(doc);
			}
			return doc;
		}
	}
});
