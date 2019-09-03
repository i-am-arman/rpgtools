//TODO: save after any changes?
(function (acks, $) {
 acks.Domain = function () {
  var domain={};
  var cities=[];
  var version="0.8"
  var territories=['Civilized','Borderlands','Wilderness'];
  var init = function() {
   $('.ui-state-error').hide();
   $('#sectionSave').hide();
   $('#btnNew').button({icon:"ui-icon-document"}).click(function(){
    $('#sectionLoad').hide();
    $('#sectionNew').show();
   });
   $('#btnQuick').button({icon:"ui-icon-seek-next"}).click(function(){
    $('#sectionLoad').hide();
    $('#sectionQuick').show();
   });
   $('.fileButton').button({icon:"ui-icon-folder-open"});
   $('#fileLoad').button().change(function(e){
    var file = e.target.files[0];
    if (!file) {
     return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
     loadDomain(e.target.result);
    };
    reader.readAsText(file);
   });
   $('#btnSave').button({icon:"ui-icon-arrowthickstop-1-s"}).click(function(){
    var data = JSONC.pack(domain,true);
    var filename = domain.name.replace(/ /g,"_")+'.sav';
    var blob = new Blob([data], {type: 'text/plain'});
    if(window.navigator.msSaveOrOpenBlob) {
     window.navigator.msSaveBlob(blob, filename);
    } else {
     var elem = window.document.createElement('a');
     elem.href = window.URL.createObjectURL(blob);
     elem.download = filename;
     document.body.appendChild(elem);
     elem.click();
     document.body.removeChild(elem);
    }
   });
   $('input[type=number]').on('input propertychange paste',function(){
    if($(this).prop('min')>0 && $(this).val()<$(this).prop('min'))
     $(this).val($(this).prop('min'));
    if($(this).prop('max')>0 && $(this).val()>$(this).prop('max'))
     $(this).val($(this).prop('max'));
   });
   initNew();
   initQuick();
   initDomain();
   initFound();
   getDomainList();

  };
  var initQuick = function(){
   $('#txtQuickLawful,#txtQuickNeutral,#txtQuickChaotic').on('input propertychange paste',function(){
    $('#spQuickPercent').text($('#txtQuickLawful').val()*1+$('#txtQuickNeutral').val()*1+$('#txtQuickChaotic').val()*1);
   });
   $('#btnQuickCancel').button().click(function(){
    $('#sectionQuick').hide();
    $('#sectionLoad').show();
   });
   $('#btnQuickValue').button().click(function(){
    if($('#spQuickValue input').length<16)
     $('#spQuickValue').append("<input type='number' min='3' max='9' />");
   });
   $('#btnQuickRemHex').button().click(function(){
    if($('#spQuickValue input').length>1)
     $('#spQuickValue :last-child').remove();
   });
   $('#btnQuickCity').button().click(function(){
    $('#spQuickCity').append('<div><p><button class="btnRem">Remove City</button></p><p><label>City Name <input type="textbox" class="txtName" /></label></p><p><label>Population <input type="textbox" class="txtPop" /></label></p><p><label>Investment <input type="textbox" class="txtInvest" /></label></p><p><label>Morale <input type="textbox" class="txtMorale" /></label></p><p><label>Garrison (total gp) <input type="textbox" class="txtGarrison" /></label></p><p><label>Garrison away (total gp) <input type="textbox" class="txtAway" /></label></p></div>');
    $('.btnRem').button().click(function(){
     $(this).parent().parent().remove();
    });
   });
   $('#btnQuickOk').button().click(function(){
    var name = $('#txtQuickName').val();
    var playerClass = $('#selQuickClass :selected').text();
    var align = $('#selQuickAlign').prop('selectedIndex')*1;
    var liege = $('#chkQuickLiege').prop('checked');
    var beast = $('#chkQuickBeast').prop('checked');
    var cash = $('#txtQuickCash').val()*1;
    var cost = $('#txtQuickCost').val()*1;
    var loc = $('#selQuickLoc').prop('selectedIndex');
    var landVal = [];
    $('#spQuickValue input').each(function(){
     landVal.push($(this).val()*1);
    });
    var percentAlign = [$('#txtQuickLawful').val()*1,$('#txtQuickNeutral').val()*1,$('#txtQuickChaotic').val()*1];
    var pop = $('#txtQuickPop').val()*1;
    var garrison = $('#txtQuickGarrison').val()*1;
    var away = $('#txtQuickAway').val()*1;
    var date = {year:$('#txtQuickDate').val().split('/')[0]*1,month:$('#txtQuickDate').val().split('/')[1]*1};
    var season = {year:$('#txtQuickSeason').val().split('/')[0]*1,month:$('#txtQuickSeason').val().split('/')[1]*1};
    var morale = $('#txtQuickMorale').val()*1;

    domain = {
     version: version,
     name: name,
     playerClass: playerClass,
     playerAlign: align,
     cash: cash,
     territory: loc,
     liege: liege,
     seasonDate: date,
     nextSeason: season,
     align: align,
     alignPercent: percentAlign,
     landValue: landVal,
     population: pop,
     popType: (beast?'Beastman':'Human'),
     strongholdCost: cost,
     strongholdInvest: [],
     morale: morale,
     garrison: {
      simple: true,
      cost: garrison,
      awayCost: away,
      units: []
     },
     seasonalEvents: {
      garrison: 0,
      festivals: 0,
      popLast: 0,
      taxes: 0,
      tithesPaid: true,
      newReligion: false
     },
     atWar: false,
     cities: []
    };
    $('#spQuickCity>div').each(function(obj){
     var inputs = $(this);
     var name = inputs.find('.txtName').val();
     var pop = inputs.find('.txtPop').val()*1;
     var invest = inputs.find('.txtInvest').val()*1;
     var morale = inputs.find('.txtMorale').val()*1;
     var garrison = inputs.find('.txtGarrison').val()*1;
     var away = inputs.find('.txtAway').val()*1;

     var city = {
      name: name,
      align: domain.align,
      alignPercent: domain.alignPercent,
      population: pop,
      investment: invest,
      morale: morale,
      garrison: {
       simple: true,
       cost: garrison,
       awayCost: away,
       units: []
      },
      seasonalEvents: {
       garrison: 0,
       festivals: 0,
       popLast: 0,
       taxes: 0,
       tithesPaid: true
      }
     };
     domain.cities.push(city);
    });
    saveDomain(domain);
    $('#sectionQuick').hide();
    displayDomain();
   });
  }
  var initNew = function(){
   $('#txtName').on('input propertychange paste',function(){
    $('#errName').hide();
   });
   $('#selClass,#selQuickClass').append("<option>-- Pick One --</option>");
   classlist.forEach(function(el){$('#selClass,#selQuickClass').append("<option>"+el[0]+"</option>");});
   $('#selClass').change(function(){
    var clss=getStronghold($('#selClass :selected').text());
    if(clss) {
     $('#pClass').show().text("Builds a "+(clss.build?clss.stronghold:"stronghold")+". "+(clss.build?"Gains followers for building a "+clss.stronghold+'. ':"")+(clss.extra=='None'?"":clss.extra));
    } else
     $('#pClass').hide();
    calcNewTotal();
    $('#errClass').hide();
   });
   $('#selAlign').change(function(){
    $('#fieldChaotic').toggle($('#selAlign').children(":selected").text()=="Chaotic");
    $('#radHuman').prop("checked", true).trigger("click");
   });
   $('#btnGenNewLand').button().click(function(){
    $('#txtNewLand').val(d(3,3));
    $('#errNewLand').hide();
   });
   $('#txtNewLand').on('input propertychange paste',function(){
    $('#errNewLand').hide();
   });
   $('#selLocation').change(function(){
    var idx=$('#selLocation').prop('selectedIndex');
    $('#liege').toggle(idx<2);
    $('#chkLiege').prop("checked",false).change();
    $('#spMinCost span').text(["15,000","22,500","30,000"][idx]);
    $('#spStartPop').text(["8d6","3d6","1d4+1"][idx]);
    $('#txtStartPop').val('');
    calcNewTotal();
   });
   $('#txtCost').on('input propertychange paste',function(){
    calcNewTotal();
    $('#errCost').hide();
   });
   $('#buildNormal,#buildFaster,#buildFastest').change(function(){
    calcNewTotal();
   });
   $('#btnStartPop').button().click(function(){
    var idx=$('#selLocation').prop('selectedIndex');
    var pop=[d(8,6),d(3,6),d(1,4)+1][idx]*10;
    $('#txtStartPop').val(pop);
    $('#errStartPop').hide();
   });
   $('#txtStartPop').on('input propertychange paste',function(){
    $('#errStartPop').hide();
   });
   $('#btnFastForward').button().click(function(){
    errorCheckNew();
   });
  }
  var initDomain = function(){
   $('#txtWithdraw,#txtDeposit').bind('keyup change click', function (){
    updateDomainFund();
   });
   $('#txtStrongholdImprove').on('input propertychange paste',function(){
    updateImprove();
   });
   $('#radNormal,#radFaster,#radFastest').change(function(){
    updateImprove();
   });
   $('#chkFestival').change(function(){
    updateDomain();
   });
   $('#txtLandInvest,#txtTaxes,#txtGarrison,#txtLiegeTax,#txtTithe').bind('keyup change click propertychange', function (){
    updateDomain();
   });
   $('#btnAddUnits').button({icon:"ui-icon-circle-plus"}).click(function(){
    var sel1 = $('<select id="selPopRace"><option>--Select One--</option><option>Custom</option></select>');
    for(var i=0;i<acks.Mercs.MercList.length;i++)
     sel1.append('<option>'+acks.Mercs.MercList[i].race+'</option>');
    sel1.change(function(){
     $('#selPopUnit').empty();
     var units = acks.Mercs.MercList.find(function(e){
      return e.race==$('#selPopRace option:selected').text();
     });
     if(units) {
      units = units.units;
      $('#pPopNoCust').show();
      $('#pPopCust').hide();
      $('#txtPopCost').attr('disabled','disabled').addClass('disabled');
      $('#txtPopSize').attr('disabled','disabled').addClass('disabled');
      var sel2 = $('#selPopUnit');
      sel2.off().empty().append('<option>--Select One--</option>');
      for(var i=0;i<units.length;i++)
       sel2.append('<option>'+units[i].name+'</option>');
      sel2.change(function(){
       var name = $('#selPopUnit option:selected').text();
       $('#txtPopName').val(name);
       var unit = units.find(function(e){return e.name==name});
       if(unit) {
        $('#txtPopCost').val(unit.cost);
        $('#txtPopSize').val(unit.unitCount);
       }
       $('#txtPopCount').trigger('input');
      });
     } else {
      $('#pPopNoCust').hide();
      $('#pPopCust').show();
      $('#txtPopCost').removeAttr('disabled').removeClass('disabled');
      $('#txtPopSize').removeAttr('disabled').removeClass('disabled');
     }
     $('#txtPopCount').trigger('input');
    });
    holder=$('<div></div>');
    holder.append(sel1.wrap('<label>Select one: </label>').parent().wrap('<p></p>').parent());
    holder.append('<p id="pPopNoCust"><label>Choose one: <select id="selPopUnit"><option>Custom</option></select></label></p><p id="pPopCust"><label>Enter a name: <input type="textbox" id="txtPopName" /></label><p><label>Cost each: <input type="number" id="txtPopCost" /></label></p><p><label>Unit size: <input type="number" id="txtPopSize" /></label></p><p><label>How many?  <input type="number" id="txtPopCount" /></label></p>');

    popup('Add Unit',holder,true,function(){
     domain.garrison.units.push(acks.Domain.temp);
     domain.garrison.cost+=acks.Domain.temp.cost*acks.Domain.temp.count;
     delete acks.Domain.temp;
     displayDomain();
    });
    $('#pPopNoCust,#pPopCust').hide();
    $('#txtPopName,#txtPopCost,#txtPopSize,#txtPopCount').on('input propertychange paste',function(){
     acks.Domain.temp = {
      type: $('#txtPopName').val(),
      cost: $('#txtPopCost').val(),
      away: false,
      count: $('#txtPopCount').val()
     };
    });
   });
   $('#chkLiegePay').change(function(){
    if($(this).prop('checked')) {
     $('#txtLiegeTax').addClass('disabled').attr('disabled','disabled').val($('#pLiege span').text());
    } else {
     $('#txtLiegeTax').removeClass('disabled').removeAttr('disabled');
    }
   });
   $('#btnFound').button({icon:"ui-icon-home"}).click(function(){
    if(domain.population<76)
     popup('Population too low!','<p>To found a city, you must have a population of at least 76 families.</p>',false);
    else
     foundCity();
   });
   $('#btnNewHex').button({icon:"ui-icon-plusthick"}).click(function(){
    if(domain.landValue.length>=16)
     popup('Maximum Size!','<p>You can only expand your land to a single 24-mile hex, which is 16 6-mile hexes. For further growth, build cities, or give land to followers.</p>',false);
    else if(domain.strongholdCost<[15000,22500,30000][domain.territory]*(domain.landValue.length+1))
     popup('Maximum Size!','<p>You can only expand your land as far as your stronghold allows. Your stronghold, worth '+addCommas(domain.strongholdCost)+'gp, can only support '+Math.floor(domain.strongholdCost/[15000,22500,30000][domain.territory])+' hexes. Improve your stronghold to expand.',false);
    else {
     var x=d(3,3);
     domain.landValue.push(x);
     saveDomain(domain);
     popup('New Land Added','<p>Land worth '+x+'gp per family has been added to your domain!</p>',false);
    }
   });
   $('#btnRemLand').button({icon:"ui-icon-closethick"}).click(function(){
    if(domain.landValue.length<2)
     popup('Too Small!','<p>You can only give away land if you have land to give away, and right now, you only have a single 6-mile hex!</p>',false);
    else
     displayGiveLand();
   });
   $('#btnLandOk').button().click(function(){
    var land = $('#sectionGiveLand div input:checked');
    var total = $('#sectionGiveLand div input').length;
    var pop = $('#txtGiveFam').val()*1;
    if(land.length==total) {
     popup('Too Many Selected','<p>You selected all your land - you have to keep at least one hex!</p>',false);
     return;
    } else if(pop>domain.population) {
     popup('Too Many Families','<p>You can only send up to '+domain.population-1 + ' families away, and only '+[780,250,125][domain.territory]+' families per selected hex.</p>',false);
     return;
    } else if(domain.population-pop>[780,250,125][domain.territory]*(total-land.length)) {
     popup('Too Many Hexes','<p>You selected '+land.length+' hexes to give away, and '+pop+' families, but that doesn\'t leave enough land for the rest of your population.',false);
     return;
    }
    var vals=[];
    $('#sectionGiveLand div input:checked').each(function(){
     vals.push($(this).attr('data')*1);
    });
    var lst=[];
    for(var i=0;i<domain.landValue.length;i++)
     if(vals.indexOf(i)<0)
      lst.push(domain.landValue[i]);
    domain.landValue=lst;
    saveDomain(domain);
    popup('Land Removed','<p>'+vals.length+' hexes of land were removed from your domain, and '+pop+' families.</p>',false);
    $('#sectionGiveLand').hide();
    displayDomain();
   });
   $('#btnLandCancel').button().click(function(){
    $('#sectionGiveLand').hide();
    displayDomain();
   });
   $('#btnProceed').button({icon:"ui-icon-play"}).click(function(){
    popup('Advance calendar?','<p>If you are ready to continue, click ok to finish out this month and advance to the next month. Populations will be rolled, funds added and removed from your domain fund, and any garrison changes will take place.</p>',true,advanceMonth);
   });
   $('#btnDomainSave').button({icon:"ui-icon-disk"}).click(function(){
    popup('Save progress?','<p>Advancing the month automatically saves progress, but if you made changes that you want to save, click ok to store them.</p>',true,function(){saveDomain(domain)});
   });
  }
  var initFound = function(){
   $('#btnFoundConfirm').button().click(function(){
    var name = $('#txtCityName').val();
    var pop = $('#txtCityPop').val()*1;
    var invest = $('#txtCityInvest').val()*1;
    var n=cityData.length;
    while(cityData[--n][1]>invest);

    var city = {
     name: name,
     align: domain.align,
     alignPercent: domain.alignPercent,
     population: pop,
     investment: invest,
     morale: 0,
     garrison: {
      simple: true,
      cost: 0,
      awayCost: 0,
      units: []
     },
     seasonalEvents: {
      garrison: 0,
      festivals: 0,
      popLast: 0,
      taxes: 0,
      tithesPaid: true
     }
    };
    domain.cities.push(city);
    domain.cash-=invest;
    domain.population-=pop;
    saveDomain(domain);
    $('#sectionFound').hide();
    displayDomain();
   });
   $('#btnFoundCancel').button().click(function(){
    $('#sectionFound').hide();
    displayDomain();
   });
  };

  var strongholds = [{name:"Assassin",stronghold:"Hideout",build:false,mercs:{},costMult:1,extra:"see Hideouts and Hijinks section (p135)"},{name:"Bard",stronghold:"Hall",build: true,mercs:{count:1,dice:4,add:1,type: 0,leader: true,label:"0th level mercenaries"},costMult:1,extra:"None"},{name:"Bladedancer",stronghold:"Temple",build: true,mercs:{count:5,dice:6,add:1,type: 0,leader: true,label:"0th level mercenaries"},costMult:0.5,extra:"cost of building stronghold reduced by 50%,followers never need to check morale"},{name:"Cleric",stronghold:"Fortified Church",build: true,mercs:{count:5,dice:6,add:0,type: 1,leader: true,label:"0th level mercenaries"},costMult:0.5,extra:"cost of building stronghold reduced by 50%,followers never need to check morale"},{name:"Dwarven Craftpriest",stronghold:"Vault",build: true,mercs:{count:3,dice:6,add:0,type: 2,leader:false,label:"1st level dwarves"},costMult:1,extra:"must be underground,may not be in human or elven civilized or borderlands area"},{name:"Dwarven Vaultguard",stronghold:"Vault",build: true,mercs:{count:3,dice:6,add:0,type: 2,leader:false,label:"1st level dwarves"},costMult:1,extra:"must be underground,may not be in human or elven civilized or borderland area"},{name:"Elven Nightblade",stronghold:"Hideout",build:false,mercs:{},costMult:1,extra:"see Hideouts and Hijinks section (p135)"},{name:"Elven Spellsword",stronghold:"Fastness",build: true,mercs:{count:3,dice:6,add:0,type: 3,leader:false,label:"1st level elves"},costMult:1,extra:"may not be in human or dwarven civilized or borderland; area,all animals within 3 miles of fastness become friendly"},{name:"Explorer",stronghold:"Border Fort",build: true,mercs:{count:1,dice:4,add:1,type: 4,leader: true,label:"0th level mercenaries"},costMult:1,extra:"must be in borderlands or wilderness"},{name:"Fighter",stronghold:"Castle",build: true,mercs:{count:1,dice:4,add:1,type: 1,leader: true,label:"0th level mercenaries"},costMult:1,extra:"None"},{name:"Mage",stronghold:"Sanctum",build:false,mercs:{},costMult:1,extra:"see Sanctums and Dungeons section (p141)"},{name:"Thief",stronghold:"Hideout",build:false,mercs:{},costMult:1,extra:"see Hideouts and Hijinks section (p135)"},{name:"Anti-Paladin",stronghold:"Dark Fortress",build: true,mercs:{count:1,dice:4,add:1,type: 1,leader: true,label:"0th level mercenaries"},costMult:1,extra:"None"},{name:"Barbarian",stronghold:"Chieftan's Hall",build: true,mercs:{count:1,dice:4,add:1,type: 4,leader: true,label:"0th level mercenaries"},costMult:1,extra:"None"},{name:"Dwarven Delver",stronghold:"Vault",build: true,mercs:{count:3,dice:6,add:0,type: 2,leader: true,label:"1st level dwarves"},costMult:1,extra:"must be underground,may not be in human or elven civilized or borderland area"},{name:"Dwarven Fury",stronghold:"Vault",build: true,mercs:{count:3,dice:6,add:0,type: 2,leader: true,label:"1st level dwarves"},costMult:1,extra:"must be underground,may not be in human or elven civilized or borderland area"},{name:"Dwarven Machinist",stronghold:"Manufactory",build:false,mercs:{},costMult:1,extra:"see Sanctums and Dungeons section (p141)"},{name:"Elven Courtier",stronghold:"Fastness",build: true,mercs:{count:3,dice:6,add:0,type: 3,leader: true,label:"1st level elves"},costMult:1,extra:"may not be in human or dwarven civilized or borderland; area,all animals within 3 miles of fastness become friendly"},{name:"Elven Enchanter",stronghold:"Sanctum",build:false,mercs:{},costMult:1,extra:"see Sanctums and Dungeons section (p141)"},{name:"Elven Ranger",stronghold:"Fastness",build: true,mercs:{count:3,dice:6,add:0,type: 3,leader: true,label:"1st level elves"},costMult:1,extra:"may not be in human or dwarven civilized or borderland; area,all animals within 3 miles of fastness become friendly"},{name:"Gnomish Trickster",stronghold:"Gnomish Vault",build: true,mercs:{count:3,dice:6,add:0,type: 5,leader: true,label:"1st level gnomes"},costMult:1,extra:"must be underground,may not be in human or elven civilized or borderland area"},{name:"Mystic",stronghold:"Monastary",build: true,mercs:{count:5,dice:6,add:0,type: 1,leader: true,label:"0th level mercenaries"},costMult:1,extra:"Morale +4; don't need to be paid"},{name:"Nobiran Wonderworker",stronghold:"Sanctum",build:false,mercs:{},costMult:1,extra:"see Sanctums and Dungeons section (p141)"},{name:"Paladin",stronghold:"Fortress",build: true,mercs:{count:1,dice:4,add:1,type: 1,leader: true,label:"0th level mercenaries"},costMult:1,extra:"None"},{name:"Priestess",stronghold:"Cloister",build:false,mercs:{},costMult:0,extra:"80% leave after the first year,1d6x20 replace them; 100% free"},{name:"Shaman",stronghold:"Medicine Lodge",build: true,mercs:{count:5,dice:6,add:0,type: 6,leader: true,label:"0th level mercenaries"},costMult:1,extra:"Morale +4; don't need to be paid"},{name:"Thrassian Gladiator",stronghold:"Castle",build: true,mercs:{count:1,dice:4,add:1,type: 7,leader: true,label:"0th level mercenaries"},costMult:1,extra:"None"},{name:"Venturer",stronghold:"Guildhouse",build: true,mercs:{count:2,dice:6,add:0,type:-1,leader: true,label:"1st level venturers"},costMult:1,extra:"see Hideouts and Hijinks section (p135)"},{name:"Warlock",stronghold:"Coterie",build:false,mercs:{},costMult:1,extra:"see Sanctums and Dungeons section (p141)"},{name:"Witch",stronghold:"Coven",build:false,mercs:{},costMult:1,extra:"see Sanctums and Dungeons section (p141)"},{name:"Zaharan Ruinguard",stronghold:"Dark Fortress",build: true,mercs:{count:1,dice:4,add:1,type: 1,leader: true,label:"0th level mercenaries"},costMult:1,extra:"None"},{name:"Airwalker",stronghold:"Cloud Refuge",build:false,mercs:{},costMult:1,extra:"+1 morale,don't need paid; see Hideouts and Hijinks section (p135)"},{name:"Dwarven Sapper",stronghold:"Vault",build: true,mercs:{count:3,dice:6,add:0,type: 2,leader: true,label:"1st level dwarves"},costMult:1,extra:"must be underground,may not be in human or elven civilized or borderland area"},{name:"Ectomancer",stronghold:"Undertaker's",build: true,mercs:{count:5,dice:6,add:0,type: 1,leader: true,label:"0th level mercenaries"},costMult:0.5,extra:"cost of building stronghold reduced by 50%,followers never need to check morale"},{name:"Elven Polydoctorate",stronghold:"Library",build:false,mercs:{},costMult:1,extra:"see Sanctums and Dungeons section (p141)"},{name:"Gnomish Beastmaster",stronghold:"Zoo",build: true,mercs:{count:3,dice:6,add:0,type: 5,leader: true,label:"1st level gnomes"},costMult:1,extra:"must be in gnomish territory,borderland,or wilderness; all animals within 5 miles become friendly,as if it were a fastness"},{name:"Gnomish Librarian",stronghold:"Library",build:false,mercs:{},costMult:1,extra:"Only within human or gnomish territory; see Sanctums and Dungeons section (p141); all animals within 5 miles become friendly,as if it were a fastness"},{name:"Gnomish Mage",stronghold:"Sanctum",build:false,mercs:{},costMult:1,extra:"Only within human or gnomish territory; see Sanctums and Dungeons section (p141); all animals within 5 miles become friendly,as if it were a fastness"},{name:"Librarian Guard",stronghold:"Library",build:false,mercs:{},costMult:1,extra:"see Sanctums and Dungeons section (p141)"},{name:"Nobiran Mystic",stronghold:"Monastary",build: true,mercs:{count:5,dice:6,add:0,type: 1,leader: true,label:"0th level mercenaries"},costMult:1,extra:"Morale +4; don't need to be paid"},{name:"Skinscribe",stronghold:"Sanctum",build:false,mercs:{},costMult:1,extra:"see Sanctums and Dungeons section (p141)"},{name:"Spy",stronghold:"Safehouse",build:false,mercs:{},costMult:1,extra:"see Hideouts and Hijinks section (p135)"},{name:"Thrassian Assassin",stronghold:"Hideout",build:false,mercs:{},costMult:1,extra:"see Hideouts and Hijinks section (p135)"},{name:"White Mage",stronghold:"Hospital",build: true,mercs:{count:5,dice:6,add:0,type: 1,leader: true,label:"0th level mercenaries"},costMult:0.5,extra:"cost of building stronghold reduced by 50%,followers never need to check morale"},{name:"Wolfwere",stronghold:"Animal Forest",build: true,mercs:{count:5,dice:6,add:0,type: 8,leader: true,label:"1-4 HD animal"},costMult:1,extra:"All animals within 5 miles friendly,like fastness"}];
  var morale=[["Revolt",-4,0,0,"100% of your population turns to banditry! They attack travelers, and killing them reduces your domain! Furthermore, there is a 10% chance per 200 families that a level 4-7 fighter rises up to challenge your rule!"],["Defiant",-3,0.5,0,"50% of your population turns to banditry!"],["Turbulent",-2,0.75,0,"20% of your population turns to banditry!"],["Demoralized","-1",1,0,""],["Apathetic",0,1,0,""],["Loyal",1,1,0,"Spies, thieves, -1 penalty to throws"],["Dedicated",2,1,0,"Spies, thieves, -2 penalty to throws"],["Steadfast",3,1,1,"Spies, thieves, -3 penalty to throws"],["Stalwart",4,1,2,"Spies, thieves, -4 penalty to throws"]];
  var cityData=[[1,0,7,"Class VI+"],[249,10000,7,"Class VI"],[624,25000,7.5,"Class V"],[2499,75000,7.5,"Class IV"],[4999,200000,7.5,"Class III"],[19999,625000,8,"Class II"],[100000,2500000,8.5,"Class I"]];
  var mercLoadout = [[[1,"Heavy Cavalry (lance, sword, shield, plate armor, chain barded medium warhorse)", 60],[11,"Medium Cavalry (lance, shield, lamellar armor, and medium warhorse)", 45],[21,"Light Cavalry (3 javelins, 2 swords, leather armor, light warhorse)", 30],[36,"Heavy Infantry (pole arm, sword, shield, banded plate armor)", 12],[56,"Light Infantry (2 swords, dagger, leather armor)", 6],[81,"Archers (short bow, sword, leather armor)", 9],[91,"Slingers (sling, short sword, shield, leather armor)", 6]],[[1,"Cataphract Cavalry (composite bow, sword, shield, plate armor, chain barded medium warhorse)", 75],[06,"Heavy Cavalry (lance, sword, shield, plate armor, chain barded medium warhorse)", 60],[16,"Medium Cavalry (lance, shield, lamellar armor, and medium warhorse)", 45],[26,"Light Cavalry (3 javelins, sword, shield, leather armor, light warhorse)", 30],[36,"Heavy Infantry (pole arm, sword, shield, banded plate armor)", 12],[61,"Light Infantry (spear, short sword, shield, leather armor)", 6],[81,"Archers (short bow, short sword, leather armor)", 9],[91,"Slingers (sling, short sword, shield, leather armor)", 6]],[[1,"Dwarven Heavy Infantry (great axe, plate armor)", 18],[21,"Dwarven Heavy Infantry (war hammer, shield, banded plate armor)", 18],[41,"Dwarven Heavy Infantry (battle axe, shield, chainmail)", 18],[61,"Dwarven Crossbowmen (arbalest, dagger, chainmail)", 24],[81,"Dwarven Mounted Crossbowmen (crossbow, chainmail, mule)", 45]],[[1,"Elven Horse Archers (composite bow, scimitar, leather armor, light warhorse)", 90],[16,"Elven Light Cavalry (lance, shield, leather armor, light warhorse)", 60],[31,"Elven Light Infantry (spear, short sword, shield, leather armor)", 10],[46,"Elven Heavy Infantry (spear, sword, shield, chainmail)", 24],[61,"Elven Archers (short bow, dagger, leather armor)", 21],[76,"Elven Longbowmen (long bow, sword, chainmail)", 42]],[[1,"Medium Cavalry (lance, shield, lamellar armor, and medium warhorse)", 45],[11,"Light Cavalry (3 javelins, 2 swords, leather armor, light warhorse)", 30],[26,"Horse Archers (composite bow, scimitar, leather armor, light warhorse)", 45],[41,"Light Infantry (spear, hand axe, shield, leather armor)", 6],[61,"Longbowmen (long bow, sword, chainmail armor)", 18],[71,"Archers (short bow, short sword, leather armor)", 9],[81,"Slingers (sling, short sword, shield, leather armor)", 6],[91,"Hunters (bola, net, 3 javelins, hand axe, leather armor)", 6]],[[1,"Gnomish Light Infantry (short sword, plate armor)", 6],[21,"Gnomish Heavy Infantry (war hammer, shield, banded plate armor)", 12],[41,"Gnomish Archers (short bow, short sword, leather armor)", 9],[61,"Gnomish Crossbowmen (arbalest, dagger, chainmail)", 18],[81,"Gnomish Mounted Crossbowmen (crossbow, chainmail, War Dog)", 48]],[[1,"Horse Archers (composite bow, scimitar, leather armor, light warhorse)", 45],[16,"Light Cavalry (lance, shield, leather armor, light warhorse)", 30],[31,"Light Infantry (spear, short sword, shield, leather armor)", 6],[46,"Heavy Infantry (spear, sword, shield, chainmail)", 12],[61,"Archers (short bow, dagger, leather armor)", 9],[76,"Longbowmen (long bow, sword, chainmail)", 18]],[[1,"Cataphract Cavalry (composite bow, sword, shield, plate armor, chain barded medium warhorse)", 75],[06,"Heavy Cavalry (lance, sword, shield, plate armor, chain barded medium warhorse)", 60],[16,"Medium Cavalry (lance, shield, lamellar armor, and medium warhorse)", 45],[26,"Light Cavalry (3 javelins, sword, shield, leather armor, light warhorse)", 30],[36,"Heavy Infantry (pole arm, sword, shield, banded plate armor)", 12],[46,"Light Infantry (2 swords, dagger, leather armor)", 6],[56,"Lizardmen Light Infantry (5 darts, spiked club, shield)", 27],[76,"Lizardmen Heavy Infantry (3 javelins, spiked club, leather armor)", 45],[91,"Archers (short bow, short sword, leather armor)", 9]],[[1,"Bear, Black", 14],[11,"Boar, Ordinary", 0],[21,"Cat, large, Mountain Lion", 12],[31,"Dog, war", 3],[41,"Hawk, ordinary", 0],[51,"Herd animal (4HD: buffalo, elk, and moose)", 14],[61,"Varmint, Giant Ferret", 6],[71,"Varmint, Giant Rat", 3],[81,"Varmint, Giant Shrew", 6],[86,"Varmint, Giant Weasel", 29],[91,"Wolf, Ordinary", 6]]];

  var getStronghold = function(name){
   return strongholds.find(function(e){
    return e.name==name;
   });
  };
  var calcNewTotal = function(){
   var clss=getStronghold($('#selClass :selected').text());
   var landval=$('#txtNewLand').val().replace(/\D/g,'')*1;
   var minCost=$('#spMinCost').text().replace(/\D/g,'')*1;
   var cost=$('#txtCost').val().replace(/\D/g,'')*1;
   if(clss && clss.costMult==0) {
    $('#txtCost').attr('disabled','disabled');
    $('#txtCost').val(minCost);
    cost=minCost;
    $('#buildNormal').prop('checked',true).click();
    $('#buildNormal,#buildFaster,#buildFastest').attr('disabled','disabled');
   } else {
    $('#txtCost,#buildNormal,#buildFaster,#buildFastest').removeAttr('disabled');
   }
   var buildspeed=($('#buildNormal:checked').length?0:($('#buildFaster:checked').length?1:2));
   var buildtime=Math.ceil(cost/500/30*[1,0.75,0.5][buildspeed]);
   cost*=[1,1.5,2][buildspeed]
   $('#spBuildTime').text(buildtime);
   var engCount=Math.ceil(cost/100000);
   var engCost=engCount*250;
   $('#spEngineers').text(engCount);
   $('#spStrongholdCost').text(addCommas(cost));
   $('#spMonthlyFee,#spEngineersCost').text(addCommas(engCost));
   $('#spBuildTime2').text(buildtime);
   if(clss)
    $('#spTotal').text(addCommas(cost*clss.costMult+engCost*buildtime));
   else
    $('#spTotal').text(addCommas(cost+engCost*buildtime));
  };
  var errorCheckNew = function(){
   var name=$('#txtName').val();
   var year=$('#txtYear').val().replace(/\D/g,'')*1;
   var month=$('#txtMonth').val().replace(/\D/g,'')*1;
   var clss=getStronghold($('#selClass :selected').text());
   var landval=$('#txtNewLand').val().replace(/\D/g,'')*1;
   var align=$('#selAlign :selected').text();
   var cash=$('#txtCash').val().replace(/\D/g,'')*1;
   var loc=$('#selLocation :selected').text();
   var minCost=$('#spMinCost').text().replace(/\D/g,'')*1;
   var cost=$('#txtCost').val().replace(/\D/g,'')*1;
   var totalCost=$('#spTotal').text().replace(/\D/g,'')*1;
   var buildtime=$('#spBuildTime').text().replace(/\D/g,'')*1;
   var engCount=$('#spEngineers').text().replace(/\D/g,'')*1;
   var engCost=$('#spEngineersCost').text().replace(/\D/g,'')*1;
   var buildspeed=($('#buildNormal:checked').length?0:($('#buildFaster:checked').length?1:2));
   var startPop=$('#txtStartPop').val().replace(/\D/g,'')*1;

   $('#errName').toggle(name.length==0);
   $('#errYear').toggle(year<1);
   $('#errMonth').toggle(month<1);
   $('#errNewLand').toggle(landval<1);
   $('#errCost').toggle(cost<minCost);
   $('#errCash').toggle(cash<totalCost);
   $('#errClass').toggle(!clss);
   $('#errStartPop').toggle(startPop<20);

   if(name.length==0 || year<1 || month<1 || landval<3 || cost<minCost || cash<totalCost || !clss || startPop<20)
    return;

   var text="<p>Clicking \"Ok\" will fast-forward your <strong>"+clss.stronghold+"</strong> until it is complete (this action can't be undone!). Please verify the following information is correct:</p><p>You, a <strong>"+align+" "+clss.name+"</strong>, intend to found stronghold <strong>"+name+"</strong> in the <strong>"+(month==1?"first":(month==2?"second":(month==3?"third":(month==5?"fifth":month+"th"))))+" month</strong> of the year <strong>"+year+"</strong>. Beginning with <strong>"+addCommas(cash)+"gp</strong> in <strong>"+loc+" territory</strong>, in a six-mile hex valued at <strong>"+landval+"gp</strong>, you hire <strong>"+engCount+" engineer"+(engCount!=1?"s":"")+"</strong> for <strong>"+addCommas(engCost)+"gp</strong> per month, to build your stronghold in <strong>"+["","75% of the ","half of the "][buildspeed]+"normal time</strong>, for a base cost of <strong>"+addCommas(cost)+"gp</strong>. Over the course of <strong>"+buildtime+" months</strong>, it will cost a total of <strong>"+addCommas(totalCost)+"gp</strong>. <strong>"+startPop+" families</strong> flock to your stronghold.</p>";
   if($('#chkLiege').prop('checked'))
    text+="<p>You will need to pay 20% taxes on any income to your liege.</p>";
   text+="<p>Good luck!</p>";

   popup("Ready to go?",text,true,parseAndFastForward,function(){});
  };
  var parseAndFastForward = function(){
   var name=$('#txtName').val();
   var year=$('#txtYear').val().replace(/\D/g,'')*1;
   var month=$('#txtMonth').val().replace(/\D/g,'')*1;
   var clss=getStronghold($('#selClass :selected').text());
   var landval=$('#txtNewLand').val().replace(/\D/g,'')*1;
   var align=['Lawful','Neutral','Chaotic'].findIndex(function(obj){return obj==$('#selAlign :selected').text()});

   var cash=$('#txtCash').val().replace(/\D/g,'')*1;
   var loc=$('#selLocation :selected').text();
   var cost=$('#txtCost').val().replace(/\D/g,'')*1;
   var buildtime=$('#spBuildTime').text().replace(/\D/g,'')*1;
   var engCount=$('#spEngineers').text().replace(/\D/g,'')*1;
   var engCost=$('#spEngineersCost').text().replace(/\D/g,'')*1;
   var buildspeed=($('#buildNormal:checked').length?0:($('#buildFaster:checked').length?1:2));
   var startPop=$('#txtStartPop').val().replace(/\D/g,'')*1;
   var popType=($('#radHuman').prop('checked')?"Human":"Beastman");
   var costTotal=$('#spTotal').text().replace(/\D/g,'')*1;
   var liege=$('#chkLiege').prop('checked');
   var rollFollowers=$('#chkFollowers').prop('checked');
   var nextseason={year:year,month:month+buildtime+3};
   if(!$('#radSeason').prop('checked'))
    nextseason.month-=month%3;
   while(nextseason.month>12) {
    nextseason.year++;
    nextseason.month-=12;
   }
   var season = {year:year,month:month+buildtime};
   while(season.month>12) {
    season.year++;
    season.month-=12;
   }

   var territory = territories.findIndex(function(obj){return obj==loc});

   var followers = [];
   var followCost = 0;
   if(clss.build)
    followers=makeStrongholdFollowers(clss.name,rollFollowers);
   if(rollFollowers)
    for(var i=0;i<followers.length;i++)
     followCost += followers[i].cost*followers[i].count;

   domain = {
    version: version,
    name: name,
    playerClass: clss.name,
    playerAlign: align,
    cash: cash-costTotal,
    territory: territory,
    liege: liege,
    seasonDate: season,
    nextSeason: nextseason,
    align: align,
    alignPercent: [(align==0?100:0),(align==1?100:0),(align==2?100:0)],
    landValue: [landval],
    population: startPop,
    popType: popType,
    strongholdCost: cost,
    strongholdInvest: [],
    morale: 0,
    garrison: {
     simple: !rollFollowers,
     cost: followCost,
     awayCost: 0,
     units: followers
    },
    seasonalEvents: {
     garrison: 0,
     festivals: 0,
     popLast: startPop,
     taxes: 0,
     tithesPaid: true,
     newReligion: false
    },
    atWar: false,
    cities: []
   };

   saveDomain(domain);
   $('#sectionNew').hide();
   displayDomain();
  };
  var displayDomain = function(){
   $('#sectionDomain').show();
   $('#sectionSave').show();
   $('#txtWithdraw').prop('max',domain.cash);
   $('#txtWithdraw,#txtDeposit,#txtLandInvest,#txtStrongholdImprove').val(0);
   $('#txtTaxes').val(2);
   $('#txtGarrison').val(domain.garrison.cost);
   $('#txtGarrisonAway').val(domain.garrison.awayCost);
   var gross=getGross(2);
   $('#pLiege').toggle(domain.liege);
   $('#chkFestival,#chkNewReligion').prop('checked',false);
   $('#chkTithe').prop('checked',true);
   $('#chkWar').prop('checked',domain.atWar);
   updateDomain();
   updateImprove();

   $('#divCities').empty();
   domain.cities.forEach(function(city,idx){
    var m=morale[city.morale+4];
    var n=cityData.length;
    while(cityData[--n][1]>city.investment);
    var popchange;
    if(domain.population<100)
     popchange='only grows on 10: ';
    else
     popchange=' change: ';
    popchange += Math.ceil(city.population/1000)*2+'d10 - '+Math.ceil(city.population/1000)*2+'d10 '+(m[1]!=0?(m[1]>0?'+':'')+m[1]*Math.ceil(city.population/1000)+'d10':'');
    $('#divCities').append("<fieldset class='fieldCity minimized' id='city"+idx+"' data='"+idx+"'><legend>"+city.name+"</legend><table></table><fieldset><legend> Upkeep </legend></fieldset></fieldset>");
    $('#city'+idx+' table').append('<tr><td><p>Population: '+addCommas(city.population)+' families</p><p>Investment: '+addCommas(city.investment)+'gp</p></td><td>Current morale: <ul><li>'+m[0]+' ('+(city.morale)+')</li><li>Population '+popchange+'</li><li>Taxes '+(m[2]<1?'at '+m[2]+' multiplier':(m[3]>0?'gain +'+m[3]+'gp/family!':'unaffected.'))+'</li></ul></td></tr>')
    .append('<tr><td>Expected income:<ul id="ulIncome'+idx+'"></ul></td><td>Expected outflow:<ul><li>City upkeep: 1gp per family ('+city.population+'gp total)</li><li>Garrison: <span id="spCityGarrison'+idx+'"></span>gp</li>'+(domain.liege?'<li>Liege Taxes: <span id="spCityLiege'+idx+'"></span>gp</li>':'')+'<li>Tithe: <span id="spCityTithe'+idx+'"></span>gp <label><input type="checkbox" id="chkTithe'+idx+'" checked="true" /> Pay?</label></li><li>Festival: <span id="spFest'+idx+'"></span></li><li>Total expected outflow: <span id="spCityOutflow'+idx+'"></span>gp</li></ul></td></tr>')
    $('#city'+idx+' fieldset').append('<p><label><input type="checkbox" id="chkFestival'+idx+'" />Festival this month (5gp per family)</label></p><p><label>Settlement investment: <input type="number" id="txtInvest'+idx+'" value="0" min="0" step="1000" /></p><p><label>Current taxes (gp/family): <input type="number" id="txtTaxes'+idx+'" min="0" value="2" /></label></p><p><label>Current garrison (<span id="spGarrison'+idx+'">'+Math.floor(city.garrison.cost/city.population)+'</span>gp/family): <input type="number" id="txtGarrison'+idx+'" min="0" value="'+city.garrison.cost+'" /></label></p><p><label>Garrison away (total gp): <input type="number" id="txtGarrisonAway'+idx+'" min="0" value="'+city.garrison.awayCost+'" /></label></p>');
    $('#chkFestival'+idx+',#chkTithe'+idx).change(function(){
     var idx = $(this).parent().parent().parent().parent().attr('data');
     updateCityOutflow(idx);
    });
    $('#txtGarrison'+idx).on('input propertychange paste',function(){
     var idx = $(this).parent().parent().parent().parent().attr('data');
     $('#spGarrison'+idx).text(Math.floor($(this).val()/city.population));
     updateCityOutflow(idx);
    });
    $('#txtTaxes'+idx).on('input propertychange paste',function(){
     var idx = $(this).parent().parent().parent().parent().attr('data');
     var income = $('#txtTaxes'+idx).val()*1+4+cityData[n][2];
     $('#ulIncome'+idx).empty()
      .append('<li>Taxes: '+$('#txtTaxes'+idx).val()+'gp/family</li>')
      .append('<li>Value: '+cityData[n][2]+'gp/family</li>')
      .append('<li>Services: 4gp/family</li>')
      .append('<li>Total expected: '+income*city.population+'gp</li>');
     updateCityOutflow(idx);
    });
    $('#ulIncome'+idx).empty()
     .append('<li>Taxes: '+$('#txtTaxes'+idx).val()+'gp/family</li>')
     .append('<li>Value: '+cityData[n][2]+'gp/family</li>')
     .append('<li>Services: 4gp/family</li>')
     .append('<li>Total expected: '+($('#txtTaxes'+idx).val()*1+4+cityData[n][2])*city.population+'gp</li>');
    updateCityOutflow(idx);
   });
   $('.fieldCity legend').click(function(){
    $(this).parent().toggleClass('minimized',500);
   });
   var owetaxes = Math.round(gross*0.2,0);
   var totalTax = owetaxes;
   $('#pLiege ul').empty().append('<li>Domain: '+addCommas(owetaxes)+'</li>');
   for(var i=0;i<domain.cities.length;i++) {
    var tax = $('#spCityLiege'+i).text()*1;
    totalTax += tax;
    $('#pLiege ul').append('<li>'+$('#city'+i+' legend:first-child').text()+': '+addCommas(tax)+'</li>');
   }
   $('#txtLiegeTax').val(totalTax);

   showGarrison();
  };
  var showGarrison = function(){
   $('#tblUnits,#btnAddUnits').toggle(!domain.garrison.simple);
   if(!domain.garrison.simple) {
    $('#txtGarrison,#txtGarrisonAway').attr('disabled','disabled').addClass('disabled');
    for(var i=0;i<domain.cities.length;i++)
     $('#txtGarrison'+i+',#txtGarrisonAway'+i).attr('disabled','disabled').addClass('disabled');
    $('#btnGarrisonSimple').button({icon:"ui-icon-circle-close"}).text('Turn Off Complex Garrisons').off().click(function(){
     popup('CAUTION','<p>Are you sure you want to switch to simple garrison? This action cannot be undone, and will delete all existing units!</p>',true,function(){
      domain.garrison.units=[];
      domain.garrison.simple=true;
      $('#txtGarrison,#txtGarrisonAway').removeAttr('disabled').removeClass('disabled');
      showGarrison();
     });
    });
    $('#tblUnits').empty().append('<tr><th>Count</th><th>Cost (ea)</th><th>Unit</th><th>Away?</th><th>Assign</th><th>Edit</td></tr>');
    if(!domain.garrison.units)
     domain.garrison.units=[];
    var units = domain.garrison.units;
    var gcost = 0;
    for(var i=0;i<units.length;i++)
     gcost += units[i].cost*units[i].count;
    if(gcost != domain.garrison.cost)
     $('#tblUnits').append('<tr><td>'+(domain.garrison.cost-gcost)+'</td><td>1</td><td>Unallocated garrison funds</td><td>---</td><td>Domain</td><td><button></button></td></tr>');
    for(var i=0;i<units.length;i++)
     $('#tblUnits').append('<tr idx="'+i+'"><td>'+units[i].count+'</td><td>'+units[i].cost+'</td><td>'+units[i].type+'</td><td><input type="checkbox" '+(units[i].away?'checked="checked"':'')+' /></td><td><select data="Domain"></select></td><td><button></button></td></tr>');
    for(var j=0;j<domain.cities.length;j++) {
     var name = domain.cities[j].name;
     if(!domain.cities[j].garrison.units)
      domain.cities[j].garrison.units = [];
     var units = domain.cities[j].garrison.units;
     var gcost = 0;
     for(var i=0;i<units.length;i++)
      gcost += units[i].cost*units[i].count;
     if(gcost != domain.cities[j].garrison.cost)
      $('#tblUnits').append('<tr><td>'+(domain.cities[j].garrison.cost-gcost)+'</td><td>1</td><td>Unallocated garrison funds</td><td>---</td><td>'+name+'</td><td><button></button></td></tr>');

     for(var i=0;i<units.length;i++)
      $('#tblUnits').append('<tr><td>'+units[i].count+'</td><td>'+units[i].cost+'</td><td>'+units[i].type+'</td><td><input type="checkbox" '+(units[i].away?'checked="checked"':'')+' /></td><td><select data="'+name+'"></select></td><td><button></button></td></tr>');
    }
    $('#tblUnits tr td select').append('<option>Domain</option>');
    $('#tblUnits tr td button').button({icon:"ui-icon-wrench"}).click(function(){
     $(this).parent().parent().addClass('idEditing');
     var p = $(this).parent().parent().children();
     var count = p.eq(0).text()*1;
     var cost = p.eq(1).text()*1;
     var unit = p.eq(2).text();
     var away = !!p.children('input').prop('checked');
     var assign = p.find('select :selected').text();
     if(assign=="")
      assign=p.eq(4).text();
     popup('Modify Unit',"<p><label>Add or remove units: <input type='number' value='"+count+"' min='0' id='txtPopCount' /></label></p><p>Unit: "+unit+"</p><p>Cost each: <span id='spPopCost'>"+cost+"</span></p><p>Total cost: <span id='spPopTotal'>"+cost*count+"</span></p>",true,function(){
      $('.idEditing td').eq(0).text(acks.Domain.temp);
      delete acks.Domain.temp;
      $('.idEditing').removeClass('idEditing');
      saveGarrison();
      showGarrison();
     });
     $('#txtPopCount').on('input propertychange paste',function(){
      var cost=$('#spPopCost').text()*1;
      var count = $('#txtPopCount').val()*1;
      $('#spPopTotal').text(cost*count);
      acks.Domain.temp = count;
     });
    });
    for(var i=0;i<domain.cities.length;i++)
     $('#tblUnits tr td select').append('<option>'+domain.cities[i].name+'</option>');
    $('#tblUnits tr td select').each(function(){
     $(this).val($(this).attr('data'));
    });
    $('#tblUnits tr td input,#tblUnits tr td select').change(function(){
     saveGarrison();
    });
   } else {
    $('#txtGarrison,#txtGarrisonAway').removeAttr('disabled').removeClass('disabled');
    for(var i=0;i<domain.cities.length;i++)
     $('#txtGarrison'+i+',#txtGarrisonAway'+i).removeAttr('disabled').removeClass('disabled');
    $('#btnGarrisonSimple').button({icon:"ui-icon-circle-plus"}).text('Turn On Complex Garrisons').off().click(function(){
     domain.garrison.simple=false;
     showGarrison();
    });
   }
  };
  var saveGarrison = function(){
   var cities = ['Domain'];
   var garr = [{simple:false,cost:0,awayCost:0,units:[]}];
   for(var i=0;i<domain.cities.length;i++) {
    cities.push(domain.cities[i].name);
    garr.push({simple:false,cost:0,awayCost:0,units:[]});
   }
   $('#tblUnits tr').each(function(){
    if($(this).children('th').length>0)
     return;
    var count= $(this).children().eq(0).text()*1;
    var cost = $(this).children().eq(1).text()*1;
    var name = $(this).children().eq(2).text();
    var away = !!$(this).children().children('input').prop('checked');
    var idx = cities.indexOf($(this).find('select :selected').text());
    if(idx<0)
     idx = cities.indexOf($(this).children().eq(4).text());
    garr[idx].cost += cost*count;
    if(away)
     garr[idx].awayCost += cost*count;
    garr[idx].units.push({
     type: name,
     cost: cost,
     count: count,
     away: away
    });
   });
   domain.garrison = garr[0];
   $('#txtGarrison').val(garr[0].cost).trigger('propertychange');
   $('#txtGarrisonAway').val(garr[0].awayCost).trigger('propertychange');
   for(var i=0;i<domain.cities.length;i++) {
    domain.cities[i].garrison = garr[i+1];
    $('#txtGarrison'+i).val(domain.cities[i].garrison.cost).trigger('propertychange');
    $('#txtGarrisonAway'+i).val(domain.cities[i].garrison.awayCost).trigger('propertychange');
   }
  };
  var updateCityOutflow = function(idx){
   var city = domain.cities[idx];
   var taxes = $('#txtTaxes'+idx).val()*1;
   var garrison = $('#txtGarrison'+idx).val()*1;
   var tithe = Math.round(getGross(taxes,city)*.1,0);
   var liege = Math.round(getGross(taxes,city)*.2,0);
   var festival = $('#chkFestival'+idx).prop('checked');
  
   $('#spCityGarrison'+idx).text(garrison);
   $('#spCityTithe'+idx).text(tithe);
   $('#spCityLiege'+idx).text(liege);
   $('#spFest'+idx).text((!festival?'none this month':'5gp/family ('+5*city.population+'gp total)'));
   $('#spCityOutflow'+idx).text(garrison+(festival?6:1)*city.population+liege+($('#chkTithe'+idx).prop('checked')?tithe:0));
   
   var totalTax = Math.round(getGross($('#txtTaxes').val()*1)*0.2,0);
   $('#pLiege ul').empty().append('<li>Domain: '+addCommas(totalTax)+'</li>');
   for(var i=0;i<domain.cities.length;i++) {
    var tax = $('#spCityLiege'+i).text()*1;
    totalTax += tax;
    $('#pLiege ul').append('<li>'+$('#city'+i+' legend:first-child').text()+': '
+addCommas(tax)+'</li>');
   }
   $('#pLiege span').text(totalTax);
   if($('#chkLiegePay').prop('checked'))
    $('#txtLiegeTax').val(totalTax);
  };
  var displayGiveLand = function(){
   $('#sectionDomain').hide()
   $('#sectionGiveLand').show();
   $('#sectionGiveLand div').empty();
   domain.landValue.forEach(function(el,idx){
    $('#sectionGiveLand div').append('<p><label><input type="checkbox" data="'+idx+'" />Hex #'+idx+' land value: '+el+'</label></p>');
   });
  };
  var getGross = function(tax,city){
   if(city){
    var n=cityData.length;
    while(cityData[--n][1]>city.investment);
    var m=morale[city.morale+4];
    return Math.round(city.population*(1*tax*m[2]+m[3]+cityData[n][2]+4),0);
   } else {
    var m=morale[domain.morale+4];
    //Average land value:
    var landvalue=domain.landValue.reduce(function(a,b){return a+b}) / domain.landValue.length;
    return Math.round(domain.population*(1*tax*m[2]+2*m[3]+landvalue+4),0);
   }
  };
  var updatePopulation = function(x,up,dn){
   var old = x.population;
   var pop = x.population+up-dn;
   var newalign = [x.alignPercent[0]/100*(old-dn),x.alignPercent[1]/100*(old-dn),x.alignPercent[2]/100*(old-dn)];
   newalign[domain.playerAlign]+=up;
   newalign[0]=Math.round(newalign[0]/pop*100,0);
   newalign[1]=Math.round(newalign[1]/pop*100,0);
   newalign[2]=Math.round(newalign[2]/pop*100,0);
   var max=0;
   if(newalign[1]>newalign[0])
    if(newalign[2]>newalign[1])
     max=2;
    else
     max=1
   else if(newalign[2]>0)
    max=2;
   newalign[max]+=100-(newalign[0]+newalign[1]+newalign[2]);
   x.align=max;
   x.alignPercent = newalign;
   x.population = pop;
  };
  var updateImprove = function(){
   var improve = $('#txtStrongholdImprove').val()*1;
   var engs = Math.ceil(improve/100000);
   var time = Math.ceil(improve/500/30*($('#radFaster').prop('checked')?0.75:($('#radFastest').prop('checked')?0.5:1)));
   var cost = improve*($('#radFaster').prop('checked')?1.5:($('#radFastest').prop('checked')?2:1)) + engs*250*time;

   $('#spImproveStronghold').empty().append('Adding improvements worth '+improve+'gp, using '+engs+' engineer(s), over the course of <span id="spStrongholdInvestTime">'+time+'</span> months, for a total of <span id="spStrongholdInvestTotal">'+cost+'</span>gp.');
  };
  var updateDomain = function(){
   var isBeast=(domain.playerClass.popType=='Beastman');
   var m=morale[domain.morale+4];
   var growextra=[0.25,0.2,0.15,0.1,0.05][Math.ceil(domain.population/100)-1+(isBeast?-2:(domain.playerClass.startsWith('Elven')?2:0)+(domain.playerClass.startsWith('Dwarven')?1:0))];
   if(!growextra)
    growextra=0.01;
   var taxes=$('#txtTaxes').val()*1;
   var garrison=$('#txtGarrison').val()*1;
   var listofimprovements = [];
   domain.strongholdInvest.forEach(function(x){
    listofimprovements.push(x.time+' month'+(x.time>1?'s (':' (')+addCommas(x.invest)+'gp)');
   });

   $('#spTotalPop').text(addCommas(domain.population));
   $('#spTotalPopMax').text(addCommas(domain.landValue.length*[780,250,125][domain.territory]));
   $('#spStronghold').text('Your stronghold is worth '+addCommas(domain.strongholdCost)+'gp. '+(domain.strongholdInvest.length>0?'You are working on '+domain.strongholdInvest.length+' improvements, which will finish in '+ands(listofimprovements)+'.':''));

   $('#spDate').text('Month '+domain.seasonDate.month+' of year '+domain.seasonDate.year);
   $('#spTotalFunds').text(addCommas(domain.cash));
   var popchange;
   if(domain.population<100)
    popchange='only grows on 10: ';
   else
    popchange=' change: ';
   popchange += Math.ceil(domain.population/1000)*2+'d10 - '+Math.ceil(domain.population/1000)*2+'d10 '+(m[1]!=0?(m[1]>0?'+':'')+m[1]*Math.ceil(domain.population/1000)+'d10':'')+' + '+Math.floor(domain.population*growextra);
   var landvalue=domain.landValue.reduce(function(a,b){return a+b})/domain.landValue.length;
   var landbonus=(domain.morale==3?1:(domain.morale==4?2:0));
   var servicebonus=(domain.morale==3?1:(domain.morale==4?2:0));
   var gross=getGross(taxes);
   var owetaxes=Math.round(gross*0.2,0);
   var owetithe=Math.round(gross*0.1,0);

   $('#ulMorale').empty()
    .append('<li>'+m[0]+' ('+(domain.morale)+')</li>')
    .append('<li>Population '+popchange+'</li>')
    .append('<li>Taxes '+(m[2]<1?'at '+m[2]+' multiplier':(m[3]>0?'gain +'+m[3]+'gp/family!':'unaffected.'))+'</li>')
    .append('<li>You are <select id="selPlayerAlign"><option>Lawful</option><option>Neutral</option><option>Chaotic</option></select></li><li>Domain alignment is '+domain.alignPercent[0]+'% Lawful, '+domain.alignPercent[1]+'% Neutral, and '+domain.alignPercent[2]+'% Chaotic.</li>');
   $('#selPlayerAlign').prop('selectedIndex',domain.playerAlign).change();
   $('#selPlayerAlign').change(function(){
    domain.playerAlign=$('#selPlayerAlign').prop('selectedIndex');
   });
   if(m[4])
    $('#ulMorale').append('<li>'+m[4]+'</li>');
   $('#ulIncome').empty()
    .append('<li>Land: '+Math.round(landvalue,2)+(landbonus!=0?'gp + '+landbonus:'')+'gp/family ('+domain.population*(landvalue+landbonus)+'gp total)</li>')
    .append('<li>Services: 4'+(servicebonus!=0?'gp + '+servicebonus:'')+'gp/family ('+(domain.population * (4+servicebonus))+'gp total)</li>')
    .append('<li>Taxes: '+taxes*m[2]+'gp'+(m[2]<1?' (x'+m[2]+' due to bad morale)':'')+(m[3]>0?' + '+m[3]+'gp':'')+'/family ('+domain.population*(taxes*m[2]+m[3])+'gp total)</li>')
    .append('<li>Total expected income: <strong>'+domain.population*(landvalue+landbonus+4+servicebonus+taxes*m[2]+m[3])+'gp</strong></li>');
   var outflow=garrison+Math.ceil(0.005*domain.strongholdCost)+(domain.liege?owetaxes:0)+owetithe+($('#chkFestival').prop('checked')?5*domain.population:0);
   $('#spGarrisonFam').text(addCommas(Math.floor(garrison/domain.population)));
   $('#ulOutflow').empty()
    .append('<li>Garrison: '+garrison+'gp ('+Math.floor(garrison/domain.population)+'gp per family)</li>')
    .append('<li>Stronghold upkeep: '+Math.ceil(0.005*domain.strongholdCost)+'gp</li>');
   if(domain.liege)
    $('#ulOutflow').append('<li>Liege Taxes: '+addCommas(owetaxes)+'gp</li>');
   $('#ulOutflow').append('<li>Tithe: '+addCommas(owetithe)+'gp</li>')
    .append('<li>Festival: '+($('#chkFestival').prop('checked')?'5 gp per family ('+5*domain.population+'gp total)':'None this month')+' ('+domain.seasonalEvents.festivals+' others this season)</li>')
    .append('<li>Total expected outflow: <strong>'+outflow+'gp</strong></li>');

    $('#ulDefaults').empty().append('<li>Taxes: 2gp per family</li><li>Garrison: '+[2,3,4][domain.territory]+'gp per family</li>'+(domain.liege?'<li>Taxes owed to liege: '+addCommas(owetaxes)+'gp</li>':'')+'<li>Tithe owed to church: '+addCommas(owetithe)+'gp</li>');

   var totalTax = owetaxes;
   $('#pLiege ul').empty().append('<li>Domain: '+addCommas(owetaxes)+'</li>');
   for(var i=0;i<domain.cities.length;i++) {
    var tax = $('#spCityLiege'+i).text()*1;
    totalTax += tax;
    $('#pLiege ul').append('<li>'+$('#city'+i+' legend:first-child').text()+': '+addCommas(tax)+'</li>');
   }
   $('#pLiege span').text(totalTax);
   if($('#chkLiegePay').prop('checked'))
    $('#txtLiegeTax').val(totalTax);

   if(domain.nextSeason.month==domain.seasonDate.month)
    $('#spNewSeason').text('this month');
   else {
    var months = domain.nextSeason.month+(domain.nextSeason.month>domain.seasonDate.month?0:12)-domain.seasonDate.month;
    $('#spNewSeason').text('in '+months+' month'+(months>1?'s':''));
   }
  };
  var updateDomainFund = function(){
   var withdraw=$('#txtWithdraw').val().replace(/\D/g,'')*1;
   var deposit=$('#txtDeposit').val().replace(/\D/g,'')*1;
   $('#spTotalFunds').text(addCommas(domain.cash-withdraw+deposit));
  };
  var foundCity = function(){
   $('#sectionDomain').hide();
   $('#sectionFound').show();
   $('#txtCityPop').prop('max',(domain.population<250?domain.population-1:250));
   $('#txtCityInvest').prop('max',domain.cash);
  };

  var advanceMonth = function(){
   var isBeast=(domain.playerClass.popType=='Beastman');
   var m=morale[domain.morale+4];
   var growextra=[0.25,0.2,0.15,0.1,0.05][Math.ceil(domain.population/100)-1+(isBeast?-2:(domain.playerClass.startsWith('Elven')?2:0)+(domain.playerClass.startsWith('Dwarven')?1:0))];
   if(!growextra)
    growextra=0.01;
   var garrison=$('#txtGarrison').val()*1;
   var awaygarrison=$('#txtGarrisonAway').val()*1;
   var garrisonpresent = Math.floor(garrison/domain.population)-(domain.atWar?awaycost+awaygarrison:0);
   var garrisonMin = [2,3,4][domain.territory];
   var gross=getGross($('#txtTaxes').val());
   var invest = $('#txtStrongholdImprove').val()*1;

   var summary=$('<div></div>');

   domain.atWar = $('#chkWar').prop('checked');

   summary.append('<p>Garrison cost was '+(domain.garrison.cost!=garrison?'changed to':'unchanged from')+' '+garrison+'gp</p>');
   domain.garrison.cost=garrison;
   domain.garrison.awayCost=awaygarrison;

   if($('#chkFestival').prop('checked'))
    domain.seasonalEvents.festivals++;
   domain.seasonalEvents.garrison += garrisonpresent-garrisonMin;
   domain.seasonalEvents.taxes += 2-$('#txtTaxes').val()*1;
   domain.seasonalEvents.tithesPaid = domain.seasonalEvents.tithesPaid && $('#chkTithe').prop('checked');
   domain.seasonalEvents.newReligion = domain.seasonalEvents.newReligion || $('#chkReligion').prop('checked');
   summary.append('<p>There was '+($('#chkFestival').prop('checked')?'a':'no')+' domain festival this month, making '+domain.seasonalEvents.festivals+' this season.</p><p>The garrison morale bonus is '+domain.seasonalEvents.garrison+' ('+(garrisonpresent<garrisonMin?'down ':'up ')+Math.abs(garrisonpresent-garrisonMin)+'); morale bonus from taxes is '+domain.seasonalEvents.taxes+' ('+($('#txtTaxes').val()*1<2?'up ':'down ')+Math.abs(2-$('#txtTaxes').val()*1)+').</p><p>Tithes were'+($('#chkTithe').prop('checked')?' '+addCommas(Math.round(gross*0.1,0))+'gp':'n\'t paid this month')+(domain.liege?'; taxes were '+addCommas($('#txtLiegeTax').val())+'gp':'')+'.</p><p>The domain was'+(domain.atWar?'':"n't")+' attacked this month.</p>');
   if($('#chkReligion').prop('checked'))
    summary.append('<p>You changed to a new religion!</p>');

   if(invest>0) {
    domain.strongholdInvest.push({
     invest: invest,
     time: $('#spStrongholdInvestTime').text()*1
    });
   }

   var oldCash=domain.cash;
   //Domain cashflow
   domain.cash+=gross
               -Math.ceil(0.005*domain.strongholdCost)
               -(domain.liege?$('#txtLiegeTax').val()*1:0)
               -($('#chkTithe').prop('checked')?Math.round(gross*0.1,0):0)
               -garrison
               +($('#chkFestival').prop('checked')?5:0)*domain.population
               -$('#txtLandInvest').val()*1
               -$('#spStrongholdInvestTotal').text()*1
               -$('#txtWithdraw').val()*1
               +$('#txtDeposit').val()*1;
   domain.cash=Math.round(domain.cash,0);
   var listofimprovements = [];
   domain.strongholdInvest.forEach(function(x){
    listofimprovements.push(x.time+' month'+(x.time>1?'s (':' (')+addCommas(x.invest)+'gp)');
   });
   summary.append('<p>You invested '+addCommas($('#txtLandInvest').val())+'gp in agricultural improvements, and '+addCommas(invest)+'gp into your stronghold. '+(domain.strongholdInvest.length>0?'You are working on '+domain.strongholdInvest.length+' improvements, which will finish in '+ands(listofimprovements)+'.':'')+'</p>');

   //Domain population change
   var oldPop=domain.population;
   var mult = Math.ceil(domain.population/1000);
   var maxPop = domain.landValue.length*[780,250,125][domain.territory];
   var popUp = Math.floor(domain.population*growextra)+dx($('#txtLandInvest').val()/1000,10);
   var popDn = 0;
   if(domain.population>99) {
    popUp += dx(mult*(m[1]>0?2+m[1]:2),10);
    popDn += dx(mult*(m[1]<0?2+m[1]:2),10);
   } else {
    while(d(1,10)==10)
     popUp++;
    while(d(1,10)==10)
     popDn--;
   }
   updatePopulation(domain,popUp,popDn);

   var oldTerr=domain.territory;
   if(domain.population>=maxPop) {
    if(domain.landValue.length==16 && domain.territory!=0)
     domain.territory--;
    else
     domain.population=maxPop;
   }
   summary.append('<p>Domain population '+(domain.population>oldPop?'grew':'fell')+' by '+addCommas(Math.abs(domain.population-oldPop))+' families, for a total of '+addCommas(domain.population)+' families. ' + (domain.population==maxPop?'You are at your maximum population. '+(domain.landValue.length<16?'You should expand to a new hex!':'Your domain has reached its maximum size.'):'')+(oldTerr!=domain.territory?'Your domain has grown into '+territories[domain.territory]+' territory!':''));

   //Each city
   var citySummary=[];
   domain.cities.forEach(function(city,idx){
    var m=morale[city.morale+4];
    var garrison=$('#txtGarrison'+idx).val()*1;
    var awaygarrison=$('#txtGarrisonAway'+idx).val()*1;
    var garrisonpresent = Math.floor(garrison/city.population)-(domain.atWar?awaygarrison:0);
    var garrisonMin = [2,3,4][domain.territory];
    var gross=getGross($('#txtTaxes'+idx).val()*1);
    var str = "";

    str+='<p>'+city.name+' total garrison is '+garrison+(city.garrison.cost<garrison?'gp, up ':'gp, down ')+Math.abs(garrison-city.garrison.cost)+'gp, and ';
    city.garrison.cost=garrison;
    city.garrison.awayCost=awaygarrison;
    str+= city.garrison.awayCost + 'gp of the garrison is away. ';
    var total = gross-($('#chkTithe'+idx).prop('checked')?Math.round(gross*.1,0):0)-garrison-($('#chkFestival'+idx).prop('checked')?6:1)*city.population-$('#txtInvest'+idx).val()*1;
    str+='The city produced '+total+'gp this month. ';
    city.cash += total;
    city.investment += $('#txtInvest'+idx).val()*1;
    if($('#txtInvest'+idx).val()*1>0)
     str+='Investing '+$('#txtInvest'+idx).val()+'gp brings the t';
    else
     str+='T';
    str+='otal investment in the city is '+city.investment+'gp. There was ';

    if($('#chkFestival'+idx).prop('checked'))
     city.seasonalEvents.festivals++;

    str+=($('#chkFestival'+idx).prop('checked')?'a':'no')+' festival this month, for a total of '+city.seasonalEvents.festivals+' since last season. ';

    city.seasonalEvents.garrison += garrisonpresent-garrisonMin;
    city.seasonalEvents.taxes += 2-$('#txtTaxes').val();
    city.seasonalEvents.tithesPaid = city.seasonalEvents.tithesPaid && $('#chkTithe'+idx).prop('checked');
    city.seasonalEvents.newReligion = domain.seasonalEvents.newReligion;

    str+='Seasonal modifier is '+city.seasonalEvents.garrison+' from garrison, '+city.seasonalEvents.taxes+' from taxes, and suffers '+(city.seasonalEvents.tithesPaid?'no loss from':'-2 for not')+' tithing'+(city.seasonalEvents.newReligion?' and -4 from changing religion domain-wide. ':'. ');

    var mult = Math.ceil(city.population/1000);
    var oldPop = city.population;
    var popUp=dx(Math.floor($('#txtInvest'+idx).val()/1000),10);
    var popDn=0;
    if(oldPop>100) {
     popUp+=dx(mult*(m[1]>0?2+m[1]:2),10);
     popDn=dx(mult*(m[1]<0?2-m[1]:2),10);
    } else {
     while(d(1,10)==10)
      popUp++;
     while(d(1,10)==10)
      popDn--;
    }
    updatePopulation(city,popUp,popDn);

    str+=city.name+(oldPop<city.population?' grew ':' shrank ')+Math.abs(city.population-oldPop)+' families, to '+addCommas(city.population)+'. ';

    //city seasonal events
    if(domain.nextSeason.month==domain.seasonDate.month){
     var popchange = Math.round((city.population-city.seasonalEvents.popLast)/(city.population*0.05),0);
     var dice = d(2,6);
     var roll = dice + (city.align!=domain.playerAlign?-2:0) + city.seasonalEvents.garrison + city.seasonalEvents.festivals-1 + popchange*(popchange>0?1:2) + city.seasonalEvents.taxes + (city.seasonalEvents.tithesPaid?-2:0) + (city.seasonalEvents.newReligion?-4:0);
     var oldMorale=city.morale;
     city.morale += (roll<3?-2:(roll<6?-1:(roll>11?2:(roll>8?1:Math.round(city.morale/Math.abs(city.morale+.001),0)))));
     city.morale=(city.morale<-4?-4:(city.morale>4?4:city.morale));
     str+= city.name+'\'s morale is '+(city.moral!=oldMorale?'now ':'unchanged at ')+city.morale+'. Rolled '+dice+' + '+(city.align!=domain.playerAlign?-2:0)+' (alignment) + '+city.seasonalEvents.garrison+' (garrison) + '+(city.seasonalEvents.festivals-1)+' (festivals) + '+popchange*(popchange>0?1:2)+' (population change) + '+city.seasonalEvents.taxes+' (taxes) + '+(city.seasonalEvents.tithesPaid?0:-2)+' (tithes) + '+(city.seasonalEvents.newReligion?-4:0)+' (religion).';
     city.seasonalEvents={garrison:0,festivals:0,popLast:city.population,taxes:0,tithesPaid:true};
    }
    summary.append(str+'</p>');
   });

   summary.append('<p>Cash reserves '+(domain.cash<oldCash?'fell':'grew')+' by '+addCommas(Math.abs(domain.cash-oldCash))+'gp, for a total of '+addCommas(domain.cash)+'gp.</p>');

   //Seasonal
   if(domain.nextSeason.month==domain.seasonDate.month){
    var popchange = Math.round((domain.population-domain.seasonalEvents.popLast)/(domain.population*0.05),0);
    var dice = d(2,6);
    var roll = dice + (domain.align!=domain.playerAlign?-2:0) + domain.seasonalEvents.garrison + domain.seasonalEvents.festivals-1 + popchange*(popchange>0?1:2) + domain.seasonalEvents.taxes + (domain.seasonalEvents.tithesPaid?0:-2) + (domain.seasonalEvents.newReligion?-4:0);
    var oldMorale=domain.morale;
    domain.morale += (roll<3?-2:(roll<6?-1:(roll>11?2:(roll>8?1:Math.round(domain.morale/Math.abs(domain.morale+.001),0)))));
    domain.morale=(domain.morale<-4?-4:(domain.morale>4?4:domain.morale));
    summary.append('<p>It\'s a new season! The domain morale is '+(domain.moral!=oldMorale?' now '+domain.morale:'unchanged')+'. Rolled '+dice+' '+(domain.align!=domain.playerAlign?'- 2 (different alignment than domain)':'') +' + '+domain.seasonalEvents.garrison+' (garrison) ' + ' + '+(domain.seasonalEvents.festivals-1)+' (festivals) + ' + popchange+' (population change) + ' + domain.seasonalEvents.taxes+' (taxes) ' + (domain.seasonalEvents.tithesPaid?'':'- 2 (unpaid tithes) ') + (domain.seasonalEvents.newReligion?'- 4 (new religion)':''));


    domain.nextSeason.month+=3;
    if(domain.nextSeason.month>12) {
     domain.nextSeason.month-=12;
     domain.nextSeason.year++;
    }
    domain.seasonalEvents={garrison:0,festivals:0,popLast:domain.population,taxes:0,tithesPaid:true,newReligion:false};
   }

   //Advance the date
   if(++domain.seasonDate.month>12) {
    domain.seasonDate.month=1;
    domain.seasonDate.year++;
   }
   for(var i=domain.strongholdInvest.length-1;i>=0;i--){
    if(--domain.strongholdInvest[i].time<1) {
     domain.strongholdCost += domain.strongholdInvest[i].invest;
     domain.strongholdInvest.splice(i,1);
    }
   }

   saveDomain(domain);
   displayDomain();
   popup('Welcome to year '+domain.seasonDate.year+', month '+domain.seasonDate.month,summary,false);
  };
  var showDomain = function(){
   return domain;
  };
  var getDomainList = function() {
   $('#ulLoad').empty();
   var ck = document.cookie.split(';');
   for(var i=0;i<ck.length;i++)
    if(ck[i].trim().startsWith("domain.")) {
     var name=decodeURIComponent(ck[i].substring(1,ck[i].indexOf('=')));
     var data=ck[i].substring(ck[i].indexOf('=')+1);
     $('#ulLoad').append('<li><button data="'+data+'" class="btnLoad">'+name.split('.')[1]+'</button><button class="btnDel" data="'+name+'">Delete</button></li>');
    }
   if($('#ulLoad li').length<1)
    $('#ulLoad').append("<li>(None available)</li>");
   $('#ulLoad li button.btnLoad').button({icon:"ui-icon-folder-open"}).click(function(){
    loadDomain($(this).attr('data'));
   });
   $('#ulLoad li button.btnDel').button({icon:"ui-icon-trash"}).click(function(){
    deleteCookie($(this).attr('data'));
   });
  };
  var saveDomain = function(obj){
   var data = JSONC.pack(obj,true);
   var d = new Date();
   d.setTime(d.getTime() + 63072000000); //2 years
   var expires = "expires="+ d.toUTCString();
   document.cookie = "domain."+encodeURIComponent(obj.name) + "=" + data + ";" + expires + ";path=/";
  };
  var loadDomain = function(data) {
   domain = JSONC.unpack(data,true);
   $('#sectionLoad').hide();
   displayDomain();
  };
  var deleteCookie = function(name){
   document.cookie=encodeURIComponent(name)+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
   getDomainList();
  };
  var getMercType = function(n,typ){
   var lst = [];
   var mercs = mercLoadout[typ];
   for(var i=0;i<n;i++) {
    var t=d(1,100);
    var x=mercs.length;
    while(t<mercs[--x][0]);
    lst.push({cost:mercs[x][2],count:10,type:mercs[x][1],away:false});
   }
   return lst;
  };
  var makeStrongholdFollowers = function(name,roll) {
   var clss=getStronghold(name);
   var mercs = [];
   if(clss.build) {
    if(clss.mercs.leader) {
     var c = d(1,6);
     for(var i=0;i<c;i++) {
      var lvl = [1,1,1,2,2,3][d(1,6)-1];
      mercs.push({cost:[25,50,100][lvl-1],count:1,type:"level "+lvl+" "+clss.name,away:false});
     }
    }
    var x=d(clss.mercs.count,clss.mercs.dice)+clss.mercs.add;
    if(roll)
     mercs = mercs.concat(getMercType(x,clss.mercs.type));
    else
     mercs.push({cost:0,count:x*10,type:clss.mercs.label,away:false});
   }

   var holder=[];
   for(var i=0;i<mercs.length;i++){
    var n=holder.findIndex(function(e){
     return e.type==mercs[i].type;
    });
    if(n<0)
     holder.push(mercs[i]);
    else
     holder[n].count += mercs[i].count;
   }

   return holder;
  };
  return {
   Initialize: init,
   Strongholds: strongholds,
   MakeStrongholdFollowers: makeStrongholdFollowers,
   ShowDomain: showDomain
  }
 }();
}(window.acks = window.acks || {}, jQuery));
