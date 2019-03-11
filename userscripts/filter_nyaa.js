// ==UserScript==
// @name         Nyaa Filter
// @include      *nyaa.si*
// @version      1
// @description  Blacklisting for Nyaa.si
// @author       Xesu
// @grant        none
// ==/UserScript==

// INSTRUCTIONS AT THE BOTTOM

function hide_by_categories(he) {

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

function hide_by_keyword(blacklist_keywords) {

	var x = document.getElementsByTagName("tr");
	var i;
	var n;

	for (i = 1; i < x.length; i++) {

		if (x[i].childNodes[3].childNodes.length > 3) {
			var y = x[i].childNodes[3].childNodes[3].title;
		} else {
			var y = x[i].childNodes[3].childNodes[1].title;
		}

		for (n = 0; n < blacklist_keywords.length; n++) {

			if (y.toLowerCase().indexOf(blacklist_keywords[n].toLowerCase()) >= 0) {

				x[i].style.display = "none";
			}
		}
	}
}

function change_color(keywords, color) {
	
	var x = document.getElementsByTagName("tr");
	var i;
	var n;
	var j;

	for (i = 1; i < x.length; i++) {

		if (x[i].childNodes[3].childNodes.length > 3) {
			var y = x[i].childNodes[3].childNodes[3].title;
		} else {
			var y = x[i].childNodes[3].childNodes[1].title;
		}

		for (n = 0; n < keywords.length; n++) {

			if (y.toLowerCase().indexOf(keywords[n].toLowerCase()) >= 0) {

				var z = x[i].getElementsByTagName("td");
				for (j = 0; j < z.length; j++) {

					z[j].style.backgroundColor = color;
				}
			}
		}
	}
}

var hidden_categories = [];

// Uncomment the categories you want to hide.

//hidden_categories.push("Anime - Anime Music Video");
//hidden_categories.push("Anime - Non-English-translated");
//hidden_categories.push("Anime - English-translated");
//hidden_categories.push("Anime - Raw");
//hidden_categories.push("Audio - Lossy");
//hidden_categories.push("Audio - Lossless");
//hidden_categories.push("Literature - Raw");
//hidden_categories.push("Literature - English-translated");
//hidden_categories.push("Literature - Non-English-translated");
//hidden_categories.push("Live Action - Raw");
//hidden_categories.push("Live Action - English-translated");
//hidden_categories.push("Live Action - Non-English-translated");
//hidden_categories.push("Live Action - Idol/Promotional Video");
//hidden_categories.push("Pictures - Graphics");
//hidden_categories.push("Pictures - Photos");
//hidden_categories.push("Software - Games");
//hidden_categories.push("Software - Applications");

hide_by_categories(hidden_categories); 

// Add an array of keywords. Those entries that contain one of these words will be hidden.
// Example: hide_by_keyword(["anime-land", "hevc", "vostfr"]);
hide_by_keyword([]);

// add an array of keywords and the background color to replace with. Add as many as you want.
// Example: change_color(["commie", "asenshi", "chyuu", "memesubs"], "#d9edf7");
change_color([], "#ffcbe2"); //pink
change_color([], "#d9edf7"); //blue
