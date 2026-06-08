// تهيئة AOS
AOS.init({ duration: 800, once: true, offset: 80 });

// شريط التمرير العلوي
window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = document.getElementById('scrollProgress');
    if (progress) progress.style.width = (winScroll / height) * 100 + '%';

    // تأثير الهيدر
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // زر العودة للأعلى
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        if (window.scrollY > 300) backBtn.classList.add('show');
        else backBtn.classList.remove('show');
    }
});

// زر العودة للأعلى
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// عداد الأرقام المتحرك
function startCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        const increment = Math.ceil(target / 80);
        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.innerText = count;
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

const statsSection = document.querySelector('.grid-4');
if (statsSection) {
    let counted = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                startCounters();
            }
        });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
}


        // التحكم في التبويبات
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // التمرير السلس
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                if (targetId === '#home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const header = document.querySelector('.main-header');
                    const headerHeight = header ? header.offsetHeight : 70;
                    const top = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });

        // إنشاء جسيمات الابتكار في الرأس
        function createInnovationParticles() {
            const headerInnovation = document.getElementById('headerInnovation');
            const particleCount = 15;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('innovation-particle');
                
                // مواقع عشوائية
                const top = Math.random() * 100;
                const right = Math.random() * 100;
                const size = Math.random() * 4 + 2;
                const delay = Math.random() * 5;
                
                particle.style.top = `${top}%`;
                particle.style.right = `${right}%`;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.animationDelay = `${delay}s`;
                
                headerInnovation.appendChild(particle);
            }
        }
        
        // تبديل القائمة في الجوال
        document.getElementById('mobileToggle').addEventListener('click', function() {
            document.getElementById('navMenu').classList.toggle('active');
        });
        
        // تهيئة التأثيرات عند تحميل الصفحة
        window.addEventListener('load', function() {
            createInnovationParticles();
        });

        // تغيير العنصر النشط في الشريط عند التمرير
        const navSections = ['home', 'about', 'products', 'inventions', 'team', 'achievements', 'partners', 'contact'];
        const navLinks = document.querySelectorAll('.nav-menu a');

        function updateActiveNav() {
            const header = document.querySelector('.main-header');
            const headerHeight = header ? header.offsetHeight : 70;
            const scrollY = window.scrollY + headerHeight + 50;

            let currentSection = 'home';
            navSections.forEach(id => {
                const section = document.getElementById(id);
                if (section && section.offsetTop <= scrollY) {
                    currentSection = id;
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === '#' + currentSection || (href === '#home' && currentSection === 'home')) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav();