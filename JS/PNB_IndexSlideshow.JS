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

/* -------------------
   INDEX SLIDESHOW JS
   ------------------- */

document.addEventListener("DOMContentLoaded", () => {

  const slides = document.querySelectorAll(".indexSlidesWrapper img");
  const captionBox = document.querySelector(".slideCaption");

  // Captions array (matches slide order)
  const captions = [
    "Nibbles Peanut Butter Pumpkin",
    "Banana Nutty Bites",
    "Peanut Butter Pumpkin Chews",
    "Bella and Thor, paws-itively paw-some snack inspectors"
  ];

  let currentSlide = 0;
  let isPlaying = true;
  let slideInterval = setInterval(nextSlide, 6000);

  function showSlide(n) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === n) {
        slide.classList.add("active");
      }
    });

    // Update caption
    captionBox.textContent = captions[n];

    currentSlide = n;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  function togglePlayPause() {
    const btn = document.querySelector(".playPause");

    if (isPlaying) {
      clearInterval(slideInterval);
      btn.innerHTML = "&#9658;"; // play ▶
    } else {
      slideInterval = setInterval(nextSlide, 5000);
      btn.innerHTML = "&#10073;&#10073;"; // pause ❚❚
    }

    isPlaying = !isPlaying;
  }

  // Buttons
  document.querySelector(".nextSlide").addEventListener("click", nextSlide);
  document.querySelector(".prevSlide").addEventListener("click", prevSlide);
  document.querySelector(".playPause").addEventListener("click", togglePlayPause);

  // Optional: click slideshow to pause/play
  document.querySelector(".indexSlidesWrapper").addEventListener("click", togglePlayPause);

  // Init
  showSlide(currentSlide);
});