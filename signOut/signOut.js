export function signOut() {
  localStorage.setItem("activeUser", JSON.stringify({}));
  window.location.href = "./";
}
