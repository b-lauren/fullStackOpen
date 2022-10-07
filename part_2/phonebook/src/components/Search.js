import React from 'react';

export const Search = (props) => {
  return (
    <div>
      Search phonebook: <input value={props.value} onChange={props.onChange} />
    </div>
  );
};
