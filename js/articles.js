/**
 * Articles JavaScript for Truth Matrix
 * Handles loading, displaying, and interacting with articles
 */

// Track the current article index
let currentArticleIndex = 0;
let currentArticles = [];
let isRedPill = false;

document.addEventListener('DOMContentLoaded', () => {
    // Determine which pill the user chose
    isRedPill = window.location.pathname.includes('redpill.html');
    
    // Initialize the articles
    initArticles();
    
    // Set up navigation buttons
    document.getElementById('prev-article')?.addEventListener('click', navigateToPrevArticle);
    document.getElementById('next-article')?.addEventListener('click', navigateToNextArticle);
    
    // Set up reaction buttons
    initReactionButtons();
    
    // Set up search functionality
    initSearch();
});

/**
 * Initialize articles based on the chosen pill
 */
async function initArticles() {
    try {
        // Load articles from the appropriate data file
        const articlesPath = isRedPill ? 'data/redpill-articles.json' : 'data/bluepill-articles.json';
        const response = await fetch(articlesPath);
        
        if (!response.ok) {
            throw new Error(`Failed to load articles: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        currentArticles = data.articles;
        
        // Check for article ID in URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');
        
        if (articleId) {
            // Find the article by ID
            const articleIndex = currentArticles.findIndex(article => article.id === articleId);
            if (articleIndex !== -1) {
                currentArticleIndex = articleIndex;
            }
        }
        
        // Load the first article (or the one specified in the URL)
        loadArticle(currentArticleIndex);
        
        // Load related articles
        loadRelatedArticles(currentArticleIndex);
        
        // Load popular articles for blue pill
        if (!isRedPill) {
            loadPopularArticles();
        }
        
        // Load trending topics for blue pill
        if (!isRedPill) {
            loadTrendingTopics();
        }
    } catch (error) {
        console.error('Error initializing articles:', error);
        displayErrorMessage('Kunde inte ladda artiklar. Vänligen försök igen senare.');
    }
}

/**
 * Load an article at the specified index
 */
function loadArticle(index) {
    try {
        const article = currentArticles[index];
        
        // Update article title
        document.getElementById('current-article').classList.remove('expanded');
        document.querySelector('.article-title').textContent = article.title;
        
        // Update metadata
        document.getElementById('publish-date').textContent = article.publishDate;
        document.getElementById('author').textContent = article.author;
        document.getElementById('category').textContent = article.categories ? article.categories[0] : '';
        
        // Update tags
        const tagsContainer = document.getElementById('article-tags');
        tagsContainer.innerHTML = '';
        
        if (article.tags && article.tags.length > 0) {
            article.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.classList.add('article-tag');
                tagElement.textContent = tag;
                tagsContainer.appendChild(tagElement);
            });
        }
        
        // Update image
        const articleImage = document.getElementById('article-image');
        articleImage.src = article.image;
        articleImage.alt = article.imageAlt || article.title;
        
        // Update image caption
        document.getElementById('image-caption').textContent = article.imageCaption || '';
        
        // Update introduction
        document.getElementById('article-intro').innerHTML = article.introduction;
        
        // Update content sections
        document.getElementById('section-1-title').textContent = article.sections[0].title;
        document.getElementById('section-1-content').innerHTML = article.sections[0].content;
        
        document.getElementById('section-2-title').textContent = article.sections[1].title;
        document.getElementById('section-2-content').innerHTML = article.sections[1].content;
        
        document.getElementById('section-3-title').textContent = article.sections[2].title;
        document.getElementById('section-3-content').innerHTML = article.sections[2].content;
        
        // Update references
        const referencesList = document.getElementById('references-list');
        referencesList.innerHTML = '';
        
        if (article.references && article.references.length > 0) {
            article.references.forEach((reference, index) => {
                const referenceItem = document.createElement('li');
                
                const referenceLink = document.createElement('a');
                referenceLink.href = reference.url;
                referenceLink.target = '_blank';
                referenceLink.rel = 'noopener noreferrer';
                referenceLink.textContent = reference.title;
                
                const referenceMeta = document.createElement('div');
                referenceMeta.classList.add('ref-meta');
                referenceMeta.textContent = `${reference.author}, ${reference.publishDate}`;
                
                referenceItem.appendChild(referenceLink);
                referenceItem.appendChild(referenceMeta);
                referencesList.appendChild(referenceItem);
            });
        }
        
        // Update expand button
        const expandButton = document.getElementById('expand-button');
        expandButton.innerHTML = 'Läs mer <i class="fas fa-angle-down"></i>';
        
        // Update comments section
        loadComments(article.id);
        
        // Update URL with article ID
        window.history.replaceState(
            {articleIndex: index}, 
            article.title, 
            `?id=${article.id}`
        );
        
        // Reset reaction counts
        resetReactionCounts();
        
        // Scroll to top of article
        window.scrollTo({
            top: document.querySelector('.article-container').offsetTop - 100,
            behavior: 'smooth'
        });
    } catch (error) {
        console.error('Error loading article:', error);
        displayErrorMessage('Kunde inte ladda artikeln. Vänligen försök igen senare.');
    }
}

/**
 * Navigate to the previous article
 */
function navigateToPrevArticle() {
    if (currentArticleIndex > 0) {
        currentArticleIndex--;
        loadArticle(currentArticleIndex);
        loadRelatedArticles(currentArticleIndex);
    } else {
        // Loop back to the last article
        currentArticleIndex = currentArticles.length - 1;
        loadArticle(currentArticleIndex);
        loadRelatedArticles(currentArticleIndex);
    }
}

/**
 * Navigate to the next article
 */
function navigateToNextArticle() {
    if (currentArticleIndex < currentArticles.length - 1) {
        currentArticleIndex++;
        loadArticle(currentArticleIndex);
        loadRelatedArticles(currentArticleIndex);
    } else {
        // Loop back to the first article
        currentArticleIndex = 0;
        loadArticle(currentArticleIndex);
        loadRelatedArticles(currentArticleIndex);
    }
}

/**
 * Load related articles based on the current article
 */
function loadRelatedArticles(currentIndex) {
    const relatedArticlesContainer = document.getElementById('related-articles-container');
    
    // If the container doesn't exist, return
    if (!relatedArticlesContainer) return;
    
    // Clear the container
    relatedArticlesContainer.innerHTML = '';
    
    // Get current article's categories and tags
    const currentArticle = currentArticles[currentIndex];
    const currentCategories = currentArticle.categories || [];
    const currentTags = currentArticle.tags || [];
    
    // Find related articles based on shared categories and tags
    const relatedArticles = currentArticles
        .filter((article, index) => {
            // Skip the current article
            if (index === currentIndex) return false;
            
            // Check for shared categories
            const sharedCategories = article.categories?.filter(category => 
                currentCategories.includes(category)
            ) || [];
            
            // Check for shared tags
            const sharedTags = article.tags?.filter(tag => 
                currentTags.includes(tag)
            ) || [];
            
            // Consider an article related if it shares at least one category or tag
            return sharedCategories.length > 0 || sharedTags.length > 0;
        })
        .slice(0, 3); // Limit to 3 related articles
    
    // Display related articles
    relatedArticles.forEach(article => {
        const relatedArticleElement = document.createElement('article');
        relatedArticleElement.classList.add('related-article');
        
        relatedArticleElement.innerHTML = `
            <img src="${article.image}" alt="${article.title}" class="related-article-image">
            <div class="related-article-content">
                <h4 class="related-article-title">${article.title}</h4>
                <p class="related-article-meta">${article.publishDate} | ${article.author}</p>
            </div>
        `;
        
        // Add click event to navigate to the article
        relatedArticleElement.addEventListener('click', () => {
            const articleIndex = currentArticles.findIndex(a => a.id === article.id);
            if (articleIndex !== -1) {
                currentArticleIndex = articleIndex;
                loadArticle(currentArticleIndex);
                loadRelatedArticles(currentArticleIndex);
            }
        });
        
        relatedArticlesContainer.appendChild(relatedArticleElement);
    });
    
    // If no related articles were found, display a message
    if (relatedArticles.length === 0) {
        relatedArticlesContainer.innerHTML = '<p class="no-results">Inga relaterade artiklar hittades.</p>';
    }
}

/**
 * Load popular articles (for bluepill only)
 */
function loadPopularArticles() {
    const popularArticlesList = document.getElementById('popular-articles-list');
    
    // If the container doesn't exist, return
    if (!popularArticlesList) return;
    
    // Clear the container
    popularArticlesList.innerHTML = '';
    
    // Sort articles by some popularity metric (in this case, we'll fake it)
    const popularArticles = [...currentArticles]
        .sort(() => 0.5 - Math.random()) // Randomly sort for demo purposes
        .slice(0, 5); // Limit to 5 popular articles
    
    // Display popular articles
    popularArticles.forEach(article => {
        const listItem = document.createElement('li');
        
        listItem.innerHTML = `
            <a href="?id=${article.id}">
                <div class="article-thumbnail">
                    <img src="${article.image}" alt="${article.title}">
                </div>
                <div class="article-info">
                    <h4 class="article-title">${article.title}</h4>
                    <p class="article-date">${article.publishDate}</p>
                </div>
            </a>
        `;
        
        // Add click event to navigate to the article
        listItem.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            const articleIndex = currentArticles.findIndex(a => a.id === article.id);
            if (articleIndex !== -1) {
                currentArticleIndex = articleIndex;
                loadArticle(currentArticleIndex);
                loadRelatedArticles(currentArticleIndex);
            }
        });
        
        popularArticlesList.appendChild(listItem);
    });
}

/**
 * Load trending topics (for bluepill only)
 */
function loadTrendingTopics() {
    const trendingTopicsContainer = document.getElementById('trending-topics');
    
    // If the container doesn't exist, return
    if (!trendingTopicsContainer) return;
    
    // Clear the container
    trendingTopicsContainer.innerHTML = '';
    
    // Collect all tags from articles
    const allTags = currentArticles.flatMap(article => article.tags || []);
    
    // Count occurrences of each tag
    const tagCounts = allTags.reduce((counts, tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
        return counts;
    }, {});
    
    // Sort tags by frequency
    const trendingTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8) // Limit to 8 trending topics
        .map(entry => entry[0]);
    
    // Display trending topics
    trendingTags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.classList.add('topic-tag');
        tagElement.textContent = tag;
        
        // Add click event to search for this tag
        tagElement.addEventListener('click', () => {
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = tag;
                searchArticles(tag);
            }
        });
        
        trendingTopicsContainer.appendChild(tagElement);
    });
}

/**
 * Load comments for the current article
 */
async function loadComments(articleId) {
    try {
        const commentsContainer = document.getElementById('comments-container');
        
        // If the container doesn't exist, return
        if (!commentsContainer) return;
        
        // Clear the container
        commentsContainer.innerHTML = '';
        
        // Load comments from the appropriate data file
        const commentsPath = isRedPill ? 'data/redpill-comments.json' : 'data/bluepill-comments.json';
        const response = await fetch(commentsPath);
        
        if (!response.ok) {
            throw new Error(`Failed to load comments: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Filter comments for the current article
        const articleComments = data.comments.filter(comment => comment.articleId === articleId);
        
        // Display comments
        if (articleComments.length > 0) {
            articleComments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                
                commentElement.innerHTML = `
                    <h4 class="comment-author">${comment.author}</h4>
                    <p class="comment-text">${comment.text}</p>
                    <div class="comment-meta">
                        <span class="comment-date">${comment.date}</span>
                        <span class="comment-actions">
                            <a href="#" class="reply-link">Svara</a>
                        </span>
                    </div>
                `;
                
                commentsContainer.appendChild(commentElement);
            });
        } else {
            commentsContainer.innerHTML = '<p class="no-comments">Inga kommentarer ännu. Var först med att kommentera!</p>';
        }
        
        // Set up comment form submission
        const commentForm = document.querySelector('.comment-form');
        if (commentForm) {
            const submitButton = commentForm.querySelector('.post-comment-button');
            const commentInput = commentForm.querySelector('#comment-input');
            
            submitButton.addEventListener('click', () => {
                const commentText = commentInput.value.trim();
                
                if (commentText) {
                    // In a real application, this would be sent to a server
                    // For now, we'll just add it to the UI
                    const newComment = document.createElement('div');
                    newComment.classList.add('comment');
                    
                    newComment.innerHTML = `
                        <h4 class="comment-author">Du</h4>
                        <p class="comment-text">${commentText}</p>
                        <div class="comment-meta">
                            <span class="comment-date">Just nu</span>
                            <span class="comment-actions">
                                <a href="#" class="reply-link">Svara</a>
                            </span>
                        </div>
                    `;
                    
                    // Add the new comment to the top of the comments container
                    if (commentsContainer.querySelector('.no-comments')) {
                        commentsContainer.innerHTML = '';
                    }
                    
                    commentsContainer.prepend(newComment);
                    
                    // Clear the input
                    commentInput.value = '';
                }
            });
        }
    } catch (error) {
        console.error('Error loading comments:', error);
        const commentsContainer = document.getElementById('comments-container');
        if (commentsContainer) {
            commentsContainer.innerHTML = '<p class="error-message">Kunde inte ladda kommentarer. Vänligen försök igen senare.</p>';
        }
    }
}

/**
 * Initialize reaction buttons
 */
function initReactionButtons() {
    const reactionButtons = document.querySelectorAll('.reaction-button');
    
    reactionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Increase the counter
            const countElement = button.querySelector('span');
            if (countElement) {
                let count = parseInt(countElement.textContent);
                count++;
                countElement.textContent = count;
            }
            
            // Add active class to the button
            button.classList.add('active');
            
            // Add some visual feedback
            button.classList.add('pulse');
            setTimeout(() => {
                button.classList.remove('pulse');
            }, 500);
        });
    });
}

/**
 * Reset reaction counts
 */
function resetReactionCounts() {
    const countElements = document.querySelectorAll('.reaction-button span');
    
    countElements.forEach(element => {
        element.textContent = '0';
    });
    
    // Remove active class from buttons
    document.querySelectorAll('.reaction-button').forEach(button => {
        button.classList.remove('active');
    });
}

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchResults) {
        // Add input event listener
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            if (query.length > 2) {
                // Search for articles
                searchArticles(query, true);
            } else {
                // Hide search results if query is too short
                searchResults.classList.remove('active');
            }
        });
        
        // Add click outside to close search results
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
        
        // Add keydown event for keyboard navigation
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && searchResults.classList.contains('active')) {
                // Select the first result
                const firstResult = searchResults.querySelector('li');
                if (firstResult) {
                    firstResult.click();
                }
            } else if (e.key === 'Escape') {
                searchResults.classList.remove('active');
            }
        });
    }
}

/**
 * Search articles based on a query
 */
function searchArticles(query, displayInDropdown = false) {
    // Convert query to lowercase for case-insensitive search
    query = query.toLowerCase();
    
    // Search in title, introduction, and content
    const searchResults = currentArticles.filter(article => {
        return (
            article.title.toLowerCase().includes(query) ||
            article.introduction.toLowerCase().includes(query) ||
            article.sections.some(section => 
                section.title.toLowerCase().includes(query) || 
                section.content.toLowerCase().includes(query)
            ) ||
            (article.tags && article.tags.some(tag => tag.toLowerCase().includes(query))) ||
            (article.categories && article.categories.some(category => category.toLowerCase().includes(query)))
        );
    });
    
    if (displayInDropdown) {
        displaySearchResultsDropdown(searchResults, query);
    } else {
        // In a real application, you might display the results in a different way
        console.log('Search results:', searchResults);
    }
    
    return searchResults;
}

/**
 * Display search results in a dropdown
 */
function displaySearchResultsDropdown(results, query) {
    const searchResults = document.getElementById('search-results');
    
    // Clear previous results
    searchResults.innerHTML = '';
    
    if (results.length > 0) {
        // Create list items for each result
        results.slice(0, 5).forEach(article => {
            const listItem = document.createElement('li');
            
            // Highlight the matching text
            const highlightedTitle = article.title.replace(
                new RegExp(query, 'gi'),
                match => `<span class="highlight">${match}</span>`
            );
            
            listItem.innerHTML = highlightedTitle;
            
            // Add click event to navigate to the article
            listItem.addEventListener('click', () => {
                const articleIndex = currentArticles.findIndex(a => a.id === article.id);
                if (articleIndex !== -1) {
                    currentArticleIndex = articleIndex;
                    loadArticle(currentArticleIndex);
                    loadRelatedArticles(currentArticleIndex);
                    
                    // Hide search results
                    searchResults.classList.remove('active');
                }
            });
            
            searchResults.appendChild(listItem);
        });
        
        // Add a "show all results" option if there are more than 5 results
        if (results.length > 5) {
            const showAllItem = document.createElement('li');
            showAllItem.classList.add('show-all');
            showAllItem.textContent = `Visa alla ${results.length} resultat`;
            
            // Add click event to show all results
            showAllItem.addEventListener('click', () => {
                // In a real application, this would navigate to a search results page
                console.log('Show all results:', results);
                
                // Hide search results
                searchResults.classList.remove('active');
            });
            
            searchResults.appendChild(showAllItem);
        }
        
        // Show the search results
        searchResults.classList.add('active');
    } else {
        // Show a "no results" message
        const noResults = document.createElement('li');
        noResults.classList.add('no-results');
        noResults.textContent = 'Inga resultat hittades';
        searchResults.appendChild(noResults);
        
        // Show the search results
        searchResults.classList.add('active');
    }
}

/**
 * Display an error message in the article container
 */
function displayErrorMessage(message) {
    const articleContainer = document.querySelector('.article-container');
    
    if (articleContainer) {
        articleContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Ett fel uppstod</h3>
                <p>${message}</p>
            </div>
        `;
    }
}
