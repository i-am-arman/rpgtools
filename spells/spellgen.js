//divine,arcane,advanced
var spellLevels=[[[0,0,0,0,0,0],[1,0,0,0,0,0],[2,0,0,0,0,0],[2,1,0,0,0,0],[2,2,0,0,0,0],[2,2,1,1,0,0],[2,2,2,1,1,0],[3,3,2,2,1,0],[3,3,3,2,2,0],[4,4,3,3,2,0],[4,4,4,3,3,0],[5,5,4,4,3,0],[5,5,5,4,3,0],[6,5,5,5,4,0]],[[1,0,0,0,0,0],[2,0,0,0,0,0],[2,1,0,0,0,0],[2,2,0,0,0,0],[2,2,1,0,0,0],[2,2,2,0,0,0],[3,2,2,1,0,0],[3,3,2,2,0,0],[3,3,3,2,1,0],[3,3,3,3,2,0],[4,3,3,3,2,1],[4,4,3,3,3,2],[4,4,4,3,3,2],[4,4,4,4,3,3]],[[2,0,0,0,0,0],[3,0,0,0,0,0],[3,1,0,0,0,0],[3,2,0,0,0,0],[3,2,1,0,0,0],[3,3,2,0,0,0],[4,3,2,1,0,0],[4,3,3,2,0,0],[4,4,3,2,1,0],[4,4,3,3,2,0],[5,4,4,3,2,1],[5,4,4,3,3,2],[5,5,4,4,3,2],[6,5,4,4,3,3]]];

function makeSpellList(intbonus,level,magicstyle) {
 var splvl=magicstyle[2];
 var spellmult=1;
 if(splvl>1) {
  spellmult=splvl;
  splvl=1;
 }
 splvl = Math.floor(splvl*(level-1));
 var temp = spellLevels[magicstyle[1]][splvl];
 var spells = temp.map((col,i) => [temp].map(row => Math.round(row[i]*spellmult)));
 var spellList=[divineList,arcaneList,libraryList][magicstyle[0]];
 
 if(magicstyle[1]<1)
  return spells;
 for(var j=0;j<6;j++) {
  var lvl=temp[j];
  if(lvl>0)
   for(var i=0;i<lvl+intbonus;i++) {
    var s=pickRandom(spellList[j]);
    while(spells[j].indexOf(s)>-1)
     s=pickRandom(spellList[j])
    spells[j].push(s);
   }
 }
 return spells;
}

function formatSpells(list) {
 var table=$('<table></table>');
 var spells=list[0].map((col, i) => list.map(row => row[i]));
 var lvl=$('<tr></tr>');
 for(var i=0;i<spells[0].length;i++)
  lvl.append('<th>Lvl '+(i+1)+' ('+spells[0][i]+')</th>');
 table.append(lvl);
 for(var j=1;j<spells.length;j++) {
  lvl=$('<tr></tr>');
  for(var i=0;i<spells[j].length;i++)
   if(spells[j][i])
    lvl.append('<td>'+spells[j][i]+'</td>');
   else
    lvl.append('<td></td>');
  table.append(lvl);
 }
 return table;
}
