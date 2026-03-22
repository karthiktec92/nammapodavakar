// ============================================================
//  StyleHub — Product Detail Page (product.js)
// ============================================================

// ---------- Star Rating Input ----------
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    const star = e.target.closest("#starRatingInput i");
    if (!star) return;
    const val = parseInt(star.dataset.value);
    document.getElementById("reviewRating").value = val;
    document.querySelectorAll("#starRatingInput i").forEach((s, idx) => {
      s.className = idx < val ? "fa-solid fa-star" : "fa-regular fa-star";
      s.style.color = idx < val ? "#f4a02a" : "#ccc";
    });
  });
});

// ---------- Review Submission ----------
// Reviews are stored per-product in localStorage so they persist across page loads.
function _getStoredReviews(productId) {
  try { return JSON.parse(localStorage.getItem(`reviews_${productId}`) || "[]"); } catch { return []; }
}
function _saveReviews(productId, reviews) {
  localStorage.setItem(`reviews_${productId}`, JSON.stringify(reviews));
}

function loadStoredReviews(product) {
  const reviews = _getStoredReviews(product.id);
  const list = document.getElementById("reviewsList");
  const noMsg = document.getElementById("noReviewsMsg");
  const countEl = document.getElementById("reviewTabCount");
  const avgEl = document.getElementById("avgRatingNum");
  const starsEl = document.getElementById("avgRatingStars");
  const avgCountEl = document.getElementById("avgRatingCount");

  if (reviews.length === 0) {
    if (noMsg) noMsg.style.display = "";
    if (countEl) countEl.textContent = "0";
    if (avgEl) avgEl.textContent = product.rating.toFixed(1);
    if (starsEl) starsEl.innerHTML = generateStars(product.rating);
    if (avgCountEl) avgCountEl.textContent = "0 reviews";
    return;
  }

  if (noMsg) noMsg.style.display = "none";
  if (countEl) countEl.textContent = reviews.length;

  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  if (avgEl) avgEl.textContent = avgRating.toFixed(1);
  if (starsEl) starsEl.innerHTML = generateStars(avgRating);
  if (avgCountEl) avgCountEl.textContent = `Based on ${reviews.length} review${reviews.length !== 1 ? "s" : ""}`;

  // Rebuild distribution bars
  const dist = [0,0,0,0,0];
  reviews.forEach(r => { if (r.rating >= 1 && r.rating <= 5) dist[r.rating - 1]++; });
  const bars = document.querySelectorAll(".review-bar-fill");
  const barLabels = document.querySelectorAll(".review-bar-row span:last-child");
  [5,4,3,2,1].forEach((star, i) => {
    const pct = reviews.length ? Math.round((dist[star-1] / reviews.length) * 100) : 0;
    if (bars[i]) bars[i].style.width = pct + "%";
    if (barLabels[i]) barLabels[i].textContent = pct + "%";
  });

  const reviewItems = reviews.map(r => `
    <div class="review-item">
      <div class="review-header">
        <div class="review-avatar" style="background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:50%;font-weight:700;font-size:1rem;">
          ${r.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div class="review-author-name">${r.name}</div>
          <div class="review-author-date">${r.date}</div>
          <div class="stars" style="font-size:.8rem;color:#f4a02a;margin-top:3px;">${generateStars(r.rating)}</div>
        </div>
      </div>
      <p class="review-text">${r.text}</p>
    </div>`).join("");
  if (list) list.innerHTML = (noMsg ? noMsg.outerHTML : "") + reviewItems;
  if (noMsg) document.getElementById("noReviewsMsg").style.display = "none";
}

function submitReview(e) {
  e.preventDefault();
  const name = document.getElementById("reviewName").value.trim();
  const text = document.getElementById("reviewText").value.trim();
  const rating = parseInt(document.getElementById("reviewRating").value);

  if (!name || !text) return;
  if (!rating || rating < 1 || rating > 5) {
    alert("Please select a star rating.");
    return;
  }

  const product = window._productState?.product;
  if (!product) return;

  const review = {
    name,
    text,
    rating,
    date: new Date().toLocaleDateString("en-IN", { year:"numeric", month:"long", day:"numeric" })
  };

  const reviews = _getStoredReviews(product.id);
  reviews.unshift(review);
  _saveReviews(product.id, reviews);

  // Reset form
  document.getElementById("reviewForm").reset();
  document.querySelectorAll("#starRatingInput i").forEach(s => {
    s.className = "fa-regular fa-star";
    s.style.color = "#ccc";
  });
  document.getElementById("reviewRating").value = "0";
  document.getElementById("reviewSuccess").style.display = "";
  setTimeout(() => { const el = document.getElementById("reviewSuccess"); if (el) el.style.display = "none"; }, 4000);

  loadStoredReviews(product);
}

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
  document.title = `${product.name} — நம்ம ஊரு புடவைக்கர்`;
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
  document.getElementById("tabDescription").innerHTML = `${product.description}<br><em style="font-size:.82rem;color:var(--text-muted);">Please refer real time image of the product.</em>`;
  document.getElementById("tabMaterial").textContent = product.material;
  document.getElementById("tabFeatures").innerHTML = [
    "Premium quality materials",
    `Made from ${product.material}`,
    "Standard fit — please check available sizes above",
    "Easy care — machine washable",
    "Ethically manufactured"
  ].map(f => `<li>${f}</li>`).join("");

  loadStoredReviews(product);
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

  const colorsHTML = product.colors.slice(0, 1).map((c) => `
    <span class="product-color active" data-color="${c}"
      style="background:${c};${c === "#ffffff" || c === "#FFFFFF" ? "border:2px solid #ccc;" : ""}cursor:default;"></span>
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
        <p class="product-info-description">${product.description}<br><em style="font-size:.82rem;color:var(--text-muted);">Please refer real time image of the product.</em></p>

        <!-- Color -->
        <div class="option-label">Color: <span id="colorLabel" style="font-weight:400;text-transform:none;letter-spacing:0;">${selectedColor}</span></div>
        <div class="product-colors" style="margin-bottom:24px;">${colorsHTML}</div>

        <!-- Size (men only) -->
        ${product.category !== 'women' ? `
        <div class="option-label">Size: <span id="sizeLabel" style="font-weight:400;text-transform:none;letter-spacing:0;">${selectedSize}</span></div>
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
          <div class="product-meta-item"><strong>Returns:</strong> <span>Return accepted if it is damaged product</span></div>
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

  // Attach cursor-tracked zoom to the main gallery image
  initGalleryZoom();
}

function initGalleryZoom() {
  const container = document.getElementById("galleryMain");
  if (!container) return;
  const img = document.getElementById("mainImage");
  if (!img) return;

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(2);
    const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(2);
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = "scale(1.5)";
  });

  container.addEventListener("mouseleave", () => {
    img.style.transform = "";
    img.style.transformOrigin = "";
  });
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
    .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category && p.category !== "men")
    .slice(0, 4);

  const grid = document.getElementById("relatedGrid");
  if (grid && related.length > 0) {
    grid.innerHTML = related.map(p => renderProductCard(p)).join("");
  } else if (grid) {
    const allOther = PRODUCTS.filter(p => p.id !== currentProduct.id && p.category !== "men").slice(0, 4);
    grid.innerHTML = allOther.map(p => renderProductCard(p)).join("");
  }
}
