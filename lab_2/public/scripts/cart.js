
document.querySelectorAll('#btnplus').forEach(btn => {
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
            console.log("Data from server: ", data);
            const itemCounter = document.querySelector(`#item-quantity[data-id="${id}"]`);
            const item = data.cart.find(item => String(item.id) === String(id));
            console.log("item: ", item);
            console.log("itemCounter: ", itemCounter);

            if (item && itemCounter) {
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

document.querySelectorAll('#btnminus').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.getAttribute('data-id');
        fetch(`/cart/remove/${id}`, {
           method: 'POST'
        }) 
        .then(res => {
            if (!res.ok) throw new Error('Server error: ' + res.status);
            return res.json();
        })
        .then(data => {
            console.log("Data from server: ", data);
            const itemCounter = document.querySelector(`#item-quantity[data-id="${id}"]`);
            const item = data.cart.find(item => String(item.id) === String(id));
            console.log("item: ", item);
            console.log("itemCounter: ", itemCounter);

            if (item && itemCounter) {
                itemCounter.classList.remove('hidden');
                itemCounter.innerHTML = item.quantity;
            }else {
                const element = document.querySelector(`#item-quantity[data-id="${id}"]`).parentElement.parentElement.parentElement;
                element.remove();
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
    }else {
        totalCounter.classList.add('hidden');
        totalCounter.innerHTML = '';
        window.location.reload();
    }
}

window.addEventListener('storage', function(event) {
    if (event.key === 'cart-updated') {
        window.location.reload();
    }
});