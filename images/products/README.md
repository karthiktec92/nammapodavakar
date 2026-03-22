# Product Images Folder

Place product images in the numbered subfolders below.
Each subfolder corresponds to a product ID (as defined in `js/data.js`).

```
images/
└── products/
    ├── 1/          ← Classic Oxford Shirt      (Men)
    ├── 2/          ← Slim-Fit Chino Pants       (Men)
    ├── 3/          ← Premium Denim Jacket        (Men)
    ├── 4/          ← Essential White Tee         (Men)
    ├── 5/          ← Tailored Wool Blazer         (Men)
    ├── 6/          ← Linen Summer Shorts          (Men)
    ├── 7/          ← Floral Wrap Dress           (Women)
    ├── 8/          ← High-Rise Skinny Jeans      (Women)
    ├── 9/          ← Silk Blouse                 (Women)
    ├── 10/         ← Knit Cardigan               (Women)
    ├── 11/         ← Pleated Midi Skirt          (Women)
    └── 12/         ← Oversized Trench Coat       (Women)
```

## Naming Convention

Images should be named sequentially:
```
image-1.jpg   (main / front view — used as product card thumbnail)
image-2.jpg   (back view)
image-3.jpg   (detail / close-up)
image-4.jpg   (lifestyle / model shot)
```

## Supported Formats
`.jpg`  `.jpeg`  `.png`  `.webp`  `.avif`

## Recommended Dimensions
| Usage          | Recommended Size |
|----------------|-----------------|
| Product card   | 600 × 800 px    |
| Gallery main   | 800 × 1067 px   |
| Thumbnail      | 200 × 200 px    |

Aspect ratio **3:4** (portrait) works best for all views.

## Activating Local Images

1. Drop your image files into the correct numbered folder.  
2. Open `js/config.js`.  
3. Set `useLocalImages: true`.  
4. Update the `images` object with the correct filenames for each product.  

That's it — no other files need to be changed.
