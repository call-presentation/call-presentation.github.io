#!/usr/bin/env python3
"""Download Islamic images from various free sources."""
import urllib.request
import os

images_dir = "/workspace/call-presentation.github.io/images"
os.makedirs(images_dir, exist_ok=True)

# Use direct Unsplash source URLs (free to use)
images = [
    # Golden dome (mosque architecture)
    ("https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800", "dome.jpg"),
    # Islamic geometric pattern
    ("https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800", "pattern.jpg"),
    # Islamic calligraphy/art
    ("https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800", "calligraphy.jpg"),
    # Mosque interior
    ("https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800", "mosque.jpg"),
    # Mosque at sunset/night
    ("https://images.unsplash.com/photo-1545424920-b5a0a0f9a5d5?w=800", "sunset.jpg"),
]

for url, filename in images:
    filepath = os.path.join(images_dir, filename)
    print(f"Downloading {filename}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=30) as response:
            data = response.read()
            with open(filepath, 'wb') as f:
                f.write(data)
            print(f"  Saved {len(data)} bytes to {filename}")
    except Exception as e:
        print(f"  Failed: {e}")

print("\nDone! Checking files:")
for f in os.listdir(images_dir):
    path = os.path.join(images_dir, f)
    size = os.path.getsize(path)
    print(f"  {f}: {size} bytes")
