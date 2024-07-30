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
       <div class="cart-item">
              <div class="cart-body">
                <div class="cart-details">
                  <div class="cart-item-img">
                    <img src="${cartItems[i].image}" alt="" />
                  </div>
                  <div class="cart-item-details">
                    <h2>
                      ${cartItems[i].name}
                    </h2>
                    <p><strong>quantity : ${quantity}</strong> </p>
                  </div>
                </div>
                <div class="cart-price">${cartItems[i].price} $</div>
              </div>
              <div class="cart-add-remove">
                <div class="remove">
                  <button id="delete-${cartItems[i].id}">
                    <span><i class="fa-solid fa-trash-can"></i></span>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
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
  price.textContent = totalPrice.toFixed(2);
  quantity.textContent = `x${cartItems.length}`;
  cartIcon.textContent = cartItems.length;
}

getCartList();
const userName = JSON.parse(localStorage.getItem("activeUser"));
if (Object.keys(userName).length !== 0) {
  document.getElementById("toCheckOut").addEventListener("click", function () {
    window.location.href = "../orders";
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
  
                                          <a href="#">Log Out</a>
                                      </div>
  
        </a>`;
}
