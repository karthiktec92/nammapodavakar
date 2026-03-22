// ============================================================
//  StyleHub — Cart Management
// ============================================================

const Cart = (() => {
  const STORAGE_KEY = "stylehub_cart";

  function getAll() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch { return []; }
  }

  function save(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateBadge();
    if (typeof renderCartDrawer === "function") renderCartDrawer();
  }

  function add(product, size, color, qty = 1) {
    const items = getAll();
    const key = `${product.id}-${size}-${color}`;
    const existing = items.find(i => i.key === key);
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, 10);
    } else {
      items.push({
        key,
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.subCategory,
        size,
        color,
        qty
      });
    }
    save(items);
    showToast(`"${product.name}" added to cart!`, "success");
  }

  function remove(key) {
    const items = getAll().filter(i => i.key !== key);
    save(items);
  }

  function updateQty(key, qty) {
    const items = getAll();
    const item = items.find(i => i.key === key);
    if (!item) return;
    if (qty < 1) { remove(key); return; }
    item.qty = Math.min(qty, 10);
    save(items);
  }

  function clear() {
    localStorage.removeItem(STORAGE_KEY);
    updateBadge();
  }

  function getCount() {
    return getAll().reduce((sum, i) => sum + i.qty, 0);
  }

  function getSubtotal() {
    return getAll().reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function getShipping(subtotal) {
    return subtotal >= 5000 || subtotal === 0 ? 0 : 99;
  }

  function getTax(subtotal) {
    return subtotal * 0.18; // 18% GST
  }

  function getTotal() {
    const sub = getSubtotal();
    return sub + getShipping(sub) + getTax(sub);
  }

  function updateBadge() {
    const count = getCount();
    document.querySelectorAll(".cart-badge").forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? "flex" : "none";
    });
  }

  return { getAll, add, remove, updateQty, clear, getCount, getSubtotal, getShipping, getTax, getTotal, updateBadge };
})();

// ============================================================
//  Wishlist Management
// ============================================================
const Wishlist = (() => {
  const STORAGE_KEY = "stylehub_wishlist";

  function getAll() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch { return []; }
  }

  function toggle(productId) {
    const ids = getAll();
    const idx = ids.indexOf(productId);
    if (idx === -1) {
      ids.push(productId);
      showToast("Added to wishlist!", "success");
    } else {
      ids.splice(idx, 1);
      showToast("Removed from wishlist.", "warning");
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    return ids.indexOf(productId) !== -1;
  }

  function has(productId) {
    return getAll().includes(productId);
  }

  return { toggle, has, getAll };
})();

// ============================================================
//  Toast Notification
// ============================================================
function showToast(message, type = "success", duration = 3500) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const icons = { success: "fa-circle-check", error: "fa-circle-xmark", warning: "fa-triangle-exclamation" };
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${icons[type] || icons.success}"></i>
    <span>${message}</span>
    <button class="toast-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
  `;
  const close = () => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(40px)";
    toast.style.transition = "all .3s ease";
    setTimeout(() => toast.remove(), 300);
  };
  toast.querySelector(".toast-close").addEventListener("click", close);
  container.appendChild(toast);
  setTimeout(close, duration);
}

// ============================================================
//  Cart Drawer
// ============================================================
function renderCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  if (!drawer) return;
  const body = drawer.querySelector(".drawer-body");
  const items = Cart.getAll();
  if (items.length === 0) {
    body.innerHTML = `
      <div class="drawer-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Your cart is empty</p>
        <a href="shop.html" class="btn btn-primary btn-sm">Start Shopping</a>
      </div>`;
    drawer.querySelector(".drawer-total span:last-child").textContent = "₹0";
    return;
  }
  body.innerHTML = items.map(item => `
    <div class="drawer-item">
      <div class="drawer-item-img">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </div>
      <div class="drawer-item-info">
        <div class="drawer-item-name">${item.name}</div>
        <div class="drawer-item-meta">${item.size} · ${item.category}</div>
        <div class="drawer-item-row">
          <div class="quantity-control" style="border-radius:8px;overflow:hidden;border:1.5px solid var(--border);display:inline-flex;align-items:center;">
            <button class="qty-btn" onclick="Cart.updateQty('${item.key}', ${item.qty - 1})" style="width:30px;height:30px;font-size:.9rem;">−</button>
            <span style="padding:0 10px;font-size:.85rem;font-weight:700;">${item.qty}</span>
            <button class="qty-btn" onclick="Cart.updateQty('${item.key}', ${item.qty + 1})" style="width:30px;height:30px;font-size:.9rem;">+</button>
          </div>
          <div class="drawer-item-price">${formatPrice(item.price * item.qty)}</div>
          <button onclick="Cart.remove('${item.key}')" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:.85rem;padding:4px;" title="Remove">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  `).join("");
  drawer.querySelector(".drawer-total span:last-child").textContent = formatPrice(Cart.getSubtotal());
}

function openCartDrawer() {
  document.getElementById("cartDrawer")?.classList.add("open");
  document.getElementById("cartOverlay")?.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  document.getElementById("cartDrawer")?.classList.remove("open");
  document.getElementById("cartOverlay")?.classList.remove("open");
  document.body.style.overflow = "";
}

// ============================================================
//  Utility
// ============================================================
function formatPrice(price) {
  return `₹${Math.round(parseFloat(price)).toLocaleString('en-IN')}`;
}

function generateStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    '<i class="fa-solid fa-star"></i>'.repeat(full) +
    (half ? '<i class="fa-solid fa-star-half-stroke"></i>' : "") +
    '<i class="fa-regular fa-star"></i>'.repeat(empty)
  );
}

function generateColorDots(colors, prefix = "") {
  return colors.map((c, i) =>
    `<span class="color-dot ${i === 0 ? "active" : ""}" data-color="${c}" style="background:${c};${c === "#ffffff" || c === "#FFFFFF" ? "border:1.5px solid #ccc;" : ""}" title="${c}"></span>`
  ).join("");
}

function renderProductCard(product, isListView = false) {
  const discountBadge = product.badge
    ? `<span class="product-badge badge-${product.badge}">${product.badge}</span>`
    : "";
  const priceHTML = product.originalPrice
    ? `<span class="price-current">${formatPrice(product.price)}</span>
       <span class="price-original">${formatPrice(product.originalPrice)}</span>
       <span class="price-discount">-${product.discount}%</span>`
    : `<span class="price-current">${formatPrice(product.price)}</span>`;

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-card-image">
        <a href="product.html?id=${product.id}">
          <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        </a>
        ${discountBadge}
        <div class="product-actions">
          <button class="product-action-btn ${Wishlist.has(product.id) ? "wishlisted" : ""}"
            title="Wishlist" onclick="handleWishlist(event, ${product.id})">
            <i class="fa-${Wishlist.has(product.id) ? "solid" : "regular"} fa-heart"></i>
          </button>
          <a href="product.html?id=${product.id}" class="product-action-btn" title="Quick View">
            <i class="fa-regular fa-eye"></i>
          </a>
        </div>
        <button class="product-card-quick-add" onclick="quickAdd(${product.id})">
          + Quick Add
        </button>
      </div>
      <div class="product-card-body">
        <div class="product-card-category">${product.subCategory}</div>
        <div class="product-card-name">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </div>
        <div class="product-card-rating">
          <div class="stars">${generateStars(product.rating)}</div>
          <span class="rating-count">(${product.reviewCount})</span>
        </div>
        <div class="product-card-price">${priceHTML}</div>
        <div class="product-card-colors">${generateColorDots(product.colors, `p${product.id}`)}</div>
      </div>
    </article>
  `;
}

function handleWishlist(event, productId) {
  event.preventDefault();
  event.stopPropagation();
  const isNow = Wishlist.toggle(productId);
  const btn = event.currentTarget;
  const icon = btn.querySelector("i");
  if (isNow) {
    btn.classList.add("wishlisted");
    icon.className = "fa-solid fa-heart";
  } else {
    btn.classList.remove("wishlisted");
    icon.className = "fa-regular fa-heart";
  }
}

function quickAdd(productId) {
  const product = getProductById(productId);
  if (!product) return;
  const size = product.category === 'women' ? 'Free Size' : (product.sizes[2] || product.sizes[0]);
  Cart.add(product, size, product.colors[0]);
}

// Init on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  Cart.updateBadge();
  renderCartDrawer();

  // Sticky header
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 10);
    });
  }

  // Mobile nav
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      toggle.classList.remove("open");
      nav.classList.remove("open");
    }));
  }

  // Cart drawer
  document.querySelectorAll("[data-open-cart]").forEach(el => {
    el.addEventListener("click", openCartDrawer);
  });
  document.getElementById("cartOverlay")?.addEventListener("click", closeCartDrawer);
  document.getElementById("drawerClose")?.addEventListener("click", closeCartDrawer);

  // Active nav link
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
});
