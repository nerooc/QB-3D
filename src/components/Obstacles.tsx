import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Object3D } from 'three';

import {
  CUBE_AMOUNT,
  CUBE_SIZE,
  WALL_RADIUS,
  LEFT_BOUND,
  RIGHT_BOUND,
  COLORS,
} from '../constants';

import { useStore, mutation } from '../store';
import { randomInRange, distance2D } from '../utils';

// Setting bounds for generating obstacles
const negativeBound = LEFT_BOUND + WALL_RADIUS / 2;
const positiveBound = RIGHT_BOUND - WALL_RADIUS / 2;

const Obstacles: React.FC = () => {
  const mesh: any = useRef();
  const material: any = useRef();

  const player = useStore((s: any) => s.player);
  const dummy = useMemo(() => new Object3D(), []);

  const cubes = useMemo(() => {
    // Setup initial cube positions
    const temp = [];
    for (let i = 0; i < CUBE_AMOUNT; i++) {
      const x = randomInRange(negativeBound, positiveBound);
      const y = 10;
      const z = -500 + randomInRange(-400, 50000);

      temp.push({ x, y, z });
    }
    return temp;
  }, []);

  useFrame((_, delta) => {
    cubes.forEach((cube, i) => {
      if (player.current) {
        if (cube.z - player.current.position.z > -15) {
          // We are checking if the player is too far away - no need to run the expensive distance function
          if (
            cube.x - player.current.position.x > -15 ||
            cube.x - player.current.position.x < 15
          ) {
            const distanceToPlayer = distance2D(
              player.current.position.x,
              player.current.position.z,
              cube.x,
              cube.z,
            );

            if (distanceToPlayer < 11) {
              mutation.gameSpeed = 0;
              mutation.gameOver = true;
            }
          }
        }

        if (cube.y < CUBE_SIZE / 2) {
          if (cube.y + delta * 100 > CUBE_SIZE / 2) {
            cube.y = CUBE_SIZE / 2;
          } else {
            cube.y += delta * 100;
          }
        }
      }

      material.current.color = mutation.globalColor.set(COLORS.PURPLE);
      dummy.position.set(cube.x, cube.y, cube.z);

      // Apply changes to dummy and to the instanced matrix
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });

    // Tells THREE to draw the updated matrix
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, CUBE_AMOUNT]}>
      <boxBufferGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      <meshBasicMaterial ref={material} color={COLORS.PINK} />
    </instancedMesh>
  );
};

export default Obstacles;
