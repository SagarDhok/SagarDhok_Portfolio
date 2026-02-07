/**
 * Particle Background Animation
 * Creates an interactive canvas with floating particles and mouse interaction
 */

class ParticleSystem {
                constructor(canvasId) {
                                this.canvas = document.getElementById(canvasId);
                                this.ctx = this.canvas.getContext('2d');
                                this.particles = [];
                                this.mouse = { x: null, y: null, radius: 150 };
                                this.particleCount = window.innerWidth < 768 ? 50 : 100;

                                this.init();
                                this.animate();
                                this.setupEventListeners();
                }

                init() {
                                this.resize();
                                this.createParticles();
                }

                resize() {
                                this.canvas.width = window.innerWidth;
                                this.canvas.height = window.innerHeight;
                }

                createParticles() {
                                this.particles = [];
                                for (let i = 0; i < this.particleCount; i++) {
                                                this.particles.push(new Particle(this.canvas));
                                }
                }

                setupEventListeners() {
                                window.addEventListener('resize', () => {
                                                this.resize();
                                                this.createParticles();
                                });

                                window.addEventListener('mousemove', (e) => {
                                                this.mouse.x = e.x;
                                                this.mouse.y = e.y;
                                });

                                window.addEventListener('mouseout', () => {
                                                this.mouse.x = null;
                                                this.mouse.y = null;
                                });
                }

                connectParticles() {
                                const maxDistance = 120;
                                for (let i = 0; i < this.particles.length; i++) {
                                                for (let j = i + 1; j < this.particles.length; j++) {
                                                                const dx = this.particles[i].x - this.particles[j].x;
                                                                const dy = this.particles[i].y - this.particles[j].y;
                                                                const distance = Math.sqrt(dx * dx + dy * dy);

                                                                if (distance < maxDistance) {
                                                                                const opacity = 1 - (distance / maxDistance);
                                                                                this.ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.3})`;
                                                                                this.ctx.lineWidth = 1;
                                                                                this.ctx.beginPath();
                                                                                this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                                                                                this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                                                                                this.ctx.stroke();
                                                                }
                                                }
                                }
                }

                animate() {
                                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                                this.particles.forEach(particle => {
                                                particle.update(this.mouse);
                                                particle.draw(this.ctx);
                                });

                                this.connectParticles();
                                requestAnimationFrame(() => this.animate());
                }
}

class Particle {
                constructor(canvas) {
                                this.canvas = canvas;
                                this.x = Math.random() * canvas.width;
                                this.y = Math.random() * canvas.height;
                                this.size = Math.random() * 3 + 1;
                                this.baseSize = this.size;
                                this.speedX = (Math.random() - 0.5) * 0.8;
                                this.speedY = (Math.random() - 0.5) * 0.8;
                                this.color = this.getRandomColor();
                }

                getRandomColor() {
                                const colors = [
                                                'rgba(59, 130, 246, 0.8)',   // Blue
                                                'rgba(139, 92, 246, 0.8)',   // Purple
                                                'rgba(6, 182, 212, 0.8)',    // Cyan
                                                'rgba(245, 158, 11, 0.6)',   // Gold
                                ];
                                return colors[Math.floor(Math.random() * colors.length)];
                }

                update(mouse) {
                                this.x += this.speedX;
                                this.y += this.speedY;

                                // Mouse interaction
                                if (mouse.x !== null && mouse.y !== null) {
                                                const dx = mouse.x - this.x;
                                                const dy = mouse.y - this.y;
                                                const distance = Math.sqrt(dx * dx + dy * dy);

                                                if (distance < mouse.radius) {
                                                                const force = (mouse.radius - distance) / mouse.radius;
                                                                const angle = Math.atan2(dy, dx);
                                                                this.x -= Math.cos(angle) * force * 2;
                                                                this.y -= Math.sin(angle) * force * 2;
                                                                this.size = this.baseSize + force * 3;
                                                } else {
                                                                this.size = this.baseSize;
                                                }
                                }

                                // Boundary check with wrap-around
                                if (this.x < 0) this.x = this.canvas.width;
                                if (this.x > this.canvas.width) this.x = 0;
                                if (this.y < 0) this.y = this.canvas.height;
                                if (this.y > this.canvas.height) this.y = 0;
                }

                draw(ctx) {
                                ctx.fillStyle = this.color;
                                ctx.beginPath();
                                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                                ctx.fill();
                }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
                const canvas = document.getElementById('particles-canvas');
                if (canvas) {
                                new ParticleSystem('particles-canvas');
                }
});
