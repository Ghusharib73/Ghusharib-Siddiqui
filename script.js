window.addEventListener("load", () => {
    setTimeout(() => {
        document.body.classList.add("page-ready");
        document.getElementById("boot")?.classList.add("hidden");
    }, 700);
});

/* =================================
   CURSOR FOLLOWER & INVERSION
================================= */
const ring = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

// The ring is a fine-pointer (mouse/trackpad) effect only — matches the
// CSS media query that hides it on touch devices. Skip the whole loop
// there instead of running it forever for an element nobody sees.
const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (hasFinePointer && !prefersReducedMotion) {
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function render() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        if (ring) {
            ring.style.transform = `translate3d(${ringX - 10}px, ${ringY - 10}px, 0)`;

            const elementUnderCursor = document.elementFromPoint(mouseX, mouseY);

            if (elementUnderCursor) {
                const isDarkArea = elementUnderCursor.closest('header, nav, .navbar, .site-header, .site-footer, .portrait-card, .portrait, .profile-card, .contact-btn, .btn.primary, .nav-cta');

                if (isDarkArea) {
                    ring.classList.add('is-dark-bg');
                } else {
                    ring.classList.remove('is-dark-bg');
                }
            }
        }

        requestAnimationFrame(render);
    }
    render();
}

// Hover effect for interactive elements
document.querySelectorAll('a, button, input, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => ring?.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring?.classList.remove('hover'));
});

// The CV link now points straight at a PDF with target="_blank" in the
// HTML, so the browser handles opening it — no click handler needed.

/* =================================
   MOBILE MENU TOGGLE
================================= */
const navlinks = document.getElementById("navlinks");
const menuBtn = document.getElementById("menuBtn");
const navLinksList = document.getElementById("navLinksList");

if (navlinks && menuBtn) {
    const setMenuOpen = (open) => {
        navlinks.classList.toggle("is-open", open);
        menuBtn.classList.toggle("is-active", open);
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.setAttribute(
            "aria-label",
            open ? "Close navigation menu" : "Open navigation menu"
        );
    };

    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        setMenuOpen(!navlinks.classList.contains("is-open"));
    });

    // Close after picking a link (About/Skills/Projects/Contact/CV)
    navLinksList?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuOpen(false));
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
        if (!navlinks.contains(e.target)) {
            setMenuOpen(false);
        }
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            setMenuOpen(false);
        }
    });

    // Close if the viewport is resized back up to desktop width
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            setMenuOpen(false);
        }
    });
}

/* =================================
   NAVBAR SCROLL EFFECT
================================= */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        navbar?.classList.add("scrolled");
    } else {
        navbar?.classList.remove("scrolled");
    }
});

/* =================================
   SCROLL TO EXPLORE VISIBILITY
================================= */
const scrollExplore = document.querySelector(".scroll-explore");

if (scrollExplore) {
    const updateScrollExplore = () => {
        scrollExplore.classList.toggle("is-hidden", window.scrollY > 80);
    };

    window.addEventListener("scroll", updateScrollExplore, { passive: true });
    updateScrollExplore();
}

/* =================================
   3D PHOTO CARD
================================= */
const portraitCard = document.getElementById("portraitCard");
const portraitShell = document.querySelector(".portrait-shell");

if (portraitCard && portraitShell) {
    portraitShell.addEventListener("mousemove", (e) => {
        const rect = portraitShell.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        portraitCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    portraitShell.addEventListener("mouseleave", () => {
        portraitCard.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
}

/* =================================
   RADIAL GRADIENT CURSOR FOLLOWER
================================= */
const cursorGlow = document.getElementById("cursorGlow");

if (cursorGlow && hasFinePointer && !prefersReducedMotion) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.classList.add("is-visible");
    });

    window.addEventListener("mouseleave", () => {
        cursorGlow.classList.remove("is-visible");
    });

    const followCursor = () => {
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;

        cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(followCursor);
    };

    followCursor();
}

/* =================================
   SCROLL REVEAL OBSERVERS
================================= */
const setupReveal = (selector, threshold) => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold });

    elements.forEach((el) => observer.observe(el));
};

setupReveal(".about-reveal", 0.15);
setupReveal(".skills-reveal", 0.12);
setupReveal(".contact-reveal", 0.12);

/* =================================
   SMOOTH NAV CLICK
================================= */
document.querySelectorAll('.navlinks a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        const target = document.querySelector(id);

        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

/* =================================
   THEME TOGGLE
================================= */
(function () {
    const root = document.documentElement;
    const toggle = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        document.body?.setAttribute("data-theme", theme);

        if (icon) {
            icon.textContent = theme === "light" ? "☾" : "☼";
        }

        if (toggle) {
            toggle.setAttribute(
                "aria-label",
                theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            );
            toggle.setAttribute(
                "title",
                theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            );
        }
    }

    const savedTheme = localStorage.getItem("ghusharib-theme");
    applyTheme(savedTheme === "light" ? "light" : "dark");

    if (toggle) {
        toggle.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const current = root.getAttribute("data-theme") || "dark";
            const next = current === "dark" ? "light" : "dark";

            localStorage.setItem("ghusharib-theme", next);
            applyTheme(next);
        });
    }
})();