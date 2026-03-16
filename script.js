document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Remove loading class
    document.body.classList.remove('loading');

    // ─── Scroll Progress Bar ───────────────────────────────────────────────────
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) progressBar.style.width = pct + '%';
    }, { passive: true });

    // ─── Hide-on-Scroll Navbar ─────────────────────────────────────────────────
    const mainNav = document.querySelector('.main-nav');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const current = window.scrollY;

        if (current <= 60) {
            // Always visible at very top
            mainNav.classList.remove('nav-hidden');
        } else if (current > lastScrollY + 5) {
            // Scrolling DOWN — hide
            mainNav.classList.add('nav-hidden');
        } else if (current < lastScrollY - 5) {
            // Scrolling UP — reveal
            mainNav.classList.remove('nav-hidden');
        }

        lastScrollY = current;
    }, { passive: true });

    // ─── Intro Animations ─────────────────────────────────────────────────────
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
        // DESKTOP: Portrait image enters from LEFT
        gsap.set('.hero-image-overlay', {
            width: '100%',
            left: 0,
            right: 'auto',
            opacity: 1
        });

        const tl = gsap.timeline();

        tl.to('.hero-image-overlay', {
            width: '45%',
            opacity: 0.8,
            duration: 2.0,
            ease: 'power4.inOut',
            // Zig-zag on the RIGHT edge (the fading edge)
            clipPath: 'polygon(0% 0%, 95% 0%, 100% 10%, 95% 20%, 100% 30%, 95% 40%, 100% 50%, 95% 60%, 100% 70%, 95% 80%, 100% 90%, 95% 100%, 0% 100%)'
        })
            .from('.main-nav', { y: -100, opacity: 0, duration: 1 }, "<")
            .to('.hero-title, .hero-subtitle, .hero-cta-wrapper', { opacity: 1, duration: 0.5 }, "-=1.5")
            .from('.hero-title .line', { y: 100, opacity: 0, duration: 1, stagger: 0.2 }, "<")
            .from('.hero-subtitle', { y: 20, opacity: 0, duration: 1 }, "-=0.8")
            .from('.hero-cta-wrapper', { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
            .from('.scroll-indicator', { opacity: 0, duration: 1 }, "-=0.5")
            // Release GSAP inline styles — CSS transition now owns the nav
            .call(() => { gsap.set('.main-nav', { clearProps: 'all' }); });
    });

    mm.add("(max-width: 768px)", () => {
        // MOBILE: Image fades in at its final low opacity immediately.
        // Then text + nav appear together, fast and smooth.
        // Never expose the image at full brightness.
        gsap.set('.hero-image-overlay', { width: '100%', left: 0, right: 0, opacity: 0 });
        gsap.set('.hero-image-overlay img', { scale: 1.04 });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl
            // 1. Image fades in quietly at final muted opacity — 0.4s
            .to('.hero-image-overlay', { opacity: 0.18, duration: 0.4, ease: 'power2.out' })
            .to('.hero-image-overlay img', { scale: 1, duration: 0.5, ease: 'power2.out' }, '<')

            // 2. Text lines appear immediately after — fast stagger
            .from('.hero-title .line', { y: 40, opacity: 0, duration: 0.55, stagger: 0.1 }, '-=0.1')
            .from('.hero-subtitle',    { y: 20, opacity: 0, duration: 0.5  }, '-=0.35')
            .from('.hero-cta-wrapper', { y: 16, opacity: 0, duration: 0.45 }, '-=0.35')

            // 3. Navbar slides in last — same beat as CTA finishing
            .from('.main-nav', { y: -60, opacity: 0, duration: 0.45 }, '-=0.3')

            // Release GSAP inline styles so CSS hide-on-scroll can take over
            .call(() => { gsap.set('.main-nav', { clearProps: 'all' }); });
    });

    // ─── Scroll Animations ────────────────────────────────────────────────────

    // Section Headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: { trigger: header, start: 'top 80%', toggleActions: 'play none none reverse' },
            y: 50, opacity: 0, duration: 1, ease: 'power3.out'
        });
    });

    // About Text
    gsap.from('.about-content p', {
        scrollTrigger: { trigger: '.about-section', start: 'top 60%' },
        y: 30, opacity: 0, duration: 1, ease: 'power3.out'
    });

    // Services Cards
    gsap.from('.service-card', {
        scrollTrigger: { trigger: '.services-grid', start: 'top 75%' },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out'
    });

    // Project Cards
    gsap.utils.toArray('.project-card').forEach(item => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: 'top 85%' },
            y: 30, opacity: 0, duration: 0.8, ease: 'power3.out'
        });
    });

    // Process Steps
    gsap.from('.process-step', {
        scrollTrigger: { trigger: '.process-timeline', start: 'top 70%' },
        x: -50, opacity: 0, duration: 0.8, stagger: 0.3, ease: 'power3.out'
    });

    // CTA
    gsap.from('.cta-section h2', {
        scrollTrigger: { trigger: '.cta-section', start: 'top 70%' },
        scale: 0.9, opacity: 0, duration: 1, ease: 'power3.out'
    });

    // ─── Smooth Scroll ────────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ─── Custom Cursor ────────────────────────────────────────────────────────
    const cursor = document.querySelector('.cursor-follower');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
        });
    }

    // ─── Hero Tech Icons Float ────────────────────────────────────────────────
    gsap.to('.hero-icon', {
        y: -30, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut',
        stagger: { amount: 1.5, from: 'random' }
    });

    // ─── Skills Reveal ────────────────────────────────────────────────────────
    gsap.from('.skill-group', {
        scrollTrigger: { trigger: '.skills-section', start: 'top 75%' },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out'
    });

    // ─── Mobile Menu ──────────────────────────────────────────────────────────
    const hamburger = document.querySelector('.hamburger-menu');
    const overlay   = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ─── Contact Form ─────────────────────────────────────────────────────────
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            fetch('https://formsubmit.co/ajax/nithishattuluri2006@gmail.com', {
                method: 'POST',
                body: new FormData(contactForm)
            })
                .then(r => r.json())
                .then(() => {
                    submitBtn.innerText = 'Message Sent!';
                    submitBtn.style.backgroundColor = '#3ECF8E';
                    submitBtn.style.color = '#fff';
                    submitBtn.style.border = '1px solid #3ECF8E';
                    contactForm.reset();
                    setTimeout(() => {
                        submitBtn.innerText = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';
                        submitBtn.style.backgroundColor = '';
                        submitBtn.style.color = '';
                        submitBtn.style.border = '';
                    }, 5000);
                })
                .catch(err => {
                    console.error('Error:', err);
                    submitBtn.innerText = 'Error! Try Again.';
                    submitBtn.style.backgroundColor = '#ef4444';
                    submitBtn.style.border = '1px solid #ef4444';
                    setTimeout(() => {
                        submitBtn.innerText = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';
                        submitBtn.style.backgroundColor = '';
                        submitBtn.style.border = '';
                    }, 3000);
                });
        });
    }
});