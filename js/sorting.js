// js/sorting.js
export function sortLowToHigh(products) {
  return products.sort((a, b) => a.price - b.price);
}

export function sortHighToLow(products) {
  return products.sort((a, b) => b.price - a.price);
}

export function sortLowToHighRate(products) {
  return products.sort((a, b) => a.rating.rate - b.rating.rate);
}

export function sortHighToLowRate(products) {
  return products.sort((a, b) => b.rating.rate - a.rating.rate);
}

export function sortByMen(products) {
  let menProducts = products.filter(
    (product) => product.category == "men's clothing"
  );
  return menProducts;
}
export function sortByWomen(products) {
  let womenProducts = products.filter(
    (product) => product.category == "women's clothing"
  );
  return womenProducts;
}
