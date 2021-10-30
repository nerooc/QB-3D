import React from 'react';
import { Canvas } from '@react-three/fiber';
import Controls from './components/Controls';
import Scene from './components/Scene';
import './App.css';

const App: React.FC = () => (
  <Canvas>
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    <pointLight position={[-10, -10, -10]} />
    <Scene />
    <Controls />
  </Canvas>
);

export default App;
