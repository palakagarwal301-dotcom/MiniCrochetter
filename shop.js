let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* SAVE */
function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateTotal();
}

/* ADD */
function add(p){
  let item = cart.find(i => i.id === p.id);

  if(item){
    item.qty += 1;
  }else{
    cart.push({...p, qty:1});
  }

  saveCart();
}

/* REMOVE */
function remove(id){
  cart = cart.filter(i => i.id !== id);
  saveCart();
}

/* QTY */
function changeQty(id, delta){
  let item = cart.find(i => i.id === id);
  if(!item) return;

  item.qty += delta;

  if(item.qty <= 0){
    remove(id);
  }

  saveCart();
}

/* TOTAL */
function updateTotal(){
  let total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  document.getElementById("total").innerText = total;
}

/* RENDER */
function render(){
  const box = document.getElementById("products");
  box.innerHTML = "";

  products.forEach(p=>{
    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.img}">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <button>Add to Cart</button>
    `;

    div.querySelector("button").onclick = ()=> add(p);

    box.appendChild(div);
  });
}

/* CHECKOUT */
function checkout(){
  if(cart.length === 0){
    alert("Cart empty");
    return;
  }

  let msg = "Order:%0A";

  cart.forEach(i=>{
    msg += `${i.name} x${i.qty} = ₹${i.price*i.qty}%0A`;
  });

  let total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  msg += "%0ATotal: ₹"+total;

  window.open("https://wa.me/918886122232?text="+msg);
}

render();
updateTotal();
