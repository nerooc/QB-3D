import { createRef, RefObject } from 'react';
import { DirectionalLight, Camera } from 'three';
import create from 'zustand';

type Store = {
  set: any;
  get: any;
  score: number;
  gameOver: boolean;
  controls: {
    left: boolean;
    right: boolean;
  };
  directionalLight: RefObject<DirectionalLight>;
  camera: RefObject<any>;
  player: any;
  hasInderacted: boolean;
};

const useStore = create((set, get) => {
  return {
    set,
    get,
    score: 0,
    gameOver: false,
    controls: {
      left: false,
      right: false,
    },
    directionalLight: createRef(),
    camera: createRef(),
    player: createRef(),
    hasInteracted: false,
    setHasInteracted: () => set((state) => ({ hasInteracted: true })),
    setScore: (score: number) => set((state) => ({ score: score })),
    setGameOver: (over: boolean) => set((state) => ({ gameOver: over })),
  };
});

const mutation = {
  gameOver: false,
  score: 0,
};

export { useStore, mutation };
