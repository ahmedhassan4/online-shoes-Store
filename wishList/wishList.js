import { addToCart, getCart, removeFromCart } from "../js/cart.js";
import { getWishList, removeFromWishList } from "../js/wishList.js";
import { signOut } from "../signOut/signOut.js";

const user = localStorage.getItem("activeUser", JSON.stringify());
if (!user) {
  console.log("no user");
}

const cartItems = getCart();
const wishListItems = getWishList();
console.log(wishListItems);

export function getWishListItems() {
  let cards = ``;
  const itemCounts = {};

  if (wishListItems.length === 0) {
    cards = `<div><h1 "> No items added<h1>
    <a href="../products/index.html"> Go to products page </a>
    </div>`;
  }

  for (let i = 0; i < wishListItems.length; i++) {
    const productId = wishListItems[i].id;

    cards += `
       <div class="cart-item" id="item-${productId}" >
              <div class="cart-body">
                <div class="cart-details">
                  <div class="cart-item-img">
                    <img src="${wishListItems[i].image}" alt="" />
                  </div>
                  <div class="cart-item-details">
                    <h2>
                      ${wishListItems[i].name}
                    </h2>
                   
                  </div>
                </div>
                <div class="cart-price">${wishListItems[i].price} $</div>
              </div>
              <div class="cart-add-remove">
                <div class="remove">
                  <button id="delete-${wishListItems[i].id}">
                    <span><i class="fa-solid fa-trash-can"></i></span>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
      `;

    itemCounts[productId] = 0;
  }

  document.getElementById("cart-items").innerHTML = cards;

  wishListItems.forEach((item) => {
    document
      .getElementById(`delete-${item.id}`)
      .addEventListener("click", function (e) {
        e.stopPropagation();
        removeFromWishList(item);
        console.log("deleted");
        getWishListItems();
      });

    document
      .getElementById(`item-${item.id}`)
      .addEventListener("click", function (e) {
        e.stopPropagation();
        item = {
          id: item.id,
          name: item.title || item.name,
          price: item.price || item.current_price,
          image: item.image,
          status: "pending",
          description: item.description,
        };
        localStorage.setItem("selectedProduct", JSON.stringify(item));
        window.location.href = `../productDetails/?id=${item.id}`;
      });
  });

  const cartIcon = document.getElementById("cartIcon");

  cartIcon.textContent = cartItems.length;
}

getWishListItems();

const userName = JSON.parse(localStorage.getItem("activeUser"));
console.log(userName.firstName);
if (Object.keys(userName).length !== 0) {
  document.getElementById("userName").style.marginRight = "30px";
  document.getElementById(
    "userName"
  ).innerHTML = `<a> Hello, ${userName.firstName}
          <div class="dropdown-content-nav" id="dropdown">
                                          <a href="#">Log Out</a>
                                      </div>
  
        </a>`;
}
