"use strict";

/*

    Pawfect Nibbles & Bites
    Internship Project
    
    Pawfect Nibbles & Bites
    Cart Counter JS

    Author:  Meghan Wilkerson
    Date:    2026-03-28

    Filename: PNB_CartCounter.js

*/

/* =====================
   Cart Counter Function
   ===================== */

function updateCartCounter() {
  const countElems = document.querySelectorAll(".cartCount");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  countElems.forEach(el => {
    el.textContent = totalItems;
  });
}

document.addEventListener("DOMContentLoaded", updateCartCounter);