import React, { useLayoutEffect } from 'react';
import { useTexture } from '@react-three/drei';
import { Color, RepeatWrapping } from 'three';
import { PLANE_SIZE } from '../constants';
import gridPurple from '../assets/textures/grid-purple.png';

const Ground: React.FC = () => {
  const texture = useTexture(gridPurple);
  const color = new Color(0x000000);
  const TEXTURE_SIZE = PLANE_SIZE * 0.05;

  // Handle texture settings
  useLayoutEffect(() => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(TEXTURE_SIZE, TEXTURE_SIZE);
    texture.anisotropy = 16;
  }, [texture]);

  return (
    <mesh receiveShadow visible rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry
        attach="geometry"
        args={[PLANE_SIZE, PLANE_SIZE, 1, 1]}
      />
      <meshStandardMaterial
        color={color.set(0xffffff)}
        emissiveMap={texture}
        emissive={color.set(0xab05cc)}
        emissiveIntensity={0}
        attach="material"
        map={texture}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
};

export default Ground;
