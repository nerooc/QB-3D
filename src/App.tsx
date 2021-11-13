import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

import KeyboardControls from './components/KeyboardControls';
import CameraControls from './components/CameraControls';
import GameOverScreen from './components/GameOver';
import Soundtrack from './components/Soundtrack';
import GameState from './components/GameState';
import Obstacles from './components/Obstacles';
import Player from './components/Player';
import Ground from './components/Ground';
import HUD from './components/Hud';

import './styles/app.scss';

const App: React.FC = () => (
  <>
    <Canvas
      gl={{ antialias: false, alpha: false }}
      mode="concurrent"
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[-10, -10, -10]} />
        <GameState />
        <Player />
        <Obstacles />
        <Ground />
        <CameraControls />
        <KeyboardControls />
      </Suspense>
    </Canvas>
    <HUD />
    <Soundtrack />
    <GameOverScreen />
  </>
);

export default App;
