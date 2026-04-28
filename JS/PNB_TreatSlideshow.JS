"use strict";

/*

    Pawfect Nibbles & Bites
    Internship Project
    
    Pawfect Nibbles & Bites
    Treat Slideshow JS

    Author:  Meghan Wilkerson
    Date:    2026-03-29

    Filename: PNB_TreatSlideshow.js

*/

/* ===============
   Treat Slideshow
   =============== */

document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelectorAll(".treatPhotoGallery .fade");
  let slideIndex = 0;

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

  // Initialization
  showSlide(slideIndex);

  // Next/Prev buttons
  window.plusSlides = function(n) {
    slideIndex += n;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    showSlide(slideIndex);
  };

  // Listen for size dropdown change
  const sizeSelect = document.getElementById("treatSize");
  if (sizeSelect) {
    sizeSelect.addEventListener("change", function() {
      updateSlideForSize(this.value);
    });
  }
});