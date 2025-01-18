import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

function MandalaRing() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001;
    }
  });

  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    config: { mass: 5, tension: 200, friction: 50 },
  });

  return (
    <animated.mesh ref={meshRef} scale={scale}>
      <torusGeometry args={[10, 0.4, 32, 200]} />
      <meshStandardMaterial 
        color="#ffd700"
        metalness={0.7}
        roughness={0.2}
        emissive="#ff4400"
        emissiveIntensity={0.2}
      />
    </animated.mesh>
  );
}

function PlanetarySystem({ isActive }) {
  const planets = [
    { name: 'Sun', distance: 4, size: 0.8, color: '#ffd700', speed: 0.001, emissive: '#ff4400' },
    { name: 'Moon', distance: 6, size: 0.6, color: '#ffffff', speed: 0.002, emissive: '#4169e1' },
    { name: 'Mars', distance: 8, size: 0.5, color: '#ff4400', speed: 0.0015, emissive: '#8b0000' },
    { name: 'Mercury', distance: 10, size: 0.4, color: '#c0c0c0', speed: 0.003, emissive: '#708090' },
    { name: 'Jupiter', distance: 12, size: 0.9, color: '#ffa500', speed: 0.0008, emissive: '#daa520' },
    { name: 'Venus', distance: 14, size: 0.5, color: '#ff69b4', speed: 0.0012, emissive: '#c71585' },
    { name: 'Saturn', distance: 16, size: 0.7, color: '#f0e68c', speed: 0.0006, emissive: '#bdb76b' },
  ];

  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {planets.map((planet, index) => (
        <Planet key={index} {...planet} isActive={isActive} />
      ))}
    </group>
  );
}

function Planet({ name, distance, size, color, speed, emissive, isActive }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current && isActive) {
      const angle = clock.getElapsedTime() * speed;
      meshRef.current.position.x = Math.cos(angle) * distance;
      meshRef.current.position.z = Math.sin(angle) * distance;
      meshRef.current.rotation.y += 0.01;
    }
  });

  const { scale } = useSpring({
    scale: hovered ? 1.2 : 1,
    config: { tension: 300, friction: 10 },
  });

  return (
    <group>
      {/* Planet orbit path */}
      <mesh rotation-x={Math.PI / 2}>
        <ringGeometry args={[distance - 0.1, distance + 0.1, 64]} />
        <meshBasicMaterial color="#ffffff" opacity={0.1} transparent />
      </mesh>
      
      {/* Planet */}
      <animated.mesh
        ref={meshRef}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.7}
          emissive={hovered ? emissive : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
        
        {/* Planet name label */}
        <Text
          position={[0, size + 0.5, 0]}
          fontSize={0.3}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor={emissive}
        >
          {name}
        </Text>
      </animated.mesh>
    </group>
  );
}

function RashiSymbols({ isActive }) {
  const rashis = [
    'Mesha', 'Vrishabha', 'Mithuna', 'Karka',
    'Simha', 'Kanya', 'Tula', 'Vrishchika',
    'Dhanu', 'Makara', 'Kumbha', 'Meena'
  ];

  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {rashis.map((rashi, index) => {
        const angle = (index / 12) * Math.PI * 2;
        const radius = 10;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <group key={index} position={[x, y, 0]} rotation={[0, 0, -angle]}>
            <Text
              fontSize={0.5}
              color="#ffd700"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#ff4400"
            >
              {rashi}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

export default function ZodiacScene({ activeTab = 'rashi' }) {
  return (
    <Canvas camera={{ position: [0, 15, 30], fov: 60 }}>
      <color attach="background" args={['#000308']} />
      <fog attach="fog" args={['#000308', 20, 80]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
      
      <group position={[0, 0, 0]}>
        <MandalaRing />
        <RashiSymbols isActive={activeTab === 'rashi'} />
        <PlanetarySystem isActive={activeTab === 'planets'} />
      </group>
      
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        maxDistance={50}
        minDistance={10}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}