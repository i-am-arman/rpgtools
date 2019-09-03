//TODO: convert to correct shape
//TODO: turn into a loadable, self-contained form
function start(){
 //Delete selected
 $('#delete').button().click(function(){
  $('#popup').dialog('option','width','30em').dialog('option','title','Delete?').html('<p>Are you sure you want to delete this save cookie? This cannot be undone.</p><p><button id="btnYes">Burn the Cookie</button><button id="btnNo">Nooo!</button></p>').dialog("open");
  $('#btnYes').button().click(function(){
   //Delete the cookie
  });
  $('#btnNo').button().click(function(){
   $('#popup').dialog('close');
  });
 });
 //Eventually: load cookie on the correct page.
 //$('#loadit').button().click(function(){$('#popload').dialog("open");});
 $("#popup").dialog({modal: true,buttons:[{text:"Ok",click:function(){$(this).dialog('close');}}]});
 $('#popload').dialog({modal:true,autoOpen:false,buttons:[{text:"Ok",click: function(){if(load($('#popload input').val())){$(this).dialog('close');}}},{text: "Cancel",click: function(){$(this).dialog("close");}}]});
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
 refresh();
}

function refresh(){
 getCookies().forEach(function(obj){
  $('#cookies').append("<li><input type='checkbox' /> "+obj[0]+'</li>');
 });
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


//when saving, save the cookie by appending it and the current date/time to the list
function saveCookie(name, value){document.cookie=encodeURIComponent(name)+"="+encodeURIComponent(value)+"; path=/";}



function readCookie(name){
 var nameEQ = encodeURIComponent(name) + "=";
 var ca = document.cookie.split(';');
 for (var i = 0; i < ca.length; i++) {
  var c = ca[i];
  while (c.charAt(0) === ' ') c = c.substr(1, c.length);
  if(c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substr(nameEQ.length, c.length));
 }
 return null;
}

function eraseCookie(name){saveCookie(name,"",-1);}
