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
  // Grab all slides and captions
  const slides = document.querySelectorAll(".indexSlideshow img");
  const captions = document.querySelectorAll(".indexSlideshow figcaption");
  const slideshow = document.querySelector(".indexSlideshow");

  let currentSlide = 0;
  let isPlaying = true;
  let slideInterval = setInterval(nextSlide, 5000);

  // Show a specific slide
  function showSlide(n) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (captions[i]) captions[i].style.opacity = 0;

      if (i === n) {
        slide.classList.add("active");
        if (captions[i]) captions[i].style.opacity = 1;
      }
    });
    currentSlide = n;
  }

  // Go to next/previous slide
  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  // Toggle play/pause
  function togglePlayPause() {
    const btn = document.querySelector(".playPause");
    if (isPlaying) {
      clearInterval(slideInterval);
      btn.innerHTML = "&#9654;"; 
    } else {
      slideInterval = setInterval(nextSlide, 5000);
      btn.innerHTML = "&#10073;&#10073;"; 
    }
    isPlaying = !isPlaying;
  }

  // Event listeners for controls
  const nextBtn = document.querySelector(".nextSlide");
  const prevBtn = document.querySelector(".prevSlide");
  const playBtn = document.querySelector(".playPause");

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  if (playBtn) playBtn.addEventListener("click", togglePlayPause);

  // Initialize the first slide
  showSlide(currentSlide);
});