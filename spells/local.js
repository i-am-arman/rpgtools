window.acksCreator.Register("local",function(){
	window.acksCreator.local = {
		start: function(){
			$('#about').button().click(function(){
				$('#popup').dialog({
					modal: true,
					title: 'Welcome to the Creator Manager',
					width: '30em',
					buttons: [{
						text: 'Close',
						click: function(){
							$('#popup').dialog('close');
						}
					}]
				}).html("<h3>Creator Manager</h3><div><p>Welcome to the Creator Manager, the interactive local storage manager for Classes, Races, and Magic Types! Use it to view or delete the items currently in your local storage. All told, this is probably the simplest tool I've got!</p>");
			});
			//TODO: load
			$('#loadit').button().click(function(){
				//Open the correct page, and tell it to load that value?
			});
			$('#delete').button().click(function(){
				let sel = $('#cookies>li>label>input:checked');
				if(sel.length < 1) return;
				let items = [];
				let names = [];
				sel.each(function(){
					names.push($(this).parent().text());
					items.push($(this).val());
				});

				$('#popup').dialog({
					modal: true,
					title: 'Delete?',
					width: '30em',
					buttons: [{
						text: 'Exterminate!',
						click: function(){
							items.forEach(function(obj){localStorage.removeItem(obj);});
							$('#popup').dialog('close');
							window.acksCreator.local.refresh();
						}
					},{
						text: 'Nooo!',
						click: function(){$('#popup').dialog('close');}
					}]
				}).html('<p>Are you sure you want to delete '+names.sentance()+'? This cannot be undone!</p>').dialog("open");
			});
			$('#displayit').button().click(function(){
				window.acksCreator.local.loadval.displayPdf();
			});
			this.refresh();
		},
		refresh: function(){
			let selected = [];
			$('#cookies li label input:checked').each(function(){
				selected.push($(this).val());
			});
			let items = [];
			Object.keys(localStorage).forEach(function(obj){
				let thing = window.acksCreator.local.getThing(obj);
				let name = obj.slice(1);
				items.push('<li><label><input type="checkbox" value="'+obj+'" /> '+thing+': '+name+'</label></li>');
			});
			$('#cookies').append(items.join(''));
			$('#cookies li label input').each(function(){
				if(selected.indexOf($(this).val()) > -1)
					$(this).prop('checked',true);
			});
			$('#cookies li label input').change(function(){
				window.acksCreator.local.loadData();
			});
			$('#displayit').attr('disabled',$('#cookies li label input:checked').length != 1);
		},
		loadData: function(){
			let sel = $('#cookies li label input:checked');
			let str = '';
			$('#displayit').attr('disabled',sel.length != 1);
			if(sel.length == 1) {
				let obj = window.acksCreator.decompress(localStorage.getItem(sel.val()).slice(1));
				str = '<h2>'+sel.parent().text()+'</h2>';
				let thing = window.acksCreator.local.getThing(sel.val());
				let hasMagic = false;
				let hasRace = false;
				let hasClass = false;
				if(thing == 'Magic') {
					window.acksCreator.magic.data.raw = obj;
					window.acksCreator.local.loadval = window.acksCreator.magic;
					hasMagic = true;
				} else if (thing == 'Race') {
					window.acksCreator.race.data = obj;
					window.acksCreator.local.loadval = window.acksCreator.race;
					hasRace = true;
					if(obj.magic) {
						window.acksCreator.magic.data.raw = obj.magic;
						hasMagic = true;
					}
				} else if (thing == 'Class') {
					window.acksCreator.class.data.raw = obj;
					window.acksCreator.local.loadval = window.acksCreator.class;
					hasClass = true;
					if(obj.race) {
						window.acksCreator.race.data = obj.race;
						hasRace = true;
					}
					if(obj.magic) {
						window.acksCreator.magic.data.raw = obj.magic;
						hasMagic = true;
					} else if(obj.race && obj.race.magic) {
						window.acksCreator.magic.data.raw = obj.race.magic;
						hasMagic = true;
					}
				}
				if(hasClass) {
					//print the class stuff, however I want to do that
					str += window.acksCreator.class.data.toString();
				}
				if(hasRace) {
					str += window.acksCreator.race.toString();
				}
				if(hasMagic) {
					str += window.acksCreator.magic.data.toString();
				}
			} else {
				window.acksCreator.loadval = undefined;
				window.acksCreator.magic.data.raw = undefined;
				window.acksCreator.class.data.raw = undefined;
				window.acksCreator.race.data = undefined;
			}
			$('#viewer').html(str);
		},
		getThing: function(obj){
			return (obj[0] == 'm' ? 'Magic' : (obj[0] == 'r' ? 'Race' : (obj[0] == 'c' ? 'Class' : 'Unknown')));
		}
	}
});
