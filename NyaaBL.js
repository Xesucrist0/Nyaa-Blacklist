// ==UserScript==
// @name         Nyaa Filter
// @include      *nyaa.si*
// @version      1
// @description  Blacklisting for Nyaa.si
// @author       Xesu
// @grant        none
// ==/UserScript==


function hide_by_categories() {

	var he = [];

	//Uncomment the categories you want to hide

	//he.push("Anime - Anime Music Video");
	//he.push("Anime - Non-English-translated");
	//he.push("Anime - English-translated");
	//he.push("Anime - Raw");
	//he.push("Audio - Lossy");
	//he.push("Audio - Lossless");
	//he.push("Literature - Raw");
	//he.push("Literature - English-translated");
	//he.push("Literature - Non-English-translated");
	//he.push("Live Action - Raw");
	//he.push("Live Action - English-translated");
	//he.push("Live Action - Non-English-translated");
	//he.push("Live Action - Idol/Promotional Video");
	//he.push("Pictures - Graphics");
	//he.push("Pictures - Photos");
	//he.push("Software - Games");
	//he.push("Software - Applications");

	var x = document.getElementsByTagName("tr");
	var i;
	var n;
	for (i = 1; i < x.length; i++) {
		var y = x[i].childNodes[1].childNodes[1].title;
		for (n = 0; n < he.length; n++) {
			if (he[n] == y) {
				x[i].style.display = "none";
			}
		}
	}
}

function hide_by_keyword() {

	// Add your blacklisted keywords in the array below
	// Example: var blacklist_keywords = ["animeland", "leopard-raws", "vostfr", "puyasubs", "hevc", "1080p hi444"];

	var blacklist_keywords = [];

	var x = document.getElementsByTagName("tr");
	var i;
	var n;
	for (i = 1; i < x.length; i++) {
		var y = x[i].childNodes[3].childNodes[1].title;
		for (n = 0; n < blacklist_keywords.length; n++) {
			if (y.toLowerCase().indexOf(blacklist_keywords[n].toLowerCase()) >= 0) {
				x[i].style.display = "none";
			}
		}
	}
}

//Add some document.on_ready() statement... maybe.

hide_by_categories(); 
hide_by_keyword();














