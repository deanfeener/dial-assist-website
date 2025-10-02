/**
 * Dial-Assist Landing Page JavaScript
 * Smooth scrolling and mobile menu functionality
 */

(function() {
    'use strict';

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Don't prevent default for # only links
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll event listener for navbar shadow
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and steps
    document.querySelectorAll('.feature-card, .step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Features Accordion functionality - hover to expand
    document.querySelectorAll('.feature-accordion-item').forEach(item => {
        // Expand on mouse enter
        item.addEventListener('mouseenter', () => {
            item.classList.add('active');
        });

        // Collapse on mouse leave
        item.addEventListener('mouseleave', () => {
            item.classList.remove('active');
        });

        // Keep click functionality for mobile/touch devices
        const header = item.querySelector('.feature-accordion-header');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Track download button clicks
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', (e) => {
            // Log analytics event (placeholder for future implementation)
            console.log('Download button clicked');

            // For now, these are placeholder links
            // In production, these would link to App Store
            if (button.getAttribute('href') === '#download' || button.getAttribute('href') === '#') {
                e.preventDefault();
                alert('App Store link will be added when the app is published.');
            }
        });
    });

    // Learn More accordion in self-learning section - hover to expand
    const learnMoreSection = document.querySelector('.learn-more');
    if (learnMoreSection) {
        // Expand on mouse enter
        learnMoreSection.addEventListener('mouseenter', () => {
            learnMoreSection.classList.add('active');
        });

        // Collapse on mouse leave and scroll back to section
        learnMoreSection.addEventListener('mouseleave', () => {
            const wasActive = learnMoreSection.classList.contains('active');
            learnMoreSection.classList.remove('active');

            // If section was expanded and user scrolled past it, scroll back
            if (wasActive) {
                setTimeout(() => {
                    const rect = learnMoreSection.getBoundingClientRect();
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;

                    // Only scroll if section is above viewport (user scrolled past)
                    if (rect.top < navbarHeight) {
                        const targetPosition = learnMoreSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 300); // Wait for collapse animation
            }
        });

        // Keep click functionality for mobile/touch devices
        const header = learnMoreSection.querySelector('.learn-more-header');
        if (header) {
            header.addEventListener('click', () => {
                const wasActive = learnMoreSection.classList.contains('active');
                learnMoreSection.classList.toggle('active');

                // Scroll back when clicking to collapse
                if (wasActive) {
                    setTimeout(() => {
                        const rect = learnMoreSection.getBoundingClientRect();
                        const navbarHeight = document.querySelector('.navbar').offsetHeight;

                        if (rect.top < navbarHeight) {
                            const targetPosition = learnMoreSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 300);
                }
            });
        }
    }

    // Journey Path Accordions - hover to expand
    let pathHoverEnabled = true;

    document.querySelectorAll('.journey-path').forEach(path => {
        // Expand on mouse enter
        path.addEventListener('mouseenter', () => {
            if (pathHoverEnabled) {
                path.classList.add('active');
            }
        });

        // Collapse on mouse leave and scroll back to section
        path.addEventListener('mouseleave', () => {
            const wasActive = path.classList.contains('active');
            path.classList.remove('active');

            // If section was expanded and user scrolled past it, scroll back
            if (wasActive) {
                // Disable hover temporarily to prevent immediate re-expansion
                pathHoverEnabled = false;

                setTimeout(() => {
                    const rect = path.getBoundingClientRect();
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;

                    // Only scroll if section is above viewport
                    if (rect.top < navbarHeight) {
                        const targetPosition = path.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }

                    // Re-enable hover after scroll completes
                    setTimeout(() => {
                        pathHoverEnabled = true;
                    }, 800);
                }, 300);
            }
        });

        // Keep click functionality for mobile/touch devices
        const header = path.querySelector('.path-header');
        header.addEventListener('click', () => {
            const wasActive = path.classList.contains('active');
            path.classList.toggle('active');

            // Scroll back when clicking to collapse
            if (wasActive) {
                setTimeout(() => {
                    const rect = path.getBoundingClientRect();
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;

                    if (rect.top < navbarHeight) {
                        const targetPosition = path.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 300);
            }
        });
    });

    // Counter animation for stats
    const animateCounter = (element, target, duration = 2000) => {
        const isDecimal = target.toString().includes('.');
        const start = 0;
        const increment = target / (duration / 16); // 60 FPS
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                if (isDecimal) {
                    element.textContent = current.toFixed(2);
                } else {
                    element.textContent = Math.floor(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (isDecimal) {
                    element.textContent = target.toFixed(2);
                } else {
                    element.textContent = target;
                }
            }
        };

        updateCounter();
    };

    // Intersection Observer for stat counters
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) {
                    const target = parseFloat(statNumber.getAttribute('data-target'));
                    animateCounter(statNumber, target);
                    entry.target.classList.add('counted');
                }
            }
        });
    }, { threshold: 0.5 });

    // Observe all stat boxes (in living grid)
    document.querySelectorAll('.grid-card.stat-type').forEach(card => {
        statObserver.observe(card);
    });

    // Living Grid - Modal Overlay on Click
    const livingGrid = document.querySelector('.living-grid');

    // Create modal overlay and panel once
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'card-modal-overlay';
    document.body.appendChild(modalOverlay);

    const modal = document.createElement('div');
    modal.className = 'card-modal';
    modal.innerHTML = `
        <div class="card-modal-header"></div>
        <div class="card-modal-content"></div>
    `;
    document.body.appendChild(modal);

    const modalHeader = modal.querySelector('.card-modal-header');
    const modalContent = modal.querySelector('.card-modal-content');

    // Function to open modal with card content
    const openModal = (card) => {
        // Clone header content
        const headerClone = card.querySelector('.card-header').cloneNode(true);
        modalHeader.innerHTML = '';
        modalHeader.appendChild(headerClone);

        // Clone expand indicator and make it clickable
        const indicatorClone = card.querySelector('.card-expand-indicator').cloneNode(true);
        indicatorClone.addEventListener('click', closeModal);
        modalHeader.appendChild(indicatorClone);

        // Clone expanded content
        const expandedClone = card.querySelector('.card-expanded').cloneNode(true);
        expandedClone.style.display = 'block';
        modalContent.innerHTML = '';
        modalContent.appendChild(expandedClone);

        // Show modal
        modalOverlay.classList.add('active');
        modal.classList.add('active');

        // Mark grid and card as active
        livingGrid.classList.add('has-active');
        card.classList.add('active');
    };

    // Function to close modal
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        modal.classList.remove('active');
        livingGrid.classList.remove('has-active');
        document.querySelectorAll('.grid-card').forEach(c => c.classList.remove('active'));
    };

    // Side-by-Side Hover Reveal
    const detailPanel = document.querySelector('.detail-panel-content');

    if (detailPanel) {
        document.querySelectorAll('.grid-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Get card content
                const cardHeader = card.querySelector('.card-header').cloneNode(true);
                const cardExpanded = card.querySelector('.card-expanded').cloneNode(true);

                // Clear and populate panel
                detailPanel.innerHTML = '';
                detailPanel.appendChild(cardHeader);
                cardExpanded.style.display = 'block';
                cardExpanded.style.textAlign = 'left';
                cardExpanded.style.marginTop = 'var(--spacing-md)';
                detailPanel.appendChild(cardExpanded);

                // Highlight active card
                card.style.borderColor = 'var(--primary-purple)';
            });

            card.addEventListener('mouseleave', () => {
                // Reset card border
                card.style.borderColor = 'transparent';
            });
        });

        // Reset panel when not hovering
        const wrapper = document.querySelector('.learning-grid-wrapper');
        if (wrapper) {
            wrapper.addEventListener('mouseleave', () => {
                detailPanel.innerHTML = '<p class="detail-prompt">Hover over any card to learn more</p>';
            });
        }
    }

    // Mobile: Click to expand in place
    if (window.innerWidth <= 968) {
        document.querySelectorAll('.grid-card').forEach(card => {
            card.addEventListener('click', () => {
                openModal(card);
            });
        });
    }

    // Close modal on overlay click
    modalOverlay.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Prevent modal content from closing when clicking inside
    modal.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Research Accordion Items - hover to expand
    document.querySelectorAll('.research-accordion-item').forEach(item => {
        // Expand on mouse enter
        item.addEventListener('mouseenter', () => {
            item.classList.add('active');
        });

        // Collapse on mouse leave
        item.addEventListener('mouseleave', () => {
            item.classList.remove('active');
        });

        // Keep click functionality for mobile/touch devices
        const header = item.querySelector('.research-accordion-header');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Mobile menu toggle (for future implementation)
    // This is a placeholder for when mobile menu is needed
    const createMobileMenu = () => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            // Mobile menu functionality can be added here if needed
            console.log('Mobile view detected');
        }
    };

    window.addEventListener('resize', createMobileMenu);
    createMobileMenu();

})();
