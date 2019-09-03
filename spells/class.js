window.acksCreator.Register("class",function(){
	window.acksCreator.class = {
		data: {
			raw: {
				name: "CustomClass",
				objType: "class",
				magic: null, //to be linked to magic.data.raw
				race: null,  //to be linked to race.data.raw
				racename: 'None',
				racepoints: 0
			},
			classpoints: function(){
				return this.raw.hd+
					this.raw.fighter+
					this.raw.divine+
					this.raw.thief+
					this.raw.arcane+
					this.raw.custommagic;
			},
			getval: function(sel) {
				let idx = this.raw[sel];
				let race = this.raw.racename;
				let racelevel = this.raw.racepoints;
				if (sel == 'fighter' && race == 'Thrassian') {
					if (racelevel == 4)
						idx += 2;
					else if (racelevel > 2)
						idx += 1;
				} else if (sel == 'divine' && race == 'Nobirus') {
					idx += racelevel;
					if (idx > 4)
						idx = 5;
				} else if (sel == 'arcane') {
					if(race == 'Elf' || race == 'Zaharan') {
						idx += racelevel;
					} else if (race == 'Gnome') {
						if (racelevel > 1)
							idx++;
						if (racelevel > 3)
							idx++;
					}
				} else if(this.raw.race && race == this.raw.race.name)
					for(let i = 0; i<=racelevel; i++)
						if(this.raw.race.race[i][sel]) idx++;
				return idx;
			},
			hd: function(){ return this.getval('hd'); },
			hdType: function(){
				return ['d4','d6','d8','d10','d12'][this.hd()];
			},
			fighter: function(){ return this.getval('fighter'); },
			thief: function(){ return this.getval('thief'); },
			divine: function(){ return this.getval('divine'); },
			arcane: function(){ return this.getval('arcane'); },
			custommagic: function(){
				if(this.raw.magic) return this.getval('custommagic');
				else return 0;
			},
			minimums: function(){
				switch(this.raw.racename) {
					case 'None':
						return 'None';
					case 'Dwarf':
						return 'CON 9';
					case 'Elf':
						return 'INT 9';
					case 'Gnome':
						return 'INT and CON 9';
					case 'Nobirus':
						return 'All 11';
					case 'Thrassian':
						return 'STR, DEX, CON 9';
					case 'Zaharan':
						return 'INT, WIS, CHA 9';
					default:
						if(this.race)
							return window.acksCreator.race.data.minimums();
						else
							return 'None';
				}
			},
			saves: function(){
				let max = Math.max(this.raw.arcane, this.raw.divine, this.raw.thief, this.raw.fighter);
				if (this.raw.arcane == max)
					return "Mage";
				else if (this.raw.divine == max)
					return "Cleric";
				else if (this.raw.thief == max)
					return "Thief";
				else
					return "Fighter";
			},
			prime: function(){
				let saves = this.saves();
				if(saves == 'Mage')
					return 'INT';
				else if(saves == 'Cleric')
					return 'WIS';
				else if(saves == 'Thief')
					return 'DEX or CHA';
				else
					return 'STR or CON';
			},
			max: function(){
				let max = 17 - this.raw.racepoints - this.classpoints();
				if (this.raw.powers.findIndex(function(val){return val.name == 'Heroic Spirit';}) > -1)
					max += 1;
				if (max > 14)
					max = 14;
				return max;
			},
			additionalxp: function() {
				let saves = this.saves();
				let name = this.racename;
				let add = 0;
				if(name != 'None') {
					if(this.raw.race && name == this.raw.race.name)
						add += this.race.additionalxp()[saves.toLowerCase()];
					else if(name == 'Dwarf')
						if(saves == 'Cleric' || saves == 'Thief')
							add += 30000;
						else
							add += 10000;
					else if(name == 'Elf')
						add += 50000;
					else if(name == 'Nobirus')
						add += 40000;
					else if(name += 'Gnome')
						if(saves == 'Cleric' || saves == 'Thief')
							add += 50000;
						else
							add += 15000;
					else if(name += 'Zaharan')
						add += 50000;
				}
				if(this.raw.magic && this.raw.custommagic > this.raw.arcane && this.raw.custommagic > this.raw.divine)
					add += window.acksCreator.magic.data.additionalxp();
				else if(saves == 'Mage')
					add += 150000;
				else if(saves == 'Cleric' || saves == 'Thief')
					add += 100000;
				else
					add += 120000;
				return add;
			},
			classxp: {
				hd: [0,500,1000,1500,2000],
				fighter: [0,500,1000,1500,2000],
				thief: [0,200,500,700,1100],
				divine: [0,250,500,1000,2000],
				arcane: [0,625,1250,1875,2500,3125,3750,4375,5000],
				custommagic: []
			},
			armor: {
				Forbidden: 'no armor, nor use a shield',
				Restricted: 'hide armor',
				Narrow: 'leather armor or lighter',
				Broad: 'chain mail or lighter',
				Unrestricted: 'any armor'
			},
			weapons: {
				Restricted: [3, ['club', 'dagger', 'bola', 'dart', 'sling', 'sap', 'staff', 'whip']], 
				Narrow: [2, ['axes', 'bows/crossbows', 'flails/hammers/maces', 'swords/daggers', 'spears/pole arms', 'bolas/darts/nets/slings/saps/staffs', 'any combination of 3 weapons']],
				Broad: [2, ['any one-handed melee weapons', 'any two-handed melee weapons', 'any axes, flails, hammers, and maces', 'any swords, daggers, spears, and polearms', 'all missile weapons', 'any combination of 5 weapons']],
				Unrestricted: [1, ['any weapon']]
			},
			turning: function(){
				if(this.divine() > 1 && this.raw.turn)
					return true;
				else if(this.custommagic() > 0 && this.raw.turncustom) {
					let m = window.acksCreator.magic.data;
					let full = (m.basexp()<1000?1:(m.basexp()>2000?4:3) && !m.raw.code);
					if(this.custommagic() >= full)
						return true;
				}
				return false;
			}
		},
		start: function() {
			let cl=this;
			$('#lastupdate').text(document.lastModified);
			$('#desc').change(function(){
				cl.data.raw.description = $(this).val();
			});
			$('#popup').dialog({autoOpen: false});
			$('#about').button().click(function(){
				$('#popup').dialog({
					modal: true,
					buttons: [{text: "Ok", click: function(){ $(this).dialog('close'); }}],
					width: '30em',
					title: 'Class Creator'
				}).html("<h3>Class Creator</h3><div><p>Welcome to Class Creator, an interactive character class creation service for the <a style='display:inline' href='http://www.autarch.co/buy-now'>Adventurer, Conquerer, King</a> System. The data has been taken directly from the player's companion, though I've left almost all other information out; this tool won't be much good without the player's companion. If you haven't bought it already, you should!</p><p>Importantly, this tool is neither bug-free nor rules-complete. The Judge has the final say; if you're the Judge, make sure you're not doing something silly.</p><p>If any part of it doesn't make sense, or you have more questions about what you can and can't do, please purchase the Adventurer, Conquerer, King player's companion - it really is an awesome resource!</p></div>").dialog('open');
			});
			$('#saveit').button().click(function () {
				$('#popup').dialog({width: '30em', title: 'Copy to Save'}).html('<p>Click the button below to copy the text to the clipboard; alternatively, copy the code below manually. Make sure to get everything between (and including) the square brackets:</p><p><button id="btncopy">Copy to Clipboard</button><button id="btnsavestorage">Save to local storage</button></p><textarea id="txtcopy">c' + window.acksCreator.save(window.acksCreator.class.data.raw) + '</textarea>').dialog("open");
				$('#btncopy').button().click(function () {
					$('#popup textarea').select();
					document.execCommand("copy");
				});
				$('#btnsavestorage').button().click(function () {
					let name = $('#name').val();
					if(!name)
						name = 'Custom Class';
					localStorage.setItem('c'+name, $('#popup textarea').text());
					$('#popup').dialog('close');
				});
			});
			$('#loadit').button().click(function () {
				var str = '<option>Load from string below</option>';
				Object.keys(localStorage).forEach(function (obj) {
					var val = '';
					if (obj[0] == 'c')
						val = 'Class';
					else if (obj[0] == 'm')
						val = 'Magic';
					else if (obj[0] == 'r')
						val = 'Race';
					if(val)
						str += '<option value="'+obj+'">'+val+': '+obj.slice(1)+'</option>';
				});
				$('#storagelist').empty().append(str).selectmenu({
					change: function(){
						$('#popload input').toggle($('#storagelist')[0].selectedIndex == 0);
					}
				}).selectmenu('refresh');
				$('#popload').dialog("open");
			});
			$('#displayit').button().click(function () {
				cl.displayPdf();
			});
			$('#loadprof').button();
			$.getJSON("ajax/classprofs.json", function(data) {
				cl.profs = data.class;
				$('#loadprof').click(function(){$('#popup').dialog({
					modal: true,
					width: '30em',
					title: 'Class Creator',
					buttons: [{text: "Ok", click: function(){
						cl.data.raw.profs = Array.from(cl.profs[$('#popup select').val().toLowerCase()]);
						$('.chkprof').prop('checked',false);
						cl.data.raw.profs.forEach(function(el){
							let specialized = el.indexOf(': (');
							let name = (specialized > -1 ? el.slice(0,specialized) : el);
							let obj = $('#profs .prof:contains("'+name+'")');
							if(specialized > -1) {
								let special = el.slice(specialized+3,el.length-1);
								obj.children('input').val(special);
							}
							obj.find('label input').prop('checked',true);
						});
						$(this).dialog('close');
					}},{text: "Cancel", click: function(){$(this).dialog('close');}}]
				}).html("<h3>Load Base Proficiency</h3><p>This will load the proficiency list from one of the four basic classes: Cleric, Fighter, Mage, and Thief. It will <b>replace</b> the existing proficiency list!</p><select><option>Cleric</option><option>Fighter</option><option>Mage</option><option>Thief</option></select>").dialog('open');
					$('#popup select').selectmenu();
				});
			});

			$('#racepowers').hide();
			$('#custommagic select').show();
			$('.roundbox select').addClass('select').selectmenu({
				change: function(){
					cl.calc($(this).parent().parent().attr('id'));
				}
			});
			$("#radCleric").prop('checked',true);
			$("#fighterSel input").checkboxradio({icon:false}).change(function(){
				cl.calc('fighter');
			});
			$('#fighterSel').controlgroup();
			$('#fightStyles input').checkboxradio({icon: false}).change(function(){
				if(cl.data.raw.fighter == 0 && $('#fightStyles input:checked').length > 1) {
					$('#fightStyles input').not(this).prop('checked',false);
				} else if(cl.data.raw.fighter == 1 && $('#fightStyles input:checked').length > 2)
					$('#fightStyles input:checked').not(this).filter(':first').prop('checked',false);
				$('#fightStyles input').checkboxradio('refresh');
				cl.data.raw.fightStyles = [];
				$('#fightStyles input:checked').each(function(){
					cl.data.raw.fightStyles.push($(this).parent().text());
				});
				cl.pointsAndPowers();
			});
			$('#fightStyles').addClass('ui-controlgroup-vertical').controlgroup();
			$('#thief ul input').change(function(){
				if($('#thief input:checked').length > $('#thiefspan').text()*1)
					$('#thief input:checked').not(this).filter(':first').prop('checked',false);
				cl.data.raw.thiefSkills = [];
				$('#thief input:checked').each(function(){
					cl.data.raw.thiefSkills.push($(this).parent().text());
				});
			});
			$('#chkturn').change(function(){
				cl.calc('divine');
			}).parent().hide();
			$('#chktradeac').change(function(){
				cl.calc('arcane');
			}).parent().hide();
			$('#custommagic input').change(function(){
				cl.calc('custommagic');
			});
			$('#custommagic').hide();
			$('#name').on('input propertychange paste', function(){
				cl.data.raw.name = $('#name').val();
			});
			$('input[type="text"]').addClass('ui-corner-all ui-state-default ui-widget');
			$("#powertrade").accordion({ heightStyle: "fill" });
			for(let c = 0; c<window.acksCreator.race.powervals.length;c++){
				let val = window.acksCreator.race.powervals[c];
				let spn = $('<span/>');
				spn.addClass('trade').attr('count',val[0]).attr('lvl',val[1])
					.attr('trade',c).attr('ret',val[2].join(' '))
					.text(val[0] + " lvl " + val[1] + " for " + val[2].join(', '));
				$("#tradelist").append(spn);
			}
			cl.maketrade('#tradelist .trade');
			cl.makepower('.addspell,.addpower');
			$.getJSON('ajax/races.json',function(data) {
				cl.races = data.races;
			});
			$.getJSON("ajax/proficiencies.json", function(data) {
				let pows = [];
				let profs = [];
				data.profs.forEach(function(el){
					let cost = [1,2,3,4].slice(0,el.stacks).join(',');
					pows.push('<span class="power ui-draggable ui-draggable-handle'+(el.multi?' multi':'')+'" cost="'+cost+'">'+el.name+'</span>');

					let prof = '<div class="prof"><label><input type="checkbox" class="chkprof" /> '+el.name+(el.type=="general"?' (G)':'')+'</label>';
					if(el.multi)
						prof += '<input type="text" placeholder="Specialization?" class="ui-corner-all ui-state-default ui-widget" />';
					prof += '</div>';
					profs.push(prof);
				});
				$('#profs>div').html(profs.join(''));
				$('#profs>div label input:checkbox').change(function(){
					cl.data.raw.profs = [];
					$('#profs input.chkprof:checked').each(function(){
						let txt = $(this).parent().text().trim();
						if($(this).parent().parent().children('input:text').val())
							txt+=': ('+$(this).parent().parent().children('input').val()+')';
						cl.data.raw.profs.push(txt);
					});
					cl.countProfs();
				});
				$('#profs>div input:text').blur(function(){
					$(this).parent().parent().find('label input:checkbox:first-child').change();
				});
				$('<p/>').html(pows.join('')).appendTo('#profpowerlist');
				cl.makepower($('#profpowerlist .power'))
			});
			$.getJSON("ajax/custompowers.json", function(data) {
				//TODO: add click-to-change-value
				//TODO: add stack (Bargaining 3), multi (Art: pottery, Art: painting)
				var items = [];
				data.powers.forEach(function(el){
					items.push('<span class="power" cost="'+el.cost+'">'+el.name+'</span>');
				});
				$('<p/>').html(items.join('')).appendTo('#powerlist');
				cl.makepower($('#powerlist .power'));
			});
			$('#popload').dialog({
				modal: true,
				autoOpen: false,
				buttons: [{
					text: "Ok",
					click: function(){
						let str = ($('#storagelist')[0].selectedIndex > 0 ? localStorage.getItem($('#storagelist').val()) : $('#popload input').val());
						if (cl.load(str)) {
							$(this).dialog('close');
							cl.calcAll();
						} else {
							alert('Something went wrong loading the data!');
						}
					}
				}, {
					text: "Cancel",
					click: function(){
						$(this).dialog('close');
					}
				}]
			});
			$('#popask').dialog({
				modal: true,
				autoOpen: false,
				dialogClass: "no-close",
				buttons: [{
					text: "Ok",
					click: function () {
						let target = $('.waitvalue');
						let cost = $(this).children('select').val();
						let name = $('.waitvalue .name').text();
						$('.powers:not(.waitvalue) .name:contains("'+name+'")').parent().remove();
						target.attr('cost', cost).children('.mycost').text(cost);
						if(name == 'Inhumanity') {
							let alt = target.clone();
							alt.attr('cost',-cost).children('.mycost').attr('cost',-cost).text(-cost);
							alt.children('.remove').remove();
							target.insertAfter(alt);
						}
						$('.waitvalue').removeClass('waitvalue');
						$(this).children('select').empty();
						$(this).dialog("close");
						cl.pointsAndPowers();
					}
				}, {
					text: "Cancel",
					click: function () {
						$('.waitvalue').remove();
						$(this).dialog("close");
					}
				}]
			});
			$("#popspell").dialog({
				modal: true,
				autoOpen: false,
				buttons: [{
					text: "Cancel",
					click: function () {
						$('.waitvalue').remove();
						$(this).dialog("close");
					}
				}, {
					text: "Ok",
					click: function () {
						var list = ['at will', '1/hr', '1/8hr', '1/day', '1/week', '1/month', '1/year'];
						var castwait = $('#popspell input[type="number"]').val() * 1;
						if ($('#popspell input:radio:checked').val() == 'turn') {
							castwait -= 1;
						}
						let name = $('#popspell input[type="text"]').val() +
							' (1 ' + $('#popspell input:radio:checked').val() +
							', ' + list[castwait] + ')';
						let pow = $('.waitvalue');
						pow.empty().attr('cost', 1).removeClass('addspell')
							.html('<span class="mycost" cost="1">1</span> ' + name);
						$('.powers:not(.waitvalue) .name:contains("'+name+'")').parent().remove();
						cl.addRemove(pow.removeClass('waitvalue'));

						$('#popspell input[type="text"]').val('');
						$('#popspell input[type="number"]').val('');
						$('#popspell input:radio').prop('checked', false);
						$(this).dialog("close");
						cl.pointsAndPowers();
					}
				}]
			});
			$("#casttime").buttonset();
			$('#poppower').dialog({
				modal: true,
				autoOpen: false,
				buttons: [{
					text: "Ok",
					click: function () {
						let cost = $('#poppower input[type="number"]').val();
						let name = $('#poppower input[type="text"]').val();
						let pow = $('.waitvalue');
						pow.attr('cost', cost);
						pow.children('.mycost').attr('cost',cost).text(cost);
						pow.children('.name').text(name);
						$('.powers:not(.waitvalue) .name:contains("'+name+'")').parent().remove();
						$('.waitvalue').removeClass('waitvalue');
						$('#poppower input').val('');
						$(this).dialog("close");
						cl.pointsAndPowers();
					}
				}, {
					text: "Cancel",
					click: function () {
						$('.waitvalue').remove();
						$(this).dialog("close");
					}
				}]
			});
			this.calcAll();
		},
		calcAll: function() {
			let cl = this;
			['hd','fighter','thief','divine','arcane','custommagic','racename','racepoints'].forEach(function(el){cl.selections(el);});
			cl.pointsAndPowers();
		},
		calc: function(sel) {
			if (sel == 'fighterSel')
				sel = 'fighter';
			if ('hd thief fighter divine arcane custommagic racename racepoints'.indexOf(sel) == -1) { return; }
			this.selections(sel);
			this.pointsAndPowers();
		},
		selections: function(sel) {
			let cl = this;
			let raw = cl.data.raw;
			if (sel == 'fighterSel')
				sel = 'fighter';
			if ('hd thief fighter divine arcane custommagic racename racepoints'.indexOf(sel) == -1)
				return;
			var idx = $('#' + sel + '>div>.select')[0].selectedIndex * 1;
			cl.data.raw[sel] = idx;
			this.update[sel]();
		},
		update: {
			hd: function(){
				$('#hdspan').text(window.acksCreator.class.data.hdType());
			},
			thief: function() {
				let idx = window.acksCreator.class.data.getval('thief');
				$('#thief ul').toggle(idx>0);
				$('#thiefspan').text(['0', '3', '5', '10', '15'][idx]);
				$('#thief ul input:first').trigger('change');
			},
			fighter: function() {
				let cl = window.acksCreator.class;
				let idx = cl.data.getval('fighter');
				let lastidx = ['Mage','Cleric/Thief','Fighter','Hero','Monster'].indexOf($('#fighter ul li:first').text());
				let lastrad = cl.data.raw.fightCleric;
				cl.data.raw.fightCleric = $('#radCleric').is(':checked') && idx==1;
				//Only if selections have changed
				if(idx != lastidx || cl.data.raw.fightCleric != lastrad) {
					cl.updateFighter(lastidx);
				}
				//Save the selected stuff
				cl.data.raw.fightStyles = [];
				$('#fightStyles input:checked').each(function(){
					cl.data.raw.fightStyles.push($(this).parent().text());
				});
				['fightWeapons','fightArmor','fightDamage'].forEach(function(str){
					cl.data.raw[str] = $('span#'+str+',#'+str+' option:selected').text();
				});
				cl.updateWeapons();
			},
			divine: function() {
				let cl = window.acksCreator.class;
				let idx = cl.data.getval('divine');

				$('#chkturn').parent().toggle(idx>1);
				$('#divine div:last span').hide();
				$('#divine div span:nth-child('+idx+')').show();
				cl.data.raw.turn = (idx > 1) && $('#chkturn').is(':checked');
				cl.createXPtable();
			},
			arcane: function() {
				let cl = window.acksCreator.class;
				let idx = cl.data.getval('arcane');

				$('#magespan').toggle(idx > 0);
				$('#chktradeac').parent().toggle(idx > 0 && idx < 4);
				cl.data.raw.tradearcane = (idx < 4) && (idx > 0) && $('#chktradeac').is(':checked');
				if (idx < 3)
					$('.mycost[cost="arcane"]').text(1).parent().attr('cost', 1);
				else
					$('.mycost[cost="arcane"]').text(2).parent().attr('cost', 2);
				cl.pointsAndPowers();
				$('#magespan').toggle(idx > 0).text(['', '1/3 level arcane', '1/2 level arcane', '2/3 level arcane', 'full caster, 100% spells', 'full caster, 133% spells', 'full caster, 150% spells', 'full caster, 166% spells', 'full caster, 200% spells'][idx]);
				cl.createXPtable();
			},
			custommagic: function() {
				let cl = window.acksCreator.class;
				if (!cl.data.raw.magic) {
					$('#custommagic').hide();
					cl.data.raw.tradecustom = false;
					cl.data.raw.turncustom = false;
					return;
				}
				let m = window.acksCreator.magic.data;
				let idx = cl.data.getval('custommagic');
				$('#custommagicspan').toggle(idx > 0).text(m.rankdata()[idx-1]);
				let full = (m.basexp() < 1000 ? 1 : (m.basexp()>2000 ? 4 : 3));
				$('#chktradecm').parent().toggle(idx > 0 && idx < full && !m.raw.code);
				cl.data.raw.tradecustom = idx>0 && idx<full && !m.raw.code && $('#chktradecm').is(':checked');
				$('#chkturncustom').parent().toggle(idx >= full && m.raw.code);
				cl.data.raw.turncustom = idx>=full && m.raw.code && $('#chkturncustom').is(':checked');
				cl.createXPtable();
			},
			racename: function() {
				let cl = window.acksCreator.class;
				let name = $('#racename select').val();
				if(!name)
					name = 'None';
				cl.data.raw.racename = name;
				let pow = $('.powers .name:contains("After the Flesh")').parent();
				if(pow) {
					let oldcost = pow.attr('cost');
					let newcost = (name != 'None' ? 3 : 1);
					if (oldcost != newcost) {
						pow.attr('cost',newcost).children('.mycost').attr('cost',newcost).text(newcost);
						cl.pointsAndPowers();
					}
				}
				$("#racenamespan").html(name);
				$('#racepowers').html('<p>Racial powers:</p><div></div><ul><li lvl="1">1: <div></div></li></ul>');
				$('#racepoints,#racepowers').toggle(name != 'None');
				$("#racepoints select").val(0).selectmenu('refresh');
				cl.selections('racepoints');
				//cl.pointsAndPowers();
			},
			racepoints: function() {
				let cl = window.acksCreator.class;
				let raw = cl.data.raw;
				let idx = raw.racepoints;
				['hd','fighter','thief','divine','arcane','custommagic'].forEach(function(el){
					if(cl.data.getval(el) != raw[el])
						cl.makeSel(el,0);
				});
				switch(raw.racename) {
					case 'Gnome':
					case 'Elf':
					case 'Zaharan':
						cl.makeSel('arcane',idx);
						break;
					case 'Thrassian':
						cl.makeSel('fighter',[0,0,1,1,2][idx]);
						break;
					case 'Nobirus':
						cl.makeSel('divine',idx);
						break;
					case 'Dwarf':
					case 'None':
						break;
					default:
						if(!raw.race)
							return;
						let rc = window.acksCreator.race;
						['hd','fighter','thief','divine','arcane','custommagic'].forEach(function(el){
							if(rc.getCount(el,4) > 0)
								cl.makeSel(el,rc.getCount(el,idx));
						});
						break;
				}
				let levels = [];
				if(raw.racename != 'None') {
					let racepowers = cl.races[raw.racename];
					let powers = [];
					for(let lvl = 0; lvl <= idx; lvl++) {
						if(racepowers[lvl].powers)
							racepowers[lvl].powers.forEach(function(obj){
								if(!levels.includes(obj.level))
									levels.push(obj.level);
								let p = powers.findIndex(function(el){return el.name == obj.name});
								if(p >= 0)
									powers[p].cost = obj.cost;
								else
									powers.push(jQuery.extend(true, {}, obj));
							});
					}
					cl.data.racepowers = powers;
				} else {
					cl.data.racepowers = [];
				}
				$('#racepowers ul').empty();
				levels.forEach(function(lvl){
					$('#racepowers ul').append('<li lvl="'+lvl+'">'+lvl+': <div /></li>');
				});
				cl.data.racepowers.forEach(function(pow){
					$('#racepowers ul li[lvl="'+pow.level+'"]>div').append('<div class="powers" cost="'+pow.cost+'"><span class="mycost">'+pow.cost+'</span> <span class="name">'+pow.name+'</span></div>');
				});
				cl.countProfs();
				cl.pointsAndPowers();
			}
		},
		updateFighter: function(lastidx){
			let idx = this.data.fighter();
			let cl = this;
			let raw = cl.data.raw;
			$('#fighterSel').toggle(idx == 1);
			$('#fighter ul li:first').text(['Mage','Cleric/Thief','Fighter','Hero','Monster'][idx]);
			$('#fighter>ul>li:nth-child(2)').text('Attack throw advances '+['+2 per 6','+2 per 4','+2 per 3','+2 per 2','+3 per 2'][idx] + ' levels');
			if(idx < 2)
				$('#fightDamage').replaceWith('<span id="fightDamage">None</span>');
			if(idx == 0) {
				$('#fightWeapons').replaceWith('<span id="fightWeapons">Restricted</span>');
				cl.updateWeapons();
				$('#fightArmor').replaceWith('<span id="fightArmor">Forbidden</span>');
				$('#armor').text(cl.data.armor['Forbidden']);
				$('#fightStyles input:first').prop('checked','true').change();
				$('#fightStyles label:last').hide();
			} else {
				$('#fightStyles label:last').show();
				if(idx == 1) {
					$('#fightStyles input:last').prop('checked',false);
					$('#fightStyles input:not(:last)').prop('checked',true);
				} else
					$('#fightStyles input').prop('checked',true);
				$('#fightStyles input').checkboxradio('refresh');
				if(lastidx == 0 || lastidx == 1 || idx == 1) {
					let w = $('<select id="fightWeapons"/>');
					let a = $('<select id="fightArmor"/>');
					let valw = ['Restricted','Narrow','Broad','Unrestricted'];
					let vala = ['Forbidden','Restricted','Narrow','Broad','Unrestricted'];
					if(idx == 1) {
						if($('#radCleric').is(':checked'))
							valw.length = 2;
						else {
							valw.length = 3;
							vala.length = 3;
						}
					}
					valw.forEach(function(el){
						w.append('<option>'+el+'</option>');
					});
					vala.forEach(function(el){
						a.append('<option>'+el+'</option>');
					});
					$('#fightWeapons').replaceWith(w);
					$('#fightArmor').replaceWith(a);
					$('#fightWeapons').addClass('select').selectmenu({
						change: function(){
							raw.fightWeapons = $(this).val();
							cl.updateWeapons();
							cl.pointsAndPowers();
						}
					});
					$('#fightArmor').addClass('select').selectmenu({
						change: function(){
							raw.fightArmor = $(this).val();
							if(raw.fightArmor == 'Forbidden') {
								$('#fightStyles label:last').hide().find('input').prop('checked',false);
								$('#fightStyles input:first').trigger('change');
							} else
								$('#fightStyles label:last').show();
							$('#fightStyles input').checkboxradio('refresh');
							$('#armor').text(cl.data.armor[raw.fightArmor]);
							cl.pointsAndPowers();
						}
					});
					
					if(idx > 1) {
						$('#fightDamage').replaceWith('<select id="fightDamage" />');
						['None','Missile','Melee','Both'].forEach(function(el){
							$('#fightDamage').append('<option>'+el+'</option>');
						});
						$('#fightDamage').addClass('select').selectmenu({
							change: function(){
								raw.fightDamage = $(this).val();
							}
						});
					}
					if(idx != lastidx) {
						$('#fightStyles input').attr('checked','true').checkboxradio('refresh');
					}
					$('#fightWeapons,#fightArmor,#fightDamage').find('option:last').attr('selected',true);
					$('#fightWeapons,#fightArmor,select#fightDamage').selectmenu('refresh');
					$('#armor').text(cl.data.armor[raw.fightArmor]);
				}
			}
		},
		updateWeapons: function(){
			let raw = this.data.raw;
			raw.selectedWeapons = raw.selectedWeapons || [];
			let weapons = [...raw.selectedWeapons];
			let wlist = $('#weapons');
			wlist.empty();
			if(raw.fightWeapons == 'Unrestricted') {
				wlist.append('<label>Any<input type="radio" checked="true" /></label>');
				$('#weaponwarning').hide();
				raw.selectedWeapons = ['Any'];
			} else if(raw.fightWeapons){
				this.data.weapons[raw.fightWeapons][1].forEach(function(el){
					wlist.append('<label>'+el+'<input type="checkbox" /></label>');
				});
				$('#weaponwarning').show();
			}
			weapons.forEach(function(el){
				$('#weapons label:contains("'+el+'") input').prop('checked',true);
			});
			$('#weapons input').checkboxradio({icon:false}).change(function(){
				if ($('#weapons input:checked').length > $('#weaponcount').text() * 1) {
					$('#weapons input:checked').not(this).filter(':first').prop('checked',false);
					$('#weapons input').checkboxradio('refresh');
				}
				$('#weaponwarning').toggle($('#weapons input:checked').length != $('#weaponcount').text()*1);
				raw.selectedWeapons = [];
				$('#weapons input:checked').each(function(){
					raw.selectedWeapons.push($(this).parent().text());
				});
			});
		},
		makeSel: function(sel,r){
			let raw = this.data.raw;
			let dd = $('#'+sel+'>div>select');
			dd.empty().append('<option value="0">0 XP</option>');
			let xps = Array.from(this.data.classxp[sel]);
			let rval = xps[r];
			xps.splice(0,r+1);
			if(xps.length > 4)
				xps.splice(4);
			if(raw[sel] + r > 4)
				raw[sel] = 4-r;
			xps.forEach(function(x){
				dd.append($('<option/>',{
					value: x-rval,
					text: (x-rval)+' XP'
				}));
				if(raw[sel] == dd.children('option').length-1)
					dd.children('option:last').attr('selected','true');
			});
			dd.selectmenu('refresh');
			this.selections(sel);
		},
		pointsAndPowers: function() {
			let cl = this;
			let raw = cl.data.raw;
			let xp = 0;
			let pow = 0;
			//Total class points used
			$("div:not(#racename,#racepoints,#popask):visible>div>.select").each(function () {
				xp += $(this).children("option:selected").val() * 1;
			});
			//Power points from fighter tradeoffs
			if($('#fightWeapons option').length) {
				let max = $('#fightWeapons option').length-1;
				pow += max - ['Restricted','Narrow','Broad','Unrestricted'].indexOf(raw.fightWeapons);
				if(max > 1 && (raw.fightWeapons == 'Restricted' || raw.fightWeapons == 'Narrow'))
					pow++;
			}
			if($('#fightArmor option').length)
				pow += $('#fightArmor option').length-1-['Forbidden','Restricted','Narrow','Broad','Unrestricted'].indexOf(raw.fightArmor);
			pow += (cl.data.fighter() > 1 ? 3 : cl.data.fighter() + 1) - raw.fightStyles.length;
			if(cl.data.fighter() > 1) {
				pow += [0,1,1,2][(['Both','Melee','Missile','None'].indexOf(raw.fightDamage))];
				xp += 150*pow;
			}
			if (cl.data.thief() > 0) {
				pow += [0, 3, 5, 10, 15][cl.data.thief()];
				pow -= raw.thiefSkills.length;
			}
			if(cl.data.divine() > 1 && !raw.turn)
				pow += cl.data.divine();
			if(raw.magic) {
				let m = window.acksCreator.magic.data;
				let full = (m.basexp()<1000 ? 2 : (m.basexp()>2000 ? 4 : 3));
				if(cl.data.custommagic() >= full && !raw.turncustom)
					pow += cl.data.custommagic();
			}
			//Powers
			raw.powers = [];
			raw.tradeoffs = [];
			$('#powerholder .tradeoffs div.trade').each(function(){
				raw.tradeoffs.push($(this).attr('trade')*1);
			});
			let lvlused = [,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			let lvlprov = [,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			raw.tradeoffs.forEach(function(val){
				//subtract the level
				let powerval = window.acksCreator.race.powervals[val];
				lvlused[powerval[1]] += powerval[0];
				powerval[2].forEach(function(lvl){
					lvlprov[lvl]++;
				});
			});
			$('#powerholder>ul>li').each(function(){
				let lvl = $(this).attr('lvl');
				$(this).find('.powers').each(function(){
					let cost = $(this).attr('cost')*1;
					lvlused[lvl] += cost;
					if($(this).children('.mycost').attr('cost').indexOf(',') > -1 && $('#racepowers .powers').length > 0) {
						let name = $(this).children('.name').text();
						let racepower = $('#racepowers .powers .name:contains("'+name+'")');
						if(racepower.length > 0)
							lvlused[lvl] -= racepower.parent().attr('cost')*1;
					}

					raw.powers.push({
						level: lvl,
						name: $(this).children('.name').text(),
						cost: cost,
						extend: $(this).children('.mycost').attr('cost').indexOf(',')>-1
					});
				});
			});
			for(let i=2;i<=14;i++) {
				if(lvlprov[i] < 1 && lvlused[i] < 1) {
					$('#powerholder li[lvl="'+i+'"]').remove();
				} else {
					$('#powerholder li[lvl="'+i+'"] .remaining').text(lvlprov[i]-lvlused[i]);
					$('#powerholder li[lvl="'+i+'"] .total').text(lvlprov[i]);
					if(lvlprov[i]-lvlused[i]<0)
						$('#powerholder li[lvl="'+i+'"]').addClass('error');
					else
						$('#powerholder li[lvl="'+i+'"]').removeClass('error');
				}
			}
			pow -= lvlused[1];

			//Race
			if (raw.racename != 'None') {
				xp += cl.races[raw.racename][raw.racepoints].xp;
				$('#level').text(cl.data.max());
				$("#points").text(cl.data.classpoints() + "+" + raw.racepoints);
			} else {
				$("#points").text(cl.data.classpoints());
				$('#level').text("14");
			}
			$('#minimums').text(cl.data.minimums());
			$("#points").css("background-color", (cl.data.classpoints() > 4 ? "#f00" : "inherit"));
			$("#xp").text(xp);
			raw.xp = xp;
			$(".custpowers").text(pow);
			
			if(raw.fightWeapons)
				$('#weaponcount').text(cl.data.weapons[raw.fightWeapons][0]);
			if(raw.fightArmor)
				$('#armor').text(cl.data.armor[raw.fightArmor]);
			cl.createXPtable();
		},
		getSpellsArray: function() {
			let cl = this;
			let m = window.acksCreator.magic;
			let arr = {};
			let max = cl.data.max();
			if(cl.data.divine() > 0 && cl.data.divine() < 5)
				arr.divine = this.trimSpellList(m.spellsper(cl.data.divine(),500,'alternate'));
			if(cl.data.arcane() > 0 && cl.data.arcane() < 9) {
				if(cl.data.raw.tradearcane) {
					let lst = m.spellsper(4,2500,'standard');
					for(let i = 0; i<[0,7,5,3][cl.data.arcane()]; i++)
						lst.unshift([0,0,0,0,0,0]);
					arr.arcane = this.trimSpellList(lst);
				} else
					arr.arcane = this.trimSpellList(m.spellsper(cl.data.arcane(),2500,'standard'));
			}
			if(cl.data.custommagic() > 0) {
				let full = (m.data.basexp() < 1000 ? 2 : (m.data.basexp() > 2000 ? 4 : 3));
				if(cl.data.custommagic() > 2*full)
					return arr;
				if(cl.data.raw.tradecustom) {
					let temp = [0,0,0,0,0];
					let lst = m.spellsper(full,m.data.basexp(),m.data.raw.progression);
					if(lst[0].length > 5)
						temp.push(0);
					let count = [[5],[6,2],[7,5,3]][full-2][cl.data.custommagic()-1];
					for(let i = 0; i<[0,7,5,3][cl.data.custommagic()]; i++)
						lst.unshift(temp);
					arr.custommagic = lst;
				} else
					arr.custommagic = m.spellsper(cl.data.custommagic(),m.data.basexp(),m.data.raw.progression);
				arr.custommagic = this.trimSpellList(arr.custommagic);
			}
			return arr;
		},
		trimSpellList: function(lst) {
			let max = this.data.max();
			lst.splice(max);
			let tmp = lst[max-1].indexOf(0);
			if(tmp>=0)
				lst.forEach(function(row){
					row.splice(tmp);
				});
			return lst;
		},
		createXPtable: function() {
			let cl = this;
			$('#saves').html('as '+cl.data.saves());
			$('#prime').html(cl.data.prime());

			//create XP table
			if(!cl.data.raw.levelnames || cl.data.raw.levelnames.length < 1) {
				cl.data.raw.levelnames = [];
				for(let i = 0; i<14; i++)
					cl.data.raw.levelnames.push('undefined');
			}
			$("#levels tbody").empty();
			$('#levels thead').empty().append('<tr><td></td><td></td><td></td></tr><tr><td>Lvl</td><td>XP</td><td>Title</td></tr></tr>');

			let spells = this.getSpellsArray();
			let names = {
				arcane: 'Arcane',
				divine: 'Divine'
			}
			if(cl.data.raw.magic)
				names['custommagic'] = cl.data.raw.magic.name;
			['divine','arcane','custommagic'].forEach(function(magic){
				if(spells[magic]) {
					let td = $('<td/>')
						.attr('colspan',spells[magic][0].length)
						.addClass('back'+magic)
						.text(names[magic]);
					$('#levels thead tr:first').append(td);
					spells[magic][0].forEach(function(el,idx){
						$('#levels thead tr:last').append('<td class="back'+magic+'">'+(idx+1)+'</td>');
					});
				}
			});
			let lvlXP;
			for(let lvl = 1; lvl <= cl.data.max(); lvl++) {
				if (lvl == 1)
					lvlXP = 0;
				else if (lvl == 2)
					lvlXP = cl.data.raw.xp;
				else if (lvl == 7)
					lvlXP = Math.round(lvlXP / 2500) * 5000;
				else if ((lvl > 8) && (cl.data.raw.racename != 'Thrassian'))
					lvlXP += this.data.additionalxp();
				else
					lvlXP *= 2;

				let str = $('<tr/>');
				str.append('<td>'+lvl+'</td>');
				if (lvl == 1)
					str.append('<td>0</td>');
				else
					str.append('<td>'+lvlXP+'</td>');
				str.append('<td><input type="text" class="ui-corner-all ui-state-default ui-widget" value="' + cl.data.raw.levelnames[lvl-1] + '" /></td>');
				//for each spell type, for each on this level
				['divine','arcane','custommagic'].forEach(function(magic){
					if(spells[magic])
						spells[magic][lvl-1].forEach(function(val){
							str.append('<td class="back'+magic+'">' + val + '</td>');
						});
				});

				$('#levels tbody').append(str);
			}
			$('#levels input').on('input propertychange paste', function(){
				cl.data.raw.levelnames = [];
				$('#levels input').each(function(){
					cl.data.raw.levelnames.push($(this).val());
				});
			});
		},
		countProfs: function() {
			let count = 0;
			let profs = this.data.raw.profs || [];
			profs.forEach(function(prof){
				count += (prof.indexOf(': (') > -1 ? 0.5 : 1);
			});
			let total = 42 - $('#level').text()*1;
			$('#profcount').text(count);
			$('#profof').text(total);
			$('#profcount').css('background-color', (total != count ? '#f00' : 'inherit'));
		},
		maketrade: function(thing){
			let cl = this;
			$(thing).draggable({
				helper: "clone",
				scroll: true,
				start: function(ev,ui){
					$('#powerholder>.tradeoffs').append('<div class="target"/>');
					$(".target").droppable({
						addClasses: false,
						tolerance: "pointer",
						activeClass: "activetarget",
						drop: function(ev, ui) {
							$(this).droppable("destroy");
							$(this).removeClass("target")
								.addClass("trade")
								.attr('cost',ui.draggable.attr('count'))
								.attr('trade',ui.draggable.attr('trade'));
							ul = $('#powerholder ul');
							for(let ret = 2; ret<15;ret++){
								if(ul.children('li[lvl="'+ret+'"]').length<1)
									ul.append('<li lvl="'+ret+'">'+ret+' (<span class="remaining"></span> of <span class="total"></span>): <div></div></li>');
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
							cl.addRemove($(this));
							cl.pointsAndPowers();
						}
					});
					ui.helper.addClass('helper');
				},
				stop: function(ev,ui){
					$('#powerholder .target').remove();
				}
			});
		},
		makepower: function(thing){
			let cl = this;
			$(thing).draggable({
				helper: "clone",
				scroll: true,
				start: function(ev,ui){
					let lastpower = 0;
					let pow = {
						name: ui.helper.text(),
						cost: ui.helper.attr('cost')
					};
					ui.helper.addClass('helper');
					$('#powerholder>ul>li>div').append('<div class="target"/>');
					$(".target").droppable({
						addClasses: false,
						tolerance: "pointer",
						activeClass: "activetarget",
						drop: function(ev, ui) {
							$(this).droppable("destroy");
							$(this).addClass('waitvalue');
							$(this).removeClass('target').addClass("powers").html('<span class="mycost" cost="'+pow.cost+'"></span> <span class="name">'+pow.name+'</span>');
							cl.addRemove($(this));
							if(ui.helper.hasClass('addspell')){
								$('#popspell').dialog("open");
							} else if(ui.helper.hasClass('addpower')) {
								$('#poppower').dialog("open");
							} else if(ui.helper.hasClass('multi')) {
								$('#popup').dialog({
									modal: true,
									width: '30em',
									title: 'Select Specialization',
									buttons: [{text: "Ok", click: function(){
										$(this).dialog('close');
										let obj = $('.waitvalue');
										let pow = {
											name: obj.text(),
											cost: obj.attr('cost')
										};
										cl.dropped(pow);
									}},{text: "Cancel", click: function(){$(this).dialog('close');}}]
								}).html("<h3>Select Specialization</h3><p>Please enter a specialization below:<br /><input type='text' />").dialog('open');
							} else
								cl.dropped(pow);
						}
					});
				},
				stop: function(ev,ui){
					$('#powerholder .target').remove();
				}
			});
		},
		dropped: function(pow){
			let cl = this;
			let target = $('.waitvalue');
			let vals = pow.cost.split(',');
			let lastpower = 0;
			let prev = cl.data.raw.powers.find(function(el){
				return el.name == pow.name;
			});
			if(!prev && cl.data.racepowers) {
				prev = cl.data.racepowers.find(function(el){
					return el.name == pow.name;
				});
			}
			if(prev)
				lastpower = prev.cost;
			while(vals.length > 0 && vals[0] <= lastpower)
				vals.shift();
			if(vals.length == 1) {
				target.children('.mycost').text(vals[0]);
				target.attr('cost',vals[0]);
				let cost = vals[0];
				if (cost == 'arcane') {
					target.attr('arcane','true');
					cost = (cl.data.arcane() > 2 ? 2 : 1);
				} else if(cl.data.raw.racename != 'None' && target.children('.name').text() == 'After the Flesh')
					cost = 3;
				target.attr('cost',cost).removeClass('waitvalue').children('.mycost').text(cost);
				cl.pointsAndPowers();
			} else if (vals.length < 1)
				target.remove();
			else {
				vals.forEach(function(el){
					$('#popask select').append('<option>'+el+'</option>');
				});
				$('#popask div p').text("Select value for '"+pow.name+"':");
				$('#popask').dialog('open');
			}
		},
		addRemove: function(obj) {
			let cl = this;
			obj.append('<span class="remove">X</span>');
			obj.children(".remove").click(function () {
				let div = $(this).parent();
				if(div.children('.name').text() == 'Inhumanity')
					div.next().remove();
				div.remove();
				cl.pointsAndPowers();
			});
		},
		load: function(str) {
			let obj = window.acksCreator.decompress(str);
			if (obj.objType == 'class')
				return this.loadClass(obj);
			else if (obj.objType == 'magic')
				return this.loadMagic(obj);
			else if (obj.objType == 'race')
				return this.loadRace(obj);
			else
				return false;
		},
		loadMagic: function(obj) {
			let cl = this;
			let mag = window.acksCreator.magic.data;
			mag.raw = obj;
			cl.data.raw.magic = obj;
			$('#magicname').text(mag.raw.name);
			$('#custommagic select').empty().append('<option value="0">0 XP</option>');
			cl.data.classxp['custommagic'] = [0];
			mag.xplevels().forEach(function(xp){
				$('#custommagic select').append('<option value="' + xp + '">' + xp + ' XP</option>');
				cl.data.classxp['custommagic'].push(xp);
			});
			$('#custommagic').show();
			$('#custommagic select')[0].selectedIndex = 0;
			$('#custommagic select').selectmenu('refresh');
			return true;
		},
		loadRace: function(obj) {
			let cl = window.acksCreator.class;
			window.acksCreator.race.data = obj;
			cl.data.raw.race = obj;
			cl.races[obj.name] = obj.race;
			if($('#racename select option').length > 7)
				$('#racename select option:last-child').remove();
			$('#racename select').append('<option>' + obj.name + '</option>').selectmenu('refresh');
			//TODO: double check this correctly captures races and abilities:
			cl.races[obj.name] = obj.race;
			if(obj.magic)
				this.loadMagic(obj.magic);
			return true;
		},
		loadClass: function(cs) {
			let cl = this;
			//make a deep copy
			cl.data.raw = JSON.parse(JSON.stringify(cs))
			if(cs.race)
				this.loadRace(cl.data.raw.race);
			if(cs.magic)
				this.loadMagic(cl.data.raw.magic);

			$('#name').val(cs.name);
			$('#desc').val(cs.description);
			$('#racename>div>select').val(cs.racename).selectmenu('refresh');
			$("#racenamespan").html(cs.racename);
			$('#racepoints').toggle(cs.racename != 'None');

			['racepoints','hd','fighter','thief','divine','arcane','custommagic'].forEach(function(el){
				$('#'+el+'>div>select')[0].selectedIndex = cs[el];
				$('#'+el+'>div>select').selectmenu('refresh');
				cl.selections(el);
			});

			if (cs.fightCleric)
				$('#radCleric').prop("checked", true).change();
			else
				$('#radThief').prop("checked", true).change();
			$('.select#fightWeapons').val(cs.fightWeapon);
			$('.select#fightArmor').val(cs.fightArmor);
			$('#fightStyles label input').each(function(){
				$(this).attr('checked',cs.fightStyles.indexOf($(this).parent().text()) > -1).change();
			});
			$('.select#fightDamage').val(cs.fightDamage);
			if(cs.selectedWeapons) cs.selectedWeapons.forEach(function(el){
				$('#weapons label:contains("'+el+'") input').prop('checked',true).checkboxradio('refresh');
			});

			$('#thief label input').prop('checked',false);
			if(cs.thiefSkills) cs.thiefSkills.forEach(function(el){
				$('#thief label:contains("'+el+'") input').prop('checked',true);
			});
			$('#chkturn').prop('checked',cs.turn);
			$('#chkturncustom').attr('checked',cs.turncustom);
			$('#chktradeac').prop('checked',cs.tradearcane);
			$('#chktradecm').prop('checked',cs.tradecustom);
			
			if(cs.profs) cs.profs.forEach(function(el){
				let specialized = el.indexOf(': (');
				let name = (specialized > -1 ? el.slice(0,specialized) : el);
				let obj = $('#profs div:contains("'+name+'")');
				if(specialized > -1) {
					let special = el.slice(specialized+3,el.length-1);
					obj.children('input').val(special);
				}
				obj.find('label input').prop('checked',true);
			});
			$('#powerholder .tradeoffs').empty();
			if(cs.tradeoffs) cs.tradeoffs.forEach(function(trade){
				let t = window.acksCreator.race.powervals[trade];
				let div = $('<div class="trade"/>');
				div.attr('cost',t[0]).attr('trade',trade).text(t[0] + ' lvl ' + t[1] + ' for ' + t[2].join(', '));
				$('#powerholder .tradeoffs').append(div);
			});
			let ul = $('#powerholder ul');
			ul.empty().append('<li lvl="1">1: <div/></li>');
			if(cs.powers) cs.powers.forEach(function(pow){
				if($(ul).children('li[lvl="'+pow.level+'"]').length<1)
					$(ul).append('<li lvl="'+pow.level+'">'+pow.level+' (<span class="remaining"></span> of <span class="total"></span>): <div></div></li>');
				$('#powerholder li[lvl="'+pow.level+'"]>div').append('<div class="powers" cost="'+pow.cost+'"><span class="mycost" cost="'+pow.cost+'">'+pow.cost+'</span> <span class="name">'+pow.name+'</span></div>');
			});
			let items = ul.children().get();
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
			cl.addRemove($('#powerholder .powers,#powerholder .trade'));
			$('#powerholder .powers .name:contains("Inhumanity")').each(function(){
				let div = $(this).parent();
				if(div.attr('cost')*1 < 0)
					div.children('.remove').remove();
			});

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
			
			/*TODO: add reminders if something didn't pass muster:
			 * weapons not chosen
			 * too many points spent
			 * too many or not enough custom powers
			 * tradeoffs with blank spots, or overspent
			 * 
			 * also, "choose N spells for the spell list" if prayerful
			 */

			/*TODO: Build a checklist for creating a pdf:
			 * Print custom magic summary sheet?
			 * Print custom race summary sheet?
			 * Print custom powers? (in case you want to summarize the custom powers yourself)
			 * Print spells? <-- this would be in case you created a custom spell sheet...
			 */

			$('#popup').dialog({
				title: 'Download Your Class',
				width: '50%',
			}).html('<p>See below!</p><iframe class="preview-pane" type="application/pdf" width="100%" height="200px" frameborder="0" style="position:relative;z-index:999"></iframe>').dialog("open");
			$('.preview-pane').attr('src', doc.output('bloburi'));
		},
		pdf: function(doc){
			let data = this.data;
			let mag = window.acksCreator.magic;

			let h = function(){ return doc.getLineHeight()*71/200; };
			doc.setFont('times');
			let height = doc.internal.pageSize.getHeight()-20;
			let width = doc.internal.pageSize.getWidth()-40;
			let y = 20;

			doc.setFontType("italic");
			doc.setFontSize(18);
			y += h();
			doc.text(20, y, data.raw.name);
			doc.setFontType('bold');
			doc.setFontSize(12);
			y += h();
			doc.text(20, y, ['Prime Requisite:','Requirements:','Hit Dice:','Maximum Level:','Weapons:','Armor:']);
			doc.setFontType('normal');
			doc.text(55, y, [data.prime(),data.minimums(),data.hdType(),data.max().toString(),data.raw.selectedWeapons.join(', '),data.armor[data.raw.fightArmor]]);
			y += h()*7;

			let spellboxCoords = this.makeSpellGrid(doc);

			let strDesc = '';

			//Turning
			if (data.turning())
				strDesc += " Turns as a Cleric of their level.";

			//Spell lists and what spells are chosen from where
			if(data.divine() > 0)
				strDesc += " Needs a spell list with "+Math.round(10*mag.levelmult(500)[data.divine()-1]*mag.spellsmult(500)[data.divine()-1])+" Divine spells.";
			if(data.custommagic() > 0) {
				if(mag.data.raw.acquisition == 'prayerful')
					strDesc += " Needs a spell list with " + Math.round(10*mag.levelmult(mag.data.basexp())[data.custommagic()-1]*mag.spellsmult(mag.data.basexp())[data.custommagic()-1]) + " " + mag.data.raw.name + " spells.";
				else
					strDesc += " Chooses spells from the " + mag.data.raw.name + " spell list.";
			}
			if(data.arcane() > 0)
				strDesc += " Chooses spells from the Arcane spell list.";

			//Thief skills
			if(data.raw.thiefSkills.length > 0)
				strDesc += " Can " + data.raw.thiefSkills.sentance() + ' as a thief of their level.';

			//Custom powers
			if(data.raw.powers.length > 0) {
				strDesc += " Custom Powers";
				let arr = Array.from(data.raw.powers);
				arr.sort(function(a,b){
					if(a.level == b.level) {
						if(a.name > b.name)
							return 1;
						else if(a.name < b.name)
							return -1;
						else
							return 0;
					} else
						return (a.level - b.level);
				});
				let last = 0;
				data.raw.powers.forEach(function(pow){
					let str = pow.name;
					if(pow.level > last) {
						last = pow.level;
						str = ' at level ' + last + ': ' + str;
						if(last > 1)
							str = ';'+str;
					} else
						str = ', ' + str;
					if(pow.extendable)
						str += ' (' + pow.cost + ')';
					strDesc += str;
				});
			}

			//Description
			if(data.raw.description)
				strDesc += "\n\n" + data.raw.description;

			//Profs
			if(data.raw.profs)
				strDesc += "\n\nClass Proficiencies list: " + data.raw.profs.join(', ');

			//Save file
			strDesc += "\n\nSave information:\n" + window.acksCreator.save('c'+window.acksCreator.class.data.raw);

			//And now, the actual PDF...
			let widths = [
				spellboxCoords.x - 22,
				doc.internal.pageSize.getWidth() - 40
			];
			let heights = [
				spellboxCoords.y,
				doc.internal.pageSize.getHeight() - 20
			];
			let paras = strDesc.split("\n");
			while(heights.length > 0 && y < heights[0] && paras.length > 0) {
				let rows = doc.splitTextToSize(paras.shift(),widths[0]);
				while(y < heights[0] && rows.length > 0) {
					let str = rows.shift();
					doc.text(20,y,str);
					y += h();
				}
				if(y >= heights[0]) {
					paras.unshift(rows.join(' '));
					if(heights.length > 1) {
						heights.shift();
						widths.shift();
					} else {
						y = 20+h();
						doc.addPage();
						//Avoid blank lines at tops of pages
						while(paras[0].length<1)
							paras.shift();
					}
				}
			}

			//Print custom race, if used
			if(data.raw.race && data.raw.racename != 'None') {
				doc.addPage();
				window.acksCreator.race.pdf(doc);
			}
			//Print custom magic, if used, but not used in race
			if(!window.acksCreator.race.data.magic && data.raw.custommagic > 0) {
				doc.addPage();
				window.acksCreator.magic.pdf(doc);
			}
			return doc;
		},
		makeSpellGrid: function(doc) {
			//Makes the level name, the levels, and each magic grid
			let mag = window.acksCreator.magic;
			let data = this.data;
			let h = function(){ return doc.getLineHeight()*71/200; };

			let spells = this.getSpellsArray();
			let x = doc.internal.pageSize.getWidth()-20;
			let y = 20+18*1.15*71/200;
			let xm = 4;
			let startxs = [x];
			let starty = y;
			let names = {
				arcane: 'Arcane',
				divine: 'Divine'
			}
			if(spells['custommagic'])
				names.custommagic = mag.data.raw.name;
			['custommagic','arcane','divine'].forEach(function(magic){
				if(spells[magic]) {
					let spmax = spells[magic][0].length;
					doc.text(x-(xm*spmax/2),y,names[magic],null,null,'center');
					x -= spmax*xm;
					for(let i = 0; i<spmax; i++)
						doc.text(x+i*xm,y+h(),(i+1).toString());
					x -= xm/2;
					startxs.push(x); //+xm/4);
				}
			});
			x -= xm/2;
			y += h();
			let offset = x;
			doc.text(x-xm/2,y,'Lvl',null,null,'center');
			doc.text(x-2*xm-1,y,'Title',null,null,'right');
			for(let i = 0; i<data.max(); i++) {
				y += h();
				x = offset;
				doc.text(x-xm-1,y,data.raw.levelnames[i],null,null,'right');
				doc.text(x-xm/2,y,(i+1).toString(),null,null,'center');
				x += xm;
				['divine','arcane','custommagic'].forEach(function(el){
					if(spells[el]) {
						for(let j = 0; j<spells[el][0].length; j++) {
							doc.text(x,y,spells[el][i][j].toString());
							x += xm;
						}
						x += xm/2;
					}
				});
			}
			let namelen = 0;
                        data.raw.levelnames.forEach(function(name){
                                namelen = Math.max(doc.getTextWidth(name),namelen);
                        });
			startxs.push(offset-xm*3/2-namelen);
			startxs.forEach(function(x0){
				let yy = starty+1;
				if(startxs.length>2 && x0 != startxs[startxs.length-1])
					yy -= h();
				doc.line(x0,yy,x0,y+1);
			});
			doc.line(startxs[0],starty+1,startxs[startxs.length-1],starty+1);
			doc.line(startxs[0],starty+h()+1,startxs[startxs.length-1],starty+h()+1);
			doc.line(startxs[0],y+1,startxs[startxs.length-1],y+1);
			if(startxs.length>2)
				doc.line(startxs[startxs.length-2],starty-h()+1,startxs[0],starty-h()+1);

			return {'x':startxs[startxs.length-1],'y':y+1};
		}
	}
});
