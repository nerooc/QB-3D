import { useEffect } from 'react';
import { useStore } from '../store';

const pressed: boolean[] = [];

// A hook that handles the key pressing
function useKeys(target: any, event: any, up = true) {
  useEffect(() => {
    const downHandler = (e: any) => {
      if (target.indexOf(e.key) !== -1) {
        const isRepeating = !!pressed[e.keyCode];
        pressed[e.keyCode] = true;
        if (up || !isRepeating) event(true);
      }
    };

    const upHandler = (e: any) => {
      if (target.indexOf(e.key) !== -1) {
        pressed[e.keyCode] = false;
        if (up) event(false);
      }
    };

    window.addEventListener('keydown', downHandler, { passive: true });
    window.addEventListener('keyup', upHandler, { passive: true });
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [target, event, up]);
}

const KeyboardControls: React.FC = () => {
  const set = useStore((state: any) => state.set);

  // Setting the state of pressed keys
  useKeys(['ArrowLeft', 'a', 'A'], (left: any) =>
    set((state: any) => ({ ...state, controls: { ...state.controls, left } })),
  );
  useKeys(['ArrowRight', 'd', 'D'], (right: any) =>
    set((state: any) => ({ ...state, controls: { ...state.controls, right } })),
  );

  return null;
};

export default KeyboardControls;
