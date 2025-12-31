"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

/* =====================
   CAMERA BREATHING
===================== */
function CameraRig() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.4) * 0.12;
  });
  return <group ref={ref} />;
}

/* =====================
   TORII GATE
===================== */
function Torii({ z }: { z: number }) {
  return (
    <group position={[0, 0, z]}>
      {/* Pillars */}
      {[-1.2, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 1.5, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 3, 16]} />
          <meshStandardMaterial color="#c1121f" />
        </mesh>
      ))}

      {/* Top beam */}
      <mesh position={[0, 3.1, 0]}>
        <boxGeometry args={[3.2, 0.35, 0.4]} />
        <meshStandardMaterial color="#c1121f" />
      </mesh>

      {/* Secondary beam */}
      <mesh position={[0, 2.7, 0]}>
        <boxGeometry args={[2.6, 0.25, 0.3]} />
        <meshStandardMaterial color="#780000" />
      </mesh>
    </group>
  );
}

/* =====================
   TORII PATH
===================== */
function ToriiPath() {
  return (
    <>
      {Array.from({ length: 28 }).map((_, i) => (
        <Torii key={i} z={-i * 3.4} />
      ))}
    </>
  );
}

/* =====================
   STONE PATH
===================== */
function StonePath() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -45]}>
      <planeGeometry args={[4, 120]} />
      <meshStandardMaterial color="#adb5bd" roughness={1} />
    </mesh>
  );
}

/* =====================
   LANTERNS
===================== */
function Lanterns() {
  return (
    <>
      {Array.from({ length: 18 }).map((_, i) => {
        const z = -i * 6;
        return (
          <group key={i} position={[2.2, 0, z]}>
            <mesh position={[0, 0.6, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 1.2, 12]} />
              <meshStandardMaterial color="#6c757d" />
            </mesh>
            <mesh position={[0, 1.5, 0]}>
              <boxGeometry args={[0.5, 0.6, 0.5]} />
              <meshStandardMaterial
                emissive="#ffd166"
                emissiveIntensity={1.3}
                color="#fff3b0"
              />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

/* =====================
   TREES
===================== */
function Trees() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => {
        const z = -i * 6;
        return (
          <group key={i} position={[-3.2, 0, z]}>
            <mesh position={[0, 1.2, 0]}>
              <cylinderGeometry args={[0.25, 0.35, 2.4, 12]} />
              <meshStandardMaterial color="#3a5a40" />
            </mesh>
            <mesh position={[0, 2.8, 0]}>
              <sphereGeometry args={[1.2, 16, 16]} />
              <meshStandardMaterial color="#2d6a4f" />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

/* =====================
   FIREFLIES
===================== */
function Fireflies() {
  const ref = useRef<THREE.Points>(null);
  const count = 900;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = Math.random() * 10 - 5;
      arr[i + 1] = Math.random() * 3 + 0.5;
      arr[i + 2] = -Math.random() * 90;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current)
      ref.current.rotation.y = clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ffd166"
        transparent
        opacity={0.8}
      />
    </points>
  );
}

/* =====================
   SCENE
===================== */
function Scene() {
  return (
    <>
      <Sky sunPosition={[0.2, 1, -1]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.4} />
      <pointLight position={[0, 3, 0]} intensity={1.2} />

      <CameraRig />
      <StonePath />
      <ToriiPath />
      <Lanterns />
      <Trees />
      <Fireflies />

      <OrbitControls
        enablePan={false}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={5}
        maxDistance={18}
      />
    </>
  );
}

/* =====================
   EXPORT
===================== */
export default function ToriiPathWorld() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{ width: "100vw", height: "100vh", background: "#000" }}
    >
      <Canvas camera={{ position: [0, 3, 8], fov: 55 }}>
        <fog attach="fog" args={["#1b263b", 8, 50]} />
        <Scene />
      </Canvas>
    </motion.div>
  );
}