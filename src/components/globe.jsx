import React, { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { locationData } from "../components/About.jsx";

gsap.registerPlugin(ScrollTrigger);

const Globe = ({ position, isMobile }) => {
  // Refs for Three.js objects
  const groupRef = useRef(null);
  const meshRef = useRef(null);
  const markerRef = useRef(null);
  const timelineRef = useRef(null);

  // State management
  const [autoRotate, setAutoRotate] = useState(true);
  const [controlsEnabled, setControlsEnabled] = useState(false);

  // Three.js hooks
  const { camera } = useThree();
  const perspectiveCamera = camera;

  // Texture loading
  const earthTexture = useTexture("/assets/earth-texture.jpg");
  earthTexture.wrapS = THREE.RepeatWrapping;
  earthTexture.wrapT = THREE.RepeatWrapping;

  // Coordinate conversion
  const latLngToVector3 = (lat, lng, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  // Animation control
  const resetAnimations = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    document.querySelectorAll(".location-reveal").forEach((element) => {
      element.classList.remove("visible");
      gsap.to(element, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.3,
      });
    });
  };

  const resetCamera = (index) => {
    const currentLocation = locationData[index];
    const markerPosition = latLngToVector3(
      currentLocation.lat,
      currentLocation.lng,
      2.1
    );
    const targetRotationY = -(((currentLocation.lng + 90) * Math.PI) / 180);
    const targetRotationX = (currentLocation.lat * Math.PI) / 180;

    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline();
    timelineRef.current = tl;

    tl.to(groupRef.current.rotation, {
      x: targetRotationX,
      y: targetRotationY,
      duration: 1,
      ease: "power2.inOut",
    }).to(perspectiveCamera.position, {
      x: markerPosition.x * 0.005,
      y: markerPosition.y * 0.005,
      z: isMobile ? 8 : 6,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: () => {
        perspectiveCamera.lookAt(markerPosition);
      },
    });
  };

  const rotateToMarker = (index) => {
    resetAnimations();
    setControlsEnabled(false);
    const currentLocation = locationData[index];
    const markerPosition = latLngToVector3(
      currentLocation.lat,
      currentLocation.lng,
      2.1
    );
    const targetRotationY = -(((currentLocation.lng + 90) * Math.PI) / 180);
    const targetRotationX = (currentLocation.lat * Math.PI) / 180;

    timelineRef.current = gsap
      .timeline()
      .to(groupRef.current.rotation, {
        x: targetRotationX,
        y: targetRotationY,
        duration: 2,
        ease: "power2.inOut",
      })
      .to(perspectiveCamera.position, {
        x: markerPosition.x * 0.005,
        y: markerPosition.y * 0.005,
        z: markerPosition.z * 1.2,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          perspectiveCamera.lookAt(markerPosition);
        },
      })
      .to(`#location-${index}`, {
        opacity: 1,
        visibility: "visible",
        duration: 2,
        onStart: () => {
          const element = document.querySelector(`#location-${index}`);
          if (element) element.classList.add("visible");
        },
        onComplete: () => {
          setControlsEnabled(true);
          setTimeout(() => {
            resetAnimations();
            resetCamera(index);
          }, 2000);
          if (index === 1) setAutoRotate(true);
        },
      });
  };

  useEffect(() => {
    if (groupRef.current) {
      const initialTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#globe-container",
          start: "top center",
          end: "center center",
          scrub: 1,
          onEnter: () => {
            setAutoRotate(true);
          },
        },
      });

      initialTl.fromTo(
        groupRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 1, ease: "back.out(1.2)" }
      );

      locationData.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: `#spacer${index}`,
          start: `top top`,
          end: `center top`,
          toggleActions: "play reverse play reverse",
          onEnter: () => {
            setAutoRotate(false);
            rotateToMarker(index);
          },
          onEnterBack: () => {
            rotateToMarker(index);
          },
          onLeaveBack: () => {
            index === 0 ? setAutoRotate(true) : setAutoRotate(false);
          },
        });
      });

      return () => {
        resetAnimations();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [perspectiveCamera]);

  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <>
      <OrbitControls
        enableRotate={controlsEnabled}
        enableZoom={false}
        enablePan={false}
        enableDamping={false}
      />

      <group ref={groupRef} position={position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial
            map={earthTexture}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>

        {locationData.map((location, index) => {
          const markerPosition = latLngToVector3(
            location.lat,
            location.lng,
            2.1
          );
          return (
            <group
              ref={markerRef}
              key={index}
              position={markerPosition}
              rotation={[0, 0, 0]}
            >
              <Text
                position={[0, 0, 0]}
                fontSize={0.05}
                color="#FF4444"
                anchorX="center"
                anchorY="middle"
              >
                📍
              </Text>
            </group>
          );
        })}
      </group>
    </>
  );
};

export default Globe;
