document.addEventListener('DOMContentLoaded', function() {
    // Инициализация AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
    });

    // Create animated particles for hero section
    function createParticles() {
        const heroSections = document.querySelectorAll('.hero, .page-hero');
        if (heroSections.length === 0) return;

        heroSections.forEach(section => {
            // Create particles container if not exists
            let particlesContainer = section.querySelector('.particles');
            if (!particlesContainer) {
                particlesContainer = document.createElement('div');
                particlesContainer.className = 'particles';
                section.appendChild(particlesContainer);
            }
            
            // Create particles
            const particleCount = 30;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('span');
                particle.className = 'particle';
                
                // Random positions and sizes
                const size = Math.floor(Math.random() * 8) + 3;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const delay = Math.random() * 10;
                const duration = (Math.random() * 20) + 10;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.animationDelay = `${delay}s`;
                particle.style.animationDuration = `${duration}s`;
                
                // Add some random colors
                const colors = ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.backgroundColor = randomColor;
                
                particlesContainer.appendChild(particle);
            }
        });
    }

    createParticles();

    // Мобильное меню
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            body.classList.toggle('menu-open'); // Блокировка прокрутки при открытом меню
        });
    }

    // Закрытие мобильного меню при клике на пункт
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Закрытие мобильного меню при клике вне меню
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-toggle')) {
            if (mainNav.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                body.classList.remove('menu-open');
            }
        }
    });

    // Скроллинг хедера
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Partners Logo Animation
    const partnerItems = document.querySelectorAll('.partner-item');
    
    partnerItems.forEach((item, index) => {
        // Add a slight floating animation to logos
        const logo = item.querySelector('.partner-logo');
        if (logo) {
            logo.style.animationDelay = `${index * 0.1}s`;
            logo.style.animation = 'float 3s ease-in-out infinite';
        }
    });

    // Add CSS animation keyframes for floating effect
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
            100% {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Анимация для партнеров
    partnerItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const logo = this.querySelector('.partner-logo img');
            if (logo) {
                logo.style.transform = 'scale(1.1)';
            }
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 20px 30px rgba(0, 204, 68, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            const logo = this.querySelector('.partner-logo img');
            if (logo) {
                logo.style.transform = 'scale(1)';
            }
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Анимация для отзывов
    const reviewCards = document.querySelectorAll('.review-card');
    
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });

    // Create directory structure if it doesn't exist
    function createFoldersIfNeeded() {
        const folders = ['img', 'img/partners'];
        
        folders.forEach(folder => {
            if (!document.querySelector(`#folder-${folder.replace('/', '-')}`)) {
                console.log(`Note: Please create the ${folder} directory for storing assets.`);
            }
        });
    }
    
    createFoldersIfNeeded();

    // Add placeholder note about missing images
    const missingImages = document.querySelectorAll('img[src^="img/"]');
    missingImages.forEach(img => {
        if (!img.complete || img.naturalHeight === 0) {
            console.log(`Note: The image file ${img.getAttribute('src')} needs to be created.`);
        }
    });

    // Адаптивность для различных устройств
    function handleResize() {
        const width = window.innerWidth;
        
        // Сбрасываем мобильное меню при изменении размера окна
        if (width > 992 && mainNav.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Вызываем при загрузке

    // Прокрутка к форме контактов после перехода по ссылке "Связаться с нами"
    if (localStorage.getItem('scrollToContactForm') === 'true') {
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
            contactForm.scrollIntoView({ behavior: 'smooth' });
                contactForm.classList.add('highlight-form');
            localStorage.removeItem('scrollToContactForm');
        }
    }

    // Обработчик формы контактов
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Добавляем анимацию при отправке формы
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Отправка...';
                
                // Имитация отправки формы
                setTimeout(() => {
                    this.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Отправить запрос';
                    
                    // Показываем сообщение об успешной отправке
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i><h3>Спасибо за ваше сообщение!</h3><p>Мы свяжемся с вами в ближайшее время.</p>';
                    
                    if (this.nextElementSibling && this.nextElementSibling.classList.contains('success-message')) {
                        this.parentNode.removeChild(this.nextElementSibling);
                    }
                    
                    this.parentNode.insertBefore(successMessage, this.nextElementSibling);
                    
                    // Удаляем сообщение через 5 секунд
                    setTimeout(() => {
                        if (successMessage.parentNode) {
                            successMessage.parentNode.removeChild(successMessage);
                        }
                    }, 5000);
                }, 1500);
            }
        });
    }
}); 