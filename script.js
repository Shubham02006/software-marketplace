
const search = document.getElementById("search");
const cards = [...document.querySelectorAll(".product-card")];
const filters = [...document.querySelectorAll(".filter")];
const noResults = document.getElementById("noResults");

let category = "all";

const contactEmail = "theplayzine2006@gmail.com";

// Search and category filter
function updateProducts() {
  const query = search ? search.value.trim().toLowerCase() : "";
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

  if (noResults) {
    noResults.hidden = visible > 0;
  }
}

// Category buttons
filters.forEach(button => {
  button.addEventListener("click", () => {
    category = button.dataset.filter;

    filters.forEach(item => {
      item.classList.toggle("active", item === button);
    });

    updateProducts();
  });
});

// Search box
if (search) {
  search.addEventListener("input", updateProducts);
}

// Open Gmail in the current tab
function openGmail(product) {
  const subject = encodeURIComponent(
    "Enquiry: " + (product || "Software")
  );

  const gmailUrl =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    "&to=" + encodeURIComponent(contactEmail) +
    "&su=" + subject;

  window.location.href = gmailUrl;
}

// Product enquiry buttons
document.querySelectorAll(".contact-product").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();

    const product = link.dataset.product || "Software";
    openGmail(product);
  });
});

// Main Contact button
const contactBtn = document.getElementById("contactBtn");

if (contactBtn) {
  contactBtn.addEventListener("click", event => {
    event.preventDefault();
    openGmail("Software Marketplace");
  });
}

// Display current year
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
