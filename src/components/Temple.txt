"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

/* =====================
   AUDIO HOOK
===================== */
function useAudioReactive(url: string) {
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const { camera } = useThree();

  useEffect(() => {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const audio = new THREE.Audio(listener);
    const loader = new THREE.AudioLoader();
    loader.load(url, (buffer) => {
      audio.setBuffer(buffer);
      audio.setLoop(true);
      audio.setVolume(0.6);
      audio.play();

      const analyserNode = new THREE.AudioAnalyser(audio, 64);
      setAnalyser(analyserNode);
    });
  }, [url, camera]);

  return analyser;
}

/* =====================
   CINEMATIC CAMERA
===================== */
function MaxCinematicCamera({ analyser }: { analyser: AnalyserNode | null }) {
  const cam = useRef<THREE.PerspectiveCamera>(null);

  const paths = useMemo(() => ({
    establish: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-14, 10, 35),
      new THREE.Vector3(-8, 8, 25),
      new THREE.Vector3(-3, 6, 18),
    ]),
    reveal: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3, 6, 18),
      new THREE.Vector3(-1, 4, 12),
      new THREE.Vector3(0, 3, 8),
    ]),
    hero: new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 3, 8),
      new THREE.Vector3(0.5, 2.8, 6),
      new THREE.Vector3(0, 3, 5.5),
    ]),
  }), []);

  useFrame(({ clock }) => {
    if (!cam.current) return;
    const t = clock.elapsedTime;
    const pos = new THREE.Vector3();
    let fov = 72;

    if (t < 5) pos.copy(paths.establish.getPoint(t / 5));
    else if (t < 9) pos.copy(paths.reveal.getPoint((t - 5) / 4));
    else if (t < 12) pos.copy(paths.hero.getPoint((t - 9) / 3));
    else {
      const idle = t - 12;
      pos.set(0, 3, 5.5);
      pos.x += Math.sin(idle * 0.12) * 0.5;
      pos.y += Math.sin(idle * 0.3) * 0.25;
      pos.z += Math.sin(idle * 0.07) * 0.2;

      if (analyser) {
        const avg = analyser.getAverageFrequency() / 255;
        fov = 52 + avg * 3; // stronger breathing zoom
        cam.current.rotation.z = Math.sin(idle * 0.25) * 0.01 + avg * 0.04;
      } else fov = 52;
    }

    cam.current.position.copy(pos);
    cam.current.fov = fov;
    cam.current.updateProjectionMatrix();
    cam.current.lookAt(0, 7, -37);
  });

  return <perspectiveCamera ref={cam} makeDefault position={[-14, 10, 35]} fov={72} />;
}

/* =====================
   ENVIRONMENT COMPONENTS
===================== */
function Torii({ z, intensity = 1 }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current) {
      const scale = 0.9 + Math.sin(Date.now() * 0.001) * 0.03 * intensity;
      ref.current.scale.set(scale, scale, scale);
    }
  });
  return (
    <group ref={ref} position={[0, 0, z]}>
      {[-1.2, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 1.5, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 3, 16]} />
          <meshStandardMaterial color="#c1121f" />
        </mesh>
      ))}
      <mesh position={[0, 3.1, 0]}>
        <boxGeometry args={[3.2, 0.35, 0.4]} />
        <meshStandardMaterial color="#c1121f" />
      </mesh>
      <mesh position={[0, 2.7, 0]}>
        <boxGeometry args={[2.6, 0.25, 0.3]} />
        <meshStandardMaterial color="#780000" />
      </mesh>
    </group>
  );
}

function ToriiPath({ analyser }: { analyser: AnalyserNode | null }) {
  return <>
    {Array.from({ length: 28 }).map((_, i) => {
      const intensity = analyser ? analyser.getAverageFrequency()/255 : 1;
      return <Torii key={i} z={-i*3.4} intensity={intensity} />
    })}
  </>;
}

function StonePath() {
  return (
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,0,-45]}>
      <planeGeometry args={[4,120]} />
      <meshStandardMaterial color="#adb5bd" roughness={1} />
    </mesh>
  );
}

function Lanterns({ analyser }: { analyser: AnalyserNode | null }) {
  const lightsRef = useRef<THREE.Mesh[]>([]);
  useFrame(() => {
    if (!analyser) return;
    const avg = analyser.getAverageFrequency() / 255;
    lightsRef.current.forEach((l) => {
      if (l) (l.material as THREE.MeshStandardMaterial).emissiveIntensity = 1 + avg*1.5;
    });
  });
  return <>
    {Array.from({ length: 18 }).map((_, i) => {
      const z = -i*6;
      return (
        <group key={i} position={[2.2,0,z]}>
          <mesh position={[0,0.6,0]}>
            <cylinderGeometry args={[0.15,0.15,1.2,12]} />
            <meshStandardMaterial color="#6c757d" />
          </mesh>
          <mesh ref={el => lightsRef.current[i]=el!} position={[0,1.5,0]}>
            <boxGeometry args={[0.5,0.6,0.5]} />
            <meshStandardMaterial emissive="#ffd166" color="#fff3b0" />
          </mesh>
        </group>
      )
    })}
  </>;
}

function Trees({ analyser }: { analyser: AnalyserNode | null }) {
  return <>
    {Array.from({ length:20 }).map((_,i)=>{
      const z=-i*6;
      const intensity = analyser ? analyser.getAverageFrequency()/255 : 1;
      return <group key={i} position={[-3.2,0,z]} scale={[1+intensity*0.15,1+intensity*0.15,1+intensity*0.15]}>
        <mesh position={[0,1.2,0]}>
          <cylinderGeometry args={[0.25,0.35,2.4,12]} />
          <meshStandardMaterial color="#3a5a40" />
        </mesh>
        <mesh position={[0,2.8,0]}>
          <sphereGeometry args={[1.2,16,16]} />
          <meshStandardMaterial color="#2d6a4f" />
        </mesh>
      </group>
    })}
  </>;
}

function Fireflies({ analyser }: { analyser: AnalyserNode | null }) {
  const ref = useRef<THREE.Points>(null);
  const count=900;
  const positions = useMemo(()=>{
    const arr=new Float32Array(count*3);
    for(let i=0;i<count*3;i+=3){
      arr[i]=Math.random()*10-5;
      arr[i+1]=Math.random()*3+0.5;
      arr[i+2]=-Math.random()*90;
    }
    return arr;
  },[]);
  useFrame(({clock})=>{
    if(!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime*0.02;
    if(analyser){
      const avg = analyser.getAverageFrequency()/255;
      ref.current.scale.setScalar(1+avg*0.5);
    }
  });
  return <points ref={ref}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[positions,3]} />
    </bufferGeometry>
    <pointsMaterial size={0.06} color="#ffd166" transparent opacity={0.8} />
  </points>;
}

function SakuraPetals({ analyser }: { analyser: AnalyserNode | null }) {
  const ref = useRef<THREE.Points>(null);
  const count=600;
  const positions=useMemo(()=>{
    const arr=new Float32Array(count*3);
    for(let i=0;i<count*3;i+=3){
      arr[i]=Math.random()*12-6;
      arr[i+1]=Math.random()*6+0.5;
      arr[i+2]=-Math.random()*90;
    }
    return arr;
  },[]);
  useFrame(({clock})=>{
    if(!ref.current) return;
    ref.current.rotation.z = Math.sin(clock.elapsedTime*0.1)*0.3;
    for(let i=0;i<positions.length;i+=3){
      positions[i+1]-=0.003;
      if(positions[i+1]<0) positions[i+1]=Math.random()*6+4;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    if(analyser){
      const avg = analyser.getAverageFrequency()/255;
      ref.current.material.size = 0.05+avg*0.03;
    }
  });
  return <points ref={ref}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[positions,3]} />
    </bufferGeometry>
    <pointsMaterial size={0.05} color="#ffb6c1" transparent opacity={0.9} />
  </points>;
}

/* =====================
   FULL SCENE
===================== */
function Scene() {
  const analyser = useAudioReactive("/sounds/music.mp3"); // replace with your music
  const fogColor = useRef(new THREE.Color("#1b263b"));
  useFrame(()=>{
    if(analyser){
      const avg = analyser.getAverageFrequency()/255;
      fogColor.current.setHSL(0.6-avg*0.1,0.5,0.1+avg*0.2);
    }
  });

  return <>
    <Sky sunPosition={[0.2,1,-1]} turbidity={8} rayleigh={0.6} mieCoefficient={0.005} mieDirectionalG={0.8} />
    <ambientLight intensity={0.5+ (analyser? analyser.getAverageFrequency()/255:0)} />
    <directionalLight position={[5,10,5]} intensity={1.4 + (analyser? analyser.getAverageFrequency()/255:0.5)} />

    <fog attach="fog" args={[fogColor.current, 8, 50]} />

    <MaxCinematicCamera analyser={analyser} />

    <StonePath />
    <ToriiPath analyser={analyser} />
    <Lanterns analyser={analyser} />
    <Trees analyser={analyser} />
    <Fireflies analyser={analyser} />
    <SakuraPetals analyser={analyser} />

    <OrbitControls enablePan={false} maxPolarAngle={Math.PI/2.1} minDistance={5} maxDistance={18} />
  </>;
}

/* =====================
   EXPORT
===================== */
export default function ToriiUltimateAudioReactiveCinematic() {
  return (
    <motion.div
      initial={{ opacity:0 }}
      animate={{ opacity:1 }}
      transition={{ duration:2 }}
      style={{ width:"100vw", height:"100vh", background:"transparent"}}
    >
      <Canvas>
        <Scene />
      </Canvas>
    </motion.div>
  );
}
