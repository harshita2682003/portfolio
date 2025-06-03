// Main JavaScript file for Alex Johnson Portfolio
'use strict';

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeThemeToggle();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeNavbarScroll();
    initializeAnimations();
    initializeSkillBars();
    initializeProjectFilters();
    initializeContactForm();
    initializeProjectModals();
    initializeBackToTop();
    initializeCounters();
    initializeIntersectionObserver();
    initializeResumeDownload();
    initializePerformanceOptimizations();
    initializeTypingAnimation();
});

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        htmlElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (prefersDark) {
        htmlElement.classList.add('dark');
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        htmlElement.classList.toggle('dark');
        const isDark = htmlElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            htmlElement.classList.toggle('dark', e.matches);
        }
    });
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = mobileMenuButton.querySelector('i');
    
    mobileMenuButton.addEventListener('click', function() {
        const isOpen = !mobileMenu.classList.contains('hidden');
        
        if (isOpen) {
            mobileMenu.classList.add('hidden');
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
        } else {
            mobileMenu.classList.remove('hidden');
            mobileMenuIcon.classList.remove('fa-bars');
            mobileMenuIcon.classList.add('fa-times');
        }
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
        }
    });
}

// Smooth Scrolling Navigation
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update Active Navigation Link
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Navbar Scroll Effects
function initializeNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background blur based on scroll position
        if (scrollTop > 100) {
            navbar.classList.add('backdrop-blur-md', 'shadow-lg');
        } else {
            navbar.classList.remove('backdrop-blur-md', 'shadow-lg');
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Update active nav link based on scroll position
        updateActiveNavOnScroll();
    });
}

// Update Active Nav Link on Scroll
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    const scrollPosition = window.scrollY + navbarHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            updateActiveNavLink(`#${sectionId}`);
        }
    });
}

// Initialize Animations
function initializeAnimations() {
    // Add animation classes to elements as they come into view
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });
    
    // Trigger animations when elements are in view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// Skill Bars Animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 200);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Project Filters
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-primary-600', 'text-white'));
            this.classList.add('active', 'bg-primary-600', 'text-white');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form Functionality
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm();
        }
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const errorElement = field.nextElementSibling;
        
        // Clear previous errors
        clearError(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            showError(field, 'This field is required');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Name validation
        if ((field.name === 'firstName' || field.name === 'lastName') && value) {
            if (value.length < 2) {
                showError(field, 'Name must be at least 2 characters long');
                return false;
            }
        }
        
        // Message validation
        if (field.name === 'message' && value) {
            if (value.length < 10) {
                showError(field, 'Message must be at least 10 characters long');
                return false;
            }
        }
        
        return true;
    }
    
    function showError(field, message) {
        field.classList.add('border-red-500');
        const errorElement = field.nextElementSibling;
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
    
    function clearError(field) {
        field.classList.remove('border-red-500');
        const errorElement = field.nextElementSibling;
        errorElement.classList.add('hidden');
    }
    
    function submitForm() {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Show success message
            formMessage.classList.remove('hidden');
            formMessage.querySelector('.success-message').classList.remove('hidden');
            formMessage.querySelector('.error-message').classList.add('hidden');
            
            // Reset form
            form.reset();
            
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.querySelector('.btn-text').textContent = 'Send Message';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        }, 2000);
    }
}

// Project Modal Functionality
function initializeProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');
    const viewProjectButtons = document.querySelectorAll('.view-project');
    
    // Project data
    const projectData = {
        1: {
    title: 'GymSa eCommerce Theme',
    image: 'assets/images/project-img-1.png',
    description: 'GymSa is a fully responsive frontend eCommerce theme designed for gym and fitness products. It includes multiple UI components, stylish layouts, and user-focused features to create a modern and engaging shopping experience.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    features: [
        '3 unique header designs and 3 customizable footer layouts',
        '7 different product detail page styles',
        '4 product listing pages with filtering and sorting options',
        '3 modern blog page layouts for content and updates',
        'Dedicated pages for cart, compare, and wishlist functionality',
        'Interactive cart popup for quick cart access',
        'Quickview popup for viewing product details without leaving the page',
        'Account page layout for login, register, and profile sections',
        'Order summary page template',
        'Fully responsive design across all devices'
    ],
    liveUrl: 'https://harshita2682003.github.io/gymsa/',
}

,
        2:{
    title: 'Merrymart eCommerce Theme',
    image: 'assets/images/project-img-2.png',
    description: 'Merrymart is a festive, fully responsive Christmas-themed frontend eCommerce template perfect for selling holiday gifts, decorations, and seasonal items. It features cheerful designs, engaging UI elements, and a smooth shopping experience tailored for the holiday season.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    features: [
        '3 holiday-themed header variations and 3 festive footer layouts',
        '7 product detail pages with seasonal styling and layouts',
        '4 product listing pages with filters and sorting options',
        '3 Christmas-themed blog page layouts for gift guides and updates',
        'Dedicated pages for cart, compare, and wishlist functionality',
        'Interactive cart popup for seamless shopping experience',
        'Quickview popup for fast product previews',
        'User account page layout for login, registration, and account details',
        'Order summary page template for checkout previews',
        'Responsive design for all devices with a holiday aesthetic'
    ],
    liveUrl: 'https://harshita2682003.github.io/marrymart/',
}
,
        3: {
           
    title: 'StepGlam Juti Store eCommerce Theme',
    image: 'assets/images/project-img-3.png',
    description: 'StepGlam is a clean and elegant frontend eCommerce theme designed for traditional juti (ethnic footwear) stores. It highlights handcrafted footwear with a graceful design and offers essential eCommerce UI components for a complete browsing experience.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    features: [
        '1 stylish and responsive header layout',
        '1 elegant footer design',
        'Product detail page for showcasing individual juti items',
        'Product listing page with filtering and sorting options',
        'About page for brand introduction or store information',
        'Responsive design for mobile, tablet, and desktop',
        'Clean UI optimized for traditional and ethnic branding'
    ],
    liveUrl: 'https://harshita2682003.github.io/stepglam/',

        },
        4: {
           
    title: 'Cakezilla Theme',
    image: 'assets/images/project-img-5.png',
    description: 'Cakezilla is a sweet and elegant frontend eCommerce theme designed specifically for cake shops, bakeries, and dessert boutiques. With beautiful layouts and smooth interactions, it offers a delightful user experience for showcasing and selling baked goods online.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    features: [
        '3 deliciously styled header designs and 3 footer variations',
        '7 product detail pages with visually rich layouts',
        '4 product listing pages with filtering and sorting options',
        '3 blog page layouts for sharing recipes, news, or promotions',
        'Dedicated pages for cart, wishlist, and product comparison',
        'Cart popup for quick item access without navigating away',
        'Quickview popup for seamless product browsing',
        'Account page layouts for login, registration, and profile info',
        'Order page layout for purchase summary and order tracking',
        'Responsive design optimized for all screen sizes and devices'
    ],
    liveUrl: 'https://harshita2682003.github.io/cakezilla/',
},
        5: {
          
    title: 'Dash Support Ticket Add-ons',
    image: 'assets/images/project-img-4.png',
    description: 'Dash Support Ticket Add-ons is a frontend UI module designed to integrate seamlessly into admin or user dashboards. It provides a user-friendly interface for managing support tickets and accessing knowledge base content.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind css'],
    features: [
        'Create new support tickets with form validation',
        'Search existing tickets by keywords or ID',
        'View detailed ticket conversations and status updates',
        'Knowledge base listing page for self-help resources',
        'Knowledge detail page for individual article content',
        'Clean and responsive layout optimized for dashboards'
    ],
    liveUrl: 'https://harshita2682003.github.io/support-ticket/',

        },
        6: {
            title: 'Dash Vehicle Booking Add-ons',
    image: 'assets/images/project-img-6.png',
    description: 'Dash Vehicle Booking Add-ons is a frontend UI module crafted for vehicle rental or booking dashboards. It streamlines the booking process with an intuitive, step-by-step flow from vehicle selection to payment confirmation.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind css'],
    features: [
        'Search available vehicles by date, type, or location',
        'Select a vehicle from the filtered results',
        'Choose available seat or booking options',
        'Proceed to a step-by-step booking and payment form',
        'Display payment confirmation page upon successful booking',
        'Fully responsive design tailored for dashboard integration'
    ],
    liveUrl: 'https://harshita2682003.github.io/vehicle-booking/',
        },
               7: {
    title: 'Event Management vCard',
    image: 'assets/images/project-img-7.png',
    description: 'Event Management vCard is a modern, interactive vCard designed for event professionals and businesses. It features multiple color variants and all essential modules to showcase services and manage appointments efficiently.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
    features: [
        '5 color variants for personalization',
        'Appointment booking functionality',
        'Interactive gallery section to showcase past events',
        'Contact Us form for direct communication',
        'Client testimonials for credibility',
        'Integrated social media links',
        'Payment integration for service bookings',
        'Responsive and mobile-friendly design'
    ],
    liveUrl: 'https://harshita2682003.github.io/event-management/',
},
8: {
    title: 'Surgeon vCard',
    image: 'assets/images/project-img-8.png',
    description: 'Surgeon vCard is a sleek and professional digital card tailored for surgeons and medical practitioners. It helps showcase credentials, manage patient appointments, and improve online presence—all in a clean, mobile-friendly layout.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
    features: [
        'Multiple color variants for brand personalization',
        'Appointment booking system for patients',
        'Profile section to highlight specialization, experience, and qualifications',
        'Service listings (e.g., General Surgery, Laparoscopy, etc.)',
        'Patient testimonials for credibility and trust',
        'Image gallery for clinic or procedural highlights',
        'Integrated contact form for inquiries',
        'Social media and WhatsApp integration',
        'Secure payment integration (for consultation or reports)',
        'Fully responsive design optimized for all devices'
    ],
    liveUrl: 'https://harshita2682003.github.io/surgeon/', // Replace with your actual live URL
}


    };
    
    // Open modal
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                modalContent.innerHTML = generateModalContent(project);
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                
                // Add animation
                const modalInner = modal.querySelector('.bg-white');
                modalInner.style.transform = 'scale(0.8)';
                modalInner.style.opacity = '0';
                
                setTimeout(() => {
                    modalInner.style.transform = 'scale(1)';
                    modalInner.style.opacity = '1';
                    modalInner.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                }, 10);
            }
        });
    });
    
    // Close modal
    function closeModalFunction() {
        const modalInner = modal.querySelector('.bg-white');
        modalInner.style.transform = 'scale(0.8)';
        modalInner.style.opacity = '0';
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }
    
    closeModal.addEventListener('click', closeModalFunction);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunction();
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModalFunction();
        }
    });
    
    function generateModalContent(project) {
        return `
            <div class="grid lg:grid-cols-2 gap-8">
                <div>
                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover rounded-lg">
                </div>
                <div>
                    <h3 class="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-4">${project.title}</h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-6">${project.description}</p>
                    
                    <div class="flex flex-wrap gap-2 mb-6">
                        ${project.technologies.map(tech => `
                            <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm">
                                ${tech}
                            </span>
                        `).join('')}
                    </div>
                    
                    <div class="flex space-x-4">
                        <a href="${project.liveUrl}" target="_blank" class="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300 flex items-center">
                            <i class="fas fa-external-link-alt mr-2"></i>
                            Live Demo
                        </a>
                        
                    </div>
                </div>
            </div>
            
            <div class="mt-4 md:mt-6 lg:mt-8">
                <h4 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Key Features</h4>
                <ul class="grid md:grid-cols-2 gap-3">
                    ${project.features.map(feature => `
                        <li class="flex text-gray-600 dark:text-gray-300">
                            <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                            ${feature}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 50;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Intersection Observer for Fade-in Animations
function initializeIntersectionObserver() {
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

// Resume Download Functionality
function initializeResumeDownload() {
  const downloadBtn = document.getElementById('download-resume');

  downloadBtn.addEventListener('click', function () {
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-check mr-2"></i>Downloaded!';
    this.classList.add('bg-green-600');

    setTimeout(() => {
      this.innerHTML = originalText;
      this.classList.remove('bg-green-600');
    }, 2000);
  });
}

initializeResumeDownload();


// Performance Optimizations
function initializePerformanceOptimizations() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounced scroll handler
    let scrollTimeout;
    const debouncedScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Handle scroll events that need debouncing
            updateActiveNavOnScroll();
        }, 16); // ~60fps
    };
    
    window.addEventListener('scroll', debouncedScroll, { passive: true });
    
    // Preload critical resources
    const preloadResources = [
        'assets/css/style.css',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap'
    ];
    
    preloadResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'font';
        if (link.as === 'font') {
            link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
    });
    
    // Service Worker registration (if available)
}

// Typing Animation for Skills
function initializeTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const skills = [
        'HTML5 & CSS3',
        'JavaScript',
        'Tailwind CSS',
        'Bootstrap Framework',
        'Responsive Design',
        'SCSS & Media Queries'
    ];
    
    let currentSkillIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeSkill() {
        const currentSkill = skills[currentSkillIndex];
        
        if (isDeleting) {
            // Remove characters
            typingElement.textContent = currentSkill.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentSkillIndex = (currentSkillIndex + 1) % skills.length;
                setTimeout(typeSkill, 500); // Pause before typing next skill
                return;
            }
        } else {
            // Add characters
            typingElement.textContent = currentSkill.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentSkill.length) {
                isDeleting = true;
                setTimeout(typeSkill, 2000); // Pause when word is complete
                return;
            }
        }
        
        // Continue typing/deleting
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeSkill, speed);
    }
    
    // Start the typing animation after a delay
    setTimeout(typeSkill, 1500);
}


// Unhandled Promise Rejection
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});

// Performance Monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Accessibility Improvements
document.addEventListener('keydown', function(e) {
    // ESC key handling for modals
    if (e.key === 'Escape') {
        const modal = document.getElementById('project-modal');
        if (!modal.classList.contains('hidden')) {
            modal.querySelector('#close-modal').click();
        }
    }
    
    // Tab navigation improvements
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus-visible polyfill behavior
const focusElements = document.querySelectorAll('button, a, input, textarea, select');
focusElements.forEach(element => {
    element.addEventListener('focus', function() {
        if (document.body.classList.contains('keyboard-navigation')) {
            this.classList.add('focus-visible');
        }
    });
    
    element.addEventListener('blur', function() {
        this.classList.remove('focus-visible');
    });
});
