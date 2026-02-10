document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Remove loading class
    document.body.classList.remove('loading');

    // Initial Load Animation with Responsive Logic
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
        // DESKTOP: Side Image with Zig-Zag
        gsap.set('.hero-image-overlay', {
            width: '100%',
            right: 0,
            left: 'auto',
            opacity: 1
        });

        const tl = gsap.timeline();

        // Start moving to side IMMEDIATELY (Simultaneous entrance)
        tl.to('.hero-image-overlay', {
            width: '45%', // Side width
            opacity: 0.8,
            duration: 2.0, // Slower, smoother move
            ease: 'power4.inOut',
            clipPath: 'polygon(5% 0%, 100% 0%, 100% 100%, 5% 100%, 0% 90%, 5% 80%, 0% 70%, 5% 60%, 0% 50%, 5% 40%, 0% 30%, 5% 20%, 0% 10%)' // Shallower Zig-Zag (5% max)
        })
            .from('.main-nav', { y: -100, opacity: 0, duration: 1 }, "<") // Start WITH image move
            .to('.hero-title, .hero-subtitle, .hero-cta-wrapper', { opacity: 1, duration: 0.5 }, "-=1.5") // Reveal text while moving
            .from('.hero-title .line', { y: 100, opacity: 0, duration: 1, stagger: 0.2 }, "<")
            .from('.hero-subtitle', { y: 20, opacity: 0, duration: 1 }, "-=0.8")
            .from('.hero-cta-wrapper', { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
            .from('.scroll-indicator', { opacity: 0, duration: 1 }, "-=0.5");
    });

    mm.add("(max-width: 768px)", () => {
        // MOBILE: Background Fade
        gsap.set('.hero-image-overlay', { width: '100%', left: 0, right: 0, opacity: 1 });

        const tl = gsap.timeline();
        tl.to('.hero-image-overlay img', {
            scale: 1,
            duration: 1.5,
            ease: 'power2.out'
        })
            .to('.hero-image-overlay', {
                opacity: 0.2, // Fade out to be subtle background
                duration: 1.5,
                ease: 'power2.inOut'
            }, "-=0.5")
            .from('.main-nav', { y: -100, opacity: 0, duration: 1 }, "-=1")
            .to('.hero-title, .hero-subtitle, .hero-cta-wrapper', { opacity: 1, duration: 0.5 }, "-=0.5")
            .from('.hero-title .line', { y: 50, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.5")
            .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
            .from('.hero-cta-wrapper', { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");
    });

    // Section Headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // About Text
    gsap.from('.about-content p', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 60%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Services Cards
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Projects
    gsap.utils.toArray('.project-card').forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Process Steps
    gsap.from('.process-step', {
        scrollTrigger: {
            trigger: '.process-timeline',
            start: 'top 70%',
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power3.out'
    });

    // CTA
    gsap.from('.cta-section h2', {
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 70%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Custom Cursor (Optional - Simple Follower)
    const cursor = document.querySelector('.cursor-follower');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
        });
    }

    // Hero Tech Icons Parallax/Float
    gsap.to('.hero-icon', {
        y: -30,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: {
            amount: 1.5,
            from: 'random'
        }
    });

    // Skills Reveal
    gsap.from('.skill-group', {
        scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 75%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Contact Form Handling (FormSubmit.co AJAX)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerText;

            // Loading State
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            const formData = new FormData(contactForm);

            fetch('https://formsubmit.co/ajax/nithishattuluri2006@gmail.com', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    // Success State
                    submitBtn.innerText = 'Message Sent!';
                    submitBtn.style.backgroundColor = '#3ECF8E'; // Success Green (Supabase color)
                    submitBtn.style.color = '#fff';
                    submitBtn.style.border = '1px solid #3ECF8E';
                    contactForm.reset();

                    // Reset button after 5 seconds
                    setTimeout(() => {
                        submitBtn.innerText = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';
                        submitBtn.style.backgroundColor = ''; // Revert to default
                        submitBtn.style.color = '';
                        submitBtn.style.border = '';
                    }, 5000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    submitBtn.innerText = 'Error! Try Again.';
                    submitBtn.style.backgroundColor = '#ef4444'; // Red
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

    // Custom Project Card Animation (Intersection Observer)
    // Disabled for Sticky Stack Layout
    /*
    const projectCards = document.querySelectorAll('.project-card');
    ...
    */
});