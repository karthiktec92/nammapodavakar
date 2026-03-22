// ============================================================
//  StyleHub — Home Page (app.js)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  // ---- Render Categories ----
  const catGrid = document.getElementById("categoriesGrid");
  if (catGrid) {
    catGrid.innerHTML = CATEGORIES.map(cat => `
      <a href="shop.html?cat=${cat.id}" class="category-card">
        <img src="${cat.image}" alt="${cat.name}" loading="lazy">
        <div class="category-card-overlay">
          <h3>${cat.name}</h3>
          <span>${cat.count} Products · ${cat.description}</span>
          <div class="cat-arrow"><i class="fa-solid fa-arrow-right"></i></div>
        </div>
      </a>
    `).join("");
  }

  // ---- Render Featured Products ----
  const featGrid = document.getElementById("featuredGrid");
  if (featGrid) {
    let currentFilter = "all";
    const tabs = document.querySelectorAll(".filter-tab[data-filter]");

    function renderFeatured(filter) {
      const products = filter === "all"
        ? getFeaturedProducts().concat(PRODUCTS.filter(p => !p.featured)).slice(0, 8)
        : PRODUCTS.filter(p => p.category === filter).slice(0, 8);

      featGrid.innerHTML = products.length
        ? products.map(p => renderProductCard(p)).join("")
        : `<div class="no-product" style="grid-column:1/-1;"><i class="fa-solid fa-shirt"></i><p>No products found in this category.</p></div>`;
    }

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        currentFilter = tab.dataset.filter;
        renderFeatured(currentFilter);
      });
    });

    renderFeatured("all");
  }

  // ---- Countdown Timer ----
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3);
  endDate.setHours(0, 0, 0, 0);

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = endDate.getTime() - now;
    if (distance <= 0) {
      ["cd-days", "cd-hours", "cd-mins", "cd-secs"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = "00";
      });
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, "0");
    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = pad(val); };
    setEl("cd-days", days);
    setEl("cd-hours", hours);
    setEl("cd-mins", mins);
    setEl("cd-secs", secs);
  }

  if (document.getElementById("countdown")) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
});
