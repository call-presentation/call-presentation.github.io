import os
import sys

images_dir = "/workspace/call-presentation.github.io/images"
for f in os.listdir(images_dir):
    path = os.path.join(images_dir, f)
    size = os.path.getsize(path)
    with open(path, 'rb') as file:
        header = file.read(3)
    is_jpeg = header[:2] == b'\xff\xd8'
    is_png = header == b'\x89PN'
    img_type = "JPEG" if is_jpeg else ("PNG" if is_png else "UNKNOWN")
    print(f"{f}: {size} bytes, Type: {img_type}")
