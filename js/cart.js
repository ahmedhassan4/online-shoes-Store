let activeUser = JSON.parse(localStorage.getItem("activeUser"));

if (!activeUser || Object.keys(activeUser) == 0) {
  localStorage.setItem("activeUser", JSON.stringify({}));
}

function getDate() {
  let placedDate = new Date().toLocaleDateString();
  return placedDate;
}

let cart =
  activeUser && activeUser.cart
    ? activeUser.cart
    : JSON.parse(localStorage.getItem("cart")) || [];

console.log(activeUser);

export function getCart() {
  return cart;
}

export function addToCart(product) {
  if (Object.keys(activeUser).length !== 0) {
    if (product) {
      console.log("placed at: ", getDate());
      product.placedAt = getDate();
      product.status = "pending";
      product = {
        id: product.id,
        name: product.title || product.name,
        price: product.price || product.current_price,
        image: product.image,
        placedAt: getDate(),
        description: product.description,
        category: product.category,
      };
      cart.push(product);
      activeUser.cart = cart;
      localStorage.setItem("activeUser", JSON.stringify(activeUser));

      let users = JSON.parse(localStorage.getItem("users"));
      let userIndex = users.findIndex(
        (user) => user.email === activeUser.email
      );
      if (userIndex > -1) {
        users[userIndex].cart = cart;
      }
      localStorage.setItem("users", JSON.stringify(users));
    }
  } else {
    return;
  }
}

export function removeFromCart(product) {
  let productIndex = cart.findIndex((item) => item.id === product.id);
  if (productIndex > -1) {
    cart.splice(productIndex, 1);
    activeUser.cart = cart;
    localStorage.setItem("activeUser", JSON.stringify(activeUser));

    let users = JSON.parse(localStorage.getItem("users"));
    let userIndex = users.findIndex((user) => user.email === activeUser.email);
    if (userIndex > -1) {
      users[userIndex].cart = cart;
    }
    localStorage.setItem("users", JSON.stringify(users));

    console.log("Product removed from cart");
  } else {
    console.log("Product not found in cart");
  }
}
