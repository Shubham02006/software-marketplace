
const API_URL = "https://softhub-api.theplayzine2006.workers.dev/api/products";

const search = document.getElementById("search");
const productGrid = document.getElementById("productGrid");
const cards = [...document.querySelectorAll(".product-card")];
const filters = [...document.querySelectorAll(".filter")];
const noResults = document.getElementById("noResults");

let selectedCategory = "all";

function updateProducts() {
  if (!search) return;

  const query = search.value.trim().toLowerCase();
  let visibleCount = 0;

  document.querySelectorAll(".product-card").forEach(card => {
    const matchesCategory =
      selectedCategory === "all" ||
      card.dataset.category === selectedCategory;

    const matchesSearch =
      card.textContent.toLowerCase().includes(query);

    const visible = matchesCategory && matchesSearch;
    card.hidden = !visible;

    if (visible) visibleCount++;
  });

  if (noResults) noResults.hidden = visibleCount > 0;
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.product = product.id;
  card.dataset.category = product.category;

  const isWindows = product.category === "windows";
  const type = isWindows ? "Windows Application" : "Web Application";

  const icons = {
    mobile: "📱",
    inventory: "📦",
    billing: "🧾",
    business: "💻"
  };

  const icon = document.createElement("div");
  icon.className = "product-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = icons[product.id] || "💻";

  const typeLabel = document.createElement("span");
  typeLabel.className = "product-type";
  typeLabel.textContent = type;

  const title = document.createElement("h3");
  title.textContent = product.name;

  const description = document.createElement("p");
  description.className = "description";
  description.textContent = product.description || "";

  const price = document.createElement("p");
  price.className = "price";
  price.textContent = "₹" + Number(product.price).toLocaleString("en-IN");

  const actions = document.createElement("div");
  actions.className = "product-actions";

  const buy = document.createElement("a");
  buy.className = "btn buy-btn";
  buy.textContent = "Buy Now";
  buy.href =
    "https://mail.google.com/mail/?view=cm&fs=1&to=theplayzine2006%40gmail.com&su=" +
    encodeURIComponent("Purchase Enquiry: " + product.name);
  buy.target = "_blank";
  buy.rel = "noopener noreferrer";

  const enquire = document.createElement("a");
  enquire.className = "btn btn-outline";
  enquire.textContent = "Enquire";
  enquire.href =
    "https://mail.google.com/mail/?view=cm&fs=1&to=theplayzine2006%40gmail.com&su=" +
    encodeURIComponent("Enquiry: " + product.name);
  enquire.target = "_blank";
  enquire.rel = "noopener noreferrer";

  actions.append(buy, enquire);
  card.append(icon, typeLabel, title, description, price, actions);

  return card;
}

async function loadProducts() {
  try {
    const response = await fetch(API_URL, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Products API returned HTTP " + response.status);
    }

    const products = await response.json();

    if (!Array.isArray(products)) {
      throw new Error("Unexpected products response");
    }

    if (!productGrid) return;

    const validProducts = products.filter(product =>
      product &&
      typeof product.id === "string" &&
      typeof product.name === "string" &&
      Number.isFinite(Number(product.price)) &&
      ["windows", "web"].includes(product.category)
    );

    productGrid.replaceChildren(
      ...validProducts.map(createProductCard)
    );

    updateProducts();
  } catch (error) {
    console.error("Could not load products from Cloudflare D1:", error);
    // Keep the original HTML product cards if the API fails.
    updateProducts();
  }
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.filter;

    filters.forEach(filter => {
      filter.classList.toggle("active", filter === button);
    });

    updateProducts();
  });
});

if (search) {
  search.addEventListener("input", updateProducts);
}

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

loadProducts();
