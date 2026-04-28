"use strict";

/*
    Pawfect Nibbles & Bites
    Internship Project
    
    Pawfect Nibbles & Bites
    Cart JS

    Author:  Meghan Wilkerson
    Date:    2026-03-28

    Filename: PNB_Cart.js
*/

/* ================
   Global Variables
   ================ */

let cart = [];
let selectedShipping = "ground";

const SHIPPING_RATES = {
  ground: 7.50,
  priority: 11.20
};

/* =================
   Shipping Function
   ================= */

function getShippingCost() {
  return SHIPPING_RATES[selectedShipping] || 7.50;
}

/* ==============
   Cart Functions
   ============== */

try {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!Array.isArray(cart)) cart = [];
} catch (e) {
  console.warn("Invalid cart in localStorage, resetting.", e);
  cart = [];
}

function saveCart() {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (e) {
    console.error("Failed to save cart:", e);
  }
}

/* =====================
   Cart Counter Function
   ===================== */

function updateCartCounter() {
  const counterElems = document.querySelectorAll(".cartCount");
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  counterElems.forEach(el => el.textContent = totalCount);
}

/* =====================
   Cart Subtotal Function
   ===================== */

function getCartSubtotal() {
  return cart.reduce((sum, item) => {
    const treat = treatData[item.id];
    const price = treat?.prices[item.size] || 0;
    return sum + (price * item.quantity);
  }, 0);
}

/* ==========================
   Update Cart Total Function
   ========================== */

function updateCartTotal() {
  const subtotalElem = document.getElementById("cartSubtotal");
  const shippingElem = document.getElementById("cartShipping");
  const totalElem = document.getElementById("cartTotal");

  if (!subtotalElem || !shippingElem || !totalElem) return;

  const subtotal = getCartSubtotal();
  const shipping = getShippingCost();
  const total = subtotal + shipping;

  subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
  shippingElem.textContent = `$${shipping.toFixed(2)}`;
  totalElem.textContent = `$${total.toFixed(2)}`;
}

/* =====
   TOAST
   ===== */

function showCartToast(message, onComplete) {
  const overlay = document.createElement("div");
  overlay.className = "toastOverlay";

  const toast = document.createElement("div");
  toast.className = "cartToast";

  const paw = document.createElement("img");
  paw.src = "/Graphics/Pawprints/PurplePawprint.svg";
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

/* =========================
   Render Cart Item Function
   ========================= */

function renderCartItem(item) {
  const treat = treatData[item.id];
  if (!treat) return;

  const price = treat.prices[item.size] || 0;

  const container = document.createElement("div");
  container.className = "cartItem";

  const imgSrc =
    treat.images?.[item.size]?.[0] ||
    treat.img ||
    "../Graphics/Treats/TreatPhotosComingSoon.png";

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

  container.querySelector(".cartItemSize").addEventListener("change", (e) => {
    item.size = e.target.value;
    updateCart();
  });

  container.querySelector(".cartItemQty").addEventListener("input", (e) => {
    const qty = parseInt(e.target.value, 10);
    item.quantity = isNaN(qty) || qty < 1 ? 1 : qty;
    updateCart();
  });

  container.querySelector(".removeItem").addEventListener("click", () => {
    cart = cart.filter(c => c !== item);
    updateCart();
  });

  return container;
}

/* ====================
   Render Cart Function
   ==================== */

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
    const el = renderCartItem(item);
    if (el) container.appendChild(el);
  });

  updateCartTotal();
  updateCartCounter();
}

/* ====================
   Update Cart Function
   ==================== */

function updateCart() {
  saveCart();
  renderCart();
}

/* ==========================
   Get PayPal Items Function
   ========================== */

function getPayPalItems() {
  return cart.map(item => {
    const treat = treatData[item.id];
    const price = treat?.prices[item.size] || 0;

    return {
      name: `${treat.name} (${item.size})`,
      unit_amount: {
        currency_code: "USD",
        value: price.toFixed(2)
      },
      quantity: item.quantity.toString(),
      category: "PHYSICAL_GOODS"
    };
  });
}

/* ==================================
   Initialization and Event Listeners
   ================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const checkoutBtn = document.getElementById("checkoutBtn");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const paypalContainer = document.getElementById("paypal-button-container");

  const shippingOptions = document.querySelectorAll('input[name="shipping"]');
  let paypalRendered = false;

  // Shipping 
  shippingOptions.forEach(opt => {
    opt.addEventListener("change", (e) => {
      selectedShipping = e.target.value;
      updateCartTotal();
    });
  });

  // Clear Cart
  clearCartBtn?.addEventListener("click", () => {
    if (!cart.length) return;
    if (!confirm("Clear your cart?")) return;

    cart = [];
    saveCart();

    renderCart();
    updateCartTotal();
    updateCartCounter();

    paypalContainer.style.display = "none";
    paypalContainer.innerHTML = "";

    checkoutBtn.style.display = "block";
    paypalRendered = false;
  });

  // Checkout
  checkoutBtn?.addEventListener("click", () => {

    if (!cart.length) {
      showCartToast("Your cart is empty. Please add some treats!");
      return;
    }

    checkoutBtn.style.display = "none";

    if (paypalRendered) return;
    paypalRendered = true;

    paypalContainer.style.display = "block";
    paypalContainer.innerHTML = "";

    paypal.Buttons({

      createOrder: (data, actions) => {
        const subtotal = getCartSubtotal();
        const shipping = getShippingCost();
        const total = subtotal + shipping;

        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: "USD",
              value: total.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: subtotal.toFixed(2)
                },
                shipping: {
                  currency_code: "USD",
                  value: shipping.toFixed(2)
                }
              }
            },
            items: getPayPalItems()
          }]
        });
      },

      onApprove: (data, actions) => {
        return actions.order.capture().then(details => {

          showCartToast("Payment successful! Redirecting...", () => {

            // Snapshot
            const orderSnapshot = {
              items: cart,
              subtotal: getCartSubtotal(),
              shipping: getShippingCost(),
              shippingType: selectedShipping,   
              total: getCartSubtotal() + getShippingCost(),
              date: new Date().toISOString(),
              orderId: "PNB-" + Math.floor(10000 + Math.random() * 90000)
            };

            sessionStorage.setItem("lastOrder", JSON.stringify(orderSnapshot));

            cart = [];
            saveCart();
            renderCart();

            paypalContainer.style.display = "none";
            paypalContainer.innerHTML = "";

            checkoutBtn.style.display = "block";
            paypalRendered = false;

            window.location.href = "../PNB_Confirmation.html";
          });

        });
      },

      onError: (err) => {
        console.error(err);
        showCartToast("PayPal error occurred.");

        paypalContainer.style.display = "none";
        paypalContainer.innerHTML = "";

        checkoutBtn.style.display = "block";
        paypalRendered = false;
      }

    }).render("#paypal-button-container");
  });
});