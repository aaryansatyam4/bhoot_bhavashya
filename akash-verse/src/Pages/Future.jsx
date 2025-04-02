import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls, Stars } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FutureScene = ({ particleRef, textRef }) => {
  useFrame(() => {
    if (particleRef.current) {
      particleRef.current.rotation.y -= 0.004;
    }
    if (textRef.current) {
      textRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight color="#00ffff" position={[1, 0, 0]} intensity={1} />
      <directionalLight color="#11E8BB" position={[0.75, 1, 0.5]} intensity={1} />
      <directionalLight color="#ff00ff" position={[-1, 1, 0.5]} intensity={1} />

      <group ref={particleRef}>
        {Array.from({ length: 1000 }).map((_, i) => (
          <mesh key={i} position={[
            (Math.random() - 0.5) * 1000,
            (Math.random() - 0.5) * 1000,
            (Math.random() - 0.5) * 1000
          ]} rotation={[
            Math.random() * 2,
            Math.random() * 2,
            Math.random() * 2
          ]}>
            <tetrahedronGeometry args={[0.4, 1]} />
            <meshPhongMaterial color="white" flatShading />
          </mesh>
        ))}
      </group>

      <Text
        ref={textRef}
        position={[0, 0, 0]}
        fontSize={20}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        
      </Text>

      <Stars radius={300} depth={60} count={5000} factor={7} fade />
      <OrbitControls enableZoom={false} />
    </>
  );
};

export default function Future() {
  const particleRef = useRef();
  const textRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const { story, kundli, name } = location.state || {};

  useEffect(() => {
    if (!story) {
      const timer = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [story, navigate]);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "black", position: "relative", overflow: "hidden" }}>
      {story && (
        <div style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "linear-gradient(to bottom, #0f0f2f, #1a001a)",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 0 25px rgba(0, 255, 255, 0.2)",
          color: "#f5f5f5",
          width: "80%",
          maxWidth: "600px",
          zIndex: 10,
          fontFamily: "'Playfair Display', serif"
        }}>
          <h1 style={{ fontSize: "1.8rem", marginBottom: "10px" }}>✨ Future Life Prediction for {name}</h1>
          <h3>🌙 Moon Nakshatra (Future's Guide): <span style={{ color: "#bbf" }}>{kundli?.moonNakshatra}</span></h3>
          <h3>☄️ Ketu Nakshatra (Past's Impression): <span style={{ color: "#fbf" }}>{kundli?.ketuNakshatra}</span></h3>
          <h2 style={{ marginTop: "15px", fontSize: "1.3rem" }}>🌟 Future Life Story</h2>
          <p style={{
            marginTop: "10px",
            lineHeight: "1.6",
            background: "#111",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 255, 255, 0.2)",
            maxHeight: "200px",
            overflowY: "auto"
          }}>
            {story}
          </p>
        </div>
      )}

      <Canvas camera={{ position: [0, 0, 300], fov: 75 }}>
        <FutureScene particleRef={particleRef} textRef={textRef} />
      </Canvas>
    </div>
  );
}
