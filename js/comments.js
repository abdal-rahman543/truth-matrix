/**
 * Comments JavaScript for Truth Matrix
 * Handles loading and posting comments
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize comment functionality
    initializeComments();
});

/**
 * Initialize comment functionality
 */
function initializeComments() {
    // Get comment container and form elements
    const commentsContainer = document.getElementById('comments-container');
    const commentForm = document.querySelector('.comment-form');
    
    // If comments section doesn't exist, return
    if (!commentsContainer || !commentForm) return;
    
    // Load comments for the current article
    loadCommentsForCurrentArticle();
    
    // Set up comment form submission
    const submitButton = commentForm.querySelector('button');
    const commentInput = commentForm.querySelector('textarea');
    
    if (submitButton && commentInput) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            postComment(commentInput.value);
        });
        
        // Allow posting with Enter key (but Shift+Enter for new line)
        commentInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                postComment(commentInput.value);
            }
        });
    }
}

/**
 * Load comments for the current article
 */
async function loadCommentsForCurrentArticle() {
    try {
        // Get the current article ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');
        
        // If no article ID, return
        if (!articleId) return;
        
        // Determine which pill the user chose
        const isRedPill = window.location.pathname.includes('redpill.html');
        
        // Get the comments container
        const commentsContainer = document.getElementById('comments-container');
        
        // Clear the container
        commentsContainer.innerHTML = '';
        
        // Show loading indicator
        commentsContainer.innerHTML = '<div class="comments-loading">Laddar kommentarer...</div>';
        
        // Load comments from the appropriate data file
        const commentsPath = isRedPill ? 'data/redpill-comments.json' : 'data/bluepill-comments.json';
        const response = await fetch(commentsPath);
        
        if (!response.ok) {
            throw new Error(`Failed to load comments: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Clear loading indicator
        commentsContainer.innerHTML = '';
        
        // Filter comments for the current article
        const articleComments = data.comments.filter(comment => comment.articleId === articleId);
        
        // If there are comments, display them
        if (articleComments.length > 0) {
            // Sort comments by date (newest first)
            articleComments.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Display comments
            articleComments.forEach(comment => {
                const commentElement = createCommentElement(comment);
                commentsContainer.appendChild(commentElement);
            });
        } else {
            // If no comments, display a message
            commentsContainer.innerHTML = '<div class="no-comments">Var först med att kommentera denna artikel!</div>';
        }
    } catch (error) {
        console.error('Error loading comments:', error);
        
        // Display error message
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = '<div class="comments-error">Ett fel uppstod vid laddning av kommentarer. Vänligen försök igen senare.</div>';
    }
}

/**
 * Create a comment element
 */
function createCommentElement(comment) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.dataset.id = comment.id;
    
    // Create a flag to highlight the author's own comments
    const isOwnComment = comment.author === 'Du';
    
    // Get time ago string
    const timeAgo = getTimeAgoString(comment.date);
    
    // Create the comment HTML
    commentElement.innerHTML = `
        <div class="comment-header">
            <div class="comment-author ${isOwnComment ? 'own-comment' : ''}">
                ${comment.author}
                ${isOwnComment ? '<span class="author-badge">Du</span>' : ''}
            </div>
            <div class="comment-date" title="${comment.date}">${timeAgo}</div>
        </div>
        <div class="comment-content">${formatCommentText(comment.text)}</div>
        <div class="comment-actions">
            <button class="comment-like" aria-label="Gilla kommentar">
                <i class="far fa-heart"></i> <span class="like-count">${comment.likes || 0}</span>
            </button>
            <button class="comment-reply" aria-label="Svara på kommentar">
                <i class="fas fa-reply"></i> Svara
            </button>
            ${isOwnComment ? `
                <button class="comment-edit" aria-label="Redigera kommentar">
                    <i class="fas fa-edit"></i> Redigera
                </button>
                <button class="comment-delete" aria-label="Ta bort kommentar">
                    <i class="fas fa-trash-alt"></i> Ta bort
                </button>
            ` : ''}
        </div>
    `;
    
    // Add event listeners for comment actions
    initCommentActions(commentElement);
    
    return commentElement;
}

/**
 * Initialize event listeners for comment actions
 */
function initCommentActions(commentElement) {
    // Like button
    const likeButton = commentElement.querySelector('.comment-like');
    if (likeButton) {
        likeButton.addEventListener('click', function() {
            const likeCount = this.querySelector('.like-count');
            let count = parseInt(likeCount.textContent);
            
            // Toggle liked state
            if (this.classList.contains('liked')) {
                count--;
                this.classList.remove('liked');
                this.querySelector('i').className = 'far fa-heart';
            } else {
                count++;
                this.classList.add('liked');
                this.querySelector('i').className = 'fas fa-heart';
            }
            
            likeCount.textContent = count;
        });
    }
    
    // Reply button
    const replyButton = commentElement.querySelector('.comment-reply');
    if (replyButton) {
        replyButton.addEventListener('click', function() {
            // Get the author name
            const author = commentElement.querySelector('.comment-author').textContent.trim();
            
            // Get the comment input
            const commentInput = document.querySelector('.comment-form textarea');
            
            // Focus and prepopulate with @username
            if (commentInput) {
                commentInput.focus();
                commentInput.value = `@${author} `;
            }
        });
    }
    
    // Edit button
    const editButton = commentElement.querySelector('.comment-edit');
    if (editButton) {
        editButton.addEventListener('click', function() {
            // Get the comment content
            const commentContent = commentElement.querySelector('.comment-content');
            const originalText = commentContent.textContent;
            
            // Replace with textarea
            commentContent.innerHTML = `
                <textarea class="edit-textarea">${originalText}</textarea>
                <div class="edit-buttons">
                    <button class="save-edit">Spara</button>
                    <button class="cancel-edit">Avbryt</button>
                </div>
            `;
            
            // Focus the textarea
            const textarea = commentContent.querySelector('textarea');
            textarea.focus();
            
            // Position cursor at end
            textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
            
            // Save button
            const saveButton = commentContent.querySelector('.save-edit');
            saveButton.addEventListener('click', function() {
                const newText = textarea.value;
                commentContent.innerHTML = formatCommentText(newText);
            });
            
            // Cancel button
            const cancelButton = commentContent.querySelector('.cancel-edit');
            cancelButton.addEventListener('click', function() {
                commentContent.innerHTML = formatCommentText(originalText);
            });
        });
    }
    
    // Delete button
    const deleteButton = commentElement.querySelector('.comment-delete');
    if (deleteButton) {
        deleteButton.addEventListener('click', function() {
            // Add confirmation dialog
            if (confirm('Är du säker på att du vill ta bort denna kommentar?')) {
                // Add fade-out animation
                commentElement.classList.add('deleting');
                
                // Remove after animation
                setTimeout(() => {
                    commentElement.remove();
                    
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
 * Post a new comment
 */
function postComment(text) {
    // Trim the comment text
    text = text.trim();
    
    // If the comment is empty, return
    if (!text) return;
    
    // Get the comments container and comment input
    const commentsContainer = document.getElementById('comments-container');
    const commentInput = document.querySelector('.comment-form textarea');
    
    // Clear the input
    commentInput.value = '';
    
    // If there's a "no comments" message, remove it
    const noComments = commentsContainer.querySelector('.no-comments');
    if (noComments) {
        noComments.remove();
    }
    
    // Create a new comment object
    const comment = {
        id: `temp-${Date.now()}`,
        articleId: new URLSearchParams(window.location.search).get('id') || 'unknown',
        author: 'Du',
        text: text,
        date: new Date().toISOString(),
        likes: 0
    };
    
    // Create and add the comment element
    const commentElement = createCommentElement(comment);
    commentsContainer.insertBefore(commentElement, commentsContainer.firstChild);
    
    // Add a fade-in animation
    commentElement.classList.add('new-comment');
    
    // Remove the animation class after it's complete
    setTimeout(() => {
        commentElement.classList.remove('new-comment');
    }, 500);
    
    // In a real application, this would send the comment to a server
    console.log('Posted comment:', comment);
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
 * Get a human-readable time ago string from a date
 */
function getTimeAgoString(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    // Less than a minute
    if (seconds < 60) {
        return 'Just nu';
    }
    
    // Less than an hour
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} ${minutes === 1 ? 'minut' : 'minuter'} sedan`;
    }
    
    // Less than a day
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} ${hours === 1 ? 'timme' : 'timmar'} sedan`;
    }
    
    // Less than a week
    const days = Math.floor(hours / 24);
    if (days < 7) {
        return `${days} ${days === 1 ? 'dag' : 'dagar'} sedan`;
    }
    
    // Less than a month
    const weeks = Math.floor(days / 7);
    if (weeks < 4) {
        return `${weeks} ${weeks === 1 ? 'vecka' : 'veckor'} sedan`;
    }
    
    // Less than a year
    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months} ${months === 1 ? 'månad' : 'månader'} sedan`;
    }
    
    // More than a year
    const years = Math.floor(days / 365);
    return `${years} ${years === 1 ? 'år' : 'år'} sedan`;
}

// Add CSS for comments
const commentStyles = document.createElement('style');
commentStyles.textContent = `
    .comment {
        margin-bottom: 15px;
        padding: 15px;
        border-radius: 8px;
        background-color: var(--gray-light);
        transition: opacity 0.3s, transform 0.3s;
    }
    
    .comment.new-comment {
        animation: commentFadeIn 0.5s ease-out;
    }
    
    .comment.deleting {
        opacity: 0;
        transform: translateX(30px);
    }
    
    @keyframes commentFadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .comment-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        align-items: center;
    }
    
    .comment-author {
        font-weight: 600;
        color: var(--text-dark);
    }
    
    .comment-author.own-comment {
        color: var(--accent-color);
    }
    
    .author-badge {
        display: inline-block;
        background-color: var(--accent-color);
        color: white;
        font-size: 0.7rem;
        padding: 2px 5px;
        border-radius: 3px;
        margin-left: 5px;
        vertical-align: middle;
    }
    
    .comment-date {
        font-size: 0.8rem;
        color: var(--gray-dark);
    }
    
    .comment-content {
        margin-bottom: 8px;
        line-height: 1.6;
    }
    
    .comment-actions {
        display: flex;
        gap: 15px;
    }
    
    .comment-actions button {
        background: none;
        border: none;
        color: var(--gray-dark);
        font-size: 0.9rem;
        padding: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: color 0.2s;
    }
    
    .comment-actions button i {
        margin-right: 5px;
    }
    
    .comment-actions button:hover {
        color: var(--accent-color);
    }
    
    .comment-like.liked {
        color: #e25555;
    }
    
    .comment-like.liked i {
        color: #e25555;
    }
    
    .mention {
        color: var(--accent-color);
        font-weight: 500;
    }
    
    .edit-textarea {
        width: 100%;
        min-height: 80px;
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid var(--gray-medium);
        border-radius: 4px;
        font-family: inherit;
        font-size: inherit;
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
    }
    
    .save-edit {
        background-color: var(--accent-color);
        color: white;
    }
    
    .cancel-edit {
        background-color: var(--gray-medium);
        color: white;
    }
    
    .comments-loading, .comments-error, .no-comments {
        padding: 15px;
        text-align: center;
        color: var(--gray-dark);
    }
    
    .comments-error {
        color: #e25555;
    }
`;

document.head.appendChild(commentStyles);
