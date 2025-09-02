document.addEventListener("DOMContentLoaded", () => {

  const collectionCards = document.querySelectorAll(".collection-card");
  const cartList = document.querySelector(".cart-list");
  const cartSummary = document.querySelector(".cart-summary");
  const checkoutBtn = document.querySelector(".checkout-btn");
  const paymentMethod = document.querySelector(".payment-method");

  const cardPopup = document.querySelector(".card-popup");
  const cardClose = document.querySelector(".card-close");
  const cardSubmit = document.querySelector(".card-submit");
  const cardNumberInput = document.querySelector(".card-number");
  const cardExpiryInput = document.querySelector(".card-expiry");

  let cart = [];

  // Expand description
  collectionCards.forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("expanded"));
  });

  // Add to cart button
  document.querySelectorAll(".btn.add-to-cart").forEach(btn=>{
    btn.addEventListener("click", e=>{
      e.stopPropagation();
      const title=btn.dataset.title;
      const price=btn.dataset.price;
      cart.push({title, price});
      updateCart();
      showToast(`${title} added to cart`);
    });
  });

  // Update cart UI
  function updateCart(){
    cartList.innerHTML="";
    let total=0;
    cart.forEach((item,index)=>{
      const li=document.createElement("li");
      li.innerHTML=`<span class="cart-item-name">${item.title}</span><span class="cart-item-price">${item.price}</span><button class="cart-remove" data-index="${index}">&times;</button>`;
      cartList.appendChild(li);
      total+=parseFloat(item.price.replace(/[^\d.]/g,""));
    });
    if(paymentMethod.value==="cash") total+=10;
    cartSummary.innerHTML=`<div class="summary-row"><span>Total:</span><span>${total.toFixed(2)} AED</span></div>`;
  }

  // Remove item
  cartList.addEventListener("click", e=>{
    if(e.target.matches(".cart-remove")){
      const index=e.target.dataset.index;
      cart.splice(index,1);
      updateCart();
    }
  });

  // Toast
  const toast=document.querySelector(".toast");
  function showToast(msg){
    toast.innerText=msg;
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"),2000);
  }

  // Checkout button
  checkoutBtn.addEventListener("click", ()=>{
    if(cart.length===0){ showToast("Cart is empty!"); return; }

    if(paymentMethod.value==="cash"){
      // Cash: just show bill
      let total=10; 
      let bill="Your Bill:\n";
      cart.forEach(item=>{
        bill+=`${item.title} - ${item.price}\n`;
        total+=parseFloat(item.price.replace(/[^\d.]/g,""));
      });
      bill+=`Cash on Delivery: 10 AED\nTotal: ${total.toFixed(2)} AED`;
      alert(bill);
    }else{
      // Card: show card popup
      cardPopup.classList.remove("hidden");
    }
  });

  // Card popup close
  cardClose.addEventListener("click", ()=>cardPopup.classList.add("hidden"));

  // Card submit
  cardSubmit.addEventListener("click", ()=>{
    const cardNumber=cardNumberInput.value.replace(/\s/g,"");
    const expiry=cardExpiryInput.value;
    if(cardNumber.length!==16){ alert("Enter 16-digit card number"); return; }
    if(!expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)){ alert("Enter valid expiry MM/YY"); return; }
    
    // Show bill
    let total=0;
    let bill="Your Bill:\n";
    cart.forEach(item=>{
      bill+=`${item.title} - ${item.price}\n`;
      total+=parseFloat(item.price.replace(/[^\d.]/g,""));
    });
    bill+=`Total: ${total.toFixed(2)} AED`;
    alert(bill);
    cardPopup.classList.add("hidden");
  });

  // Payment method change
  paymentMethod.addEventListener("change", updateCart);

});
