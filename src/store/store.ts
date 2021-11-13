import { createRef } from 'react';
import { Color } from 'three';
import create from 'zustand';

// State store used throughout the application
const useStore = create((set, get) => {
  return {
    set,
    get,
    score: 0,
    gameOver: false,
    gameStarted: true,
    musicEnabled: false,
    controls: {
      left: false,
      right: false,
    },
    camera: createRef(),
    player: createRef(),
    setScore: (score: number) => set((_) => ({ score: score })),
    setGameOver: (over: boolean) => set((_) => ({ gameOver: over })),
    setMusicEnabled: (musicEnabled: boolean) => set((_) => ({musicEnabled: musicEnabled}))
  };
});

const mutation = {
  gameOver: false,
  score: 0,
  globalColor: new Color(),
  gameSpeed: 1.0,
  horizontalVelocity: 0,
};

export { useStore, mutation };
