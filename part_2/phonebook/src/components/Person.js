import React from 'react';
import deleteSomeone from '../App';

const deletePerson = () => {
  const answer = window.confirm('Do you really want to delete?');
  if (answer) {
    console.log('deleted');
    deleteSomeone();
  } else console.log('kept in phonebook');
};

// pass in the delete function here with some extra  - delete the above

export const Person = ({ person }) => {
  return (
    <li id={Math.random()}>
      {person.name}: {person.number}{' '}
      <button onClick={deletePerson}>delete</button>
    </li>
  );
};
