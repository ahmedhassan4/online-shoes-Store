let activeUser = JSON.parse(localStorage.getItem("activeUser"));

let wishList =
  activeUser && activeUser.wishList
    ? activeUser.wishList
    : JSON.parse(localStorage.getItem("wishList")) || [];

console.log(activeUser);

export function getWishList() {
  return wishList;
}

export function addToWishList(product) {
  if (Object.keys(activeUser).length !== 0) {
    if (product) {
      product = {
        id: product.id,
        name: product.title || product.name,
        price: product.price || product.current_price,
        image: product.image || product.carousel_images[0],
        description: product.description,
      };

      const existingId = wishList.find((item) => item.id == product.id);
      if (!existingId) {
        wishList.push(product);
        activeUser.wishList = wishList;
        localStorage.setItem("activeUser", JSON.stringify(activeUser));

        let users = JSON.parse(localStorage.getItem("users"));
        let userIndex = users.findIndex(
          (user) => user.email === activeUser.email
        );
        if (userIndex > -1) {
          users[userIndex].wishList = wishList;
        }
        localStorage.setItem("users", JSON.stringify(users));
      } else {
        console.log("item already addded to wishlist");
      }
    }
  } else {
    return;
  }
}

export function removeFromWishList(product) {
  let productIndex = wishList.findIndex((item) => item.id === product.id);
  if (productIndex > -1) {
    wishList.splice(productIndex, 1);
    activeUser.wishList = wishList;
    localStorage.setItem("activeUser", JSON.stringify(activeUser));

    let users = JSON.parse(localStorage.getItem("users"));
    let userIndex = users.findIndex((user) => user.email === activeUser.email);
    if (userIndex > -1) {
      users[userIndex].wishList = wishList;
    }
    localStorage.setItem("users", JSON.stringify(users));

    console.log("Product removed from wishlist");
  } else {
    console.log("Product not found in wishllist");
  }
}
