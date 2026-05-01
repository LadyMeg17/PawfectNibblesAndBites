"use strict";

/*

    Pawfect Nibbles & Bites
    Internship Project
    
    Pawfect Nibbles & Bites
    Index Slideshow JS

    Author:  Meghan Wilkerson
    Date:    2026-03-27

    Filename: PNB_IndexSlideshow.js

*/

/* ========================
   Initialization and Setup
   ======================== */

document.addEventListener("DOMContentLoaded", () => {

  const slides = document.querySelectorAll(".indexSlidesWrapper img");
  const captionBox = document.querySelector(".slideCaption");

  /* ==========
     Slide Data
     ==========*/

  // Captions array 
  const captions = [
    "PB Punkin Nibbles",
    "Apple Oatitude Bites",
    "BananaNutty Chews",
    "Bella and Thor, paws-itively paw-some snack inspectors"
  ];

  let currentSlide = 0;
  let isPlaying = true;
  let slideInterval = setInterval(nextSlide, 6000);

  /* ===============
     Slide Functions
     =============== */

  function showSlide(n) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === n) {
        slide.classList.add("active");
      }
    });

    // Update caption text
    captionBox.textContent = captions[n];

    currentSlide = n;
  }

  // Next Slide
  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  // Previous Slide
  function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  /* =================
     Playback Controls
     ================= */

  function togglePlayPause() {
    const btn = document.querySelector(".playPause");

    if (isPlaying) {
      clearInterval(slideInterval);
      btn.innerHTML = "&#9658;"; 
    } else {
      slideInterval = setInterval(nextSlide, 5000);
      btn.innerHTML = "&#10073;&#10073;"
    }

    isPlaying = !isPlaying;
  }

  /* ===============
     Event Listeners
     =============== */

  document.querySelector(".nextSlide").addEventListener("click", nextSlide);
  document.querySelector(".prevSlide").addEventListener("click", prevSlide);
  document.querySelector(".playPause").addEventListener("click", togglePlayPause);

  // Toggles
  document.querySelector(".indexSlidesWrapper")
    .addEventListener("click", togglePlayPause);

  // Initialize
  showSlide(currentSlide);
});