#!/bin/bash

# Script to convert HTML files to use component-based navigation and footer
# This replaces inline nav/footer with placeholder divs and component loader

ROOT_DIR="/workspace/call-presentation.github.io"

# Files to convert
FILES=(
    "about.html"
    "sections/amirhossein/promised-savior.html"
    "sections/amirhossein/references.html"
    "sections/taha/index.html"
    "sections/taha/faq.html"
    "sections/taha/references.html"
    "sections/ali/index.html"
    "sections/ali/references.html"
    "sections/amirreza/index.html"
    "sections/amirreza/faq.html"
    "sections/amirreza/references.html"
    "sections/alireza/index.html"
    "sections/alireza/references.html"
    "sections/parsa/index.html"
    "sections/parsa/faq.html"
    "sections/parsa/references.html"
    "sections/baqer/index.html"
    "sections/baqer/references.html"
    "sections/mohamadhossein/index.html"
)

for file in "${FILES[@]}"; do
    filepath="$ROOT_DIR/$file"
    
    if [ ! -f "$filepath" ]; then
        echo "Skipping $file - not found"
        continue
    fi
    
    echo "Converting $file..."
    
    #Backup
    cp "$filepath" "$filepath.backup"
    
    # Use Python for complex replacements
    python3 << EOF
import re

with open('$filepath', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace navbar section
nav_pattern = r'    <!-- Navigation -->\s*<nav class="navbar">.*?</nav>\s*<div class="nav-overlay"></div>'
nav_replacement = '    <!-- Navigation -->\n    <div id="navbar-placeholder"></div>'
content = re.sub(nav_pattern, nav_replacement, content, flags=re.DOTALL)

# Replace footer section
footer_pattern = r'    <!-- Footer -->\s*<footer class="site-footer">.*?</footer>'
footer_replacement = '    <!-- Footer -->\n    <div id="footer-placeholder"></div>'
content = re.sub(footer_pattern, footer_replacement, content, flags=re.DOTALL)

# Add component loader script before closing body (if not already there)
if 'js/components.js' not in content:
    # Find the script section before </body>
    script_pattern = r'(\s*<script>)'
    script_replacement = r'\n    <!-- Load components -->\n    <script src="../../js/components.js"></script>\1'
    
    # For root level files (about.html), use different path
    if '/sections/' not in '$filepath':
        script_replacement = r'\n    <!-- Load components -->\n    <script src="js/components.js"></script>\1'
    
    content = re.sub(script_pattern, script_replacement, content, count=1)

# Remove duplicated navigation JavaScript
nav_js_patterns = [
    r'// Mobile navigation toggle.*?navLinks\.forEach\(link => link\.addEventListener\(\'click\', closeNav\)\);',
    r'// Mobile Navigation.*?}\);',
    r'const navToggle = document\.querySelector.*?navOverlay\.addEventListener\(\'click\', closeNav\);',
]

for pattern in nav_js_patterns:
    content = re.sub(pattern, '', content, flags=re.DOTALL)

# RemoveNavbar scroll behavior (now in components.js)
content = re.sub(r'// Navbar scroll behavior.*?lastScroll = currentScroll;\s*}\);', '', content, flags=re.DOTALL)

with open('$filepath', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"  ✓ Converted $file")
EOF

done

echo ""
echo "Conversion complete!"
echo "Backup files saved with .backup extension"
