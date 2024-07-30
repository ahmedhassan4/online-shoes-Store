import { addToCart } from "../js/cart.js";
function productTODisplay(product) {
  return ` <div id="item-${product.id}" class="item">
                <div class="item-img">
                  <img src="${product.carousel_images[0]}" alt="${product.name}">
                  <div class="splash">

                  <div class="addCart">
                  <button id="addToCart-${product.id}" class="addToCart" data-id="${product.id}" onclick="addToCartBtn(${product.id})">Add to Cart</button>
                  <h2 id="added-${product.id}"></h2>
                  </div>

                  </div>

                  </div>
                  <div class="item-body">
                  <h2>${product.name}</h2>

                  <p>${product.current_price} $</p>
                  <span>

                  <strong>
                  Rating:
                  </strong>
                  ${product.gender}
                  </span>

                  </div>
                  </div>`;
}
window.addToCartBtn = addToCartBtn;

function addToCartBtn(productID) {
  let products = JSON.parse(localStorage.getItem("products"));
  let product = products.find((p) => p.id === productID);
  addToCart(product);
  console.log(product);
}
function addToCartBtn(productID) {
  let products = JSON.parse(localStorage.getItem("products"));
  let product = products.find((p) => p.id === productID);
  addToCart(product);
  console.log(product);
}

window.addToCartBtn = addToCartBtn;

function displayProducts(products) {
  let ProductRows = products.map(productTODisplay).join("");
  document.getElementById("card-items").innerHTML = ProductRows;
}
///////////////////////////////////////////////////////////////////////////////////////////
function fetchData() {
  fetch("https://dalydev-js.github.io/shoes/shoes.json")
    .then((res) => res.json())
    .then((data) => {
      if (!localStorage.getItem("products")) {
        localStorage.setItem("products", JSON.stringify(data));
      }
      let products = JSON.parse(localStorage.getItem("products") || []);
      displayProducts(products);
    })
    .catch((error) => console.error("Error fetching user data:", error));
}
fetchData();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
