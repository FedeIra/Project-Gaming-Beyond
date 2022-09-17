import React from 'react';

export default function Paginate({ videogames, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(videogames / 15); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumbers?.map((number) => (
          <li key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
