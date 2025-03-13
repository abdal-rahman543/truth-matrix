/**
 * Enhanced Landing Page JavaScript for Truth Matrix
 * Provides improved interactions and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Enhanced landing page script initialized");
    
    // Initialize particles background
    initParticles();
    
    // Initialize enhanced countdown
    initEnhancedCountdown();
    
    // Add hover effects to pill choices
    initPillHoverEffects();
    
    // Fix the modal behaviors
    fixModalBehaviors();
});

/**
 * Initialize particles.js background
 */
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.warn("particles.js not loaded");
        
        // Fallback styling when particles.js isn't available
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            particlesContainer.style.background = "radial-gradient(ellipse at center, rgba(20, 30, 48, 0.4) 0%, rgba(10, 15, 25, 0.8) 100%)";
        }
    }
}

/**
 * Initialize enhanced countdown
 */
function initEnhancedCountdown() {
    // Set the date we're counting down to (March 17, 2025)
    const countdownDate = new Date("March 17, 2025 00:00:00").getTime();
    
    // Get countdown elements
    const daysElement = document.getElementById('countdown-days');
    const hoursElement = document.getElementById('countdown-hours');
    const minutesElement = document.getElementById('countdown-minutes');
    const secondsElement = document.getElementById('countdown-seconds');
    
    // If elements don't exist, return
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.warn("Countdown elements not found");
        return;
    }
    
    // Update the countdown every 1 second
    const countdownTimer = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Calculate the distance between now and the countdown date
        const distance = countdownDate - now;
        
        // If the countdown is over, display a message
        if (distance < 0) {
            clearInterval(countdownTimer);
            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";
            
            // Add any special effects or actions when countdown is complete
            document.body.classList.add("countdown-complete");
            
            return;
        }
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Format the numbers for display (add leading zeros)
        const formattedDays = days.toString().padStart(2, "0");
        const formattedHours = hours.toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = seconds.toString().padStart(2, "0");
        
        // Display the countdown
        daysElement.textContent = formattedDays;
        hoursElement.textContent = formattedHours;
        minutesElement.textContent = formattedMinutes;
        secondsElement.textContent = formattedSeconds;
        
        // Add pulse effect when seconds change to 00
        if (seconds === 0) {
            secondsElement.classList.add("pulse");
            
            setTimeout(() => {
                secondsElement.classList.remove("pulse");
            }, 500);
        }
    }, 1000);
}

/**
 * Initialize hover effects for pill choices
 */
function initPillHoverEffects() {
    const redPill = document.querySelector('.red-pill');
    const bluePill = document.querySelector('.blue-pill');
    
    if (redPill) {
        redPill.addEventListener('mouseenter', () => {
            document.body.classList.add('red-pill-hover');
        });
        
        redPill.addEventListener('mouseleave', () => {
            document.body.classList.remove('red-pill-hover');
        });
    }
    
    if (bluePill) {
        bluePill.addEventListener('mouseenter', () => {
            document.body.classList.add('blue-pill-hover');
        });
        
        bluePill.addEventListener('mouseleave', () => {
            document.body.classList.remove('blue-pill-hover');
        });
    }
    
    // Add ripple effect to choice buttons
    const choiceButtons = document.querySelectorAll('.choice-button');
    
    choiceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Get the href attribute from the button
            const targetUrl = this.getAttribute('href');
            
            // Prevent default behavior to show the modal first
            e.preventDefault();
            
            // Show the appropriate modal
            if (this.closest('.red-pill')) {
                const redPillModal = document.getElementById('red-pill-modal');
                if (redPillModal) {
                    redPillModal.classList.add('active');
                } else {
                    window.location.href = targetUrl;
                }
            } else if (this.closest('.blue-pill')) {
                const bluePillModal = document.getElementById('blue-pill-modal');
                if (bluePillModal) {
                    bluePillModal.classList.add('active');
                } else {
                    window.location.href = targetUrl;
                }
            }
        });
    });
}

/**
 * Fix modal behaviors
 */
function fixModalBehaviors() {
    // Get all modals
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        // Close modal when clicking outside content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Handle cancel button
        const cancelButton = modal.querySelector('.modal-button.cancel');
        if (cancelButton) {
            cancelButton.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
    
    // Add animation to modal buttons
    const modalButtons = document.querySelectorAll('.modal-button');
    
    modalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('cancel')) {
                return; // Don't apply effect to cancel buttons
            }
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}