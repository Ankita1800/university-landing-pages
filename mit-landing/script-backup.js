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

// CTA Button functionality
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        // Scroll to programs section
        const programsSection = document.querySelector('#programs');
        if (programsSection) {
            programsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Contact Button functionality
const contactButton = document.querySelector('.contact-button');
if (contactButton) {
    contactButton.addEventListener('click', () => {
        alert('Admissions information will be available soon! Visit mit.edu for current information.');
        // In production, this would open a contact form or redirect
        // window.location.href = 'https://mitadmissions.org/contact/';
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

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Program cards staggered animation
const programCards = document.querySelectorAll('.program-card');
programCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
});

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

programCards.forEach(card => cardObserver.observe(card));

// Stats counter animation
const stats = document.querySelectorAll('.stat h3');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateValue(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

function animateValue(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const value = parseInt(text.replace(/[^0-9]/g, ''));
    
    if (!isNaN(value)) {
        let current = 0;
        const increment = value / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                current = value;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }, 30);
    }
}

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

console.log('MIT landing page initialized');

// Lead Form Modal Functionality
const leadFormModal = document.getElementById('leadFormModal');
const applyNowBtn = document.getElementById('applyNowBtn');
const contactAdmissionsBtn = document.getElementById('contactAdmissionsBtn');
const requestInfoBtn = document.getElementById('requestInfoBtn');
const closeModal = document.getElementById('closeModal');
const leadForm = document.getElementById('leadForm');
const formMessage = document.getElementById('formMessage');

// Pipedream webhook URL - Replace with your actual Pipedream endpoint
const PIPEDREAM_WEBHOOK_URL = 'https://eodq2e90anw6xqz.m.pipedream.net';

// Open modal
function openModal() {
    leadFormModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModalFunc() {
    leadFormModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    leadForm.reset();
    formMessage.classList.add('hidden');
}

// Event listeners for opening modal
if (applyNowBtn) applyNowBtn.addEventListener('click', openModal);
if (contactAdmissionsBtn) contactAdmissionsBtn.addEventListener('click', openModal);
if (requestInfoBtn) requestInfoBtn.addEventListener('click', openModal);
if (closeModal) closeModal.addEventListener('click', closeModalFunc);

// Close modal on outside click
leadFormModal.addEventListener('click', (e) => {
    if (e.target === leadFormModal) {
        closeModalFunc();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !leadFormModal.classList.contains('hidden')) {
        closeModalFunc();
    }
});

// Form submission
leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = leadForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Get form data
    const formData = new FormData(leadForm);
    const data = {
        university: 'MIT',
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        program: formData.get('program'),
        message: formData.get('message'),
        timestamp: new Date().toISOString(),
        source: 'MIT Landing Page'
    };
    
    try {
        // Send to Pipedream
        const response = await fetch(PIPEDREAM_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            formMessage.textContent = '✓ Application submitted successfully! We\'ll contact you soon.';
            formMessage.className = 'p-3 rounded-lg text-sm bg-green-100 text-green-800';
            formMessage.classList.remove('hidden');
            leadForm.reset();
            
            // Close modal after 2 seconds
            setTimeout(() => {
                closeModalFunc();
            }, 2000);
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        formMessage.textContent = '✗ Error submitting form. Please try again.';
        formMessage.className = 'p-3 rounded-lg text-sm bg-red-100 text-red-800';
        formMessage.classList.remove('hidden');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});
