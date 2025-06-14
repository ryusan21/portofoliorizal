document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typed.js for typing effect
    if (document.querySelector('.typed-text')) {
        var typed = new Typed('.typed-text', {
            strings: document.querySelector('.typed-text').dataset.typedItems.split(', '),
            loop: true,
            typeSpeed: 70,
            backSpeed: 30,
            backDelay: 1500,
        });
    }

    // Scroll effect for navbar
    const navbar = document.querySelector('.custom-navbar'); // Using custom class
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for internal navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close navbar collapse after click (for mobile)
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                }).hide();
            }
        });
    });

    // Animation when elements enter viewport (Intersection Observer)
    const animateElements = document.querySelectorAll('.animate__animated');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add specific animation classes if present, or fadeIn by default
                if (entry.target.classList.contains('animate__fadeInLeft')) {
                    entry.target.classList.add('animate__fadeInLeft');
                } else if (entry.target.classList.contains('animate__fadeInRight')) {
                    entry.target.classList.add('animate__fadeInRight');
                } else if (entry.target.classList.contains('animate__fadeInUp')) {
                    entry.target.classList.add('animate__fadeInUp');
                } else if (entry.target.classList.contains('animate__fadeInDown')) {
                    entry.target.classList.add('animate__fadeInDown');
                } else if (entry.target.classList.contains('animate__zoomIn')) {
                    entry.target.classList.add('animate__zoomIn');
                }
                else {
                    entry.target.classList.add('animate__fadeIn'); // Default fadeIn
                }
                observer.unobserve(entry.target); // Stop observing after animation is triggered
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Logic for custom notifications (alerts)
    const alerts = document.querySelectorAll('#notification-container .alert');

    alerts.forEach(alert => {
        alert.classList.remove('show'); // Ensure no initial 'show' class
        alert.classList.add('fade-in-right');

        setTimeout(() => {
            alert.classList.remove('fade-in-right');
            alert.classList.add('fade-out-right');

            alert.addEventListener('animationend', () => {
                alert.remove(); // Remove element after animation finishes
            }, { once: true });
        }, 3000); // Notification display duration
    });
});
