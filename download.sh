#!/bin/bash
cd /workspace/call-presentation.github.io/images

echo "Downloading images..."

# Download Jamkaran Mosque
wget -q --no-check-certificate -O jamkaran.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Jamkaran2.jpg/640px-Jamkaran2.jpg"
echo "jamkaran.jpg: $(stat -c%s jamkaran.jpg 2>/dev/null || echo 0) bytes"

# Download Islamic geometric pattern
wget -q --no-check-certificate -O pattern.png "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Roof_hafridge_702702030.jpg/640px-Roof_hafridge_702702030.jpg"
echo "pattern.png: $(stat -c%s pattern.png 2>/dev/null || echo 0) bytes"

# Download mosque at sunset  
wget -q --no-check-certificate -O mosque.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Fatima_Masumeh_Shrine.jpg/640px-Fatima_Masumeh_Shrine.jpg"
echo "mosque.jpg: $(stat -c%s mosque.jpg 2>/dev/null || echo 0) bytes"

echo ""
echo "=== Final contents ==="
ls -la
