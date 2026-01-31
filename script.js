// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const envelope = document.getElementById('envelope');
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const invitationCard = document.getElementById('invitationCard');
    const tapInstruction = document.getElementById('tapInstruction');
    const heartsContainer = document.getElementById('heartsContainer');
    
    let isOpened = false;

    // Envelope click/tap handler
    envelope.addEventListener('click', function() {
        if (!isOpened) {
            openEnvelope();
            isOpened = true;
        }
    });

    // Function to open envelope with animation
    function openEnvelope() {
        // Add opened class to trigger CSS animations
        envelope.classList.add('opened');
        
        // Hide tap instruction
        if (tapInstruction) {
            tapInstruction.style.opacity = '0';
            tapInstruction.style.pointerEvents = 'none';
        }

        // Fade out hearts
        if (heartsContainer) {
            heartsContainer.style.transition = 'opacity 1s ease';
            heartsContainer.style.opacity = '0';
        }

        // Animate envelope wrapper out
        setTimeout(() => {
            envelopeWrapper.style.transition = 'all 1s ease';
            envelopeWrapper.style.opacity = '0';
            envelopeWrapper.style.transform = 'scale(0.8) translateY(-50px)';
        }, 1200);

        // Show invitation card
        setTimeout(() => {
            envelopeWrapper.style.display = 'none';
            if (heartsContainer) {
                heartsContainer.style.display = 'none';
            }
            invitationCard.classList.add('visible');
            
            // Add entrance animations for card elements
            animateCardElements();
        }, 2200);
    }

    // Animate card elements sequentially
    function animateCardElements() {
        // Card now uses background image, so we just need to show the confirmation section
        const confirmSection = document.querySelector('.confirmation-section');
        if (confirmSection) {
            confirmSection.style.animation = `fadeInUp 0.8s ease-out forwards`;
        }
    }

    // Start continuous petal falling animation
    function startPetalAnimation() {
        // Petals removed since we're using the actual image background
    }

    // Add touch feedback for mobile
    envelope.addEventListener('touchstart', function() {
        if (!isOpened) {
            envelope.style.transform = 'scale(0.98)';
        }
    });

    envelope.addEventListener('touchend', function() {
        if (!isOpened) {
            envelope.style.transform = 'scale(1)';
        }
    });

    // WhatsApp button interaction feedback
    const whatsappButton = document.querySelector('.whatsapp-button');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'rippleEffect 0.6s ease-out';
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }

    // Add ripple animation to stylesheet dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            from {
                width: 20px;
                height: 20px;
                opacity: 1;
            }
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Prevent accidental zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Add subtle parallax effect on device tilt (if supported)
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(event) {
            if (!isOpened) {
                const tiltX = event.gamma; // Left to right tilt (-90 to 90)
                const tiltY = event.beta;  // Front to back tilt (-180 to 180)
                
                // Apply subtle transform to envelope
                if (envelope && tiltX !== null && tiltY !== null) {
                    const limitedTiltX = Math.max(-15, Math.min(15, tiltX));
                    const limitedTiltY = Math.max(-15, Math.min(15, tiltY - 45));
                    
                    envelope.style.transform = `
                        rotateY(${limitedTiltX * 0.5}deg) 
                        rotateX(${limitedTiltY * -0.3}deg)
                    `;
                }
            }
        });
    }

    // Add hover effects for desktop (optional enhancement)
    if (window.matchMedia('(hover: hover)').matches) {
        envelope.addEventListener('mouseenter', function() {
            if (!isOpened) {
                this.style.transform = 'scale(1.02)';
            }
        });

        envelope.addEventListener('mouseleave', function() {
            if (!isOpened && !window.DeviceOrientationEvent) {
                this.style.transform = 'scale(1)';
            }
        });
    }

    // Optimize animation performance
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Simplified since we're using background images

    // Log when invitation is opened (for analytics if needed)
    function logInvitationOpen() {
        console.log('Wedding invitation opened at:', new Date().toISOString());
        // Add analytics tracking here if needed
    }

    // Add visibility change handler
    document.addEventListener('visibilitychange', function() {
        // Simplified since we removed petal animations
    });

    // Preload important resources
    const preloadImages = () => {
        // Add any image URLs that should be preloaded
        const images = [];
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };
    preloadImages();

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Prevent context menu on long press for mobile
    envelope.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    invitationCard.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Recalculate positions if needed
        console.log('Window resized');
    }, 250);
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment below to enable service worker
        // navigator.serviceWorker.register('/sw.js').then(function(registration) {
        //     console.log('ServiceWorker registration successful');
        // }).catch(function(err) {
        //     console.log('ServiceWorker registration failed: ', err);
        // });
    });
}
