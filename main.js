
// Dynamic Welcome Message based on the time of day
function updateWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcome-message');
    const hours = new Date().getHours();

    if (hours < 12) {
        welcomeMessage.textContent = "Good Morning!";
    } else if (hours < 18) {
        welcomeMessage.textContent = "Good Afternoon!";
    } else {
        welcomeMessage.textContent = "Good Evening!";
    }
}


// Form validation with specific feedback
function setupFormValidation() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;
        
        // Reset previous error states
        [name, email, message].forEach(input => {
            input.style.borderColor = '';
            input.nextElementSibling?.remove(); 
        });
        
        // Validate name
        if (!name.value.trim()) {
            displayError(name, 'Name is required');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            displayError(email, 'Please enter a valid email');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            displayError(message, 'Message cannot be empty');
            isValid = false;
        }
        
        if (isValid) {
            alert('Message sent successfully!');
            form.reset();
        }
    });
}

// Display specific error messages
function displayError(input, message) {
    input.style.borderColor = 'red';
    const error = document.createElement('small');
    error.textContent = message;
    error.style.color = 'red';
    input.insertAdjacentElement('afterend', error);
}

// Back to top button with debounced scroll
function setupBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    const showButtonThreshold = 300;
    
    let debounceTimer;
    window.addEventListener('scroll', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            if (window.scrollY > showButtonThreshold) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }, 100); // 100ms debounce delay
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    updateWelcomeMessage();
    setupFormValidation();
    setupBackToTop();
    setupSmoothScrolling();
    
    // Update welcome message every minute
    setInterval(updateWelcomeMessage, 60000);
});
