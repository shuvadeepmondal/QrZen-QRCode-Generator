import { useEffect, useRef } from "react";

class Planet {
    angle: number;
    distance: number;
    speed: number;
    radius: number;
    color: string;

    constructor(distance: number, speed: number, radius: number, color: string) {
        this.angle = Math.random() * Math.PI * 2; // Random starting position
        this.distance = distance;
        this.speed = speed;
        this.radius = radius;
        this.color = color;
    }

    update() {
        this.angle += this.speed; // Move in orbit
    }

    draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
        const x = centerX + Math.cos(this.angle) * this.distance;
        const y = centerY + Math.sin(this.angle) * (this.distance * 0.8); // Elliptical orbit

        // Draw planet
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Star {
    x: number;
    y: number;
    size: number;

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}

const SolarSystem = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const planetsRef = useRef<Planet[]>([]);
    const starsRef = useRef<Star[]>([]);
    const numStars = 200; // Number of background stars

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Generate stars
        starsRef.current = Array.from({ length: numStars }, () => new Star(canvas.width, canvas.height));

        // Create planets with (distance, speed, radius, color)
        planetsRef.current = [
            new Planet(50, 0.02, 4, "#ffcc00"), // Mercury
            new Planet(100, 0.015, 6, "#c0c0c0"), // Venus
            new Planet(150, 0.01, 8, "#00aaff"), // Earth
            new Planet(200, 0.008, 5, "#ff4500"), // Mars
            new Planet(300, 0.005, 15, "#ffaa00"), // Jupiter
            new Planet(400, 0.003, 12, "#d4af37"), // Saturn
            new Planet(500, 0.002, 10, "#00ffff"), // Uranus
            new Planet(600, 0.001, 8, "#0000ff"), // Neptune
        ];

        const animate = () => {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Draw background stars
            starsRef.current.forEach((star) => star.draw(ctx));

            // Draw Sun
            ctx.beginPath();
            ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
            ctx.fillStyle = "#ffdb4d";
            ctx.fill();
            ctx.closePath();

            // Draw Orbits
            planetsRef.current.forEach((planet) => {
                ctx.beginPath();
                ctx.ellipse(centerX, centerY, planet.distance, planet.distance * 0.8, 0, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
                ctx.stroke();
                ctx.closePath();
            });

            // Update and Draw Planets
            planetsRef.current.forEach((planet) => {
                planet.update();
                planet.draw(ctx, centerX, centerY);
            });
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 bg-black" />;
};

export default SolarSystem;
