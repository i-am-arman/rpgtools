(function (acks, $) {
 acks.makePDF = function() {
  var options = {
   orientation: 'p',
   unit: 'in',
   format: 'letter',
   lineHeight: 1,
   title: "Generated NPCs"
  };
  var doc = new jsPDF(options);
  var margin = 0.5;
  var width = 7.5;
  var height = 10;
  var sizeAll = 11;
  var sizeCount = 16;
  var sizeName = 14;
  var font = ["Arial","Helvetica"];

  if (!Array.isArray) {
   Array.isArray = function(arg) {
     return Object.prototype.toString.call(arg) === '[object Array]';
   };
  }

  var write = function(x,y,size,str) {
   doc.setFontSize(size);
   doc.text(x,y+size/72,str);
   if(Array.isArray(str))
    return str.length*size/72;
   else
    return size/72;
  };
  var writeBox = function(y,name,other,str,spellarray) {
   if(!Array.isArray(str))
    str=[str];
   var start=y;
   if(y+(name?sizeCount/72:(other?sizeAll/72:0))+str.length*sizeAll/72>height+margin) {
    doc.line(margin,margin+sizeCount*1.5/72,margin,height);
    doc.addPage(options);
    doc.setLineWidth(1/72);
    doc.line(margin,margin,margin,margin+sizeCount*1.5/72);
    start=margin;
    y=margin;
   }
   var y1=0;
   var x1=margin+0.25;
   if(name) {
    y1=write(margin+0.25,y,sizeName,name);
    x1+=doc.getStringUnitWidth(name)*sizeName/72;
    y+=(sizeName-sizeAll)/72;
   }
   y+=y1+write(x1,y,sizeAll,other);
   y+=write(margin+0.25,y,sizeAll,str);
   doc.rect(margin+0.2,start,width-0.4-margin,y-start+sizeAll*0.5/72);
   return y+sizeAll*1.5/72;
  };
  var make = function() {
   doc = new jsPDF(options);
   doc.setFont(font[0],font[1]);
   doc.setLineWidth(1/72);
   //doc.addImage(imgData, 'JPEG', 15, 40, 180, 180);

   var y=margin;
   y+=write(margin,y,sizeCount,$('#results>p:first-child').text());

   doc.line(margin,y+sizeCount*0.5/72,width,y+sizeCount*0.5/72);
   y+=sizeCount/72;

   $('#results>div').each(function(){
    var name = $(this).children('.pname').text();
    var other='';
    if(name && name.split('(').length>0) {
     other='('+name.split('(')[1];
     name=name.split('(')[0];
    }
    var str="";
    $(this).children('p:not(.pname)').each(function(){
     str+="\n\n"+$(this).text();
    });
    str=str.substring(2);

    $(this).children('.spellholder').children('div:not(.spellmin)').each(function(){
     str+="\n\n"+$(this).children('h3').text()+":";
     var spells=[];
     $(this).children('table').children().each(function(){
      var row=[];
      $(this).children().each(function(){
       row.push($(this).text().trim());
      });
      spells.push(row);
     });
     if(spells.length>0) {
      spells=spells[0].map((col, i) => spells.map(row => row[i]));
      spells.forEach(function(x){
       str+="\n    "+x.join("; ");
      });
     }
    });
    str=str.replace(/; (; )+/g, "");
    y=writeBox(y,name,other,doc.splitTextToSize(str,(width-0.45)*0.9));
   });
   doc.line(margin,margin+sizeCount*1.5/72,margin,y);
   return doc;
  }
  var embed = function(doc) {
   return make().output('datauristring');
  }
  var iframe = function(doc) {
   return make().output('dataurlnewwindow');
  }
  var newwindow = function(doc) {
   var string = make().output('datauristring');
   var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
   var x = window.open();
   x.document.open();
   x.document.write(iframe);
   x.document.close();
  }

  return {
   Embed: embed,
   NewWindow: newwindow
  }
 }();
}(window.acks = window.acks || {}, jQuery));
