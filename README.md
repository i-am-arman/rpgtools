# rpgtools

This section of my website is dedicated to <a href="http://www.autarch.co/">Adventurer, Conqueror, King</a>, an RPG based on the style of old-school D&amp;D. If you haven't purchased the <a href="http://www.drivethrurpg.com/product/99123/Adventurer-Conqueror-King-System?affiliate_id=751437">manual</a> or the <a href="http://www.drivethrurpg.com/product/108830/ACKS-Players-Companion?affiliate_id=751437">player's companion</a>, you really should! Most of the information here is based on those two books, with a little help from <a href="http://www.drivethrurpg.com/product/179660/Axioms-Issue-1?affiliate_id=751437">Axioms Issue 1</a>. If you use those links, I get a little kickback, too, which is really nice; I don't charge for these tools, and I intend to never do so, but it does take time and energy.

These tools have been updated! I'm afraid if you have any old save files, they are unable to be upgraded to the new version, but on the bright side, the save files are a lot more portable now. Additionally, there are a lot of new features, and hopefully, the creators are a lot closer to the rules. Obviously, while the Player's Companion has rules for character class creation, and Axioms Issue 1 has rules for creating custom magic, the racial ruleset is based only on a post in the forums. As such, the rules are not as comprehensive as the others. For the most part, the rules for a class and a race are similar; however, while a class only has one "level", a race has five: 0 through 4. Each level builds on the last. Tradeoffs are the one piece that doesn't fit nicely. As such, while I still allow tradeoffs in a race, any custom powers in a tradeoff won't be allowed elsewhere. The programming is otherwise <i>far</i> too complex.

I have a few classes, races, and spells that I've created as well; some may be a little unbalanced, however, or take the world in directions your Judge may not want, so it's always a good idea to ask first.

The newest version of the Magic Type, Race, and Class generators are - to the best of my ability - feature complete with the core book, Player's Hangbook, and Axioms 1. I had to make a few choices, as follows:

	Magic Type:
		This was actually pretty straight forward; as far as I know, it's feature complete.
		In future, I'd like to have an option to actually set each multiplier (ie, like Divine magic does with enchantments), and allow that to be loaded into spell lists; for now, you'll have to note that manually.
		There can only be one custom power per level
		"Open" custom powers allow one <i>Class</i> custom power (not Racial!).
	Race:
		If a tradeoff is included on one racial level, any powers on that tradeoff cannot be used on any other racial levels - it just gets too complicated. Additionally, unfilled tradeoff slots will be lost.
		Custom powers not in the ACKS core or Player's Handbook (DIY or otherwise), including spells-as-powers, can be included; however, note that spelling and capitalization matter. Faerie Fire and Faerie fire are not considered the same. If you have a DIY power that acts like Fangs and Claws (multiple power levels), make sure any other DIY powers are exactly the same, so the XP lines up correctly
		It's fully possible to recreate the existing races, however, note that for most of them, the XP will not match. For example: the Elf race's final step should be 2725, not 2500.
		The Dwarf's racial ability - a general proficiency and a +1 to all proficiency rolls - can only be reproduced as a DIY power.
		There is currently no way to cancel out a power at a higher level - for example, if you add "Unarmed Fighting" at level 1, then want to replace it with "Fangs and Claws 2" at level 2, that is not currently possible. I recommend using a custom power, and adding a note to the description.
		You can't load more than one custom Magic Type; due to limitations in the system, one is all you get. Sorry.
	Class:
		Classes in the Core and Player's Handbook can be recreated, however, the XP will not line up for some of them; whether that is a fault in the book or my generator, I couldn't tell you. Well, I probably could, but I won't. It's up to you if you want to use the given XP.
		Tradeoffs in a race are going to be treated weirdly. It's probably best not to use racial tradeoffs, honestly. They're a mess.
		The Gnome race has one odd feature: at level 3, they can use magical items as a thief. I'm not sure how to include those, frankly, so I just added a custom power.
		As in Race, you can't add more than one custom Magic Type. Additionally, if you load a custom Race with a custom Magic Type, that is the only custom Magic Type you can use.

In future, I would like to add breakout multipliers to Magic Type (like Divine Magic's enchantment multipliers), and the ability to load a custom Magic Type in the Spell Creator, so the multipliers all work automatically - just select what magic type you're using, and create away! I would also like to add a connector back the other way - the ability to, when creating spells, save said spell to the Magic Type it is associated with. Then, in Class Creation, you could select what spells will appear on the spell list (for Prayerful types), and be able to print out a full class with all the details you need!

Once I have the Creators working correctly, I want to build a Generator. Click a button, and get your stats; pick a class, do stat tradeoffs, pick General and Class Proficiencies, choose a name, roll your HP, and save the result - not to forget trading off gold for magical items, of course! And once I can do that, repeat the whole thing with the NPC generator, using the Character Creator code, so I can roll up whole characters automatically!

