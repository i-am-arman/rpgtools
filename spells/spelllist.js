

/*
 * Holds any number of spells from the spell creator
 * Each spell is as below; for premade spells, spellbuilder is null, and description is "As [book] spell."
 * This creates a list, sorted by level, then alphabetically.
 * If loaded into Class, it'll show below "Description" (or even next to it?) as a button, linking to this page.
 * Alternately... a popup, with tabs for each spell level, and checkboxes next to all the spells (by name) if it's prayerful, with a limit...
 */
let spell = {
	name: 'my spell',
	level: 2,
	range: 'self',
	duration: 'special',
	spellbuilder: {},
	description: 'desc'
}
