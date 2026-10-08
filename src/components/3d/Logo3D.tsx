import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createPlusNineGeometry } from './logoGeometry';

interface Logo3DProps {
  isIntro?: boolean;
  introProgress?: number;
  scale?: number;
}

export const Logo3D: React.FC<Logo3DProps> = ({ isIntro = true, introProgress = 0, scale = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const outlineMeshRef = useRef<THREE.Mesh>(null);

  // Generate ExtrudeGeometry
  const geometry = useMemo(() => createPlusNineGeometry(), []);

  // Front & Back Face Material (Glossy White Titanium Lacquer)
  const faceMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffffff'),
      roughness: 0.1,
      metalness: 0.85,
    });
  }, []);

  // Extruded Sides & Bevel Material (Polished Liquid Chrome)
  const sideChromeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d1d5db'),
      metalness: 0.98,
      roughness: 0.08,
    });
  }, []);

  // Dual material tuple for Three.js ExtrudeGeometry
  const materials = useMemo(() => [faceMaterial, sideChromeMaterial], [faceMaterial, sideChromeMaterial]);

  // Darkened back-plate contour matching pfp_chrome2_black.png
  const darkRimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0a0a0d'),
      metalness: 0.9,
      roughness: 0.2,
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const { pointer } = state;

    if (isIntro) {
      // Deterministic cinematic rotation sequence
      // Rotates through 2 full 360-degree cycles, decelerating toward front-facing finish
      const targetAngle = -0.6 + introProgress * (Math.PI * 4 + 0.6);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetAngle, 0.1);

      // Subtle breathing wobble tilt
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.x = Math.sin(time * 1.8) * 0.1 + pointer.y * 0.12;
      groupRef.current.rotation.z = Math.cos(time * 1.4) * 0.05 + pointer.x * 0.08;
    } else {
      // Subtle interactive mouse tilt
      const targetRotY = pointer.x * 0.35;
      const targetRotX = -pointer.y * 0.25;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 4);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 4);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, pointer.x * -0.1, delta * 4);
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* Primary 3D PlusNine Object with Dual Face/Side Chrome Materials */}
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={materials}
        castShadow
        receiveShadow
      />

      {/* Subtle depth back-rim mesh */}
      <mesh
        ref={outlineMeshRef}
        geometry={geometry}
        material={darkRimMaterial}
        position={[0, 0, -0.14]}
        scale={[1.025, 1.025, 1.01]}
      />
    </group>
  );
};
