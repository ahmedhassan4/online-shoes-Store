import { fetchData } from "./js/api.js";
import { showProducts } from "./products/products.js";

document.addEventListener("DOMContentLoaded", function () {
  function isShowProductsPage() {
    return document.getElementById("cards") !== null;
  }
  if (isShowProductsPage()) {
    fetchData()
      .then((data) => {
        showProducts(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
