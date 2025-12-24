"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useRef<any>, useMemo, useState } from "react";
import * as THREE from "three";
/* =====================
   SNOW PARTICLES (AIR)
===================== */
function SnowParticles() {
  const ref = useRef<any>();
  const count = 1200;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 25;
      arr[i + 1] = Math.random() * 10;
      arr[i + 2] = (Math.random() - 0.5) * 25;
    }
    return arr;
  }, [])

  useFrame(() => {
    ref.current.rotation.y += 0.0006;
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="white" transparent opacity={0.8} />
    </points>
  )
}

/* =====================
   SNOW GROUND
===================== */
function SnowGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.9}
        emissive="#e0f7ff"
        emissiveIntensity={0.25}
      />
    </mesh>
  )
}

/* =====================
   CAT (CUSTOM GEOMETRY)
===================== */
function Cat() {
  const head = useRef<any>();
  const eyes = useRef<any>([]);

  useFrame(({ clock }) => {
    head.current.rotation.y = Math.sin(clock.elapsedTime) * 0.2;
    eyes.current.forEach((eye) => {
      eye.scale.y = 0.8 + Math.sin(clock.elapsedTime * 4) * 0.2;
    })
  })

  return (
    <group position={[-2, -1.2, -2]} scale={0.6}>
      <mesh ref={head}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#b08968" />
      </mesh>

      {/* Eyes */}
      {[-0.2, 0.2].map((x, i) => (
        <mesh
          key={i}
          ref={(el) => (eyes.current[i] = el)}
          position={[x, 0.1, 0.5]}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial emissive="#ffffff" emissiveIntensity={1.5} />
        </mesh>
      ))}

      {/* Body */}
      <mesh position={[0, -0.8, -0.2]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#9c6644" />
      </mesh>
    </group>
  )
}

/* =====================
   CHRISTMAS TREE
===================== */
function ChristmasTree() {
  const lights = useRef<any>([]);

  useFrame(({ clock }) => {
    lights.current.forEach((l, i) => {
      if (l)
        l.material.emissiveIntensity =
          0.6 + Math.sin(clock.elapsedTime * 4 + i) * 0.5;
    });
  });

  return (
    <group position={[0, -1.3, -3]} scale={0.9}>
      {[1.5, 1.1, 0.7].map((h, i) => (
        <mesh key={i} position={[0, h - 1.1, 0]}>
          <coneGeometry args={[1.4 - i * 0.4, 1.4, 24]} />
          <meshStandardMaterial color="#0b6623" />
        </mesh>
      ))}

      {/* Lights */}
      {Array.from({ length: 80 }).map((_, i) => {
        const a = Math.random() * Math.PI * 2;
        const r = 0.4 + Math.random() * 0.6;
        const y = Math.random() * 2 - 1;
        const colors = ["#ff4d6d", "#ffd166", "#4cc9f0", "#c77dff"];

        return (
          <mesh
            key={i}
            ref={(el) => (lights.current[i] = el)}
            position={[Math.cos(a) * r, y, Math.sin(a) * r]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              emissive={colors[i % colors.length]}
              emissiveIntensity={1}
              color="black"
            />
          </mesh>
        )
      })}
    </group>
  )
}

/* =====================
   DREAM HOUSE (PURPLE)
===================== */
function DreamHouse() {
  return (
    <group position={[2.5, -1.3, -3]} scale={0.7}>
      <mesh>
        <boxGeometry args={[2.5, 1.4, 2]} />
        <meshStandardMaterial color="#9d4edd" />
      </mesh>

      <mesh position={[0, 1, 0]}>
        <coneGeometry args={[2.3, 1.2, 4]} />
        <meshStandardMaterial color="#5a189a" />
      </mesh>

      {/* Windows */}
      {[-0.7, 0.7].map((x, i) => (
        <mesh key={i} position={[x, 0, 1.01]}>
          <boxGeometry args={[0.4, 0.4, 0.05]} />
          <meshStandardMaterial emissive="#ffd6ff" emissiveIntensity={1.3} />
        </mesh>
      ))}
    </group>
  )
}

/* =====================
   FIREWORKS
===================== */
function Fireworks() {
  const ref = useRef<any>();
  const count = 300;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 15;
    }
    return arrb
  }, [])

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.4;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#ffd166" opacity={0.8} />
    </points>
  )
}

/* =====================
   SCENE
===================== */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 6, 5]} intensity={1.6} />
      <spotLight position={[0, 6, 3]} intensity={2} angle={0.5} />

      <SnowParticles />
      <SnowGround />
      <Cat />
      <ChristmasTree />
      <DreamHouse />
      <Fireworks />

      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  )
}

function SoundButton() {
  const { camera } = useThree();
  const [audio, setAudio] = useState(null);

  // Load sound only once
  if (!audio) {
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const sound = new THREE.Audio(listener)
    const loader = new THREE.AudioLoader()
    loader.load("/sounds/sounds.mp3", (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(false);
      sound.setVolume(0.7);
    })
    setAudio(sound);
  }

  const handleClick = () => {
    if (audio && !audio.isPlaying) {
      audio.play();
      alert('hi');
    }
  }

  return (
    <group>
      <mesh
        position={[0, -0.5, 2]} // in front of camera
        scale={[1.2, 0.4, 0.2]}
        onClick={handleClick}
      >
        <boxGeometry args={[1, 0.3, 0.2]} />
        <meshStandardMaterial color="#ff69b4" />
      </mesh>

      <Text
        position={[0, -0.48, 2.11]}
        fontSize={0.1}
        color="#fff"
        anchorX="center"
        anchorY="middle"
      >
        Click Here!
      </Text>
    </group>
  )
}

/* =====================
   EXPORT DEFAULT
===================== */
export default function ChristmasWorld() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background:
          "radial-gradient(circle at top, #3a0ca3 0%, #10002b 50%, #030014 100%)",
        overflow: "hidden",
        position: "relative",
        fontFamily: "Georgia, serif",
      }}
    >
      <Canvas
        camera={{ position: [0, 2, 8], fov: 55 }}
        dpr={[1, 1.4]}
      >
        <fog attach="fog" args={["#10002b", 6, 18]} />
        <Scene />
        <SoundButton />
      </Canvas>

      {/* TEXT */}
      <div
        style={{
          position: "absolute",
          bottom: "7%",
          width: "100%",
          textAlign: "center",
          color: "white",
          pointerEvents: "none",
        }}
      >
        <h1 style={{ fontSize: "1.4rem", letterSpacing: "0.15em" }}>
          Merry Christmas
        </h1>
        <p style={{ fontSize: "0.85rem", opacity: 0.9 }}>
          For <strong>Amethyst</strong><br />
          Bethany Madison
        </p>
        <div style={{ fontSize: "0.7rem", opacity: 0.7 }}>— Mori</div>
      </div>
    </div>
  )
}
