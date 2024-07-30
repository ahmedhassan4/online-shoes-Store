function getUsers() {
  return JSON.parse(localStorage.getItem("users") || []);
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}
let activeUser = JSON.parse(localStorage.getItem("activeUser"));
if (!activeUser || activeUser.role == "user" || activeUser.role == null) {
  window.location.href = "../error.html";
}
// ////////////////////////////////////////////////////////////////////////////////////////
// delete user from localStorage

function dateleUser(userId) {
  let users = getUsers();
  let updatedUsers = users.filter((user) => user.id != userId);
  saveUsers(updatedUsers);
  displayUsersData(updatedUsers);
}

// ////////////////////////////////////////////////////////////////////////////////////////
// update user
let updateUserImage = document.getElementById("update-user-imag");
let updateInputFile = document.getElementById("upload-updated-user-image");
let updateButton = document.querySelector(".update-user-btn");
let currentUserId;

updateInputFile.onchange = function () {
  updateUserImage.src = URL.createObjectURL(updateInputFile.files[0]);
};

updateButton.addEventListener("click", () => {
  let userName = document.querySelector(".update-username-input");
  let email = document.querySelector(".update-email-input");
  let password = document.querySelector(".update-password-input");
  let role = document.querySelector("#update-user-role");

  let users = getUsers();
  let userWeUpdate = users.find((user) => user.id == currentUserId);

  if (userWeUpdate) {
    userWeUpdate.name = userName.value;
    userWeUpdate.email = email.value;
    userWeUpdate.password = password.value;
    userWeUpdate.role = role.value;
    let file = updateInputFile.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        userWeUpdate.image = reader.result;
        saveUsers(users);
        displayUsersData(users);
        $(".cover").fadeOut();
      };
      reader.readAsDataURL(file);
    } else {
      userWeUpdate.image = updateUserImage.src;
      saveUsers(users);
      displayUsersData(users);
      $(".cover").fadeOut();
    }
  }
});

function updateUser(userId) {
  currentUserId = userId;

  let userName = document.querySelector(".update-username-input");
  let email = document.querySelector(".update-email-input");
  let password = document.querySelector(".update-password-input");
  let role = document.querySelector("#update-user-role");

  $(".cover").fadeIn().css("display", "flex");
  let users = getUsers();
  let userWeUpdate = users.find((user) => user.id == userId);
  if (userWeUpdate) {
    userName.value = userWeUpdate.name;
    email.value = userWeUpdate.email;
    password.value = userWeUpdate.password;
    role.value = userWeUpdate.role;
    updateUserImage.src = userWeUpdate.image;
  }
  console.log("image source when I open the menu " + updateUserImage.src);
}

// ////////////////////////////////////////////////////////////////////////////////////////
// add user

let userImage = document.getElementById("add-new-user-image");
let inputFile = document.getElementById("upload-new-user-image");

inputFile.onchange = function () {
  userImage.src = URL.createObjectURL(inputFile.files[0]);
};

let addUserBtn = document.querySelector(".Add-new-user-btn");
addUserBtn.addEventListener("click", () => {
  addNewUser();
});

function addNewUser() {
  let username = document.querySelector(".new-username-input");
  let password = document.querySelector(".new-username-password");
  let email = document.querySelector(".new-username-email");
  let role = document.querySelector("#user-role");
  let image = document.querySelector(".upload-new-user-image");

  let users = getUsers();
  let newUser = {
    id: users[users.length - 1].id + 1,
    name: username.value,
    password: password.value,
    email: email.value,
    role: role.value,
    createAt: new Date().toLocaleDateString(),
    image: [],
  };
  let reader = new FileReader();
  reader.onload = () => {
    newUser.image.push(reader.result);
    users.push(newUser);
    // highlightIndexBtn();
    saveUsers(users);
    displayUsersData(users);
  };
  reader.readAsDataURL(image.files[0]);
}

// ////////////////////////////////////////////////////////////////////////////////////////
// Sort

// 1- sort button
let sortBtn = document.querySelector(".sort-btn");
let sortList = document.querySelector(".sort-list");
let sortByNameBtn = document.querySelector(".sort-by-name");
let sortByDateBtn = document.querySelector(".sort-by-date");
let sortByRoleBtn = document.querySelector(".sort-by-role");
let sortByIdBtn = document.querySelector(".sort-by-default");

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
  sortByUsersId();
});
function sortByUsersId() {
  let users = getUsers();
  let sortedUsers = users.sort((a, b) => a.id - b.id);
  saveUsers(sortedUsers);
  displayUsersData(sortedUsers);
}
// sor By Name
sortByNameBtn.addEventListener("click", () => {
  sortByUsersName();
});
function sortByUsersName() {
  let users = getUsers();
  let sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));
  saveUsers(sortedUsers);
  displayUsersData(sortedUsers);
}
// sor By Date
sortByDateBtn.addEventListener("click", () => {
  sortByUsersDate();
});
function sortByUsersDate() {
  let users = getUsers();
  let sortedUsers = users.sort(
    (a, b) => new Date(a.createAt) - new Date(b.createAt)
  );
  saveUsers(sortedUsers);
  displayUsersData(sortedUsers);
}

// sor By Role
sortByRoleBtn.addEventListener("click", () => {
  sortByUsersRole();
});
function sortByUsersRole() {
  let users = getUsers();
  let sortedUsers = users.sort((a, b) => a.role.localeCompare(b.role));
  saveUsers(sortedUsers);
  displayUsersData(sortedUsers);
}

// ////////////////////////////////////////////////////////////////////////////////////////
// Search
let userstoSearch;
let searchInput = document.querySelector("#search");
searchInput.addEventListener("keyup", (event) => {
  userstoSearch = getUsers();
  let users = userstoSearch.filter((user) =>
    user.name.toLocaleLowerCase().includes(event.target.value.toLowerCase())
  );
  displayUsersData(users);
});

/////////////////////////////////////////////////////////////////////////////////////////
// pagination;
var arrayLength = 0;
var tabelSize = 9;
var startIndex = 1;
var endIndex = 0;
var currentIndex = 1;
var maxIndex = 0;

var entries = document.querySelector(".entries");
var paginationBtns = document.querySelectorAll(".pagination button");

function preLoadCalculations() {
  arrayLength = getUsers().length;
  maxIndex = arrayLength / tabelSize;
  if (arrayLength % tabelSize > 0) {
    maxIndex++;
  }
}

function displayIndexBtn() {
  preLoadCalculations();
  let pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";
  pagination.innerHTML = `<button onclick="prev()" class="prev"><i class="fa-solid fa-angle-left"></i>Prev</button>`;
  for (let i = 1; i < maxIndex; i++) {
    pagination.innerHTML += `<button onclick="paginationBtn(${i})" index ="${i}">${i}</button>`;
  }

  pagination.innerHTML += '<button onclick="next()" class="next">Next</button>';
  highlightIndexBtn();
}

function highlightIndexBtn() {
  startIndex = (currentIndex - 1) * tabelSize + 1;
  endIndex = startIndex + tabelSize - 1;

  if (endIndex > arrayLength) {
    endIndex = arrayLength;
  }

  if (maxIndex >= 2) {
    var nextBtn = document.querySelector(".next");
    nextBtn.classList.add("act");
  }

  entries.textContent = `Showing ${startIndex} to ${endIndex} of ${arrayLength} entries`;

  paginationBtns.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("index") == currentIndex.toString()) {
      btn.classList.add("active");
    }
  });

  let users = getUsers().slice(startIndex - 1, endIndex);
  displayUsersData(users);
}

function next() {
  var prevBtn = document.querySelector(".prev");
  var nextBtn = document.querySelector(".next");

  if (currentIndex <= maxIndex - 1) {
    currentIndex++;
    prevBtn.classList.add("act");
    highlightIndexBtn();
  }

  if (currentIndex > maxIndex - 1) {
    nextBtn.classList.remove("act");
  }
}
function prev() {
  var prevBtn = document.querySelector(".prev");
  if (currentIndex > 1) {
    currentIndex--;
    prevBtn.classList.add("act");
    highlightIndexBtn();
  }
  if (currentIndex < 2) {
    prevBtn.classList.remove("act");
  }
}

function paginationBtn(i) {
  currentIndex = i;

  var prevBtn = document.querySelector(".prev");
  var nextBtn = document.querySelector(".next");

  highlightIndexBtn();

  if (currentIndex > maxIndex - 1) {
    nextBtn.classList.remove("act");
  } else {
    nextBtn.classList.add("act");
  }

  if (currentIndex > 1) {
    prevBtn.classList.add("act");
  }
  if (currentIndex < 2) {
    prevBtn.classList.remove("act");
  }
}

// ////////////////////////////////////////////////////////////////////////////////////////
// display user data in the html
function userstoDisplay(user) {
  return `<tr>
    <td>${user.id}</td>
    <td><img src="${user.image}" alt=""></td>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.createdAt}</td>
    <td>${user.role}</td>
    <td> 
        <img src="assets/edit.svg" alt="" class="update-user-btn" onclick= "updateUser(${user.id})" >
        <img src="assets/delete.svg" alt="" onclick="dateleUser(${user.id})" >
    </td>
</tr>`;
}

function displayUsersData(user) {
  let userInfoContainer = document.querySelector(".user-info-container");
  let userRows = user.map(userstoDisplay).join("");
  userInfoContainer.innerHTML = userRows;
}

// ////////////////////////////////////////////////////////////////////////////////////////
function fetchData() {
  let users = JSON.parse(localStorage.getItem("users") || []);
  users = getUsers().slice(startIndex - 1, endIndex);
  displayUsersData(users);
}
fetchData();
displayIndexBtn();
document.getElementById("logOut").addEventListener("click", function () {
  localStorage.setItem("activeUser", JSON.stringify({}));
  window.location.href = "/";
  console.log("logged out");
});
