// ============================================================
//  StyleHub — Products Data
//  Prices and images are driven by js/config.js.
//  Edit config.js to change prices or swap in local images.
// ============================================================

const PRODUCTS = [
  // -------- MEN --------
  {
    id: 1,
    name: PRODUCT_CONFIG.getName(1, "Classic Oxford Shirt"),
    category: "men",
    subCategory: "Saree",
    price:         PRODUCT_CONFIG.getPrice(1, 'price',         4999),
    originalPrice: PRODUCT_CONFIG.getPrice(1, 'originalPrice', 6599),
    discount:      PRODUCT_CONFIG.getPrice(1, 'discount',      25),
    rating: 4.7,
    reviewCount: 0,
    badge: "sale",
    colors: ["#ffffff", "#87CEEB", "#F5DEB3", "#C0C0C0"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: PRODUCT_CONFIG.getImages(1, [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80"
    ]),
    description: "A timeless Oxford shirt crafted from 100% premium cotton. Perfect for business casual or smart weekends.",
    material: "100% Premium Cotton",
    featured: true,
    inStock: true,
    newArrival: true,
    withBlouse: true,
    tags: ["shirt", "men", "office", "casual"]
  },
  {
    id: 2,
    name: PRODUCT_CONFIG.getName(2, "Slim-Fit Chino Pants"),
    category: "men",
    subCategory: "Saree",
    price:         PRODUCT_CONFIG.getPrice(2, 'price',         6249),
    originalPrice: PRODUCT_CONFIG.getPrice(2, 'originalPrice', null),
    discount:      PRODUCT_CONFIG.getPrice(2, 'discount',      0),
    rating: 4.5,
    reviewCount: 0,
    badge: "new",
    colors: ["#D2B48C", "#36454F", "#2F4F4F", "#000000"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    images: PRODUCT_CONFIG.getImages(2, [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80"
    ]),
    description: "Tailored slim-fit chinos with a stretch fabric blend for all-day comfort.",
    material: "97% Cotton, 3% Elastane",
    featured: true,
    inStock: true,
    newArrival: true,
    withBlouse: true,
    tags: ["pants", "men", "chino", "office"]
  },
  {
    id: 3,
    name: PRODUCT_CONFIG.getName(3, "Premium Denim Jacket"),
    category: "men",
    subCategory: "Saree",
    price:         PRODUCT_CONFIG.getPrice(3, 'price',         9999),
    originalPrice: PRODUCT_CONFIG.getPrice(3, 'originalPrice', 12499),
    discount:      PRODUCT_CONFIG.getPrice(3, 'discount',      20),
    rating: 4.8,
    reviewCount: 0,
    badge: "featured",
    colors: ["#1560BD", "#36454F", "#000000"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: PRODUCT_CONFIG.getImages(3, [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4053?w=600&q=80"
    ]),
    description: "A rugged yet refined denim jacket featuring washed indigo fabric and classic western-inspired detailing.",
    material: "100% Denim Cotton",
    featured: true,
    inStock: true,
    newArrival: true,
    withBlouse: true,
    tags: ["jacket", "men", "denim", "casual"]
  },
  {
    id: 4,
    name: PRODUCT_CONFIG.getName(4, "Essential White Tee"),
    category: "men",
    subCategory: "Saree",
    price:         PRODUCT_CONFIG.getPrice(4, 'price',         2499),
    originalPrice: PRODUCT_CONFIG.getPrice(4, 'originalPrice', null),
    discount:      PRODUCT_CONFIG.getPrice(4, 'discount',      0),
    rating: 4.6,
    reviewCount: 0,
    badge: null,
    colors: ["#ffffff", "#000000", "#808080", "#C0C0C0"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: PRODUCT_CONFIG.getImages(4, [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80"
    ]),
    description: "Our bestselling essential tee. Soft, breathable, and perfectly cut for a relaxed-modern fit.",
    material: "180gsm Cotton Jersey",
    featured: false,
    inStock: true,
    newArrival: true,
    withBlouse: true,
    tags: ["t-shirt", "men", "basic", "casual"]
  },
  {
    id: 5,
    name: PRODUCT_CONFIG.getName(5, "Tailored Wool Blazer"),
    category: "men",
    subCategory: "Saree",
    price:         PRODUCT_CONFIG.getPrice(5, 'price',         15999),
    originalPrice: PRODUCT_CONFIG.getPrice(5, 'originalPrice', 19999),
    discount:      PRODUCT_CONFIG.getPrice(5, 'discount',      20),
    rating: 4.9,
    reviewCount: 0,
    badge: "sale",
    colors: ["#36454F", "#000000", "#8B7355"],
    sizes: ["S", "M", "L", "XL"],
    images: PRODUCT_CONFIG.getImages(5, [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80"
    ]),
    description: "An elegant wool blend blazer tailored to flatter every body type. Ideal for boardrooms and evenings out.",
    material: "70% Wool, 30% Polyester",
    featured: true,
    inStock: true,
    newArrival: true,
    withBlouse: true,
    tags: ["blazer", "men", "formal", "office"]
  },
  {
    id: 6,
    name: PRODUCT_CONFIG.getName(6, "Linen Summer Shorts"),
    category: "men",
    subCategory: "Saree",
    price:         PRODUCT_CONFIG.getPrice(6, 'price',         3749),
    originalPrice: PRODUCT_CONFIG.getPrice(6, 'originalPrice', null),
    discount:      PRODUCT_CONFIG.getPrice(6, 'discount',      0),
    rating: 4.4,
    reviewCount: 0,
    badge: "new",
    colors: ["#F5DEB3", "#98FF98", "#87CEEB", "#FFFFFF"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: PRODUCT_CONFIG.getImages(6, [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80",
      "https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=600&q=80"
    ]),
    description: "Lightweight linen shorts that keep you cool in the summer heat. Perfect for beach days and weekend outings.",
    material: "100% Linen",
    featured: false,
    inStock: true,
    newArrival: true,
    withBlouse: true,
    tags: ["shorts", "men", "summer", "casual"]
  },

  // -------- WOMEN --------
  {
    id: 7,
    name: PRODUCT_CONFIG.getName(7, "Floral Wrap Dress"),
    category: "women",
    subCategory: "Saree",
    price:         PRODUCT_CONFIG.getPrice(7, 'price',         1200),
    originalPrice: PRODUCT_CONFIG.getPrice(7, 'originalPrice', 1500),
    discount:      PRODUCT_CONFIG.getPrice(7, 'discount',      25),
    rating: 4.8,
    reviewCount: 0,
    badge: "sale",
    colors: ["#FFB6C1", "#FF69B4", "#DDA0DD", "#FFFACD"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: PRODUCT_CONFIG.getImages(7, [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80"
    ]),
    description: "A romantic wrap dress with a vibrant floral print. Adjustable tie waist for a perfect fit every time.",
    material: "100% Viscose",
    featured: true,
    inStock: true,
    newArrival: true,
    withBlouse: true,
    syntheticCotton: true,
    tags: ["dress", "women", "floral", "summer"]
  },
  {
    id: 8,
    name: PRODUCT_CONFIG.getName(8, "High-Rise Skinny Jeans"),
    category: "women",
    subCategory: "Saree",
    price:         PRODUCT_CONFIG.getPrice(8, 'price',         6699),
    originalPrice: PRODUCT_CONFIG.getPrice(8, 'originalPrice', null),
    discount:      PRODUCT_CONFIG.getPrice(8, 'discount',      0),
    rating: 4.7,
    reviewCount: 0,
    badge: "featured",
    colors: ["#1560BD", "#000000", "#708090", "#D2B48C"],
    sizes: ["24", "26", "27", "28", "30", "32"],
    images: PRODUCT_CONFIG.getImages(8, [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80"
    ]),
    description: "Curve-hugging high-rise jeans with just the right stretch for all-day comfort and confidence.",
    material: "92% Cotton, 6% Polyester, 2% Elastane",
    featured: true,
    inStock: true,
    newArrival: true,
    withBlouse: true,
    tags: ["jeans", "women", "denim", "casual"]
  },
  {
    id: 9,
    name: PRODUCT_CONFIG.getName(9, "Silk Blouse"),
    category: "women",
    subCategory: "Saree",
    price:         PRODUCT_CONFIG.getPrice(9, 'price',         8299),
    originalPrice: PRODUCT_CONFIG.getPrice(9, 'originalPrice', 10799),
    discount:      PRODUCT_CONFIG.getPrice(9, 'discount',      23),
    rating: 4.9,
    reviewCount: 0,
    badge: "new",
    colors: ["#FFFACD", "#FFB6C1", "#FFFFFF", "#C8956C"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: PRODUCT_CONFIG.getImages(9, [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80",
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80"
    ]),
    description: "Luxuriously smooth silk blouse with a relaxed drape. Elevates any outfit from casual to polished.",
    material: "100% Mulberry Silk",
    featured: true,
    inStock: true,
    newArrival: true,
    withBlouse: true,
    tags: ["blouse", "women", "silk", "office"]
  },
  {
    id: 10,
    name: PRODUCT_CONFIG.getName(10, "Knit Cardigan"),
    category: "women",
    subCategory: "Saree",
    price:         PRODUCT_CONFIG.getPrice(10, 'price',         5849),
    originalPrice: PRODUCT_CONFIG.getPrice(10, 'originalPrice', null),
    discount:      PRODUCT_CONFIG.getPrice(10, 'discount',      0),
    rating: 4.6,
    reviewCount: 0,
    badge: null,
    colors: ["#F5DEB3", "#FFC0CB", "#D3D3D3", "#808080"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: PRODUCT_CONFIG.getImages(10, [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80"
    ]),
    description: "A cosy oversized knit cardigan perfect for layering. Soft merino-blend yarn for warmth without bulk.",
    material: "80% Merino Wool, 20% Nylon",
    featured: false,
    inStock: true,
    newArrival: true,
    withBlouse: true,
    syntheticCotton: true,
    tags: ["cardigan", "women", "knitwear", "winter"]
  },
  {
    id: 11,
    name: PRODUCT_CONFIG.getName(11, "Pleated Midi Skirt"),
    category: "women",
    subCategory: "Saree",
    price:         PRODUCT_CONFIG.getPrice(11, 'price',         5399),
    originalPrice: PRODUCT_CONFIG.getPrice(11, 'originalPrice', 7099),
    discount:      PRODUCT_CONFIG.getPrice(11, 'discount',      24),
    rating: 4.5,
    reviewCount: 0,
    badge: "sale",
    colors: ["#000000", "#1560BD", "#8B0000", "#FFFACD"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: PRODUCT_CONFIG.getImages(11, [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
      "https://images.unsplash.com/photo-1625891813392-e14d8af1c87c?w=600&q=80"
    ]),
    description: "An elegant pleated midi skirt suitable for office days and evening events alike.",
    material: "100% Polyester Crepe",
    featured: true,
    inStock: true,
    newArrival: true,
    withBlouse: true,
    tags: ["skirt", "women", "midi", "formal"]
  },
  {
    id: 12,
    name: PRODUCT_CONFIG.getName(12, "Oversized Trench Coat"),
    category: "women",
    subCategory: "Saree",
    price:         PRODUCT_CONFIG.getPrice(12, 'price',         18299),
    originalPrice: PRODUCT_CONFIG.getPrice(12, 'originalPrice', 23299),
    discount:      PRODUCT_CONFIG.getPrice(12, 'discount',      21),
    rating: 4.9,
    reviewCount: 0,
    badge: "featured",
    colors: ["#D2B48C", "#000000", "#36454F"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: PRODUCT_CONFIG.getImages(12, [
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=600&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80"
    ]),
    description: "A statement oversized trench coat with belt detail. A wardrobe essential that transitions from season to season.",
    material: "65% Polyester, 35% Cotton",
    featured: true,
    inStock: true,
    newArrival: true,
    withBlouse: true,
    tags: ["coat", "women", "trench", "autumn"]
  },
  {
    id: 13,
    name: PRODUCT_CONFIG.getName(13, "Synthetic cotton 2(Black)"),
    category: "women",
    subCategory: "Saree",
    price:         PRODUCT_CONFIG.getPrice(13, 'price',         1499),
    originalPrice: PRODUCT_CONFIG.getPrice(13, 'originalPrice', 1999),
    discount:      PRODUCT_CONFIG.getPrice(13, 'discount',      25),
    rating: 4.7,
    reviewCount: 0,
    badge: "sale",
    colors: ["#000000"],
    sizes: ["Free Size"],
    images: PRODUCT_CONFIG.getImages(13, [
      "images/products/13/20260322_110723.jpg.jpeg",
    ]),
    description: "Elegant black synthetic cotton saree with a rich texture and classic drape. Includes matching blouse.",
    material: "Synthetic Cotton",
    featured: true,
    inStock: true,
    newArrival: true,
    withBlouse: true,
    syntheticCotton: true,
    tags: ["saree", "women", "synthetic", "cotton", "black"]
  },
  {
    id: 14,
    name: PRODUCT_CONFIG.getName(14, "Synthetic blue"),
    category: "women",
    subCategory: "Saree",
    price:         PRODUCT_CONFIG.getPrice(14, 'price',         1499),
    originalPrice: PRODUCT_CONFIG.getPrice(14, 'originalPrice', 1999),
    discount:      PRODUCT_CONFIG.getPrice(14, 'discount',      25),
    rating: 4.6,
    reviewCount: 0,
    badge: "sale",
    colors: ["#1560BD"],
    sizes: ["Free Size"],
    images: PRODUCT_CONFIG.getImages(14, [
      "images/products/14/20260322_111034.jpg.jpeg",
    ]),
    description: "Stunning synthetic blue saree with a graceful fall and lustrous finish. Includes matching blouse.",
    material: "Synthetic Fabric",
    featured: true,
    inStock: true,
    newArrival: true,
    withBlouse: true,
    tags: ["saree", "women", "synthetic", "blue"]
  },
  {
    id: 15,
    name: PRODUCT_CONFIG.getName(15, "Purple shiner 1"),
    category: "women",
    subCategory: "Saree",
    price:         PRODUCT_CONFIG.getPrice(15, 'price',         1699),
    originalPrice: PRODUCT_CONFIG.getPrice(15, 'originalPrice', 2199),
    discount:      PRODUCT_CONFIG.getPrice(15, 'discount',      22),
    rating: 4.8,
    reviewCount: 0,
    badge: "new",
    colors: ["#800080"],
    sizes: ["Free Size"],
    images: PRODUCT_CONFIG.getImages(15, [
      "images/products/15/20260322_105429.jpg.jpeg",
    ]),
    description: "Radiant purple shiner saree with a beautiful sheen and elegant border design. Includes matching blouse.",
    material: "Shiner Fabric",
    featured: true,
    inStock: true,
    newArrival: true,
    withBlouse: true,
    tags: ["saree", "women", "purple", "shiner"]
  },
  {
    id: 16,
    name: PRODUCT_CONFIG.getName(16, "Purple shiner 2"),
    category: "women",
    subCategory: "Saree",
    price:         PRODUCT_CONFIG.getPrice(16, 'price',         1699),
    originalPrice: PRODUCT_CONFIG.getPrice(16, 'originalPrice', 2199),
    discount:      PRODUCT_CONFIG.getPrice(16, 'discount',      22),
    rating: 4.8,
    reviewCount: 0,
    badge: "new",
    colors: ["#9400D3"],
    sizes: ["Free Size"],
    images: PRODUCT_CONFIG.getImages(16, [
      "images/products/16/20260322_105340(0).jpg.jpeg",
    ]),
    description: "Deep violet purple shiner saree with a dazzling shimmer and rich pallu. Includes matching blouse.",
    material: "Shiner Fabric",
    featured: true,
    inStock: true,
    newArrival: true,
    withBlouse: true,
    tags: ["saree", "women", "purple", "shiner"]
  },

];

// Category data
const CATEGORIES = [
  {
    id: "women",
    name: "Women",
    count: PRODUCTS.filter(p => p.category === "women").length,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    description: "Style meets elegance"
  }
];

// Get product by id
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

// Get products by category
function getProductsByCategory(category) {
  if (!category || category === "all") return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

// Get featured products
function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}
