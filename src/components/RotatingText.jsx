// FILE: src/components/RotatingText.jsx
// FINAL REVISED VERSION: Corrects the styling to use a background highlight as originally intended.

import React, { useState, useEffect } from 'react';

const RotatingText = ({ words, period = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    let ticker;

    if (isDeleting) {
      ticker = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
      }, 100); // Speed of deleting
    } else {
      ticker = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
      }, 150); // Speed of typing
    }

    if (!isDeleting && text === currentWord) {
      // Pause at the end of the word
      setTimeout(() => setIsDeleting(true), period);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }

    return () => clearTimeout(ticker);
  }, [text, isDeleting, currentWord, words, period]);

  useEffect(() => {
    setCurrentWord(words[currentIndex]);
  }, [currentIndex, words]);

  return (
    <span className="bg-mountain-tan text-white px-3 py-1 rounded-lg">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default RotatingText;