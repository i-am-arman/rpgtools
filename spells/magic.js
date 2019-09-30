//TODO: Export the loaded pages, and build a giant html file with everything pre-populated
//TODO: Make any changes (ie, remove the 0.01 multiplier bit) to fix the flaws it has
//TODO: Add a save button and a description box at the bottom of the creator
//TODO: Add a load button, to load a custom Magic class, and add a the multipliers to the select boxes
//TODO: Once that works:
/* Recreate Arcane/Divine magic types
 * Remove the multipliers
 * Add a radio button at the top of the page
 * Auto-populate the final multipliers
 */
//TODO: When loading multipliers, make sure to disable boxes that have subdivisions
//TODO: print the subdivisions

window.acksCreator.Register("magic",function(){
	window.acksCreator.magic = {
		spelltypes: {
			standard: [[1,0,0,0,0,0],[2,0,0,0,0,0],[2,1,0,0,0,0],[2,2,0,0,0,0],[2,2,1,0,0,0],[2,2,2,0,0,0],[3,2,2,1,0,0],[3,3,2,2,0,0],[3,3,3,2,1,0],[3,3,3,3,2,0],[4,3,3,3,2,1],[4,4,3,3,3,2],[4,4,4,3,3,2],[4,4,4,4,3,3]],
			alternate: [[2/5,0,0,0,0],[1,0,0,0,0],[2,0,0,0,0],[2,1,0,0,0],[2,2,0,0,0],[2,2,1,1,0],[2,2,2,1,1],[3,3,2,2,1],[3,3,3,2,2],[4,4,3,3,2],[4,4,4,3,3],[5,5,4,4,3],[5,5,5,4,3],[6,5,5,5,4]],
			improved: [[2,0,0,0,0,0],[3,0,0,0,0,0],[3,1,0,0,0,0],[3,2,0,0,0,0],[3,2,1,0,0,0],[3,3,2,0,0,0],[4,3,2,1,0,0],[4,3,3,2,0,0],[4,4,3,2,1,0],[4,4,3,3,2,0],[5,4,4,3,2,1],[5,4,4,3,3,2],[5,5,4,4,3,2],[6,5,4,4,3,3]]
		},
		breakouts: {
			blast: [[
				{mult:6, name:"Target creatures"},
				{mult:6, name:"Target area: sphere"},
				{mult:2, name:"Target area: cube"},
				{mult:1, name:"Target area: cylinder"},
				{mult:1, name:"Target area: line"},
				{mult:3, name:"Target area: cone"}
			]],
			death: [[
				{mult:1, name:"Damage"},
				{mult:1, name:"Hold"},
				{mult:1, name:"Mortal wound"},
				{mult:1, name:"Slay"},
				{mult:2, name:"Drain"},
				{mult:1, name:"Disintegrate"}
			],[
				{mult:1, name:"Imbue"},
				{mult:1, name:"Animate"},
				{mult:1, name:"Deanimate"}
			]],
			detection: [[
				{mult: 1, name:"good/evil"},
				{mult: 1, name:"ritual magic"},
				{mult: 1, name:"danger"},
				{mult: 1, name:"known object"},
				{mult: 1, name:"invisible"},
				{mult: 1, name:"magic"},
				{mult: 1, name:"poison"},
				{mult: 1, name:"undead"},
				{mult: 1, name:"treasure"},
				{mult: 1, name:"charm"},
				{mult: 1, name:"secret doors"},
				{mult: 1, name:"trap"},
				{mult: 1, name:"curse"}
			]],
			enchantment: [[
				{mult:1, name:"Confused"},
				{mult:1, name:"Asleep"},
				{mult:1, name:"Mesmerized"},
				{mult:1, name:"Charmed"},
				{mult:1, name:"Feebleminded"},
				{mult:1, name:"Held"},
				{mult:1, name:"Flees in panic"},
				{mult:1, name:"Commanded"}
			],[
				{mult:1, name:"undead"},
				{mult:1, name:"living"},
				{mult:1, name:"both"}
			],[
				{mult:1, name:"animals"},
				{mult:1, name:"humanoids"},
				{mult:1, name:"plants"},
				{mult:1, name:"all"}
			]],
			healing: [[
				{mult:1, name:"Cure/Cause Damage"},
				{mult:1, name:"Blindness"},
				{mult:1, name:"Disease"},
				{mult:1, name:"Poison"},
				{mult:1, name:"Reincarnation"},
				{mult:1, name:"Restoration of life and limb/death ray"},
				{mult:1, name:"Regeneration / withering"},
				{mult:1, name:"Resurrection / destruction"},
			],[
				{mult:1, name:"Cure"},
				{mult:1, name:"Inflict"}
			]],
			illusion: [[
				{mult:4, name:"Create illusion"},
				{mult:1, name:"Inaudible"},
				{mult:1, name:"Invisible"},
				{mult:1, name:"Mirror images"},
				{mult:1, name:"Phantasmal killer"},
			]],
			movement: [[
				{mult:1, name:"Double move"},
				{mult:1, name:"Climb"},
				{mult:1, name:"Water-walk"},
				{mult:1, name:"Double attack"},
				{mult:1, name:"Fly"},
				{mult:1, name:"Fly as broom"},
				{mult:1, name:"Fly as carpet"},
				{mult:1, name:"Move target vertically"},
				{mult:1, name:"Move target anywhere"},
				{mult:6, name:"Teleport"}
			],[
				{mult:1, name:"only objects"},
				{mult:1, name:"only creatures"},
				{mult:1, name:"objects and creatures"}
			]],
			protection: [[
				{mult:4, name:"AC Value"},
				{mult:4, name:"AC Bonus"},
				{mult:15,name:"Spell immunity"},
				{mult:6, name:"Damage resistance"},
				{mult:3, name:"Ward"}
			]],
			summoning: [[{mult:1, name:"summoning"}]],
			transmogrification: [[
				{mult:1, name:"statue"},
				{mult:1, name:"living"},
				{mult:1, name:"undead"}
			],[
				{mult:1, name:"breathe water"},
				{mult:1, name:"infravision"},
				{mult:1, name:"proficiency-like ability"},
				{mult:1, name:"blend into surroundings"},
				{mult:1, name:"leap in great bounds"},
				{mult:1, name:"climb like a spider"},
				{mult:1, name:"move noiselessly"},
				{mult:1, name:"sight of an eagle"},
				{mult:1, name:"grow / shrink"},
				{mult:1, name:"becomes gaseous"},
				{mult:1, name:"becomes incorporeal"},
				{mult:1, name:"strength of an ogre"},
				{mult:1, name:"flight of a giant hawk"},
				{mult:1, name:"strength of a giant"},
				{mult:1, name:"regenerative powers of troll"},
			]],
			walls: [[
				{mult:1, name:"None"},
				{mult:3, name:"Attacks"},
				{mult:1, name:"Fear"},
				{mult:1, name:"Cloudkill"},
				{mult:1, name:"Mortal wounds"},
				{mult:1, name:"Death"},
				{mult:1, name:"Disintegration"},
				{mult:2, name:"Damage"}
			],[
				{mult:2, name:"Impermeable to creatures"},
				{mult:1, name:"Impermeable to magic"},
				{mult:1, name:"Impermeable to light"},
				{mult:1, name:"Impermeable to vision"}
			]]
		},
		levelmult: function(basexp) {
			if(basexp<1000)
				return [1/2,1,1,1];
			else if(basexp>=2000)
				return [1/3,1/2,2/3,1,1,1,1,1];
			else
				return [2/5,3/4,1,1,1,1];
		},
		spellsmult: function(basexp) {
			if(basexp<1000)
				return [1,1,4/3,3/2];
			else if(basexp>=2000)
				return [1,1,1,1,4/3,3/2,5/3,2];
			else
				return [1,1,1,4/3,3/2,5/3];
		},
		spellsper: function(points,basexp,progression) {
			let xlvl = this.levelmult(basexp)[points-1];
			let xspl = this.spellsmult(basexp)[points-1];
			let list = this.spelltypes[progression];
			let result = [];
			let spells = (progression == 'alternate' ? 5 : 6);
			for(let lvl=0; lvl<14; lvl++) {
				result[lvl] = [];
				for(let spell = 0; spell<spells; spell++) {
					let newlvl = (lvl+1)*xlvl;
					newlvl = (xlvl < 1/2 ? newlvl = Math.floor(newlvl) : Math.round(newlvl));
					if(newlvl < 1)
						result[lvl][spell] = 0;
					else
						result[lvl][spell] = Math.round(list[newlvl-1][spell]*xspl);
				}
			}
			return result;
		},
		data: {
			rankdata: function(){
				if(this.basexp()<1000)
					return ['1/2','Full','Spells x 133%','Spells x 150%'];
				else if(this.basexp()>=2000)
					return ['1/3rd','1/2','2/3rd','Full'];
				else return ['2/5','3/4','Full','Spells x 133%'];
			},
			raw:{objType: "magic",powers:[]},
			researchlevel: function(){return (this.raw.acquisition!="inherited"?5:"N/A");},
			brewlevel: function(){if(this.raw.transmogrification>1.25||this.raw.transmogrification<=0) return "N/A"; else if(this.raw.acquisition=="inherited") return 5; else return 5+this.raw.brewearly*2;},
			scribelevel: function(){if(this.raw.acquisition=="inherited") return "N/A"; else return 5-this.raw.brewearly*2;},
			permitems:function(){return this.raw.enchantment<=1.5&&this.raw.enchantment>0;},
			rituals:function(){return (this.raw.progression=="alternate"?"6th, 7th":"7th, 8th, 9th");},
			constructs:function(){return (this.raw.blast<=1.5&&this.raw.blast>0?"Yes":"Dwarf only");},
			crossbreeds:function(){return this.raw.transmogrification<=1 && this.raw.transmogrification>0;},
			unlife:function(){return this.raw.death<=1.5 && this.raw.death>0;},
			saves:function(){if(this.sourcefactor()>13.5 || this.acquisition=="prayerful") return "Cleric"; else if(this.sourcefactor()>12.5 && this.raw.code) return "Cleric"; else return "Mage";},
			prime: function(){let bhmod = (this.raw.blast>0?this.raw.blast:2.25)/(this.raw.healing>0?this.raw.healing:2.25); let idx = (this.raw.acquisition == "prayerful"?0:(this.raw.acquisition == "studious"?1:2)); if(bhmod<1.1) return ["INT and WIS","INT","INT and WIS"][idx]; else if(bhmod>1.5) return ["WIS","INT and WIS","CHA and WIS"][idx]; else return ["INT or WIS","INT or WIS","CHA"][idx];},
			additionalxp: function(){return (this.sourcefactor()<=13?150000:(this.sourcefactor()>14?100000:120000));},
			items:function(){let bhmod = (this.raw.blast>0?this.raw.blast:2.25)/(this.raw.healing>0?this.raw.healing:2.25); if(bhmod>=1.1 && bhmod <=1.5) return "Mage and Cleric"; else if(bhmod<1.1 && this.sourcefactor()<=12.5) return "Mage"; else if(bhmod>1.5 && this.sourcefactor()>13.5) return "Cleric"; else return "Mage or Cleric";},
			spelllist:function(){if(this.raw.acquisition!="prayerful") return ["Full","Full","Full","Full"]; else if(this.basexp<1000) return [10,10,12,15]; else if(this.basexp>=2000) return [10,10,10,10]; else return [10,10,10,12];},
			spellsper: function(points) { return spellsper(points,this.basexp(),this.raw.progression); },
			zeroes:function(){return (this.raw.blast==0) + (this.raw.death==0) + (this.raw.detection==0) + (this.raw.enchantment==0) + (this.raw.healing==0) + (this.raw.illusion==0) + (this.raw.movement==0) + (this.raw.protection==0) + (this.raw.summoning==0) + (this.raw.transmogrification==0) + (this.raw.wall==0);},
			subone:function(){return (this.raw.blast<1 && this.raw.blast>=0.75) + (this.raw.death<1 && this.raw.death>=0.75) + (this.raw.detection<1 && this.raw.detection>=0.75) + (this.raw.enchantment<1 && this.raw.enchantment>=0.75) + (this.raw.healing<1 && this.raw.healing>=0.75) + (this.raw.illusion<1 && this.raw.illusion>=0.75) + (this.raw.movement<1 && this.raw.movement>=0.75) + (this.raw.protection<1 && this.raw.protection>=0.75) + (this.raw.summoning<1 && this.raw.summoning>=0.75) + (this.raw.transmogrification<1 && this.raw.transmogrification>=0.75) + (this.raw.wall<1 && this.raw.wall>=0.75);},
			specialized: function(){return zeroes>0;},
			sourcefactor:function(){return this.raw.blast+this.raw.death+this.raw.detection+this.raw.enchantment+this.raw.healing+this.raw.illusion+this.raw.movement+this.raw.protection+this.raw.summoning+this.raw.transmogrification+this.raw.wall},
			xplevels: function(){
				let xp=this.basexp();
				let levels = [];
				if(xp<1000)
					levels = [Math.round(xp/2),xp,2*xp,4*xp];
				else if(xp<2000)
					levels = [Math.round(xp*2/5),Math.round(xp*3/4),xp,xp*2,xp*3,xp*4];
				else levels = [Math.round(xp/4),Math.round(xp/2),Math.round(xp*3/4),xp,Math.round(xp*5/4),Math.round(xp*6/4),Math.round(xp*7/4),xp*2];
				if(this.raw.powers)
					for(let i = 0; i < levels.length; i++)
						levels[i] += 75*this.raw.powers.filter(function(x){return x.classlevel-1<i;}).length;
				return levels;
			},
			basexp:function(){
				return Math.round(Math.max((this.raw.progression=="improved"?1.135:1)*(
					500-45*this.zeroes()+
					(this.raw.blast>0?(2.25-this.raw.blast)*1300:0)+
					(this.raw.death>0?(1.5-this.raw.death)*500:0)+
					(this.raw.detection>0?(1.25-this.raw.detection)*500:0)+
					(this.raw.enchantment>0?(1.3-this.raw.enchantment)*500:0)+
					(this.raw.healing>0?(1-this.raw.healing)*1000:0)+
					(this.raw.illusion>0?(1.5-this.raw.illusion)*500:0)+
					(this.raw.movement>0?(1.25-this.raw.movement)*500:0)+
					(this.raw.protection>0?(1-this.raw.protection)*500:0)+
					(this.raw.summoning>0?(1.2-this.raw.summoning)*500:0)+
					(this.raw.transmogrification>0?(1.25-this.raw.transmogrification)*500:0)+
					(this.raw.wall>0?(1.5-this.raw.wall)*500:0)
				),500)/25)*25;
			},
			toString:function(){
				return this.getStatsTable()+this.getRanksTable()+this.getSpellsTable()+this.getAbilitiesTable();
			},
			getStatsTable: function(){
				return "<table id='stats' class='over'><tbody><tr><td>Saving Throw:</td><td>as "+this.saves()+"</td></tr><tr><td>Prime Req.:</td><td>"+this.prime()+"</td></tr><tr><td>XP after 8th:</td><td>"+this.additionalxp()+"</td></tr><tr><td>Item usage:</td><td>"+this.items()+"</td></tr></tbody></table>";
			},
			getRanksTable:function(){
				let ranks = this.rankdata();
				let lvls = this.xplevels();
				let ret = "<table id='ranks' class='over'><thead><tr><td>Val</td><td>Spells</td><td>XP</td></tr></thead><tbody><tr><td>0</td><td>None</td><td>0</td></tr>";
				for(let i=0;i<4;i++){
					ret += "<tr><td>"+(i+1)+"</td><td>"+ranks[i]+"</td><td>"+lvls[i]+"</td></tr>";
				}
				ret += "</tbody></table>";
				return ret;
			},
			getSpellsTable:function(){
				let ret = "<table id='spells'><thead><tr><td>lvl</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td>"+(this.raw.progression=="alternate"?"":"<td>6</td>")+"</tr></thead><tbody>";
				let spells = window.acksCreator.magic.spelltypes[this.raw.progression];
				for(let i=1;i<=14;i++){
					ret+="<tr><td>"+i+"</td>";
					spells[i-1].forEach(function(el){ret+="<td>"+Math.round(el)+"</td>";});
					ret+="</tr>";
				}
				ret+="</tbody></table>";
				return ret;
			},
			getAbilitiesTable:function(){
				return "<table id='abilities'><thead><tr><td>Ability</td><td>Allowed</td></tr></thead><tbody><tr><td>Collect/Use Divine Power</td><td>"+(this.raw.code?"Yes":"No")+"</td></tr><tr><td>Research Spells</td><td>"+this.researchlevel()+"</td></tr><tr><td>Scribe Scrolls</td><td>"+this.scribelevel()+"</td></tr><tr><td>Brew Potions</td><td>"+this.brewlevel()+"</td></tr><tr><td>Create Perm. Magic Items @ lvl 9</td><td>"+this.permitems()+"</td></tr><tr><td>Cast Ritual Spells @ lvl 11</td><td>"+this.rituals()+"</td></tr><tr><td>Create &amp; Design Constructs @ lvl 11</td><td>"+this.constructs()+"</td></tr><tr><td>Create Crossbreeds @ lvl 11</td><td>"+this.crossbreeds()+"</td></tr><tr><td>Grant Unlife @ lvl 11</td><td>"+this.unlife()+"</td></tr></tbody></table>";
			}
		},
		start: function(){
			let mag = this;
			let raw = mag.data.raw;

			$('#desc').blur(function(){
				window.acksCreator.magic.data.raw.description = $('#desc').val();
				$('#desc').removeClass('focus');
			}).focus(function(){
				$('#desc').addClass('focus');
			});

			$('#about').button().click(function(){
				window.acksCreator.popup(
					"Custom Magic Class CreatorAbout",null,null,
					"<div><p>Welcome to the Custom Magic Class, an interactive magic class creation service, to be used with character class and race creation. It's based on the <a style='display:inline' href='http://www.autarch.co/buy-now'>Adventurer, Conquerer, King</a> System, using guidelines in <a href='http://www.drivethrurpg.com/product/179660/Axioms-Issue-1'>Axioms Issue 1</a>. If you haven't bought it already, you should! The player's companion will also help with determining the magic type values.</p><p>Importantly, this tool is neither bug-free nor rules-complete. The Judge has the final say; if you're the Judge, make sure you're not doing something silly.</p><p>If any part of it doesn't make sense, or you have more questions about what you can and can't do, please purchase Axioms Issue 1 and the Adventurer, Conquerer, King player's companion - they really are awesome resources!</p></div>"
				);
			});

			$('#saveit').button().click(function(){
				window.acksCreator.popup(
					'Copy to Save','30em',[
						{text: 'Copy to Clipboard',click:function(){
							$('#popsave_text').select();
							document.execCommand("copy");
						}},
						{text: 'Save to Local',click:function(){
							let raw = window.acksCreator.magic.data.raw;
							if(raw.name=='')
								raw.name = 'Custom Magic';
							localStorage.setItem('m'+raw.name, $('#popsave_text').val());
							$(this).dialog('close');
						}},
						{text: 'Cancel',click:function(){$(this).dialog('close');}}
					], '<p>Click the button below to copy the text to the clipboard; alternatively, copy the code below manually. Make sure to get everything!</p><textarea id="popsave_text">m'+window.acksCreator.save(window.acksCreator.magic.data.raw)+'</textarea>');
			});
			$('#loadit').button().click(function(){
				window.acksCreator.popload('m',function(obj){
					if(window.acksCreator.magic.load(obj)) {
						window.acksCreator.magic.calc();
						return true;
					} else
						return false;
				});
			});
			$('#displayit').button().click(function(){
				mag.displayPdf();
			});

			$.getJSON("ajax/custompowers.json", function(data) {
				var items = [
					'<span class="power open" cost="1">Open Custom Power</span>',
					'<span class="power addpower" cost="1">DIY Power</span>',
					'<span class="power addspell" cost="1">Spell-as-power</span>'
				];
				data.powers.forEach(function(el){
					if(el.cost.split(',')[0] == '1')
						items.push('<span cost="'+el.cost+'" class="power" extend="'+el.extend+'">'+el.name+'</span>');
				});
				$('<p/>').html(items.join('')).appendTo('#magicpowerlist');
				mag.makepower();
			});
			
			$('#name').change(function(){
				window.acksCreator.magic.data.raw.name = $(this).val();
			});
			$('#acquisition').selectmenu({
				change: function(){
					window.acksCreator.magic.data.raw.acquisition = $(this).val().toLowerCase();
					$('#abilities').replaceWith(mag.data.getAbilitiesTable());
					$('#creation').toggle(window.acksCreator.magic.data.raw.acquisition != 'inherited');
				}
			});
			$('#behavior').change(function(){
				window.acksCreator.magic.data.raw.code = $(this).prop('checked');
				$('#abilities').replaceWith(mag.data.getAbilitiesTable());
				mag.calc();
			});
			$('#creation select').selectmenu({
				change: function(){
					var val=$(this)[0].selectedIndex*1;
					window.acksCreator.magic.data.raw.brewearly = [0,-1,1][val];
					$('#abilities').replaceWith(mag.data.getAbilitiesTable());
				}
			});
			$('#magics input').on("change keyup paste", function(){mag.calc()});
			$('#progression').selectmenu({
				change:function(){
					window.acksCreator.magic.data.raw.progression = $(this).val().toLowerCase();
					$('#ranks').replaceWith(mag.data.getRanksTable());
					$('#abilities').replaceWith(mag.data.getAbilitiesTable());
					$('#spells').replaceWith(mag.data.getSpellsTable());
					mag.calc();
				}
			});

			$('tr>td>input[type="text"]').addClass('ui-state-default ui-button ui-corner-left ui-widget').after('<button class="ui-button ui-corner-right ui-widget"><span class="ui-icon ui-icon-script"></span></button>');
			$('tr>td>button').click(function(){
				let thisname = $(this).parent().parent().attr('id');
				let oldval = $('#'+thisname+' input').val();
				let str = '<table id="breakouts"><thead><tr><td>Weight</td><td>Value</td><td>Desc.</td></tr</thead><tbody>';
				mag.breakouts[thisname].forEach(function(el,idx){
					let old = window.acksCreator.magic.data.raw[thisname.toLowerCase()+'Breakout'];

					el.forEach(function(x,i){
						let val = oldval;
						if(old)
							val = old[idx][i];
						str += '<tr class="idx'+idx+'"><td>'+x.mult+'</td><td><input type="text" value="'+val+'" mult="'+x.mult+'" idx="'+idx+'"/></td><td>'+x.name+'</td></tr>';
					});
					str += '<tr class="idx'+idx+'"><td colspan="2">Multiplier:</td><td class="submult">1</td></tr>';
				});
				str += '</tbody></table>';
				window.acksCreator.popup('Breakouts for ' + thisname,'30em',[
					{text: 'Cancel',click:function(){
						$(this).dialog('close');
					}},
					{text: 'Reset',click:function(){
						window.acksCreator.magic.data.raw[thisname+'Breakout'] = undefined;
						$('#'+thisname+' input').prop('disabled',false).change();
						$(this).dialog('close');
					}},
					{text: 'Save results',click:function(){
						window.acksCreator.magic.data.raw[thisname+'Breakout'] = [];
						let bk = window.acksCreator.magic.data.raw[thisname+'Breakout'];
						$('#breakouts input').each(function(){
							if(!bk[$(this).attr('idx')*1])
								bk[$(this).attr('idx')*1] = [];
							bk[$(this).attr('idx')*1].push($(this).val());
						});
						let sum = 0;
						$('.submult').each(function(){
							sum += $(this).text()*1;
						});
						let result = sum/$('.submult').length;
						$('#'+thisname+' input').val(result).prop('disabled',true).change();
						$(this).dialog('close');
					}}
				], str);
				if($('#breakouts tr .submult').length > 1)
					$('#breakouts tbody').append('<tr><td colspan="2">Final Multiplier:</td><td class="bigmult"></td>');
				$('#breakouts tr input').on('blur', function(){
					$(this).val(0.05*Math.floor($(this).val()/0.05+0.001));
					if($(this).val() > 2.25)
						$(this).val(2.25);
					else if($(this).val() < 0.5)
						$(this).val(0.5);
					let idx = 'tr.idx'+$(this).attr('idx');
					let sum = 0;
					let weight = 0;
					$(idx+' td input').each(function(){
						let w = $(this).attr('mult')*1;
						sum += $(this).val()*w;
						weight += w;
					});
					let result = (0.05*Math.floor(sum/(weight*.05)+0.001)).toFixed(2);
					$(idx+' .submult').text(result);
				});
			});

			//Load the default mage type
			if(!mag.load("H4sIAAAAAAAAA0WPMU8DMQyF/wryHFWtBAy3dmZjQwxu4t65SuwSO5wqxH8nd23p9qz3+fn5B/Rwer+cCQYoOHKEAGedqRoMH58BBMti7Zu5lqe3O1F1rGTGKt00R0lYUzcOGc1h2AVIhD7dlFP0Fd1tngOQxAnFC8lCbl4DTISZZVymlwCcc7sm9+Wi33Qj17OPqADWSlG5LgbwimKl9+IjR/yHZsx5FRi/Ghv7vXNLrM1656ipv3jEbNQfqDQT1nyBYfv7Byx/d1odAQAA"))
				alert("Something has gone terribly wrong. This form may no longer work!");
			
			$('#abilities').replaceWith(mag.data.getAbilitiesTable());
			$('#stats').replaceWith(mag.data.getStatsTable());
			$('#ranks').replaceWith(mag.data.getRanksTable());
		},
		makepower: function(){
			let mag = this;
			$('#magicpowerlist .power').draggable({
				helper: "clone",
				scroll: true,
				start: function(event,ui){
					let name = ui.helper[0].textContent;
					let classes = ui.helper[0].classList;
					ui.helper.addClass("helper");
					$('#powers li:not(:has(span))').append('<span class="target"/>');
					let data = mag.data;
					$('.target').droppable({
						addClasses: false,
						tolerance: "pointer",
						activeClass: "activetarget",
						drop: function(event, ui) {
							$(this).droppable("destroy");
							$(this).addClass('waitvalue')
								.removeClass("target")
								.addClass("powers")
								.html('<span class="mycost" cost="'+ui.draggable.attr('cost')+'"></span> <span class="name">'+ui.draggable.text()+'</span>');
							if(ui.draggable.hasClass('addspell')) {
								mag.addRemove($('.waitvalue').removeClass('addspell'))
								window.acksCreator.popspell(mag.calc);
							} else if(ui.draggable.hasClass('addpower')) {
								mag.addRemove($('.waitvalue').removeClass('addpower'));
								window.acksCreator.poppower(mag.calc,false);
							} else if(ui.draggable.hasClass('multi')) {
								mag.addRemove($('.waitvalue').removeClass('multi'));
								window.acksCreator.popmulti(mag.calc);
							} else {
								let pow = $('.waitvalue');
								let costs = pow.children('.mycost').attr('cost').split(',').map(Number);
								let name = pow.children('.name').text();
								let lvl = $('#powers li').index(pow.parent());
								let prev = 0;
								let next = Infinity;
								mag.data.raw.powers.forEach(function(el) {
									if(el.name == name) {
										if(lvl > el.classlevel)
											prev = Math.max(prev,el.cost);
										else
											next = Math.min(next,el.cost);
									}
								});
								while(costs.length > 0 && costs[0] <= prev)
									costs.shift();
								while(costs.length > 0 && (costs[costs.length-1]-prev > 1 || costs[costs.length-1] >= next))
									costs.pop();
								if(costs.length < 1)
									pow.remove();
								else if(costs.length == 1) {
									pow.removeClass('waitvalue').attr('cost',costs[0]).children('.mycost').text(costs[0]);
									mag.calc();
								} else
									window.acksCreator.popask(name,costs,mag.calc);
								mag.addRemove($(this));
								mag.calc();
							}
						}
					});
				},
				stop: function(event,ui){
					$('.target').remove();
				}
			});
		},
		addRemove: function(obj) {
			let mag = this;
			obj.append('<span class="remove">X</span>');
			obj.children(".remove").click(function () {
				let div = $(this).parent();
				if(div.children('.name').text() == 'Inhumanity')
					div.next().remove();
				div.remove();
				mag.calc();
			});
		},
		calc: function(){
			let mag = window.acksCreator.magic;
			$('#powers').append((new Array(8)).join('<li />'));
			$('#powers li:gt('+(mag.data.xplevels().length-1)+')').remove();

			mag.data.raw.powers = [];
			$('#powers .powers').each(function(){
				mag.data.raw.powers.push({
					name: $(this).children('.name').text(),
					cost: $(this).attr('cost'),
					level: 1,
					extend: $(this).attr('extend') == 'true',
					classlevel: $('#powers li').index($(this).parent())
				});
			});
			$('#errors').empty().hide();
			$('.error').removeClass('error');
			$('#magics tbody tr').each(function(){
				var name=$(this).children('td:nth-child(1)').text().toLowerCase();
				var val=$(this).find('input').val()*1;
				var def=$(this).children('td:nth-child(2)').text()*1;
				mag.data.raw[name] = val;
				if(val>2.25) {
					$('#errors').append('<p>No values over 2.25 allowed.</p>').show();
					$(this).addClass('error');
				} else if(val > def)
					$(this).addClass('overdefault');
				else if(val < 0.75 && val > 0) {
					$('#errors').append('<p>No values under 0.75 allowed.</p>').show();
					$(this).addClass('error');
				} else if(val < 1)
					$(this).addClass('underdefault');
				if(val > 0)
					$(this).children('td:last').text(Math.round(($(this).children('td:nth-child(2)').text()-val)*$(this).children('td:nth-child(4)').text()));
				else
					$(this).children('td:last').empty();
			});
			var zeroes = mag.data.zeroes();
			var fracs = mag.data.subone();
			if(zeroes == 0 && fracs > 0) {
				$('.underdefault').removeClass('underdefault').addClass('error');
				$('#errors').append('<p>Values must be not less than 1, unless a value is 0.</p>').show();
			} else
				$('.underdefault').removeClass('underdefault');
			if(zeroes > 0 && $('.overdefault').length > 0) {
				$('.overdefault').removeClass('overdefault').addClass('error');
				$('#errors').append('<p>For specialized classes, no value can be larger than the default value.</p>').show();
			}
			var total = mag.data.sourcefactor();
			if(total<11-1.125*zeroes){
				$('#errors').append('<p>Total value must be greater than '+(11-1.125*zeroes)+'</p>').show();
			}else if(total>15){
				$('#errors').append('<p>Total value must be less than 15</p>').show();
			}
			if((zeroes>0)&&(fracs*2>zeroes)){
				$('#errors').append('<p>There must be two zero values for each value less than one.</p>').show();
			}
			$('#errors p').prepend('<span class="ui-icon ui-icon-alert"></span>');

			$('#magics tfoot tr td:nth-child(3)').text(total.toFixed(3));
			$('#magics tfoot tr td:nth-child(4)').text('+'+(500-zeroes*45));
			$('#magics tfoot tr td:last,#basexp').text(mag.data.basexp());
			
			$('#abilities').replaceWith(mag.data.getAbilitiesTable());
			$('#stats').replaceWith(mag.data.getStatsTable());
			$('#ranks').replaceWith(mag.data.getRanksTable());
		},
		load: function(str){
			var obj;
			try {
				obj = window.acksCreator.decompress(str);
			} catch(err) {
				console.log("Bad data!",err,str);
				return false;
			}
			if(!obj.objType || obj.objType != "magic") {
				alert('The data loaded is type ' + obj.objType + ', not "magic"!');
				return false;
			}
			window.acksCreator.magic.data.raw = obj;
			
			$('#name').val(obj.name);
			$('#desc').val(obj.description);
			$('#progression').val(obj.progression.capitalize());
			$('#acquisition').val(obj.acquisition.capitalize());
			$('#behavior').prop('checked', obj.code);
			$('#creation select :nth-child('+[2,1,3][obj.brewearly+1]+')').prop('selected', true);
			if($('#progression').selectmenu('instance'))
				$('#progression,#acquisition,#creation select').selectmenu('refresh');
			$('#creation').toggle(obj.acquisition != 'inherited');
			$('#magics tr').each(function(el){
				$(this).find('input').val(obj[$(this).children('td:first').text().toLowerCase()]);
			});
			//TODO: load powers
			$('.powers').remove();
			this.calc();
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
				'Download Your Class','75%',null,
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

			//Title
			doc.setFontType('italic');
			doc.setFontSize(18);
			doc.text(20, 20, data.raw.name);

			//Requisites
			doc.setFontType('bold');
			doc.setFontSize(12);
			doc.text(20, 30, ['Prime Requisite:','Saves as:','Add\'l XP after 8:','Item usage:']);
			doc.setFontType('normal');
			doc.text(60, 30, [data.prime(),data.saves(),data.additionalxp().toString(),data.items()]);

			//Abilities
			doc.setFontType('bold');
			doc.line(20,31+h()*5,80,31+h()*5);
			doc.text(55,30+5*h(),['Ability','Collect Divine Power','Research Spells','Scribe Scrolls','Brew Potions','Perm. Magic Items','Ritual Spell Levels','Create Constructs','Create Crossbreeds','Grant Unlife'],null,null,'right');
			doc.text(60,30+h()*5,'Allowed');
			doc.setFontType('normal');
			doc.text(60,30+h()*6,[
				(data.raw.code?"Yes":"No"),
				(data.researchlevel()>0?'At level ':'')+data.researchlevel(),
				(data.scribelevel()>0?'At level ':'')+data.scribelevel(),
				(data.brewlevel()>0?'At level ':'')+data.brewlevel(),
				(data.permitems()?"At level 11":"No"),
				data.rituals(),
				data.constructs(),
				(data.crossbreeds()?"At level 11":"No"),
				(data.unlife()?"At level 11":"No")
			].map(function(el){return el.toString()}));

			//Multipliers
			doc.setFontType('bold');
			doc.line(20,31+h()*16,80,31+h()*16);
			doc.text(60,30+h()*16,'Multiplier');
			doc.text(55,30+h()*16,['Categories','Blast','Death','Detection','Enchantment','Healing','Illusion','Movement','Protection','Summoning','Transmogrification','Wall'],null,null,'right');
			doc.setFontType('normal');
			doc.text(60,30+h()*17,[data.raw.blast,data.raw.death,data.raw.detection,data.raw.enchantment,data.raw.healing,data.raw.illusion,data.raw.movement,data.raw.protection,data.raw.summoning,data.raw.transmogrification,data.raw.wall].map(function(obj){return obj.toString()}));

			//Spells at Full
			let spells = Array.from(window.acksCreator.magic.spelltypes[data.raw.progression]);
			let newspells;
			let spellmax = (data.raw.progression == 'alternate' ? 5 : 6);
			if(spellmax == 5) {
				spells.unshift([1,2,3,4,5]);
				newspells = [[],[],[],[],[]];
			} else {
				spells.unshift([1,2,3,4,5,6]);
				newspells = [[],[],[],[],[],[]];
			}
			for(let i=0;i<spells.length;i++)
				for(let j=0;j<spells[i].length;j++)
					newspells[j][i] = spells[i][j];
			newspells.unshift(['lvl',1,2,3,4,5,6,7,8,9,10,11,12,13,14]);
			newspells = newspells.map(function(obj){return obj.map(function(itm){return itm.toString();})});
			let xm = 7;
			doc.line(136,22,136,22+(newspells[0].length+1)*h());
			doc.line(136-xm,28,136+spellmax*xm,28);
			for(let i=0; i<newspells.length; i++) {
				doc.text(130+xm*i,27,newspells[i]);
			}
			let nexty = (newspells[0].length+1)*h();
			doc.rect(129,22,(spellmax+1)*xm,nexty);
			nexty+=22;

			//XP levels
			let cols = [
				['Val','0','1','2','3','4'],
				data.rankdata(),
				data.xplevels().slice(0,4).map(function(item){return item.toString();})
			];
			cols[1].unshift('Spells','None');
			cols[2].unshift('XP','0');

			doc.rect(129,nexty,49,h()*cols[0].length+1);
			nexty+=h();
			doc.line(129,nexty+1,178,nexty+1);
			doc.text(135,nexty,cols[0],null,null,'center');
			doc.text(150,nexty,cols[1],null,null,'center');
			doc.text(165,nexty,cols[2]);
			nexty+=(cols[0].length+1)*h();

			//Description
			let wid = doc.internal.pageSize.getWidth()-40;
			let hit = doc.internal.pageSize.getHeight()-nexty-20;
			let maxheight = Math.floor(hit/h());
			doc.lines([[0,-6*h()],[wid-60+1,0],[0,hit],[-wid-2,0],[0,-hit+h()*6]],79,nexty+6*h(),[1,1],'S',true);
			nexty+=h();

			if(!data.raw.description)
				data.raw.description = "";
			let text = data.raw.description.split('\n');
			let txt = [];
			while(txt.length<6 && text.length>0) {
				let x = text.shift();
				txt = txt.concat(doc.splitTextToSize(x,wid-60));
			}
			if(txt.length>6) {
				let old = txt.splice(6);
				text = old.join(' ')+' '+text.join('\n');
			}
			doc.text(80,nexty,txt);
			nexty+=h()*6;

			txt = doc.splitTextToSize(text, wid);
			text = txt.splice(maxheight-6);
			doc.text(20,nexty,txt);
			hit = doc.internal.pageSize.getHeight()-40;
			wid = doc.internal.pageSize.getWidth()-40;
			while(text.length>0) {
				doc.addPage();
				doc.rect(20,20,wid,hit);
				txt = text.splice(Math.floor(hit/h()));
				doc.text(20,20+h(),text);
				text = txt;
			}

			return doc;
		}
	};
});
