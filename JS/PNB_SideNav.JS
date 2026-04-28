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

/* ====================
  Open Sidebar Function
  ===================== */

function openNav() {
  document.getElementById("sideNav").style.width = "250px";
  document.body.classList.add("sideNavOpen");
}

/* =====================
  Close Sidebar Function
  ====================== */

function closeNav() {
  document.getElementById("sideNav").style.width = "0";
  document.body.classList.remove("sideNavOpen"); 
}