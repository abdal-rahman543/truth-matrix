/**
 * Search functionality for Truth Matrix
 * Handles searching through articles and displaying results
 */

document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
});

/**
 * Initialize the search functionality
 */
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) return;
    
    // Add event listener for input changes
    searchInput.addEventListener('input', debounce(handleSearchInput, 300));
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
    
    // Handle keyboard navigation in search results
    searchInput.addEventListener('keydown', handleSearchKeydown);
}

/**
 * Handle search input changes
 */
function handleSearchInput(e) {
    const query = e.target.value.trim();
    const searchResults = document.getElementById('search-results');
    
    // Clear search results
    searchResults.innerHTML = '';
    
    // If query is too short, hide results and return
    if (query.length < 2) {
        searchResults.classList.remove('active');
        return;
    }
    
    // Determine which pill the user chose
    const isRedPill = window.location.pathname.includes('redpill.html');
    
    // Load articles from the appropriate data file
    const articlesPath = isRedPill ? 'data/redpill-articles.json' : 'data/bluepill-articles.json';
    
    // Fetch articles and search
    fetch(articlesPath)
        .then(response => response.json())
        .then(data => {
            const results = searchArticles(data.articles, query);
            displaySearchResults(results, query);
        })
        .catch(error => {
            console.error('Error fetching articles for search:', error);
            
            // Display error message
            searchResults.innerHTML = '<li class="search-error">Ett fel uppstod vid sökning</li>';
            searchResults.classList.add('active');
        });
}

/**
 * Search through articles for a query
 */
function searchArticles(articles, query) {
    // Convert query to lowercase for case-insensitive search
    query = query.toLowerCase();
    
    // Search in title, introduction, and content
    return articles.filter(article => {
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
}

/**
 * Display search results
 */
function displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    
    // If no results found
    if (results.length === 0) {
        searchResults.innerHTML = '<li class="no-results">Inga resultat hittades</li>';
        searchResults.classList.add('active');
        return;
    }
    
    // Create list items for each result
    results.slice(0, 5).forEach((article, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('search-result-item');
        
        // Add active class to first result
        if (index === 0) {
            listItem.classList.add('active');
        }
        
        // Highlight matching text in title
        const highlightedTitle = highlightMatch(article.title, query);
        
        // Create a preview of the matching content
        let preview = '';
        
        // Check introduction
        if (article.introduction.toLowerCase().includes(query)) {
            preview = highlightMatch(truncateText(article.introduction, query), query);
        } else {
            // Check sections
            for (const section of article.sections) {
                if (section.content.toLowerCase().includes(query)) {
                    preview = highlightMatch(truncateText(section.content, query), query);
                    break;
                }
            }
        }
        
        // Create HTML for list item
        listItem.innerHTML = `
            <div class="search-result-title">${highlightedTitle}</div>
            ${preview ? `<div class="search-result-preview">${preview}</div>` : ''}
            <div class="search-result-meta">
                <span class="search-result-date">${article.publishDate}</span>
                <span class="search-result-categories">${article.categories ? article.categories[0] : ''}</span>
            </div>
        `;
        
        // Store article ID
        listItem.dataset.articleId = article.id;
        
        // Add click event
        listItem.addEventListener('click', () => {
            // Navigate to the article
            window.location.href = `?id=${article.id}`;
        });
        
        searchResults.appendChild(listItem);
    });
    
    // Add "view all results" option if there are more than 5 results
    if (results.length > 5) {
        const viewAllItem = document.createElement('li');
        viewAllItem.classList.add('view-all-results');
        viewAllItem.innerHTML = `Visa alla ${results.length} resultat <i class="fas fa-arrow-right"></i>`;
        
        // Add click event to navigate to search results page
        viewAllItem.addEventListener('click', () => {
            // In a real app, we would navigate to a search results page
            // For now, we'll just reload the page with the search query in URL
            window.location.href = `?q=${encodeURIComponent(query)}`;
        });
        
        searchResults.appendChild(viewAllItem);
    }
    
    // Show search results
    searchResults.classList.add('active');
}

/**
 * Handle keyboard navigation in search results
 */
function handleSearchKeydown(e) {
    const searchResults = document.getElementById('search-results');
    
    // If results are not active, return
    if (!searchResults.classList.contains('active')) {
        return;
    }
    
    // Get all result items
    const resultItems = searchResults.querySelectorAll('.search-result-item');
    if (resultItems.length === 0) return;
    
    // Get the currently active item
    const activeItem = searchResults.querySelector('.search-result-item.active');
    let activeIndex = Array.from(resultItems).indexOf(activeItem);
    
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            // Move to next item
            if (activeIndex < resultItems.length - 1) {
                if (activeItem) activeItem.classList.remove('active');
                resultItems[activeIndex + 1].classList.add('active');
                resultItems[activeIndex + 1].scrollIntoView({ block: 'nearest' });
            }
            break;
            
        case 'ArrowUp':
            e.preventDefault();
            // Move to previous item
            if (activeIndex > 0) {
                if (activeItem) activeItem.classList.remove('active');
                resultItems[activeIndex - 1].classList.add('active');
                resultItems[activeIndex - 1].scrollIntoView({ block: 'nearest' });
            }
            break;
            
        case 'Enter':
            e.preventDefault();
            // Navigate to the active item
            if (activeItem) {
                activeItem.click();
            } else if (resultItems[0]) {
                resultItems[0].click();
            }
            break;
            
        case 'Escape':
            e.preventDefault();
            // Hide search results
            searchResults.classList.remove('active');
            break;
    }
}

/**
 * Highlight matching text in a string
 */
function highlightMatch(text, query) {
    // Escape special characters in the query
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Create a regex to match the query (case insensitive)
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    
    // Replace matches with highlighted spans
    return text.replace(regex, '<span class="highlight">$1</span>');
}

/**
 * Truncate text around a matching query
 */
function truncateText(text, query) {
    const maxLength = 100;
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    
    if (index === -1) return text.substring(0, maxLength) + '...';
    
    const start = Math.max(0, index - 40);
    const end = Math.min(text.length, index + query.length + 40);
    
    let result = '';
    
    if (start > 0) {
        result += '...';
    }
    
    result += text.substring(start, end);
    
    if (end < text.length) {
        result += '...';
    }
    
    return result;
}

/**
 * Debounce function to limit how often a function is called
 */
function debounce(func, delay) {
    let timeout;
    
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, delay);
    };
}
