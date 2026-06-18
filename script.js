// ===== Navigation Active State & Smooth Scroll =====

document.addEventListener('DOMContentLoaded', () => {
    const desktopLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.tab-item');
    const allLinks = [...desktopLinks, ...mobileLinks];
    const sections = ['Home', 'About', 'work', 'contact'];

    // Smooth scroll handler for all nav links
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Immediately set active state for responsive feel
            setActive(targetId);
        });
    });

    // Set active class on both desktop and mobile navs
    function setActive(sectionId) {
        desktopLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-section') === sectionId);
        });
        mobileLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-section') === sectionId);
        });
    }

    // IntersectionObserver to track which section is in view
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActive(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });

    // Desktop nav background opacity on scroll
    const desktopNav = document.getElementById('desktop-nav');
    if (desktopNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                desktopNav.style.background = 'rgba(12, 11, 17, 0.95)';
            } else {
                desktopNav.style.background = 'rgba(12, 11, 17, 0.85)';
            }
        }, { passive: true });
    }
});
