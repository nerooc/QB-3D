import React, { Suspense, useLayoutEffect } from 'react';
import { Vector3 } from 'three';
import { PerspectiveCamera } from '@react-three/drei';

import { useStore } from '../store';

const PlayerModel: React.FC = () => {
  const player = useStore((s: any) => s.player);
  const camera = useStore((s: any) => s.camera);
  const v = new Vector3();

  useLayoutEffect(() => {
    // Ustawiamy kamerę w odpowiedniej pozycji
    camera.current.rotation.set(0, Math.PI, 0);
    camera.current.position.set(0, 4, 10); // 0, 1.5, -8
    camera.current.lookAt(
      v.set(
        player.current.position.x,
        player.current.position.y,
        player.current.position.z + 10,
      ),
    );
    camera.current.rotation.z = Math.PI;
    player.current.rotation.y = Math.PI;
  }, [player, camera]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={camera}
        fov={75}
        rotation={[0, Math.PI, 0]}
        position={[0, 10, -10]}
      />
      <mesh ref={player} position={[0, 1, 2]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="purple" />
      </mesh>
    </>
  );
};

const Player: React.FC = () => {
  return <PlayerModel></PlayerModel>;
};

export default Player;
