// public/voronoi.js

(() => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
  
    let width, height, points = [], triangles = [];
    let mouseX = null, mouseY = null;
  
    const POINT_COUNT = 100;
    const MAX_SPEED = 0.5;
  
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      points = [];
      for (let i = 0; i < POINT_COUNT; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * MAX_SPEED,
          vy: (Math.random() - 0.5) * MAX_SPEED
        });
      }
    }
  
    function update() {
      for (let p of points) {
        p.x += p.vx;
        p.y += p.vy;
  
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
    }
  
    function draw() {
      ctx.clearRect(0, 0, width, height);
  
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const opacity = 1 - dist / 150;
            ctx.strokeStyle = `rgba(255, 0, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }
  
      for (let p of points) {
        ctx.fillStyle = "rgba(255, 0, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  
    function loop() {
      update();
      draw();
      requestAnimationFrame(loop);
    }
  
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
  
    resize();
    loop();
  })();
  