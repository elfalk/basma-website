document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
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
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .testimonial-card, .platform-card, .benefit-card, .contact-card').forEach(card => {
        observer.observe(card);
    });
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileMenuBtn && mobileMenuBtn.querySelector('i')) {
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
        });
    });
    
    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !message) {
                alert('الرجاء ملء جميع الحقول');
                return;
            }
            
            // Redirect to WhatsApp with form data
            const text = `الاسم: ${name}%0Aالبريدالإلكتروني: ${email}%0Aالرسالة: ${message}`;
            const whatsappUrl = `https://wa.me/201018516175?text=${text}`;
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Subscribe form handling
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('subscribeEmail').value;
            
            if (!email) {
                alert('الرجاء إدخال بريدك الإلكتروني');
                return;
            }
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'subscribe-success';
            successMsg.textContent = 'شكراً لاشتراكك! سنخبرك عندما تنطلق مدونتنا.';
            
            subscribeForm.innerHTML = '';
            subscribeForm.appendChild(successMsg);
        });
    }
    
    // Service filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filter = btn.getAttribute('data-filter');
            
            // Filter service cards
            serviceCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Function to open WhatsApp with service name
function openWhatsApp(serviceName) {
    const phone = '201018516175';
    const text = `أرغب في خدمة ${serviceName}`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
}

// Add animation classes
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .platform-card, .benefit-card, .contact-card');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });
    
    // Add .animate class to trigger animations
    setTimeout(() => {
        animatedElements.forEach(element => {
            element.classList.add('animate');
        });
    }, 100);
});

// Add class to animated elements
document.addEventListener('scroll', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('animate');
        }
    });
});

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}