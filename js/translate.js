/**
 * Translation Toggle for Call Presentation Site
 * Toggles between English and Persian (Farsi) for elements with data-fa attribute
 */

(function () {
    'use strict';

    let isTranslated = false;
    const STORAGE_KEY = 'imam-mahdi-lang';

    // Show disclaimer toast
    function showDisclaimer() {
        if (document.querySelector('.translate-toast')) return;

        const toast = document.createElement('div');
        toast.className = 'translate-toast';
        toast.innerHTML = `
            <div class="translate-toast-content">
                <span class="translate-toast-icon">⚠️</span>
                <div>
                    <strong>توجه / Note</strong>
                    <p>ترجمه فارسی ممکن است دارای اشکالاتی باشد. لطفاً برای دقت بیشتر به متن اصلی انگلیسی مراجعه کنید.</p>
                    <p style="font-size:0.82rem;opacity:0.85;">Farsi translation may contain inaccuracies. Please refer to the original English text for accuracy.</p>
                </div>
                <button class="translate-toast-close" onclick="this.closest('.translate-toast').remove()">&times;</button>
            </div>
        `;
        document.body.appendChild(toast);

        // Auto-dismiss after 8 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.add('translate-toast-hide');
                setTimeout(() => toast.remove(), 400);
            }
        }, 8000);
    }

    // Apply translations
    function applyTranslation() {
        const elements = document.querySelectorAll('[data-fa]');
        elements.forEach(el => {
            if (!el.hasAttribute('data-en')) {
                el.setAttribute('data-en', el.innerHTML);
            }
            el.innerHTML = el.getAttribute('data-fa');
            el.style.direction = 'rtl';
            el.style.textAlign = 'right';
            el.classList.add('translated-fa');
        });
    }

    // Revert to English
    function revertTranslation() {
        const elements = document.querySelectorAll('[data-fa]');
        elements.forEach(el => {
            if (el.hasAttribute('data-en')) {
                el.innerHTML = el.getAttribute('data-en');
            }
            el.style.direction = '';
            el.style.textAlign = '';
            el.classList.remove('translated-fa');
        });
    }

    // Update button text
    function updateButton() {
        const btn = document.getElementById('translate-btn');
        if (!btn) return;
        const span = btn.querySelector('span');
        if (span) {
            span.textContent = isTranslated ? 'English' : 'فارسی';
        }
        btn.classList.toggle('active', isTranslated);
    }

    // Toggle translation
    window.toggleTranslation = function () {
        isTranslated = !isTranslated;

        if (isTranslated) {
            applyTranslation();
            showDisclaimer();
        } else {
            revertTranslation();
        }

        updateButton();
        localStorage.setItem(STORAGE_KEY, isTranslated ? 'fa' : 'en');
    };

    // Check saved preference on load
    function checkSavedPreference() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'fa') {
            isTranslated = true;
            applyTranslation();
            updateButton();
        }
    }

    // Initialize when DOM is ready, with a small delay to let components load
    function initTranslation() {
        // Wait for navbar to be loaded
        const checkBtn = setInterval(() => {
            if (document.getElementById('translate-btn')) {
                clearInterval(checkBtn);
                checkSavedPreference();
            }
        }, 100);

        // Fallback: stop checking after 5 seconds
        setTimeout(() => clearInterval(checkBtn), 5000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTranslation);
    } else {
        initTranslation();
    }
})();
