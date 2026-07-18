// ============================================
// script.js
// Swantastic BPO - Payroll Department
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const backToTopBtn = document.getElementById('backToTop');
    const currentYearSpan = document.getElementById('currentYear');
    const heroParticlesContainer = document.getElementById('heroParticles');
    const allNavLinks = document.querySelectorAll('.nav-link');
    const functionCards = document.querySelectorAll('.function-card');
    const missionCards = document.querySelectorAll('.mission-card');
    const cursorDot = document.getElementById('cursorDot');
    const emailModal = document.getElementById('emailModal');
    const openModalBtn = document.getElementById('openEmailModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const sendEmailBtn = document.getElementById('sendEmailBtn');
    const messageField = document.getElementById('messageField');
    const charCounter = document.getElementById('charCounter');

    // Footer year
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Hero particles
    if (heroParticlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            const size = Math.random() * 3 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = Math.random() * 5 + 5 + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            heroParticlesContainer.appendChild(particle);
        }
    }

    // Custom cursor
    if (cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .hamburger, .back-to-top, .modal-close');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorDot.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorDot.classList.remove('hover'));
        });

        const allCards = document.querySelectorAll('.function-card, .contact-card, .about-card, .mission-card');
        allCards.forEach(card => {
            card.addEventListener('mouseenter', () => cursorDot.classList.add('hover'));
            card.addEventListener('mouseleave', () => cursorDot.classList.remove('hover'));
        });
    }

    // Mobile menu
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Navbar scroll effect
    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (navbar) {
            navbar.classList.toggle('scrolled', scrollY > 50);
        }
        if (backToTopBtn) {
            backToTopBtn.classList.toggle('visible', scrollY > 600);
        }
        updateActiveNavLink(scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Back to top
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Active nav link
    function updateActiveNavLink(scrollY) {
        const sections = document.querySelectorAll('section[id]');
        let currentId = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (scrollY >= top && scrollY < top + section.offsetHeight) {
                currentId = section.getAttribute('id');
            }
        });
        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentId) link.classList.add('active');
        });
        if (scrollY < 200) {
            allNavLinks.forEach(l => l.classList.remove('active'));
            document.querySelector('.nav-link[href="#home"]')?.classList.add('active');
        }
    }

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.7s ease-out, transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.15 });

    functionCards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transitionDelay = i * 0.08 + 's';
        observer.observe(card);
    });
    missionCards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transitionDelay = i * 0.1 + 's';
        observer.observe(card);
    });
    document.querySelectorAll('.about-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transitionDelay = i * 0.1 + 's';
        observer.observe(card);
    });
    document.querySelectorAll('.contact-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transitionDelay = i * 0.08 + 's';
        observer.observe(card);
    });

    // --- Email Modal Logic ---
    const receiverEmail = 'payrollswantasticbpo@gmail.com';

    // Character counter
    if (messageField && charCounter) {
        messageField.addEventListener('input', () => {
            const len = messageField.value.length;
            charCounter.textContent = len;
            charCounter.style.color = len >= 400 ? '#ff6b6b' : 'var(--color-accent)';
        });
    }

    // Open modal
    if (openModalBtn && emailModal) {
        openModalBtn.addEventListener('click', () => {
            emailModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (messageField) messageField.value = '';
            if (charCounter) charCounter.textContent = '0';
        });
    }

    // Close modal
    function closeModal() {
        if (emailModal) {
            emailModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close on overlay click
    if (emailModal) {
        emailModal.addEventListener('click', (e) => {
            if (e.target === emailModal) closeModal();
        });
    }

    // Send email via mailto
    if (sendEmailBtn && messageField) {
        sendEmailBtn.addEventListener('click', () => {
            const message = messageField.value.trim();
            if (!message) {
                alert('Please write a message before sending.');
                return;
            }
            const subject = 'Payroll Inquiry from Swantastic BPO Website';
            const body = encodeURIComponent(message);
            const mailtoLink = `mailto:${receiverEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;
            window.location.href = mailtoLink;
            setTimeout(closeModal, 300);
        });
    }

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (emailModal && emailModal.classList.contains('active')) closeModal();
            if (navLinks && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    handleScroll();

    console.log('%c🦢 Swantastic BPO | Payroll Department %cReady',
        'color: #64FFDA; font-size: 1.2rem; font-weight: bold;',
        'color: #8892B0;');
    console.log('%cAccurate. Timely. Secure. %c— Your trusted payroll partner.',
        'color: #FFFFFF;',
        'color: #64FFDA;');
});