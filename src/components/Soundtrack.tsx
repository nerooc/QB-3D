import { useEffect, useState } from 'react';
import { useStore } from '../store';

const music = require('../assets/audio/music.mp3');

const Soundtrack: React.FC = () => {
  const [audio] = useState(new Audio(music.default));
  audio.volume = 0.3;
  const musicEnabled = useStore((s) => s.musicEnabled);

  // Song end handling
  useEffect(() => {
    audio.addEventListener('ended', () => audio.play());
    return audio.removeEventListener('ended', () => audio.play());
  }, []);

  // Handle music toggle
  useEffect(() => {
    musicEnabled ? audio.play() : audio.pause();
  }, [musicEnabled]);

  return null;
};

export default Soundtrack;
