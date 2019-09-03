$(function(){
 if(typeof window.rand==='undefined')
  window.rand = function(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
  };
 if(typeof window.d==='undefined')
  window.d = function (a,b){
   var c=0;
   for(var i=0;i<a;i++)
    c+=rand(1,b);
   return c;
  }
 if(typeof window.dx==='undefined')
  window.dx = function(a,b){
   var c=0;
   for(var i=0;i<a;i++){
    var x=rand(1,b);
    while(x==b) {
     c+=x;
     x=rand(1,b);
    }
    c+=x;
   }
   return c;
  }
 if(typeof window.ands=='undefined')
  window.ands = function(arr){
   var lst=arr.slice(0);
   var last=lst.pop();
   return (lst.length>0?lst.join(', ')+(lst.length>1?',':'')+' and ':'')+last;
  };
 if(typeof window.popup=='undefined')
  window.popup=function(title,text,showCancel,okCallback,cancelCallback) {
   var mypopup=$('<div class="popup"><div></div></div>');
   $('body').append(mypopup);
   mypopup.children('div').html(text);
   var buttons=[{
    text:"Ok",
    click: function() {
     $(this).dialog("close");
     $(this).remove();
     if(okCallback)
      okCallback();
    }
   }];
   if(showCancel)
    buttons.push({
     text:'Cancel',
     click: function() {
      $(this).dialog("close");
      $(this).remove();
      if(cancelCallback)
       cancelCallback();
     }
    });

   mypopup.dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    title: title,
    buttons: buttons
   });
  }
 if(typeof window.addCommas=='undefined')
  window.addCommas = function(input){
   return (input.toString()).replace(
    /^([-+]?)(0?)(\d+)(.?)(\d+)$/g, function(match, sign, zeros, before, decimal, after) {
     var reverseString=function(string) { return string.split('').reverse().join(''); };
     var insertCommas=function(string) { 
      var reversed=reverseString(string);
      var reversedWithCommas=reversed.match(/.{1,3}/g).join(',');
      return reverseString(reversedWithCommas);
     };
     return sign + (decimal ? insertCommas(before) + decimal + after : insertCommas(before + after));
    }
   );
  };
});
