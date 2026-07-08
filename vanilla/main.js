document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Navbar Shrink on Scroll
    // ----------------------------------------------------
    const navbar = document.getElementById('navbar');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-shrink');
        } else {
            navbar.classList.remove('navbar-shrink');
        }
    }
    
    // Run once on load and bind to scroll event
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // ----------------------------------------------------
    // 2. Mobile Menu Toggle
    // ----------------------------------------------------
    const menuBtn = document.getElementById('menu-btn');
    const navbarLinks = document.getElementById('navbar-links');
    
    if (menuBtn && navbarLinks) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navbarLinks.classList.toggle('active');
            navbar.classList.toggle('navbar-mobile-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navbarLinks.classList.contains('active') && !navbar.contains(e.target)) {
                navbarLinks.classList.remove('active');
                navbar.classList.remove('navbar-mobile-open');
            }
        });
        
        // Close menu when clicking a link
        const links = navbarLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navbarLinks.classList.remove('active');
                navbar.classList.remove('navbar-mobile-open');
            });
        });
    }

    // ----------------------------------------------------
    // 3. Portfolio Modal Controls
    // ----------------------------------------------------
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modalOverlays = document.querySelectorAll('.portfolio-modal-overlay');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('active');
                document.body.classList.add('modal-open');
            }
        });
    });
    
    // Close modal function
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    
    // Setup close listeners for all modals
    modalOverlays.forEach(modal => {
        // Close on 'x' button click
        const closeBtn = modal.querySelector('.close-modal-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }
        
        // Close on bottom action button click
        const actionCloseBtn = modal.querySelector('.modal-close-action-btn');
        if (actionCloseBtn) {
            actionCloseBtn.addEventListener('click', () => closeModal(modal));
        }
        
        // Close on clicking outside the container (on the overlay background)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // ----------------------------------------------------
    // 4. Scrollspy (Highlight Navbar Link on Scroll)
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section, header.hero');
    const navAnchors = document.querySelectorAll('.navbar-nav a');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset to trigger slightly before the section reaches top
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if (section.tagName === 'HEADER') {
                    currentSectionId = ''; // Hero header doesn't map to a specific nav list link active state in mockup, or does it?
                } else {
                    currentSectionId = section.getAttribute('id');
                }
            }
        });
        
        navAnchors.forEach(anchor => {
            anchor.classList.remove('active');
            const hrefAttr = anchor.getAttribute('href');
            if (hrefAttr === '#' + currentSectionId || (currentSectionId === '' && hrefAttr === '#')) {
                anchor.classList.add('active');
            }
        });
    });
});
