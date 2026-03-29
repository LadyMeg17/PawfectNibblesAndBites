"use strict";

/*

    Pawfect Nibbles & Bites
    Internship Project
    
    Pawfect Nibbles & Bites
    Cart JS

    Author:  Meghan Wilkerson
    Date:    2026-03-29

    Filename: PNB_Cart.js

*/

/* -----------------------
   CART STORAGE
   ----------------------- */

// Load cart from localStorage or start empty
let cart = [];
try {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!Array.isArray(cart)) cart = [];
} catch (e) {
  console.warn("Invalid cart in localStorage, resetting.", e);
  cart = [];
}

// Save cart to localStorage
function saveCart() {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (e) {
    console.error("Failed to save cart:", e);
  }
}

/* -----------------------
   CART COUNTER
----------------------- */
function updateCartCounter() {
  const counterElems = document.querySelectorAll(".cartCount");
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  counterElems.forEach(el => el.textContent = totalCount);
}

/* -----------------------
   RENDER SINGLE ITEM
----------------------- */
function renderCartItem(item) {
  const treat = treatData[item.id]; // Lookup by ID
  if (!treat) return;

  const price = treat.prices[item.size] || 0;

  const container = document.createElement("div");
  container.className = "cartItem";

  // Use the first image in the array for the selected size, fallback if missing
  const imgSrc = treat.images?.[item.size]?.[0] || "../Graphics/Treats/TreatPhotosComingSoon.png";

  container.innerHTML = `
    <img src="${imgSrc}" alt="${item.name}" class="cartItemImg">

    <div class="itemName">${item.name}</div>

    <select class="cartItemSize">
      ${Object.keys(treat.prices).map(size =>
        `<option value="${size}" ${size === item.size ? "selected" : ""}>
          ${size.charAt(0).toUpperCase() + size.slice(1)}
        </option>`
      ).join("")}
    </select>

    <input type="number" class="cartItemQty" min="1" value="${item.quantity}">

    <div class="itemPrice">$${(price * item.quantity).toFixed(2)}</div>

    <button class="removeItem">Remove</button>
  `;

  // -------------------
  // Size change
  // -------------------
  const sizeSelect = container.querySelector(".cartItemSize");
  sizeSelect.addEventListener("change", (e) => {
    item.size = e.target.value;

    // Update price display
    const newPrice = treat.prices[item.size] || 0;
    container.querySelector(".itemPrice").textContent = `$${(newPrice * item.quantity).toFixed(2)}`;

    // Update image for the selected size
    const newImg = treat.images?.[item.size]?.[0] || "../Graphics/Treats/TreatPhotosComingSoon.png";
    container.querySelector(".cartItemImg").src = newImg;

    updateCart();
  });

  // -------------------
  // Quantity change
  // -------------------
  const qtyInput = container.querySelector(".cartItemQty");
  qtyInput.addEventListener("input", (e) => {
    const newQty = parseInt(e.target.value, 10);
    item.quantity = isNaN(newQty) || newQty < 1 ? 1 : newQty;

    // Update price display immediately
    const price = treat.prices[item.size] || 0;
    container.querySelector(".itemPrice").textContent = `$${(price * item.quantity).toFixed(2)}`;

    updateCart();
  });

  // -------------------
  // Remove item
  // -------------------
  const removeBtn = container.querySelector(".removeItem");
  removeBtn.addEventListener("click", () => {
    cart = cart.filter(cartItem => cartItem !== item);
    updateCart();
  });

  return container;
}

/* -----------------------
   RENDER ENTIRE CART
----------------------- */
function renderCart() {
  const container = document.getElementById("cartItemsContainer");
  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p>Your cart is empty.</p>`;
    updateCartTotal();
    updateCartCounter();
    return;
  }

  cart.forEach(item => {
    const itemElem = renderCartItem(item);
    if (itemElem) container.appendChild(itemElem);
  });

  updateCartTotal();
  updateCartCounter();
}

/* -----------------------
   UPDATE CART
----------------------- */
function updateCart() {
  saveCart();
  renderCart();
}

/* -----------------------
   CART TOTAL
----------------------- */
function updateCartTotal() {
  const totalElem = document.getElementById("cartTotal");
  if (!totalElem) return;

  const total = cart.reduce((sum, item) => {
    const treat = treatData[item.id];
    const price = treat?.prices[item.size] || 0;
    return sum + (price * item.quantity);
  }, 0);

  totalElem.textContent = `$${total.toFixed(2)}`;
}

/* -----------------------
   INITIALIZE
----------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});