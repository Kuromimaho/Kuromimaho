document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.createElement("canvas");

    canvas.id = "particles-canvas";

    Object.assign(canvas.style, {

        position: "fixed",
        inset: "0",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: "-1"

    });

    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let particles = [];

    const PARTICLE_COUNT = 60;

    function resize() {

        canvas.width = window.innerWidth;

        canvas.height = window.innerHeight;

    }

    window.addEventListener("resize", resize);

    resize();

    class Particle {

        constructor() {

            this.reset();

            this.x = Math.random() * canvas.width;

            this.y = Math.random() * canvas.height;

        }

        reset() {

            this.radius = Math.random() * 2 + 1;

            this.speedX = (Math.random() - 0.5) * 0.5;

            this.speedY = (Math.random() - 0.5) * 0.5;

            this.opacity = Math.random() * 0.5 + 0.2;

        }

        update() {

            this.x += this.speedX;

            this.y += this.speedY;

            if (

                this.x < -10 ||

                this.x > canvas.width + 10 ||

                this.y < -10 ||

                this.y > canvas.height + 10

            ) {

                this.x = Math.random() * canvas.width;

                this.y = Math.random() * canvas.height;

                this.reset();

            }

        }

        draw() {

            ctx.beginPath();

            ctx.arc(

                this.x,

                this.y,

                this.radius,

                0,

                Math.PI * 2

            );

            ctx.fillStyle = `rgba(59,130,246,${this.opacity})`;

            ctx.fill();

        }

    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {

        particles.push(new Particle());

    }

    function connectParticles() {

        for (let a = 0; a < particles.length; a++) {

            for (let b = a + 1; b < particles.length; b++) {

                const dx = particles[a].x - particles[b].x;

                const dy = particles[a].y - particles[b].y;

                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {

                    ctx.beginPath();

                    ctx.moveTo(

                        particles[a].x,

                        particles[a].y

                    );

                    ctx.lineTo(

                        particles[b].x,

                        particles[b].y

                    );

                    ctx.strokeStyle = `rgba(59,130,246,${
                        (120 - distance) / 1200
                    })`;

                    ctx.lineWidth = 1;

                    ctx.stroke();

                }

            }

        }

    }

    function animate() {

        ctx.clearRect(

            0,

            0,

            canvas.width,

            canvas.height

        );

        particles.forEach(particle => {

            particle.update();

            particle.draw();

        });

        connectParticles();

        requestAnimationFrame(animate);

    }

    animate();

});