/**
 * Main JavaScript for Truth Matrix
 * Contains shared functions used across all pages
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize modal functionality
    initModals();
    
    // Initialize navigation highlighting
    highlightCurrentPage();
    
    // Add scroll effects
    initScrollEffects();
    
    // Initialize expand/collapse functionality for articles
    initExpandButtons();
    
    // Initialize newsletter form
    initNewsletterForm();
    
    // Initialize contact form if it exists
    if (document.getElementById('contact-form')) {
        initContactForm();
    }
    
    // Check for URL parameters
    handleUrlParameters();
});

/**
 * Initialize modal functionality
 */
function initModals() {
    // Get modal elements
    const redPillModal = document.getElementById('red-pill-modal');
    const bluePillModal = document.getElementById('blue-pill-modal');
    const redPillButton = document.getElementById('red-pill-button');
    const bluePillButton = document.getElementById('blue-pill-button');
    
    // If there are no modals on this page, return
    if (!redPillModal && !bluePillModal) return;
    
    // Add click event for red pill button
    if (redPillButton && redPillModal) {
        redPillButton.addEventListener('click', (e) => {
            e.preventDefault();
            redPillModal.classList.add('active');
        });
    }
    
    // Add click event for blue pill button
    if (bluePillButton && bluePillModal) {
        bluePillButton.addEventListener('click', (e) => {
            e.preventDefault();
            bluePillModal.classList.add('active');
        });
    }
    
    // Add click events for cancel buttons
    const cancelButtons = document.querySelectorAll('.modal-button.cancel');
    cancelButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
        });
    });
    
    // Close modal when clicking outside content
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

/**
 * Highlight the current page in navigation
 */
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.includes(linkPath) && linkPath !== '/') {
            link.parentElement.classList.add('active');
        } else if (currentPath === '/' && linkPath === 'index.html') {
            link.parentElement.classList.add('active');
        }
    });
}

/**
 * Initialize scroll effects
 */
function initScrollEffects() {
    // Add fade-in effect to elements when they come into view
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        fadeElements.forEach(element => {
            fadeInObserver.observe(element);
        });
    }
    
    // Add scroll-triggered animations to hero elements
    const heroElements = document.querySelectorAll('.hero, .hero-section');
    if (heroElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            heroElements.forEach(hero => {
                hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
                hero.querySelector('h2')?.style.transform = `translateY(${scrollPosition * 0.1}px)`;
            });
        });
    }
}

/**
 * Initialize expand/collapse functionality for articles
 */
function initExpandButtons() {
    const expandButtons = document.querySelectorAll('.expand-button');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const article = button.closest('.article');
            article.classList.toggle('expanded');
            
            if (article.classList.contains('expanded')) {
                button.innerHTML = 'Visa mindre <i class="fas fa-angle-up"></i>';
            } else {
                button.innerHTML = 'Läs mer <i class="fas fa-angle-down"></i>';
            }
        });
    });
}

/**
 * Initialize newsletter form
 */
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                // In a real application, you would send this to a server
                // For now, we'll just show a success message
                const formContainer = newsletterForm.parentElement;
                formContainer.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Tack för din prenumeration!</h3>
                        <p>Vi har skickat en bekräftelse till ${email}.</p>
                    </div>
                `;
            } else {
                emailInput.classList.add('error');
                
                const errorMessage = document.createElement('p');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = 'Vänligen ange en giltig e-postadress.';
                
                const existingError = newsletterForm.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                newsletterForm.appendChild(errorMessage);
            }
        });
    }
}

/**
 * Initialize contact form
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('#email');
            const subjectInput = contactForm.querySelector('#subject');
            const messageInput = contactForm.querySelector('#message');
            
            let isValid = true;
            
            // Validate name
            if (!nameInput.value.trim()) {
                markInvalid(nameInput, 'Vänligen ange ditt namn.');
                isValid = false;
            } else {
                clearInvalid(nameInput);
            }
            
            // Validate email
            if (!validateEmail(emailInput.value)) {
                markInvalid(emailInput, 'Vänligen ange en giltig e-postadress.');
                isValid = false;
            } else {
                clearInvalid(emailInput);
            }
            
            // Validate subject
            if (!subjectInput.value.trim()) {
                markInvalid(subjectInput, 'Vänligen ange ett ämne.');
                isValid = false;
            } else {
                clearInvalid(subjectInput);
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                markInvalid(messageInput, 'Vänligen ange ett meddelande.');
                isValid = false;
            } else {
                clearInvalid(messageInput);
            }
            
            if (isValid) {
                // In a real application, you would send this to a server
                // For now, we'll just show a success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Tack för ditt meddelande!</h3>
                        <p>Vi återkommer till dig så snart som möjligt.</p>
                    </div>
                `;
            }
        });
    }
}

/**
 * Mark a form field as invalid
 */
function markInvalid(inputElement, message) {
    inputElement.classList.add('error');
    
    // Check if error message already exists
    let errorElement = inputElement.parentElement.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.classList.add('error-message');
        inputElement.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

/**
 * Clear invalid state from a form field
 */
function clearInvalid(inputElement) {
    inputElement.classList.remove('error');
    
    const errorElement = inputElement.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Validate email format
 */
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Handle URL parameters
 */
function handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Handle direct opening of articles by ID
    const articleId = urlParams.get('article');
    if (articleId) {
        // In a real application, this would load the specific article
        console.log(`Should load article with ID: ${articleId}`);
    }
    
    // Handle search parameters
    const searchQuery = urlParams.get('q');
    if (searchQuery && document.getElementById('search-input')) {
        document.getElementById('search-input').value = searchQuery;
        // Trigger search function
        if (typeof searchArticles === 'function') {
            searchArticles(searchQuery);
        }
    }
}
