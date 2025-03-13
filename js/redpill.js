/**
 * RedPill specific JavaScript for Truth Matrix
 * Special features and effects for the red pill experience
 */

document.addEventListener('DOMContentLoaded', () => {
    // Add glitch effects
    initGlitchEffects();
    
    // Add conspiracy connection lines
    initConspiracyConnections();
    
    // Add subliminal messages
    initSubliminalMessages();
    
    // Add special tracking warnings
    initTrackingWarnings();
    
    // Handle image fallbacks
    initImageFallbacks();
    
    // Enhance text styling
    enhanceTextStyling();
    
    // Add matrix background effect
    initMatrixBackground();
    
    // Make sure the expand button works properly
    ensureExpandButtonFunctionality();
});

/**
 * Initialize glitch effects on text and images
 */
function initGlitchEffects() {
    // Add glitch class to random elements occasionally
    setInterval(() => {
        // Get random paragraph or heading
        const elements = document.querySelectorAll('.article p, .article h3');
        if (elements.length > 0) {
            const randomElement = elements[Math.floor(Math.random() * elements.length)];
            
            // Apply glitch effect
            randomElement.classList.add('text-glitch');
            
            // Remove glitch effect after a short delay
            setTimeout(() => {
                randomElement.classList.remove('text-glitch');
            }, 500);
        }
    }, 15000); // Every 15 seconds (reduced frequency for better readability)
    
    // Add glitch effect to article image occasionally
    setInterval(() => {
        const articleImage = document.getElementById('article-image');
        if (articleImage && articleImage.complete && articleImage.naturalWidth > 0) {
            // Apply glitch effect
            articleImage.classList.add('image-glitch');
            
            // Remove glitch effect after a short delay
            setTimeout(() => {
                articleImage.classList.remove('image-glitch');
            }, 500);
        }
    }, 30000); // Every 30 seconds (reduced frequency)
    
    // Add style for glitch effects with reduced intensity
    const style = document.createElement('style');
    style.textContent = `
        .text-glitch {
            animation: textGlitch 0.5s forwards;
            position: relative;
        }
        
        @keyframes textGlitch {
            0% { transform: translate(0); }
            20% { transform: translate(-1px, 1px); }
            40% { transform: translate(1px, -1px); color: #c1121f; }
            60% { transform: translate(-1px, -1px); text-shadow: 1px 1px #c1121f; }
            80% { transform: translate(1px, 1px); }
            100% { transform: translate(0); }
        }
        
        .image-glitch {
            animation: imageGlitch 0.5s forwards;
            position: relative;
        }
        
        @keyframes imageGlitch {
            0% { transform: translate(0); filter: none; }
            20% { transform: translate(-3px, 3px); filter: hue-rotate(45deg); }
            40% { transform: translate(3px, -3px); filter: saturate(150%) contrast(120%); }
            60% { transform: translate(-3px, -3px); filter: invert(25%); }
            80% { transform: translate(3px, 3px); filter: brightness(120%) sepia(30%); }
            100% { transform: translate(0); filter: none; }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize conspiracy connection lines
 * Draws connecting lines between related elements to simulate a conspiracy board
 */
function initConspiracyConnections() {
    // Create a canvas for connection lines
    const canvas = document.createElement('canvas');
    canvas.classList.add('conspiracy-canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.03'; // Reduced opacity for better readability
    document.body.appendChild(canvas);
    
    // Set canvas size to match window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawConnections();
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Draw connections between elements
    function drawConnections() {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Get all tags and keywords
        const tags = document.querySelectorAll('.article-tag');
        const keywords = document.querySelectorAll('.article strong, .article em');
        
        // Combine all elements
        const elements = [...tags, ...keywords];
        
        if (elements.length < 2) return;
        
        // Draw connections between random elements
        ctx.strokeStyle = 'rgba(193, 18, 31, 0.5)'; // More transparent lines
        ctx.lineWidth = 0.5; // Thinner lines
        
        for (let i = 0; i < elements.length; i++) {
            // Connect to 1-2 random elements (reduced for better performance)
            const numConnections = Math.floor(Math.random() * 2) + 1;
            
            for (let j = 0; j < numConnections; j++) {
                // Get a random element different from the current one
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * elements.length);
                } while (randomIndex === i);
                
                const element1 = elements[i];
                const element2 = elements[randomIndex];
                
                const rect1 = element1.getBoundingClientRect();
                const rect2 = element2.getBoundingClientRect();
                
                // Calculate center points
                const x1 = rect1.left + rect1.width / 2;
                const y1 = rect1.top + rect1.height / 2;
                const x2 = rect2.left + rect2.width / 2;
                const y2 = rect2.top + rect2.height / 2;
                
                // Draw line
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                
                // Draw small circle at intersection
                ctx.fillStyle = 'rgba(193, 18, 31, 0.6)';
                ctx.beginPath();
                ctx.arc(x1, y1, 1.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x2, y2, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    
    // Redraw connections when scrolling
    window.addEventListener('scroll', drawConnections);
    
    // Initial drawing
    setTimeout(drawConnections, 1000);
    
    // Redraw connections periodically
    setInterval(drawConnections, 8000); // Less frequent updates for better performance
}

/**
 * Initialize subliminal messages
 * Flashes brief messages that are barely noticeable
 */
function initSubliminalMessages() {
    // List of subliminal messages
    const messages = [
        'Sanningen finns där ute',
        'De döljer det för oss',
        'Vakna upp',
        'Allt är en illusion',
        'Följ det vita kaninen',
        'Ingenting är som det verkar',
        'Öppna dina ögon',
        'De övervakar oss',
        'Kontrollera informationen',
        'Ifrågasätt allt'
    ];
    
    // Create a container for subliminal messages
    const subliminalContainer = document.createElement('div');
    subliminalContainer.classList.add('subliminal-container');
    subliminalContainer.style.position = 'fixed';
    subliminalContainer.style.top = '0';
    subliminalContainer.style.left = '0';
    subliminalContainer.style.width = '100%';
    subliminalContainer.style.height = '100%';
    subliminalContainer.style.display = 'flex';
    subliminalContainer.style.justifyContent = 'center';
    subliminalContainer.style.alignItems = 'center';
    subliminalContainer.style.pointerEvents = 'none';
    subliminalContainer.style.zIndex = '1000';
    subliminalContainer.style.opacity = '0';
    document.body.appendChild(subliminalContainer);
    
    // Show a random subliminal message periodically (reduced frequency)
    setInterval(() => {
        // Only show messages if the user has been on the page for a while
        if (document.visibilityState === 'visible') {
            // Get a random message
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            
            // Set message and style
            subliminalContainer.textContent = randomMessage;
            subliminalContainer.style.color = 'rgba(193, 18, 31, 0.8)';
            subliminalContainer.style.fontSize = '2.5rem';
            subliminalContainer.style.fontWeight = 'bold';
            subliminalContainer.style.textShadow = '0 0 8px rgba(193, 18, 31, 0.4)';
            
            // Show the message briefly
            subliminalContainer.style.opacity = '0.2'; // Reduced opacity
            setTimeout(() => {
                subliminalContainer.style.opacity = '0';
            }, 80); // Slightly longer but still very brief
        }
    }, 45000); // Every 45 seconds (less frequent for better user experience)
}

/**
 * Initialize tracking warnings
 * Shows occasional warnings about being tracked
 */
function initTrackingWarnings() {
    // Create a container for tracking warnings
    const trackingContainer = document.createElement('div');
    trackingContainer.classList.add('tracking-container');
    trackingContainer.style.position = 'fixed';
    trackingContainer.style.bottom = '20px';
    trackingContainer.style.right = '20px';
    trackingContainer.style.backgroundColor = 'rgba(25, 25, 25, 0.85)';
    trackingContainer.style.color = '#d1d1d1';
    trackingContainer.style.padding = '12px 15px';
    trackingContainer.style.borderRadius = '5px';
    trackingContainer.style.borderLeft = '3px solid rgba(193, 18, 31, 0.8)';
    trackingContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    trackingContainer.style.maxWidth = '300px';
    trackingContainer.style.zIndex = '1000';
    trackingContainer.style.display = 'none';
    trackingContainer.style.transition = 'opacity 0.5s ease-in-out';
    trackingContainer.style.lineHeight = '1.5';
    trackingContainer.style.fontSize = '0.9rem';
    document.body.appendChild(trackingContainer);
    
    // List of tracking warnings
    const warnings = [
        'VARNING: Din IP-adress har blivit loggad.',
        'VARNING: Denna sida är under övervakning.',
        'VARNING: Din aktivitet spåras av okända aktörer.',
        'VARNING: Potentiell övervakning detekterad.',
        'VARNING: Skydda din identitet, använd VPN.'
    ];
    
    // Show a random tracking warning occasionally
    setInterval(() => {
        // Only show warnings if the user has been on the page for a while
        if (document.visibilityState === 'visible') {
            // Get a random warning
            const randomWarning = warnings[Math.floor(Math.random() * warnings.length)];
            
            // Set warning text
            trackingContainer.innerHTML = `
                <i class="fas fa-exclamation-triangle" style="margin-right: 10px; color: rgba(193, 18, 31, 0.8);"></i>
                ${randomWarning}
            `;
            
            // Show the warning with fade effect
            trackingContainer.style.display = 'block';
            trackingContainer.style.opacity = '0';
            
            setTimeout(() => {
                trackingContainer.style.opacity = '1';
            }, 100);
            
            // Hide the warning after a delay
            setTimeout(() => {
                trackingContainer.style.opacity = '0';
                setTimeout(() => {
                    trackingContainer.style.display = 'none';
                }, 500);
            }, 5000); // Visible for 5 seconds
        }
    }, 90000); // Every 90 seconds (reduced frequency)
}

/**
 * Handle image fallbacks
 * Provides alternatives when images fail to load
 */
function initImageFallbacks() {
    // Set default icons for article images if they fail to load
    const articleImage = document.getElementById('article-image');
    if (articleImage) {
        articleImage.addEventListener('error', function() {
            const container = this.parentElement;
            const imageCaption = document.getElementById('image-caption');
            const altText = this.getAttribute('alt') || 'Artikelbild';
            
            // Add no-image class to container
            container.classList.add('no-image');
            
            // Set the alt text as a data attribute on the container
            container.setAttribute('data-alt', altText);
            
            // Create a fallback icon
            const icon = document.createElement('i');
            icon.className = 'fas fa-eye-slash';
            icon.style.fontSize = '3rem';
            icon.style.color = 'rgba(193, 18, 31, 0.4)';
            icon.style.position = 'absolute';
            icon.style.top = '50%';
            icon.style.left = '50%';
            icon.style.transform = 'translate(-50%, -50%)';
            icon.style.zIndex = '1';
            
            // Add the icon to the container
            container.appendChild(icon);
            
            // Update the caption if it exists
            if (imageCaption) {
                imageCaption.innerHTML = `<i class="fas fa-info-circle"></i> ${altText}`;
            }
        });
    }
    
    // Also handle logo image
    const logoImage = document.querySelector('.logo');
    if (logoImage) {
        logoImage.addEventListener('error', function() {
            this.style.display = 'none';
            const logoLink = this.parentElement;
            
            // Add icon if not already present
            if (!logoLink.querySelector('.fa-pills')) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-pills';
                icon.style.fontSize = '1.5rem';
                icon.style.color = 'rgba(193, 18, 31, 0.9)';
                icon.style.marginRight = '10px';
                logoLink.insertBefore(icon, logoLink.firstChild);
            }
        });
    }
}

/**
 * Enhance text styling for better readability
 */
function enhanceTextStyling() {
    // Add styling to strongly emphasize important keywords
    const style = document.createElement('style');
    style.textContent = `
        .article p, .comment-content {
            color: #d5d5d5;
            line-height: 1.7;
            font-size: 1rem;
            text-shadow: none;
        }
        
        .article strong, .article em, .comment strong, .comment em {
            color: #e0e0e0;
            background-color: rgba(193, 18, 31, 0.1);
            padding: 0 3px;
            border-radius: 2px;
            font-weight: bold;
            text-shadow: none;
        }
        
        .article h3 {
            color: #e0e0e0;
            border-bottom: 1px solid rgba(193, 18, 31, 0.3);
            padding-bottom: 5px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        .article-title {
            color: #f0f0f0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .comment {
            background-color: rgba(25, 25, 25, 0.7);
            border-left: 3px solid rgba(193, 18, 31, 0.6);
        }
        
        .comment-author {
            color: #e0e0e0;
        }
        
        .comment-content {
            color: #c5c5c5;
        }
    `;
    document.head.appendChild(style);
    
    // Highlight important words in article content
    const articleContent = document.querySelectorAll('.article p');
    if (articleContent.length > 0) {
        const importantTerms = [
            'avslöjad', 'sanningen', 'hemlighet', 'döljer', 'eliten', 'regering',
            'konspiration', 'kontroll', 'övervakning', 'makt', 'bevis'
        ];
        
        articleContent.forEach(paragraph => {
            importantTerms.forEach(term => {
                // Use a regex that respects word boundaries
                const regex = new RegExp(`\\b${term}\\b`, 'gi');
                paragraph.innerHTML = paragraph.innerHTML.replace(regex, match => {
                    return `<span class="truth-highlight">${match}</span>`;
                });
            });
        });
    }
}

/**
 * Initialize matrix background effect
 */
function initMatrixBackground() {
    const matrixContainer = document.getElementById('matrix-animation');
    if (!matrixContainer) return;
    
    // Characters for the matrix rain
    const chars = '01';
    
    // Create matrix rain
    function createRain() {
        matrixContainer.innerHTML = '';
        const width = window.innerWidth;
        const columns = Math.floor(width / 20); // A character every 20px
        
        for (let i = 0; i < columns; i++) {
            const drop = document.createElement('span');
            drop.innerHTML = chars.charAt(Math.floor(Math.random() * chars.length));
            drop.style.left = (i * 20) + 'px';
            drop.style.animationDelay = Math.random() * 5 + 's';
            drop.style.opacity = Math.random() * 0.5 + 0.1;
            
            matrixContainer.appendChild(drop);
        }
    }
    
    // Add matrix rain style
    const style = document.createElement('style');
    style.textContent = `
        .matrix-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
        }
        
        .matrix-animation span {
            position: absolute;
            top: -100px;
            color: rgba(120, 0, 0, 0.5);
            font-family: monospace;
            font-size: 1.2rem;
            text-shadow: 0 0 5px rgba(120, 0, 0, 0.3);
            animation: matrix-fall 15s linear infinite;
        }
        
        @keyframes matrix-fall {
            0% {
                transform: translateY(-100px);
                opacity: 0;
            }
            10% {
                opacity: var(--opacity);
            }
            90% {
                opacity: var(--opacity);
            }
            100% {
                transform: translateY(calc(100vh + 100px));
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create initial rain
    createRain();
    
    // Recreate rain on window resize
    window.addEventListener('resize', createRain);
}

/**
 * Make sure the expand button works properly
 */
function ensureExpandButtonFunctionality() {
    const expandButton = document.getElementById('expand-button');
    const article = document.getElementById('current-article');
    
    if (!expandButton || !article) return;
    
    // Remove any existing event listeners
    expandButton.replaceWith(expandButton.cloneNode(true));
    
    // Get the new button reference
    const newExpandButton = document.getElementById('expand-button');
    
    // Add event listener
    newExpandButton.addEventListener('click', () => {
        // Toggle expanded class on article
        article.classList.toggle('expanded');
        
        // Update button text
        if (article.classList.contains('expanded')) {
            newExpandButton.innerHTML = 'Visa mindre <i class="fas fa-angle-up"></i>';
        } else {
            newExpandButton.innerHTML = 'Läs mer <i class="fas fa-angle-down"></i>';
        }
    });
    
    // Update expand button text based on current article state
    if (article.classList.contains('expanded')) {
        newExpandButton.innerHTML = 'Visa mindre <i class="fas fa-angle-up"></i>';
    } else {
        newExpandButton.innerHTML = 'Läs mer <i class="fas fa-angle-down"></i>';
    }
}
