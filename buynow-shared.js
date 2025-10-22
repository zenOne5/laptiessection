document.addEventListener('DOMContentLoaded', ()=>{
  // For each buy page instance, wire up controls
  const containers = document.querySelectorAll('.product-wrap');
  containers.forEach(container => {
    const dec = container.querySelector('.dec');
    const inc = container.querySelector('.inc');
    const qtyInput = container.querySelector('.qty-input');
    const totalEl = container.querySelector('.total');
    const priceEl = container.querySelector('.price');
    const buyBtn = container.querySelector('.buy');
    const addCartBtn = container.querySelector('.addcart');

    // If this page uses different IDs (buynow.html) we handle gracefully
    const qty = qtyInput || document.getElementById('qty');
    const decBtn = dec || document.getElementById('decQty');
    const incBtn = inc || document.getElementById('incQty');
    const totalElement = totalEl || document.getElementById('total');
    const priceElement = priceEl || document.getElementById('productPrice');

    // Parse price into number (strip non-digits)
    function parsePriceNode(node){
      if(!node) return 0;
      const text = node.textContent || node.value || '';
      const digits = text.replace(/[^0-9]/g,'');
      return Number(digits) || 0;
    }

    const unitPrice = parsePriceNode(priceElement);

    function formatPeso(n){ return '₱' + n.toLocaleString(); }

    function updateTotal(){
      if(!qty) return;
      let q = parseInt(qty.value, 10);
      if(isNaN(q) || q < 1) q = 1;
      qty.value = q; // normalize
      const total = q * unitPrice;
      if(totalElement) totalElement.textContent = formatPeso(total);
    }

    // Buttons may not exist on page variants
    if(decBtn){ decBtn.addEventListener('click', ()=>{ const val = Number(qty.value || 1) - 1; qty.value = Math.max(1, val); updateTotal(); }); }
    if(incBtn){ incBtn.addEventListener('click', ()=>{ qty.value = Number(qty.value || 1) + 1; updateTotal(); }); }

    if(qty){
      qty.addEventListener('input', ()=>{
        // Ensure only integers and min 1
        let v = qty.value.replace(/[^0-9]/g,'');
        if(v === '') v = '1';
        qty.value = String(Math.max(1, Number(v)));
        updateTotal();
      });
      qty.addEventListener('change', updateTotal);
    }

    if(buyBtn){ buyBtn.addEventListener('click', ()=>{
      const q = qty ? Number(qty.value) : 1;
      const name = container.querySelector('h2') ? container.querySelector('h2').textContent : document.getElementById('productName')?.textContent;
      const total = formatPeso(q * unitPrice);
      alert(`CHECKOUT\n\nProduct: ${name}\nQuantity: ${q}\nTotal: ${total}\n\n(This is a demo checkout — integrate a payment gateway to accept payments)`);
    }); }

    if(addCartBtn){ addCartBtn.addEventListener('click', ()=>{ alert('ADDED TO CART — Open cart implementation to view items.'); }); }

    // initialize totals
    updateTotal();
  });
});
