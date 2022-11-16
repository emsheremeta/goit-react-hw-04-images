import React from 'react';
import { useEffect } from 'react';

export default function Modal(props) {
  const handleBackdrop = event => {
    console.log('click on backdrop');

    console.log('currentTarget :', event.currentTarget);
    console.log('target :', event.target);
    if (event.currentTarget === event.target) {
      props.onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    // console.log(e);
    if (e.code === 'Escape') {
      console.log('Escape');
      props.onClose();
    }
  };
  return (
    <div className="Overlay" onClick={handleBackdrop}>
      <div className="Modal">
        <img src={props.url} alt="finding results" />
      </div>
    </div>
  );
}
