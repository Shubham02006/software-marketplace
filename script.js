
const search = document.getElementById("search");
const cards = [...document.querySelectorAll(".product-card")];
const filters = [...document.querySelectorAll(".filter")];
const noResults = document.getElementById("noResults");

let category = "all";

const contactEmail = "theplayzine2006@gmail.com";

function updateProducts() {
  const query = search.value.trim().toLowerCase();
  let visible = 0;

  cards.forEach(card => {
    const matchesCategory =
      category === "all" || card.dataset.category === category;

    const matchesSearch =
      card.innerText.toLowerCase().includes(query);

    const show = matchesCategory && matchesSearch;

    card.hidden = !show;

    if (show) visible++;
  });

  noResults.hidden = visible > 0;
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    category = button.dataset.filter;

    filters.forEach(item => {
      item.classList.toggle("active", item === button);
    });

    updateProducts();
  });
});

search.addEventListener("input", updateProducts);

document.querySelectorAll(".contact-product").forEach(link => {
  link.addEventListener("click", () => {
    const product = link.dataset.product || "Software";

    document.getElementById("contactBtn").href =
      "mailto:" + contactEmail +
      "?subject=" +
      encodeURIComponent("Enquiry: " + product);
  });
});

// Contact button: default email
const contactBtn = document.getElementById("contactBtn");

if (contactBtn) {
  contactBtn.href =
    "mailto:" + contactEmail +
    "?subject=" +
    encodeURIComponent("Software Marketplace Enquiry");
}

document.getElementById("year").textContent =
  new Date().getFullYear();
