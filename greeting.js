
// 'DOMContentLoaded' wrapper hata diya gaya hai kyunki hum HTML me 'defer' attribute ka use kar rahe hain.

const card = document.querySelector('.card');
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');
let fireworks = [];
let particles = [];
let animationFrameId;
let fireworksIntervalId;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function Firework(sx, sy, tx, ty) {
    this.x = sx; this.y = sy;
    this.sx = sx; this.sy = sy;
    this.tx = tx; this.ty = ty;
    this.distanceToTarget = Math.sqrt(Math.pow(tx - sx, 2) + Math.pow(ty - sy, 2));
    this.distanceTraveled = 0;
    this.coordinates = [];
    this.coordinateCount = 3;
    while (this.coordinateCount--) { this.coordinates.push([this.x, this.y]); }
    this.angle = Math.atan2(ty - sy, tx - sx);
    this.speed = 2;
    this.acceleration = 1.03;
    this.brightness = Math.random() * 50 + 50;
    this.hue = Math.random() * 360;
}

Firework.prototype.update = function (index) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);
    this.speed *= this.acceleration;
    let vx = Math.cos(this.angle) * this.speed;
    let vy = Math.sin(this.angle) * this.speed;
    this.distanceTraveled = Math.sqrt(Math.pow(this.x - this.sx, 2) + Math.pow(this.y - this.sy, 2));
    if (this.distanceTraveled >= this.distanceToTarget) {
        createParticles(this.tx, this.ty, this.hue);
        fireworks.splice(index, 1);
    } else {
        this.x += vx;
        this.y += vy;
    }
};

Firework.prototype.draw = function () {
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${this.hue}, 100%, 80%)`;
    ctx.fill();
};

function Particle(x, y, hue) {
    this.x = x; this.y = y;
    this.coordinates = [];
    this.coordinateCount = 5;
    while (this.coordinateCount--) { this.coordinates.push([this.x, this.y]); }
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 8 + 1;
    this.friction = 0.95;
    this.gravity = 0.8;
    this.hue = hue;
    this.brightness = Math.random() * 50 + 50;
    this.alpha = 1;
    this.decay = Math.random() * 0.03 + 0.015;
}

Particle.prototype.update = function (index) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);
    this.speed *= this.friction;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    this.alpha -= this.decay;
    if (this.alpha <= this.decay) { particles.splice(index, 1); }
};

Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
    ctx.stroke();
};

function createParticles(x, y, hue) {
    let particleCount = 100;
    while (particleCount--) { particles.push(new Particle(x, y, hue)); }
}

function loop() {
    animationFrameId = requestAnimationFrame(loop);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].draw();
        fireworks[i].update(i);
    }
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].draw();
        particles[i].update(i);
    }
}

function launchRocket() {
    let startX = canvas.width / 2 + (Math.random() - 0.5) * canvas.width * 0.2;
    let startY = canvas.height;
    let endX = Math.random() * canvas.width;
    let endY = Math.random() * canvas.height * 0.5;
    fireworks.push(new Firework(startX, startY, endX, endY));
}

function startFireworksBurst() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (fireworksIntervalId) clearInterval(fireworksIntervalId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks = [];
    particles = [];
    loop();
    fireworksIntervalId = setInterval(launchRocket, 400);
}

function stopFireworksBurst() {
    clearInterval(fireworksIntervalId);
}

card.addEventListener('click', () => {
    if (!card.classList.contains('open')) {
        card.classList.add('open');
        startFireworksBurst();
        setTimeout(stopFireworksBurst, 3000);
    } else {
        card.classList.remove('open');
        stopFireworksBurst();
    }
});
