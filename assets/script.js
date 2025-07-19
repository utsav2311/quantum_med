// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form validation and submission
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        field.classList.remove('error');

        if (!field.value.trim()) {
            field.classList.add('error');
            showFieldError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            field.classList.add('error');
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        } else if (field.type === 'tel' && !isValidPhone(field.value)) {
            field.classList.add('error');
            showFieldError(field, 'Please enter a valid phone number');
            isValid = false;
        }
    });

    return isValid;
}

function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Appointment form submission
const appointmentForm = document.getElementById('appointmentForm');
appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm(this)) {
        // Simulate form submission
        const formData = new FormData(this);
        const appointmentData = Object.fromEntries(formData);
        
        // Here you would typically send the data to your server
        console.log('Appointment Data:', appointmentData);
        
        // Show success message
        showNotification('Appointment request submitted successfully! We will contact you soon to confirm your appointment.');
        
        // Reset form
        this.reset();
        
        // Remove any error states
        this.querySelectorAll('.error').forEach(field => {
            field.classList.remove('error');
        });
        this.querySelectorAll('.error-message').forEach(msg => {
            msg.remove();
        });
    }
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm(this)) {
        // Simulate form submission
        const formData = new FormData(this);
        const contactData = Object.fromEntries(formData);
        
        // Here you would typically send the data to your server
        console.log('Contact Data:', contactData);
        
        // Show success message
        showNotification('Message sent successfully! We will get back to you within 24 hours.');
        
        // Reset form
        this.reset();
        
        // Remove any error states
        this.querySelectorAll('.error').forEach(field => {
            field.classList.remove('error');
        });
        this.querySelectorAll('.error-message').forEach(msg => {
            msg.remove();
        });
    }
});

// Set minimum date for appointment to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loading');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .service-card').forEach(el => {
    observer.observe(el);
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to initial elements
    document.querySelectorAll('.hero, .services').forEach(el => {
        el.classList.add('loading');
    });
    
    // Preload images
    const images = [
        'https://images.pexels.com/photos/6823568/pexels-photo-6823568.jpeg',
        'https://images.pexels.com/photos/6823564/pexels-photo-6823564.jpeg',
        'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
        'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg',
        'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Focus management for accessibility
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('focus', function() {
        this.classList.add('focused');
    });
    
    link.addEventListener('blur', function() {
        this.classList.remove('focused');
    });
});

// Print functionality (if needed)
function printPage() {
    window.print();
}

// Export appointment data (for admin use)
function exportAppointments() {
    // This would typically fetch data from your server
    const sampleData = [
        {
            name: 'John Doe',
            email: 'john@example.com',
            service: 'Lower Limb Prosthetics',
            date: '2025-01-15',
            time: '10:00'
        }
    ];
    
    const csv = convertToCSV(sampleData);
    downloadCSV(csv, 'appointments.csv');
}

function convertToCSV(data) {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [headers, ...rows].join('\n');
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Service worker registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}