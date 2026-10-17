
const search = document.getElementById("search");
const cards = [...document.querySelectorAll(".product-card")];
const filters = [...document.querySelectorAll(".filter")];
const noResults = document.getElementById("noResults");

let selectedCategory = "all";

function updateProducts() {
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

    if (visible) {
      visibleCount++;
    }
  });

  noResults.hidden = visibleCount > 0;
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

search.addEventListener("input", updateProducts);

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
