// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Dynamic content loading for latest updates
    loadLatestUpdates();
});

// Function to load latest updates
async function loadLatestUpdates() {
    const updatesGrid = document.querySelector('.updates-grid');
    
    // Example updates data - In production, this would come from an API
    const updates = [
        {
            title: 'مهرجان الربيع السنوي',
            date: '2024-03-15',
            description: 'انضموا إلينا في مهرجان الربيع السنوي مع العديد من الأنشطة والفعاليات العائلية',
            type: 'event'
        },
        {
            title: 'افتتاح المكتبة العامة الجديدة',
            date: '2024-03-10',
            description: 'نحن متحمسون للإعلان عن افتتاح المكتبة العامة الجديدة في حينا',
            type: 'news'
        },
        {
            title: 'ورشة عمل للأطفال',
            date: '2024-03-20',
            description: 'ورشة عمل فنية للأطفال من عمر 6-12 سنة',
            type: 'event'
        }
    ];

    // Create and append update cards
    updates.forEach(update => {
        const card = createUpdateCard(update);
        updatesGrid.appendChild(card);
    });
}

// Function to create update card
function createUpdateCard(update) {
    const card = document.createElement('div');
    card.className = 'update-card';
    
    const icon = update.type === 'event' ? 'calendar-alt' : 'newspaper';
    
    card.innerHTML = `
        <div class="update-card-content">
            <i class="fas fa-${icon}"></i>
            <h3>${update.title}</h3>
            <p class="date">${formatDate(update.date)}</p>
            <p>${update.description}</p>
        </div>
    `;
    
    return card;
}

// Function to format date in Arabic
function formatDate(dateStr) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };
    return new Date(dateStr).toLocaleDateString('ar-SY', options);
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
