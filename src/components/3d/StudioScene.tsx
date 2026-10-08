import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import { Logo3D } from './Logo3D';

interface StudioSceneProps {
  isIntro?: boolean;
  introProgress?: number;
  scale?: number;
}

export const StudioScene: React.FC<StudioSceneProps> = ({
  isIntro = true,
  introProgress = 0,
  scale = 0.65
}) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 42 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Studio Lighting Rig */}
      <ambientLight intensity={0.8} />

      {/* Hemisphere Light for natural ground/sky gradient reflections */}
      <hemisphereLight args={['#ffffff', '#1e1e24', 1.2]} />
      
      {/* Key Directional Light */}
      <directionalLight
        position={[6, 8, 7]}
        intensity={2.8}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Cool Rim Light from Back-Left for Chrome Chamfers */}
      <directionalLight
        position={[-8, 4, -5]}
        intensity={3.5}
        color="#e0e7ff"
      />

      {/* Warm Fill Light from Bottom-Right */}
      <directionalLight
        position={[5, -5, 3]}
        intensity={1.4}
        color="#fef3c7"
      />

      {/* Specular Glint Highlight on Front Geometry */}
      <pointLight position={[0, 1.5, 4.5]} intensity={2.2} color="#ffffff" />

      {/* Floating 3D Logo Object */}
      <Suspense fallback={null}>
        <Float
          speed={isIntro ? 1.5 : 1.2}
          rotationIntensity={isIntro ? 0.2 : 0.15}
          floatIntensity={isIntro ? 0.3 : 0.2}
        >
          <Logo3D isIntro={isIntro} introProgress={introProgress} scale={scale} />
        </Float>

        {/* Grounding Floor Shadow */}
        <ContactShadows
          position={[0, -2.8, 0]}
          opacity={0.65}
          scale={11}
          blur={2.4}
          far={5}
        />
      </Suspense>
    </Canvas>
  );
};
