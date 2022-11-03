import React from 'react';

export const Person = ({ person, handleClick }) => {
  return (
    <li id={Math.random()}>
      {person.name}: {person.number}
      <button onClick={handleClick}>delete</button>
    </li>
  );
};
