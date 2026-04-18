// Navigation active state
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Update active link on scroll
    function updateActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('search');
    const searchResults = [];
    
    // Build search index
    document.querySelectorAll('.section').forEach(section => {
        const id = section.getAttribute('id');
        const title = section.querySelector('.section-title');
        const text = section.textContent.toLowerCase();
        
        searchResults.push({
            id: id,
            title: title ? title.textContent : id,
            text: text
        });
    });
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
            // Reset all sections visible
            sections.forEach(s => s.style.display = 'block');
            return;
        }
        
        // Filter and highlight
        searchResults.forEach(result => {
            const section = document.getElementById(result.id);
            if (result.text.includes(query) || result.title.toLowerCase().includes(query)) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
    
    // Copy code functionality
    document.querySelectorAll('.code-block, .code-example').forEach(block => {
        block.addEventListener('click', function(e) {
            if (e.target.tagName === 'CODE') {
                const code = e.target.textContent;
                navigator.clipboard.writeText(code).then(() => {
                    // Show copied notification
                    const notification = document.createElement('div');
                    notification.textContent = 'Скопировано!';
                    notification.style.cssText = `
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        background: #3fb950;
                        color: white;
                        padding: 10px 20px;
                        border-radius: 8px;
                        font-size: 14px;
                        z-index: 1000;
                        animation: fadeIn 0.3s ease;
                    `;
                    document.body.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.remove();
                    }, 2000);
                });
            }
        });
    });
    
    // Mobile menu toggle
    const sidebar = document.querySelector('.sidebar');
    let touchStartX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    });
    
    document.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchEndX - touchStartX;
        
        if (diff > 100 && touchStartX < 50) {
            sidebar.classList.add('open');
        } else if (diff < -100) {
            sidebar.classList.remove('open');
        }
    });
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);