document.addEventListener('DOMContentLoaded', () => {
    // Navbar Shrink & Solid Background on Scroll
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('navbar-logo-img');
    
    function handleScroll() {
        if (window.innerWidth >= 1024) { // Large screens (lg breakpoint)
            if (window.scrollY > 50) {
                navbar.classList.add('bg-dark', 'py-3');
                navbar.classList.remove('lg:bg-transparent', 'lg:py-6');
                
                logo.classList.add('h-[44px]');
                logo.classList.remove('lg:h-[60px]');
            } else {
                navbar.classList.remove('bg-dark', 'py-3');
                navbar.classList.add('lg:bg-transparent', 'lg:py-6');
                
                logo.classList.remove('h-[44px]');
                logo.classList.add('lg:h-[60px]');
            }
        } else {
            // Mobile/Tablet views (always solid and compact)
            navbar.classList.remove('py-3', 'lg:py-6', 'lg:bg-transparent');
            navbar.classList.add('bg-dark', 'py-4');
            
            logo.classList.remove('lg:h-[60px]');
            logo.classList.add('h-11');
        }
    }
    
    // Run once on load and bind to events
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const navbarLinks = document.getElementById('navbar-links');
    
    if (menuBtn && navbarLinks) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navbarLinks.classList.toggle('hidden');
            navbarLinks.classList.toggle('flex');
        });
        
        document.addEventListener('click', (e) => {
            if (!navbarLinks.classList.contains('hidden') && !navbar.contains(e.target)) {
                navbarLinks.classList.add('hidden');
                navbarLinks.classList.remove('flex');
            }
        });
        
        const links = navbarLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navbarLinks.classList.add('hidden');
                navbarLinks.classList.remove('flex');
            });
        });
    }

    // Portfolio Modal Controls
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modalOverlays = document.querySelectorAll('.portfolio-modal-overlay');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.remove('hidden');
                targetModal.classList.add('flex');
                document.body.classList.add('overflow-hidden');
            }
        });
    });
    
    // Close modal function
    function closeModal(modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    }
    
    // Setup close listeners for all modals
    modalOverlays.forEach(modal => {
        const closeBtn = modal.querySelector('.close-modal-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }
        
        const actionCloseBtn = modal.querySelector('.modal-close-action-btn');
        if (actionCloseBtn) {
            actionCloseBtn.addEventListener('click', () => closeModal(modal));
        }
        

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Scrollspy (Highlight Navbar Link on Scroll)
    const sections = document.querySelectorAll('section, header');
    const navAnchors = document.querySelectorAll('#navbar-links a');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if (section.tagName === 'HEADER') {
                    currentSectionId = '';
                } else {
                    currentSectionId = section.getAttribute('id');
                }
            }
        });
        
        navAnchors.forEach(anchor => {
            const hrefAttr = anchor.getAttribute('href');
            if (hrefAttr === '#' + currentSectionId || (currentSectionId === '' && hrefAttr === '#')) {
                anchor.classList.add('text-yellow');
                anchor.classList.remove('text-white');
            } else {
                anchor.classList.remove('text-yellow');
                anchor.classList.add('text-white');
            }
        });
    });
});
