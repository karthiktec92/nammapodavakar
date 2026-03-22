// ============================================================
//  StyleHub — Product Detail Page (product.js)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    window.location.href = "shop.html";
    return;
  }

  const product = getProductById(productId);
  if (!product) {
    document.getElementById("productContent").innerHTML = `
      <div style="text-align:center;padding:80px 0;">
        <i class="fa-solid fa-circle-xmark" style="font-size:3rem;color:var(--border);"></i>
        <h2 style="margin-top:16px;">Product Not Found</h2>
        <p style="color:var(--text-muted);margin-bottom:24px;">This product may have been removed or doesn't exist.</p>
        <a href="shop.html" class="btn btn-primary">Back to Shop</a>
      </div>`;
    return;
  }

  // Update page title
  document.title = `${product.name} — Namma Ooru Podavakar`;
  document.getElementById("breadcrumbName").textContent = product.name;

  // Update meta description
  const meta = document.querySelector("meta[name='description']");
  if (meta) meta.content = product.description;

  // Render product content
  renderProductDetail(product);
  renderRelatedProducts(product);

  // Show tabs
  document.getElementById("productTabs").style.display = "block";
  document.getElementById("relatedSection").style.display = "block";

  // Tab navigation
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
    });
  });

  // Populate tab data
  document.getElementById("tabDescription").textContent = product.description;
  document.getElementById("tabMaterial").textContent = product.material;
  document.getElementById("tabFeatures").innerHTML = [
    "Premium quality materials",
    `Made from ${product.material}`,
    "Standard fit — see size guide for exact measurements",
    "Easy care — machine washable",
    "Ethically manufactured"
  ].map(f => `<li>${f}</li>`).join("");

  document.getElementById("reviewTabCount").textContent = product.reviewCount;
  document.getElementById("avgRatingNum").textContent = product.rating.toFixed(1);
  document.getElementById("avgRatingStars").innerHTML = generateStars(product.rating);
  document.getElementById("avgRatingCount").textContent = `Based on ${product.reviewCount} reviews`;
});

function renderProductDetail(product) {
  let selectedSize = product.category === 'women' ? '' : (product.sizes[2] || product.sizes[0]);
  let selectedColor = product.colors[0];
  let qty = 1;
  const isWishlisted = Wishlist.has(product.id);

  const discountBadge = product.badge ? `<span class="product-badge badge-${product.badge}" style="font-size:.8rem;padding:5px 14px;">${product.badge}</span>` : "";
  const priceHTML = product.originalPrice
    ? `<span class="price-current">${formatPrice(product.price)}</span>
       <span class="price-original">${formatPrice(product.originalPrice)}</span>
       <span class="price-discount" style="margin-left:4px;">Save ${product.discount}%</span>`
    : `<span class="price-current">${formatPrice(product.price)}</span>`;

  const thumbsHTML = product.images.map((img, i) => `
    <div class="gallery-thumb ${i === 0 ? "active" : ""}" onclick="switchImage(${i}, this)" data-index="${i}">
      <img src="${img}" alt="${product.name} ${i + 1}" loading="lazy">
    </div>`).join("");

  const sizesHTML = product.sizes.map(size => `
    <button class="size-btn ${size === selectedSize ? "active" : ""}" onclick="selectSize(this, '${size}')">${size}</button>
  `).join("");

  const colorsHTML = product.colors.map((c, i) => `
    <span class="product-color ${i === 0 ? "active" : ""}" data-color="${c}" onclick="selectColor(this, '${c}')"
      style="background:${c};${c === "#ffffff" || c === "#FFFFFF" ? "border:2px solid #ccc;" : ""}"></span>
  `).join("");

  document.getElementById("productContent").innerHTML = `
    <div class="product-detail-grid">

      <!-- Gallery -->
      <div class="product-gallery">
        <div class="gallery-main" id="galleryMain">
          <img src="${product.images[0]}" alt="${product.name}" id="mainImage" loading="eager">
        </div>
        <div class="gallery-thumbs">${thumbsHTML}</div>
      </div>

      <!-- Info -->
      <div class="product-info">
        <div class="product-info-category">${product.subCategory} · ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
        ${discountBadge}
        <h1 class="product-info-title">${product.name}</h1>
        <div class="product-info-rating">
          <div class="stars" style="color:#f4a02a;">${generateStars(product.rating)}</div>
          <span>${product.rating} (${product.reviewCount} reviews)</span>
          <span>·</span>
          <a href="#tab-reviews" onclick="document.querySelector('[data-tab=reviews]').click();" style="color:var(--secondary);font-weight:500;">Write a Review</a>
        </div>
        <div class="product-info-price">${priceHTML}</div>
        <p class="product-info-description">${product.description}</p>

        <!-- Color -->
        <div class="option-label">Color: <span id="colorLabel" style="font-weight:400;text-transform:none;letter-spacing:0;">${selectedColor}</span></div>
        <div class="product-colors" style="margin-bottom:24px;">${colorsHTML}</div>

        <!-- Size (men only) -->
        ${product.category !== 'women' ? `
        <div class="option-label">Size: <span id="sizeLabel" style="font-weight:400;text-transform:none;letter-spacing:0;">${selectedSize}</span> <a href="#tab-sizing" onclick="document.querySelector('[data-tab=sizing]').click();">Size Guide</a></div>
        <div class="size-options">${sizesHTML}</div>
        ` : ''}

        <!-- Quantity -->
        <div class="quantity-row">
          <label style="font-size:.82rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">Qty</label>
          <div class="quantity-control">
            <button class="qty-btn" onclick="changeQty(-1)">−</button>
            <input class="qty-input" type="number" id="qtyInput" value="1" min="1" max="10" readonly>
            <button class="qty-btn" onclick="changeQty(1)">+</button>
          </div>
        </div>

        <!-- Actions -->
        <div class="add-to-cart-row">
          <button class="btn btn-primary btn-lg" style="flex:1;" onclick="addToCartFromDetail(${product.id})">
            <i class="fa-solid fa-bag-shopping"></i> Add to Cart
          </button>
          <button class="add-to-wishlist ${isWishlisted ? "active" : ""}" id="wishlistBtn"
            onclick="toggleWishlistDetail(${product.id})" title="Add to Wishlist">
            <i class="fa-${isWishlisted ? "solid" : "regular"} fa-heart"></i>
          </button>
        </div>
        <a href="checkout.html" class="btn btn-secondary btn-block btn-lg" onclick="addToCartFromDetail(${product.id})">
          <i class="fa-solid fa-bolt"></i> Buy It Now
        </a>

        <!-- Meta -->
        <div class="product-meta">
          <div class="product-meta-item"><strong>Material:</strong> <span>${product.material}</span></div>
          <div class="product-meta-item"><strong>Availability:</strong> <span style="color:var(--success);"><i class="fa-solid fa-circle-check"></i> In Stock & Ready to Ship</span></div>
          <div class="product-meta-item"><strong>Shipping:</strong> <span>Standard 3–5 days | Express 1–2 days</span></div>
          <div class="product-meta-item"><strong>Returns:</strong> <span>Free 30-day returns</span></div>
        </div>

        <!-- Share -->
        <div style="margin-top:20px;display:flex;align-items:center;gap:12px;font-size:.82rem;color:var(--text-muted);">
          <span>Share:</span>
          <a href="#" style="color:#1877f2;" title="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#" style="color:#e4405f;" title="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" style="color:#1da1f2;" title="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="#" style="color:#bd081c;" title="Pinterest"><i class="fa-brands fa-pinterest-p"></i></a>
        </div>
      </div>

    </div>
  `;

  // Store state
  window._productState = { product, selectedSize, selectedColor, qty: 1 };
}

function switchImage(index, thumbEl) {
  const product = window._productState?.product;
  if (!product || !product.images[index]) return;
  document.getElementById("mainImage").src = product.images[index];
  document.querySelectorAll(".gallery-thumb").forEach(t => t.classList.remove("active"));
  thumbEl.classList.add("active");
}

function selectSize(btn, size) {
  document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  if (window._productState) window._productState.selectedSize = size;
  const label = document.getElementById("sizeLabel");
  if (label) label.textContent = size;
}

function selectColor(el, color) {
  document.querySelectorAll(".product-color").forEach(c => c.classList.remove("active"));
  el.classList.add("active");
  if (window._productState) window._productState.selectedColor = color;
  const label = document.getElementById("colorLabel");
  if (label) label.textContent = color;
}

function changeQty(delta) {
  const input = document.getElementById("qtyInput");
  if (!input) return;
  let val = parseInt(input.value) + delta;
  val = Math.max(1, Math.min(10, val));
  input.value = val;
  if (window._productState) window._productState.qty = val;
}

function addToCartFromDetail(productId) {
  const product = getProductById(productId);
  if (!product || !window._productState) return;
  const { selectedColor, qty } = window._productState;
  const size = product.category === 'women' ? 'Free Size' : (window._productState.selectedSize || product.sizes[0]);
  Cart.add(product, size, selectedColor, parseInt(document.getElementById("qtyInput")?.value || 1));
  openCartDrawer();
}

function toggleWishlistDetail(productId) {
  const isNow = Wishlist.toggle(productId);
  const btn = document.getElementById("wishlistBtn");
  if (!btn) return;
  const icon = btn.querySelector("i");
  btn.classList.toggle("active", isNow);
  icon.className = isNow ? "fa-solid fa-heart" : "fa-regular fa-heart";
}

function renderRelatedProducts(currentProduct) {
  const related = PRODUCTS
    .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
    .slice(0, 4);

  const grid = document.getElementById("relatedGrid");
  if (grid && related.length > 0) {
    grid.innerHTML = related.map(p => renderProductCard(p)).join("");
  } else if (grid) {
    const allOther = PRODUCTS.filter(p => p.id !== currentProduct.id).slice(0, 4);
    grid.innerHTML = allOther.map(p => renderProductCard(p)).join("");
  }
}
