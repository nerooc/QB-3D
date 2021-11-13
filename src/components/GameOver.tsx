import { useState, useEffect } from 'react';
import { useStore } from '../store';

import '../styles/gameover.scss';

// LocalStorage helper functions
const getHighscoresFromLS = () => {
  return localStorage.getItem('highscores')
    ? JSON.parse(localStorage.getItem('highscores')!)
    : [...Array(3).fill(0)];
};

const setHighscoresToLS = (highscores: number[]) => {
  localStorage.setItem('highscores', JSON.stringify(highscores));
};

const GameOverScreen: React.FC = () => {
  const [highScores, setHighscores] = useState(getHighscoresFromLS());
  const [opaque, setOpaque] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);

  const gameOver = useStore((s) => s.gameOver);
  const score = useStore((s) => s.score);

  // Slowly changing the "GAME OVER" background to opaque
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (gameOver !== opaque) t = setTimeout(() => setOpaque(gameOver), 500);
    return () => clearTimeout(t);
  }, [gameOver, opaque]);

  // Show the "GAME OVER" screen
  useEffect(() => {
    if (gameOver) {
      setPanelVisible(true);
    } else {
      setPanelVisible(false);
    }
  }, [gameOver]);

  // Saving the highscore
  useEffect(() => {
    if (gameOver) {
      if (highScores.some((previousScore: number) => score > previousScore)) {
        const sortedScores = highScores.sort((a: number, b: number) => a - b);
        sortedScores[0] = score.toFixed(0);
        const resortedScores = sortedScores.sort(
          (a: number, b: number) => b - a,
        );
        setHighscoresToLS(resortedScores);
        setHighscores(resortedScores);
      }
    }
  }, [gameOver, highScores, score]);

  // Restarting the game by refreshing the page
  const handleRestart = () => {
    window.location.reload();
  };

  return panelVisible ? (
    <div
      className="game__container gameover__container"
      style={{
        opacity: panelVisible ? 1 : 0,
        background: opaque ? '#141622FF' : '#141622CC',
      }}
    >
      <div className="gameover__results">
        <h1 className="gameover__results--text">GAME OVER</h1>
        <div className="gameover__scorecontainer">
          <div className="gameover__scorecontainer--left">
            <h1 className="gameover__scorecontainer--title">SCORE</h1>
            <h1 className="gameover__scorecontainer--score">
              {score.toFixed(0)}
            </h1>
          </div>
          <div className="gameover__scorecontainer--right">
            <h1 className="gameover__scorecontainer--title">HIGH SCORES</h1>
            {highScores.map((newScore: any, i: number) => (
              <div
                key={`${i}-${score}`}
                className="gameover__scorecontainer--highscore"
              >
                <span className="gameover__scorecontainer--highscore-number">
                  {i + 1}
                </span>
                <span
                  style={{
                    textDecoration:
                      score.toFixed(0) === newScore ? 'underline' : 'none',
                  }}
                  className="gameover__scorecontainer--highscore-score"
                >
                  {newScore > 0 ? newScore : '-'}
                </span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleRestart} className="gameover__button">
          RESTART
        </button>
      </div>
    </div>
  ) : null;
};

export default GameOverScreen;
