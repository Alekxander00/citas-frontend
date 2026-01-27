import React, { useRef } from 'react';
import clickSound from '../assets/click.mp3';
import successSound from '../assets/success.mp3';

const SoundEffects = () => {
  const clickRef = useRef(null);
  const successRef = useRef(null);

  const playClick = () => {
    clickRef.current.currentTime = 0;
    clickRef.current.play();
  };

  const playSuccess = () => {
    successRef.current.currentTime = 0;
    successRef.current.play();
  };

  return (
    <>
      <audio ref={clickRef} src={clickSound} preload="auto" />
      <audio ref={successRef} src={successSound} preload="auto" />
    </>
  );
};

export default SoundEffects;