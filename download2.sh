#!/bin/bash
cd /workspace/call-presentation.github.io/images

echo "Downloading more images..."

# Imam Mahdi related artwork from Wikimedia
wget -q --no-check-certificate -O mahdi-calligraphy.png "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Imam_Mahdi_Calligraphy.png/400px-Imam_Mahdi_Calligraphy.png"

# Beautiful mosque dome
wget -q --no-check-certificate -O dome.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Imam_Ali_Mosque_Najaf.jpg/640px-Imam_Ali_Mosque_Najaf.jpg"

# Shrine with light
wget -q --no-check-certificate -O shrine.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Imam_Reza_shrine_at_night.jpg/640px-Imam_Reza_shrine_at_night.jpg"

echo ""
echo "=== All images ==="
for f in *; do
  size=$(stat -c%s "$f" 2>/dev/null || echo 0)
  type=$(file -b "$f" 2>/dev/null | head -c 30)
  echo "$f: $size bytes - $type"
done
