import { signOut } from "../signOut/signOut.js";

const user = JSON.parse(localStorage.getItem("activeUser"));
if (!user) {
  console.log("no user");
  window.location.href = "/signIn";
} else {
  console.log(user);
}

const cartItems = user.cart;
console.log(cartItems.length);
let cards = ``;
console.log(cartItems);

const orders = JSON.parse(localStorage.getItem("orders") || "[]");

function getOrderStatus(cartItemId) {
  const order = orders.find((order) =>
    order.cart.some((item) => item.id === cartItemId)
  );
  return order ? order.status : null;
}

for (let i = 0; i < cartItems.length; i++) {
  const status = getOrderStatus(cartItems[i].id);
  let statusButton = "";

  if (status === "pending" || !status) {
    statusButton =
      '<button class="pending"><i class="fa-solid fa-hourglass-end"></i> Pending</button>';
  } else if (status === "canceled") {
    statusButton =
      '<button class="canceled"><i class="fa-solid fa-circle-xmark"></i> Canceled</button>';
  } else if (status === "complete") {
    statusButton =
      '<button class="approved"><i class="fa-regular fa-circle-check"></i> Complete</button>';
  }

  cards += ` <div class="cart-item" id="cart-item">
                        <div class="cart-body">
                            <div class="cart-details">
                                <div class="cart-item-img">
                                    <img src="${cartItems[i].image}" alt="" />
                                </div>
                                <div class="cart-item-details">
                                    <h2>
                                        ${cartItems[i].name}
                                    </h2>
                                    <strong>Placed Date:</strong> ${cartItems[i].placedAt}
                                </div>
                            </div>
                            <div class="cart-price">${cartItems[i].price}$</div>
                        </div>
                        <div class="cart-add-remove">
                            ${statusButton}
                        </div>
                    </div>`;
}

document.getElementById("cart-items").innerHTML = cards;

const userName = JSON.parse(localStorage.getItem("activeUser"));
console.log(userName.firstName);
if (Object.keys(userName).length !== 0) {
  document.getElementById("userName").style.marginRight = "30px";
  document.getElementById(
    "userName"
  ).innerHTML = `<a> Hello, ${userName.firstName}
          <div class="dropdown-content-nav" id="dropdown">
                                          <a href="../orders/">My Orders</a>
                                          <a id="logOut" href="#">Log Out</a>
                                      </div>
        </a>`;
}

document.getElementById("logOut").addEventListener("click", function () {
  signOut();
});
