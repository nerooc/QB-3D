import React from 'react';

const PlayerModel: React.FC = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

const Player: React.FC = () => {
  return <PlayerModel></PlayerModel>;
};

export default Player;
