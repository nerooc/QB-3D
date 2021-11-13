import { useFrame } from '@react-three/fiber';
import { useStore, mutation } from '../store';

const playerSelector = (s: any) => s.player;
const setScoreSelector = (s: any) => s.setScore;
const gameStartedSelector = (s: any) => s.gameStarted;
const setGameOverSelector = (s: any) => s.setGameOver;
const setMusicEnabledSelector = (s: any) => s.setMusicEnabled;

const GameState: React.FC = () => {
  const player = useStore(playerSelector);
  const setScore = useStore(setScoreSelector);
  const gameStarted = useStore(gameStartedSelector);
  const setGameOver = useStore(setGameOverSelector);
  const musicEnabled = useStore(setMusicEnabledSelector);

  useFrame(() => {
    // We are setting the score based on the player's position on the Z axis
    if (player.current) {
      mutation.score = Math.abs(player.current.position.z) - 10;
    }

    // Handling the Game Over state
    if (gameStarted && mutation.gameOver) {
      setScore(Math.abs(player.current.position.z) - 10);
      setGameOver(true);
      musicEnabled(false);
    }
  });

  return null;
};

export default GameState;
