// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
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
});

// Scroll to contact function
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    statNumbers.forEach(element => {
        if (isElementInViewport(element) && !element.hasAttribute('data-animated')) {
            const target = parseInt(element.getAttribute('data-target'));
            element.setAttribute('data-animated', 'true');
            animateNumber(element, target);
        }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Add navbar background on scroll and handle number animations
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
    
    handleScrollAnimations();
});



// Mobile Menu Functions
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
}

// Scale Toggle Functions
let isMobileScale = false;

function toggleScale() {
    const body = document.body;
    const scaleText = document.querySelector('.scale-text');
    const scaleIcon = document.querySelector('.scale-icon svg path');
    
    isMobileScale = !isMobileScale;
    
    if (isMobileScale) {
        body.classList.add('mobile-scale');
        scaleText.textContent = 'Desktop View';
        scaleIcon.setAttribute('d', 'M4 6H20V16H4V6ZM20 18H4V20H20V18ZM6 8V14H18V8H6Z');
    } else {
        body.classList.remove('mobile-scale');
        scaleText.textContent = 'Mobile View';
        scaleIcon.setAttribute('d', 'M7 2H17C18.1 2 19 2.9 19 4V20C19 21.1 18.1 22 17 22H7C5.9 22 5 21.1 5 20V4C5 2.9 5.9 2 7 2ZM7 4V20H17V4H7Z');
    }
    
    // Close mobile menu when switching scales
    closeMobileMenu();
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    handleScrollAnimations();
});

console.log('Ayden TikTok Marketing Website Loaded');