import React from 'react';

// pass in the delete function here with some extra  - delete the above

export const Person = ({ person, handleClick }) => {
  return (
    <li id={Math.random()}>
      {person.name}: {person.number}
      <button onClick={handleClick}>delete</button>
    </li>
  );
};
