/**
 * Comments Fix JavaScript for Truth Matrix
 * Additional improvements for comments functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize enhancements for comments
    setTimeout(() => {
        enhanceComments();
    }, 1000); // Slight delay to ensure the comments have loaded
});

/**
 * Enhance comments with improved styling and functionality
 */
function enhanceComments() {
    // Apply styles to existing comments
    styleExistingComments();
    
    // Add enhanced post comment functionality
    enhancePostComment();
    
    // Observe DOM for new comments being added
    observeNewComments();
}

/**
 * Apply styles to existing comments
 */
function styleExistingComments() {
    const comments = document.querySelectorAll('.comment');
    
    comments.forEach(comment => {
        // Apply text highlighting to key phrases
        highlightKeyPhrases(comment);
        
        // Add hover effect
        addHoverEffect(comment);
        
        // Enhance comment actions
        enhanceCommentActions(comment);
    });
}

/**
 * Highlight key phrases in comments
 */
function highlightKeyPhrases(comment) {
    const commentContent = comment.querySelector('.comment-content');
    if (!commentContent) return;
    
    const keyPhrases = [
        'sanningen', 'döljer', 'mörkläggning', 'avslöjande', 'bevis', 
        'konspiration', 'hemlighet', 'VARNING', 'CHOCKERANDE', 'AVSLÖJAT',
        'regering', 'eliten', 'mainstream', 'media', 'censur', 'kontroll',
        'olagligt', 'förtryckt', 'förbjuden', 'DÖLJANDE'
    ];
    
    keyPhrases.forEach(phrase => {
        const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
        commentContent.innerHTML = commentContent.innerHTML.replace(
            regex, 
            match => `<span class="truth-highlight">${match}</span>`
        );
    });
    
    // Enhance mentions
    commentContent.innerHTML = commentContent.innerHTML.replace(
        /@([a-zA-Z0-9_]+)/g,
        '<span class="mention">@$1</span>'
    );
}

/**
 * Add hover effect to comments
 */
function addHoverEffect(comment) {
    // Already handled in CSS but we can add additional dynamic effects here
    comment.addEventListener('mouseenter', () => {
        // Additional effects on hover could be added here
    });
    
    comment.addEventListener('mouseleave', () => {
        // Reset effects on mouse leave
    });
}

/**
 * Enhance comment actions
 */
function enhanceCommentActions(comment) {
    const likeButton = comment.querySelector('.comment-like');
    if (likeButton) {
        // Clear existing event listeners
        const newLikeButton = likeButton.cloneNode(true);
        likeButton.parentNode.replaceChild(newLikeButton, likeButton);
        
        // Add new event listener
        newLikeButton.addEventListener('click', function() {
            this.classList.toggle('liked');
            
            const likeCount = this.querySelector('.like-count');
            if (likeCount) {
                let count = parseInt(likeCount.textContent);
                if (this.classList.contains('liked')) {
                    count++;
                } else {
                    count--;
                }
                likeCount.textContent = count;
            }
            
            // Update icon
            const icon = this.querySelector('i');
            if (icon) {
                if (this.classList.contains('liked')) {
                    icon.className = 'fas fa-heart';
                } else {
                    icon.className = 'far fa-heart';
                }
            }
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
}

/**
 * Enhance post comment functionality
 */
function enhancePostComment() {
    const commentForm = document.querySelector('.comment-form');
    const commentInput = document.getElementById('comment-input');
    const postButton = document.getElementById('post-comment');
    
    if (!commentForm || !commentInput || !postButton) return;
    
    // Clear existing event listeners
    const newPostButton = postButton.cloneNode(true);
    postButton.parentNode.replaceChild(newPostButton, postButton);
    
    // Add new event listener
    newPostButton.addEventListener('click', function() {
        const text = commentInput.value.trim();
        if (!text) return;
        
        // Clear input
        commentInput.value = '';
        
        // Create a new comment
        addCustomComment(text);
    });
    
    // Add keydown event for Enter to submit
    commentInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            newPostButton.click();
        }
    });
    
    // Add placeholder animation
    commentInput.addEventListener('focus', function() {
        this.setAttribute('data-placeholder', this.placeholder);
        this.placeholder = '';
        
        // Add typing cursor effect
        const cursorSpan = document.createElement('span');
        cursorSpan.classList.add('typing-cursor');
        cursorSpan.style.position = 'absolute';
        cursorSpan.style.right = '15px';
        cursorSpan.style.bottom = '15px';
        cursorSpan.style.width = '8px';
        cursorSpan.style.height = '15px';
        cursorSpan.style.backgroundColor = 'rgba(193, 18, 31, 0.7)';
        cursorSpan.style.animation = 'blink 1s step-end infinite';
        
        commentForm.style.position = 'relative';
        commentForm.appendChild(cursorSpan);
    });
    
    commentInput.addEventListener('blur', function() {
        this.placeholder = this.getAttribute('data-placeholder');
        
        // Remove typing cursor
        const cursor = commentForm.querySelector('.typing-cursor');
        if (cursor) cursor.remove();
    });
}

/**
 * Create and add a custom comment
 */
function addCustomComment(text) {
    const commentsContainer = document.getElementById('comments-container');
    if (!commentsContainer) return;
    
    // Remove "no comments" message if present
    const noComments = commentsContainer.querySelector('.no-comments');
    if (noComments) noComments.remove();
    
    // Create a new comment element
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment', 'new-comment');
    
    // Get current date in ISO format
    const now = new Date().toISOString();
    
    // Set comment HTML content
    commentElement.innerHTML = `
        <div class="comment-header">
            <div class="comment-author own-comment">
                Du
                <span class="author-badge">Du</span>
            </div>
            <div class="comment-date" title="${now}">Just nu</div>
        </div>
        <div class="comment-content">${formatCommentText(text)}</div>
        <div class="comment-actions">
            <button class="comment-like" aria-label="Gilla kommentar">
                <i class="far fa-heart"></i> <span class="like-count">0</span>
            </button>
            <button class="comment-edit" aria-label="Redigera kommentar">
                <i class="fas fa-edit"></i> Redigera
            </button>
            <button class="comment-delete" aria-label="Ta bort kommentar">
                <i class="fas fa-trash-alt"></i> Ta bort
            </button>
        </div>
    `;
    
    // Add the comment to the container (at the top)
    commentsContainer.insertBefore(commentElement, commentsContainer.firstChild);
    
    // Apply styling and enhancements to the new comment
    highlightKeyPhrases(commentElement);
    enhanceCommentActions(commentElement);
    
    // Add edit and delete functionality
    addEditDeleteFunctionality(commentElement);
    
    // Remove the animation class after animation completes
    setTimeout(() => {
        commentElement.classList.remove('new-comment');
    }, 500);
}

/**
 * Format comment text with links and formatting
 */
function formatCommentText(text) {
    // Convert URLs to links
    text = text.replace(
        /(https?:\/\/[^\s]+)/g, 
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    
    // Convert @username mentions
    text = text.replace(
        /@([a-zA-Z0-9_]+)/g,
        '<span class="mention">@$1</span>'
    );
    
    // Convert line breaks to <br>
    text = text.replace(/\n/g, '<br>');
    
    return text;
}

/**
 * Add edit and delete functionality to a comment
 */
function addEditDeleteFunctionality(comment) {
    // Edit button
    const editButton = comment.querySelector('.comment-edit');
    if (editButton) {
        editButton.addEventListener('click', function() {
            const commentContent = comment.querySelector('.comment-content');
            const originalText = commentContent.innerHTML.replace(/<br>/g, '\n');
            const plainText = originalText.replace(/<[^>]*>/g, ''); // Remove HTML tags
            
            // Replace with textarea
            commentContent.innerHTML = `
                <textarea class="edit-textarea">${plainText}</textarea>
                <div class="edit-buttons">
                    <button class="save-edit">Spara</button>
                    <button class="cancel-edit">Avbryt</button>
                </div>
            `;
            
            // Focus the textarea
            const textarea = commentContent.querySelector('.edit-textarea');
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
            
            // Save button functionality
            const saveButton = commentContent.querySelector('.save-edit');
            saveButton.addEventListener('click', function() {
                commentContent.innerHTML = formatCommentText(textarea.value);
                highlightKeyPhrases(comment);
            });
            
            // Cancel button functionality
            const cancelButton = commentContent.querySelector('.cancel-edit');
            cancelButton.addEventListener('click', function() {
                commentContent.innerHTML = originalText;
                highlightKeyPhrases(comment);
            });
        });
    }
    
    // Delete button
    const deleteButton = comment.querySelector('.comment-delete');
    if (deleteButton) {
        deleteButton.addEventListener('click', function() {
            if (confirm('Är du säker på att du vill ta bort denna kommentar?')) {
                comment.classList.add('deleting');
                
                setTimeout(() => {
                    comment.remove();
                    
                    // If no comments left, show message
                    const commentsContainer = document.getElementById('comments-container');
                    if (commentsContainer && commentsContainer.children.length === 0) {
                        commentsContainer.innerHTML = '<div class="no-comments">Var först med att kommentera denna artikel!</div>';
                    }
                }, 300);
            }
        });
    }
}

/**
 * Observe for new comments being added to the DOM
 */
function observeNewComments() {
    // Set up MutationObserver to watch for new comments
    const commentsContainer = document.getElementById('comments-container');
    if (!commentsContainer) return;
    
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.classList.contains('comment')) {
                        // Check if it's not already processed
                        if (!node.hasAttribute('data-enhanced')) {
                            highlightKeyPhrases(node);
                            enhanceCommentActions(node);
                            node.setAttribute('data-enhanced', 'true');
                        }
                    }
                });
            }
        });
    });
    
    observer.observe(commentsContainer, { childList: true });
}

// Add the styling for the comment enhancements
const commentEnhancementStyles = document.createElement('style');
commentEnhancementStyles.textContent = `
    @keyframes blink {
        from, to { opacity: 1; }
        50% { opacity: 0; }
    }
    
    .comment-form {
        position: relative;
    }
    
    .typing-cursor {
        animation: blink 1s step-end infinite;
    }
    
    .edit-textarea {
        width: 100%;
        min-height: 100px;
        background-color: rgba(30, 30, 30, 0.8);
        border: 1px solid rgba(193, 18, 31, 0.3);
        color: #e0e0e0;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        font-family: var(--body-font);
        font-size: 0.95rem;
        line-height: 1.6;
    }
    
    .edit-buttons {
        display: flex;
        gap: 10px;
    }
    
    .edit-buttons button {
        padding: 5px 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-family: var(--body-font);
        font-size: 0.9rem;
    }
    
    .save-edit {
        background-color: rgba(193, 18, 31, 0.8);
        color: #f1f1f1;
    }
    
    .save-edit:hover {
        background-color: rgba(193, 18, 31, 0.9);
    }
    
    .cancel-edit {
        background-color: rgba(40, 40, 40, 0.8);
        color: #d5d5d5;
    }
    
    .cancel-edit:hover {
        background-color: rgba(60, 60, 60, 0.8);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(193, 18, 31, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .deleting {
        animation: fadeOut 0.3s ease-out forwards;
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateX(30px);
        }
    }
`;

document.head.appendChild(commentEnhancementStyles);
