// Checkout form validation and processing
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkoutForm');
  const messageEl = document.getElementById('message');
  const orderItemsEl = document.getElementById('order-items');
  const orderTotalEl = document.getElementById('order-total');

  if (!form) return;

  // Load cart from localStorage and populate order summary
  function loadCartFromStorage() {
    const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
    if (Object.keys(cartData).length === 0) {
      // If no cart, show placeholder
      if (orderItemsEl) {
        orderItemsEl.innerHTML = '<div style="text-align:center;color:#999;">Your cart is empty</div>';
      }
      return cartData;
    }

    // Populate order items
    let total = 0;
    let html = '';
    Object.entries(cartData).forEach(([productId, data]) => {
      const { price, qty } = data;
      const itemTotal = price * qty;
      total += itemTotal;
      html += `
        <div class="order-item">
          <span><span class="item-name">Product ${productId}</span><br><span class="item-qty">Qty: ${qty}</span></span>
          <span class="item-price">₦${itemTotal.toFixed(2)}</span>
        </div>
      `;
    });

    if (orderItemsEl) orderItemsEl.innerHTML = html;
    if (orderTotalEl) orderTotalEl.textContent = '₦' + total.toFixed(2);
    
    return cartData;
  }

  // Load cart on page load
  loadCartFromStorage();

  function showMessage(text, isError = false) {
    messageEl.textContent = text;
    messageEl.className = 'message ' + (isError ? 'error' : 'success');
  }

  function clearMessage() {
    messageEl.textContent = '';
    messageEl.className = 'message';
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  }

  function isValidPhone(phone) {
    const digits = phone.replace(/[^0-9]/g, '');
    return digits.length >= 7 && digits.length <= 15;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearMessage();

    // Collect form data
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const country = document.getElementById('country').value.trim();

    // Validate required fields
    if (!email || !phone || !firstName || !lastName || !address || !city || !state || !zip || !country) {
      showMessage('Please fill in all required fields', true);
      return;
    }

    // Validate email
    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address', true);
      document.getElementById('email').focus();
      return;
    }

    // Validate phone
    if (!isValidPhone(phone)) {
      showMessage('Please enter a valid phone number (at least 7 digits)', true);
      document.getElementById('phone').focus();
      return;
    }

    // If all validations pass
    showMessage('Order placed successfully! Redirecting...', false);

    // Clear cart after successful order
    localStorage.removeItem('cart');

    // Simulate order processing and redirect after delay
    setTimeout(() => {
      window.location.href = '/camerastore/index.html';
    }, 1500);
  });
});
