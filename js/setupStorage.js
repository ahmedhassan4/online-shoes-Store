export function setupStorage() {
  if (!localStorage.getItem("activeUser")) {
    localStorage.setItem("activeUser", JSON.stringify({}));
  }
  if (!localStorage.getItem("wishList")) {
    localStorage.setItem("wishList", JSON.stringify({}));
  }
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
  }
}
