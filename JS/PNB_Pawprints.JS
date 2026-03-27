"use strict";

/*

    Pawfect Nibbles & Bites
    Internship Project
    
    Pawfect Nibbles & Bites
    Pawprints JS

    Author:  Meghan Wilkerson
    Date:    2026-01-10

    Filename: PNB_Pawprints.js

*/

/* -------------------
   ESTABLISH VARIABLES
   ------------------- */

document.addEventListener('DOMContentLoaded', () => {
  const pawTrails = document.querySelectorAll('.pawTrail');

  pawTrails.forEach(pawTrail => {
    // Store original pawprints
    const originalPaws = Array.from(pawTrail.querySelectorAll('.pawprint')).map(p => p.cloneNode(true));

    /* -----------------
       PAWTRAIL FUNCTION
       ----------------- */
    
    function updatePawTrail() {
      const containerWidth = pawTrail.clientWidth;

      // Set paw count based on container width
      let totalPawprints = 15;
      if (containerWidth < 480) totalPawprints = 6; 
      else if (containerWidth < 768) totalPawprints = 9;

      // Clear existing pawprints
      pawTrail.innerHTML = '';

      // Add pawprints
      for (let i = 0; i < totalPawprints; i++) {
        const clone = originalPaws[i % originalPaws.length].cloneNode(true);
        pawTrail.appendChild(clone);
      }

      // Wave effect
      const amplitude = 4;
      const frequency = (2 * Math.PI) / totalPawprints;
      pawTrail.querySelectorAll('.pawprint').forEach((img, index) => {
        img.style.transform = `translateY(${Math.sin(index * frequency) * amplitude}px)`;
      });
    }

    updatePawTrail();

    // Resize with delay
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updatePawTrail, 100);
    });
  });
});
