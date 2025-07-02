
document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.getAttribute('data-id');
        fetch(`/cart/add/${id}`, {
           method: 'POST'
        }) 
        .then(res => {
            if (!res.ok) throw new Error('Server error: ' + res.status);
            return res.json();
        })
        .then(data => {
            const itemCounter = document.querySelector(`.product-counter[data-id="${id}"]`);
            const item = data.cart.find(item => String(item.id) === String(id));
            console.log("item: ", item);
            console.log("itemCounter: ", itemCounter);

            if (item && item.quantity > 0 && itemCounter) {
                itemCounter.classList.remove('hidden');
                itemCounter.innerHTML = item.quantity;
            }
            updateCartTotal(data.cart);
            localStorage.setItem('cart-updated', Date.now());
      
        })
        .catch(err => {
            console.error('Greška u fetchu:', err);
        });
    });
});


function updateCartTotal(cart) {
    const total = cart.reduce ((sum, item) => sum + item.quantity, 0);
    console.log("Total: ", total);
    let totalCounter = document.getElementById('totalCounter');
    if (total > 0) {
        totalCounter.classList.remove('hidden');
        totalCounter.innerHTML = total;
    }
}

window.addEventListener('storage', function(event) {
    if (event.key === 'cart-updated') {
        window.location.reload();
    }
});