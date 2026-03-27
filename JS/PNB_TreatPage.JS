"use strict";

/*

    Pawfect Nibbles & Bites
    Internship Project
    
    Pawfect Nibbles & Bites
    Treat Page JS

    Author:  Meghan Wilkerson
    Date:    2026-01-31

    Filename: PNB_TreatPage.js

*/



  /* -------------------
     ESTABLISH VARIABLES
     ------------------- */

  document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".treatPhotoGallery .fade");
    let slideIndex = 0;
    const sizeSelect = document.getElementById("treatSize");
    const priceDisplay = document.getElementById("treatPrice");

    const treatPrices = {
      nibbles: 4.99,
      bites: 6.99,
      chews: 9.99,
      chomps: 11.99
    };

  /* --------------------
     SHOW SLIDE FUNCTIONS
     -------------------- */

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  function updateSlideForSize(selectedSize) {
    const firstMatchingSlide = Array.from(slides).find(
      slide => slide.dataset.size === selectedSize
    );
    if (firstMatchingSlide) {
      slideIndex = Array.from(slides).indexOf(firstMatchingSlide);
      showSlide(slideIndex);
    }
  }

   /* --------------------
     UPDATE PRICE FUNCTION
     --------------------- */

  function updatePrice() {
    if (!sizeSelect || !priceDisplay) return;
    const selectedSize = sizeSelect.value;
    const price = treatPrices[selectedSize] || 0;
    priceDisplay.textContent = `$${price.toFixed(2)}`;
  }

  /* --------------
     INITIALIZATION
     -------------- */
  showSlide(slideIndex);
  updatePrice();

  /* ---------------
     EVENT LISTENERS
     --------------- */

  // Next / Prev buttons
  window.plusSlides = function(n) {
    slideIndex += n;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    showSlide(slideIndex);
  };

  // Size selection dropdown updates slide & price
  if (sizeSelect) {
    sizeSelect.addEventListener("change", function() {
      const selectedSize = this.value;
      updateSlideForSize(selectedSize);
      updatePrice();
    });
  }

});
