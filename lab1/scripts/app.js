if (localStorage.getItem('item-counter') === null) {
    localStorage.setItem('item-counter', JSON.stringify(0));
}
if (localStorage.getItem('cartList') === null) {
    localStorage.setItem('cartList', JSON.stringify([]));
}
const listProductsHTML = document.querySelector('.item-container');
const currentCategory = document.querySelector('.current-category');
const btnCategory = document.querySelectorAll('.btn-category');
const cartSumCounter = document.getElementById("counter");
let cartList = [];


const addDataToHtml = (a=1) => {
    listProductsHTML.innerHTML = "";
    currentCategory.children[0].innerHTML = data.categories[a-1].name;
    data.categories[a-1].products.forEach(product => {
        let hidden = "hidden";
        let quantity = 0
        if(JSON.parse(localStorage.getItem('cartList')).find(item => item.id == product.id) !== undefined){
            hidden = "";
            quantity = JSON.parse(localStorage.getItem('cartList')).find(item => item.id == product.id).quantity;
        }
        let newProduct = document.createElement("div");
        newProduct.innerHTML = `
            <div id="${product.id}" class="item" category="${data.categories[a-1].name}">
                <div class="img-holder">
                    <img src="${product.image}" alt="">
                    <button class="btn-add ${hidden}">
                        <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                            <path class="icon" d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                        </svg>
                    </button>
                    <p class="${hidden}">${quantity}</p>
                </div>
                <h1>${product.name}</h1>
                <p>${product.price} €</p>
            </div>
        `;
        listProductsHTML.appendChild(newProduct);
    })
};
addDataToHtml();
listProductsHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('svg')){
        let id_product =
        {
            "id": positionClick.parentElement.parentElement.parentElement.id,
            "category": positionClick.parentElement.parentElement.parentElement.getAttribute("category")
        };
        addToCart(id_product);
        localStorage.setItem("item-counter", +localStorage.getItem("item-counter") + 1);
        updateItem(positionClick.parentElement.parentElement.parentElement);

    }else 
    if (positionClick.classList.contains('icon')){
        let id_product =
        {
            "id": positionClick.parentElement.parentElement.parentElement.parentElement.id,
            "category": positionClick.parentElement.parentElement.parentElement.parentElement.getAttribute("category")
        };
        addToCart(id_product);
        localStorage.setItem("item-counter", +localStorage.getItem("item-counter") + 1);
        updateItem(positionClick.parentElement.parentElement.parentElement.parentElement);
    };
});



const updateItem = (itm) => {
    let parse = JSON.parse(localStorage.getItem("cartList")).find(item => item.id == itm.id);
    let quantity = null;
    if (parse !== undefined) {
        quantity = parse.quantity;
    }

    if (quantity === null) {
        itm.children[0].children[2].classList.add("hidden");
    }else{
        itm.children[0].children[2].classList.remove("hidden");
        itm.children[0].children[2].innerHTML = `${quantity}`;
    }
    updateSumCounter();
}

const updateSumCounter = () => {
    if (+localStorage.getItem('item-counter') === 0) {
        cartSumCounter.classList.add("hidden");
    }else{
        cartSumCounter.classList.remove("hidden");
        cartSumCounter.innerHTML = localStorage.getItem('item-counter');
    }
}

const updateAllItemCounters = () => {
    Array.from(listProductsHTML.children).forEach(item => {
        updateItem(item.children[0]);
    });
};


updateSumCounter();



window.addEventListener('storage', (event) => {
    if (event.key === 'cartList') {
        updateAllItemCounters();
    }
    if(event.key === 'item-counter'){
        updateSumCounter();
    }
});


//dodaj u localstorage
const addToCart = (id_product) => {
    if (localStorage.getItem('cartList').length === 0) {
        let itm = {
            "id": id_product.id,
            "category": id_product.category,
            "quantity": 1
        }
        cartList.push(itm);
    }else{
        cartList = JSON.parse(localStorage.getItem('cartList'));
        let itm = cartList.find(item => item.id == id_product.id);
        if(itm == undefined){
            itm = {
                "id": id_product.id,
                "category": id_product.category,
                "quantity": 1
            }
            cartList.push(itm);
        }else{
            itm.quantity = itm.quantity + 1;
        }
    }
    localStorage.setItem('cartList', JSON.stringify(cartList));
}



//promjena kategorija
btnCategory.forEach((btn) => {
    btn.addEventListener("click", () => {
        addDataToHtml(+btn.getAttribute("category"));
    })
})




