// Email subscription functionality

class EmailSubscription {
    constructor() {
        this.elements = {
            form: document.getElementById('email-form'),
            input: document.getElementById('email-input'),
            successMessage: document.getElementById('success-message')
        };
        this.isSubmitted = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupValidation();
    }

    bindEvents() {
        // Add enter key support for email input
        if (this.elements.input) {
            this.elements.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSubmit();
                }
            });

            // Add input validation on blur
            this.elements.input.addEventListener('blur', () => {
                this.validateEmail(this.elements.input.value, false);
            });

            // Clear error styling on input
            this.elements.input.addEventListener('input', () => {
                this.clearValidationError();
            });
        }
    }

    setupValidation() {
        if (this.elements.input && CONFIG.FEATURES.EMAIL_VALIDATION) {
            this.elements.input.setAttribute('required', 'true');
        }
    }

    validateEmail(email, showError = true) {
        if (!CONFIG.FEATURES.EMAIL_VALIDATION) {
            return true;
        }

        const trimmedEmail = email.trim();
        
        // Check if email is empty
        if (!trimmedEmail) {
            if (showError) {
                this.showValidationError(CONFIG.TEXT.VALIDATION.REQUIRED_FIELD);
            }
            return false;
        }

        // Check if email format is valid
        if (!CONFIG.EMAIL.VALIDATION_REGEX.test(trimmedEmail)) {
            if (showError) {
                this.showValidationError(CONFIG.TEXT.VALIDATION.INVALID_EMAIL);
            }
            return false;
        }

        return true;
    }

    showValidationError(message) {
        if (!this.elements.input) return;

        // Add error styling
        this.elements.input.classList.add('border-red-500', 'border-2');
        this.elements.input.classList.remove('border-primary-red');

        // Show error message (create if doesn't exist)
        let errorElement = document.getElementById('email-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = 'email-error';
            errorElement.className = 'text-red-500 text-sm mt-2 font-normal';
            this.elements.input.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');

        // Add shake animation
        this.elements.input.classList.add('wobble');
        setTimeout(() => {
            this.elements.input.classList.remove('wobble');
        }, 1000);
    }

    clearValidationError() {
        if (!this.elements.input) return;

        // Remove error styling
        this.elements.input.classList.remove('border-red-500');
        this.elements.input.classList.add('border-primary-red');

        // Hide error message
        const errorElement = document.getElementById('email-error');
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
    }

    async handleSubmit() {
        if (this.isSubmitted) {
            return;
        }

        const email = this.elements.input ? this.elements.input.value : '';
        
        // Validate email
        if (!this.validateEmail(email)) {
            return;
        }

        try {
            // Show loading state
            this.setLoadingState(true);

            // Simulate API call (replace with actual endpoint)
            const success = await this.submitEmail(email.trim());

            if (success) {
                this.handleSuccessfulSubmission(email.trim());
            } else {
                this.handleSubmissionError('Failed to subscribe. Please try again.');
            }
        } catch (error) {
            console.error('Email submission error:', error);
            this.handleSubmissionError('An error occurred. Please try again later.');
        } finally {
            this.setLoadingState(false);
        }
    }

    async submitEmail(email) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Log for development (replace with actual API call)
        console.log('Email submitted:', email);
        
        // Store in localStorage for demo purposes
        const submissions = JSON.parse(localStorage.getItem('volunteery_emails') || '[]');
        submissions.push({
            email,
            timestamp: new Date().toISOString(),
            ip: 'demo' // In real implementation, this would be handled server-side
        });
        localStorage.setItem('volunteery_emails', JSON.stringify(submissions));

        // Simulate success (replace with actual API response handling)
        return true;

        /* 
        // Example of real API call:
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        return response.ok;
        */
    }

    setLoadingState(isLoading) {
        const submitButton = document.querySelector('.email-submit-button');
        if (!submitButton) return;

        if (isLoading) {
            submitButton.disabled = true;
            submitButton.classList.add('opacity-75', 'cursor-not-allowed');
            
            // Change button text to show loading
            const buttonText = submitButton.querySelector('span') || submitButton.lastChild;
            if (buttonText) {
                buttonText.textContent = 'Subscribing...';
            }
            
            // Add spinner icon
            const spinner = document.createElement('div');
            spinner.className = 'spinner w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2';
            submitButton.insertBefore(spinner, submitButton.firstChild);
        } else {
            submitButton.disabled = false;
            submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
            
            // Remove spinner
            const spinner = submitButton.querySelector('.spinner');
            if (spinner) {
                spinner.remove();
            }
        }
    }

    handleSuccessfulSubmission(email) {
        this.isSubmitted = true;

        // Hide the form with animation
        if (this.elements.form) {
            this.elements.form.classList.add('fade-out');
            setTimeout(() => {
                this.elements.form.style.display = 'none';
            }, 300);
        }

        // Show success message with animation
        if (this.elements.successMessage) {
            this.elements.successMessage.classList.remove('hidden');
            this.elements.successMessage.classList.add('scale-in');
        }

        // Optional: Track successful submission
        this.trackSubmission(email);

        // Optional: Show additional thank you actions
        setTimeout(() => {
            this.showThankYouActions();
        }, 2000);
    }

    handleSubmissionError(message) {
        this.showValidationError(message);
        
        // Optional: Track error for analytics
        console.error('Email submission failed:', message);
    }

    showThankYouActions() {
        // Could add social sharing buttons, additional CTAs, etc.
        const thankYouActions = document.createElement('div');
        thankYouActions.className = 'mt-6 text-center';
        thankYouActions.innerHTML = `
            <p class="text-gray-600 mb-4">Share with friends who might be interested:</p>
            <div class="flex justify-center space-x-4">
                <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors" onclick="shareOnSocialMedia('facebook')">
                    Share on Facebook
                </button>
                <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors" onclick="shareOnSocialMedia('whatsapp')">
                    Share on WhatsApp
                </button>
            </div>
        `;
        
        if (this.elements.successMessage && this.elements.successMessage.parentNode) {
            this.elements.successMessage.parentNode.appendChild(thankYouActions);
        }
    }

    trackSubmission(email) {
        // Analytics tracking would go here
        if (CONFIG.FEATURES.ANALYTICS) {
            // Example: gtag('event', 'email_signup', { email });
            console.log('Tracking email submission:', email);
        }
    }

    // Method to reset the form (useful for testing)
    reset() {
        this.isSubmitted = false;
        
        if (this.elements.form) {
            this.elements.form.style.display = 'block';
            this.elements.form.classList.remove('fade-out');
        }
        
        if (this.elements.input) {
            this.elements.input.value = '';
        }
        
        if (this.elements.successMessage) {
            this.elements.successMessage.classList.add('hidden');
            this.elements.successMessage.classList.remove('scale-in');
        }
        
        this.clearValidationError();
    }
}

// Global function for button onclick (to maintain compatibility)
function handleEmailSubmit() {
    if (window.emailSubscription) {
        window.emailSubscription.handleSubmit();
    }
}

// Social sharing function (referenced in showThankYouActions)
function shareOnSocialMedia(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Join me on the Volunteery waitlist - connecting hearts and empowering change in Tunisia and MENA!');
    
    let shareUrl = '';
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Initialize email subscription when DOM is ready
let emailSubscription = null;

function initEmailSubscription() {
    emailSubscription = new EmailSubscription();
    window.emailSubscription = emailSubscription;
}