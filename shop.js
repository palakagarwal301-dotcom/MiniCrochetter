let cart = [];

function render(){
  const box = document.getElementById("products");
  box.innerHTML = "";

  if(!products || products.length === 0){
    box.innerHTML = "<p>No products found</p>";
    return;
  }

  products.forEach(p=>{
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.img}" onerror="this.src='https://via.placeholder.com/300'">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <button>Add to Cart</button>
    `;

    div.querySelector("button").onclick = () => {
      cart.push(p);
      updateTotal();
    };

    box.appendChild(div);
  });
}

function updateTotal(){
  let total = cart.reduce((s,i)=>s+i.price,0);
  document.getElementById("total").innerText = total;
}

function checkout(){
  if(cart.length === 0){
    alert("Cart is empty");
    return;
  }

  let msg = "🧶 Order:%0A%0A";

  cart.forEach(i=>{
    msg += i.name + " - ₹" + i.price + "%0A";
  });

  let total = cart.reduce((s,i)=>s+i.price,0);
  msg += "%0ATotal: ₹" + total;

  window.open("https://wa.me/918886122232?text=" + msg);
}

render();
updateTotal();
