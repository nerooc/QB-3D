//@ts-nocheck

import { useEffect, useState, useRef } from 'react';
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';
import { IconContext } from 'react-icons';
import { addEffect } from '@react-three/fiber';

import { useStore, mutation } from '../store';

import '../styles/hud.scss';

const getSpeed = () => `${(mutation.gameSpeed * 400).toFixed(0)}`;
const getScore = () => `${mutation.score.toFixed(0)}`;

const HUD: React.FC = () => {
  const set = useStore((state) => state.set);
  const gameOver = useStore((s) => s.gameOver);
  const gameStarted = useStore((s) => s.gameStarted);
  const musicEnabled = useStore((s) => s.musicEnabled);

  const [hudVisbile, setHudVisible] = useState(false);

  const [controlsVisible, setControlsVisible] = useState(false);
  const [leftPressed, setLeftPressed] = useState(false);
  const [rightPressed, setRightPressed] = useState(false);

  let then = Date.now();

  const speedRef = useRef();
  const scoreRef = useRef();

  let currentSpeed = getSpeed();
  let currentScore = getScore();

  // Function toggling the sound with a button
  const toggleSound = () => {
    musicEnabled
      ? set((state: any) => ({ ...state, musicEnabled: false }))
      : set((state: any) => ({ ...state, musicEnabled: true }));
  };

  useEffect(() =>
    addEffect(() => {
      const now = Date.now();

      if (now - then > 33.3333) {
        // Throttle these to a max of 30 updates/sec
        if (speedRef.current) {
          speedRef.current.innerText = getSpeed();
        }

        if (scoreRef.current) {
          scoreRef.current.innerText = getScore();
        }

        // eslint-disable-next-line
        then = now;
      }
    }),
  );

  // Turning off the event propagation for the control buttons
  useEffect(() => {
    if (controlsVisible) {
      window.oncontextmenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      };
    }
  }, [controlsVisible]);

  // Handling HUD visibility based on the game state
  useEffect(() => {
    if (gameStarted && !gameOver) {
      setHudVisible(true);
    } else {
      setHudVisible(false);
    }
  }, [gameStarted, gameOver]);

  // Handling controls visibility based on the used device
  useEffect(() => {
    if (isMobile) {
      setControlsVisible(true);
    } else {
      setControlsVisible(false);
    }
  }, []);

  // Controls handling
  useEffect(() => {
    set((state) => ({
      ...state,
      controls: { ...state.controls, left: leftPressed },
    }));
  }, [set, leftPressed]);

  useEffect(() => {
    set((state) => ({
      ...state,
      controls: { ...state.controls, right: rightPressed },
    }));
  }, [set, rightPressed]);

  return hudVisbile ? (
    <div className="hud">
      {controlsVisible && (
        <div className="controls">
          <button
            onTouchStart={() => setLeftPressed(true)}
            onTouchEnd={() => setLeftPressed(false)}
            className={`control ${leftPressed ? 'control-active' : ''}`}
          >
            {'<'}
          </button>
          <button
            onTouchStart={() => setRightPressed(true)}
            onTouchEnd={() => setRightPressed(false)}
            className={`control  ${rightPressed ? 'control-active' : ''}`}
          >
            {'>'}
          </button>
        </div>
      )}

      <div className="topRight">
        <IconContext.Provider
          value={{ color: '#bb05cc', className: 'soundIcon' }}
        >
          <button className="soundMute" onClick={() => toggleSound()}>
            {musicEnabled ? <BsFillVolumeUpFill /> : <BsFillVolumeMuteFill />}
          </button>
        </IconContext.Provider>
      </div>

      <div className="bottomLeft">
        <div
          className={`score ${controlsVisible ? 'score__withcontrols' : ''}`}
        >
          <h3 className="score__title">KM/H</h3>
          <h1 ref={speedRef} className="score__number">
            {currentSpeed}
          </h1>
        </div>
      </div>
      <div className="bottomRight">
        <div
          className={`score ${controlsVisible ? 'score__withcontrols' : ''}`}
        >
          <h3 className="score__title">SCORE</h3>
          <div
            className={`score ${controlsVisible ? 'score__withcontrols' : ''}`}
          >
            <h1 ref={scoreRef} className="score__number">
              {currentScore}
            </h1>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default HUD;
