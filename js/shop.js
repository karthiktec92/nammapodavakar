// ============================================================
//  StyleHub — Shop Page (shop.js)
// ============================================================

const ITEMS_PER_PAGE = 9;
let currentPage = 1;
let filteredProducts = [];
let currentView = "grid";

document.addEventListener("DOMContentLoaded", () => {
  // Read URL params
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get("cat");
  const filterParam = params.get("filter");
  const searchQuery = params.get("q");

  // Pre-select category from URL
  if (catParam) {
    const radio = document.querySelector(`input[name="category"][value="${catParam}"]`);
    if (radio) {
      radio.checked = true;
      updateShopTitle(catParam);
    }
  }

  if (filterParam === "sale") document.getElementById("filterSale").checked = true;
  if (filterParam === "new") document.getElementById("filterNew").checked = true;

  if (searchQuery) {
    document.getElementById("searchQueryLabel").innerHTML = ` for "<strong>${escapeHtml(searchQuery)}</strong>"`;
    document.getElementById("shopTitle").textContent = "Search Results";
    document.getElementById("breadcrumbCurrent").textContent = "Search Results";
  }

  // Attach filter events
  document.querySelectorAll("input[name='category']").forEach(r => {
    r.addEventListener("change", () => { currentPage = 1; applyFilters(); updateShopTitle(r.value); });
  });
  document.getElementById("priceRange").addEventListener("input", () => { currentPage = 1; applyFilters(); });
  document.querySelectorAll(".size-filter").forEach(cb => cb.addEventListener("change", () => { currentPage = 1; applyFilters(); }));
  document.getElementById("filterSale").addEventListener("change", () => { currentPage = 1; applyFilters(); });
  document.getElementById("filterNew").addEventListener("change", () => { currentPage = 1; applyFilters(); });
  document.getElementById("filterFeatured").addEventListener("change", () => { currentPage = 1; applyFilters(); });

  // Show sidebar toggle on mobile
  if (window.innerWidth <= 1024) {
    document.getElementById("filterToggle").style.display = "flex";
  }
  window.addEventListener("resize", () => {
    document.getElementById("filterToggle").style.display = window.innerWidth <= 1024 ? "flex" : "none";
  });

  applyFilters(searchQuery);
});

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}

function updateShopTitle(cat) {
  const titles = { all: "All Products", men: "Men's Collection", women: "Women's Collection", kids: "Kids' Wear", accessories: "Accessories" };
  if (document.getElementById("shopTitle")) document.getElementById("shopTitle").textContent = titles[cat] || "All Products";
  if (document.getElementById("breadcrumbCurrent")) document.getElementById("breadcrumbCurrent").textContent = titles[cat] || "All Products";
}

function updatePriceFilter(val) {
  document.getElementById("priceLabel").textContent = `Up to ₹${parseInt(val).toLocaleString('en-IN')}`;
  currentPage = 1;
  applyFilters();
}

function applyFilters(searchQuery) {
  const category = document.querySelector("input[name='category']:checked")?.value || "all";
  const maxPrice = parseInt(document.getElementById("priceRange").value);
  const selectedSizes = Array.from(document.querySelectorAll(".size-filter:checked")).map(cb => cb.value);
  const showSale = document.getElementById("filterSale")?.checked;
  const showNew = document.getElementById("filterNew")?.checked;
  const showFeatured = document.getElementById("filterFeatured")?.checked;
  const sort = document.getElementById("sortSelect")?.value || "featured";
  const query = (searchQuery || new URLSearchParams(window.location.search).get("q") || "").toLowerCase();

  let products = [...PRODUCTS];

  // Category
  if (category !== "all") products = products.filter(p => p.category === category);

  // Max price
  products = products.filter(p => p.price <= maxPrice);

  // Sizes
  if (selectedSizes.length > 0) products = products.filter(p => selectedSizes.some(s => p.sizes.includes(s)));

  // Badge filters
  if (showSale) products = products.filter(p => p.badge === "sale");
  if (showNew) products = products.filter(p => p.badge === "new");
  if (showFeatured) products = products.filter(p => p.featured);

  // Search
  if (query) {
    products = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.subCategory.toLowerCase().includes(query) ||
      p.tags.some(t => t.includes(query))
    );
  }

  // Sort
  switch (sort) {
    case "price-asc": products.sort((a, b) => a.price - b.price); break;
    case "price-desc": products.sort((a, b) => b.price - a.price); break;
    case "rating": products.sort((a, b) => b.rating - a.rating); break;
    case "newest": products.sort((a, b) => (b.badge === "new" ? 1 : 0) - (a.badge === "new" ? 1 : 0)); break;
    default: products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  filteredProducts = products;
  document.getElementById("resultCount").textContent = products.length;
  renderPage();
}

function renderPage() {
  const grid = document.getElementById("shopGrid");
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageProducts = filteredProducts.slice(start, start + ITEMS_PER_PAGE);

  if (filteredProducts.length === 0) {
    grid.innerHTML = `<div class="no-product" style="grid-column:1/-1;">
      <i class="fa-solid fa-shirt"></i>
      <p>No products found matching your filters.</p>
      <button onclick="clearAllFilters()" class="btn btn-primary btn-sm" style="margin-top:10px;">Clear Filters</button>
    </div>`;
    document.getElementById("pagination").innerHTML = "";
    return;
  }

  grid.innerHTML = pageProducts.map(p => renderProductCard(p, currentView === "list")).join("");

  if (currentView === "list") {
    grid.classList.add("list-view");
  } else {
    grid.classList.remove("list-view");
  }

  renderPagination();
  window.scrollTo({ top: document.querySelector(".shop-toolbar")?.offsetTop - 100 || 0, behavior: "smooth" });
}

function renderPagination() {
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const pag = document.getElementById("pagination");
  if (totalPages <= 1) { pag.innerHTML = ""; return; }

  let html = `<button class="page-btn" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? "disabled" : ""}><i class="fa-solid fa-chevron-left"></i></button>`;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      html += `<button class="page-btn ${i === currentPage ? "active" : ""}" onclick="goToPage(${i})">${i}</button>`;
    } else if (Math.abs(i - currentPage) === 2) {
      html += `<span style="display:flex;align-items:center;padding:0 6px;color:var(--text-muted);">…</span>`;
    }
  }

  html += `<button class="page-btn" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? "disabled" : ""}><i class="fa-solid fa-chevron-right"></i></button>`;
  pag.innerHTML = html;
}

function goToPage(page) {
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderPage();
}

function setView(view) {
  currentView = view;
  document.getElementById("gridViewBtn")?.classList.toggle("active", view === "grid");
  document.getElementById("listViewBtn")?.classList.toggle("active", view === "list");
  renderPage();
}

function clearAllFilters() {
  document.querySelector("input[name='category'][value='all']").checked = true;
  document.getElementById("priceRange").value = 300;
  document.getElementById("priceLabel").textContent = "Up to $300";
  document.querySelectorAll(".size-filter").forEach(cb => cb.checked = false);
  document.getElementById("filterSale").checked = false;
  document.getElementById("filterNew").checked = false;
  document.getElementById("filterFeatured").checked = false;
  document.getElementById("sortSelect").value = "featured";
  document.getElementById("searchQueryLabel").textContent = "";
  currentPage = 1;
  updateShopTitle("all");
  applyFilters();
}

function toggleSidebar() {
  const sidebar = document.getElementById("shopSidebar");
  sidebar.classList.toggle("open");
  if (sidebar.classList.contains("open")) {
    sidebar.style.display = "block";
    document.getElementById("sidebarHeader").style.display = "flex";
  } else {
    sidebar.style.display = "";
    document.getElementById("sidebarHeader").style.display = "";
  }
}
