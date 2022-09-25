import React from 'react';
import style from './Paginate.module.css';

export default function Paginate({ videogames, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(videogames / 15); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className={style.paginate}>
      {pageNumbers?.map((number) => (
        <button className={style.buttons} onClick={() => paginate(number)}>
          {number}
        </button>
      ))}
    </nav>
  );
}
