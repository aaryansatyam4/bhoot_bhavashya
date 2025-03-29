import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
    const navigate = useNavigate();

  const canvasTopRef = useRef(null);
  const canvasBottomRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const opts = {
      background: "black",
      numberOrbs: 100,
      maxVelocity: 2.5,
      orbRadius: 1,
      minProximity: 100,
      initialColorAngle: 7,
      colorFrequency: 0.3,
      colorAngleIncrement: 0.009,
      globalAlpha: 0.010,
      manualWidth: false,
      manualHeight: false,
    };

    let canvasTop, linecxt, canvasBottom, cxt, width, height, animationFrame;
    let orbs;

    class Vector {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      add(vec) {
        return new Vector(this.x + vec.x, this.y + vec.y);
      }
      subtract(vec) {
        return new Vector(this.x - vec.x, this.y - vec.y);
      }
      multiply(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
      }
      length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }
      static randomDirection() {
        const angle = Math.random() * 2 * Math.PI;
        return new Vector(Math.cos(angle), Math.sin(angle));
      }
      noZ() {
        return this;
      }
    }

    class Orb {
      constructor(radius, color) {
        this.position = new Vector(Math.random() * width, Math.random() * height);
        this.velocity = Vector.randomDirection().multiply(Math.random() * opts.maxVelocity).noZ();
        this.radius = radius;
        this.color = color;
      }
      update() {
        this.position = this.position.add(this.velocity);
        if (this.position.x + this.radius >= width || this.position.x - this.radius <= 0) this.velocity.x *= -1;
        if (this.position.y + this.radius >= height || this.position.y - this.radius <= 0) this.velocity.y *= -1;
      }
      display() {
        cxt.beginPath();
        cxt.fillStyle = this.color;
        cxt.ellipse(this.position.x, this.position.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
        cxt.fill();
        cxt.closePath();
      }
      run() {
        this.update();
        this.display();
      }
    }

    class Orbs {
      constructor() {
        this.orbs = [];
        this.colorAngle = opts.initialColorAngle;
        for (let i = 0; i < opts.numberOrbs; i++) {
          this.orbs.push(new Orb(opts.orbRadius, null));
        }
      }
      run() {
        this.phaseColor();
        for (let i = 0; i < this.orbs.length; i++) {
          for (let j = i + 1; j < this.orbs.length; j++) {
            this.compare(this.orbs[i], this.orbs[j]);
          }
          this.orbs[i].color = this.color;
          this.orbs[i].run();
        }
      }
      compare(orbA, orbB) {
        const distance = orbA.position.subtract(orbB.position).length();
        if (distance <= opts.minProximity) {
          linecxt.beginPath();
          linecxt.strokeStyle = this.color;
          linecxt.globalAlpha = opts.globalAlpha;
          linecxt.moveTo(orbA.position.x, orbA.position.y);
          linecxt.lineTo(orbB.position.x, orbB.position.y);
          linecxt.stroke();
          linecxt.closePath();
        }
      }
      phaseColor() {
        const r = Math.floor(Math.sin(opts.colorFrequency * this.colorAngle + 0) * 127 + 128);
        const g = Math.floor(Math.sin(opts.colorFrequency * this.colorAngle + (2 * Math.PI) / 3) * 127 + 128);
        const b = Math.floor(Math.sin(opts.colorFrequency * this.colorAngle + (4 * Math.PI) / 3) * 127 + 128);
        this.color = `rgba(${r},${g},${b},1)`;
        this.colorAngle += opts.colorAngleIncrement;
      }
    }

    const initialize = () => {
      canvasTop = canvasTopRef.current;
      canvasBottom = canvasBottomRef.current;
      linecxt = canvasTop.getContext("2d");
      cxt = canvasBottom.getContext("2d");
      window.addEventListener("resize", resize);
      resize();
    };

    const resize = () => {
      width = opts.manualWidth || window.innerWidth;
      height = opts.manualHeight || window.innerHeight;
      setup();
    };

    const setup = () => {
      canvasTop.width = width;
      canvasTop.height = height;
      canvasBottom.width = width;
      canvasBottom.height = height;
      cxt.fillStyle = opts.background;
      cxt.fillRect(0, 0, width, height);
      orbs = new Orbs();
      if (animationFrame) cancelAnimationFrame(animationFrame);
      draw();
    };

    const draw = () => {
      cxt.fillStyle = opts.background;
      cxt.fillRect(0, 0, width, height);
      orbs.run();
      animationFrame = requestAnimationFrame(draw);
    };

    initialize();

    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(() => {});
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div style={{ position: "fixed", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Background Audio */}
      <audio ref={audioRef} src="bgm.mp3" loop autoPlay style={{ display: 'none' }} />

      {/* Canvas */}
      <canvas ref={canvasBottomRef} style={{ position: "absolute", top: 0, left: 0 }} />
      <canvas ref={canvasTopRef} style={{ position: "absolute", top: 0, left: 0 }} />

      {/* Center Text + Button */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", zIndex: 1 }}>
      <h1 style={{
    fontFamily: "'Cinzel', serif",
    fontSize: "3.5rem",
    color: "#cccccc",
    textShadow: "0 0 2px #333, 0 0 5px #222",
    letterSpacing: "2px",
    marginBottom: "30px"
}}>
    WELCOME TO <br /> BHOOT BHAVISHYA
</h1>

<button 
  style={{
    padding: "12px 28px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "6px",
    background: "rgba(0, 0, 0, 0.5)",
    color: "#ccc",
    fontFamily: "'Quicksand', sans-serif",
    fontSize: "1.2rem",
    letterSpacing: "1px",
    cursor: "pointer",
    transition: "all 0.4s ease",
    backdropFilter: "blur(4px)",
    boxShadow: "0 0 8px rgba(255,255,255,0.1)",
  }}
  onClick={() => navigate("/birth-input")}
  onMouseOver={(e) => {
    e.target.style.background = "rgba(255,255,255,0.1)";
    e.target.style.color = "white";
    e.target.style.transform = "scale(1.05)";
    e.target.style.boxShadow = "0 0 12px rgba(255,255,255,0.2)";
  }}
  onMouseOut={(e) => {
    e.target.style.background = "rgba(0,0,0,0.5)";
    e.target.style.color = "#ccc";
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow = "0 0 8px rgba(255,255,255,0.1)";
  }}
>
  Enter The Darkness
</button>

      </div>
    </div>
  );
};

export default Intro;
