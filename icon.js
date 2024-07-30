import { getCart } from "./js/cart.js";
import { getWishList } from "./js/wishList.js";
import { getWishListItems } from "./wishList/wishList.js";
getCart();
const cartIcon = document.getElementById("cartIcon");
console.log("heee");
cartIcon.textContent = `${getCart().length}`;

const wishListIcon = document.getElementById("wishlist");

if (getWishListItems == undefined) {
  wishListIcon.textContent = `0`;
}
wishListIcon.textContent = `${getWishList().length}`;
