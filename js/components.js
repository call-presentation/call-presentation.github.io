/**
 * Component Loader for Call Presentation Site
 * Loads navbar and footer from reusable component files
 */

(function() {
    'use strict';

    // Determine root path based on current location
    function getRootPath() {
        const path = window.location.pathname;
        if (path.includes('/sections/')) {
            return '../../';
        }
        return '';
    }

    // Load HTML component
    async function loadComponent(componentName, targetId) {
        const rootPath = getRootPath();
        try {
            const response = await fetch(rootPath + 'components/' + componentName + '.html');
            if (!response.ok) throw new Error('Component not found');
            
            let html = await response.text();
            
            // Replace {{rootPath}} placeholder
            html = html.replace(/\{\{rootPath\}\}/g, rootPath);
            
            const target = document.getElementById(targetId);
            if (target) {
                target.innerHTML = html;
            }
        } catch (error) {
            console.error('Failed to load component:', componentName, error);
        }
    }

    // Initialize navigation functionality
    function initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navOverlay = document.querySelector('.nav-overlay');
        const navLinks = document.querySelectorAll('.nav-menu a');

        function closeNav() {
            if (navToggle) navToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                navOverlay.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }

        if (navOverlay) {
            navOverlay.addEventListener('click', closeNav);
        }

        navLinks.forEach(link => {
            link.addEventListener('click', closeNav);
        });

        // Navbar scroll behavior
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                lastScroll = currentScroll;
            });
        }

        // Highlight active page
        highlightActivePage();
    }

    // Highlight active page in navigation
    function highlightActivePage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            if (currentPath === linkPath || 
                (currentPath.endsWith('index.html') && linkPath.endsWith('index.html'))) {
                link.classList.add('active');
            }
        });
    }

    // Initialize back-to-top button
    function initBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Load all components when DOM is ready
    async function init() {
        await Promise.all([
            loadComponent('navbar', 'navbar-placeholder'),
            loadComponent('footer', 'footer-placeholder')
        ]);
        
        // Initialize after components are loaded
        initNavigation();
        initBackToTop();
    }

    // Run when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
