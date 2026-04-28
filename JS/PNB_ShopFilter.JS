"use strict";

/*

    Pawfect Nibbles & Bites
    Internship Project
    
    Pawfect Nibbles & Bites
    Contact Page JS

    Author:  Meghan Wilkerson
    Date:    2026-01-31 

    Filename: PNB_ShopFilter.js

*/

 /* ================
    Global Variables
    ================ */

let activeSize = "";
let activeIngredient = "";

/*  ===============
    Filter Function
    =============== */

function filterCards() {
  const cards = document.querySelectorAll(".treatShopCard");

  cards.forEach(card => {
    const cardClasses = Array.from(card.classList);

    const sizeMatch = activeSize === "" || cardClasses.includes(activeSize);
    const ingredientMatch = activeIngredient === "" || cardClasses.includes(activeIngredient);

    if (sizeMatch && ingredientMatch) {
      card.classList.add("show");
    } else {
      card.classList.remove("show");
    }
  });
}

/*  ===============
    Event Listeners
    =============== */
   
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const sizeParam = params.get("size"); 
  if (sizeParam) {
    const sizeBtns = document.querySelectorAll("#sizeBtnContainer .btn");
    sizeBtns.forEach(btn => btn.classList.remove("active"));

    const matchingBtn = document.querySelector(
      `#sizeBtnContainer .btn[data-filter="${sizeParam}"]`
    );
    if (matchingBtn) {
      matchingBtn.classList.add("active");
      activeSize = sizeParam;
    }
  }

  filterCards();

  /* ============
     Size Buttons
     ============ */

  const sizeBtns = document.querySelectorAll("#sizeBtnContainer .btn");
  sizeBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      sizeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      activeSize = btn.dataset.filter;
      filterCards();
    });
  });

  /* ==================
     Ingredient Buttons
     ================== */

  const ingredientBtns = document.querySelectorAll("#ingredientBtnContainer .btn");
  ingredientBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      ingredientBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      activeIngredient = btn.dataset.filter;
      filterCards();
    });
  });

  /* ============
     Reset Button
     ============ */

  const resetBtn = document.querySelector("#resetFiltersContainer .btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", e => {
      e.preventDefault();

      sizeBtns.forEach(b => b.classList.remove("active"));
      ingredientBtns.forEach(b => b.classList.remove("active"));

      document.querySelector('#sizeBtnContainer .btn[data-filter=""]').classList.add("active");
      document.querySelector('#ingredientBtnContainer .btn[data-filter=""]').classList.add("active");

      activeSize = "";
      activeIngredient = "";

      filterCards();
    });
  }

    /* ===============
       Side Nav Filter
       =============== */

  const sizeSelect = document.querySelector("#sizeSelect");
  const ingredientSelect = document.querySelector("#ingredientSelect");
  const sideResetBtn = document.querySelector("#sideResetFilters");

  if (sizeSelect) {
    sizeSelect.addEventListener("change", () => {
      activeSize = sizeSelect.value;
      filterCards();
    });
  }

  if (ingredientSelect) {
    ingredientSelect.addEventListener("change", () => {
      activeIngredient = ingredientSelect.value;
      filterCards();
    });
  }

  if (sideResetBtn) {
    sideResetBtn.addEventListener("click", () => {
      sizeSelect.value = "";
      ingredientSelect.value = "";
      activeSize = "";
      activeIngredient = "";
      filterCards();
    });
  }
});
