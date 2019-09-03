var magicvals=[[[1,0,0,0,0,0],[2,0,0,0,0,0],[2,1,0,0,0,0],[2,2,0,0,0,0],[2,2,1,0,0,0],[2,2,2,0,0,0],[3,2,2,1,0,0],[3,3,2,2,0,0],[3,3,3,2,1,0],[3,3,3,3,2,0],[4,3,3,3,2,1],[4,4,3,3,3,2],[4,4,4,3,3,2],[4,4,4,4,3,3]],[[0,0,0,0,0],[1,0,0,0,0],[2,0,0,0,0],[2,1,0,0,0],[2,2,0,0,0],[2,2,1,1,0],[2,2,2,1,1],[3,3,2,2,1],[3,3,3,2,2],[4,4,3,3,2],[5,5,4,4,3],[4,4,4,3,3],[5,5,5,4,3],[6,5,5,5,4]],[[2,0,0,0,0,0],[3,0,0,0,0,0],[3,1,0,0,0,0],[3,2,0,0,0,0],[3,2,1,0,0,0],[3,3,2,0,0,0],[4,3,2,1,0,0],[4,3,3,2,0,0],[4,4,3,2,1,0],[4,4,3,3,2,0],[5,4,4,3,2,1],[5,4,4,3,3,2],[5,5,4,4,3,2],[6,5,4,4,3,3]],[[2,0,0,0,0,0],[3,0,0,0,0,0],[3,1,0,0,0,0],[3,2,0,0,0,0],[3,2,1,0,0,0],[3,3,2,0,0,0],[4,3,2,1,0,0],[4,3,3,2,0,0],[4,4,3,2,1,0],[4,4,3,3,2,0],[5,4,4,3,2,1],[5,4,4,3,3,2],[5,5,4,4,3,2],[6,5,4,4,3,3]]];
var rankdata=[[['None','1/3rd','1/2','2/3rd','Full'],['None','2/5','3/4','Full','Spells x 133%'],['None','1/2','Full','Spells x 133%','Spells x 150%']],[[0,.25,.5,.75,1],[0,.4,.75,1,2],[0,.5,1,2,4]]];
var codes='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var sf=1.2;
function start(){
 $('#saveit').button().click(function(){
  $('#popup').dialog('option','width','30em').dialog('option','title','Copy to Save').html('<p>Click the button below to copy the text to the clipboard; alternatively, copy the code below manually. Make sure to get everything between (and including) the curly brackets:</p><p><button id="btncopy">Copy to Clipboard</button><button id="btnsavecookie">Save to Cookie</button></p><textarea id="txtcopy">'+save()+'</textarea>').dialog("open");
  $('#popup button').button().click(function(){
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
   if(obj[1][0]=='{'){
    val='Magic';
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
  //here's where I would display the class... that's going to take some work. Sigh.
  $('#popup').dialog('option','title','Download Your Class').html('<p>Future: a pdf of your character class!</p>').dialog("open");
 });
 $('#acquisition').change(function(){
  var val=$(this)[0].selectedIndex*1;
  $('#abilities tr:nth-child(2) td:last').text(['Yes','Yes','No'][val]);
  $('#abilities tr:nth-child(3) td:last').text(['Yes','Yes','No'][val]);
 });
 $('#behavior').change(function(){
  if($(this).prop('checked')==true){
   $('#abilities tbody tr:first td:last').text('Yes');
  }else{
   $('#abilities tbody tr:first td:last').text('No');
  }
 });
 $('#creation select').change(function(){
  var val=$(this)[0].selectedIndex*1;
  $('#brew').text([5,3,7][val]);
  $('#scribe').text([5,7,3][val]);
 });
 $('#progression,#magics input').on("change keyup paste", function(){calc()});
 $('#progression').change(function(){
  $('#spells tbody').empty();
  $('#spells thead').empty().append('<tr><td>lvl</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>');
  var val=$(this)[0].selectedIndex*1;
  if(val!=1){
   $('#spells thead tr').append('<td>6</td>');
  }
  for(var i=0;i<14;i++){
   $('#spells tbody').append('<tr><td>'+(i+1)+'</td><td>'+magicvals[val][i].join('</td><td>')+'</td></tr>');
  }
  $('#abilities tr:nth-child(6) td:last').text(['7,8,9','6,7','7,8,9'][val]);
 });
 $("#popup").dialog({modal: true,buttons:[{text:"Ok",click:function(){$(this).dialog('close');}}]});
 $('#popload').dialog({modal:true,autoOpen:false,buttons:[{text:"Ok",click: function(){if(load($('#popload input').val())){$(this).dialog('close');}}},{text: "Cancel",click: function(){$(this).dialog("close");}}]});
}
function calc(){
 var sum=0;
 var total=0;
 var zeros=0;
 var fracs=0;
 $('#errors').empty().hide();
 $('.error').removeClass('error');
 $('#magics tbody tr td input').each(function(){
  if($(this).val()*1==0){zeros++;}
 });
 $('#magics tbody tr').each(function(){
  var val=$(this).find('input').val()*1;
  var def=$(this).children('td:nth-child(2)').text()*1;
  total+=val;
  if(val>0){
   if(val<1){fracs++;}
   if((val<1)&&(zeros<1)){
    $(this).find('input').parent().addClass('error');
    $('#errors').append('<p>Values must be no less than 1, unless a value is 0.</p>').show();
   }
   if((val>def)&&(zeros>0)){
    $(this).find('input').parent().addClass('error');
    $('#errors').append('<p>For specialized classes, no value can be larger than the default value.</p>').show();
   }
   if(val>2.25){
    $('#errors').append('<p>No values over 2.5 allowed.</p>').show();
    $(this).find('input').parent().addClass('error');
   }
   var x=Math.round(($(this).children('td:nth-child(2)').text()-val)*$(this).children('td:nth-child(4)').text());
   sum+=x;
   $(this).children('td:last').text(x);
  }else{
   $(this).children('td:last').empty();
  }
 });
 if(total<11-1.125*zeros){
  $(this).children('td:nth-child(3)').addClass('error');
  $('#errors').append('<p>Total value must be greater than '+(11-1.125*zeros)+'</p>').show();
 }else if(total>15){
  $(this).children('td:nth-child(3)').addClass('error');
  $('#errors').append('<p>Total value must be less than 15</p>').show();
 }
 if((zeros>0)&&(fracs*2>zeros)){
  $('#errors').append('<p>There must be two zero values for each value less than one.</p>').show();
 }
 $('#errors p').prepend('<span class="ui-icon ui-icon-alert"></span>');
 sum+=500-zeros*45;
 if($('#progression')[0].selectedIndex==2){sum*=1.135;}
 if(sum<500){sum=500;}
 sum=Math.round(sum/25)*25;
 $('#magics tfoot tr td:nth-child(3)').text(total);
 $('#magics tfoot tr td:nth-child(4)').text('+'+(500-zeros*45));
 $('#magics tfoot tr td:last').text(sum);
 $('#basexp').text(sum);

 var tran=$('#magics tbody tr:nth-child(10) input').val()*1;
 var ench=$('#magics tbody tr:nth-child(4) input').val()*1;
 var blst=$('#magics tbody tr:nth-child(1) input').val()*1;
 var deth=$('#magics tbody tr:nth-child(2) input').val()*1;
 var heal=$('#magics tbody tr:nth-child(5) input').val()*1;
 if((tran>0)&&(tran<=1.25)){
  $('#abilities tr:nth-child(4) td:last').text('Yes');
  if(tran<=1){
   $('#abilities tr:nth-child(8) td:last').text('Yes');
  }else{
   $('#abilities tr:nth-child(8) td:last').text('No');
  }
 }else{
  $('#abilities tr:nth-child(4) td:last').text('No');
  $('#abilities tr:nth-child(8) td:last').text('No');
 }
 if((ench>0)&&(ench<=1.25)){
  $('#abilities tr:nth-child(5) td:last').text('Yes');
 }else{
  $('#abilities tr:nth-child(5) td:last').text('No');
 }
 if((blst>0)&&(blst<=1.5)){
  $('#abilities tr:nth-child(7) td:last').text('Yes');
 }else{
  $('#abilities tr:nth-child(7) td:last').text('Dwarf');
 }
 if((deth>0)&&(deth<=1.5)){
  $('#abilities tr:nth-child(9) td:last').text('Yes');
 }else{
  $('#abilities tr:nth-child(9) td:last').text('No');
 }
 if(blst==0){if(heal==0){sf=1.2;}else{sf=0;}}else if(heal==0){sf=5;}else{sf=blst/heal;}

 if(($('#acquisition')[0].selectedIndex==1)||(total>13.5)||((total>12.5)&&($('#acquisition')[0].selectedIndex==2))){
  $('#stats tbody tr:nth-child(1) td:last').text('2 every 4');
 }else{
  $('#stats tbody tr:nth-child(1) td:last').text('2 every 6');
 }
 var sfsec;
 if(sf<=1.1){sfsec=0;}else if(sf>=1.5){sfsec=2;}else{sfsec=1;}
 $('#stats tbody tr:nth-child(2) td:last').text([['INT and WIS','INT or WIS','WIS'],['INT','INT or WIS','INT and WIS'],['INT and CHA','CHA','CHA and WIS']][$('#acquisition')[0].selectedIndex][sfsec]);
 if(sf>14){
  $('#stats tbody tr:nth-child(3) td:last').text('100k');
 }else if(sf<=13){
  $('#stats tbody tr:nth-child(3) td:last').text('150k');
 }else{
  $('#stats tbody tr:nth-child(3) td:last').text('120k');
 }
 if((sf<=1.1)&&(total<=12.5)){
  $('#stats tbody tr:nth-child(4) td:last').text('Mage');
 }else if((sf>1.1)&&(sf<=1.5)){
  $('#stats tbody tr:nth-child(4) td:last').text('Mage & Cleric');
 }else if((sf>1.5)&&(total>13.5)){
  $('#stats tbody tr:nth-child(4) td:last').text('Cleric');
 }else{
  $('#stats tbody tr:nth-child(4) td:last').text('Mage OR Cleric');
 }
 $('#stats tbody tr:nth-child(5) td:last').text(Math.round(5000/sum));
 var rank;
 if($('#basexp').text()*1<1000){rank=2;}else if($('#basexp').text()*1<2000){rank=1;}else{rank=0;}
 $('#ranks tbody tr').each(function(idx){
  $(this).children('td:nth-child(2)').text(rankdata[0][rank][idx]);
  $(this).children('td:last').text(rankdata[1][rank][idx]*sum);
 });
}

function setAbility(idx,val){
 $('#abilities tr:nth-child('+idx+') td:last').text(val);
}

function save(){
 var base=$('#basexp').text()*1;
 var saveme;
 if($('#name').val!=''){
  saveme='{'+$('#name').val()+'|';
 }else{
  saveme='{CustomMagic|';
 }
 saveme+=codes[Math.floor(base/64)]+codes[base&63]
 $('#magics tbody tr input').each(function(){
  if($(this).val()*1>0){
   saveme+=codes[Math.round(($(this).val()*1-.7)/.05)];
  }else{
   saveme+='A';
  }
 });
 saveme+=$('#acquisition')[0].selectedIndex;
 saveme+=$('#progression')[0].selectedIndex;
 if($('#behavior:checked').length>0){saveme+=1;}else{saveme+=0;}
 saveme+=$('#creation select')[0].selectedIndex;
 saveme+='}';
 return saveme;
}
function load(str){
 $('#name').val(str.substr(1,str.indexOf('|')-1));
 str=str.split('|')[1].substr(2);
 $('#magics tbody tr input').each(function(idx){
  if(str[idx]=='A'){
   $(this).val('0');
  }else{
   $(this).val(codes.indexOf(str[idx])*.05+.7);
  }
 });
 $('#acquisition')[0].selectedIndex=str[11]*1;
 $('#progression')[0].selectedIndex=str[12]*1;
 $('#behavior').prop('checked', str[13]='1').change();
 $('#creation select')[0].selectedIndex=str[14]*1;
 calc();
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

function saveCookie(name, value){document.cookie=encodeURIComponent(name)+"="+encodeURIComponent(value)+"; path=/";}
function eraseCookie(name){saveCookie(name,"",-1);}
