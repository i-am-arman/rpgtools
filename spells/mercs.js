(function (acks, $) {
 acks.Mercs = function(){
  var mercList = [{race:"Dwarven",units: [{name: "Dwarven Heavy Infantry (spear, hand axe, shield, banded plate)",cost:18,unitCount:120,group:"A"},{name: "Dwarven Heavy Infantry (great axe, plate)",cost:21,unitCount:120,group:"B"},{name: "Dwarven Heavy Infantry (war hammer, shield, banded plate)",cost:15,unitCount:120,group:"C"},{name: "Dwarven Heavy Infantry (battle axe, shield, chain mail)",cost:12,unitCount:120,group:"D"},{name: "Dwarven Crossbowmen (arbalest, dagger, chain mail)",cost:24,unitCount:120,group:""},{name: "Dwarven Mounted Crossbowmen (crossbow, hand axe, chain mail, mule)",cost:45,unitCount:60,group:""}]},{race:"Elven",units: [{name: "Elven Light Infantry (spear, short sword, shield, leather)",cost:10,unitCount:120,group:""},{name: "Elven Heavy Infantry (spear, sword, shield, chain mail)",cost:24,unitCount:120,group:"A"},{name: "Elven Heavy Infantry (spear, sword, shield, lamellar)",cost:27,unitCount:120,group:"B"},{name: "Elven Bowmen (shortbow, dagger, leather)",cost:21,unitCount:120,group:""},{name: "Elven Longbowmen (longbow, sword, chain mail)",cost:42,unitCount:120,group:""},{name: "Elven Light Cavalry (lance, sword, shield, leather, light warhorse)",cost:60,unitCount:60,group:""},{name: "Elven Horse Archers (composite bow, scimitar, shield, leather, light warhorse)",cost:90,unitCount:60,group:""},{name: "Elven Cataphract Cavalry (composite bow, lance, sword, shield, plate, lamellar barded medium warhorse)",cost:150,unitCount:60,group:""}]},{race:"Human",units: [{name: "Untrained Conscripts/Militia (spear, club)",cost:3,unitCount:120,group:""},{name: "Light Infantry (3 javelins, short sword, shield, leather)",cost:6,unitCount:120,group:"A"},{name: "Light Infantry (spear, scimitar or battle axe, shield, leather)",cost:6,unitCount:120,group:"B"},{name: "Light Infantry (great axe, leather)",cost:6,unitCount:120,group:"C"},{name: "Light Infantry (pair of swords, dagger, leather)",cost:6,unitCount:120,group:"D"},{name: "Light Infantry (spear, hand axe, shield, leather)",cost:6,unitCount:120,group:"E Hunters"},{name: "Light Infantry (bola, net, 3 javelins, hand axe, leather)",cost:4,unitCount:120,group:"F Hunters"},{name: "Light Infantry (spear, club, shield, hide)",cost:4,unitCount:120,group:"G Hunters"},{name: "Light Infantry (bola, hand axe, 5 darts, hide)",cost:4,unitCount:120,group:"H Hunters"},{name: "Heavy Infantry (spear, sword, shield, banded)",cost:12,unitCount:120,group:"A"},{name: "Heavy Infantry (pole arm, sword, shield, banded)",cost:15,unitCount:120,group:"B"},{name: "Heavy Infantry (spear, sword, shield, chain)",cost:12,unitCount:120,group:"C"},{name: "Heavy Infantry (two-handed sword, chain)",cost:9,unitCount:120,group:"D"},{name: "Slingers (sling, short sword, shield, leather)",cost:6,unitCount:120,group:""},{name: "Bowmen (shortbow, short sword or hand axe, leather)",cost:9,unitCount:120,group:""},{name: "Crossbowmen (arbalest, short sword, chain)",cost:18,unitCount:120,group:""},{name: "Longbowmen (longbow, sword, chain)",cost:18,unitCount:120,group:"A"},{name: "Longbowmen (composite bow, scimitar, shield, leather)",cost:18,unitCount:120,group:"B"},{name: "Light Cavalry (3 javelins, sword, shield, leather, light warhorse)",cost:30,unitCount:60,group:"A"},{name: "Light Cavalry (3 javelins, pair of swords, leather, light warhorse)",cost:30,unitCount:60,group:"B"},{name: "Light Cavalry (lance, sword, shield, leather, light warhorse)",cost:30,unitCount:60,group:"C"},{name: "Horse Archers (composite bow, scimitar, shield, leather, light warhorse)",cost:45,unitCount:60,group:""},{name: "Medium Cavalry (lance, sword, shield, lamellar, medium warhorse)",cost:45,unitCount:60,group:""},{name: "Heavy Cavalry (lance, sword, shield, plate, chain-barded medium warhorse)",cost:60,unitCount:60,group:""},{name: "Cataphract Cavalry (composite bow, lance, sword, shield, plate, lamellar-barded medium warhorse)",cost:75,unitCount:60,group:""},{name: "Camel Archers (composite bow, scimitar, shield, leather, camel)",cost:30,unitCount:60,group:""},{name: "Camel Lancers (composite bow, lance, scimitar, shield, chain, leather-barded camel)",cost:45,unitCount:60,group:""},{name: "War Elephant (6 riders with composite bow, lance, and leather armor in gigantic war howdah on lamellar-barded elephant)",cost:360,unitCount:5,group:""},{name: "Veteran Untrained Conscripts/Militia (spear, club)",cost:3,unitCount:120,group:""},{name: "Veteran Light Infantry (3 javelins, short sword, shield, leather)",cost:6,unitCount:120,group:"A"},{name: "Veteran Light Infantry (spear, scimitar or battle axe, shield, leather)",cost:6,unitCount:120,group:"B"},{name: "Veteran Light Infantry (great axe, leather)",cost:6,unitCount:120,group:"C"},{name: "Veteran Light Infantry (pair of swords, dagger, leather)",cost:6,unitCount:120,group:"D"},{name: "Veteran Light Infantry (spear, hand axe, shield, leather)",cost:6,unitCount:120,group:"E Hunters"},{name: "Veteran Light Infantry (bola, net, 3 javelins, hand axe, leather)",cost:4,unitCount:120,group:"F Hunters"},{name: "Veteran Light Infantry (spear, club, shield, hide)",cost:4,unitCount:120,group:"G Hunters"},{name: "Veteran Light Infantry (bola, hand axe, 5 darts, hide)",cost:4,unitCount:120,group:"H Hunters"},{name: "Veteran Heavy Infantry (spear, sword, shield, banded)",cost:12,unitCount:120,group:"A"},{name: "Veteran Heavy Infantry (pole arm, sword, shield, banded)",cost:15,unitCount:120,group:"B"},{name: "Veteran Heavy Infantry (spear, sword, shield, chain)",cost:12,unitCount:120,group:"C"},{name: "Veteran Heavy Infantry (two-handed sword, chain)",cost:9,unitCount:120,group:"D"},{name: "Veteran Slingers (sling, short sword, shield, leather)",cost:6,unitCount:120,group:""},{name: "Veteran Bowmen (shortbow, short sword or hand axe, leather)",cost:9,unitCount:120,group:""},{name: "Veteran Crossbowmen (arbalest, short sword, chain)",cost:18,unitCount:120,group:""},{name: "Veteran Longbowmen (longbow, sword, chain)",cost:18,unitCount:120,group:"A"},{name: "Veteran Longbowmen (composite bow, scimitar, shield, leather)",cost:18,unitCount:120,group:"B"},{name: "Veteran Light Cavalry (3 javelins, sword, shield, leather, light warhorse)",cost:30,unitCount:60,group:"A"},{name: "Veteran Light Cavalry (3 javelins, pair of swords, leather, light warhorse)",cost:30,unitCount:60,group:"B"},{name: "Veteran Light Cavalry (lance, sword, shield, leather, light warhorse)",cost:30,unitCount:60,group:"C"},{name: "Veteran Horse Archers (composite bow, scimitar, shield, leather, light warhorse)",cost:45,unitCount:60,group:""},{name: "Veteran Medium Cavalry (lance, sword, shield, lamellar, medium warhorse)",cost:45,unitCount:60,group:""},{name: "Veteran Heavy Cavalry (lance, sword, shield, plate, chain-barded medium warhorse)",cost:60,unitCount:60,group:""},{name: "Veteran Cataphract Cavalry (composite bow, lance, sword, shield, plate, lamellar-barded medium warhorse)",cost:75,unitCount:60,group:""},{name: "Veteran Camel Archers (composite bow, scimitar, shield, leather, camel)",cost:30,unitCount:60,group:""},{name: "Veteran Camel Lancers (composite bow, lance, scimitar, shield, chain, leather-barded camel)",cost:45,unitCount:60,group:""},{name: "Veteran War Elephant (6 riders with composite bow, lance, and leather armor in gigantic war howdah on lamellar-barded elephant)",cost:360,unitCount:5,group:""}]},{race:"Beastmen",units: [{name: "Kobold Light Infantry (3 javelins, spiked club, hand axe, leather)",cost:2,unitCount:120,group:""},{name: "Goblin Light Infantry (spear, short sword, shield, leather)",cost:3,unitCount:120,group:""},{name: "Goblin Slingers (sling, short sword, shield, leather)",cost:3,unitCount:120,group:""},{name: "Goblin Bowmen (short bow, short sword, leather)",cost:3,unitCount:120,group:""},{name: "Goblin Wolf Riders (spear, short sword, shield, leather, dire wolf)",cost:15,unitCount:60,group:""},{name: "Orc Light Infantry (spear, scimitar, shield, leather)",cost:6,unitCount:120,group:""},{name: "Orc Heavy Infantry (pole arm, scale)",cost:9,unitCount:120,group:""},{name: "Orc Bowmen (short bow, scimitar, leather)",cost:6,unitCount:120,group:""},{name: "Orc Crossbowmen (crossbow, scimitar, scale)",cost:12,unitCount:120,group:""},{name: "Orc Boar Riders (spear, scimitar, shield, scale, giant boar)",cost:33,unitCount:60,group:""},{name: "Hobgoblin Light Infantry (spear, sword, shield, leather)",cost:12,unitCount:120,group:""},{name: "Hobgoblin Heavy Infantry (pole arm, scale)",cost:15,unitCount:120,group:""},{name: "Hobgoblin Longbowmen (composite bow, sword, scale)",cost:25,unitCount:120,group:""},{name: "Hobgoblin Light Cavalry (3 javelins, sword, leather, shield, light warhorse)",cost:45,unitCount:60,group:""},{name: "Hobgoblin Medium Cavalry (lance, sword, shield, lamellar, medium warhorse)",cost:55,unitCount:60,group:""},{name: "Hobgoblin Horse Archers (comp. bow, sword, shield, leather, light warhorse)",cost:75,unitCount:60,group:""},{name: "Gnoll Light Infantry (spear, shield, leather)",cost:18,unitCount:120,group:""},{name: "Gnoll Heavy Infantry (pole arm, scale)",cost:24,unitCount:120,group:""},{name: "Gnoll Longbowmen (long bow, battle axe, scale)",cost:40,unitCount:120,group:""},{name: "Lizardman Light Infantry (5 darts, spiked club, shield)",cost:27,unitCount:120,group:""},{name: "Lizardman Heavy Infantry (3 javelins, spiked club, shield, leather)",cost:45,unitCount:120,group:""},{name: "Bugbear Light Infantry (spear, shield)",cost:36,unitCount:120,group:""},{name: "Bugbear Heavy Infantry (morning star, hand axe, hide)",cost:50,unitCount:120,group:""},{name: "Ogre Light Infantry (large club, hide)",cost:40,unitCount:60,group:""},{name: "Ogre Heavy Infantry (great axe, scale)",cost:80,unitCount:60,group:""}]},{race:"Animal (gnome and wolfwere only)",units: [{name: "Ape, White",cost:15,unitCount:120,group:""},{name: "Baboon, Rock",cost:9,unitCount:120,group:""},{name: "Bat, Giant",cost:68,unitCount:60,group:""},{name: "Bear, Black",cost:14,unitCount:60,group:""},{name: "Bear, Cave",cost:29,unitCount:60,group:""},{name: "Bear, Grizzly",cost:29,unitCount:60,group:""},{name: "Bear, Polar",cost:50,unitCount:60,group:""},{name: "Boar, Giant",cost:62,unitCount:60,group:""},{name: "Boar, Ordinary",cost:0,unitCount:120,group:""},{name: "Camel",cost:14,unitCount:60,group:""},{name: "Cat, Lion",cost:62,unitCount:60,group:""},{name: "Cat, Mountain Lion",cost:12,unitCount:120,group:""},{name: "Cat, Panther",cost:36,unitCount:120,group:""},{name: "Cat, Saber-Tooth",cost:74,unitCount:60,group:""},{name: "Cat, Tiger",cost:62,unitCount:60,group:""},{name: "Crocodile, Giant",cost:766,unitCount:5,group:""},{name: "Crocodile, Large",cost:190,unitCount:20,group:""},{name: "Crocodile, Ordinary",cost:62,unitCount:60,group:""},{name: "Dog, Hunting",cost:0,unitCount:120,group:""},{name: "Dog, War",cost:3,unitCount:120,group:""},{name: "Donkey",cost:14,unitCount:60,group:""},{name: "Elephant",cost:190,unitCount:5,group:""},{name: "Fish, Giant Catfish",cost:124,unitCount:60,group:""},{name: "Fish, Giant Piranha",cost:56,unitCount:120,group:""},{name: "Fish, Giant Rockfish",cost:156,unitCount:20,group:""},{name: "Fish, Giant Sturgeon",cost:766,unitCount:5,group:""},{name: "Hawk, Giant",cost:462,unitCount:60,group:""},{name: "Hawk, Ordinary",cost:0,unitCount:120,group:""},{name: "Herd Animal (1HD: deer, sheep, and goats)",cost:0,unitCount:120,group:""},{name: "Herd Animal (2HD: antelope, llama, and gazelle)",cost:14,unitCount:60,group:""},{name: "Herd Animal (3HD: caribou, cattle, and oxen)",cost:14,unitCount:60,group:""},{name: "Herd Animal (4HD: buffalo, elk and moose)",cost:14,unitCount:60,group:""},{name: "Horse, Heavy",cost:14,unitCount:60,group:""},{name: "Horse, Heavy War",cost:20,unitCount:60,group:""},{name: "Horse, Light",cost:14,unitCount:60,group:""},{name: "Horse, Medium",cost:14,unitCount:60,group:""},{name: "Lizard, Giant Draco",cost:30,unitCount:120,group:""},{name: "Lizard, Giant Gecko",cost:27,unitCount:120,group:""},{name: "Lizard, Giant Horned",cost:50,unitCount:120,group:""},{name: "Lizard, Giant Tuatara",cost:59,unitCount:60,group:""},{name: "Mastodon",cost:620,unitCount:5,group:""},{name: "Mule",cost:14,unitCount:60,group:""},{name: "Octopus, Giant",cost:181,unitCount:20,group:""},{name: "Pteranodon",cost:132,unitCount:60,group:""},{name: "Pterodactyl",cost:12,unitCount:120,group:""},{name: "Rhinoceros",cost:91,unitCount:20,group:""},{name: "Shark, Bull",cost:27,unitCount:120,group:""},{name: "Shark, Great White",cost:226,unitCount:20,group:""},{name: "Shark, Mako",cost:77,unitCount:60,group:""},{name: "Snake, Giant Python",cost:62,unitCount:60,group:""},{name: "Snake, Giant Rattler",cost:62,unitCount:60,group:""},{name: "Snake, Pit Viper",cost:6,unitCount:120,group:""},{name: "Snake, Sea Snake",cost:6,unitCount:120,group:""},{name: "Snake, Spitting Cobra",cost:6,unitCount:120,group:""},{name: "Squid, Giant",cost:146,unitCount:20,group:""},{name: "Stegosaurus",cost:190,unitCount:5,group:""},{name: "Titanothere",cost:190,unitCount:5,group:""},{name: "Toad, Giant",cost:21,unitCount:120,group:""},{name: "Triceratops",cost:190,unitCount:5,group:""},{name: "Tyrannosaurus Rex",cost:1061,unitCount:5,group:""},{name: "Varmint, Giant Ferret",cost:6,unitCount:120,group:""},{name: "Varmint, Giant Rat",cost:3,unitCount:120,group:""},{name: "Varmint, Giant Shrew",cost:6,unitCount:120,group:""},{name: "Varmint, Giant Weasel",cost:29,unitCount:60,group:""},{name: "Whale, Killer",cost:190,unitCount:20,group:""},{name: "Whale, Narwhal",cost:96,unitCount:20,group:""},{name: "Whale, Sperm",cost:3838,unitCount:1,group:""},{name: "Wolf",cost:6,unitCount:120,group:""},{name: "Wolf, Dire",cost:62,unitCount:60,group:""}]}];
  var init = function(){};

  return {
   Initialize: init,
   MercList: mercList
  }
 }();
}(window.acks = window.acks || {}, jQuery));
