import { signOut } from "../signOut/signOut.js";
import { getData } from "../js/api.js";
import { addToCart, getCart } from "../js/cart.js";
import {
  sortHighToLow,
  sortHighToLowRate,
  sortLowToHigh,
  sortLowToHighRate,
} from "../js/sorting.js";
import { setupStorage } from "../js/setupStorage.js";
import { addToWishList, getWishList } from "../js/wishList.js";

let data;
setupStorage();

async function initialize() {
  try {
    data = await getData();
    const userName = JSON.parse(localStorage.getItem("activeUser"));

    if (userName && Object.keys(userName).length !== 0) {
      document.getElementById("userName").style.marginRight = "";
      document.getElementById(
        "userNameMobile"
      ).innerHTML = `Hello ${userName.firstName}`;
      document.getElementById("userName").innerHTML = `<a> Hello, ${
        userName.firstName || userName.name
      }
      
        <div class="dropdown-content-nav" id="dropdown">
          <a id="logOut" href="#" style="backgroundColor: red">Log Out</a>
        </div>
      </a>`;
    }
    document.getElementById("logOut").addEventListener("click", function () {
      signOut();
    });
    showProducts(data);
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
  }
}

export function showProducts(products) {
  let cards = "";
  const cartIcon = document.getElementById("cartIcon");
  const wishList = getWishList() || [];

  const userName = JSON.parse(localStorage.getItem("activeUser"));

  if (userName && Object.keys(userName).length !== 0) {
    cartIcon.textContent = `${getCart().length}`;
  }

  for (let i = 0; i < products.length; i++) {
    const productId = products[i].id;
    let titleStr = products[i].title.substring(0, 20);

    let isLiked = "";
    if (userName && Object.keys(userName).length !== 0) {
      isLiked = wishList.some((item) => item.id === productId) ? "liked" : "";
    }

    cards += ` <div id="item-${productId}" class="item">
          <div class="item-img">
            <img src="${products[i].image}" alt="${products[i].title}">
            <div class="splash">
              <div class="like ${isLiked}" id="like-${productId}">
                <i class="fa-regular fa-heart" id="addToWishList-${productId}"></i>
              </div>
              <div class="addCart">
                <button id="addToCart-${productId}" class="addToCart" data-id="${productId}">Add to Cart</button>
                <h2 class="added" id="added-${productId}"></h2>
              </div>
            </div>
          </div>
          <div class="item-body">
            <h2>${titleStr}</h2>
            <p>${products[i].price} $</p>
            <span>
              <strong>
               <i class="fa-solid fa-star-half-stroke"></i> Rating:
              </strong>
              ${products[i].rating.rate}
            </span>
          </div>
        </div>`;
  }

  document.getElementById("card-items").innerHTML = cards;

  if (userName && Object.keys(userName).length !== 0) {
    products.forEach((product) => {
      document
        .getElementById(`addToCart-${product.id}`)
        .addEventListener("click", function (e) {
          e.stopPropagation();
          addToCart(product);
          updateQuantityDisplay(product.id);
          console.log(getCart());
          this.style.display = "none";
          document.getElementById(`added-${product.id}`).innerHTML =
            "Added to Cart";
        });

      document
        .getElementById(`item-${product.id}`)
        .addEventListener("click", function () {
          const selectedProduct = {
            id: product.id,
            name: product.title || product.name,
            price: product.price || product.current_price,
            image: product.image,
            status: "pending",
            description: product.description,
          };
          localStorage.setItem(
            "selectedProduct",
            JSON.stringify(selectedProduct)
          );
          window.location.href = `../productDetails/?id=${product.id}`;
        });
    });

    products.forEach((product) => {
      const like = document.getElementById(`like-${product.id}`);
      if (wishList.some((item) => item.id === product.id)) {
        like.style.visibility = "visible";
        like.style.backgroundColor = "red";
        like.style.color = "white";
      }

      document
        .getElementById(`addToWishList-${product.id}`)
        .addEventListener("click", function (e) {
          e.stopPropagation();
          addToWishList(product);
          like.style.visibility = "visible";
          like.style.backgroundColor = "red";
          like.style.color = "white";
          console.log(getWishList());
        });
    });
  } else {
    console.log("Please log in first");
  }

  function getQuantity(productId) {
    const cart = getCart();
    const productAmount = cart.filter((item) => item.id === productId);
    return productAmount.length;
  }

  function updateQuantityDisplay(productId) {
    if (userName && Object.keys(userName).length !== 0) {
      const quantityElement = document.getElementById(`quantity-${productId}`);
      cartIcon.textContent = `${getCart().length}`;
      if (quantityElement) {
        quantityElement.textContent = `Quantity: ${getQuantity(productId)}`;
      }
    }
  }

  // Sort by price
  document.getElementById("lowToHigh").addEventListener("click", function (e) {
    e.preventDefault();
    const sortedData = sortLowToHigh(products);
    showProducts(sortedData);
  });

  document.getElementById("highToLow").addEventListener("click", function (e) {
    e.preventDefault();
    const sortedData = sortHighToLow(products);
    showProducts(sortedData);
  });

  // Sort by rating
  document
    .getElementById("lowToHighRate")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const sortedData = sortLowToHighRate(products);
      showProducts(sortedData);
    });

  document
    .getElementById("highToLowRate")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const sortedData = sortHighToLowRate(products);
      showProducts(sortedData);
    });

  // Sort by category
  document.getElementById("men").addEventListener("click", function () {
    const menProducts = data.filter(
      (product) => product.category === "men's clothing"
    );
    showProducts(menProducts);
  });

  document.getElementById("women").addEventListener("click", function () {
    const womenProducts = data.filter(
      (product) => product.category === "women's clothing"
    );
    showProducts(womenProducts);
  });
}

initialize();
