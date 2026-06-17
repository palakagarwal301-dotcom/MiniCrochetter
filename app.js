function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

/* CART COUNT (GLOBAL) */
function updateCartCount(){
  let cart = getCart();

  let count = cart.reduce((s,i)=>s+(i.qty||1),0);

  let el = document.getElementById("cartCount");
  if(el) el.innerText = count;
}

/* ADD TO CART (GLOBAL SAFE) */
function addToCart(product){
  let cart = getCart();
  cart.push({...product, qty:1});
  saveCart(cart);
}

/* INIT */
document.addEventListener("DOMContentLoaded", updateCartCount);
window.addEventListener("storage", updateCartCount);
