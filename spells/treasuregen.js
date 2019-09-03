//%,n,dy,mult (for cp,sp,ep,gp,pp),gem%,n,dy,type,jewel...,magic functions
var treasurelevels=[[,,,,80,1,6,0.25,,,,,,,,,,,,,18,1,4,0,7,1,4,0],[,,,,80,1,6,0.5,,,,,,,,,,,,,35,1,4,0,15,1,4,0],[,,,,80,1,6,0.5,,,,,,,,,,,,,35,1,4,0,15,1,4,0],[,,,,80,1,6,1,,,,,,,,,,,,,70,1,4,0,30,1,4,0],[,,,,80,1,6,0.5,20,1,4,1,,,,,,,,,40,1,6,0,35,1,4,0],[,,,,80,1,6,1,20,1,4,1,,,,,,,,,80,1,6,0,70,1,4,0],[,,,,25,1,6,1,70,1,6,1,,,,,,,,,80,1,6,1,80,1,6,0],[50,3,6,1,70,2,20,1,70,1,8,1,,,,,,,,,50,1,6,1,50,1,8,0],[50,3,6,2,70,2,20,2,70,1,8,2,,,,,,,,,50,2,6,1,50,2,8,0],[,,,,60,1,8,1,60,2,4,1,80,1,6,1,,,,,80,1,8,1,80,1,8,1],[30,3,6,2,50,3,6,1,60,3,6,1,60,2,6,1,,,,,30,1,4,2,60,1,4,1],[,,,,60,1,8,2,60,2,4,2,80,1,6,2,,,,,80,2,8,1,80,2,8,1],[,,,,,,,,50,1,8,1,80,2,6,1,40,1,4,1,60,1,6,2,80,1,4,1],[,,,,,,,,50,1,6,1,60,1,6,1,80,1,8,1,70,1,4,2,60,1,4,2]];

//roll,x,dy,mult,list of items
var gemList = [[1,1,1,10,["azurite","hematite","malachite","obsidian","quartz"]],[11,1,1,25,["agate","lapis lazuli","tiger eye","turquoise"]],[26,1,1,50,["bloodstone","crystal","citrine","jasper","moonstone","onyx"]],[41,1,1,75,["carnelian","chalcedony","sardonyx","zircon"]],[56,1,1,100,["amber","amethyst","coral","jade","jet","tourmaline"]],[71,1,1,250,["garnet","pearl","spinel"]],[81,1,1,500,["aquamarine","alexandrite","topaz"]],[91,1,1,750,["opal","star ruby","star sapphire","sunset amethyst","imperial topaz"]],[96,1,1,1000,["black sapphire","diamond","emerald","jacinth","ruby"]],[101,1,1,1500,["amber with preserved extinct creatures","whorled nephrite jade"]],[111,1,1,2000,["black pearl","baroque pearl","crystal geode"]],[126,1,1,4000,["facet cut imperial topaz","flawless diamond"]],[146,1,1,6000,["facet cut star sapphire","facet cut star ruby"]],[166,1,1,8000,["flawless facet cut diamond","flawless facet cut emerald","flawless facet cut jacinth","flawless facet cut ruby"]],[176,1,1,10000,["flawless facet cut black sapphire","flawless facet cut blue diamond"]]];
var jewelryList = [[1,2,20,1,["bone","scrimshaw","beast parts"]],[11,2,10,10,["glass","shells","wrought copper","wrought brass","wrought bronze"]],[26,2,4,100,["fine wood","fine porcelain","wrought silver"]],[41,2,6,100,["alabaster","chryselephantine","ivory","wrought gold"]],[71,3,6,100,["carved jade","wrought platinum"]],[81,1,4,1000,["wrought orichalcum","wrought silver studded with turquoise","wrought silver studded with moonstone","wrought silver studded with opal"]],[96,2,4,1000,["silver studded with jet","silver studded with amber","silver studded with pearl"]],[101,3,4,1000,["gold studded with topaz","gold studded with jacinth","gold studded with ruby"]],[126,2,8,1000,["platinum studded with diamond","platinum studded with sapphire","platinum studded with emerald"]],[146,3,6,1000,["electrum pendant with pearls and star rubies","silver pendant with pearls and star rubies"]],[156,2,20,1000,["gold with diamonds and sapphires","platinum with diamonds and sapphires"]],[166,1,4,10000,["gold encrusted with flawless facet cut diamonds"]],[176,1,8,10000,["platinum encrusted with flawless black sapphires","Platinum encrusted with flawless blue diamonds"]]];

function getTreasure(money,magic,level,saves) {
 var t = treasurelevels[level-1];
 if(money){
  var strmoney='';
  var types=['<span class="icon cp" title="Copper Pieces"><span>cp</span></span>','<span class="icon sp" title="Silver Pieces"><span>sp</span></span>','<span class="icon ep" title="Electrum Pieces"><span>ep</span></span>','<span class="icon gp" title="Gold Pieces"><span>gp</span></span>','<span class="icon pp" title="Platinum Pieces"><span>pp</span></span>'];
  for(var i=0;i<5;i++){
   if(t[i*4]>=rand(1,100)) {
    strmoney += ", "+addCommas(d(t[i*4+1],t[i*4+2])*t[i*4+3]*1000) + types[i];
   }
  }
  if(t[20]>=rand(1,100))
   strmoney+=', <span class="icon gem" title="Gems">'+pickGem(t[21],t[22],t[23],gemList)+'</span>';
  if(t[24]>=rand(1,100))
   strmoney+=', <span class="icon jewelry" title="Jewelry">'+pickGem(t[25],t[26],t[27],jewelryList)+'</span>';
  strmoney = strmoney.substring(2);
 }
 var strmagic="";
 if(magic) {
  var p=level*5;
  if(rand(1,100)<=p)
   strmagic+=", <span class='icon potion' title='Potion'>"+pickRandom(potions)+'</span>';
  if(rand(1,100)<=0)
   strmagic+=", <span class='icon ring' title='Ring'>"+pickRandom(rings)+'</span>';
  if(rand(1,100)<=p) {
   var str=pickRandom(scrolls);
   if(str.startsWith('Treasure Map'))
    strmagic+=", <span class='icon tmap' title='Treasure Map'>";
   else
    strmagic+=", <span class='icon scroll' title='Scroll'>";
   strmagic+=str+'</span>';
  }
  if(rand(1,100)<=p)
   strmagic+=", <span class='icon wand' title='Wand/Staff/Rod'>"+pickRandom(wands)+'</span>';
  if(rand(1,100)<=p)
   strmagic+=", <span class='icon mmisc' title='Misc. Magic Item'>"+pickRandom(misc)+'</span>';
  if(rand(1,100)<=p)
   strmagic+=", <span class='icon msword' title='Magic Sword'>"+pickRandom(swords)+'</span>';
  if(rand(1,100)<=p)
   strmagic+=", <span class='icon mweapon' title='Magic Weapon'>"+pickRandom(weapons)+'</span>';
  if(rand(1,100)<=p)
   strmagic+=", <span class='icon marmor' title='Magic Armor'>"+pickRandom(armor)+'</span>';
  strmagic=strmagic.replace(/^(,\s)*/, "");
 }

 return strmoney+', '+strmagic;
}

function pickGem(a,b,c,list) {
 var num=(c<1?d(2,20):(c<2?d(1,100):d(1,100)+80));
 var count=d(a,b);var idx=getGemType(d(1,100),list);
 return count+" "+list[idx][4][rand(1,list[idx][4].length-1)]+' worth '+addCommas(count*list[idx][3])+'gp';
}

function getGemType(rolled,list){
for(var i=list.length-1;i--;)
 if(list[i][0]<=rolled)
  return i;
}
function d(a,b){
 var c=0;
 for(var i=0;i<a;i++)
  c+=rand(1,b);
 return c;
}
function addCommas(n){
 return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function pickRandom(list,max){
 if(!max)
  max=100;
 if(list[0].constructor === Array) {
  var r=d(1,max);
  for(var i=list.length-1;i>=0;i--)
   if(r>=list[i][0])
    if(list[i][1] && {}.toString.call(list[i][1]) === '[object Function]')
     return list[i][1]();
    else
     return list[i][1];
 } else {
  return list[rand(0,list.length-1)];
 }
}
