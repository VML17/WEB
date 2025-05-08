document.addEventListener('DOMContentLoaded', () => {
    const cartListHTML = document.querySelector(".cart-items");
    const cartSumCounter = document.getElementById("counter");

    let cartList = JSON.parse(localStorage.getItem('cartList'));
    if (cartList === null) {
        cartList = [];
    }
    
    
    cartList.forEach(item => {
        let itm = data.categories.find(kat => kat.name === item.category).products.find(product => product.id == item.id);
        
        
        let newProduct = document.createElement("div");
        newProduct.classList.add("cart-item");
        newProduct.setAttribute("id", itm.id);
        let total = (+itm.price * item.quantity);
        newProduct.innerHTML = `
        <div class="cart-img-name">
        <img src="${itm.image}" alt="">
        <h1>${itm.name}</h1>
        </div>
        <div class="price-details">
        <div class="quantity">
        <button id="btnminus" class="btn-quantity">-</button>
        <p id="item-quantity">${item.quantity}</p>
        <button id="btnplus" class="btn-quantity">+</button>
        </div>
        <div>
        <p>Cijena:</p>
        <p>${itm.price}€</p>
        </div>
        
        <div class="total-price">
        <p>Ukupno:</p>
        <p>${total.toFixed(2)}€</p>
        </div>
        </div>
        `;
        cartListHTML.appendChild(newProduct);
    });

    const btnMinus = document.querySelectorAll("#btnminus");
    const btnPlus = document.querySelectorAll("#btnplus");


    btnMinus.forEach((btn) => {
        btn.addEventListener("click", () => {
            let id = btn.parentElement.parentElement.parentElement.id;
            let list = JSON.parse(localStorage.getItem('cartList'));
            let item = list.find(itm => itm.id == id);
            if (item.quantity > 1) {
                item.quantity--;
                btn.parentElement.children[1].innerHTML = item.quantity;
                let price = data.categories.find(kat => kat.name === item.category).products.find(itm => itm.id == id).price;
                btn.parentElement.parentElement.children[2].children[1].innerHTML = `${(item.quantity * price).toFixed(2)}€`;
                localStorage.setItem('cartList', JSON.stringify(list));
            } else {
                list.splice(list.indexOf(item), 1);
                localStorage.setItem('cartList', JSON.stringify(list));
                btn.parentElement.parentElement.parentElement.remove();
            }
            localStorage.setItem("item-counter", +localStorage.getItem("item-counter") - 1);
            updateSumCounter();
        });
    });

    btnPlus.forEach((btn) => {
        btn.addEventListener("click", () => {
            let id = btn.parentElement.parentElement.parentElement.id;
            let list = JSON.parse(localStorage.getItem('cartList'));
            let item = list.find(itm => itm.id == id);
            item.quantity++;
            btn.parentElement.children[1].innerHTML = item.quantity;
            let price = data.categories.find(kat => kat.name === item.category).products.find(itm => itm.id == id).price;
            btn.parentElement.parentElement.children[2].children[1].innerHTML = `${(item.quantity * price).toFixed(2)}€`;
            localStorage.setItem('cartList', JSON.stringify(list));

            localStorage.setItem("item-counter", +localStorage.getItem("item-counter") + 1);
            updateSumCounter();
        });
    });


    window.addEventListener("storage", (event) => {
        if (event.key === "cartList") {
            location.reload();
        }
    });

    const updateSumCounter = () => {
        if (+localStorage.getItem('item-counter') === 0) {
            cartSumCounter.classList.add("hidden");
        }else{
            cartSumCounter.classList.remove("hidden");
            cartSumCounter.innerHTML = localStorage.getItem('item-counter');
        }
    }
    updateSumCounter();
});
