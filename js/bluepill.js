/**
 * BluePill specific JavaScript for Truth Matrix
 * Special features and effects for the blue pill experience
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize fact-checking tooltips
    initFactCheckingTooltips();
    
    // Initialize trustworthiness indicators
    initTrustworthinessIndicators();
    
    // Initialize related content recommendations
    initRelatedContentRecommendations();
    
    // Initialize social sharing features
    initSocialSharing();
});

/**
 * Initialize fact-checking tooltips
 * Adds informational tooltips to certain phrases that might need additional context
 */
function initFactCheckingTooltips() {
    // List of phrases to add tooltips to, along with their explanations
    const factCheckPhrases = [
        {
            phrase: 'forskare har visat',
            explanation: 'Vetenskapliga studier publicerade i peer-reviewed journaler'
        },
        {
            phrase: 'enligt experter',
            explanation: 'Uttalanden från erkända auktoriteter inom sitt expertområde'
        },
        {
            phrase: 'studier visar',
            explanation: 'Forskningsresultat publicerade i vetenskapliga tidskrifter'
        },
        {
            phrase: 'många anser',
            explanation: 'Baserat på opinionsundersökningar eller större trender'
        },
        {
            phrase: 'kontroversiell',
            explanation: 'Ett ämne där det finns olika åsikter bland experter eller i samhället'
        }
    ];
    
    // Scan the article content for these phrases
    const articleText = document.querySelectorAll('.article p, .article h3');
    
    articleText.forEach(element => {
        factCheckPhrases.forEach(item => {
            // Create a regex to find the phrase (case insensitive)
            const regex = new RegExp(`(${item.phrase})`, 'gi');
            
            // Replace the phrase with a span that has a tooltip
            if (regex.test(element.innerHTML)) {
                element.innerHTML = element.innerHTML.replace(regex, 
                    `<span class="fact-check-tooltip" data-tooltip="${item.explanation}">$1<i class="fas fa-info-circle"></i></span>`
                );
            }
        });
    });
    
    // Add style for tooltips
    const style = document.createElement('style');
    style.textContent = `
        .fact-check-tooltip {
            position: relative;
            display: inline-block;
            border-bottom: 1px dotted var(--blue-pill-primary);
            cursor: help;
        }
        
        .fact-check-tooltip i {
            font-size: 0.8rem;
            margin-left: 3px;
            color: var(--blue-pill-primary);
        }
        
        .fact-check-tooltip::after {
            content: attr(data-tooltip);
            position: absolute;
            bottom: 130%;
            left: 50%;
            transform: translateX(-50%);
            background-color: white;
            color: var(--text-dark);
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 0.8rem;
            white-space: nowrap;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
            z-index: 100;
            border-left: 3px solid var(--blue-pill-primary);
        }
        
        .fact-check-tooltip:hover::after {
            opacity: 1;
            visibility: visible;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize trustworthiness indicators
 * Adds visual cues about the reliability of sources and claims
 */
function initTrustworthinessIndicators() {
    // Check if we have references to work with
    const references = document.querySelectorAll('#references-list li');
    if (references.length === 0) return;
    
    // Add trustworthiness ratings to references
    references.forEach(reference => {
        // Get the URL of the reference
        const link = reference.querySelector('a');
        if (!link) return;
        
        // For demo purposes, we'll randomly assign trustworthiness scores
        // In a real application, this would be based on actual data
        const trustworthinessScore = Math.floor(Math.random() * 5) + 1; // 1-5 scale
        
        // Create a rating indicator
        const ratingElement = document.createElement('div');
        ratingElement.classList.add('trustworthiness-rating');
        
        // Add stars based on the score
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= trustworthinessScore) {
                starsHTML += '<i class="fas fa-star"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }
        
        ratingElement.innerHTML = `
            <small class="rating-label">Pålitlighet:</small>
            <span class="rating-stars">${starsHTML}</span>
        `;
        
        // Add a tooltip with explanation
        const explanations = [
            'Låg pålitlighet: Informationen är svår att verifiera eller kommer från en icke-etablerad källa.',
            'Under genomsnittlig pålitlighet: Källan har vissa brister i metodik eller objektivitet.',
            'Genomsnittlig pålitlighet: Källan uppfyller grundläggande journalistiska standarder.',
            'God pålitlighet: Källan har god trovärdighet och är allmänt respekterad.',
            'Utmärkt pålitlighet: Källan är högt ansedd och följer strikta journalistiska principer.'
        ];
        
        ratingElement.title = explanations[trustworthinessScore - 1];
        
        // Add the rating to the reference
        reference.appendChild(ratingElement);
    });
    
    // Add style for trustworthiness indicators
    const style = document.createElement('style');
    style.textContent = `
        .trustworthiness-rating {
            margin-top: 5px;
            display: flex;
            align-items: center;
        }
        
        .rating-label {
            margin-right: 5px;
            color: var(--gray-dark);
        }
        
        .rating-stars {
            color: var(--blue-pill-primary);
            font-size: 0.9rem;
        }
        
        .rating-stars .far {
            color: var(--gray-medium);
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize related content recommendations
 * Suggests additional trusted sources and further reading
 */
function initRelatedContentRecommendations() {
    // Create a recommendations section if it doesn't exist
    let recommendationsSection = document.querySelector('.recommendations-section');
    
    if (!recommendationsSection) {
        // Check if we have a sidebar to add recommendations to
        const sidebar = document.querySelector('.sidebar');
        
        if (!sidebar) return;
        
        // Create a recommendations container
        recommendationsSection = document.createElement('div');
        recommendationsSection.classList.add('recommendations-section');
        recommendationsSection.innerHTML = `
            <h3>Fördjupande Läsning</h3>
            <div class="recommendations-list"></div>
        `;
        
        sidebar.appendChild(recommendationsSection);
    }
    
    // Get the recommendations list
    const recommendationsList = document.querySelector('.recommendations-list');
    
    // Sample recommendations (in a real app, these would be dynamically generated)
    const recommendations = [
        {
            title: 'Vetenskap & Hälsa: Senaste Rönen',
            source: 'Läkartidningen',
            url: '#',
            type: 'Artikel'
        },
        {
            title: 'Forskningsrapport: Medicinsk Utveckling 2025',
            source: 'Karolinska Institutet',
            url: '#',
            type: 'Rapport'
        },
        {
            title: 'Faktakoll: Hälsopåståenden i Media',
            source: 'Vetenskap och Folkbildning',
            url: '#',
            type: 'Faktakoll'
        },
        {
            title: 'Källkritik i Informationsåldern',
            source: 'Medieinstitutet',
            url: '#',
            type: 'Guide'
        }
    ];
    
    // Display recommendations
    recommendations.forEach(recommendation => {
        const recommendationItem = document.createElement('div');
        recommendationItem.classList.add('recommendation-item');
        
        recommendationItem.innerHTML = `
            <span class="recommendation-type">${recommendation.type}</span>
            <a href="${recommendation.url}" class="recommendation-title">${recommendation.title}</a>
            <span class="recommendation-source">Källa: ${recommendation.source}</span>
        `;
        
        recommendationsList.appendChild(recommendationItem);
    });
    
    // Add style for recommendations
    const style = document.createElement('style');
    style.textContent = `
        .recommendations-section {
            margin-top: 20px;
        }
        
        .recommendation-item {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        
        .recommendation-item:last-child {
            border-bottom: none;
        }
        
        .recommendation-type {
            display: inline-block;
            background-color: var(--blue-pill-primary);
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 0.7rem;
            margin-bottom: 5px;
        }
        
        .recommendation-title {
            display: block;
            font-weight: 500;
            margin-bottom: 3px;
            color: var(--text-dark);
            text-decoration: none;
        }
        
        .recommendation-title:hover {
            color: var(--blue-pill-primary);
        }
        
        .recommendation-source {
            font-size: 0.8rem;
            color: var(--gray-dark);
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize social sharing features
 * Adds social media sharing buttons with proper meta information
 */
function initSocialSharing() {
    // Get the social actions container
    const socialActions = document.querySelector('.social-actions');
    if (!socialActions) return;
    
    // Get article title and create a shareable URL
    const articleTitle = document.querySelector('.article-title').textContent;
    const shareUrl = window.location.href;
    
    // Create share buttons for different platforms
    const shareButton = document.querySelector('.reaction-button:nth-child(2)');
    
    if (shareButton) {
        // Replace the generic share button with platform-specific buttons
        shareButton.remove();
        
        // Create platforms array
        const platforms = [
            {
                name: 'Facebook',
                icon: 'fab fa-facebook-f',
                url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&t=${encodeURIComponent(articleTitle)}`
            },
            {
                name: 'Twitter',
                icon: 'fab fa-twitter',
                url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(shareUrl)}`
            },
            {
                name: 'LinkedIn',
                icon: 'fab fa-linkedin-in',
                url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
            },
            {
                name: 'Email',
                icon: 'fas fa-envelope',
                url: `mailto:?subject=${encodeURIComponent(articleTitle)}&body=${encodeURIComponent('Läs denna artikel: ' + shareUrl)}`
            }
        ];
        
        // Create a share dropdown
        const shareDropdown = document.createElement('div');
        shareDropdown.classList.add('share-dropdown');
        
        // Create the main share button
        const mainShareButton = document.createElement('button');
        mainShareButton.classList.add('reaction-button', 'share-button');
        mainShareButton.innerHTML = '<i class="fas fa-share-alt"></i> Dela';
        
        // Create the dropdown content
        const dropdownContent = document.createElement('div');
        dropdownContent.classList.add('share-dropdown-content');
        
        // Add platform buttons to dropdown
        platforms.forEach(platform => {
            const platformButton = document.createElement('a');
            platformButton.href = platform.url;
            platformButton.target = '_blank';
            platformButton.rel = 'noopener noreferrer';
            platformButton.classList.add('share-platform');
            platformButton.innerHTML = `<i class="${platform.icon}"></i> ${platform.name}`;
            dropdownContent.appendChild(platformButton);
        });
        
        // Add copy link button
        const copyLinkButton = document.createElement('button');
        copyLinkButton.classList.add('share-platform', 'copy-link');
        copyLinkButton.innerHTML = '<i class="fas fa-link"></i> Kopiera länk';
        copyLinkButton.addEventListener('click', () => {
            navigator.clipboard.writeText(shareUrl).then(() => {
                copyLinkButton.innerHTML = '<i class="fas fa-check"></i> Kopierat!';
                setTimeout(() => {
                    copyLinkButton.innerHTML = '<i class="fas fa-link"></i> Kopiera länk';
                }, 2000);
            });
        });
        dropdownContent.appendChild(copyLinkButton);
        
        // Build the dropdown
        shareDropdown.appendChild(mainShareButton);
        shareDropdown.appendChild(dropdownContent);
        
        // Add toggle functionality
        mainShareButton.addEventListener('click', () => {
            dropdownContent.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!shareDropdown.contains(e.target)) {
                dropdownContent.classList.remove('active');
            }
        });
        
        // Insert the share dropdown after the first reaction button
        const firstButton = socialActions.querySelector('.reaction-button');
        firstButton.insertAdjacentElement('afterend', shareDropdown);
    }
    
    // Add style for social sharing
    const style = document.createElement('style');
    style.textContent = `
        .share-dropdown {
            position: relative;
        }
        
        .share-dropdown-content {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: white;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 100;
            width: 180px;
            display: none;
            margin-top: 10px;
        }
        
        .share-dropdown-content.active {
            display: block;
        }
        
        .share-platform {
            display: block;
            padding: 10px 15px;
            text-decoration: none;
            color: var(--text-dark);
            border-bottom: 1px solid #eee;
            text-align: left;
            cursor: pointer;
            width: 100%;
            background: none;
            border: none;
            font: inherit;
        }
        
        .share-platform:last-child {
            border-bottom: none;
        }
        
        .share-platform:hover {
            background-color: #f8f8f8;
        }
        
        .share-platform i {
            width: 20px;
            margin-right: 10px;
            text-align: center;
        }
        
        .fa-facebook-f {
            color: #1877f2;
        }
        
        .fa-twitter {
            color: #1da1f2;
        }
        
        .fa-linkedin-in {
            color: #0077b5;
        }
        
        .fa-envelope {
            color: #d44638;
        }
        
        .fa-link {
            color: var(--blue-pill-primary);
        }
    `;
    document.head.appendChild(style);
}
