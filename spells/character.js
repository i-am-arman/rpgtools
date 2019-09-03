var magicvals=[[[1,0,0,0,0,0],[2,0,0,0,0,0],[2,1,0,0,0,0],[2,2,0,0,0,0],[2,2,1,0,0,0],[2,2,2,0,0,0],[3,2,2,1,0,0],[3,3,2,2,0,0],[3,3,3,2,1,0],[3,3,3,3,2,0],[4,3,3,3,2,1],[4,4,3,3,3,2],[4,4,4,3,3,2],[4,4,4,4,3,3]],[[0,0,0,0,0],[1,0,0,0,0],[2,0,0,0,0],[2,1,0,0,0],[2,2,0,0,0],[2,2,1,1,0],[2,2,2,1,1],[3,3,2,2,1],[3,3,3,2,2],[4,4,3,3,2],[4,4,4,3,3],[5,5,4,4,3],[5,5,5,4,3],[6,5,5,5,4]],[[2,0,0,0,0,0],[3,0,0,0,0,0],[3,1,0,0,0,0],[3,2,0,0,0,0],[3,2,1,0,0,0],[3,3,2,0,0,0],[4,3,2,1,0,0],[4,3,3,2,0,0],[4,4,3,2,1,0],[4,4,3,3,2,0],[5,4,4,3,2,1],[5,4,4,3,3,2],[5,5,4,4,3,2],[6,5,4,4,3,3]]];
var powervals=[[1,1,[2,12]],[1,1,[3,11]],[1,1,[4,10]],[1,1,[5,9]],[1,1,[6,8]],[1,1,[7,7]],[2,1,[3,5,7]],[2,1,[2,4,9]],[2,1,[5,5,5]],[1,7,[8,14]],[1,7,[9,13]],[1,8,[9,14]],[1,8,[10,13]],[1,9,[10,14]],[1,9,[11,13]],[1,9,[12,12]],[1,10,[11,14]],[1,10,[12,13]],[1,11,[12,14]],[1,11,[13,13]],[1,12,[13,14]]];
var racexp=[[200,400,600,900,1400],[125,750,1375,2000,2500],[250,450,1075,1275,1975],[125,250,625,1125,2125],[200,400,1000,1250,2300],[200,825,1450,2075,2700]];
var racemin=['None','CON 9','INT 9','INT and CON 9','All 11','STR, DEX, CON 9','INT, WIS, CHA 9'];
var rankdata=[[['1/3rd','1/2','2/3rd','Full'],['2/5','3/4','Full','Spells x 133%'],['1/2','Full','Spells x 133%','Spells x 150%']],[[.25,.5,.75,1],[.4,.75,1,2],[.5,1,2,4]]];
var armor=['no armor, nor use a shield', 'hide armor', 'leather armor or lighter', 'chain mail or lighter', 'any armor'];
var weapons=[[3,['club', 'dagger', 'bola', 'dart', 'sling', 'sap', 'staff', 'whip']], [2,['axes', 'bows/crossbows', 'flails/hammers/maces', 'swords/daggers', 'spears/pole arms', 'bolas/darts/nets/slings/saps/staffs', 'any combination of 3 weapons']], [2,['any one-handed melee weapons', 'any two-handed melee weapons', 'any axes, flails, hammers, and maces', 'any swords, daggers, spears, and polearms', 'all missile weapons', 'any combination of 5 weapons']], [1,['any weapon']]];
var codes='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
function start(){
 $('#saveit').button().click(function(){
  $('#popup').dialog('option','width','30em').dialog('option','title','Copy to Save').html('<p>Click the button below to copy the text to the clipboard; alternatively, copy the code below manually. Make sure to get everything between (and including) the square brackets:</p><p><button id="btncopy">Copy to Clipboard</button><button id="btnsavecookie">Save to Cookie</button></p><textarea id="txtcopy">'+save()+'</textarea>').dialog("open");
  $('#btncopy').button().click(function(){
   $('#popup textarea').select();
   document.execCommand("copy");
  });
  $('#btnsavecookie').button().click(function(){
   if($('#name').val()!=''){
    saveCookie($('#name').val(),$('#popup textarea').text());
   }else{
    saveCookie('CustomClass',$('#popup textarea').text());
   }
   $('#popup').dialog('close');
  });
 });
 $('#loadit').button().click(function(){
  var str = '';
  getCookies().forEach(function(obj){
   var val = '';
   if(obj[1][0]=='['){
    val='Class';
   }else if(obj[1][0]=='{'){
    val='Magic';
   }else if(obj[1][0]=='('){
    val='Race';
   }else{
    return;
   }
   str += '<option value="'+obj[1]+'">'+val+': '+obj[0]+'</option>';
  });
  $('#cookielist').empty().append(str);
  $('#popload').dialog("open");
 });
 $('#loadit input').bind('input propertychange', function(){
  if((loadme.length<35)||(loadme.indexOf('[')!=0)||(loadme.indexOf(']')<36)){
   $('#loaderror').text('Error: save data may be corrupt. Make sure you copied the square brackets at the beginning and end of the code!').show();
  }else{
   $('#loaderror').hide();
  }
 });
 $('#loadcookie').button().click(function(){
  load($('#cookielist').val());
  $('#popload').dialog('close');
 });
 $('#displayit').button().click(function(){
  displayPdf();
 });
 $("select,input").change(function(){calc($(this).parent().attr('id'))});
 $("#fightingSel").buttonset().hide();
 $("#radCleric").prop("checked", true).change();
 $("#fighting ul:not(:first),#racetype,#thief ul,#thief div span,#cleric label,#cleric div span,#mage div span").hide();
 $("#powertrade").accordion({heightStyle:"fill"});
 makepower();
 $("#popup").dialog({modal: true,buttons:[{text:"Ok",click:function(){$(this).dialog('close');}}]});
 $('#popload').dialog({modal:true,autoOpen:false,buttons:[{text:"Ok",click: function(){if(load($('#popload input').val())){$(this).dialog('close');calc('zzz');}}},{text: "Cancel",click: function(){$(this).dialog("close");}}]});
 $("#popask").dialog({
  modal: true,
  autoOpen: false,
  dialogClass: "no-close",
  buttons: [{
   text: "Ok",
   click: function() {
    $('.waitvalue').attr('cost',$(this).children('select').val());
    $('.waitvalue').children('.mycost').text($(this).children('select').val());
    $('.waitvalue').removeClass('waitvalue');
    $(this).children('select').empty();
    $(this).dialog("close");
    pointsAndPowers();
   }
  },{
   text: "Cancel",
   click: function(){
    remove($('.waitvalue'));
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
    remove($('.waitvalue'));
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
    addRemove($('.waitvalue').empty().attr('cost',1).removeClass('waitvalue').removeClass('addspell').html('<span class="mycost" cost="1">1</span> '+$('#popspell input[type="textbox"]').val()+' (1 '+$('#popspell input:radio:checked').val()+', '+list[castwait]+')'));
    $('#popspell input[type="textbox"]').val('');
    $('#popspell input[type="number"]').val('');
    $('#popspell input:radio').prop('checked', false);
    $(this).dialog("close");
    pointsAndPowers();
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
    addRemove($('.waitvalue').empty().attr('cost',cost).removeClass('waitvalue').html('<span class="mycost" cost="'+cost+'">'+cost+'</span> '+$('#poppower input[type="textbox"]').val()));
    $('#poppower input').val('');
    $(this).dialog("close");
    pointsAndPowers();
   }
  },{
   text: "Cancel",
   click: function(){
    remove($('.waitvalue'));
    $(this).dialog("close");
   }
  }]
 });
 calc('zzz');
}

function calc(sel){
 selections(sel);
 pointsAndPowers();
 countProfs();
}
function selections(sel){
 if(sel=='fightingSel'){sel='fighting';}
 if('hd thief fighting cleric mage race racetype'.indexOf(sel)==-1){return;}
 var idx=getval(sel);
 if(sel=='hd'){
  $('#'+sel+'span').text(['d4','d6','d8','d10','d12'][idx]);
 }else if(sel=='thief') {
  if(idx>0){
   $('#thief ul').show();
  } else {
   $('#thief ul').hide();
  }
  $('#'+sel+'span').text(['0','3','5','10','15'][idx]+' thief powers');
 }else if(sel=='fighting'){
  $('#fighting ul').hide();
  if(idx==1){
   $('#fightingSel').show();
   if($('#radThief:checked').length>0){idx=2;}
  }else{
   $('#fightingSel').hide();
   if(idx>1){idx+=1;}
  }
  $("#fighting ul:nth-child("+(idx+3)+")").show();
 }else if(sel=='cleric'){
  if(idx>0){$("#cleric label").show();}else{$("#cleric label").hide();}
  $('#cleric div span').hide()
  $('#cleric div span:nth-child('+idx+')').show()
 }else if(sel=='mage'){
  $('#mage div span').hide();
  $('#mage div span:nth-child('+idx+')').show();
  if(idx<3){
   $('.mycost[cost="arcane"]').text(1).parent().attr('cost',1);
  }else{
   $('.mycost[cost="arcane"]').text(2).parent().attr('cost',2);
  }
  $('#'+sel+'span').text(['','1/3 level mage','1/2 level mage','2/3 level mage','full level mage','133% spells','150% spells','166% spells','200% spells','Not allowed!'][idx]);
 }else if(sel=='magic'){
  $('#magic div span:last').text(rankdata[0][rank][$('#magic>select')[0].selectedIndex]);
 }else if(sel=='race'){
  if($("#race select")[0].selectedIndex>0){
   $("#racetype").show();
   $("#racetype select")[0].selectedIndex=0;
   $("#racename").html($("#"+sel+' select option:selected').text());
  } else {
   $("#racetype").hide();
  }
  selections('racetype');
 }else if(sel=='racetype'){
  var race=$('#race>select')[0].selectedIndex;
  //display custom powers?
  if((race==2)||(race==3)||(race==6)){
   selections('mage');
  }else if(race==5){
   selections('fighting');
  }else if(race==4){
   selections('cleric');
  }else if(race==7){
   selections('fighting');
   selections('thief');
   selections('cleric');
   selections('mage');
   selections('magic');
  }
 }
}
function pointsAndPowers(){
 var p=0;
 var xp=0;
 var pow=0;
 var addXP=0;
 $("div:not(#race,#racetype,#popask):visible>select").each(function(){
  p+=$(this)[0].selectedIndex;
  xp+=$(this).children("option:selected").val()*1;
 });
 $("#fighting ul li select:visible").each(function(idx){
  var diff=$(this).children("option").length-$(this)[0].selectedIndex-1;
  var fighting=$("#fighting>select")[0].selectedIndex;
  if(($('#race>select')[0].selectedIndex==5)&&$('#racetype>select')[0].selectedIndex>2){fighting+=$('#racetype>select')[0].selectedIndex-2;}
  if((fighting>0)&&(idx==0)&&($(this)[0].selectedIndex<2)&&($(this).children('option').length>2)){
   pow+=1;
  }
  if(fighting>=2){
   xp+=150*diff;
  }
  pow+=diff;
 });
 if($('#cleric input[type="checkbox"]:checked').length<1){
  pow+=$('#cleric select')[0].selectedIndex;
 }
 if($('#thief select')[0].selectedIndex>0){
  pow+=[0,3,5,10,15][$('#thief select')[0].selectedIndex];
  pow-=$('#thief input[type="checkbox"]:checked').length;
 }
 $("#powerholder>.powers").each(function(){
  pow-=$(this).attr('cost')*1;
 });
 if($("#race select")[0].selectedIndex>0){
  xp+=racexp[$("#race select")[0].selectedIndex-1][$("#racetype select")[0].selectedIndex];
  var max=17-$("#racetype select")[0].selectedIndex-p;
  if($('.powers:contains(Heroic Spirit)').length>0){
   max+=1;
  }
  if (max>14){max=14}
  $('#level').html(max);
  $("#points").html(p+"+"+$("#racetype select").val());
 } else {
  $("#points").html(p);
  $('#level').html("14");
 }
 $('#minimums').html(racemin[$("#race select")[0].selectedIndex*1]);
 if(p>4){
  $("#points").css("background-color","#f00");
 }else{
  $("#points").css("background-color","inherit");
 }
 $("#xp").html(xp);
 $("#custpowers").html(pow);

 var vals = $("#fighting ul:visible select");
 var weaponlvl=0;
 var armorlvl=0;
 if(vals.length==1)
 {
  weaponlvl=0;
  armorlvl=0;
 }else{
  weaponlvl=vals[0].selectedIndex;
  armorlvl=vals[1].selectedIndex;
 }
 var selectedWeapons = [];
 $('#weapons input:checked').each(function(idx, obj){selectedWeapons.push($(obj).parent().text())});
 var str='';
 var count=0;
 if(weaponlvl>2){
  str+='<label for="box">'+weapons[weaponlvl][1][0]+'<input type="checkbox" name="box" id="box" checked="checked"/></label>';
 }else{
  weapons[weaponlvl][1].forEach(function(obj){
   str+='<label for="box'+count+'">'+obj+'<input type="checkbox" name="box'+count+'" id="box'+count+'" ';
   if(selectedWeapons.includes(obj))
    str += ' checked="checked"';
   str += '/></label>';
   count++;
  });
 }

 $('#weapons').empty().append(str);
 $('#weapons input').checkboxradio({icon: false});
 $('#weapons input').on('change', function(evt) {
  if($('#weapons input:checked').length > $('#weaponcount').text()*1) {
   this.checked = false;
   $('#weapons input').checkboxradio("refresh");
  }
  if ($('#weapons input:checked').length < $('#weaponcount').text()*1) {
   $('#weaponwarning').show();
  }else{
   $('#weaponwarning').hide();
  }
 });
 $('#weaponcount').text(weapons[weaponlvl][0]);
 $('#armor').text(armor[armorlvl]);
 createXPtable(xp,addXP);
}
function createXPtable(lvlXP,addXP){
 var mage=getval('mage');
 var cleric=getval('cleric');
 var thief=getval('thief');
 var fighting=getval('fighting');
 var max=Math.max(mage,cleric,thief,fighting);
 if(mage==max){
  $("#saves").html("as Mage");
  $("#prime").html("INT");
  addXP=150000;
 } else if (cleric==max) {
  $("#saves").html("as Cleric");
  $("#prime").html("WIS");
  addXP=100000;
 } else if (thief==max) {
  $("#saves").html("as Thief");
  $("#prime").html("DEX or CHA");
  addXP=100000;
 } else {
  $("#saves").html("as Fighter");
  $("#prime").html("STR or CON");
  addXP=120000;
 }

 //create XP table
 var lvl=1;
 var titles=[];
 $("#levels tbody input").each(function(){titles.push($(this).val());});
 $("#levels tbody").empty();
 $('#levels thead').empty().append('<tr><td></td><td></td><td></td></tr><tr><td>Lvl</td><td>XP</td><td>Title</td></tr></tr>');
 if(mage>0){
  $('#levels thead tr:first').append('<td colspan="6">Spells</td>');
  $('#levels thead tr:last').append('<td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td>');
 }
 if(cleric>0){
  $('#levels thead tr:first').append('<td colspan="5">Spells</td>');
  $('#levels thead tr:last').append('<td>1</td><td>2</td><td>3</td><td>4</td><td>5</td>');
 }
 while(lvl<=$('#level').text()*1){
  var str;
  if(lvl==1){
   str="<tr><td>1</td><td>0</td><td><input type='textbox' value='"+titles.shift()+"' />";
  }else{
   str="<tr><td>"+lvl+"</td><td>"+lvlXP+"</td><td><input type='textbox' value='"+titles.shift()+"' />";
  }
  if((mage>0)&&(mage<4)){
   var d=Math.round((lvl-1)/[3,2,1.5][mage-1]);
   str+='</td><td>'+magicvals[0][d].join('</td><td>');
  }else if(mage>=4){
   for(var i=0;i<6;i++){str+='</td><td>'+Math.round(magicvals[0][lvl-1][i]*[1,1.3333,1.5,1.6667,2][mage-4]);}
  }
  if(cleric==1){
   str+='</td><td>'+magicvals[1][Math.round((lvl-1)/2)].join('</td><td>');
  }else if((cleric>1)&&(cleric<5)){
   for(var i=0;i<5;i++){str+='</td><td>'+Math.round(magicvals[1][lvl-1][i]*[1,1.3333,1.5][cleric-2]);}
  }
  str+="</td></tr>";
  $('#levels tbody').append(str);
  lvl++;
  if(lvl==7){
   lvlXP=Math.round(lvlXP/2500)*5000;
  }else if((lvl>8)&&($('#race select')[0].selectedIndex!=5)){
   lvlXP+=addXP;
  }else if(lvl>2){
   lvlXP*=2;
  }
 }
}
function countProfs(){
 $('#profcount').text($('#profs input:checkbox:checked').length);
 $('#profof').text(42-$('#level').text()*1);
 if($('#profcount').text()!=$('#profof').text()){
  $("#profcount").css("background-color","#f00");
 }else{
  $("#profcount").css("background-color","inherit");
 }
}
function getval(sel){
 var idx=$('#'+sel+'>select')[0].selectedIndex*1;
 var race=$('#race>select')[0].selectedIndex*1;
 var racelevel=$('#racetype>select')[0].selectedIndex*1;
 if(sel=='fighting'){
  if(race==5){
   if(racelevel==3){
    idx+=1;
   }else if(racelevel==4){
    idx+=2;
   }
   if(idx>4){
    idx=5;
   }
  }
  return idx;
 }else if(sel=='cleric'){
  if(race==4){
   idx+=racelevel;
   if(idx>4){
    idx=5;
   }
  }
 }else if(sel=='mage'){
  if((race==2)||(race==6)){
   idx+=racelevel;
  }else if(race==3){
   if(idx>0){
    idx=9;
   }else{
    if(racelevel>1){idx++;}
    if(racelevel>3){idx++;}
   }
  }
 }
 return idx;
}

function makepower(){
 var vals=$.extend(true, [], powervals);
 var c=0;
 while(vals.length>0){
  var val0=vals.shift();
  var spn="<span class='trade' count='"+val0[0]+"' lvl='"+val0[1]+"' trade='"+c+"' ret='";
  var str="'>"+val0[0]+" lvl "+val0[1]+" for ";
  while(val0[2].length>0){
   var val1=val0[2].shift();
   spn+=val1+" ";
   str+="lvl "+val1+", ";
  }
  spn+=str+"</span>";
  $("#tradelist").append(spn);
  c++;
 }
 $(".power,.trade").draggable({
  helper: "clone",
  start: function(event,ui){
   $("#powerholder").append("<div class='target' lvl='1'></div>");
   addDroppable();
   ui.helper.addClass("helper");
  },
  stop: function(event,ui){
   $("#powerholder>.target").remove();
  }
 });
}
function addDroppable(){
 $(".target").droppable({
  addClasses: false,
  tolerance: "pointer",
  accept: function(obj){
   return $(this).hasClass("target")&&($(obj).attr("lvl")==$(this).attr("lvl"))||($(obj).hasClass("power"));
  },
  activeClass: "activetarget",
  drop: function(event, ui) {
   $(this).droppable("destroy");
   if(ui.draggable.hasClass("power")){
    $(this).removeClass("target").addClass("powers").html('<span class="mycost" cost="'+ui.draggable.attr('cost')+'"></span> '+ui.draggable.text());
    if(ui.draggable.hasClass('addspell')){
     $(this).addClass('waitvalue');
     $('#popspell').dialog("open");
    }else if(ui.draggable.hasClass('addpower')){
     $(this).addClass('waitvalue');
     $('#poppower').dialog("open");
    }else if(ui.draggable.attr('cost')=='arcane'){
     if($('#mage select')[0].selectedIndex<3){
      $(this).children('.mycost').text(1);
      $(this).attr('cost',1);
     }else{
      $(this).children('.mycost').text(2);
      $(this).attr('cost',2);
     }
    }else if(ui.draggable.attr('cost').indexOf(',')>-1){
     var vals=ui.draggable.attr('cost').split(',');
     while(vals.length>0){
      var val=vals.shift();
      $('#popask select').append('<option value="'+val+'">'+val+'</option>');
     }
     $('#popask div p').text("Select value for '"+ui.draggable.text()+"':");
     $(this).addClass('waitvalue');
     $('#popask').dialog('open');
     $(this).children('.mycost').click(function(){
      var vals=$(this).attr('cost').split(',');
      while(vals.length>0){
       var val=vals.shift();
       $('#popask select').append('<option value="'+val+'">'+val+'</option>');
      }
      $('#popask div p').text("Select value for '"+ui.draggable.text()+"':");
      $(this).parent().addClass('waitvalue');
      $('#popask').dialog('open');
     });
    }else{
     $(this).children('.mycost').text(ui.draggable.attr('cost'));
     $(this).attr('cost',ui.draggable.attr('cost'));
    }
   }else{
    $(this).removeClass("target").addClass("powers").attr('cost',ui.draggable.attr('count')).attr('trade',ui.draggable.attr('trade'));
    var rets=ui.draggable.attr("ret").trim().split(" ");
    while (rets.length>0){
     var nxt=rets.shift();
     $(this).html($(this).html()+"<div>@"+nxt+": <div class='target' lvl='"+nxt+"' /></div>");
    }
   }
   addRemove($(this));
   pointsAndPowers();
  }
 });
}

function addRemove(obj){
 obj.append('<span class="remove">X</span>');
 obj.children(".remove").click(function(){
  remove($(this).parent());
  pointsAndPowers();
 });
}

function remove(obj){
 if(obj.parent().attr("id")=="powerholder"){
  obj.remove();
 } else {
  obj.removeClass("powers").addClass("target").text("");
 }
}

function save(){
 var saveme;
 if($('#name').val()!=''){
  saveme='['+$('#name').val()+'|';
 }else{
  saveme='[CustomClass|';
 }
 saveme+=$('#hd>select')[0].selectedIndex.toString()+$('#fighting>select')[0].selectedIndex.toString()+$('#thief>select')[0].selectedIndex.toString()+$('#cleric>select')[0].selectedIndex.toString()+$('#mage>select')[0].selectedIndex.toString()+$('#magic>select')[0].selectedIndex.toString()+$('#race>select')[0].selectedIndex.toString()+$('#racetype>select')[0].selectedIndex.toString();
 if($('#fighting>select')[0].selectedIndex<1){saveme+='00';}
 $('#fighting ul select:visible').each(function(){saveme+=$(this)[0].selectedIndex;});
 if($('#fighting>select')[0].selectedIndex<3){saveme+='0';}
 var sum=0;
 $('#thief input:checkbox').each(function(idx){
  if($(this).is(':checked')){sum+=Math.pow(2,idx);}
 });
 saveme+=('0000'+sum).slice(-4);
 if($('#cleric input:checkbox:checked').length>0){
  saveme+=1;
 }else{
  saveme+=0;
 }
 sum=0;
 count=0;
 $('#profs input:checkbox').each(function(){
  if($(this).is(':checked')){sum+=Math.pow(2,count);}
  count++;
  if(count>5){
   saveme+=codes[sum];
   sum=0;
   count=0;
  }
 });
 saveme+=codes[sum];
 customPowers=[];
 $('#powerholder>div').each(function(){saveme+=iterate(this);});
 while(customPowers.length>0){
  var cpow=customPowers.shift();
  saveme+='|'+cpow[0]+cpow[1]+cpow[2];
 }
 //custom magic: we'll have to save the rest, too, it looks like...
 saveme+=$('#magic select').attr('save');
 //custom race
 saveme+=$('#race select').attr('save');
 saveme+=']';
 return saveme;
}

var customPowers;
function iterate(me){
 var name=$(me).contents().filter(function(){return this.nodeType == 3;});
 if(name.length>0){name=name[0].nodeValue.trim();}else{name='UNKNOWN'};
 var cost=$(me).attr('cost')*1;

 var str='';
 $('.power').each(function(idx){
  if($(this).text()==name){
   var val=idx*16+(cost+1)*2;
   str=codes[Math.floor(val/64)]+codes[val & 63];
   return false;
  }
 });
 if(str!=''){return str;}

 if($(me).children('div').length>0){
  var trade=$(me).attr('trade')*1;
  str='='+codes[trade];
  $(me).children('div').children('div').each(function(){
   str+=iterate(this);
  });
  return str;
 }else if($(me).hasClass('target')){
  return '/A';
 }else{
  var val=(101+customPowers.length*1)*16+(cost+1)*2;
  customPowers.push([codes[customPowers.length],codes[(cost+1)*2],name]);
  return codes[Math.floor(val/64)]+codes[val & 63];
 }
}

function load(str){
 if(str[0]=='['){
  return loadClass(str);
 }else if(str[0]=='{'){
  return loadMagic(str);
 }else if(str[0]=='('){
  return loadRace(str);
 }else{
  return false;
 }
}
function loadMagic(str){
 $('#magic>select').attr('save',str);
 $('#magicname').text(str.substr(1,str.indexOf('|')-1));
 str=str.split('|')[1];
 var basexp=codes.indexOf(str[0])*64+codes.indexOf(str[1]);
 var rank;
 if(basexp<=1000){rank=2;}else if(basexp<=2000){rank=1;}else{rank=0;}
 $('#magic select').attr('kind',codes.indexOf(str[14])).attr('rank',rank).empty().append('<option value="0">0 XP</option>');
 for(var i=0;i<4;i++){
  var xp=Math.round(rankdata[1][rank][i]*basexp);
  $('#magic select').append('<option value="'+xp+'">'+xp+' XP</option>');
 }
 $('#magic').show();
 selections('magic');
 return true;
}
function loadRace(str){
 if(str.indexOf('{')>0){
  var strMagic=str.substr(str.indexOf('{'),str.indexOf('}'));
  str=str.replace(strMagic,'');
  loadMagic(strMagic);
 }
 $('#race>select').attr('save',str).append('<option>'+str.substr(1,str.indexOf('|')-1)+'</option>');
 str=str.split('|')[1].substr(0,10);
 var xps = [];
 while(str.length>0){
  var idx=codes.indexOf(str[0])*64 + codes.indexOf(str[1]);
  xps.push(idx*25);
  str=str.substr(2);
 }
 racexp.push(xps);
 selections('race');
 return true;
}
function loadClass(str){
 $('#powerholder').empty();
 if(str.indexOf('{')>0){
  var strMagic=str.substr(str.indexOf('{'),str.indexOf('}'));
  str=str.replace(strMagic,'');
  loadMagic(strMagic);
 }
 if(str.indexOf('(')>0){
  var strRace=str.substr(str.indexOf('('),str.indexOf(')'));
  str=str.replace(strRace,'');
  loadRace(strRave);
 }
 $('#name').val(str.substr(1,str.indexOf('|')-1));
 str=str.substr(str.indexOf('|')+1);
 var vars=str.substr(0,12).split('').map(Number);
 vars.push(+str.substr(12,4));
 vars.push(+str[16]);
 str=str.substr(17);
 $('#hd>select')[0].selectedIndex=vars[0];
 selections('hd');
 $('#fighting>select')[0].selectedIndex=vars[1];
 selections('fighting');
 $('#thief>select')[0].selectedIndex=vars[2];
 selections('thief');
 $('#cleric>select')[0].selectedIndex=vars[3];
 selections('cleric');
 $('#mage>select')[0].selectedIndex=vars[4];
 selections('mage');
 $('#magic>select')[0].selectedIndex=vars[5];
 selections('magic');
 $('#race>select')[0].selectedIndex=vars[6];
 selections('race');
 $('#racetype>select')[0].selectedIndex=vars[7];
 selections('racetype');
 if(vars[13]==0)
 {
  $('#radCleric').prop("checked", true).change();
 }else{
  $('#radThief').prop("checked", true).change();
 }
 var fighting=$('#fighting ul:visible li select');
 if(vars[1]==1){
  fighting[0].selectedIndex=vars[8];
  fighting[1].selectedIndex=vars[9];
  fighting[2].selectedIndex=vars[10];
 }else if(vars[1]==0){
  fighting[0].selectedIndex=vars[10];
 }else{
  fighting[0].selectedIndex=vars[8];
  fighting[1].selectedIndex=vars[9];
  fighting[2].selectedIndex=vars[10];
  fighting[3].selectedIndex=vars[11];
 }
 $('#thief input:checkbox').each(function(idx){
  $(this).prop("checked", ((vars[12] & Math.pow(2,idx))>0));
 });
 //profs
 var count=0;
 var bins='';
 while(count<18){
  bins+=('000000'+codes.indexOf(str[count]).toString(2)).slice(-6);
  count++;
 }
 str=str.substr(18);
 $('#profs input').each(function(idx){
  $(this).prop('checked',bins[idx]=='1');
 });
 str=str.replace(/]$/, '');
 loadPowers(str);
 calc('zzz');
 return true;
}
function loadPowers(str){
 var pows=str.split('|');
 str=pows.shift();
 customPowers = [];
 makecustomlist(pows);
 var strRetA='';
 while (str.length>1) {
  var catcher = uniterate(str,1);
  str=catcher[1];
  strRetA+=catcher[0];
 }
 $('#powerholder').append(strRetA);
 addRemove($('#powerholder .powers'));
}
function makecustomlist(pows){
 while(pows.length>0){
  var str=pows.shift();
  var cost=(codes.indexOf(str[1])-1)/2;
  customPowers.push([str[0],cost,str.substr(2)]);
 }
}
function uniterate(str,lvl){
 var strRet='';
 var t=str.substr(0,2);
 str=str.substr(2);
 if(t[0]=='='){
  //Tradeoff
  var idx=codes.indexOf(t[1]);
  var cost=powervals[idx][1];
  var strHold="<div class='powers' lvl='"+lvl+"' cost='"+(powervals[idx][2].length-1)+"'><div>@"+powervals[idx][2][0]+": ";
  var c=uniterate(str,powervals[idx][2][0]);
  strHold+=c[0];
  str=c[1];
  strHold+="</div><div>@"+powervals[idx][2][1]+": ";
  c=uniterate(str,powervals[idx][2][1]);
  strHold+=c[0];
  str=c[1];
  if(powervals[idx][2].length>2){
   strHold+="</div><div>@"+powervals[idx][2][2]+": ";
   c=uniterate(str,powervals[idx][2][2]);
   strHold+=c[0];
   str=c[1];
  }
  strHold+="</div></div>";
  return [strHold,str];
 }else if(t[0]=='/'){
  //empty div
  return ['<div class="target" lvl="'+lvl+'"></div>',str];
 }else{
  //Custom Power, DIY Power, or Spell-as-Power
  var idx=codes.indexOf(t[0])*64+codes.indexOf(t[1]);
  var cost=(idx & 15)/2-1;
  idx=Math.floor(idx/16);
  if(idx>100){
   strRet+="<div class='powers' lvl='"+lvl+"' cost='"+cost+"'><span class='cost'>"+cost+"</span> "+customPowers[idx-101][2]+"</div>";
  }else{
   var listitem=$($('.power')[idx]);
   strRet+="<div class='powers' lvl='"+lvl+"' cost='"+cost+"'><span cost='"+listitem.attr('cost')+"'>"+cost+"</span> "+listitem.text()+"</div>";
  }
  return [strRet,str];
 }
}

function displayPdf() {
 var doc = new jsPDF();

 doc.setFont("times");
 doc.setFontType("italic");
 doc.text(20, 20, $('#name').val());
 doc.setFontType("normal");
 doc.text(20, 30, 'Prime Requisite:\t'+$('#prime').html());
 doc.text(20, 40, 'Requirements:\t'+$('#minimums').html());
 doc.text(20, 50, 'Hit Dice:\t'+$('#hdspan').html());
 doc.text(20, 60, 'Maximum Level:\t'+$('#level').html());

//weapons and armor
/*
doc.setFontType("normal");
doc.text(105, 80, 'This is centred text.', null, null, 'center');
doc.text(105, 90, 'And a little bit more underneath it.', null, null, 'center');
doc.text(200, 100, 'This is right aligned text', null, null, 'right');
doc.text(200, 110, 'And some more', null, null, 'right');
doc.text(20, 120, 'Back to left');

doc.text(20, 140, '10 degrees rotated', null, 10);
doc.text(20, 160, '-10 degrees rotated', null, -10);
*/

 $('#popup').dialog('option','title','Download Your Class').html('<p>See below!</p><iframe class="preview-pane" type="application/pdf" width="100%" height="200px" frameborder="0" style="position:relative;z-index:999"></iframe>').dialog("open");
 $('.preview-pane').attr('src', doc.output('bloburi'));
}

function getCookies(){
  var pairs = document.cookie.split(";");
  var cookies = [];
  for (var i=0; i<pairs.length; i++){
    var pair = pairs[i].split("=");
    cookies.push([pair[0],unescape(pair[1])]);
  }
  return cookies;
}

function saveCookie(name, value){
 document.cookie=encodeURIComponent(name)+"="+encodeURIComponent(value)+"; path=/";
}
function eraseCookie(name){saveCookie(name,"",-1);}
