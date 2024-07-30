// علي بركه الله
///////////////////////////////////////////////////////////////////////////////////////////////

let activeUser = JSON.parse(localStorage.getItem("activeUser"));
if (!activeUser || activeUser.role == "user" || activeUser.role == null) {
  window.location.href = "../error.html";
}
// variable
let cardsContainer = document.querySelector(".product-cards");
let editProductId = document.querySelector(".product-id-edit");
let editProductImage = document.querySelector(".edit-info-img");
let editProductName = document.querySelector(".product-name-edit");
let editProductDescription = document.querySelector(
  ".product-description-edit"
);
let editProductCategory = document.querySelector(".product-category-edit");
let editProductPrice = document.querySelector(".price-category-edit");
//inventoryTab
let editProductQuantity = document.querySelector(".product-qty-edit");
let editProductLocation = document.querySelector(".product-location-edit");
let editBuyPrice = document.querySelector(".buy-price-edit");
//color options
let productColorContainer = document.querySelector(".color-checkbox-container");
//size Options
let productSizeContainer = document.querySelector(".size-checkbox-container");
//variable used in update and delete Item
let removeProductBtn = document.querySelector(".remove-product");
let updateProductBtn = document.querySelector(".update-image-btn");
let producNameInput = document.querySelector(".product-name-edit");
let productCategoryInput = document.querySelector(".product-category-edit");
let productPriceInput = document.querySelector(".price-category-edit");
let productidInput = document.querySelector(".product-id-edit");
// image of Products
let procductPic = document.getElementById("add-product-image");
let inputFile = document.getElementById("update-image");

// Add Product
let addNewProductName = document.querySelector(".add-new-product-name");
let addNewProductDescription = document.querySelector(
  ".add-new-product-description"
);
let addNewProductCategory = document.querySelector(".add-new-product-category");
let addNewProductPrice = document.querySelector(".add-new-product-price");
let addNewProductImage = document.querySelector(".add-new-product-image");
let addNewProductBtn = document.querySelector(".Add-new-product-btn");
// products Category List
let headerNavBtns = document.querySelectorAll(".btn");
let getAllProductsBtn = document.querySelector(".all-products");
let getShoesBtn = document.querySelector(".get-shoes-btn");
let getApparelBtn = document.querySelector(".get-tshirt-btn");
// search
let searchInput = document.querySelector(".search-product-input");
// tabs
let tabButtons = document.querySelectorAll(".tab-button");
let tabs = document.querySelectorAll(".content");
// Related iamge container
let relatedImageContainer = document.querySelector(".img-container");
// sort
let sortBtn = document.querySelector(".sort-btn");
let sortList = document.querySelector(".sort-list-container");

let sortByIdBtn = document.querySelector(".sort-by-default");
let sortByNameBtn = document.querySelector(".sort-by-name");
let sortByPriceBtn = document.querySelector(".sort-by-price");
let sortByGenderBtn = document.querySelector(".sort-by-gender");

/////////////////////////////////////////////////////////////////////////////////////////////////
// methods

function getProducts() {
  return JSON.parse(localStorage.getItem("products") || []);
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

inputFile.onchange = function () {
  procductPic.src = URL.createObjectURL(inputFile.files[0]);
};

// /////////////////////////////////////////////////////////////////////////////////////
// products Category List
headerNavBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    headerNavBtns.forEach((ele) => {
      ele.classList.remove("active");
    });
    btn.classList.add("active");
  });
});

getAllProductsBtn.addEventListener("click", () => {
  let products = getProducts();
  displayProducts(products);
});

getShoesBtn.addEventListener("click", () => {
  getAllShoes();
});
function getAllShoes() {
  let products = getProducts();
  let shoes = products.filter((product) => product.type == "Shoes");
  displayProducts(shoes);
}

getApparelBtn.addEventListener("click", () => {
  getAllApparel();
});
function getAllApparel() {
  let products = getProducts();
  let apparel = products.filter((product) => product.type == "Apparel");
  displayProducts(apparel);
}

///////////////////////////////////////////////////////////////////////////////
// Remove Item
removeProductBtn.addEventListener("click", () => {
  RemoveProduct(producNameInput.value);
});

function RemoveProduct(productName) {
  let products = getProducts();
  let availableProduct = products.filter(
    (product) => product.name != productName
  );
  saveProducts(availableProduct);
  displayProducts(availableProduct);
}

// ///////////////////////////////////////////////////////////////////////////////////
// // update Item
updateProductBtn.addEventListener("click", () => {
  updateProduct(productidInput.value);
});

function updateProduct(productId) {
  let products = getProducts();
  let selectedProduct = products.find((product) => product.id == productId);

  selectedProduct.category = productCategoryInput.value;
  selectedProduct.name = producNameInput.value;
  selectedProduct.current_price = productPriceInput.value;
  selectedProduct.in_stock = editProductQuantity.value;
  selectedProduct.location = editProductLocation.value;
  selectedProduct.buy_price = editBuyPrice.value;

  saveProducts(products);
  displayProducts(products);
}

/////////////////////////////////////////////////////////////////////////////////////
// Add Product

addNewProductBtn.addEventListener("click", () => {
  addNewProduct();
});
function addNewProduct() {
  let product = getProducts();
  let newProduct = {
    id: product[product.length - 1].id + 1,
    name: addNewProductName.value,
    current_price: addNewProductPrice.value,
    category: addNewProductCategory.value,
    carousel_images: [],
  };

  console.log(newProduct);

  let reader = new FileReader();
  reader.onload = () => {
    newProduct.carousel_images.push(reader.result);
    product.push(newProduct);
    saveProducts(product);
    displayProducts(product);
  };
  reader.readAsDataURL(addNewProductImage.files[0]);
}

/////////////////////////////////////////////////////////////////////////////////////
// serach Product
searchInput.addEventListener("keyup", (event) => {
  let products = getProducts();
  let filteredProducts = products.filter((product) =>
    product.name.toLocaleLowerCase().includes(event.target.value.toLowerCase())
  );
  displayProducts(filteredProducts);
});

////////////////////////////////////////////////////////////////////////////////////////////////
// sort

// display sort menu
sortBtn.addEventListener("click", () => {
  sortList.classList.toggle("hidden");
});
document.addEventListener("click", (event) => {
  if (
    !sortList.classList.contains("hidden") &&
    !sortBtn.contains(event.target) &&
    !sortList.contains(event.target)
  ) {
    sortList.classList.add("hidden");
  }
});

// sor By Id
sortByIdBtn.addEventListener("click", () => {
  sortByProductsId();
});
function sortByProductsId() {
  let products = getProducts();
  let sortedProducts = products.sort((a, b) => a.id - b.id);
  displayProducts(sortedProducts);
}
// sor By Name
sortByNameBtn.addEventListener("click", () => {
  sortByProductName();
});
function sortByProductName() {
  let products = getProducts();
  let sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));
  displayProducts(sortedProducts);
}

// sor By price
sortByPriceBtn.addEventListener("click", () => {
  sortByproductPrice();
});
function sortByproductPrice() {
  let products = getProducts();
  let sortedProducts = products.sort(
    (a, b) => a.current_price - b.current_price
  );
  displayProducts(sortedProducts);
}

// sor By Role
sortByGenderBtn.addEventListener("click", () => {
  sortByGender();
});
function sortByGender() {
  let products = getProducts();
  let sortedProducts = products.sort((a, b) =>
    b.gender.localeCompare(a.gender)
  );
  displayProducts(sortedProducts);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// show card's data

function reviewData(productId) {
  let productsData = getProducts();
  let product = productsData.find((p) => p.id === productId);
  editProductId.value = product.id;
  editProductImage.src = `${product.carousel_images[0]}`;
  editProductCategory.value = product.category;
  editProductName.value = product.name;
  editProductPrice.value = product.current_price;
  editBuyPrice.value = product.buy_price;
  editProductLocation.value = product.location;
  editProductQuantity.value = product.in_stock;
  displayAvailableColor(productId);
  displayAvailableSizes(productId);
  displayRelatedImages(productId);
}

function displayAvailableColor(productId) {
  let products = getProducts();
  let product = products.find((prod) => prod.id == productId);
  let availableColor = product.available_colors;

  let container = "";
  availableColor.forEach((color) => {
    container += `<label class="container-checkbox">${color}
                            <span class="color-show" style="background-color: ${color};"></span>
                            <input type="checkbox" checked="checked" name="color" value="${color}">
                            <span class="checkmark"></span> 
                        </label>`;
  });
  productColorContainer.innerHTML = container;
}

function displayAvailableSizes(productId) {
  let products = getProducts();
  let product = products.find((prod) => prod.id == productId);
  let availableSizes = product.size;

  let container = "";
  availableSizes.forEach((size) => {
    container += `<label class="container-checkbox">${size}
                            <input type="checkbox" checked="checked" name="size" value="${size}">
                            <span class="checkmark"></span> 
                  </label>`;
  });
  productSizeContainer.innerHTML = container;
}
function displayRelatedImages(productId) {
  let products = getProducts();
  let product = products.find((prod) => prod.id == productId);
  let relatedImages = product.related_shoes;

  let container = "";
  relatedImages.forEach((images) => {
    container += ` <img src="${images}" alt="">`;
  });
  relatedImageContainer.innerHTML = container;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// tabs
tabButtons.forEach((btn, indx) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tabs[indx].classList.add("active");
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////
function productTODisplay(product) {
  return `<div class="product-card" onclick="reviewData(${product.id})">
                <div class="product-img">
                    <img src="${product.carousel_images[0]}" alt="">
                </div>
                <div class="product-details">
                    <span class="product-catagory">${product.category}</span>
                    <h4><a href="">${product.name}</a></h4>
                    <div class="product-bottom-details">
                        <div class="product-price">${product.current_price} $</div>
                    </div>
                </div>
            </div>`;
}

function displayProducts(product) {
  let ProductRows = product.map(productTODisplay).join("");
  cardsContainer.innerHTML = ProductRows;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
function fetchData() {
  fetch("./data/shoes.json")
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

document.getElementById("logOut").addEventListener("click", function () {
  localStorage.setItem("activeUser", JSON.stringify({}));
  window.location.href = "/";
  console.log("logged out");
});
