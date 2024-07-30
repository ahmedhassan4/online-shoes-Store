import { addToCart, getCart, removeFromCart } from "../js/cart.js";
import { signOut } from "../signOut/signOut.js";

const user = localStorage.getItem("activeUser", JSON.stringify());
if (!user) {
  console.log("no user");
}

const cartItems = getCart();

cartIcon.textContent = cartItems.length;
export function getCartList() {
  let cards = ``;
  const itemCounts = {};
  let totalPrice = 0;
  if (cartItems.length === 0) {
    cards = `<div><h1 "> No items added<h1>
    <a href="../products/index.html"> Shop Now </a>
    </div>`;
  } else {
    for (let i = 0; i < cartItems.length; i++) {
      const productId = cartItems[i].id;
      if (itemCounts[productId]) {
        itemCounts[productId]++;
      } else {
        itemCounts[productId] = 1;
      }
      totalPrice += cartItems[i].price;
    }

    for (let i = 0; i < cartItems.length; i++) {
      const productId = cartItems[i].id;
      if (itemCounts[productId] > 0) {
        const quantity = itemCounts[productId];

        cards += `
  <div class="flex items-center justify-between ">
  <button id="delete-${cartItems[i].id}">
                    <span><i class="fa-solid fa-trash-can"></i></span>
                    <span>Delete</span>
                  </button>
        <div class="flex items-center justify-center p-3">
          <img src="${cartItems[i].image}" alt="${cartItems[i].image}" class="w-16  h-16 rounded-lg" />
          <div>
            <h3 class="font-semibold ml-2">Musk Rose Cooper</h3>
            <p class="text-muted-foreground ml-2">${cartItems[i].category}</p>
            
          </div>
        </div>
        <div class="flex justify-between mr-32 w-1">
         
          <span class=" " >${quantity}</span>
           
        </div>
        <span >${cartItems[i].price}</span>
          
      </div>

      `;
      }

      itemCounts[productId] = 0;
    }
  }

  document.getElementById("cart-items").innerHTML = cards;
  cartItems.forEach((item) =>
    document
      .getElementById(`delete-${item.id}`)
      .addEventListener("click", function () {
        removeFromCart(item);

        console.log("deleted");
        getCartList();
      })
  );
  const price = document.getElementById("cart-price");
  const cartIcon = document.getElementById("cartIcon");
  const quantity = document.getElementById("quantity");
  price.innerHTML = totalPrice.toFixed(2);
  quantity.innerHTML = `x${cartItems.length}`;
  cartIcon.innerHTML = cartItems.length;
}

getCartList();
const userName = JSON.parse(localStorage.getItem("activeUser"));
if (Object.keys(userName).length !== 0) {
  document.getElementById("toCheckOut").addEventListener("click", function () {
    window.location.href = "../orders";
    console.log("clicked");
  });
} else {
  document.getElementById("toCheckOut").style.display = "none";
}

console.log("hello");

console.log(userName.firstName);
if (Object.keys(userName).length !== 0) {
  document.getElementById("userName").style.marginRight = "30px";
  document.getElementById(
    "userName"
  ).innerHTML = `<a> Hello, ${userName.firstName}
          <div class="dropdown-content-nav" id="dropdown">
                                          <a href="../orders/">My Orders</a>
  
                                          <a href="#" id="logOut">Log Out</a>
                                      </div>
  
        </a>`;
  document.getElementById("logOut").addEventListener("click", function () {
    signOut();
  });
}
