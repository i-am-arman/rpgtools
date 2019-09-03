var mydata;
var myitems;
function startme(){
 $(function(){
  $('#staroff button').button().click(function(){
   $('#space').toggle();
  });
  $('#header a').button();
  doPlanet();
 });
}

function doPlanet(){
 //Load the dropdowns
 $.getJSON('/shifting/planets.json',function(data){
  mydata=data;
  data.worlds.forEach(function(world){
   $('#pstart,#pend').append("<option value='"+world.rank+"'>"+world.world+"</option>");
  });
  doItems();
 });
}

function doItems(){
 //Load the dropdowns
 $.getJSON('/shifting/items.json',function(data){
  myitems=data;
  $('#items').append('<div id="tables"></div>');
  for(var i=0;i<data.equipment.length;i++){
   $('#tables').append('<h2>'+data.equipment[i].category+'</h2><div id="tbl'+i+'"><table><th>Cost</th><th>Title</th><th>Weight</th><th>Description</th><th>Ammo</th><th>Origin</th></table></div>');
   for(var j=0;j<data.equipment[i].contents.length;j++){
    var itm=data.equipment[i].contents[j];
    var pstart=$('#pstart :selected').val()*1;
    var pend;
    if(itm.origin=='Anywhere'){
     pend=pstart;
    }else{
     pend=findrank(itm.origin)*1;
    }
    var dist;
    if(pend==pstart){
     dist=0;
    }else{
     dist=100*min(recurse(pstart,pend,[pstart],[0]));
    }
    var cost=itm.base;
    if(pend!=pstart){cost+=Math.round((dist+itm.insPerTon)/itm.itemPerTon);}
    $('#tbl'+i+' table').append('<tr base="'+itm.base+'" ins="'+itm.insPerTon+'" itms="'+itm.itemPerTon+'" org="'+itm.origin+'"><td class="cost">'+cost+'</td><td>'+itm.name+'</td><td>'+itm.weight+'</td><td>'+itm.desc+'</td><td>'+itm.ammo+'</td><td>'+itm.origin+'</td></tr>');
   }
  }
  $('#tables').accordion({collapsible: true,heightStyle: "content"});
  $('#pstart,#pend').selectmenu({change: function(){
   $('#result').text(blah());
   calctable();
  }});
 });
}

function calctable(){
 $('#items table tr').each(function(rw){
  var base=$(this).attr('base')*1;
  var ins=$(this).attr('ins')*1;
  var items=$(this).attr('itms')*1;
  var origin=$(this).attr('org');
  var pstart=$('#pstart :selected').val()*1;
  var pend;
  if(origin=='Anywhere'){
   pend=pstart;
  }else{
   pend=findrank(origin)*1;
  }
  var dist;
  if(pend==pstart){
   dist=0;
  }else{
   dist=100*min(recurse(pstart,pend,[pstart],[0]));
  }
  var cost=base;
  if(pend!=pstart){cost+=Math.round((dist+ins)/items);}
  $(this).children('.cost').text(cost);
 });
}

function blah(){
 var pStart=$('#pstart :selected').val()*1;
 var pEnd=$('#pend :selected').val()*1;
 if(pStart==pEnd){
  return 0;
 } else {
  var dist=min(recurse(pStart,pEnd,[pStart],[0]));
  var days = Math.floor(dist/24);
  var str = '';
  if(days>1) {
   str = days + ' days ';
  } else if(days>0) {
   str = '1 day ';
  }
  str += (dist % 24) + ' hours';
  return str;
 }
}

function recurse(rank,myend,a,b){
 var len=a.length;
 var retArray=[];
 for(var i=0;i<mydata.worlds[rank-1].dests.length;i++){
  var dest=mydata.worlds[rank-1].dests[i].dest*1;
  var dist=mydata.worlds[rank-1].dests[i].dist*1;
  if(dest==myend){
   b.push(dist);
   a.push(dest);
   return [sum(b)];
  } else if(!contains(a,dest)){
   var arr1=a.slice();
   var arr2=b.slice();
   arr1.push(dest);
   arr2.push(dist);
   retArray=retArray.concat(recurse(dest,myend,arr1,arr2));
  }
 }
 return retArray;
}

function contains(a, obj){for(var i=0;i<a.length;i++){if(a[i]===obj){return true;}} return false;}
function sum(arr){var ret=0;arr.forEach(function(a){ret+=a;});return ret;}
function min(arr){return Math.min.apply(null, arr);}
function findrank(val){for(var i=0;i<mydata.worlds.length;i++){if(mydata.worlds[i].world==val){return i+1;}}return 0;}
