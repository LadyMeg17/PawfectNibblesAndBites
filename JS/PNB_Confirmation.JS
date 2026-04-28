"use strict";

/*
    Pawfect Nibbles & Bites
    Internship Project

    Confirmation JS

    Author: Meghan Wilkerson
    Date: 2026-04-19

    Filename: PNB_Confirmation.js
*/

/* ==================================
   Initialization and Data Retrieval
   ================================== */

document.addEventListener("DOMContentLoaded", () => {

  const orderData = JSON.parse(sessionStorage.getItem("lastOrder"));
  const container = document.querySelector(".orderCard");

  if (!container) return;

  if (!orderData) {
    container.innerHTML = "<p>No recent order found.</p>";
    return;
  }

  /* ===============
     Date Formatting
     =============== */

  const date = orderData.date
    ? new Date(orderData.date).toLocaleString()
    : "Unknown date";

  /* ==================
     Render Order Items
     ================== */

  const itemsHTML = (orderData.items || []).map(item => {

    const treat = treatData?.[item.id];

    const name = treat?.name || "Unknown item";
    const price = treat?.prices?.[item.size] || 0;

    const img =
      treat?.images?.[item.size]?.[0] ||
      treat?.img ||
      "Graphics/Products/placeholder.png";

    return `
      <div class="confirmItem">

        <div class="confirmItemLeft">
          <img src="${img}" alt="${name}" class="confirmItemImg">
        </div>

        <div class="confirmItemCenter">
          <span>${name} (${item.size}) × ${item.quantity}</span>
        </div>

        <div class="confirmItemRight">
          <span>$${(price * item.quantity).toFixed(2)}</span>
        </div>

      </div>
    `;
  }).join("");

  /* ==============
     Shipping Label
     ============== */

  const shippingType = (orderData.shippingType || "").toLowerCase();

  let shippingLabel = "Ground Advantage (5–7 business days)";

  if (shippingType === "priority") {
    shippingLabel = "Priority Mail (2–5 business days)";
  } else if (shippingType === "ground") {
    shippingLabel = "Ground Advantage (5–7 business days)";
  }

  /* ====================
     Render Order Summary
     ==================== */

  container.innerHTML = `
    <h3>Order Summary</h3>

    <p><strong>Order ID:</strong> ${orderData.orderId || "N/A"}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Shipping Method:</strong> ${shippingLabel}</p>

    <hr>

    ${itemsHTML}

    <hr>

    <div class="confirmTotals">
      <p>Subtotal: $${Number(orderData.subtotal || 0).toFixed(2)}</p>
      <p>Shipping: $${Number(orderData.shipping || 0).toFixed(2)}</p>
      <p><strong>Total: $${Number(orderData.total || 0).toFixed(2)}</strong></p>
    </div>
  `;
});