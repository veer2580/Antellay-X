import os
import cv2
import numpy as np
from PIL import Image

src_path = r'C:\Users\ronak\.gemini\antigravity-ide\brain\83f8b6c6-a4ac-43d0-b0c4-37c454926db5\.user_uploaded\media_1788453516697.png'
public_dir = r'c:\Users\ronak\OneDrive\Desktop\space-x\public'
os.makedirs(public_dir, exist_ok=True)

# 1. Load the original image
img_pil = Image.open(src_path).convert('L')
gray = np.array(img_pil)

# Alpha extraction: smooth thresholding
# Black background (0-15) -> 0 alpha
# White foreground (180-255) -> 255 alpha
# Smooth anti-aliasing in between
alpha = np.clip((gray.astype(float) - 12) / (200 - 12) * 255, 0, 255).astype(np.uint8)

# Create 1024x1024 RGBA image with white foreground and transparent background
rgba = np.zeros((1024, 1024, 4), dtype=np.uint8)
rgba[:, :, 0] = 255
rgba[:, :, 1] = 255
rgba[:, :, 2] = 255
rgba[:, :, 3] = alpha

# Find tight bounding box of the logo
rows = np.any(alpha > 15, axis=1)
cols = np.any(alpha > 15, axis=0)
ymin, ymax = np.where(rows)[0][[0, -1]]
xmin, xmax = np.where(cols)[0][[0, -1]]

cropped_logo = rgba[ymin:ymax+1, xmin:xmax+1]
logo_h, logo_w = cropped_logo.shape[:2]

# Center the logo in a square with optimal ~10% padding so it looks bold in browser tabs
pad_pct = 0.08
canvas_size = int(max(logo_w, logo_h) * (1 + 2 * pad_pct))
centered_rgba = np.zeros((canvas_size, canvas_size, 4), dtype=np.uint8)

offset_x = (canvas_size - logo_w) // 2
offset_y = (canvas_size - logo_h) // 2
centered_rgba[offset_y:offset_y+logo_h, offset_x:offset_x+logo_w] = cropped_logo

centered_img = Image.fromarray(centered_rgba, mode='RGBA')

# To ensure the white logo is crisp and visible on BOTH white/light tabs and dark tabs,
# let's also create a version with a very subtle edge definition, and pure white version.
# Let's save 512x512, 192x192, 180x180 (apple touch), 32x32, 16x16
icon_512 = centered_img.resize((512, 512), Image.Resampling.LANCZOS)
icon_192 = centered_img.resize((192, 192), Image.Resampling.LANCZOS)
icon_180 = centered_img.resize((180, 180), Image.Resampling.LANCZOS)
icon_64 = centered_img.resize((64, 64), Image.Resampling.LANCZOS)
icon_32 = centered_img.resize((32, 32), Image.Resampling.LANCZOS)
icon_16 = centered_img.resize((16, 16), Image.Resampling.LANCZOS)

icon_512.save(os.path.join(public_dir, 'favicon.png'))
icon_192.save(os.path.join(public_dir, 'favicon-192x192.png'))
icon_180.save(os.path.join(public_dir, 'apple-touch-icon.png'))
icon_32.save(os.path.join(public_dir, 'favicon-32x32.png'))
icon_16.save(os.path.join(public_dir, 'favicon-16x16.png'))

# Save multi-size favicon.ico
icon_512.save(
    os.path.join(public_dir, 'favicon.ico'),
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
)

print('Saved PNG and ICO favicons successfully!')

# 2. Extract vector contours for perfect SVG favicon
_, thresh = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY)
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_TC89_KCOS)

# We want viewBox to tightly encompass the logo with nice padding
pad = 30
vb_x = xmin - pad
vb_y = ymin - pad
vb_w = logo_w + 2 * pad
vb_h = logo_h + 2 * pad

# Generate SVG paths
svg_paths = []
for c in contours:
    approx = cv2.approxPolyDP(c, 1.2, True)
    pts = approx.reshape(-1, 2)
    d = f'M {pts[0][0]} {pts[0][1]} ' + ' '.join([f'L {p[0]} {p[1]}' for p in pts[1:]]) + ' Z'
    svg_paths.append(d)

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb_x} {vb_y} {vb_w} {vb_h}" fill="none">
  <defs>
    <!-- Subtle drop-shadow so white logo remains visible even on pure white browser tabs -->
    <filter id="tab-contrast" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="1" stdDeviation="4" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>
  <style>
    .antellay-x-glyph {{
      fill: #ffffff;
      filter: url(#tab-contrast);
      transition: fill 0.2s ease;
    }}
    /* When browser tab is explicitly light mode, keep high contrast white with shadow or crisp brand tint */
    @media (prefers-color-scheme: light) {{
      .antellay-x-glyph {{
        fill: #0c1017;
        filter: none;
      }}
    }}
    @media (prefers-color-scheme: dark) {{
      .antellay-x-glyph {{
        fill: #ffffff;
        filter: url(#tab-contrast);
      }}
    }}
  </style>
  <g class="antellay-x-glyph">
'''
for p in svg_paths:
    svg_content += f'    <path d="{p}" />\n'
svg_content += '''  </g>
</svg>
'''

with open(os.path.join(public_dir, 'favicon.svg'), 'w', encoding='utf-8') as f:
    f.write(svg_content)

print('Saved SVG favicon successfully!')
