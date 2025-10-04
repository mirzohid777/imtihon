// =================================
// MALUMOTLR START
// =================================
const container = document.getElementById("product-container");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const filterBtn = document.getElementById("filterBtn");

let products = [];

fetch("https://fakestoreapi.com/products?limit=10")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    displayProducts(products);
  })
  .catch((err) => {
    container.innerHTML = "<p>Xatolik yuz berdi. Ma'lumotlar yuklanmadi.</p>";
    console.error("Error fetching products:", err);
  });

function displayProducts(list) {
  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML = "<p>Mahsulot topilmadi</p>";
    return;
  }
  list.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.description.substring(0, 80)}...</p>
      <p class="product-price">$${product.price}</p>
      <button class="buy-button">Sotib olish</button>
    `;
    container.appendChild(card);
  });
}

function filterAndSort() {
  let filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  const sortValue = sortSelect.value;
  filtered.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase())
      return sortValue === "asc" ? -1 : 1;
    if (a.title.toLowerCase() > b.title.toLowerCase())
      return sortValue === "asc" ? 1 : -1;
    return 0;
  });

  displayProducts(filtered);
}

searchInput.addEventListener("input", filterAndSort);
sortSelect.addEventListener("change", filterAndSort);
filterBtn.addEventListener("click", filterAndSort);

// =================================
// ROYHATDAN O'TISH START
// =================================
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const purchaseForm = document.getElementById("purchaseForm");
const ordersList = document.getElementById("orders-list");

let orders = [];

document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("buy-button")) {
    modal.style.display = "block";
  }
});

closeModal.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target == modal) modal.style.display = "none";
};

purchaseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phone = document.getElementById("phone").value;

  const order = {
    firstName,
    lastName,
    phone,
    timestamp: new Date().toLocaleString(),
  };
  orders.push(order);

  renderOrders();
  alert("Ma'lumotlaringiz qabul qilindi!");
  purchaseForm.reset();
  modal.style.display = "none";
});

function renderOrders() {
  if (!ordersList) return;
  ordersList.innerHTML = "";
  orders.forEach((order, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${order.firstName} ${order.lastName} | ${
      order.phone
    } | ${order.timestamp}`;
    ordersList.appendChild(li);
  });
}
