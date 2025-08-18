// Countdown timer functionality

class CountdownTimer {
    constructor() {
        this.targetDate = this.calculateTargetDate();
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        this.interval = null;
    }

    calculateTargetDate() {
        const target = new Date();
        target.setMonth(target.getMonth() + CONFIG.COUNTDOWN.TARGET_MONTHS_OFFSET);
        return target;
    }

    updateDisplay() {
        const now = new Date().getTime();
        const distance = this.targetDate.getTime() - now;

        if (distance < 0) {
            this.handleExpiration();
            return;
        }

        const timeLeft = this.calculateTimeLeft(distance);
        this.renderTimeLeft(timeLeft);
    }

    calculateTimeLeft(distance) {
        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };
    }

    renderTimeLeft(timeLeft) {
        // Add animation when numbers change
        Object.keys(timeLeft).forEach(unit => {
            const element = this.elements[unit];
            if (element) {
                const newValue = timeLeft[unit];
                if (element.textContent !== newValue.toString()) {
                    element.classList.add('scale-in');
                    element.textContent = newValue;
                    setTimeout(() => {
                        element.classList.remove('scale-in');
                    }, 300);
                }
            }
        });
    }

    handleExpiration() {
        // Clear the interval
        if (this.interval) {
            clearInterval(this.interval);
        }

        // Set all values to 0
        Object.values(this.elements).forEach(element => {
            if (element) {
                element.textContent = '0';
            }
        });

        // Optionally trigger an event or show a message
        this.onExpiration();
    }

    onExpiration() {
        console.log('Countdown expired!');
        // You can add custom logic here, such as:
        // - Show a "Launch Day!" message
        // - Redirect to the actual platform
        // - Display a special announcement
        
        // Example: Change the "Coming Soon" text
        const comingSoonTitle = document.querySelector('.section-title');
        if (comingSoonTitle && comingSoonTitle.textContent === 'Coming Soon') {
            comingSoonTitle.textContent = 'Launch Day!';
            comingSoonTitle.classList.add('bounce');
        }
    }

    start() {
        // Initial update
        this.updateDisplay();
        
        // Set up interval for continuous updates
        this.interval = setInterval(() => {
            this.updateDisplay();
        }, CONFIG.COUNTDOWN.UPDATE_INTERVAL);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    // Method to manually set target date (useful for testing)
    setTargetDate(date) {
        this.targetDate = new Date(date);
        this.updateDisplay();
    }

    // Get remaining time as object (useful for other components)
    getRemainingTime() {
        const now = new Date().getTime();
        const distance = this.targetDate.getTime() - now;
        
        if (distance < 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
        }
        
        return { 
            ...this.calculateTimeLeft(distance), 
            expired: false 
        };
    }
}

// Initialize countdown when DOM is ready
let countdownTimer = null;

function initCountdown() {
    if (CONFIG.FEATURES.COUNTDOWN_TIMER) {
        countdownTimer = new CountdownTimer();
        countdownTimer.start();
    }
}

// Cleanup function
function destroyCountdown() {
    if (countdownTimer) {
        countdownTimer.stop();
        countdownTimer = null;
    }
}

// Export for use in other files
if (typeof window !== 'undefined') {
    window.CountdownTimer = CountdownTimer;
    window.countdownTimer = countdownTimer;
}