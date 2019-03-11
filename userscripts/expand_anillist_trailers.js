// ==UserScript==
// @name         EAT
// @include      *anilist.co/anime*
// @version      1
// @description  This makes anilist trailers bigger so they're watchable without opening another tab.
// @author       Xesu
// @grant        none
// ==/UserScript==

function big_trailer() {

    var y = document.getElementsByClassName("trailer");
    y[0].style.width = "100%";
    y[0].parentElement.style.display = "Block";
    var x = document.getElementsByClassName("video");
    x[0].style.height = `${y[0].clientWidth*9/16}px`;
}

window.addEventListener('load', function() {big_trailer();}, false);
