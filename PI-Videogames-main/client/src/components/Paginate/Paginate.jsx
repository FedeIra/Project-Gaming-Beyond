// Import React utilities:
import React from 'react';

// Import styles and images:
import style from './Paginate.module.css';
import * as images from '../../assets/paginate/paginate_images.js';

// Component:
export default function Paginate({ videogames, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(videogames / 15); i++) {
    pageNumbers.push(i);
  }

  // Render:
  return (
    <nav className={style.paginate}>
      <button
        className={style.button_nextOrPrevious}
        onClick={() => paginate('previous')}
      >
        <img
          className={style.paginate_images}
          src={images.previous}
          alt="previous"
        />
      </button>
      {pageNumbers?.map((number) => (
        <button
          key={number}
          className={style.buttons}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      ))}
      <button
        className={style.button_nextOrPrevious}
        onClick={() => paginate('next')}
      >
        <img className={style.paginate_images} src={images.next} alt="next" />
      </button>
    </nav>
  );
}
