document.addEventListener("DOMContentLoaded", function() {
    const heart = document.getElementById("heart");
    const message = document.getElementById("love-message");
    const clickText = document.getElementById("click-text");

    heart.addEventListener("click", function() {
        heart.style.display = "none";
        clickText.style.display = "none";
        message.style.display = "block";

        startFireworks();
    });

    function startFireworks() {
        const canvas = document.getElementById("fireworks");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        const numberOfParticles = 100;
        
        function Particle(x, y, color) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 1;
            this.speedX = (Math.random() - 0.5) * 10;
            this.speedY = (Math.random() - 0.5) * 10;
            this.color = color;
            this.alpha = 1;
        }

        Particle.prototype.update = function() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= 0.02;
        };

        Particle.prototype.draw = function() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        };

        function createFirework(x, y) {
            const colors = ["#ff0000", "#ff8000", "#ffff00", "#00ff00", "#0000ff", "#8000ff"];
            for (let i = 0; i < numberOfParticles; i++) {
                let color = colors[Math.floor(Math.random() * colors.length)];
                particles.push(new Particle(x, y, color));
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                if (particles[i].alpha <= 0) {
                    particles.splice(i, 1);
                    i--;
                }
            }
            requestAnimationFrame(animate);
        }

        // Declanșează artificiile la click pe canvas (opțional)
        canvas.addEventListener("click", function(event) {
            createFirework(event.clientX, event.clientY);
        });

        createFirework(canvas.width / 2, canvas.height / 2);
        animate();
    }
});
