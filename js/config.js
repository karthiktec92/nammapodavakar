// ============================================================
//  StyleHub — Product Configuration
//  Edit this file to update prices and product images.
//  No other files need to be touched for price/image changes.
// ============================================================

const PRODUCT_CONFIG = {

  // ----------------------------------------------------------
  //  NAMES
  //  Keys are product IDs.
  //  Edit the name here to rename a product across the whole site.
  // ----------------------------------------------------------
  names: {
    // --- MEN ---
    1:  "Classic Oxford Shirt",
    2:  "Slim-Fit Chino Pants",
    3:  "Premium Denim Jacket",
    4:  "Essential White Tee",
    5:  "Tailored Wool Blazer",
    6:  "Linen Summer Shorts",
    // --- WOMEN ---
    7:  "Floral Wrap Dress",
    8:  "High-Rise Skinny Jeans",
    9:  "Silk Blouse",
    10: "Knit Cardigan",
    11: "Pleated Midi Skirt",
    12: "Oversized Trench Coat",
  },

  // ----------------------------------------------------------
  //  PRICES
  //  Keys are product IDs.
  //  Set originalPrice to null if there is no discount.
  //  discount is the percentage shown as the "Save X%" badge.
  // ----------------------------------------------------------
  prices: {
    1:  { price: 4999,  originalPrice: 6599,  discount: 25 },
    2:  { price: 6249,  originalPrice: null,  discount: 0  },
    3:  { price: 9999,  originalPrice: 12499, discount: 20 },
    4:  { price: 2499,  originalPrice: null,  discount: 0  },
    5:  { price: 15999, originalPrice: 19999, discount: 20 },
    6:  { price: 3749,  originalPrice: null,  discount: 0  },
    7:  { price: 1200,  originalPrice: 1500,  discount: 25 },
    8:  { price: 6699,  originalPrice: null,  discount: 0  },
    9:  { price: 8299,  originalPrice: 10799, discount: 23 },
    10: { price: 5849,  originalPrice: null,  discount: 0  },
    11: { price: 5399,  originalPrice: 7099,  discount: 24 },
    12: { price: 18299, originalPrice: 23299, discount: 21 },
  },

  // ----------------------------------------------------------
  //  IMAGES
  //  Keys are product IDs.
  //
  //  HOW TO USE LOCAL IMAGES:
  //    1. Place your image files inside:
  //         images/products/{product-id}/
  //       Example for product 1:
  //         images/products/1/front.jpg
  //         images/products/1/back.jpg
  //         images/products/1/detail.jpg
  //
  //    2. Update the paths array below for that product ID.
  //       Paths are relative to the site root (index.html).
  //
  //    3. The first image in the array is used as the main
  //       thumbnail on product cards and shop listings.
  //
  //  SUPPORTED FORMATS: .jpg  .jpeg  .png  .webp  .avif
  //
  //  If you leave useLocalImages: false, the fallback CDN
  //  images defined in data.js will be used automatically.
  // ----------------------------------------------------------
  useLocalImages: false,   // ← set to true to use local image paths for ALL products

  // Products listed here always use local images regardless of useLocalImages flag
  localOverrides: [7, 8],

  images: {
    // --- MEN ---
    1: [
      "images/products/1/image-1.jpg",
      "images/products/1/image-2.jpg",
      "images/products/1/image-3.jpg",
    ],
    2: [
      "images/products/2/image-1.jpg",
      "images/products/2/image-2.jpg",
    ],
    3: [
      "images/products/3/image-1.jpg",
      "images/products/3/image-2.jpg",
    ],
    4: [
      "images/products/4/image-1.jpg",
      "images/products/4/image-2.jpg",
    ],
    5: [
      "images/products/5/image-1.jpg",
      "images/products/5/image-2.jpg",
    ],
    6: [
      "images/products/6/image-1.jpg",
      "images/products/6/image-2.jpg",
    ],
    // --- WOMEN ---
    7: [
      "images/products/7/PXL_20260321_075700464.jpg.jpeg",
      "images/products/7/PXL_20260321_075708539.jpg.jpeg",
    ],
    8: [
      "images/products/8/PXL_20260321_075544782.jpg.jpeg",
      "images/products/8/PXL_20260321_075556011.jpg.jpeg",
    ],
    9: [
      "images/products/9/image-1.jpg",
      "images/products/9/image-2.jpg",
    ],
    10: [
      "images/products/10/image-1.jpg",
      "images/products/10/image-2.jpg",
    ],
    11: [
      "images/products/11/image-1.jpg",
      "images/products/11/image-2.jpg",
    ],
    12: [
      "images/products/12/image-1.jpg",
      "images/products/12/image-2.jpg",
    ],
  },

  // ----------------------------------------------------------
  //  Helper — called by data.js to resolve the image array
  //  for a given product ID. Do not edit this function.
  // ----------------------------------------------------------
  getImages(productId, fallbackImages) {
    if ((this.useLocalImages || this.localOverrides.includes(productId)) && this.images[productId]) {
      return this.images[productId];
    }
    return fallbackImages;
  },

  // ----------------------------------------------------------
  //  Helper — called by data.js to resolve price fields.
  //  Do not edit this function.
  // ----------------------------------------------------------
  getPrice(productId, field, defaultValue) {
    const cfg = this.prices[productId];
    return cfg !== undefined && cfg[field] !== undefined ? cfg[field] : defaultValue;
  },

  // ----------------------------------------------------------
  //  Helper — called by data.js to resolve the product name.
  //  Do not edit this function.
  // ----------------------------------------------------------
  getName(productId, defaultName) {
    return this.names[productId] !== undefined ? this.names[productId] : defaultName;
  },
};
