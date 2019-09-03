//Class name,book,common,name,fighter,mage,cleric,thief,barbarian,str/int/wis/dex/con/cha prime, min,%male, ???, hp die type, max level, saves, swords, axes, maces, spears, ranged, daggers, other, armor, shield, special equipment, profs
var classlist=[["Airwalker",0,2,"58",true,false,false,false,false,0,0,0,1,0,0,,,,9,,,0.50,4,4,14,2,"51525354556162",2,false,[],"Common",0,[],["Acrobatics","Alchemy","Alertness","Ambush","Arcane Dabbling","Blind Fighting","Bribery","Combat Reflexes","Combat Trickery: disarm","Combat Trickery: incapacitate","Contortionism","Disguise","Eavesdropping","Fighting Style","Gambling","Intimidation","Land Surveying","Lockpicking","Mimicry","Running","Seduction","Skirmishing","Skulking","Swashbuckling","Trap Finding","Wakefulness","Weapon Finesse","Weapon Focus"]],["Anti-Paladin",2,2,"57",true,false,false,false,false,1,0,0,0,0,1,9,,,,,9,0.50,1,6,14,1,"11121321323343616277",6,true,[],"Common",0,[],["Alertness","Ambushing","Berserkergang","Blind Fighting","Combat Reflexes","Combat Trickery: force back","Combat Trickery: incapacitate","Combat Trickery: overrun","Combat Trickery: sunder","Command","Divine Blessing","Dungeon Bashing","Endurance","Fighting Style","Intimidation","Illusion Resistance","Kin-Slaying*","Knowledge (history)","Leadership","Manual of Arms","Martial Training","Military Strategy","Mystic Aura","Profession (torturer)","Riding","Running","Theology","Weapon Focus"]],["Assassin",1,3,"567",true,false,false,false,false,1,0,0,1,0,0,9,,,9,,,0.75,1,6,14,2,"1112132122233132333435414243445152535455616271727374757677",6,false,[],"Common",0,[],["Acrobatics","Alchemy","Alertness","Arcane Dabbling","Blind Fighting","Bribery","Cat Burglary","Climbing","Combat Reflexes","Combat Trickery: disarm","Combat Trickery: incapacitate","Contortionism","Disguise","Eavesdropping","Fighting Style","Gambling","Intimidation","Mimicry","Precise Shooting","Running","Seduction","Skirmishing","Skulking","Sniping","Swashbuckling","Trap Finding","Weapon Finesse","Weapon Focus"]],["Barbarian",2,4,"89",true,false,false,false,true,1,0,0,0,1,0,9,,,,9,,0.75,1,8,14,1,"1112132122233132333435414243445152535455616271727374757677",4,true,[],"Common",0,[],["Alertness","Ambushing","Armor Training*","Beast Friendship","Berserkergang","Blind Fighting","Climbing","Combat Reflexes","Combat Trickery: force back","Combat Trickery: knock down","Combat Trickery: overrun","Combat Trickery: wrestling","Command","Endurance","Fighting Style","Martial Training","Mountaineering","Passing Without Trace","Precise Shooting","Riding","Running","Seafaring","Skirmishing","Sniping","Survival","Swashbuckling","Weapon Finesse","Weapon Focus"]],["Bard",1,4,"5678",true,false,false,false,false,0,0,0,1,0,1,,,,9,,9,0.50,4,6,14,2,"1112212331323351525354556162717273747577",2,false,[6],"Common",0,[],["Acrobatics","Art","Bargaining","Beast Friendship","Combat Trickery: disarm","Command","Diplomacy","Eavesdropping","Elven Bloodline","Fighting Style","Healing","Knowledge","Language","Leadership","Lip Reading","Magical Engineering","Magical Music","Mimicry","Mystic Aura","Performance","Precise Shooting","Prestidigitation","Running","Seduction","Skirmishing","Swashbuckling","Weapon Finesse,","Weapon Focus"]],["Bladedancer",1,2,"567",true,false,true,false,false,0,0,1,1,0,0,,,9,9,,,0.00,3,6,14,2,"11121321222343446162",2,false,[4],"Common",0,[[0,0,1]],["Acrobatics","Apostasy","Battle Magic","Beast Friendship","Combat Reflexes","Combat Trickery: disarm","Combat Trickery: trip","Contemplation","Diplomacy","Divine Blessing","Divine Health","Fighting Style","Laying on Hands","Magical Music","Martial Training","Performance","Prestidigitation","Prophecy","Quiet Magic","Righteous Turning","Running","Seduction","Skirmishing","Swashbuckling","Theology","Unflappable Casting","Weapon Finesse","Weapon Focus"]],["Cleric",1,4,"5678",false,false,false,false,false,0,0,1,0,0,0,,,9,,,,0.75,3,6,14,2,"3133357476",6,true,[4],"Common",0,[[0,0,1]],["Apostasy","Battle Magic","Beast Friendship","Combat Trickery: force back","Combat Trickery: overrun","Combat Trickery: sunder","Command","Contemplation","Diplomacy","Divine Blessing","Divine Health","Fighting Style","Healing","Knowledge (history)","Lay on Hands","Leadership","Loremastery","Magical Engineering","Martial Training","Prestidigitation","Profession (judge)","Prophecy","Quiet Magic","Righteous Turning","Sensing Evil","Sensing Power","Theology","Unflappable Casting","Weapon Focus"]],["Dwarven Craftpriest",1,3,"1",false,false,true,false,false,0,0,1,0,0,0,,,9,,9,,0.50,3,6,10,2,"21222332333435",6,true,[4,1],"Dwarven, Goblin, Gnomish, Kobold",1,[[0,0,1]],["Alchemy","Art","Battle Magic","Caving","Collegiate Wizardry","Contemplation","Craft","Diplomacy","Divine Blessing","Divine Health","Dwarven Brewing","Endurance","Engineering","Fighting Style","Goblin-Slaying","Healing","Illusion Resistance","Knowledge","Laying on Hands","Loremastery","Magical Engineering","Mapping","Performance (chanting)","Prestidigitation","Profession (judge)","Prophecy","Quiet Magic","Righteous Turning","Sensing Evil","Siege Engineering","Theology","Unflappable Casting","Weapon Focus"]],["Dwarven Delver",2,3,"1",false,false,false,true,false,0,0,0,1,0,0,,,,9,9,,0.50,4,6,11,2,"111221233132335152535455616271727374757677",2,false,[],"Dwarven, Goblin, Gnomish, Kobold",1,[],["Acrobatics","Alertness","Blind-Fighting","Cat Burglary","Combat Reflexes","Combat Trickery: disarm","Combat Trickery: knock down","Contortionism","Dungeon Bashing","Engineering","Fighting Style","Goblin-Slaying","Illusion Resistance","Mapping","Mountaineering","Navigation","Precise Shooting","Running","Siege Engineering","Signaling","Skirmishing","Skulking","Sniping","Survival","Swashbuckling","Tracking","Trap Finding","Trapping","Vermin Slaying*","Weapon Finesse","Weapon Focus"]],["Dwarven Fury",2,2,"1",true,false,false,false,false,1,0,0,0,0,0,9,,,,9,,0.50,1,8,13,1,"2122233132333435",0,false,[],"Dwarven, Goblin, Gnomish, Kobold",1,[],["Alertness","Blind Fighting","Caving","Combat Reflexes","Combat Trickery: force back","Combat Trickery: knock down","Combat Trickery: overrun","Combat Trickery: sunder","Combat Trickery: wrestle","Command","Craft","Dungeon Bashing","Dwarven Brewing","Endurance","Engineering","Fighting Style","Gambling","Goblin-Slaying","Illusion Resistance","Intimidation","Land Surveying","Leadership","Manual of Arms","Mapping","Military Strategy","Mountaineering","Siege Engineering","Vermin-Slaying*","Weapon Focus"]],["Dwarven Machinist",2,2,"16",true,false,false,false,false,0,1,0,1,0,0,,9,,9,9,,0.50,2,6,11,2,"11121323333551526162",4,true,[1,5,9],"Dwarven, Goblin, Gnomish, Kobold",1,[],["Alchemy","Armor Training*","Art","Bargaining","Caving","Craft","Dungeon Bashing","Dwarven Brewing","Engineering","Illusion Resistance","Inventing","Jury-Rigging","Knowledge","Lockpicking","Loremastery","Magical Engineering","Mapping","Martial Training","Mechanical Engineering*","Military Strategy","Navigation","Personal Automaton*","Precise Shooting","Riding","Scavenging*","Seafaring","Siege Engineering","Signaling","Tinkering*","Trap Finding","Trapping","Weapon Finesse"]],["Dwarven Sapper",0,1,"1",false,false,true,false,false,0,0,1,0,0,0,,,9,,9,,0.50,3,4,11,2,"2122233132333435",5,true,[4],"Dwarven, Goblin, Gnomish, Kobold",1,[[0,0,1]],["Acrobatics","Alertness","Ambushing","Apostasy","Battle Magic","Blind Fighting","Climbing","Combat Reflexes","Combat Trickery: disarm","Combat Trickery: incapacitate","Combat Trickery: knock down","Combat Trickery: sunder","Command","Contortionism","Craft","Divine Blessing","Dungeon Bashing","Dwarven Brewing","Eavesdropping","Elementalism","Engineering","Familiar","Goblin-Slaying","Land Surveying","Laying On Hands","Mapping","Martial Training","Mountaineering","Naturalism","Profession","Skirmishing","Survival","Trap Finding"]],["Dwarven Vaultguard",1,5,"1",true,false,false,false,false,1,0,0,0,0,0,9,,,,9,,0.50,1,8,13,1,"111221233132335152535455616271727374757677",6,true,[],"Dwarven, Goblin, Gnomish, Kobold",1,[],["Alertness","Berserkergang","Blind Fighting","Caving","Combat Reflexes","Combat Trickery: force back","Combat Trickery: knock down","Combat Trickery: overrun","Combat Trickery: sunder","Combat Trickery: wrestle","Command","Craft","Dungeon Bashing","Dwarven Brewing","Endurance","Engineering","Fighting Style","Gambling","Goblin-Slaying","Illusion Resistance","Intimidation","Land Surveying","Leadership","Mapping","Manual of Arms","Military Strategy","Mountaineering","Siege Engineering","Weapon Focus"]],["Ectomancer",0,1,"5678",false,false,true,false,false,0,0,1,0,0,0,,,9,,,,0.50,3,4,14,2,"11121351525354556162",4,true,[3],"Common",0,[[0,0,1]],["Alchemy","Battle Magic","Beast Friendship","Black Lore of Zahar","Collegiate Wizardry","Craft","Diplomacy","Elementalism","Elven Bloodline","Engineering","Familiar","Healing","Illusion Resistance","Knowledge","Language","Loremastery","Magical Engineering","Mapping","Mystic Aura","Naturalism","Quiet Magic","Performance","Prestidigitation","Profession","Sensing Power","Transmogrification","Soothsaying","Unflappable Casting"]],["Elven Courtier",2,1,"2",false,false,false,false,false,0,1,0,0,0,1,,9,,,,9,0.50,2,6,12,2,"11124144536162",4,true,[7],"Elven, Gnoll, Hobgoblin, Orc",1,[[1,1,0.5]],["Beast Friendship","Bribery","Combat Trickery: Disarm","Combat Trickery: sunder","Command","Eavesdropping","Familiar","Fighting Style","Healing","Knowledge (political history)","Laying on Hands","Leadership","Loremastery","Magical Engineering","Military Strategy","Mystic Aura","Naturalism","Passing Without Trace","Performance","Precise Shooting","Prestidigitation","Profession (seneschal)","Quiet Magic","Riding","Sensing Power","Skirmishing","Swashbuckling","Unflappable Casting","Wakefulness","Weapon Finesse","Weapon Focus"]],["Elven Enchanter",2,2,"2",false,true,false,false,false,0,1,0,0,0,1,,9,,,,9,0.25,2,4,12,3,"6162727476",0,false,[7],"Elven, Gnoll, Hobgoblin, Orc",1,[[1,1,1]],["Alchemy","Alertness","Art","Beast Friendship","Collegiate Wizardry","Contortionism","Craft","Diplomacy","Disguise","Familiar","Healing","Illusion Resistance","Knowledge","Language","Loremastery","Magical Engineering","Magical Music","Mimicry","Naturalism","Passing Without Trace","Performance","Profession","Quiet Magic","Running","Sensing Power","Soothsaying","Swashbuckling","Transmogrification","Unflappable Casting","Wakefulness"]],["Elven Nightblade",1,2,"2",false,false,false,true,false,0,1,0,1,0,0,,9,,9,,,0.50,2,6,11,2,"111221233132335152535455616271727374757677",2,false,[7],"Elven, Gnoll, Hobgoblin, Orc",1,[[1,1,0.5]],["Alchemy","Alertness","Arcane Dabbling","Battle Magic","Beast Friendship","Black Lore of Zahar","Blind Fighting","Combat Reflexes","Combat Trickery: incapacitate","Contortionism","Elementalism","Familiar","Fighting Style","Intimidation","Magical Engineering","Mystic Aura","Passing Without Trace","Precise Shooting","Prestidigitation","Quiet Magic","Running","Sensing Power","Skirmishing","Skulking","Sniping","Swashbuckling","Unflappable Casting","Trap Finding","Wakefulness","Weapon Focus","Weapon Finesse"]],["Elven Polydoctorate",0,1,"2",false,true,true,false,false,0,1,1,0,0,0,,9,9,,,,0.50,2,4,12,3,"72747677",0,false,[7,7,3],"Elven, Gnoll, Hobgoblin, Orc",1,[[0,0,1],[2,1,1],[1,1,0.5]],["Battle Magic","Beast Friendship","Black Lore of Zahar","Contemplation","Craft","Diplomacy","Elementalism","Elven Bloodline","Engineering","Familiar","Healing","Illusion Resistance","Knowledge","Language","Mapping","Mystic Aura","Naturalism","Performance: Dramatic Reading","Profession: Librarian","Prestidigitation","Profession","Read Languages","Research Desk*","Sensing Power","Soothsaying","Theology","Transmogrification","Unflappable Casting","Wakefulness"]],["Elven Ranger",2,4,"2",true,false,false,false,false,1,0,0,1,0,0,9,9,,9,,,0.75,1,6,13,1,"1112132122233132333435414243445152535455616271727374757677",6,true,[],"Elven, Gnoll, Hobgoblin, Orc",1,[],["Alertness","Ambushing","Animal Husbandry","Blind Fighting","Climbing","Combat Trickery: disarm","Combat Trickery: incapacitate","Combat Trickery: knock down","Eavesdropping","Endurance","Fighting Style","Land Surveying","Mapping","Mountaineering","Naturalism","Navigation","Passing Without Trace","Precise Shooting","Riding","Running","Skirmishing","Sniping","Survival","Swashbuckling","Tracking","Trapping","Wakefulness","Weapon Finesse","Weapon Focus"]],["Elven Spellsword",1,3,"2",true,true,false,false,false,1,1,0,0,0,0,9,9,,,,,0.75,1,6,10,1,"1112132122233132333435414243445152535455616271727374757677",6,true,[7],"Elven, Gnoll, Hobgoblin, Orc",1,[[1,1,1]],["Acrobatics","Alertness","Battle Magic","Beast Friendship","Black Lore of Zahar","Blind Fighting","Combat Reflexes","Combat Trickery: disarm","Combat Trickery: knock down","Command","Elementalism","Familiar","Fighting Style","Leadership","Loremastery","Magical Engineering","Magical Music","Mystic Aura","Naturalism","Passing Without Trace","Quiet Magic","Precise Shooting","Prestidigitation","Running","Sensing Power","Skirmishing","Soothsaying","Swashbuckler","Unflappable Casting","Wakefulness","Weapon Focus","Weapon Finesse"]],["Explorer",1,4,"56789",true,false,false,false,false,1,0,0,1,0,0,9,,,9,,,0.75,1,6,14,1,"111221233132335152535455616271727374757677",4,true,[],"Common",0,[],["Alertness","Ambushing","Beast Friendship","Blind Fighting","Climbing","Combat Reflexes","Combat Trickery: disarm","Combat Trickery: knock down","Eavesdropping","Endurance","Fighting Style","Land Surveying","Mapping","Mountaineering","Naturalism","Navigation","Passing Without Trace","Precise Shooting","Riding","Running","Seafaring","Skirmishing","Sniping","Survival","Swashbuckling","Trapping","Weapon Finesse","Weapon Focus"]],["Fighter",1,5,"5678",true,false,false,false,false,1,0,0,0,0,0,9,,,,,,0.50,1,8,14,1,"1112132122233132333435414243445152535455616271727374757677",6,true,[],"Common",0,[],["Acrobatics","Alertness","Berserkergang","Blind Fighting","Combat Reflexes","Combat Trickery: disarm","Combat Trickery: force back","Combat Trickery: knock down","Combat Trickery: overrun","Combat Trickery: sunder","Command","Dungeon Bashing","Endurance","Fighting Style","Gambling","Intimidation","Leadership","Manual of Arms","Military Strategy","Precise Shooting","Riding","Running","Siege Engineering","Skirmishing","Survival","Swashbuckling","Weapon Finesse","Weapon Focus"]],["Gnomish Beastmaster",0,2,"3",true,false,false,false,false,0,0,0,0,0,1,,,,,9,9,0.50,6,6,11,1,"43515253557677",4,false,[],"Gnomish, Dwarven, Elven, Goblin, Kobold",1,[],["Alertness","Ambush","Bargaining","Beast Friendship","Blind Fighting","Bribery","Caving","Combat Reflexes","Combat Trickery: disarm","Combat Trickery: incapacitate","Diplomacy","Disguise","Familiar","Fighting Style","Gambling","Goblin-Slaying","Land Surveying","Magical Music","Mimicry","Mystic Aura","Passing Without Trace","Precise Shooting","Riding","Skirmishing","Sniping","Trap Finding","Trapping","Wakefulness","Weapon","Finesse","Weapon Focus"]],["Gnomish Librarian",0,1,"3",false,true,false,false,false,0,1,0,0,0,0,,9,,,9,,0.50,2,4,14,3,"72747677",0,false,[7],"Gnomish, Dwarven, Elven, Goblin, Kobold",1,[[2,1,1]],["Apostasy","Armor Training","Battle Magic","Beast Friendship","Black Lore of Zahar","Contemplation","Craft","Diplomacy","Elementalism","Elven Bloodline","Engineering","Familiar","Healing","Inherently Funny","Knowledge","Language","Mapping","Mystic Aura","Naturalism","Performance: Dramatic Reading","Profession: Librarian","Prestidigitation","Read Languages","Research Desk*","Sensing Power","Soothsaying","Theology","Transmogrification","Unflappable Casting","Wakefulness"]],["Gnomish Mage",0,1,"3",false,true,false,false,false,0,1,0,0,0,0,,9,,,9,,0.50,2,4,11,3,"3161627276",0,false,[7],"Gnomish, Dwarven, Elven, Goblin, Kobold",1,[[1,1,1]],["Alchemy","Battle Magic","Beast Friendship","Black Lore of Zahar","Collegiate Wizardry","Craft","Diplomacy","Elementalism","Elven Bloodline","Engineering","Familiar","Healing","Illusion Resistance","Knowledge","Language","Loremastery","Magical Engineering","Mapping","Mystic Aura","Naturalism","Quiet Magic","Performance","Prestidigitation","Profession","Sensing Power","Transmogrification","Soothsaying","Unflappable Casting","Wakefulness"]],["Gnomish Trickster",2,3,"3",true,false,false,true,false,0,0,0,0,1,1,,9,,,9,9,0.50,5,6,12,1,"1135515253556162",2,true,[7],"Gnomish, Dwarven, Elven, Goblin, Kobold",1,[[1,1,0.5]],["Bargaining","Beast Friendship","Blind Fighting","Bribery","Caving","Combat Trickery: disarm","Combat Trickery: incapacitate","Diplomacy","Disguise","Eavesdropping","Familiar","Fighting Style","Gambling","Goblin-Slaying","Loremastery","Magical Engineering","Magical Music","Mimicry","Mystic Aura","Passing Without Trace","Precise Shooting","Quiet Magic","Running","Sensing Power","Skirmishing","Sniping","Swashbuckling","Trapping","Unflappable Casting","Weapon Finesse"]],["Librarian Guard",0,2,"56",false,true,false,false,false,0,1,0,0,0,0,,9,,,,,0.50,2,6,14,3,"31323334356162",6,true,[7],"Common",0,[[2,1,1]],["Battle Magic","Beast Friendship","Black Lore of Zahar","Contemplation","Craft","Diplomacy","Elementalism","Elven Bloodline","Engineering","Familiar","Healing","Illusion Resistance","Knowledge","Language","Mapping","Mystic Aura","Naturalism","Performance: Dramatic Reading","Profession: Librarian","Prestidigitation","Profession","Read Languages","Research Desk*","Sensing Power","Soothsaying","Theology","Transmogrification","Unflappable Casting","Wakefulness"]],["Mage",1,4,"57",false,true,false,false,false,0,1,0,0,0,0,,9,,,,,0.50,2,4,14,3,"3161627276",0,false,[7],"Common",0,[[1,1,1]],["Alchemy","Battle Magic","Beast Friendship","Black Lore of Zahar","Collegiate Wizardry","Craft","Diplomacy","Elementalism","Elven Bloodline","Engineering","Familiar","Healing","Illusion Resistance","Knowledge","Language","Loremastery","Magical Engineering","Mapping","Mystic Aura","Naturalism","Quiet Magic","Performance","Prestidigitation","Profession","Sensing Power","Transmogrification","Soothsaying","Unflappable Casting"]],["Mystic",2,2,"56789",true,false,false,false,false,0,0,1,1,1,1,,,9,9,9,9,0.50,3,6,14,1,"111232434454727677",0,false,[],"Common",0,[],["Acrobatics","Arcane Dabbling","Beast Friendship","Blind Fighting","Climbing","Combat Trickery: force back","Combat Trickery: incapacitate","Combat Trickery: knock down","Combat Trickery: overrun","Combat Trickery: wrestle","Command","Contortionism","Eavesdropping","Endurance","Fighting Style","Illusion Resistance","Laying on Hands","Lip Reading","Passing Without Trace","Performance","Precise Shooting","Running","Skirmishing","Swashbuckling","Unarmed Fighting*","Wakefulness","Weapon Finesse","Weapon Focus"]],["Nobiran Mystic",0,1,"5",true,false,false,false,false,0,0,1,1,1,1,11,11,11,11,11,11,0.50,3,6,14,1,"111232434454727677",0,false,[],"Common",0,[],["Acrobatics","Arcane Dabbling","Beast Friendship","Blind Fighting","Climbing","Combat Trickery: force back","Combat Trickery: incapacitate","Combat Trickery: knock down","Combat Trickery: overrun","Combat Trickery: wrestle","Command","Contortionism","Eavesdropping","Endurance","Fighting Style","Illusion Resistance","Laying on Hands","Lip Reading","Passing Without Trace","Performance","Precise Shooting","Running","Skirmishing","Swashbuckling","Unarmed Fighting*","Wakefulness","Weapon Finesse","Weapon Focus"]],["Nobiran Wonderworker",2,1,"5",false,true,true,false,false,0,1,1,0,0,0,11,11,11,11,11,11,0.50,2,4,12,3,"3161627276",0,false,[7],"Common",0,[[0,0,1],[1,1,1]],["Apostasy","Battle Magic","Beast Friendship","Collegiate Wizardry","Command","Contemplation","Craft","Diplomacy","Elementalism","Familiar","Healing","Illusion Resistance","Knowledge","Language","Laying on Hands","Leadership","Loremastery","Magical Engineering","Martial Training","Mystic Aura","Naturalism","Prestidigitation","Profession","Prophecy","Quiet Magic","Sensing Evil","Sensing Power","Theology","Transmogrification","Unflappable Casting"]],["Paladin",2,3,"5678",true,false,false,false,false,1,0,0,0,0,1,9,,,,,9,0.50,1,6,14,1,"11132132333435414344",6,true,[4],"Common",0,[],["Alertness","Blind Fighting","Combat Reflexes","Combat Trickery: force back","Combat Trickery: incapacitate","Combat Trickery: overrun","Combat Trickery: sunder","Command","Diplomacy","Divine Blessing","Dungeon Bashing","Endurance","Fighting Style","Goblin-Slaying*","Healing","Illusion Resistance","Knowledge (history)","Laying on Hands","Leadership","Manual of Arms","Martial Training","Military Strategy","Mystic Aura","Profession (judge)","Riding","Running","Theology","Weapon Focus"]],["Priestess",2,2,"568",false,false,true,false,false,0,0,1,0,0,1,,,9,,,9,0.00,3,4,14,2,"3161627276",0,false,[4],"Common",0,[[0,0,1.5]],["Alchemy","Animal Husbandry","Apostasy","Arcane Dabbling","Beast Friendship","Contemplation","Diplomacy","Divine Blessing","Divine Health","Healing","Illusion Resistance","Knowledge","Laying on Hands","Loremastery","Magical Engineering","Magical Music","Mystic Aura","Naturalism","Performance","Prestidigitation","Profession","Prophecy","Quiet Magic","Righteous Turning","Sensing Evil","Sensing Power","Theology","Unflappable Casting"]],["Shaman",2,2,"689",false,false,true,false,true,0,0,1,0,0,0,,,9,,,,0.50,3,6,14,2,"11233144616276",2,true,[],"Common",0,[[0,0,1]],["Animal Husbandry","Animal Training","Apostasy","Battle Magic","Beast Friendship","Berserkergang","Command","Diplomacy","Divine Blessing","Divine Health","Elementalism","Fighting Style","Healing","Laying on Hands","Leadership","Loremastery","Magical Engineering","Magical Music","Naturalism","Passing Without Trace","Prestidigitation","Quiet Magic","Sensing Evil","Sensing Power","Theology","Tracking","Unflappable Casting","Weapon Focus"]],["Skinscribe",0,3,"7",false,true,false,false,false,0,1,0,0,0,0,,9,,,,,0.75,2,4,14,3,"3161627276",0,false,[],"Common",0,[[1,1,1]],["Alchemy","Battle Magic","Beast Friendship","Black Lore of Zahar","Collegiate Wizardry","Craft","Diplomacy","Elementalism","Elven Bloodline","Engineering","Familiar","Healing","Illusion Resistance","Knowledge","Language","Loremastery","Magical Engineering","Mapping","Mystic Aura","Naturalism","Performance","Prestidigitation","Profession","Sensing Power","Soothsaying","Swashbuckling","Transmogrification","Unflappable Casting"]],["Spy",0,1,"5678",false,false,false,true,false,0,0,0,0,0,1,,,,,,9,0.50,6,4,14,2,"111251525354556162",2,false,[8],"Common",0,[],["Alertness","Ambushing","Arcane dabbling","Bribery","Cat burglar","Climbing","Combat reflexes","Combat trickery","Command","Fighting style","Gambling","Lip Reading","Loremastery","Magical Engineering","Passing without Trace","Precise Shooting","Prestidigitation","Running","Seduction","Skirmishing","Skulking","Sniping","Swashbuckling","Trap finding","Unarmed Fighting","Wakefulness","Weapon finesse","Weapon focus"]],["Thief",1,4,"5678",false,false,false,true,false,0,0,0,1,0,0,,,,9,,,0.50,4,4,14,2,"1112212331323351525354556162717273747577",2,false,[8],"Common",0,[],["Acrobatics","Alertness","Arcane Dabbling","Blind Fighting","Bribery","Cat Burglary","Combat Reflexes","Combat Trickery: disarm","Combat Trickery: incapacitate","Contortionism","Diplomacy","Fighting Style","Gambling","Intimidation","Lip Reading","Lockpicking","Mapping","Precise Shooting","Riding","Running","Seafaring","Skirmishing","Skulking","Sniping","Swashbuckling","Trap Finding","Weapon Finesse","Weapon Focus"]],["Thrassian Assassin",0,1,"4",true,false,false,false,true,1,0,0,0,0,0,9,,,9,9,,0.65,1,8,11,1,"71737577",4,true,[],"Thrassian",0,[],["Alertness","Ambushing","Armor Training","Berserkergang","Blind Fighting","Climbing","Combat Reflexes","Combat Trickery: disarm","Combat Trickery: force back","Combat Trickery: incapacitate","Combat Trickery: knock down","Combat Trickery: overrun","Combat Trickery: sunder","Command","Dungeon Bashing","Endurance","Gambling","Goblin-Slaying","Intimidation","Kin-Slaying","Manual of Arms","Martial Training","Running","Skirmishing","Survival","Swashbuckling","Wakefulness","Weapon Finesse","Weapon Focus"]],["Thrassian Gladiator",2,4,"4",true,false,false,false,true,1,0,0,0,0,0,9,,,9,9,,0.50,1,8,11,1,"1112132122233132333435414243445152535455616271727374757677",6,true,[],"Common",0,[],["Acrobatics","Alertness","Ambushing","Animal Training","Beast Friendship","Berserkergang","Blind Fighting","Climbing","Combat Reflexes","Combat Trickery: disarm","Combat Trickery: force back","Combat Trickery: incapacitate","Combat Trickery: knock down","Combat Trickery: overrun","Combat Trickery: sunder","Command","Dungeon Bashing","Endurance","Fighting Style","Gambling","Intimidation","Kin-Slaying*","Manual of Arms","Precise Shooting","Running","Skirmishing","Survival","Swashbuckling","Wakefulness","Weapon Finesse","Weapon Focus"]],["Venturer",2,3,"567",false,false,false,false,false,0,0,0,0,0,1,,,,,,9,0.50,6,4,14,2,"111221233132335152535455616271727374757677",2,false,[7],"Common",0,[],["Alertness","Ambushing","Arcane Dabbling","Bargaining","Climbing","Combat Reflexes","Combat Trickery: disarm","Combat Trickery: incapacitate","Command","Gambling","Intimidation","Language","Leadership","Lip Reading","Magical Engineering","Mapping","Mountaineering","Navigation","Passing Without Trace","Precise Shooting","Profession","Riding","Running","Seafaring","Signaling","Skirmishing","Swashbuckling","Weapon Finesse"]],["Warlock",2,1,"567",false,true,false,false,false,0,1,0,0,0,0,,9,,,,,0.50,2,4,14,3,"6162727677",0,false,[7],"Common",0,[[1,1,2/3]],["Alchemy","Battle Magic","Beast Friendship","Collegiate Wizardry","Contemplation","Craft","Diplomacy","Divine Blessing","Elementalism","Elven Bloodline","Engineering","Healing","Illusion Resistance","Knowledge","Language","Loremastery","Magical Engineering","Mapping","Mystic Aura","Naturalism","Performance","Prestidigitation","Profession","Quiet Magic","Sensing Power","Soothsaying","Transmogrification","Unflappable Casting"]],["White Mage",0,1,"5678",false,true,false,false,false,0,0,1,0,0,0,,,9,,,,0.25,3,6,14,2,"71747576",6,true,[7],"Common",0,[[0,1,1]],["Alchemy","Apostasy","Battle Magic","Beast Friendship","Command","Contemplation","Diplomacy","Divine Health","Elementalism","Elven Bloodline","Familiar","Illusion Resistance","Language","Laying on Hands","Leadership","Loremastery","Magical Engineering","Mystic Aura","Naturalism","Prestidigitation","Prophecy","Quiet Magic","Sensing Evil","Sensing Power","Theology","Transmogrification","Unflappable Casting","Wakefulness"]],["Witch",2,3,"679",false,true,false,false,false,0,0,1,0,0,1,,,9,,,9,0.00,3,4,14,2,"31616277727776",0,false,[],"Common",0,[[0,0,1]],["Alchemy","Apostasy","Arcane Dabbling","Beast Friendship","Black Lore of Zahar","Contemplation","Craft","Divine Blessing","Divine Health","Elementalism","Elven Bloodline","Familiar","Healing","Illusion Resistance","Laying on Hands","Loremastery","Magical Engineering","Magical Music","Mystic Aura","Naturalism","Prestidigitation","Prophecy","Quiet Magic","Seduction","Sensing Power","Theology","Transmogrification","Unflappable Casting"]],["Wolfwere",0,1,"49",true,false,false,false,true,1,0,0,1,0,0,9,,,9,,,0.50,1,6,09,1,"111213212223313233343541424344616271727374757677",1,false,[],"Common",0,[],["Acrobatics","Ambushing","Animal Husbandry","Animal Training","Blind fighting","Combat reflexes","Combat trickery","Command","Contortionism","Disguise","Divine Health","Dungeon Bashing","Eavesdropping","Endurance","Familiar","Fighting style","Goblin-slaying","Healing","Knowledge (nature)","Land surveying","Lip Reading","Martial Training","Mystic aura","Passing without trace","Quiet Magic","Running","Skirmishing","Skulking","Survival","Swashbuckling","Unflappable Casting","Vermin-slaying","Wakefulness"]],["Zaharan Ruinguard",2,3,"7",true,false,false,false,false,1,1,0,0,0,0,9,9,9,,,9,0.50,1,6,12,3,"111321223277",6,true,[],"Ancient Zaharan, Goblin, Orc, Kemeshi",1,[[1,1,0.5]],["Alertness","Ambushing","Battle Magic","Berserkergang","Black Lore of Zahar","Blind Fighting","Combat Trickery: force back","Combat Trickery: knock down","Combat Trickery: overrun","Combat Trickery: sunder","Command","Dungeon Bashing","Elementalism","Endurance","Familiar","Fighting Style","Intimidation","Kin-Slaying*","Leadership","Manual of Arms","Military Strategy","Mystic Aura","Sensing Good","Sensing Power","Siege Engineering","Skirmishing","Theology","Unflappable Casting","Wakefulness","Weapon Focus"]]];

var general=["Adventuring","Alchemy","Animal Husbandry","Animal Training","Art","Bargaining","Caving","Collegiate Wizardry","Craft","Diplomacy","Disguise","Endurance","Engineering","Gambling","Healing","Intimidation","Knowledge","Labor","Language","Leadership","Lip Reading","Manual of Arms","Mapping","Military Strategy","Mimicry","Naturalism","Navigation","Performance","Profession","Riding","Seafaring","Seduction","Siege Engineering","Signaling","Survival","Theology","Tracking","Trapping"];
var proficiencies = [[1,1,1,1,2,2,2,2,3,3,3,3,4,4],[1,1,2,2,2,3,3,3,4,4,4,5,5,5],[1,1,1,2,2,2,2,3,3,3,3,4,4,4],[1,1,1,1,1,2,2,2,2,2,2,3,3,3]];
var equipment=[["Short Sword","Sword","Two-Handed Sword"],["Battle Axe","Great Axe","Hand Axe"],["Club","Flail","Mace","Morning Star","War Hammer"],["Lance","Javelin","Pole Arm","Spear"],["Arbalest","Crossbow","Composite Bow","Longbow","Shortbow"],["Dagger","Silver Dagger"],["Bola","Darts (5)","Net","Sling","Sap","Staff","Whip"],["No Armor","Hide and Fur Armor","Leather Armor","Ring Mail/Scale Armor","Chain Mail","Banded Plate/Lamellar","Plate Armor","Shield"],["<span class='icon req1' title='Craftsman’s Tools'><span>Craftsman’s Tools</span></span>","<span class='icon req2' title='Craftsman’s Workshop'><span>Craftsman’s Workshop</span></span>","<span class='icon req3' title='Holy Book'><span>Holy Book</span></span>","<span class='icon req4' title='Holy Symbol'><span>Holy Symbol</span></span>","<span class='icon req5' title='Machinist’s Tools'><span>Machinist’s Tools</span></span>","<span class='icon req6' title='Musical instrument'><span>Musical instrument</span></span>","<span class='icon req7' title='Spell Book'><span>Spell Book</span></span>","<span class='icon req8' title='Thieves’ Tools'><span>Thieves’ Tools</span></span>","<span class='icon req9' title='Automaton'><span>Automaton</span></span>"],["Ale/Beer (1 pint)","Backpack","Belladonna (1lb)","Birthwort (1lb)","Blanket (wool, thick)","Candle (tallow, 1lb)","Candle (wax, 1lb)","Comfrey (1lb)","Crowbar","Dice (pair)","Dice (pair, crooked)","Flask of Oil (common, 1 pint)","Flask of Oil (military, 1 pint)","Garlic (1lb)","Goldenrod (1lb)","Grappling Hook","Hammer (small)","Holy Water (1 pint)","Ink (1 oz.)","Iron Spikes (12)","Journal","Lantern","Lock","Manacles","Mirror (hand-sized, steel)","Mirror (thieves', glass)","Pole (10')","Pouch/Purse","Rations (Iron)","Rations (Standard)","Rope","Sack (large)","Sack (small)","Stakes (4) and Mallet","Tent","Tinder Box (flint & steel)","Torches (6)","Water/Wine Skin","Wolfsbane (1lb)","Woundwart (1lb)"]];
var coin='';

(function (acks, $) {
 acks.NPCGenerator = function () {
  var init = function() {
   var dirs=[$('#dvCust .classholder'),$('#dvCore .classholder'),$('#dvPHB .classholder')];
   for(var i=0;i<classlist.length;i++) {
    var x=classlist[i];
    var str = "<div count='"+i+"'><label class='"+(x[4]?'fighter ':'')+(x[5]?'mage ':'')+(x[6]?'cleric ':'')+(x[7]?'thief ':'')+(x[8]?'barbarian ':'') + "'><input type='checkbox' checked='true' />"+classlist[i][0]+"</label> <input type='textbox' value='"+x[2]+"' /></div>";
    dirs[x[1]].append($(str));
   }
   $('#radios input,#chkCore,#chkPHB,#chkCust').checkboxradio({icon: false});
   $('#chkCore,#chkPHB,#chkCust').parent().removeClass('ui-corner-all').addClass('ui-corner-left');
   $('#chkForceCore,#chkForcePHB,#chkForceCust').checkboxradio({icon: false}).parent().removeClass('ui-corner-all').addClass('ui-corner-right').prop('title','With "Lock" checked, the classes in this section will remain as they are, even if a mass select button above is pressed (for instance, "All" or "Mages").');
   $('radAll').prop('title','Select all classes');
   $('radFigt').prop('title','Select all fighter classes');
   $('radMage').prop('title','Select all mage classes');
   $('radCler').prop('title','Select all cleric classes');
   $('radThief').prop('title','Select all thief classes');
   $('radBarb').prop('title','Select all barbarian classes');
   $('radSelect').prop('title','Manually select classes');
   $('.classholder input[type=textbox]').prop('title','Selection weight; the higher the value, the more lickly this class will be randomly selected.');

   $('#chkCore,#chkPHB,#chkCust').click(function(){
    $(this).parent().parent().find('.classholder input[type=checkbox]').prop("checked",$(this).prop("checked")).change();
    $(this).parent().parent().find('.classholder input[type=textbox]').prop('disabled',!$(this).prop("checked"));
   });
   $('#radios input').click(function(){
    var lock=[$('#chkForceCore').prop('checked'),$('#chkForcePHB').prop('checked'),$('#chkForceCust').prop('checked')];
    if($(this).prop('id')=='radAll') {
     if(!lock[0])
      $('#dvCore .classholder label input').prop('checked',true).change();
     if(!lock[1])
      $('#dvPHB .classholder label input').prop('checked',true).change();
     if(!lock[2])
      $('#dvCust .classholder label input').prop('checked',true).change();
    } else if($(this).prop('id') != 'radSelect') {
     var clss = $(this).attr('myclass');

     if(!lock[0]) {
      $('#dvCore label input').prop('checked',false).change();
      $('#dvCore label.'+clss+' input').prop('checked',true);
      $('#dvCore label.'+clss).next().prop('disabled',false);
     }
     if(!lock[1]) {
      $('#dvPHB label input').prop('checked',false).change();
      $('#dvPHB label.'+clss+' input').prop('checked',true);
      $('#dvPHB label.'+clss).next().prop('disabled',false);
     }
     if(!lock[2]) {
      $('#dvCust label input').prop('checked',false).change();
      $('#dvCust label.'+clss+' input').prop('checked',true);
      $('#dvCust label.'+clss).next().prop('disabled',false);
     }
     $('#dvCore input,#dvPHB input,#dvCust input').change();
    }
    $('.classholder input[type="checkbox"]:checked').parent().siblings().prop('disabled',false);
    $('.classholder input[type="checkbox"]:not(:checked)').parent().siblings().prop('disabled',true);
    $('#chkCore,#chkPHB,#chkCust').each(function(){
     var master = $(this).closest('#dvCore,#dvPHB,#dvCust');
     if(master.find('.classholder input[type="checkbox"]').length==master.find('.classholder input[type="checkbox"]:checked').length)
      $(this).prop('checked',true).change();
     else
      $(this).prop('checked',false).change();
    });
   });
   $('input[type="checkbox"]').click(function(){
    if(!$('#radSelect').prop('checked'))
     $('#radSelect').prop('checked',true).change();
    $(this).parent().next().prop('disabled',!$(this).prop('checked'));
    var master = $(this).closest('#dvCore,#dvPHB,#dvCust');
    var box = master.find('#chkCore,#chkPHB,#chkCust');
    if(master.find('.classholder input[type="checkbox"]').length==master.find('.classholder input[type="checkbox"]:checked').length)
     $(box).prop('checked',true).change();
    else
     $(box).prop('checked',false).change();
   });
   $('#chkCount').click(function(){
    $("#txtCount").prop('disabled',$(this).prop('checked'));
   });
   $('#chkLanguageDIY').click(function(){
    languages=($('#chkLanguageDIY').prop('checked')?languagesMine:languagesDefault);
   });

   $('#chkLibrarian').click(function(){
    scrollType=($('#chkLibrarian').prop('checked')?scrollTypeMine:scrollTypeDefault);
   });
   $('#btnGo').button().click(function(){
    var count = $('#txtCount').val();
    if($('#chkCount').prop('checked'))
     count=rand(3,6);
    var available = [];
    $(".classholder>div").each(function(){
     if($(this).find('input[type=checkbox]').prop('checked'))
      available.push([$(this).attr('count')*1,$(this).children('input').val()*1]);
    });
    generateNPCs(available,count,$('#txtLvl').val(),$('#chkVary').prop('checked'),$('#chkReplace').prop('checked'),$('#chkAlign').prop('checked'),$('#chkAlignRespect').prop('checked'),$('#chkName').prop('checked'),$('#chkStats').prop('checked'),$('#chkWeapons').prop('checked'),$('#chkReq').prop('checked'),$('#chkEquip').prop('checked'),$('#chkMagic').prop('checked'),$('#chkMoney').prop('checked'),$('#chkProfs').prop('checked'),$('#chkLanguage').prop('checked'),$('#chkSpellbook').prop('checked'));
    $('#btnPDF').show();
   });

   $('input[name="radShow"]').change(function(){
    if($('#radShowIcon').prop('checked')) {
     $('.icon').removeClass('noicon');
     $('.icon').addClass('notext');
    } else if($('#radShowText').prop('checked')) {
     $('.icon').removeClass('notext');
     $('.icon').addClass('noicon');
    } else {
     $('.icon').removeClass('noicon');
     $('.icon').removeClass('notext');
    }
   });

   $.get("/img/icons/delapouite/originals/svg/ffffff/transparent/two-coins.svg",function(data){coin=$(data).children('svg');});

   $('#btnPDF').button().hide().click(function(){
    acks.makePDF.NewWindow();
    //var result=acks.makePDF.Embed();
    //var obj=$('<object id="pdf" data="" type=application/pdf></object>');
    //$('#results').prepend(obj);
    //$('#pdf').attr('data', result);
   });
  };
  var generateNPCs = function (list,count,lvl,vary,replace,align,align2, name,stats,weapons,req,misc,magic,money,profs,lang,book){
   var newlist=[];
   var alignment=-1;
   var alignments=['<span class="icon lawful" title="Lawful characters actively build up civilization"><span>Lawful</span></span>','<span class="icon neutral" title="Neutral characters are happy to reap the benefits of civilization, without doing much to help or harm."><span>Neutral</span></span>','<span class="icon chaotic" title="Chaotic characters actively seek to tear down civilization."><span>Chaotic</span></span>'];

   if(align) {
    alignment=[0,0,1,1,1,2][rand(0,5)];
    if(align2) {
     var pal=-1;
     var anti=-1;
     var ruin=-1;
     for(var i=0; i<list.length;i++) {
      if(list[i][0]==1)
       anti=i;
      if(list[i][0]==31)
       pal=i;
      if(list[i][0]==44)
       ruin=i;
     }
     if(alignment>0)
      if(pal>-1)
       list.splice(pal,1);
     if(alignment==0)
      if(ruin>-1)
       list.splice(ruin,1);
     if (alignment<2)
      if(anti>-1)
       list.splice(anti,1);
    }
   }
   while(list.length>0) {
    while(list[0][1]-->0)
     newlist.push(list[0][0]);
    list.shift();
   }
   var result = $("<div id='results'><p>Total: "+count+" NPCs</p></div>");
   if(align)
    result.children().append(", alignment "+alignments[alignment]);
   for(var i=0;i<count;i++) {
    var level=lvl;
    if(vary)
     switch(rand(1,6)){
      case 1:
       level-=2;
       break;
      case 2:
       level--;
       break;
      case 5:
       level++;
       break;
      case 6:
       level+=2;
       break;
      default:
     }
    if(replace && i>1 && level>2 && rand(1,100)<=25) {
     result.append(makeChar(count+'a',newlist,level-2,vary,replace,name,stats,weapons,req,misc,magic,money,profs,lang,book));
     result.append(makeChar(count+'b',newlist,level-2,vary,replace,name,stats,weapons,req,misc,magic,money,profs,lang,book));
    } else
     result.append(makeChar(count,newlist,level,vary,replace,name,stats,weapons,req,misc,magic,money,profs,lang,book));
   }
   $('#generated').html('').append(result);
   $('.cp,.sp,.ep,.gp,.pp').append(coin);
   $('input[name="radShow"]').change();
  };

  var makeChar = function (count,newlist,lvl,vary,replace,name,stats,weapons,req,misc,magic,money,profs,lang,book) {
   var div = $("<div id='npc"+count+"' class='npc'></div>");
   var idx = newlist[rand(0,newlist.length-1)];
   var npc = classlist[idx];
   var level=lvl;
   if(level>npc[24])
    level=npc[24];
   if(name) {
    var sex=rand(1,100)<100*npc[21];
    div.append('<p class="pname">'+acks.NameGen.Create(npc[3].charAt(rand(0,npc[3].length-1)),sex)+' (<span class="icon '+(sex?'sexmale':'sexfemale') +'" title="'+(sex?'Male':'Female')+'"><span>'+(sex?'Male':'Female') + ', </span></span>level '+level+' ' + npc[0] + ')</p>');
   } else {
    div.append('<p>Level '+level+' '+npc[0]+'</p>');
   }
   var intbonus = 0;
   var hp=0;
   if(stats) {
    var mystats = statGen(npc.slice(9,15),npc.slice(15,21));
    intbonus = mystats[2][1]*1;
    var conbonus = mystats[2][4]*1;
    var str = "";
    for(var j=0;j<6;j++)
     str+=', '+mystats[0][j]+': '+mystats[1][j]+' ('+mystats[2][j]+')';
    var hp=npc[23]+conbonus;
    if(hp<1)
     hp=1;
    for(var i=1;i<level;i++) {
     var h=conbonus+rand(1,npc[23]);
     if(h<1)
      h=1;
     hp+=h;
    }
    div.append('<p class="pstats">'+str.substring(2)+'<br /><span class="icon health" title="Health"></span>\n'+hp+' HP</p>');
   }
   if(weapons || req || misc || magic || money){
    var carry=", , ";
    if(weapons) {
     carry+=', <span class="icon armor" title="Armor"></span>'+equipment[7][npc[27]]+' (AC '+npc[27]+')';
     if(npc[28])
      carry+=', <span class="icon shield" title="Shield">Shield</span>';
     var weap=getWeapons(npc[26]);
     if(weap!='')
      carry+=', <span class="icon weapons" title="Weapons"></span>'+weap;
    }
    if(req)
     carry+=', '+getRequired(npc[29]);
    if(misc) {
     var str=getMiscEquipment(100).substring(2);
     if(str)
      carry+=', <span class="icon equipment" title="Equipment"></span>'+str;
    }
    if(magic || money)
     carry+=', '+getTreasure(money,magic,level,npc[24]);
    carry=(', '+carry+', ').replace(/(, )+/gi,", ").substring(2).slice(0,-2);
    if(carry!="")
     carry="Carrying: "+carry;
    else
     carry="Carrying nothing";
    div.append('<p class="pequip">'+carry+'</p>');
   }
   var langs=npc[30].split(', ');
   if(npc[30]=="")
    langs=[];
   var languagecount=npc[31]+langs.length;
   if(intbonus>0)
    languagecount+=intbonus;
   if(profs) {
    var profs = generateProfs(npc,level,intbonus);
    languagecount += profs.split('Language').length-1;
    div.append('<p class="pprofs">'+profs+'</p>');
   }
   if(lang) {
    while(langs.length<languagecount) {
     var l=pickRandom(languages,200);
     if(langs.indexOf(l) == -1)
      langs.push(l);
    }
    div.append('<p class="plang"><span class="icon language" title="Languages Spoken"><span>Languages spoken:</span></span> '+langs.join(', ')+'</p>');
   }
   if(book) {
    if(npc[32].length>0) {
     var holder=$('<div class="spellholder"></div>');
     for(var i=0;i<npc[32].length;i++) {
      var dv=$('<div></div>');
      dv.append('<h3><span class="icon '+['divine','arcane','library'][npc[32][i][0]]+'" title="'+['Divine','Arcane','Library'][npc[32][i][0]]+' Spells"><span>'+['Divine','Arcane','Library'][npc[32][i][0]]+' Spells</span></span></h3>');
      dv.append(formatSpells(makeSpellList(intbonus,level,npc[32][i],npc[32][i])));
      holder.append(dv);
     }
     holder.append($('<div class="spellmin">-</div>').click(function(){
      $(this).parent().toggleClass('minimized',500);
     }));
     div.append(holder);
    }
   }
   return div;
  }

  var statGen = function (primes,mins) {
   var mystats = [];
   var extra = 0;
   for(var j=0;j<6;j++) {
    mystats.push(rand(1,6)+rand(1,6)+rand(1,6));
    if(mystats[j]<mins[j])
     mystats[j]=mins[j];
    else if(!primes[j] && (mins[j] < 11 && (mystats[j]==11 || mystats[j]==12) || mystats[j]==15)) {
     extra += 1;
     mystats[j] -= 2;
    }
   }
   if(extra>0) {
    if(primes[0])
     mystats[0]+=extra;
    else if(primes[1])
     mystats[1]+=extra;
    else if(primes[2])
     mystats[2]+=extra;
    else if(primes[3])
     mystats[3]+=extra;
    else if(primes[4])
     mystats[4]+=extra;
    else if(primes[5])
     mystats[5]+=extra;
   }
   var arr2=[];
   for(var i=0;i<6;i++) {
    if(mystats[i]>17)
     arr2.push("+3");
    else if(mystats[i]>15)
     arr2.push("+2");
    else if(mystats[i]>12)
     arr2.push("+1");
    else if(mystats[i]>8)
     arr2.push("+0");
    else if(mystats[i]>5)
     arr2.push("-1");
    else if(mystats[i]>3)
     arr2.push("-2");
    else
     arr2.push("-3");
   }
   var arr = [["Str","Int","Wis","Dex","Con","Cha"],mystats,arr2];
   return arr;
  }

  generateProfs = function (npc,lvl,bonus) {
   var gen = proficiencies[0][lvl-1]+bonus;
   if(gen<0)
    gen=0;
   var clss= proficiencies[npc[25]][lvl-1];
   var genprof=[];
   var clssprof=[];
   for(var i=0;i<gen;i++)
    genprof.push(general[rand(0,general.length-1)]);
   for(var i=0;i<clss;i++)
    clssprof.push(npc[33][rand(0,npc[33].length-1)]);
   if(genprof.length<1)
    genprof.push("None");
   return "<span class='icon genprof' title='General Proficiencies'><span>General Proficiencies:</span></span> " + genprof.join(", ") + "; <span class='icon classprof' title='Class Proficiencies'><span>Class Proficiencies:</span></span> " + clssprof.join(", ");
  }

  var getWeapons = function (idxs){
   var weapons=idxs.match(new RegExp('.{1,2}', 'g'));
   var arrweapon=[];
   var x=pickRandom(weapons);
   arrweapon.push(equipment[x.split('')[0]*1-1][x.split('')[1]*1-1]);
   x=pickRandom(weapons);
   arrweapon.push(equipment[x.split('')[0]*1-1][x.split('')[1]*1-1]);
   if(rand(0,40)<weapons.length*2) {
    x = pickRandom(weapons);
    arrweapon.push(equipment[x.split('')[0]*1-1][x.split('')[1]*1-1]);
   }
   if(rand(0,40)<weapons.length) {
    x = pickRandom(weapons);
    arrweapon.push(equipment[x.split('')[0]*1-1][x.split('')[1]*1-1]);
   }
   if(rand(0,40)<weapons.length/2) {
    x = pickRandom(weapons);
    arrweapon.push(equipment[x.split('')[0]*1-1][x.split('')[1]*1-1]);
   }
   return arrweapon.join(', ');
  }
  getRequired = function(idxarr) {
   var result=[];
   while(idxarr.length>0) {
    var equip=equipment[8][idxarr.pop()-1];
    result.push(equip);
   }
   return result.join(', ');
  }
  getMiscEquipment = function(x) {
   var str="";
   if(rand(1,100)<=x) {
    x-=10;
    str+=", "+pickRandom(equipment[9])+getMiscEquipment(x);
   }
   return str;
  }
  return {
   Initialize: init,
   Generate: generateNPCs,
   MakeChar: makeChar,
   StatGen: statGen,
   GetMiscEquipment: getMiscEquipment
  }
 }();
}(window.acks = window.acks || {}, jQuery));
