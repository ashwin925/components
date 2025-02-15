import React, { useState } from 'react';
import './CharacterReveal.css'; 
import superman1 from '../images/superman1.webp';

const CardReveal = () => {
  // Track the overall animation state (idle, running, or finished)
  const [animationState, setAnimationState] = useState('idle');
  // Current image source for the character
  const [characterImage, setCharacterImage] = useState(null);
  // CSS classes to control character and content positions/animations
  const [characterClass, setCharacterClass] = useState('');
  const [contentClass, setContentClass] = useState('');

  // This function controls the animation timeline
  const handleClick = () => {
    if (animationState !== 'idle') return; // avoid restarting while in progress

    setAnimationState('running');

    // STEP 1: Fly in from the left to the center of the card (using image1)
    setCharacterImage(superman1);
    setCharacterClass('fly-in'); // CSS will move character from offscreen left to center
    // Wait for fly-in to complete
    setTimeout(() => {
      // STEP 2: Briefly change to the hi signal image (image2)
      setCharacterImage('image2.png');
      setTimeout(() => {
        // Revert back to flying image (image1) and continue toward the hidden content area
        setCharacterImage('image1.png');
        setCharacterClass('fly-to-content'); // CSS will move character toward the offscreen content
        setTimeout(() => {
          // STEP 3: At the offscreen content, change to pushing pose (image3)
          setCharacterImage('image3.png');
          // Animate the content sliding into the card container
          setContentClass('slide-in');
          setTimeout(() => {
            // STEP 4: Once the content is in place, change to a “done” pose (image4)
            setCharacterImage('image4.png');
            setTimeout(() => {
              // STEP 5: After a brief pause, switch to the flying-back image (image5)
              // and animate the character flying off to the left
              setCharacterImage('image5.png');
              setCharacterClass('fly-out');
              setTimeout(() => {
                // Animation complete; update state as needed (or reset to idle)
                setAnimationState('finished');
              }, 1000); // Duration for flying back
            }, 1000); // Pause before flying back
          }, 1000); // Duration for content slide-in & push effect
        }, 1000); // Duration for character to fly to content location
      }, 500); // Duration for the hi signal image
    }, 1000); // Duration for the initial fly-in
  };

  return (
    <div className="page">
      <div className="card" onClick={handleClick}>
        Click me
        <div className={`content ${contentClass}`}>
          {/* This is the content that will be revealed */}
          Hidden Content
        </div>
      </div>
      {/* Only show the character when the animation is in progress */}
      {animationState !== 'idle' && (
        <img
          src={characterImage}
          className={`character ${characterClass}`}
          alt="Character"
        />
      )}
    </div>
  );
};

export default CardReveal;
