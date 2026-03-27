"use strict";

/*

    Pawfect Nibbles & Bites
    Internship Project
    
    Pawfect Nibbles & Bites
    SideNav JS

    Author:  Meghan Wilkerson
    Date:    2026-01-04

    Filename: PNB_SideNav.js

*/

/* ---------------------
   OPEN SIDEBAR FUNCTION
   --------------------- */

function openNav() {
  document.getElementById("sideNav").style.width = "250px";
  document.body.classList.add("sideNavOpen");
}

/* ----------------------
   CLOSE SIDEBAR FUNCTION
   ---------------------- */
function closeNav() {
  document.getElementById("sideNav").style.width = "0";
  document.body.classList.remove("sideNavOpen"); 
}