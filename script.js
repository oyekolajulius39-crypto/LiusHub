// Skeleton Loader
window.addEventListener('load', function() {
    const skeletonLoader = document.getElementById('skeleton-loader');
    setTimeout(() => {
        skeletonLoader.classList.add('hidden');
    }, 1500);
});

// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!event.target.closest('.nav-content')) {
            navMenu.classList.remove('active');
        }
    }
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = function() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// Logo Upload Handler (for admin use)
function setupLogoUpload() {
    const logoInput = document.getElementById('logo-upload');
    const logoImg = document.getElementById('logo-img');
    
    if (logoInput && logoImg) {
        logoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    logoImg.src = e.target.result;
                    // Save to localStorage for persistence
                    localStorage.setItem('liushub-logo', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Load saved logo
        const savedLogo = localStorage.getItem('liushub-logo');
        if (savedLogo) {
            logoImg.src = savedLogo;
        }
    }
}

// Initialize logo upload if on settings/admin page
setupLogoUpload();

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^[\d\s\+\-\(\)]+$/;
    return re.test(String(phone)) && phone.replace(/\D/g, '').length >= 10;
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(element => {
    observer.observe(element);
});

// Parallax effect for hero orbs
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.2);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Console welcome message
console.log('%cLius Hub', 'color: #7C3AED; font-size: 24px; font-weight: bold;');
console.log('%cWebsite by Lius Hub - Master Graphic Design', 'color: #6B7280; font-size: 14px;');
