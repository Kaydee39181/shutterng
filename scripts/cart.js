document.addEventListener('DOMContentLoaded', () => {
  const qtyButtons = document.querySelectorAll('.qty-btn');
  const rows = Array.from(document.querySelectorAll('tr[id^="product_"]'));
  const grandTotalEl = document.getElementById('grand_total');

  function formatCurrency(amount){
    // format with 2 decimals and Naira symbol
    return '₦' + amount.toFixed(2);
  }

  function getQtyDivForProduct(productId){
    const row = document.getElementById('product_' + productId);
    if (!row) return null;
    return row.querySelector('div[id^="num"]');
  }

  function getTotalCellForRow(row){
    // last cell in the row
    return row.querySelector('td:last-child');
  }

  function updateRowTotal(row){
    const price = parseFloat(row.dataset.price || '0');
    const qtyDiv = row.querySelector('div[id^="num"]');
    const qty = qtyDiv ? parseInt(qtyDiv.textContent, 10) || 0 : 0;
    const total = price * qty;
    const totalCell = getTotalCellForRow(row);
    if (totalCell) totalCell.textContent = formatCurrency(total);
    return total;
  }

  function updateGrandTotal(){
    let sum = 0;
    rows.forEach(r => { sum += updateRowTotal(r); });
    if (grandTotalEl) grandTotalEl.textContent = formatCurrency(sum);
    saveCartToStorage();
  }

  function saveCartToStorage(){
    const cartData = {};
    rows.forEach(r => {
      const productId = r.id.replace('product_', '');
      const price = parseFloat(r.dataset.price || '0');
      const qtyDiv = r.querySelector('div[id^="num"]');
      const qty = qtyDiv ? parseInt(qtyDiv.textContent, 10) || 0 : 0;
      if (qty > 0) {
        cartData[productId] = { price, qty };
      }
    });
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  // attach listeners to each qty button
  qtyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = btn.dataset.action;
      const productId = btn.dataset.product;
      const qtyDiv = getQtyDivForProduct(productId);
      if (!qtyDiv) return;
      let qty = parseInt(qtyDiv.textContent, 10) || 0;
      if (action === 'add') qty += 1;
      else if (action === 'minus') qty = Math.max(0, qty - 1);
      qtyDiv.textContent = qty;
      updateGrandTotal();
    });
  });

  // initialize display
  rows.forEach(r => {
    // ensure qty div exists
    const qtyDiv = r.querySelector('div[id^="num"]');
    if (qtyDiv && qtyDiv.textContent.trim() === '') qtyDiv.textContent = '0';
    // ensure total cell shows 0
    const totalCell = getTotalCellForRow(r);
    if (totalCell) totalCell.textContent = formatCurrency(0);
  });
  updateGrandTotal();
});
