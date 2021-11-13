import React, { Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import { Vector3 } from 'three';

import { useStore, mutation } from '../store';

const PlayerModel: React.FC = () => {
  const player = useStore((s: any) => s.player);
  const camera = useStore((s: any) => s.camera);
  const v = new Vector3();

  // Saving the ref to controls state
  const controlsRef = useRef<{ left: boolean; right: boolean }>(
    useStore.getState().controls,
  );

  useEffect(
    () =>
      useStore.subscribe(
        (controls: { left: boolean; right: boolean }) =>
          (controlsRef.current = controls),
        (state) => state.controls,
      ),
    [],
  );

  useLayoutEffect(() => {
    // We set up the camera in the correct position
    camera.current.rotation.set(0, Math.PI, 0);
    camera.current.position.set(0, 4, 10);
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

  useFrame((_, delta) => {
    const accelDelta = 1 * delta * 2;
    const { left, right } = controlsRef.current;

    // Forward Movement
    player.current.position.z -= mutation.gameSpeed * delta * 165;

    // Lateral Movement
    if (mutation.gameOver) {
      mutation.horizontalVelocity = 0;
    }

    player.current.position.x += mutation.horizontalVelocity * delta * 165;

    camera.current.position.z = player.current.position.z + 13.5;
    camera.current.position.y = player.current.position.y + 5;
    camera.current.position.x = player.current.position.x;

    if ((left && right) || (!left && !right)) {
      if (mutation.horizontalVelocity < 0) {
        if (mutation.horizontalVelocity + accelDelta > 0) {
          mutation.horizontalVelocity = 0;
        } else {
          mutation.horizontalVelocity += accelDelta;
        }
      }

      if (mutation.horizontalVelocity > 0) {
        if (mutation.horizontalVelocity - accelDelta < 0) {
          mutation.horizontalVelocity = 0;
        } else {
          mutation.horizontalVelocity -= accelDelta;
        }
      }
    }

    if (!mutation.gameOver && mutation.gameSpeed > 0) {
      if (left && !right) {
        mutation.horizontalVelocity = Math.max(
          -0.7,
          mutation.horizontalVelocity - accelDelta,
        );
      }

      if (!left && right) {
        mutation.horizontalVelocity = Math.min(
          0.7,
          mutation.horizontalVelocity + accelDelta,
        );
      }
    }
  });

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
  return (
    <Suspense fallback={'Loading...'}>
      <PlayerModel></PlayerModel>
    </Suspense>
  );
};

export default Player;
