import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Controls from './components/Controls';
import Player from './components/Player';

import './styles/App.scss';
import Ground from './components/Ground';

const App: React.FC = () => (
  <Canvas>
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Controls />
      <Ground />
      <Player />
    </Suspense>
  </Canvas>
);

export default App;
