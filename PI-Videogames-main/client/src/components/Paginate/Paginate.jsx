// Import React utilities:
import React from 'react';

// Import styles:
import style from './Paginate.module.css';

// Component:
export default function Paginate({ videogames, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(videogames / 15); i++) {
    pageNumbers.push(i);
  }

  // Render:
  return (
    <nav className={style.paginate}>
      {pageNumbers?.map((number) => (
        <button
          key={number}
          className={style.buttons}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      ))}
    </nav>
  );
}
