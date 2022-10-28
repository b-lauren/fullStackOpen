import React from 'react';

export const Person = ({ person, handleClick }) => {
  return (
    <li id={Math.random()}>
      {person.name}: {person.number}
      <button onClick={handleClick}>delete</button>
    </li>
  );
};

// export const Persons = ({
//   persons,
//   handleClick,
//   filteredResult,
//   searchInput,
// }) => {
//   return (
//     <>
//       {searchInput
//         ? filteredResult.map((person) => (
//             <Person key={person.id} person={person} />
//           ))
//         : persons.map((person) => (
//             <Person key={person.id} person={person} onClick={handleClick} />
//           ))}
//     </>
//   );
// };

/* <Persons
searchInput={searchInput}
filteredResult={filteredResult}
persons={persons}
handleClick={() => deleteSomeone()}
/> */
