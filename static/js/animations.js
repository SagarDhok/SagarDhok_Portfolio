/**
 * Portfolio Animations & Interactivity
 */

// ============== TYPING ANIMATION ==============
class TypingAnimation {
                constructor(element, texts, speed = 100, pauseTime = 2000) {
                                this.element = element;
                                this.texts = texts;
                                this.speed = speed;
                                this.pauseTime = pauseTime;
                                this.textIndex = 0;
                                this.charIndex = 0;
                                this.isDeleting = false;
                                this.type();
                }

                type() {
                                const currentText = this.texts[this.textIndex];

                                if (this.isDeleting) {
                                                this.element.textContent = currentText.substring(0, this.charIndex - 1);
                                                this.charIndex--;
                                } else {
                                                this.element.textContent = currentText.substring(0, this.charIndex + 1);
                                                this.charIndex++;
                                }

                                let typeSpeed = this.isDeleting ? this.speed / 2 : this.speed;

                                if (!this.isDeleting && this.charIndex === currentText.length) {
                                                typeSpeed = this.pauseTime;
                                                this.isDeleting = true;
                                } else if (this.isDeleting && this.charIndex === 0) {
                                                this.isDeleting = false;
                                                this.textIndex = (this.textIndex + 1) % this.texts.length;
                                                typeSpeed = 500;
                                }

                                setTimeout(() => this.type(), typeSpeed);
                }
}

// ============== SCROLL REVEAL ANIMATION ==============
class ScrollReveal {
                constructor() {
                                this.revealElements = document.querySelectorAll('.reveal');
                                this.init();
                }

                init() {
                                const observer = new IntersectionObserver((entries) => {
                                                entries.forEach(entry => {
                                                                if (entry.isIntersecting) {
                                                                                entry.target.classList.add('revealed');
                                                                }
                                                });
                                }, {
                                                threshold: 0.1,
                                                rootMargin: '0px 0px -50px 0px'
                                });

                                this.revealElements.forEach(el => observer.observe(el));
                }
}

// ============== COUNTER ANIMATION ==============
class CounterAnimation {
                constructor() {
                                this.counters = document.querySelectorAll('.counter');
                                this.init();
                }

                init() {
                                const observer = new IntersectionObserver((entries) => {
                                                entries.forEach(entry => {
                                                                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                                                                                this.animateCounter(entry.target);
                                                                                entry.target.classList.add('counted');
                                                                }
                                                });
                                }, { threshold: 0.5 });

                                this.counters.forEach(counter => observer.observe(counter));
                }

                animateCounter(counter) {
                                const target = parseInt(counter.getAttribute('data-target'));
                                const duration = 2000;
                                const increment = target / (duration / 16);
                                let current = 0;

                                const updateCounter = () => {
                                                current += increment;
                                                if (current < target) {
                                                                counter.textContent = Math.floor(current);
                                                                requestAnimationFrame(updateCounter);
                                                } else {
                                                                counter.textContent = target;
                                                }
                                };

                                updateCounter();
                }
}

// ============== SMOOTH SCROLL ==============
class SmoothScroll {
                constructor() {
                                this.init();
                }

                init() {
                                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                                                anchor.addEventListener('click', (e) => {
                                                                e.preventDefault();
                                                                const target = document.querySelector(anchor.getAttribute('href'));
                                                                if (target) {
                                                                                const headerOffset = 80;
                                                                                const elementPosition = target.getBoundingClientRect().top;
                                                                                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                                                                                window.scrollTo({
                                                                                                top: offsetPosition,
                                                                                                behavior: 'smooth'
                                                                                });

                                                                                // Close mobile menu if open
                                                                                const mobileMenu = document.querySelector('.nav-links');
                                                                                if (mobileMenu && mobileMenu.classList.contains('active')) {
                                                                                                mobileMenu.classList.remove('active');
                                                                                                document.querySelector('.hamburger')?.classList.remove('active');
                                                                                }
                                                                }
                                                });
                                });
                }
}

// ============== NAVBAR SCROLL EFFECT ==============
class NavbarScroll {
                constructor() {
                                this.navbar = document.querySelector('.navbar');
                                this.init();
                }

                init() {
                                if (!this.navbar) return;

                                window.addEventListener('scroll', () => {
                                                if (window.scrollY > 50) {
                                                                this.navbar.classList.add('scrolled');
                                                } else {
                                                                this.navbar.classList.remove('scrolled');
                                                }
                                });
                }
}

// ============== MOBILE MENU ==============
class MobileMenu {
                constructor() {
                                this.hamburger = document.querySelector('.hamburger');
                                this.navLinks = document.querySelector('.nav-links');
                                this.init();
                }

                init() {
                                if (!this.hamburger || !this.navLinks) return;

                                this.hamburger.addEventListener('click', () => {
                                                this.hamburger.classList.toggle('active');
                                                this.navLinks.classList.toggle('active');
                                });
                }
}

// ============== COPY TO CLIPBOARD ==============
function copyToClipboard(text, button) {
                navigator.clipboard.writeText(text).then(() => {
                                const originalText = button.innerHTML;
                                button.innerHTML = '<span class="copied">Copied!</span>';
                                setTimeout(() => {
                                                button.innerHTML = originalText;
                                }, 2000);
                });
}

// ============== SKILLS ORBIT ANIMATION ==============
class SkillsOrbit {
                constructor() {
                                this.orbitItems = document.querySelectorAll('.orbit-item');
                                this.init();
                }

                init() {
                                const total = this.orbitItems.length;
                                this.orbitItems.forEach((item, index) => {
                                                const angle = (360 / total) * index;
                                                item.style.setProperty('--orbit-angle', `${angle}deg`);
                                });
                }
}

// ============== INITIALIZE ALL ==============
document.addEventListener('DOMContentLoaded', () => {
                // Typing animation
                const typingElement = document.getElementById('typing-text');
                if (typingElement) {
                                new TypingAnimation(typingElement, [
                                                'Backend Developer',
                                                'Python Expert',
                                                'Django Specialist',
                                                'REST API Architect',
                                                'Problem Solver'
                                ]);
                }

                // Other animations
                new ScrollReveal();
                new CounterAnimation();
                new SmoothScroll();
                new NavbarScroll();
                new MobileMenu();
                new SkillsOrbit();

                // Remove loading screen
                setTimeout(() => {
                                document.body.classList.add('loaded');
                }, 500);
});

// ============== SCROLL INDICATOR ==============
document.addEventListener('DOMContentLoaded', () => {
                const scrollIndicator = document.querySelector('.scroll-indicator');
                if (scrollIndicator) {
                                scrollIndicator.addEventListener('click', () => {
                                                const aboutSection = document.getElementById('about');
                                                if (aboutSection) {
                                                                aboutSection.scrollIntoView({ behavior: 'smooth' });
                                                }
                                });
                }
});

// ============== BACK TO TOP ==============
document.addEventListener('DOMContentLoaded', () => {
                const backToTop = document.querySelector('.back-to-top');
                if (backToTop) {
                                window.addEventListener('scroll', () => {
                                                if (window.scrollY > 500) {
                                                                backToTop.classList.add('visible');
                                                } else {
                                                                backToTop.classList.remove('visible');
                                                }
                                });

                                backToTop.addEventListener('click', () => {
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                });
                }
});
