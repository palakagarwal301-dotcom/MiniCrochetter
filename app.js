function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

/* ADD ITEM */
function addToCart(product){
  let cart = getCart();

  let existing = cart.find(i => i.name === product.name);

  if(existing){
    existing.qty += 1;
  } else {
    cart.push({...product, qty: 1});
  }

  saveCart(cart);
}

/* REMOVE ITEM */
function removeFromCart(name){
  let cart = getCart();
  cart = cart.filter(i => i.name !== name);
  saveCart(cart);
  renderCart();
}

/* CHANGE QTY */
function changeQty(name, delta){
  let cart = getCart();

  let item = cart.find(i => i.name === name);
  if(!item) return;

  item.qty += delta;

  if(item.qty <= 0){
    cart = cart.filter(i => i.name !== name);
  }

  saveCart(cart);
  renderCart();
}

/* CART COUNT */
function updateCartCount(){
  let cart = getCart();
  let count = cart.reduce((s,i)=>s+i.qty,0);

  let el = document.getElementById("cartCount");
  if(el) el.innerText = count;
}
