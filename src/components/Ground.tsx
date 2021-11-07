import React, { useRef } from 'react';
import { PLANE_SIZE } from '../constants';
import { useTexture } from '@react-three/drei';

import gridPurple from '../assets/textures/grid-purple.png';
import { Color } from 'three';

const Ground: React.FC = () => {
  const plane = useRef();
  const texture = useTexture(gridPurple);
  const color = new Color(0x000000);

  return (
    <mesh ref={plane} receiveShadow visible rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry
        attach="geometry"
        args={[PLANE_SIZE, PLANE_SIZE, 1, 1]}
      />
      <meshStandardMaterial
        color={color.set(0xffffff)}
        emissiveMap={texture}
        emissive={color.set(0xffffff)}
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
