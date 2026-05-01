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

"use strict";

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

  /* =====
     TOAST
     ===== */

  function showContactToast(message, onComplete) {

    const overlay = document.createElement("div");
    overlay.className = "toastOverlay";

    const toast = document.createElement("div");
    toast.className = "contactToast";

    const paw = document.createElement("img");
    paw.src = "../Graphics/Pawprints/TealPawprint.svg";
    paw.alt = "paw";
    paw.className = "toastPaw";

    const text = document.createElement("div");
    text.textContent = message;

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "✕";
    closeBtn.className = "toastCloseBtn";

    toast.appendChild(paw);
    toast.appendChild(text);
    toast.appendChild(closeBtn);
    overlay.appendChild(toast);

    document.body.appendChild(overlay);

   setTimeout(() => overlay.classList.add("show"), 10);

    let removed = false;

    function closeToast() {
      if (removed) return;
      removed = true;

      overlay.classList.remove("show");

      setTimeout(() => {
        overlay.remove();
        if (typeof onComplete === "function") onComplete();
      }, 300);
    }

    closeBtn.addEventListener("click", closeToast);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeToast();
    });

    setTimeout(closeToast, 2500);
  }

  /* ===================
     Validation Function
     =================== */

  function validateForm() {
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

  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (!validateForm()) return;

    const body = `Name: ${nameInput.value.trim()}%0D%0APet Size/Weight: ${petSizeInput.value.trim()}%0D%0AMessage:%0D%0A${messageInput.value.trim()}`;

    const mailtoLink = `mailto:pawfectnibblesandbites@gmail.com?subject=${encodeURIComponent(subjectInput.value.trim())}&body=${body}`;

    showContactToast("Opening your email client...");

    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 300);
  });
});