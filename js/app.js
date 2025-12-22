// app.js - Simplified for fresher portfolio
class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupContactForm();
    this.setupAnimations();
    this.setupSmoothNavigation();
  }

  setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', 
          navLinks.classList.contains('active')
        );
      });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks?.classList.contains('active') && 
          !e.target.closest('.nav')) {
        navLinks.classList.remove('active');
        menuToggle?.setAttribute('aria-expanded', 'false');
      }
    });
  }

  setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation
      const inputs = contactForm.querySelectorAll('input, textarea, select');
      let isValid = true;
      
      inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#da3633';
        } else {
          input.style.borderColor = '';
        }
      });
      
      if (!isValid) {
        this.showMessage('Please fill in all required fields', 'error');
        return;
      }
      
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        // In a real app, you would send data to a server here
        const formSuccess = document.getElementById('form-success');
        if (formSuccess) {
          contactForm.style.display = 'none';
          formSuccess.hidden = false;
          contactForm.reset();
        }
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        this.showMessage('Message sent successfully!', 'success');
      }, 1500);
    });
  }

  showMessage(text, type) {
    // Remove existing messages
    const existing = document.querySelector('.message');
    if (existing) existing.remove();
    
    // Create message element
    const message = document.createElement('div');
    message.className = `message message-${type}`;
    message.textContent = text;
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 6px;
      color: white;
      z-index: 1000;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    if (type === 'success') {
      message.style.background = '#238636';
    } else {
      message.style.background = '#da3633';
    }
    
    document.body.appendChild(message);
    
    // Remove after 3 seconds
    setTimeout(() => {
      message.style.opacity = '0';
      message.style.transition = 'opacity 0.3s';
      setTimeout(() => message.remove(), 300);
    }, 3000);
  }

  setupAnimations() {
    // Simple scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate').forEach(el => observer.observe(el));
  }

  setupSmoothNavigation() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});