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

/* ----------
   TREAT PAGE
   ----------- */

document.addEventListener("DOMContentLoaded", function () {
  const sizeSelect = document.getElementById("treatSize");
  const priceDisplay = document.getElementById("treatPrice");
  const quantityInput = document.getElementById("treatQuantity");

  // Get current treat id from data attribute on h1
  const treatHeader = document.querySelector(".treatPageHeader");
  const treatId = treatHeader.dataset.id;

  // Look up treat in treatData
  const treat = treatData[treatId];

  if (!treat) {
    console.error("Treat not found in treatData:", treatId);
    return;
  }

  /* --------------------
     UPDATE PRICE FUNCTION
     -------------------- */
  function updatePrice() {
    if (!sizeSelect || !priceDisplay) return;
    const selectedSize = sizeSelect.value;
    const price = treat.prices[selectedSize] || 0;
    priceDisplay.textContent = `$${price.toFixed(2)}`;
  }

  /* ----------
     INITIALIZE
     ---------- */
  if (sizeSelect) {
    sizeSelect.innerHTML = treat.availableSizes
      .map(
        size => `<option value="${size}">${size.charAt(0).toUpperCase() + size.slice(1)}</option>`
      )
      .join("");
  }

  updatePrice();

  /* --------------
     EVENT LISTENERS
     -------------- */
  if (sizeSelect) {
    sizeSelect.addEventListener("change", updatePrice);
  }

/* --------------------
   TOAST FEEDBACK FUNCTION
   -------------------- */
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toastMessage";

  // Create paw image
  const pawImg = document.createElement("img");
  pawImg.src = "/Graphics/Pawprints/PurplePawprint.svg"; // update path if needed
  pawImg.alt = "paw";
  pawImg.className = "toastPaw";

  // Add paw and message to toast
  toast.appendChild(pawImg);
  const textNode = document.createTextNode(message);
  toast.appendChild(textNode);

  document.body.appendChild(toast);

  // Trigger fade
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Remove toast after 3s
  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

  /* --------------------
     ADD TO CART FUNCTION
     -------------------- */
  const addBtn = document.getElementById("addToCartBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const selectedSize = sizeSelect.value;
      let quantity = parseInt(quantityInput.value, 10);

      // Validate quantity
      if (isNaN(quantity) || quantity < 1) quantity = 1;

      // Pull the correct price from TreatData
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

      // Get existing cart from localStorage
      let cart = [];
      try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (!Array.isArray(cart)) cart = [];
      } catch (e) {
        console.warn("Invalid cart in localStorage, resetting.", e);
        cart = [];
      }

      // Check if the same item + size already exists, then increment quantity
      const existingIndex = cart.findIndex(
        item => item.id === cartItem.id && item.size === cartItem.size
      );
      if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
      } else {
        cart.push(cartItem);
      }

      // Save updated cart to localStorage
      try {
        localStorage.setItem("cart", JSON.stringify(cart));
      } catch (e) {
        console.error("Failed to save cart:", e);
        showToast("Oops! Unable to add to cart. Please try again.");
        return;
      }

      // Update cart counter if the function exists
      if (typeof updateCartCounter === "function") updateCartCounter();

      // Reset quantity to 1
      quantityInput.value = 1;

      // Show toast feedback
      showToast(`${cartItem.name} (${cartItem.size}) added to bag!`);
    });
  }
});