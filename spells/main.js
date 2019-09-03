//console.log("main create");
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
				//console.log("init "+el);
				window.acksCreator.init[el]();
			});
		},
		Start: function(){
			this.Initialize();
			let splt = location.pathname.split('/');
			let pagename = splt[splt.length-1].split('.')[0];
			//console.log("start "+pagename);
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
		}
	};

document.addEventListener('DOMContentLoaded', function(){
	console.log("main start");
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
