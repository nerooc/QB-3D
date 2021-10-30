import React, { useState } from 'react';

const Scene: React.FC = () => {
  const [hovered, setHovered] = useState(true);

  return (
    <mesh onDoubleClick={(e) => setHovered(!hovered)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

export default Scene;
