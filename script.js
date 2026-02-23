// Page Transition Effect
document.addEventListener('DOMContentLoaded', function () {

    const transitionOverlay = document.getElementById('pageTransition');

    // Smooth page reveal
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.6s ease";
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);

    if (transitionOverlay) {
        transitionOverlay.style.opacity = '0';
        setTimeout(() => {
            transitionOverlay.style.display = 'none';
        }, 300);
    }

    // Highlight active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        link.classList.toggle('active', linkPage === currentPage);
    });

    // Navigation click transition
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                e.preventDefault();

                if (transitionOverlay) {
                    transitionOverlay.style.display = 'block';
                    transitionOverlay.style.opacity = '1';
                }

                setTimeout(() => {
                    window.location.href = href;
                }, 250);
            }
        });
    });

    // HERO TEXT ANIMATION
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = "0";
        hero.style.transform = "translateY(40px)";
        hero.style.transition = "all 0.8s ease";

        setTimeout(() => {
            hero.style.opacity = "1";
            hero.style.transform = "translateY(0)";
        }, 300);
    }

    // CARD HOVER GLOW EFFECT
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = "translateY(-10px) scale(1.02)";
            card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
            card.style.transition = "all 0.3s ease";
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = "translateY(0) scale(1)";
            card.style.boxShadow = "none";
        });
    });

    // NAVBAR BLUR ON SCROLL
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.backdropFilter = "blur(10px)";
            header.style.background = "rgba(0,0,0,0.6)";
            header.style.transition = "all 0.3s ease";
        } else {
            header.style.backdropFilter = "none";
            header.style.background = "transparent";
        }
    });

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // SCROLL REVEAL ANIMATION
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                entry.target.style.transition = "all 0.6s ease";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .content-block, .stat-item').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        observer.observe(el);
    });

});


// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }

        showFormMessage('Thanks for reaching out! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(text, type) {
    const messageDiv = document.getElementById('formMessage');
    if (!messageDiv) return;

    messageDiv.textContent = text;
    messageDiv.style.opacity = "0";
    messageDiv.style.transform = "translateY(20px)";
    messageDiv.style.transition = "all 0.4s ease";

    setTimeout(() => {
        messageDiv.style.opacity = "1";
        messageDiv.style.transform = "translateY(0)";
    }, 50);

    if (type === 'success') {
        messageDiv.style.background = '#1a2f2a';
        messageDiv.style.color = '#a0ffc0';
        messageDiv.style.border = '1px solid #2a8c5a';
    } else {
        messageDiv.style.background = '#2f1a1a';
        messageDiv.style.color = '#ffa0a0';
        messageDiv.style.border = '1px solid #8c2a2a';
    }

    setTimeout(() => {
        messageDiv.style.opacity = "0";
        messageDiv.style.transform = "translateY(-10px)";
    }, 5000);
}