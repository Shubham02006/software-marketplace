
const search = document.getElementById("search");
const cards = [...document.querySelectorAll(".product-card")];
const filters = [...document.querySelectorAll(".filter")];
const noResults = document.getElementById("noResults");

let selectedCategory = "all";

const defaultProducts = {
  mobile: {
    name: "Mobile Shop Management",
    price: 999,
    description: "Windows software for mobile shop management."
  },
  inventory: {
    name: "Inventory Management",
    price: 499,
    description: "Web software for inventory management."
  },
  billing: {
    name: "Billing & Sales System",
    price: 799,
    description: "Software for billing and sales management."
  },
  business: {
    name: "Business Desktop Tools",
    price: 999,
    description: "Useful Windows desktop business tools."
  }
};

function getSavedProducts() {
  try {
    return JSON.parse(localStorage.getItem("softhubProducts") || "{}");
  } catch {
    return {};
  }
}

function applySavedProducts() {
  const saved = getSavedProducts();

  cards.forEach(card => {
    const id = card.dataset.product;
    const product = { ...defaultProducts[id], ...saved[id] };

    if (!id || !defaultProducts[id]) return;

    const title = card.querySelector("h2, h3");
    if (title) title.textContent = product.name;

    const price = card.querySelector(".price");

    if (price) {
      price.textContent = "₹" + Number(product.price).toLocaleString("en-IN");
    }

    const description = card.querySelector(".description");

    if (description) {
      description.textContent = product.description;
    }
  });
}

function updateProducts() {
  if (!search) return;

  const query = search.value.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach(card => {
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

applySavedProducts();
updateProducts();
