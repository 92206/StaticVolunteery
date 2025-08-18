// Configuration file - Global settings and constants

const CONFIG = {
    // Site information
    SITE_NAME: 'Volunteery',
    SITE_DESCRIPTION: 'Connecting Hearts. Empowering Change.',
    
    // Email settings
    EMAIL: {
        CONTACT: 'hello@volunteery.tn',
        VALIDATION_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    
    // Countdown settings
    COUNTDOWN: {
        // Set target date to 3 months from now
        TARGET_MONTHS_OFFSET: 3,
        UPDATE_INTERVAL: 1000 // milliseconds
    },
    
    // Animation settings
    ANIMATIONS: {
        TRANSITION_DURATION: 300,
        HOVER_SCALE: 1.05,
        BOUNCE_DURATION: 1500
    },
    
    // Colors (matching CSS custom properties)
    COLORS: {
        PRIMARY_RED: '#ed3947',
        PRIMARY_BLUE: '#1d93eb',
        PRIMARY_GREEN: '#8ccb1c',
        TEXT_GRAY: '#3f3f3f'
    },
    
    // Social media links (placeholder)
    SOCIAL_LINKS: {
        INSTAGRAM: '#',
        FACEBOOK: '#',
        LINKEDIN: '#'
    },
    
    // Feature flags
    FEATURES: {
        EMAIL_VALIDATION: true,
        COUNTDOWN_TIMER: true,
        SMOOTH_SCROLL: true,
        ANALYTICS: false // Set to true when ready to add analytics
    },
    
    // Text content
    TEXT: {
        HERO: {
            TITLE_MAIN: 'Connecting Hearts.',
            TITLE_ACCENT: 'Empowering Change.',
            SUBTITLE_EN: 'The first Tunisian platform dedicated to connecting volunteering opportunities in Tunisia and the MENA region.',
            SUBTITLE_AR: 'Volunteery هي أول منصة تونسية مخصصة لربط فرص التطوع في تونس ومنطقة الشرق الأوسط وشمال أفريقيا'
        },
        CTA: {
            JOIN_WAITLIST: 'Join the Waitlist',
            GET_EARLY_ACCESS: 'Get Early Access',
            SUCCESS_MESSAGE: 'Thank you for joining our waitlist!'
        },
        VALIDATION: {
            INVALID_EMAIL: 'Please enter a valid email address',
            REQUIRED_FIELD: 'This field is required'
        }
    }
};

// Utility function to get configuration values
function getConfig(path) {
    return path.split('.').reduce((obj, key) => obj && obj[key], CONFIG);
}

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}