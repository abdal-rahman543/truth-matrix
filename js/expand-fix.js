/**
 * Fix for expand/collapse functionality for articles
 * This script ensures the Read More button works consistently
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Expand fix loaded, fixing read more button functionality...");
    
    // Wait a bit to make sure all other scripts have run
    setTimeout(() => {
        fixExpandButton();
    }, 500);
});

/**
 * Fix the expand button functionality
 */
function fixExpandButton() {
    const expandButton = document.getElementById('expand-button');
    const article = document.getElementById('current-article');
    
    if (!expandButton || !article) {
        console.log("Expand button or article not found");
        return;
    }
    
    // Remove any existing event listeners by cloning the button
    const newExpandButton = expandButton.cloneNode(true);
    expandButton.parentNode.replaceChild(newExpandButton, expandButton);
    
    console.log("Old expand button replaced with fresh clone to remove any existing event listeners");
    
    // Add the event listener to the new button
    newExpandButton.addEventListener('click', function(e) {
        console.log("Expand button clicked");
        e.preventDefault();
        
        // Toggle expanded class on article
        article.classList.toggle('expanded');
        
        // Update button text
        if (article.classList.contains('expanded')) {
            newExpandButton.innerHTML = 'Visa mindre <i class="fas fa-angle-up"></i>';
            console.log("Article expanded");
        } else {
            newExpandButton.innerHTML = 'Läs mer <i class="fas fa-angle-down"></i>';
            console.log("Article collapsed");
        }
    });
    
    // Set initial button text based on article state
    if (article.classList.contains('expanded')) {
        newExpandButton.innerHTML = 'Visa mindre <i class="fas fa-angle-up"></i>';
    } else {
        newExpandButton.innerHTML = 'Läs mer <i class="fas fa-angle-down"></i>';
    }
    
    console.log("New event listener added to expand button");
    
    // Ensure CSS classes and transitions are working properly
    ensureStylesAreApplied();
}

/**
 * Ensure the proper CSS styles are applied to make transitions work
 */
function ensureStylesAreApplied() {
    // Check if we need to add or fix styles
    let styleElement = document.getElementById('expand-fix-styles');
    
    if (!styleElement) {
        // Create new style element
        styleElement = document.createElement('style');
        styleElement.id = 'expand-fix-styles';
        
        // Add critical styles to ensure expand/collapse functionality works
        styleElement.textContent = `
            /* Critical expand/collapse functionality */
            .collapse-content {
                max-height: 0 !important;
                overflow: hidden !important;
                transition: max-height 0.8s ease !important;
            }
            
            .article.expanded .collapse-content {
                max-height: 5000px !important; /* A large value to accommodate any content height */
            }
            
            /* Make sure the button is visible and clickable */
            .expand-button {
                display: block !important;
                cursor: pointer !important;
                z-index: 10 !important;
                position: relative !important;
                opacity: 1 !important;
                margin: 20px 0 !important;
            }
            
            /* Ensure transition on button icon */
            .expand-button i {
                transition: transform 0.3s ease !important;
            }
            
            .article.expanded .expand-button i {
                transform: rotate(180deg) !important;
            }
        `;
        
        // Add the style element to the head
        document.head.appendChild(styleElement);
        console.log("Added expand-fix styles to document head");
    }
}
