import React, { useState } from 'react';
import './CharacterReveal.css'; 
import superman1 from '../images/superman8.png';
import superman2 from '../images/superman9.png';
import superman3 from '../images/superman10.png';
import superman4 from '../images/superman11.png';

const CardReveal = () => {
  const [animationState, setAnimationState] = useState('idle');
  const [characterImage, setCharacterImage] = useState(null);
  const [characterClass, setCharacterClass] = useState('');
  const [contentClass, setContentClass] = useState('');

  const handleClick = () => {
    if (animationState !== 'idle') return;
    setAnimationState('running');

    setCharacterImage(superman8);
    setCharacterClass('fly-in-left');
    
    setTimeout(() => {
      setCharacterImage(superman11);
      setCharacterClass('scale-up');
      
      setTimeout(() => {
        setCharacterImage(superman8);
        setCharacterClass('fly-out-left');
        
        setTimeout(() => {
          setCharacterImage(superman10);
          setCharacterClass('fly-in-top-right');
          
          setTimeout(() => {
            setContentClass('slide-in');
            setCharacterImage(superman2);
            setCharacterClass('stay');
            
            setTimeout(() => {
              setCharacterImage(superman3);
              setCharacterClass('fly-out-left');
              setTimeout(() => {
                setAnimationState('idle');
              }, 1000);
            }, 1500);
          }, 2000);
        }, 1000);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="page">
      <div className="container" onClick={handleClick}>
        Click Me
      </div>
      <div className={`content-container ${contentClass}`}>
        Hidden Content
      </div>
      {animationState !== 'idle' && (
        <img src={characterImage} className={`character ${characterClass}`} alt="Character" />
      )}
    </div>
  );
};

export default CardReveal;