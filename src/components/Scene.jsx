import React, { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import Globe from "./globe.jsx";

const Scene = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => void window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div id="globe-container" style={{ height: "100vh", width: "100%" }}>
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={isMobile ? [0, 0, 8] : [0, 0, 6]}
          fov={isMobile ? 60 : 45}
        />
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <hemisphereLight args={["#ffffff", "#000000", 0.3]} />
        <Globe position={[0, 0, 0]} isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default Scene;
