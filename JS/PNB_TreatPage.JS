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

/* ===================================
   Global Variables and Initialization
   =================================== */

document.addEventListener("DOMContentLoaded", function () {

  const sizeSelect = document.getElementById("treatSize");
  const priceDisplay = document.getElementById("treatPrice");
  const quantityInput = document.getElementById("treatQuantity");

  // Get current treat id from data attribute on header
  const treatHeader = document.querySelector(".treatPageHeader");
  const treatId = treatHeader.dataset.id;

  // Look up treat in treatData
  const treat = treatData[treatId];

  if (!treat) {
    console.error("Treat not found in treatData:", treatId);
    return;
  }

  /* ===============
     Price Functions
     =============== */

  function updatePrice() {
    if (!sizeSelect || !priceDisplay) return;

    const selectedSize = sizeSelect.value;
    const price = treat.prices[selectedSize] || 0;

    priceDisplay.textContent = `$${price.toFixed(2)}`;
  }

  /* ===============
     Initialize Page
     =============== */

  if (sizeSelect) {
    sizeSelect.innerHTML = treat.availableSizes
      .map(size =>
        `<option value="${size}">
          ${size.charAt(0).toUpperCase() + size.slice(1)}
        </option>`
      )
      .join("");
  }

  updatePrice();

  /* ===============
     Event Listeners
     =============== */

  if (sizeSelect) {
    sizeSelect.addEventListener("change", updatePrice);
  }

  /* ==============
     Toast Function
     ============== */

  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toastMessage";

    // Create paw icon
    const pawImg = document.createElement("img");
    pawImg.src = "../Graphics/Pawprints/PurplePawprint.svg";
    pawImg.alt = "paw";
    pawImg.className = "toastPaw";

    // Add content to toast
    toast.appendChild(pawImg);
    const textNode = document.createTextNode(message);
    toast.appendChild(textNode);

    document.body.appendChild(toast);

    // Trigger fade-in
    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    // Remove toast after delay
    setTimeout(() => {
      toast.style.opacity = 0;
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  /* ===========
     Add to Cart
     =========== */

  const addBtn = document.getElementById("addToCartBtn");

  if (addBtn) {
    addBtn.addEventListener("click", () => {

      const selectedSize = sizeSelect.value;
      let quantity = parseInt(quantityInput.value, 10);

      // Validate quantity
      if (isNaN(quantity) || quantity < 1) quantity = 1;

      // Get price from treatData
      const price = treat.prices[selectedSize];
      if (!price) {
        console.error(`Price not found for size "${selectedSize}"`);
        return;
      }

      // Build cart item
      const cartItem = {
        id: treatId,
        name: treat.name,
        size: selectedSize,
        quantity: quantity,
        price: price,
        img: treat.img
      };

      /* =============
         Cart Handling
         =============*/

      // Retrieve existing cart
      let cart = [];
      try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (!Array.isArray(cart)) cart = [];
      } catch (e) {
        console.warn("Invalid cart in localStorage, resetting.", e);
        cart = [];
      }

      // Check for existing item 
      const existingIndex = cart.findIndex(
        item => item.id === cartItem.id && item.size === cartItem.size
      );

      if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
      } else {
        cart.push(cartItem);
      }

      // Save updated cart
      try {
        localStorage.setItem("cart", JSON.stringify(cart));
      } catch (e) {
        console.error("Failed to save cart:", e);
        showToast("Oops! Unable to add to cart. Please try again.");
        return;
      }

      // Update cart counter if available
      if (typeof updateCartCounter === "function") {
        updateCartCounter();
      }

      // Reset quantity input
      quantityInput.value = 1;

      // Show confirmation toast
      showToast(`${cartItem.name} (${cartItem.size}) added to bag!`);
    });
  }

});