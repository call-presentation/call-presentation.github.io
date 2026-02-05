#!/usr/bin/env python3
"""Download images using requests module or urllib with proper handling."""
import urllib.request
import os
import ssl
import json

# Disable SSL verification for testing
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

images_dir = "/workspace/call-presentation.github.io/images"

# Clear existing images
for f in os.listdir(images_dir):
    os.remove(os.path.join(images_dir, f))
print("Cleared existing images\n")

# Use Picsum for guaranteed working images
images = [
    ("https://picsum.photos/seed/dome/800/600", "dome.jpg"),
    ("https://picsum.photos/seed/mosque/800/600", "mosque.jpg"),
    ("https://picsum.photos/seed/pattern/800/600", "pattern.jpg"),
    ("https://picsum.photos/seed/calligraphy/800/600", "calligraphy.jpg"),
]

for url, filename in images:
    filepath = os.path.join(images_dir, filename)
    print(f"Downloading {filename} from {url}...")
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        with urllib.request.urlopen(req, context=ssl_context, timeout=30) as response:
            data = response.read()
            with open(filepath, 'wb') as f:
                f.write(data)
            
            # Check if valid JPEG
            is_jpeg = data[:2] == b'\xff\xd8'
            is_png = data[:4] == b'\x89PNG'
            img_type = "JPEG" if is_jpeg else ("PNG" if is_png else "UNKNOWN")
            print(f"  ✓ Saved {len(data)} bytes ({img_type})")
    except Exception as e:
        print(f"  ✗ Failed: {e}")

print("\n--- Final Check ---")
for f in sorted(os.listdir(images_dir)):
    path = os.path.join(images_dir, f)
    size = os.path.getsize(path)
    with open(path, 'rb') as file:
        header = file.read(4)
    is_jpeg = header[:2] == b'\xff\xd8'
    is_png = header[:4] == b'\x89PNG'
    img_type = "JPEG ✓" if is_jpeg else ("PNG ✓" if is_png else "INVALID ✗")
    print(f"  {f}: {size:,} bytes - {img_type}")
