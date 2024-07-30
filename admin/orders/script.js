let ordersInfoContainer = document.querySelector(".product-info-container");
let orderItemsBody = document.querySelector(".order-items-body");
let dataAndId = document.querySelector(".date-id");
let statusSelection = document.querySelector("#status-selection");
let customerData = document.querySelector(".customer-data");
let customerEmail = document.querySelector(".customer-data-email");
let customerAddress = document.querySelector(".customer-data-address");

let orderDetailes = document.querySelector(".order-details");
let closeOrderDetailesPage = document.querySelector(".fa-xmark");

let currentOrderId;

if (!localStorage.getItem("orders")) {
  localStorage.setItem("orders", JSON.stringify([]));
}

function getOrders() {
  let users = JSON.parse(localStorage.getItem("users") || []);
  let user = users.map((user) => user);

  orders = user;
  localStorage.setItem("orders", JSON.stringify(orders));
  return orders;
}

function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

// Close orders-detail page
closeOrderDetailesPage.addEventListener("click", () => {
  orderDetailes.classList.remove("active");
});

// Orders-detail
function displayOrderDetails(orderId) {
  currentOrderId = orderId; // Store the current order ID
  let orders = getOrders();
  let order = orders.find((order) => order.userId == orderId);
  let totalPrices = order.cart.reduce((sum, item) => sum + item.price, 0);
  totalPrices = totalPrices.toFixed(2);
  let aggregatedItems = order.cart.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 1 };
    } else {
      acc[item.id].quantity += 1;
    }
    return acc;
  }, {});
  let aggregatedItemsArray = Object.values(aggregatedItems);
  console.log(aggregatedItemsArray);

  dataAndId.innerHTML = `<span>${order.createdAt}</span>
                         <span>#${order.orderId}</span>`;

  statusSelection.value = order.status;

  customerData.innerHTML = `<span>Customer Name</span>
                            <span>${order.name}</span>`;

  customerEmail.innerHTML = `<span>Email</span>
                            <span>${order.email}</span>`;

  customerAddress.innerHTML = `<span>Address</span>
                               <span>${order.address || ""}</span>`;

  orderItemsBody.innerHTML = aggregatedItemsArray
    .map(
      (item) => `
    <tr>
      <td><img src="${item.image}" alt=""></td>
      <td>${
        item.name.length > 15 ? item.name.substring(0, 15) + "..." : item.name
      }</td>
      <td>${item.quantity}</td>
      <td>${item.price}</td>
      <td>${item.quantity * item.price}</td>
    </tr>
  `
    )
    .join("");
  document.getElementById("totalPrice").textContent = totalPrices;
  orderDetailes.classList.add("active");
}

// Display user data in the HTML
function orderstoDisplay(order) {
  let totalPrices = order.cart.reduce((sum, item) => sum + item.price, 0);
  totalPrices = totalPrices.toFixed(2);
  let statusClass;
  switch (order.status) {
    case "pending":
      statusClass = "pending";
      break;
    case "canceled":
      statusClass = "canceled";
      break;
    case "complete":
      statusClass = "complete";
      break;
  }

  return `<tr onclick="displayOrderDetails(${order.userId})">
        <td>${order.orderId}</td>
        <td>${order.name}</td>
        <td>${order.email}</td>
        <td>${order.address || "no address"}</td>
        <td>${order.createdAt}</td>
        <td>${totalPrices}$</td>
        <td>${order.method}</td>
        <td><span class="Status ${statusClass}">${order.status}</span></td>
    </tr>`;
}

function displayOrders(order) {
  let orderRows = order.map(orderstoDisplay).join("");
  ordersInfoContainer.innerHTML = orderRows;
}

function fetchData() {
  let orders = getOrders();

  console.log(orders);
  displayOrders(orders);
}

fetchData();

// Save status update
document.getElementById("save-status-btn").addEventListener("click", () => {
  let orders = JSON.parse(localStorage.getItem("orders"));
  let order = orders.find((order) => order.userId == currentOrderId);
  let users = JSON.parse(localStorage.getItem("orders"));

  if (order) {
    order.status = statusSelection.value;
    let userIndex = users.findIndex((user) => user.userId == currentOrderId);
    if (userIndex !== -1) {
      users[userIndex] = order; // Assuming order structure matches user structure
    }
    saveOrders(orders);
    fetchData();
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("users", JSON.stringify(users));

    displayOrders(orders);
    console.log("orders: ", orders);
    console.log("activeuser: ", users);
    orderDetailes.classList.remove("active");
  }
});

document.getElementById("logOut").addEventListener("click", function () {
  localStorage.setItem("activeUser", JSON.stringify({}));
  window.location.href = "/";
  console.log("logged out");
});
