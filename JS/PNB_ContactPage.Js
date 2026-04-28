"use strict";

/*

    Pawfect Nibbles & Bites
    Internship Project
    
    Pawfect Nibbles & Bites
    Contact Page JS

    Author:  Meghan Wilkerson
    Date:    2026-01-04

    Filename: PNB_ContactPage.js

*/

/* ==================================
   Global Variables and Initialization
   ================================== */

document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("name");
  const petSizeInput = document.getElementById("petSize");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const submitBtn = document.querySelector(".submitBtn");

  if (!submitBtn) return;

/* =======
   Touched
   ======= */

  const fields = [nameInput, petSizeInput, subjectInput, messageInput];
 
  fields.forEach((field) => {
    field.addEventListener("blur", () => {
      field.classList.add("touched");
    });
  });

/* ===================
   Validation Function
   =================== */

  function validateForm() {
    // Reset previous messages
    nameInput.setCustomValidity("");
    petSizeInput.setCustomValidity("");
    subjectInput.setCustomValidity("");
    messageInput.setCustomValidity("");

    if (!nameInput.value.trim()) {
      nameInput.setCustomValidity("Please enter your name.");
      nameInput.reportValidity();
      nameInput.focus();
      return false;
    }

    if (!petSizeInput.value.trim()) {
      petSizeInput.setCustomValidity("Please enter your pet's size or weight.");
      petSizeInput.reportValidity();
      petSizeInput.focus();
      return false;
    }

    if (!subjectInput.value.trim()) {
      subjectInput.setCustomValidity("Please enter a subject.");
      subjectInput.reportValidity();
      subjectInput.focus();
      return false;
    }

    if (!messageInput.value.trim()) {
      messageInput.setCustomValidity("Please enter your message.");
      messageInput.reportValidity();
      messageInput.focus();
      return false;
    }

  return true;
}

  /* ===============
     Form Submission
     =============== */
  submitBtn.addEventListener("click", function(event) {
    event.preventDefault(); 

    if (!validateForm()) return; 

    const body = `Name: ${nameInput.value.trim()}%0D%0APet Size/Weight: ${petSizeInput.value.trim()}%0D%0AMessage:%0D%0A${messageInput.value.trim()}`;

    const mailtoLink = `mailto:pawfectnibblesandbites@gmail.com?subject=${encodeURIComponent(subjectInput.value.trim())}&body=${body}`;

    alert("Your email is ready! It will open in your email client.");

    window.location.href = mailtoLink;
  });
});
