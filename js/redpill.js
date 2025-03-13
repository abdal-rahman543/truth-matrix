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
    }, 10000); // Every 10 seconds
    
    // Add glitch effect to article image occasionally
    setInterval(() => {
        const articleImage = document.getElementById('article-image');
        if (articleImage) {
            // Apply glitch effect
            articleImage.classList.add('image-glitch');
            
            // Remove glitch effect after a short delay
            setTimeout(() => {
                articleImage.classList.remove('image-glitch');
            }, 500);
        }
    }, 20000); // Every 20 seconds
    
    // Add style for glitch effects
    const style = document.createElement('style');
    style.textContent = `
        .text-glitch {
            animation: textGlitch 0.5s forwards;
            position: relative;
        }
        
        @keyframes textGlitch {
            0% { transform: translate(0); }
            20% { transform: translate(-1px, 1px); }
            40% { transform: translate(1px, -1px); color: #ff0000; }
            60% { transform: translate(-1px, -1px); text-shadow: 2px 2px #ff0000; }
            80% { transform: translate(1px, 1px); }
            100% { transform: translate(0); }
        }
        
        .image-glitch {
            animation: imageGlitch 0.5s forwards;
            position: relative;
        }
        
        @keyframes imageGlitch {
            0% { transform: translate(0); filter: none; }
            20% { transform: translate(-5px, 5px); filter: hue-rotate(90deg); }
            40% { transform: translate(5px, -5px); filter: saturate(200%) contrast(150%); }
            60% { transform: translate(-5px, -5px); filter: invert(50%); }
            80% { transform: translate(5px, 5px); filter: brightness(150%) sepia(50%); }
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
    canvas.style.opacity = '0.05';
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
        ctx.strokeStyle = '#c1121f';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < elements.length; i++) {
            // Connect to 1-3 random elements
            const numConnections = Math.floor(Math.random() * 3) + 1;
            
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
                ctx.fillStyle = '#c1121f';
                ctx.beginPath();
                ctx.arc(x1, y1, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x2, y2, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    
    // Redraw connections when scrolling
    window.addEventListener('scroll', drawConnections);
    
    // Initial drawing
    setTimeout(drawConnections, 1000);
    
    // Redraw connections periodically
    setInterval(drawConnections, 5000);
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
    
    // Show a random subliminal message periodically
    setInterval(() => {
        // Only show messages if the user has been on the page for a while
        if (document.visibilityState === 'visible') {
            // Get a random message
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            
            // Set message and style
            subliminalContainer.textContent = randomMessage;
            subliminalContainer.style.color = '#c1121f';
            subliminalContainer.style.fontSize = '3rem';
            subliminalContainer.style.fontWeight = 'bold';
            subliminalContainer.style.textShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
            
            // Show the message briefly
            subliminalContainer.style.opacity = '0.3';
            setTimeout(() => {
                subliminalContainer.style.opacity = '0';
            }, 50); // Only visible for 50ms
        }
    }, 30000); // Every 30 seconds
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
    trackingContainer.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
    trackingContainer.style.color = '#c1121f';
    trackingContainer.style.padding = '15px';
    trackingContainer.style.borderRadius = '5px';
    trackingContainer.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
    trackingContainer.style.maxWidth = '300px';
    trackingContainer.style.zIndex = '1000';
    trackingContainer.style.display = 'none';
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
                <i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>
                ${randomWarning}
            `;
            
            // Show the warning
            trackingContainer.style.display = 'block';
            
            // Hide the warning after a delay
            setTimeout(() => {
                trackingContainer.style.display = 'none';
            }, 5000); // Visible for 5 seconds
        }
    }, 60000); // Every 60 seconds
}
